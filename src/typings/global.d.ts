import type { PageContext, PageContextClient } from 'vike/types'
declare global {
  type LayoutParams = {
    headerShow?: boolean
    footerShow?: boolean
    fullScreen?: boolean
  }
  type PageContextHeader = Record<string, unknown>
  type PageContext = {
    type: string
    data?: any
    Page?: React.ReactNode
    exports?: Record<string, unknown> & {
      title?: string
      description?: string
    }
    userAgent?: string
    locale?: string
    pageProps?: Record<string, unknown>
    headers: PageContextHeader
    title?: string
    gitCommitId?: string
    description?: string
    theme?: string
    layoutParams?: LayoutParams
    businessId: number
    routeParams: Record<string, string>
    path: string
    host: string
    urlPathname: string
    auth_token: string
    urlParsed: {
      pathname: string
      search: null | Record<string, string>
      hash: null | string
    }
    needSeo?: boolean
    authTo?: string
    unAuthTo?: string
    page?: any
    root?: any
    config?: {
      /** 百分百高度 */
      fullPage?: boolean
      /** 是否启用 设置图标 */
      SettingIcon?: boolean
      /** 是否启用 客服按钮 */
      Intercom?: boolean
      /** 是否启用 ssr */
      ssr?: boolean
      /** 是否用默认布局 */
      Layout?: boolean
      /** 是否启用 积分页面菜单 */
      PointsSidebar?: boolean
      SearchIcon?: boolean
      /** 是否显示 Footer */
      showFooter?: boolean
      /** 默认布局是否有 padding-bottom */
      defaultLayoutHasPaddingBottom?: boolean
      /** 默认占用满屏幕，如果此页面内容较多超过满屏幕，建议使用这个配置 */
      showInitialContent?: boolean
    } & Record<string, unknown>
    abortReason?: any
  } & PageContextClient
  interface Window {
    TradingView: any
  }
}
