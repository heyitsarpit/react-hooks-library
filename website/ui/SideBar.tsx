import {
  BreakPointHooks,
  breakpointsTailwind,
  useClickOutside
} from '@react-hooks-library/core'
import { useEffect, useRef } from 'react'

import { useSidebar } from '../utils/useSidebar'
import { FunctionList } from './FunctionList'

export const { useGreater } = BreakPointHooks(breakpointsTailwind)

export function SideBar() {
  const { sidebarOpen, setSideBar } = useSidebar()
  const isGreater = useGreater('md')
  const ref = useRef<HTMLElement>(null)

  useClickOutside(ref, () => {
    !isGreater ? setSideBar(false) : null
  })

  useEffect(() => {
    if (!ref.current) return

    if (sidebarOpen) {
      ref.current.classList.remove(
        'translate-x-[calc(-1*var(--sidebar-width))]'
      )
      ref.current.classList.add('md:translate-x-0')
    } else {
      ref.current.classList.remove('md:translate-x-0')
      ref.current.classList.add('translate-x-[calc(-1*var(--sidebar-width))]')
    }
  }, [sidebarOpen])

  useEffect(() => {
    setSideBar(isGreater)
  }, [isGreater, setSideBar])

  return (
    <aside
      ref={ref}
      className={`
      fixed 
      transform-gpu transition-transform duration-300
      top-[calc(var(--header-height))] 
      bottom-0 
      left-0
      md:translate-x-0
      translate-x-[calc(-1*var(--sidebar-width))]
      right-0 
      z-10 
      w-[var(--sidebar-width)] 
      p-4 
      overflow-auto 
      border-r 
      bg-bg-2 
      border-r-fg-1`}>
      <nav className="w-full">
        <FunctionList />
      </nav>
    </aside>
  )
}
