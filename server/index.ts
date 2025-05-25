import express from 'express'
import compression from 'compression'
import { renderPage } from 'vike/server'
import cookieParser from 'cookie-parser'
import { VITE_PORT } from '@/constants/env'
import { root } from './root'

const app = express()

async function startServer() {
  app.use(cookieParser())
  app.use(compression())
  const vite = await import('vite')
  const viteDevMiddleware = (
    await vite.createServer({
      root,
      server: { middlewareMode: true },
    })
  ).middlewares
  app.use(viteDevMiddleware)

  app.get('*', async (req, res, next) => {
    const pageContextInit = {
      urlOriginal: '/',
      userAgent: '',
    }

    const pageContext = await renderPage(pageContextInit)

    const { httpResponse } = pageContext
    if (!httpResponse) {
      return next()
    } else {
      const { statusCode, headers } = httpResponse
      headers.forEach(([name, value]) => res.setHeader(name, value))
      res.status(statusCode)
      httpResponse.pipe(res)
    }
  })

  const port = process.env.PORT || VITE_PORT
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}

startServer()
