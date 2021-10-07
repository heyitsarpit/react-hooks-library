import { BreakPointHooks, breakpointsTailwind } from '@react-hooks-library/core'
import { useEffect } from 'react'

import { useSidebar } from '../utils/useSidebar'
import { FunctionList } from './FunctionList'

const { useGreater } = BreakPointHooks(breakpointsTailwind)

export function SideBar() {
  const { sidebarOpen, setSideBar } = useSidebar()
  const isGreater = useGreater('md')

  useEffect(() => {
    setSideBar(isGreater)
  }, [isGreater, setSideBar])

  return (
    <aside
      className={`fixed 
      transform-gpu 
      transition-transform 
      duration-300 
      top-[calc(var(--header-height))] 
      bottom-0 
      left-0 
      ${
        sidebarOpen
          ? 'translate-x-0'
          : 'translate-x-[calc(-1*var(--sidebar-width))] '
      }
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
