import { useContext, createContext, ReactNode } from 'react'
import { getGlobalObject } from '@/helper/get-global-object'
import { envIsServer } from '@/helper/env'
import { pageOmitKeys } from '@/constants/base'

const globalObject = getGlobalObject('PageContextProvider.ts', {
  reactContext: createContext<PageContext>(undefined as never),
})

function PageContextProvider({ pageContext, children }: { pageContext: PageContext; children: ReactNode }) {
  const { reactContext } = globalObject

  if (envIsServer) {
    return <reactContext.Provider value={pageContext as PageContext}>{children}</reactContext.Provider>
  }
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  let pageContextVal = {}
  // 删除一些杂项
  Object.keys(pageContext).forEach(key => {
    if (!pageOmitKeys.includes(key)) {
      pageContextVal[key] = pageContext[key]
    }
  })
  return <reactContext.Provider value={pageContextVal as PageContext}>{children}</reactContext.Provider>
}

function usePageContext() {
  const { reactContext } = globalObject
  const pageContext = useContext(reactContext)
  return pageContext
}

export { PageContextProvider }
export { usePageContext }
