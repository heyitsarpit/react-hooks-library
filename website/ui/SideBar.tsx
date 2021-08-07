import { FunctionList } from './FunctionList'

export function SideBar() {
  return (
    <aside className="fixed transform-gpu transition-transform duration-300 top-[calc(var(--header-height)-1px)] bottom-0 left-0 translate-x-[calc(-1*var(--sidebar-width))] md:translate-x-0 right-0 z-10 w-[var(--sidebar-width)] p-4 overflow-auto border-r bg-bg-2 border-r-fg-1">
      <nav className="w-full">
        <FunctionList />
      </nav>
    </aside>
  )
}
