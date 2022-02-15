import { useCallback, useState } from 'react'

export type UseAsyncState<T> = {
  data: T | undefined
  error: boolean
  isLoading: boolean
}

/**
 * Returns a current execution state of an async function.
 * Use it to orchestrate async actions in UI.
 *
 * @see https://react-hooks-library.vercel.app/core/useAsyncCallback
 */
export function useAsyncCallback<Args extends unknown[], ResolvedType>(
  callback: (...args: Args) => Promise<ResolvedType>
): [UseAsyncState<ResolvedType>, (...args: Args) => Promise<ResolvedType>] {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState<ResolvedType>()

  const _callback = useCallback(
    async (...args: Args) => {
      try {
        setLoading(true)
        const results = await callback(...args)
        setData(results)

        return results
      } catch (e) {
        setError(true)
        throw e
      } finally {
        setLoading(false)
      }
    },
    [callback]
  )

  return [{ data, error, isLoading }, _callback]
}
