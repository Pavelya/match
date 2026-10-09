import { brand, legacyBrand } from './config'

/**
 * The emails' logo and brand colour. Emails go to students, so they follow `NEW_UI_FOR_EVERYONE`
 * alone, never the owner's preview, and change on release day (rebranding 1.3). Read straight from
 * `process.env`, as `newUiForEveryone()` does through `lib/env.ts`: `lib/new-ui.ts` is server-only,
 * and `npm run email:dev` renders these templates outside Next.js.
 */
export function emailBrand(newUi = process.env.NEW_UI_FOR_EVERYONE === 'true') {
  return newUi
    ? { newUi: true, logo: brand.emailLogo, color: brand.colors.brand }
    : { newUi: false, logo: legacyBrand.emailLogo, color: legacyBrand.colors.brand }
}
