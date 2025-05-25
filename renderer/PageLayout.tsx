import { ReactNode, useMemo } from 'react'
import { DefaultLayout } from '@/layout/default-layout'
import ErrorBoundary from '@/components/error-boundary'
import { PageContextProvider } from '@/hooks/use-page-context'

function PassThrough({ children }: { children: ReactNode }) {
  return children
}

export function PageLayout({ pageContext }) {
  const VikeReactQueryWrapper = pageContext.config.VikeReactQueryWrapper ?? (PassThrough as any)

  const { Page } = pageContext

  return (
    // <React.StrictMode>
    <PageContextProvider pageContext={pageContext}>
      <ErrorBoundary>
        <VikeReactQueryWrapper>
          <Page />
        </VikeReactQueryWrapper>
      </ErrorBoundary>
    </PageContextProvider>
    // </React.StrictMode>
  )
}
