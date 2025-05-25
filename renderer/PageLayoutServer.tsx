import { ReactNode } from 'react'
import { PageContextProvider } from '@/hooks/use-page-context'
import { ConfigProvider } from 'antd'
import { DefaultLayout } from '@/layout/default-layout'
import ErrorBoundary from '@/components/error-boundary'

function PassThrough({ children }: { children: ReactNode }) {
  return children
}

export function ServerPageLayout({ pageContext }) {
  const Layout = pageContext.config.Layout || DefaultLayout
  const VikeReactQueryWrapper = pageContext.config.VikeReactQueryWrapper ?? (PassThrough as any)
  const { Page } = pageContext

  return (
    // <React.StrictMode>
    <PageContextProvider pageContext={pageContext}>
      <ConfigProvider prefixCls="online-wallet">
        <ErrorBoundary>
          <VikeReactQueryWrapper>
            {pageContext.config.Layout === false ? Page ? <Page /> : null : <Layout>{Page ? <Page /> : null}</Layout>}
          </VikeReactQueryWrapper>
        </ErrorBoundary>
      </ConfigProvider>
    </PageContextProvider>
    // </React.StrictMode>
  )
}
