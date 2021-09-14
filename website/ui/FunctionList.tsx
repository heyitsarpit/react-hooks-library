import { useScrollIntoView } from '@react-hooks-library/core'
import { AnimateSharedLayout, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useRef } from 'react'

import type { Route } from '../routes'
import { routes } from '../routes'

const groupedRoutes: {
  [key: string]: Route[]
} = {}

routes.forEach((route) => {
  const category = route.category.toLowerCase()

  groupedRoutes[category]
    ? groupedRoutes[category].push(route)
    : (groupedRoutes[category] = [route])
})

type ItemProps = {
  name: string
  route: string
  isActive: boolean
}

function ListItem({ name, route, isActive }: ItemProps) {
  const activeEl = useRef<HTMLLIElement | null>(null)

  useScrollIntoView(activeEl, {
    behavior: 'smooth',
    scrollMargin: 'calc(50vh - 5rem)',
    predicate: isActive
  })

  return (
    <li
      ref={activeEl}
      className="relative flex items-center w-full py-1 pl-0 before:hidden">
      {isActive ? (
        <motion.div
          layoutId="active"
          className="absolute w-full h-full active pill"
        />
      ) : null}
      <Link href={route} passHref scroll={false}>
        <a
          className={`block w-full pl-4 hover:text-brand hover:no-underline ${
            isActive ? 'font-semibold text-brand' : 'text-txt-1'
          }`}>
          {name}
        </a>
      </Link>
    </li>
  )
}

export function FunctionList() {
  const router = useRouter()

  const isActive = (name: string) => {
    return router.query.function === name
  }

  return (
    <AnimateSharedLayout>
      <motion.div layout>
        {Object.keys(groupedRoutes).map((category) => (
          <Fragment key={category}>
            <p className="text-lg font-bold capitalize text-txt-2">
              {category}
            </p>
            <ul className="list-none">
              {groupedRoutes[category].map(({ name, route }) => (
                <ListItem
                  key={name}
                  name={name}
                  route={route}
                  isActive={isActive(name)}
                />
              ))}
            </ul>
          </Fragment>
        ))}
      </motion.div>
    </AnimateSharedLayout>
  )
}
