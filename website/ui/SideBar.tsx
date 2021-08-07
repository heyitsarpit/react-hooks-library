import Link from 'next/link'

import type { Route } from '../routes'
import { routes } from '../routes'

function FunctionList() {
  const groupedRoutes: {
    [key: string]: Route[]
  } = {}

  routes.forEach((route) => {
    if (groupedRoutes[route.category]) {
      groupedRoutes[route.category].push(route)
    } else {
      groupedRoutes[route.category] = [route]
    }
  })

  return (
    <>
      {Object.keys(groupedRoutes).map((category) => (
        <ul className="list-none" key={category}>
          {groupedRoutes[category].map(({ name, route }) => (
            <li className="before:contents" key={name}>
              <Link href={route}>
                <a className="hover:text-brand">{name}</a>
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </>
  )
}

export function SideBar() {
  return (
    <aside className="fixed transform-gpu transition-transform duration-300 top-[calc(var(--header-height)-1px)] bottom-0 left-0 translate-x-[calc(-1*var(--sidebar-width))] md:translate-x-0 right-0 z-10 w-[var(--sidebar-width)] p-4 overflow-auto border-r bg-bg-2 border-r-fg-1">
      <nav className="w-full">
        <FunctionList />
      </nav>
    </aside>
  )
}
