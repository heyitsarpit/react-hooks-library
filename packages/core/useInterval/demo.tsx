import { useCallback, useState } from 'react'

import { useInterval } from '.'

export function Demo() {
  const [count, setCount] = useState(0)
  const [paused, setPaused] = useState(false)

  const increment = useCallback(() => setCount((c) => c + 1), [])

  useInterval(increment, 1000, { paused })

  return (
    <div className="flex flex-col gap-4">
      <div>
        Count - <span className="pill active">{count}</span>
      </div>
      <button onClick={() => setPaused((p) => !p)}>
        {paused ? 'Unpause' : 'Pause'}
      </button>
    </div>
  )
}
