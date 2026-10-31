-- Close the database's public API (MAINT 5.37). Every table in `public` had Row Level Security off
-- and Supabase's default grants, so whoever held the project's anon key could read, change and
-- delete every table through the Data API. The owner turned the Data API off on 26 October 2026;
-- this keeps the tables closed even if it is turned back on.
-- Written by hand: Prisma's schema has no notion of Row Level Security, grants or event triggers.
-- The app connects as `postgres`, which owns every table and has BYPASSRLS, so nothing changes for
-- it. No FORCE ROW LEVEL SECURITY: that would bind the owner too.

-- Row Level Security on every table, with no policies: any role but the owner is refused.
DO $$
DECLARE
  t record;
BEGIN
  FOR t IN
    SELECT c.oid::regclass AS name
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relkind IN ('r', 'p') AND NOT c.relrowsecurity
  LOOP
    EXECUTE format('ALTER TABLE %s ENABLE ROW LEVEL SECURITY', t.name);
  END LOOP;
END $$;

-- Take back Supabase's default grants to the API roles, now and for objects created later. The roles
-- exist only on Supabase; CI's plain Postgres has neither, so each is checked first. Only the
-- defaults for `postgres` can be changed here: `supabase_admin`'s belong to Supabase, and it creates
-- nothing in `public`.
DO $$
DECLARE
  r text;
BEGIN
  FOREACH r IN ARRAY ARRAY['anon', 'authenticated'] LOOP
    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = r) THEN
      EXECUTE format('REVOKE ALL ON ALL TABLES IN SCHEMA public FROM %I', r);
      EXECUTE format('REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM %I', r);
      EXECUTE format('REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM %I', r);
      EXECUTE format('ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE ALL ON TABLES FROM %I', r);
      EXECUTE format('ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE ALL ON SEQUENCES FROM %I', r);
      EXECUTE format('ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE ALL ON FUNCTIONS FROM %I', r);
    END IF;
  END LOOP;
END $$;

-- New tables start closed: turn Row Level Security on for every table created in `public` from now on,
-- as Supabase's docs suggest. On Supabase, `postgres` may create event triggers through
-- supabase_privileged_role (checked 26 October 2026 in a rolled-back transaction). Not SECURITY
-- DEFINER: whoever creates a table owns it, and so may enable Row Level Security on it.
CREATE FUNCTION public.enable_rls_on_new_tables() RETURNS event_trigger
  LANGUAGE plpgsql
  SET search_path = pg_catalog
AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN
    SELECT * FROM pg_event_trigger_ddl_commands()
    WHERE object_type = 'table' AND schema_name = 'public'
  LOOP
    EXECUTE format('ALTER TABLE %s ENABLE ROW LEVEL SECURITY', obj.object_identity);
  END LOOP;
END $$;

REVOKE ALL ON FUNCTION public.enable_rls_on_new_tables() FROM PUBLIC;

CREATE EVENT TRIGGER enable_rls_on_new_tables ON ddl_command_end
  WHEN TAG IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
  EXECUTE FUNCTION public.enable_rls_on_new_tables();
