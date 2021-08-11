import { useState } from 'react'

import { usePrevious } from '.'

export function Demo() {
  const [count, setCount] = useState(0)
  const previousCount = usePrevious(count)

  return (
    <div>
      <div>Current Count is - {count}</div>
      <div>Previous Count is - {previousCount}</div>
      <button onClick={() => setCount((c) => c + 1)} className="mt-4">
        Increment
      </button>
    </div>
  )
}
