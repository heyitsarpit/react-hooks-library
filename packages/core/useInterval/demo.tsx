import { useCallback, useState } from 'react'

import { useInterval } from '.'

export function Demo() {
  const [count, setCount] = useState(0)

  const increment = useCallback(() => setCount((c) => c + 1), [])

  useInterval(increment, 1000)

  return (
    <div>
      Count - <span className="pill active">{count}</span>
    </div>
  )
}
