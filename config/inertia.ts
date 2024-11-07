import env from '#start/env'
import { defineConfig } from '@adonisjs/inertia'
import type { InferSharedProps } from '@adonisjs/inertia/types'

const inertiaConfig = defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    siteUrl: ({ request }) => env.get('SITE_URL', `${request.protocol()}://${request.host()}`),
    errors: (ctx) => {
      const errors = ctx.session?.flashMessages.get('errors') ?? {}
      return Object.keys(errors).reduce(
        (res, key) => ({ ...res, [key]: errors[key].join(', ') }),
        {}
      )
    },
    exceptions: (ctx) =>
      (ctx.session?.flashMessages.get('errorsBag') as Record<string, string>) ?? {},
    messages: (ctx) => ctx.session?.flashMessages.all() ?? {},
    xcrfToken: (ctx) => ctx.request.csrfToken,
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: true,
    entrypoint: 'inertia/app/ssr.tsx',
  },
})

export default inertiaConfig

declare module '@adonisjs/inertia/types' {
  export interface SharedProps extends InferSharedProps<typeof inertiaConfig> {}
}
