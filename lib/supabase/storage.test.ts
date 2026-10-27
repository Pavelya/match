import { beforeEach, describe, expect, it, vi } from 'vitest'

// Uploads to the public bucket (SEC-8): only JPEG, PNG, WebP and AVIF, recognised by their first
// bytes, as they claim to be, and 2 MB at most. Storage serves a file with the type it was stored
// under, so anything else could be served as a page that runs script.

const { upload, getPublicUrl } = vi.hoisted(() => ({
  upload: vi.fn(),
  getPublicUrl: vi.fn()
}))

vi.mock('./client', () => ({
  STORAGE_BUCKETS: { UNIVERSITY_IMAGES: 'university-images' },
  getSupabaseClient: () => ({ storage: { from: () => ({ upload, getPublicUrl }) } })
}))
vi.mock('@/lib/logger', () => ({ logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }))

import { MAX_IMAGE_BYTES, detectImageType, uploadUniversityImage } from './storage'

const JPEG = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0, 0x10, 0x4a, 0x46, 0x49, 0x46, 0, 1])
const PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0x0d])
const WEBP = Buffer.concat([
  Buffer.from('RIFF'),
  Buffer.from([0x24, 0, 0, 0]),
  Buffer.from('WEBPVP8 ')
])
const AVIF = Buffer.concat([Buffer.from([0, 0, 0, 0x1c]), Buffer.from('ftypavif'), Buffer.alloc(4)])
const SVG = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>')
const HTML = Buffer.from('<!doctype html><script>alert(1)</script>')
const GIF = Buffer.from('GIF89a\u0001\u0000\u0001\u0000')

function dataUrl(type: string, bytes: Buffer): string {
  return `data:${type};base64,${bytes.toString('base64')}`
}

beforeEach(() => {
  vi.clearAllMocks()
  upload.mockResolvedValue({ data: { path: 'stored.jpg' }, error: null })
  getPublicUrl.mockReturnValue({ data: { publicUrl: 'https://x.supabase.co/storage/stored.jpg' } })
})

describe('detectImageType', () => {
  it.each([
    ['a JPEG', JPEG, 'image/jpeg'],
    ['a PNG', PNG, 'image/png'],
    ['a WebP', WEBP, 'image/webp'],
    ['an AVIF', AVIF, 'image/avif'],
    ['an SVG', SVG, null],
    ['an HTML page', HTML, null],
    ['a GIF', GIF, null],
    ['nothing', Buffer.alloc(0), null]
  ])('reads %s as %s', (_name, bytes, type) => {
    expect(detectImageType(bytes)).toBe(type)
  })
})

describe('uploadUniversityImage', () => {
  it.each([
    ['image/jpeg', JPEG, 'jpeg'],
    ['image/png', PNG, 'png'],
    ['image/webp', WEBP, 'webp'],
    ['image/avif', AVIF, 'avif']
  ])('stores a %s under its own type', async (type, bytes, extension) => {
    await uploadUniversityImage(dataUrl(type, bytes), 'uni-1')

    const [filename, , options] = upload.mock.calls[0]
    expect(filename).toMatch(new RegExp(`^uni-1-\\d+\\.${extension}$`))
    expect(options).toMatchObject({ contentType: type, cacheControl: '31536000' })
  })

  it('takes the type from the bytes when there is no data URL', async () => {
    await uploadUniversityImage(PNG.toString('base64'), 'uni-1')
    expect(upload.mock.calls[0][2]).toMatchObject({ contentType: 'image/png' })
  })

  it.each([
    ['an SVG', 'image/svg+xml', SVG],
    ['an HTML page calling itself HTML', 'text/html', HTML],
    ['an HTML page calling itself a PNG', 'image/png', HTML],
    ['a GIF', 'image/gif', GIF],
    ['a PNG calling itself a JPEG', 'image/jpeg', PNG]
  ])('refuses %s, and stores nothing', async (_name, type, bytes) => {
    await expect(uploadUniversityImage(dataUrl(type, bytes), 'uni-1')).rejects.toThrow(
      'Not an accepted image'
    )
    expect(upload).not.toHaveBeenCalled()
  })

  it('refuses an image over 2 MB, and stores nothing', async () => {
    const big = Buffer.concat([JPEG, Buffer.alloc(MAX_IMAGE_BYTES)])
    await expect(uploadUniversityImage(dataUrl('image/jpeg', big), 'uni-1')).rejects.toThrow(
      'Image too large'
    )
    expect(upload).not.toHaveBeenCalled()
  })
})
