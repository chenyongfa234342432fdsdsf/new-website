import { ssrEffect } from './Effect'

export default {
  clientRouting: true,
  hydrationCanBeAborted: true,
  prefetchStaticAssets: 'viewport',
  meta: {
    data: {
      env: { server: true, client: true },
    },
    Layout: {
      env: { server: true, client: true },
    },
    ssr: {
      env: { config: true },
      effect: ssrEffect,
    },
    VikeReactQueryWrapper: {
      env: { client: true, server: true },
    },
  },
  passToClient: [],
}
