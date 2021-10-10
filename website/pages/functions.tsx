import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { Fragment } from 'react'

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

export default function Functions() {
  return (
    <>
      <NextSeo
        title="Functions — React Hooks Library"
        description="List of all functions for react hooks library"
        canonical="https://react-hooks-library.vercel.app/functions"
        openGraph={{
          url: 'https://react-hooks-library.vercel.app/functions',
          title: 'Functions — React Hooks Library',
          description: 'List of all functions for react hooks library'
        }}
      />
      <div className="p-8">
        <h1>Functions</h1>
        {Object.keys(groupedRoutes).map((category) => (
          <Fragment key={category}>
            <h2 className="text-lg font-bold capitalize text-txt-2">
              {category}
            </h2>
            <ul className="flex flex-col gap-3 list-none">
              {groupedRoutes[category].map(({ name, route, description }) => (
                <li key={name}>
                  <Link href={route}>
                    <a>{name}</a>
                  </Link>
                  <p>{description}</p>
                </li>
              ))}
            </ul>
          </Fragment>
        ))}
      </div>
    </>
  )
}
