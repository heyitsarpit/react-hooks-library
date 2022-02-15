import { useCallback } from 'react'

import { useAsyncCallback } from '.'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function Demo() {
  const fn = useCallback(async () => {
    await sleep(3000)
    return 5000
  }, [])

  const [fnState, fnCallback] = useAsyncCallback(fn)

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {fnState.isLoading ? (
        <div className="pill warning">Loading...</div>
      ) : null}

      {fnState.error ? (
        <div className="pill error">An Error Occurred</div>
      ) : null}

      {fnState.data ? <div className="pill active">{fnState.data}</div> : null}

      <button onClick={fnCallback}>Call Function</button>
    </div>
  )
}
