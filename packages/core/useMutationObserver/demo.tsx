import { useRef, useState } from 'react'

import { useUnMount } from '../useUnMount'
import { useMutationObserver } from '.'

export function Demo() {
  const ref = useRef<HTMLButtonElement | null>(null)
  const [observed, setObserved] = useState(false)

  useMutationObserver(
    ref,
    (mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes') {
          setObserved(true)
        }
      }
    },
    { attributes: true }
  )

  useUnMount(stop)

  const addAttribute = () => {
    if (!ref.current) return

    ref.current.setAttribute('data-mut', 'hello world')
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="mb-4">
        {observed
          ? 'Observed attribute change to node'
          : 'No changes observed yet'}
      </div>

      <button ref={ref} onClick={addAttribute} disabled={observed}>
        {observed ? 'Added Attribute To Node' : 'Add Attribute To Node'}
      </button>
    </div>
  )
}
