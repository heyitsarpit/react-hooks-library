import { AnimateSharedLayout, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'

import type { Route } from '../routes'
import { routes } from '../routes'

const groupedRoutes: {
  [key: string]: Route[]
} = {}

routes.forEach((route) => {
  groupedRoutes[route.category]
    ? groupedRoutes[route.category].push(route)
    : (groupedRoutes[route.category] = [route])
})

type ItemProps = {
  name: string
  route: string
  isActive: boolean
}

function ListItem({ name, route, isActive }: ItemProps) {
  return (
    <li className="relative flex items-center w-full py-1 pl-0 before:hidden">
      {isActive ? (
        <motion.div
          layoutId="active"
          className="absolute w-full h-full active pill"
        />
      ) : null}
      <Link href={route} passHref scroll={false}>
        <a
          className={`block w-full pl-4 hover:text-brand hover:no-underline ${
            isActive ? 'font-semibold' : ''
          }`}>
          {name}
        </a>
      </Link>
    </li>
  )
}

export function FunctionList() {
  const router = useRouter()
  const isActive = (route: string) => router.asPath.includes(route)

  return (
    <AnimateSharedLayout>
      <motion.div layout>
        {Object.keys(groupedRoutes).map((category) => (
          <ul className="list-none" key={category}>
            {groupedRoutes[category].map(({ name, route }) => (
              <ListItem
                key={name}
                name={name}
                route={route}
                isActive={isActive(route)}
              />
            ))}
          </ul>
        ))}
      </motion.div>
    </AnimateSharedLayout>
  )
}
