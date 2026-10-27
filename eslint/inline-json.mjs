/**
 * No bare `JSON.stringify` written into a page as HTML (SEC-3).
 *
 * `JSON.stringify` leaves `</script>` as it is, so a value from the database that contains it would
 * end a `<script type="application/ld+json">` early, and what follows would run as script.
 * `serializeJsonLd` (lib/utils.ts) escapes `<` and parses back to the same value.
 *
 * Its own rule rather than `no-restricted-syntax`, which eslint/raw-palette.mjs already sets for
 * the same files: a second setting of one rule replaces the first instead of adding to it.
 */
const noUnescapedInlineJson = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow a bare JSON.stringify as the __html of dangerouslySetInnerHTML'
    },
    messages: {
      useSerializer:
        "JSON.stringify doesn't escape </script>. Use serializeJsonLd from '@/lib/utils' (SEC-3)."
    },
    schema: []
  },
  create(context) {
    return {
      "JSXAttribute[name.name='dangerouslySetInnerHTML'] Property[key.name='__html'][value.callee.object.name='JSON'][value.callee.property.name='stringify']"(
        node
      ) {
        context.report({ node: node.value, messageId: 'useSerializer' })
      }
    }
  }
}

export const inlineJsonPlugin = {
  rules: { 'no-unescaped-inline-json': noUnescapedInlineJson }
}
