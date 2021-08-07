import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'

import type { Route } from '../routes'
import { routes } from '../routes'

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

export function FunctionList() {
  const router = useRouter()
  const isActive = (route: string) =>
    router.asPath.includes(route) ? 'active rounded-lg' : ''

  return (
    <>
      {Object.keys(groupedRoutes).map((category) => (
        <ul className="list-none" key={category}>
          {groupedRoutes[category].map(({ name, route }) => (
            <li
              className={`w-full py-1 before:hidden ${isActive(route)}`}
              key={route}>
              <Link href={route}>
                <a className="block hover:text-brand">{name}</a>
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </>
  )
}
