import { useResponsive } from 'ahooks'
import { ReactNode } from 'react'
import ClientOnly from '../client-only'

interface IResponsiveInfo {
  xs: boolean
  sm: boolean
  // 以下算 移动端
  md: boolean
  lg: boolean
  xl: boolean
  xxl: boolean
  xxxl: boolean
}
/** 在 responsive 基础上添加 mobile */
export function useAeResponsive() {
  const responsiveInfo = useResponsive() as any as IResponsiveInfo
  const isPc = responsiveInfo.md
  /** 0-375 */
  const isXs = responsiveInfo.xs && !responsiveInfo.sm
  return {
    ...responsiveInfo,
    /** 移动端 */
    isMobile: !isPc,
    /** PC 端 */
    isPc,
    isXs,
  }
}
type IImportLoad = () => Promise<{ default: React.ComponentType } | React.ComponentType>
export interface IAeResponsiveProps {
  /** 可以传入一个动态加载函数，以实现不加载另一端的代码 */
  children: ReactNode | IImportLoad
  /** 移动端展示 */
  mobileChildren?: ReactNode | IImportLoad
  fallback?: ReactNode
}
/** 响应式展示 PC 或移动端组件，PC 端优先 */
function AeResponsive(props: IAeResponsiveProps) {
  const responsive = useAeResponsive()
  const pcChildren =
    typeof props.children === 'function' ? (
      <ClientOnly load={props.children} fallback={props.fallback}>
        {Component => <Component />}
      </ClientOnly>
    ) : (
      props.children
    )
  const mobileChildren = props.mobileChildren ? (
    typeof props.mobileChildren === 'function' ? (
      // 需要加上 key，否则做不到响应式变化
      <ClientOnly key="mobile" load={props.mobileChildren} fallback={props.fallback}>
        {Component => <Component />}
      </ClientOnly>
    ) : (
      props.mobileChildren
    )
  ) : (
    pcChildren
  )
  return responsive.isPc ? pcChildren : mobileChildren
}

export default AeResponsive
