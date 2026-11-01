# Archive

Old records, kept because they may be useful later. **Nothing here describes the product today**, and no session
should follow these as instructions. Current docs are listed in `AGENTS.md`, "Where to look".

| File | Why it is kept |
|---|---|
| `DOC_1_ibmatch-requirements-doc.md` | The original product requirements, December 2025. Out of date: it promises top-10 matches and University Agent dashboards |
| `DOC_2_matching-algo IX.md` | The algorithm whose core still runs in production. `docs/matching/DOC_2_matching-algo XI.md` is the master |
| `security-audit-report-2026-01.md` | The January 2026 audit. The current list is `docs/tasks/SEC_tasks.md` |
| `admin-analytics-improvement-plan.md` | Largely built. Its "Future Enhancements" holds ideas nobody has taken up |
| `coordinator-analytics-investigation.md` | Ideas for the coordinator's analytics, some still open |
| `coordinator-dashboard-component-guide.md` | How the shared dashboard components were meant to be reused |

**Deleted docs.** The cleanup of 1 November 2026 deleted 42 finished, replaced or conflicting docs and one note. They
are at the git tag `docs-before-cleanup`:

```bash
git ls-tree -r --name-only docs-before-cleanup docs
git show docs-before-cleanup:docs/tasks/<file>
```

`docs/tasks/RELEASE_RUNBOOK.md` moves more here at steps 39, 44, 46 and 49.
