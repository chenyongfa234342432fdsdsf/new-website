import React, { lazy, useEffect, useState, startTransition, Suspense } from 'react'
import type { ComponentType, ReactNode } from 'react'
import FallBack from './fallback'

export default function ClientOnly<T>({
  load,
  children,
  fallback,
  deps = [],
  animation,
  isPriorityLow = false, // 优先级低
  isPriorityMedium = false, // 优先级中
}: {
  load: () => Promise<{ default: React.ComponentType<T> } | React.ComponentType<T>>
  children: (Component: React.ComponentType<T>) => ReactNode
  fallback?: ReactNode
  deps?: Parameters<typeof useEffect>[1]
  animation?: boolean
  /** 优先级低 */
  isPriorityLow?: boolean
  /** 优先级中 */
  isPriorityMedium?: boolean
}) {
  const [Component, setComponent] = useState<ComponentType<unknown> | null>(null)

  useEffect(() => {
    const loadComponent = () => {
      const _component = lazy(() =>
        load()
          .then(LoadedComponent => {
            return {
              default: () => children('default' in LoadedComponent ? LoadedComponent.default : LoadedComponent),
            }
          })
          .catch(error => {
            console.error('Component loading failed:', error)
            // eslint-disable-next-line react/no-unstable-nested-components
            return { default: () => <p>Error loading component.</p> }
          })
      )
      setComponent(_component)
    }

    startTransition(() => {
      // 如果已经加载过，则直接更新
      if (Component) {
        loadComponent()
        return
      }
      if (isPriorityMedium) {
        setTimeout(loadComponent, 1000)
        return
      }
      if (isPriorityLow) {
        setTimeout(loadComponent, 2000)
        return
      }
      loadComponent()
    })
  }, [isPriorityLow, ...deps])

  if (!Component) {
    return fallback
  }

  return (
    <Suspense fallback={animation ? <FallBack fallback={fallback} /> : fallback}>
      {Component ? <Component /> : fallback}
    </Suspense>
  )
}
