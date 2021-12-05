import { useRef } from 'react'

import { useHover } from '.'

export function Demo() {
  const ref = useRef<HTMLDivElement | null>(null)
  const isHovered = useHover(ref)

  return (
    <div ref={ref} className={`${isHovered ? 'active' : 'warning'} pill`}>
      {isHovered ? 'Hovered' : 'Not Hovered'}
    </div>
  )
}
