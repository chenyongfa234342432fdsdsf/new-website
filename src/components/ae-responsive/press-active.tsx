import clsx from 'clsx'
import { ReactNode, Children, useState, cloneElement, useRef } from 'react'
import { useAeResponsive } from '.'

export interface IPressActiveProps {
  /** 激活态的类名 */
  pressClassName?: string
  children: ReactNode
  /** 是否使用 hover 代替 mousedown 效果 */
  useHover?: boolean
  /** PC 端是否使用 mouseDown，默认为 true，不需要可传 false */
  useMouseDown?: boolean
  /** 需要忽略的选择器，用于可以点击整体，也可以点击部分的情况，但是需要注意，此属性只适用于移动端和 useHover 为 false 的情况，对于 hover 无效 */
  ignoreSelectors?: string[]
}
/**
 * 统一移动端和 PC 按下激活态的组件
 * 会在子元素添加对应类名，默认为 ae-press-active，编写样式时加上&.ae-press-active 和&:hover 即可，hover 另行处理，或使用变体 press-active:xxx
 * 如果不需要 pc 端 press 效果，想用 hover 代替，可以传入 useHover: true，会用 mouseEnter 和 mouseLeave 代替 press 效果
 */
export function PressActiveBox(props: IPressActiveProps) {
  const child = Children.only(props.children) as JSX.Element
  const propsUseMouseDown = props.useMouseDown ?? true
  const [isPress, setIsPress] = useState(false)
  const propsPressClassName = props.pressClassName ?? 'ae-press-active'
  const { isMobile, isPc } = useAeResponsive()
  // touchstart 时间，避免闪烁，稍微延迟一些
  const touchstartTimeRef = useRef(0)
  const dataId = useRef(Math.random().toString())
  /** 判断是否该继续执行，仅适用于 touch 和 mousedown */
  const shouldContinue = (e: MouseEvent) => {
    // 首先对于存在 dataPressActiveBox 的子元素，忽略
    const target = (e.target as HTMLElement).closest('[dataPressActiveBoxId]')! as HTMLElement
    if (target?.getAttribute('datapressactiveboxid') !== dataId.current) return false
    // 接着如果有 ignoreSelector，且点击的是 ignoreSelector 的子元素，忽略，默认会会忽略这些组件
    const ignoreSelectors = ['.ae-tooltip-trigger', '.ae-dropdown-trigger', '.aeui-select', '.aeui-switch'].concat(
      props.ignoreSelectors ?? []
    )
    for (const selector of ignoreSelectors) {
      if ((e.target as HTMLElement).closest?.(selector)) return false
    }
    return true
  }
  const onTouchStart = (e: any) => {
    if (!shouldContinue(e)) return
    touchstartTimeRef.current = Date.now()
    setIsPress(true)
    child.props.onTouchStart?.(e)
  }
  const onTouchEnd = (e: any) => {
    if (!shouldContinue(e)) return
    let restTime = 200 - (Date.now() - touchstartTimeRef.current)
    if (restTime < 0) restTime = 0
    child.props.onTouchEnd?.(e)
    // 避免闪烁，至少也激活一段时间
    setTimeout(() => {
      setIsPress(false)
    }, restTime)
  }
  const mouseDownTimeRef = useRef(0)
  const onMouseDown = (e: any) => {
    if (!shouldContinue(e)) return
    mouseDownTimeRef.current = Date.now()
    setIsPress(true)
    child.props.onMouseDown?.(e)
  }
  const onMouseUp = (e: any) => {
    if (!shouldContinue(e)) return
    let restTime = 200 - (Date.now() - mouseDownTimeRef.current)
    if (restTime < 0) restTime = 0
    child.props.onMouseUp?.(e)
    // 避免闪烁，至少也激活一段时间
    setTimeout(() => {
      setIsPress(false)
    }, restTime)
  }
  const onMouseEnter = (e: any) => {
    setIsPress(true)
    child.props.onMouseEnter?.(e)
  }
  const onMouseLeave = (e: any) => {
    setIsPress(false)

    child.props.onMouseLeave?.(e)
  }
  // 看情况监听不同事件
  const events = {
    ...(isMobile
      ? {
          onTouchStart,
          onTouchEnd,
        }
      : {}),
    ...(props.useHover && isPc
      ? { onMouseEnter, onMouseLeave }
      : {
          ...(propsUseMouseDown ? { onMouseDown, onMouseUp } : {}),
        }),
  }

  return cloneElement(child, {
    ...child.props,
    ...events,
    className: clsx(child.props.className, {
      [propsPressClassName]: isPress,
    }),
    datapressactiveboxid: dataId.current,
  })
}
