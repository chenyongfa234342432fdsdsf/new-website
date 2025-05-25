// https://vitejs.dev/config/
import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import vike from 'vike/plugin'
import macrosPlugin from 'vite-plugin-babel-macros'
import { fileURLToPath, URL } from 'url'
import { cjsInterop } from 'vite-plugin-cjs-interop'
import { VITE_PORT } from '@/constants/env'

export default async ({ mode }) => {
  return defineConfig({
    resolve: {
      alias: [{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }],
    },
    clearScreen: false,
    server: {
      strictPort: true,
      port: Number(VITE_PORT),
      host: true,
    },
    plugins: [
      cjsInterop({
        dependencies: ['lodash', '@particle-network/**'],
      }),
      macrosPlugin(),
      react({}),
      vike(),
    ],
    build: {
      outDir: './dist',
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
        },
      },
    },
    esbuild: {
      supported: {
        bigint: true,
      },
    },
    css: {
      modules: {
        generateScopedName: '[folder]-[hash:base64:5]',
        scopeBehaviour: 'global',
      },
    },
  } as UserConfig)
}
