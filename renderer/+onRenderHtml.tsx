import { renderToStream } from 'react-streaming/server'
import { escapeInject } from 'vike/server'
import type { OnRenderHtmlAsync } from 'vike/types'
import { ServerPageLayout } from './PageLayoutServer'

export const onRenderHtml = async (pageContext): ReturnType<OnRenderHtmlAsync> => {
  const { userAgent } = pageContext

  let pageView
  if (!pageContext.Page) {
    pageView = ''
  } else {
    const page = <ServerPageLayout pageContext={pageContext} />

    const hydatePage = page

    pageView = await renderToStream(hydatePage, { userAgent })
  }

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="google" content="notranslate">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
      </head>
      <body>
        <div id="react-root">${pageView}</div>
      </body>
    </html>`

  return documentHtml
}

function addEcosystemStamp() {
  const g = globalThis as Record<string, unknown>
  g._isVikeReactApp = {}
}
addEcosystemStamp()
