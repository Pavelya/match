import { SiteLogo } from '@/components/site/SiteLogo'
import { showsNewUi } from '@/lib/new-ui'
import { LegacyLogo } from './LegacyLogo'

/**
 * The logo at the top of the sign-in and invitation cards, for the design this request gets
 * (rebranding 1.3): the mark and the name, or today's logo at its size. A server component, so the
 * client pages it is passed to never load both.
 */
export async function AuthLogo({ legacySize }: { legacySize: number }) {
  return (await showsNewUi()) ? <SiteLogo /> : <LegacyLogo size={legacySize} />
}
