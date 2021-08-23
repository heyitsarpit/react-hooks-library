import { useRef } from 'react'

import { useMutationObserver } from '.'

export function Demo() {
  const ref = useRef<HTMLDivElement | null>(null)

  useMutationObserver(
    ref,
    () => {
      console.log('useMutationObserver')
    },
    { attributes: true }
  )

  return <div ref={ref}>Hello World</div>
}
