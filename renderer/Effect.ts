import type { ConfigEffect } from 'vike/types'

export function ssrEffect({ configDefinedAt, configValue }: Parameters<ConfigEffect>[0]): ReturnType<ConfigEffect> {
  if (typeof configValue !== 'boolean') throw new Error(`${configDefinedAt} should be a boolean`)
  return {
    meta: {
      Page: {
        env: {
          client: true,
          server: configValue !== false,
        },
      },
    },
  }
}
