import { useRef } from 'react'

import { routes } from '../../../website/routes'
import { useScrollIntoView } from '.'

type ListItemProps = { isActive: boolean; name: string }

function ListItem({ isActive, name }: ListItemProps) {
  const activeEl = useRef<HTMLLIElement | null>(null)

  useScrollIntoView(activeEl, {
    scrollMargin: '8rem',
    block: 'end',
    behavior: 'smooth',
    predicate: isActive
  })

  return (
    <li
      ref={activeEl}
      className={`pill w-full before:hidden ${isActive ? 'active' : ''}`}>
      {name}
    </li>
  )
}

export function Demo() {
  return (
    <div>
      <ul className="h-64 p-4 m-4 overflow-y-scroll border border-gray-500">
        {routes.map(({ name }) => (
          <ListItem
            key={name}
            isActive={name === 'useScrollIntoView'}
            name={name}
          />
        ))}
      </ul>
    </div>
  )
}
