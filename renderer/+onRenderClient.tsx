import ReactDOM from 'react-dom/client'
import { configResponsive } from 'ahooks'
import { PageLayout } from './PageLayout'
import '@/style/layout.css'

configResponsive({
  xs: 0,
  sm: 375,
  // 以下算移动端
  md: 1000,
  lg: 1200,
  xl: 1440,
  xxl: 1850,
  xxxl: 2560,
})

let root: ReactDOM.Root
export const onRenderClient = async pageContext => {
  const page = <PageLayout pageContext={pageContext} />

  const container = document.getElementById('react-root')!

  if (container.innerHTML !== '' && pageContext.isHydration) {
    root = ReactDOM.hydrateRoot(container, page)
  } else {
    const title = pageContext.config.Head?.(pageContext)?.props?.metadata?.title
    if (title) document.title = title
    if (!root) {
      root = ReactDOM.createRoot(container)
    }

    root.render(page)
    return
  }
}
