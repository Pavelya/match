/**
 * Give the older university images a one-year cache (MAINT 5.10)
 *
 * Commit a4103e7 (1 October 2026) made new uploads cache for a year, but a Storage object keeps
 * the Cache-Control it was uploaded with. Every image and logo uploaded before then still says
 * max-age=3600. This re-uploads each such object's own bytes to its own path with a one-year
 * header. The URL does not change, so there is no database write, no Algolia sync and no programs
 * cache invalidation.
 *
 *   (no option)       Dry run: list every object a University image or logo points at whose
 *                     header is not a year. Reads metadata only; nothing is downloaded.
 *   --apply           Re-upload each one. Its bytes are saved to the backup folder first.
 *   --only <path>     Limit to one object path (do one first, check it, then the rest).
 *   --backup-dir <d>  Where the downloaded bytes go (default: scripts/backups/image-cache-control,
 *                     git-ignored).
 *
 * Objects no row points at are ignored. Never run this while someone is uploading images in
 * /admin/universities.
 *
 * Run with:
 *   npx tsx scripts/fix-image-cache-control.ts
 *   npx tsx scripts/fix-image-cache-control.ts --apply --only <path>
 *   npx tsx scripts/fix-image-cache-control.ts --apply
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { prisma } from '@/lib/prisma-standalone'
import { getSupabaseClient, STORAGE_BUCKETS } from '@/lib/supabase/client'

const BUCKET = STORAGE_BUCKETS.UNIVERSITY_IMAGES
const ONE_YEAR = '31536000'
const PUBLIC_PREFIX = `/storage/v1/object/public/${BUCKET}/`
const PAGE = 1000

type StoredObject = { size: number; mimetype: string; cacheControl: string }

function parseArgs(argv: string[]) {
  const args = {
    apply: false,
    only: null as string | null,
    backupDir: path.join('scripts', 'backups', 'image-cache-control')
  }
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '--apply') args.apply = true
    else if (arg === '--only') args.only = argv[++i] ?? null
    else if (arg === '--backup-dir') args.backupDir = argv[++i] ?? args.backupDir
    else throw new Error(`Unknown option: ${arg}`)
  }
  if (argv.includes('--only') && !args.only) throw new Error('--only needs an object path')
  return args
}

// The object path inside the bucket, or null for a URL that is not one of its public objects.
function objectPath(url: string): string | null {
  try {
    const { pathname } = new URL(url)
    if (!pathname.startsWith(PUBLIC_PREFIX)) return null
    return decodeURIComponent(pathname.slice(PUBLIC_PREFIX.length))
  } catch {
    return null
  }
}

// Every object in the bucket's root, with the metadata list() returns. Uploads all go to the root.
async function listBucket(): Promise<Map<string, StoredObject>> {
  const objects = new Map<string, StoredObject>()
  for (let offset = 0; ; offset += PAGE) {
    const { data, error } = await getSupabaseClient()
      .storage.from(BUCKET)
      .list('', { limit: PAGE, offset, sortBy: { column: 'name', order: 'asc' } })
    if (error) throw new Error(`Could not list ${BUCKET}: ${error.message}`)
    for (const item of data) {
      if (!item.metadata) continue // a folder
      objects.set(item.name, {
        size: Number(item.metadata.size),
        mimetype: String(item.metadata.mimetype),
        cacheControl: String(item.metadata.cacheControl)
      })
    }
    if (data.length < PAGE) return objects
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  console.log(`\n${args.apply ? '✏️  WRITING' : '🔍 DRY RUN'} — ${BUCKET} Cache-Control\n`)

  const universities = await prisma.university.findMany({
    where: { OR: [{ image: { not: null } }, { logo: { not: null } }] },
    select: { name: true, image: true, logo: true },
    orderBy: { name: 'asc' }
  })

  // Each object path a row points at, with who points at it.
  const referenced = new Map<string, string>()
  for (const u of universities) {
    for (const [column, url] of [
      ['image', u.image],
      ['logo', u.logo]
    ] as const) {
      if (!url) continue
      const p = objectPath(url)
      if (p) referenced.set(p, `${u.name} (${column})`)
      else console.log(`⚠️  ${u.name}: ${column} is not a ${BUCKET} URL — skipped`)
    }
  }

  const stored = await listBucket()
  const stale: { path: string; owner: string; object: StoredObject }[] = []
  let current = 0
  for (const [p, owner] of referenced) {
    const object = stored.get(p)
    if (!object) {
      console.log(`⚠️  ${owner}: ${p} is not in the bucket`)
      continue
    }
    if (object.cacheControl === `max-age=${ONE_YEAR}`) current++
    else stale.push({ path: p, owner, object })
  }

  const totalKb = Math.round(stale.reduce((sum, s) => sum + s.object.size, 0) / 1024)
  for (const s of stale) {
    console.log(
      `  ${s.object.cacheControl.padEnd(16)} ${String(Math.round(s.object.size / 1024)).padStart(4)} KB  ${s.path}  — ${s.owner}`
    )
  }
  console.log(
    `\n${referenced.size} objects referenced: ${current} already a year, ${stale.length} not (${totalKb} KB)`
  )

  const targets = args.only ? stale.filter((s) => s.path === args.only) : stale
  if (args.only && targets.length === 0) {
    throw new Error(`${args.only} is not among the objects without a one-year header`)
  }

  if (!args.apply) {
    console.log('\nDry run: nothing written. Re-run with --apply to re-upload.\n')
    return
  }

  mkdirSync(args.backupDir, { recursive: true })
  let done = 0
  let failed = 0
  for (const s of targets) {
    const storage = getSupabaseClient().storage.from(BUCKET)
    const { data: blob, error: downloadError } = await storage.download(s.path)
    if (downloadError || !blob) {
      console.log(`❌ ${s.path}: download failed — ${downloadError?.message}`)
      failed++
      continue
    }
    const bytes = Buffer.from(await blob.arrayBuffer())
    if (bytes.length !== s.object.size) {
      console.log(`❌ ${s.path}: downloaded ${bytes.length} bytes, expected ${s.object.size}`)
      failed++
      continue
    }
    writeFileSync(path.join(args.backupDir, s.path), bytes)

    const { error: uploadError } = await storage.upload(s.path, bytes, {
      upsert: true,
      cacheControl: ONE_YEAR,
      contentType: s.object.mimetype
    })
    if (uploadError) {
      console.log(`❌ ${s.path}: upload failed — ${uploadError.message}`)
      failed++
      continue
    }
    console.log(`✅ ${s.path}`)
    done++
  }

  // Read the metadata back: the header and the size, as Storage now reports them.
  const after = await listBucket()
  const wrong = targets.filter((s) => {
    const object = after.get(s.path)
    return (
      !object ||
      object.cacheControl !== `max-age=${ONE_YEAR}` ||
      object.size !== s.object.size ||
      object.mimetype !== s.object.mimetype
    )
  })
  for (const s of wrong) console.log(`❌ ${s.path}: ${JSON.stringify(after.get(s.path))}`)

  console.log(
    `\n📊 Re-uploaded ${done} of ${targets.length}; ${failed} failed; ${wrong.length} not as expected afterwards`
  )
  console.log(`   Bytes kept in ${args.backupDir}\n`)
  if (failed > 0 || wrong.length > 0) process.exitCode = 1
}

main()
  .catch((error) => {
    console.error('\n❌ Error:', error instanceof Error ? error.message : error)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
