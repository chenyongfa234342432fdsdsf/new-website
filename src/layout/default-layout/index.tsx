import React from 'react'
import classNames from 'clsx'
import styles from './index.module.css'

export { DefaultLayout }

function DefaultLayout({ children, pageContext }: { children: React.ReactNode; pageContext: PageContext }) {
  const { fullPage = false } = pageContext.config
  return (
    <div
      className={classNames('layout-wrap', styles.scoped, {
        'h-full': fullPage,
      })}
    >
      {children}
    </div>
  )
}
