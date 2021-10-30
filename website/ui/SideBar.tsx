import {
  BreakPointHooks,
  breakpointsTailwind,
  useClickOutside
} from '@react-hooks-library/core'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { useSidebar } from 'utils/useSidebar'

import { FunctionList } from './FunctionList'
import { NavLinks } from './Header'

export const { useGreater } = BreakPointHooks(breakpointsTailwind)

export function SideBar() {
  const { sidebarOpen, setSideBar } = useSidebar()
  const isGreater = useGreater('md')
  const ref = useRef<HTMLElement>(null)

  const { asPath } = useRouter()

  useClickOutside(ref, () => {
    if (sidebarOpen && !isGreater) {
      setSideBar(false)
    }
  })

  useEffect(() => {
    if (!ref.current) return

    const classes = ref.current.classList
    const open = 'translate-x-0'
    const close = 'translate-x-[calc(-1*var(--sidebar-width))]'

    if (sidebarOpen) {
      classes.remove(close)
      classes.add(open)
    } else {
      classes.remove(open)
      classes.add(close)
    }
  }, [sidebarOpen])

  useEffect(() => {
    setSideBar(isGreater)
  }, [isGreater, setSideBar])

  if (asPath === '/') {
    return null
  }

  return (
    <aside
      ref={ref}
      className={`
      fixed
      top-0
      md:top-[calc(var(--header-height))]
      transform-gpu transition-transform duration-300
      md:translate-x-0
      translate-x-[calc(-1*var(--sidebar-width))]
      bottom-0
      left-0
      right-0
      z-10
      flex
      w-[var(--sidebar-width)]
      `}>
      <nav
        className={`
        w-[var(--sidebar-width)] 
        border-r border-r-fg-1
        bg-bg-2
        p-4 overflow-auto
        `}>
        <div className="flex flex-col gap-4 py-4 mb-4 border-b md:hidden border-b-fg-1">
          <NavLinks />
        </div>
        <FunctionList />
      </nav>
    </aside>
  )
}
