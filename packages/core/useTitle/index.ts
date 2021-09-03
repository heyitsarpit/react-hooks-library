import { useEffect, useState } from 'react'

import { useMutationObserver } from '../useMutationObserver'

/**
 * Reactive document title hook
 *
 * Set title or observe dom mutation reactively
 *
 * @param newTitle optional
 * @see https://react-hooks-library.vercel.app/core/useTitle
 */
export function useTitle(newTitle?: string) {
  const [title, setTitle] = useState(newTitle || document.title)

  useEffect(() => {
    document.title = title
  }, [title])

  useMutationObserver(
    document.head.querySelector('title'),
    () => {
      if (document.title !== title) setTitle(document.title)
    },
    { childList: true }
  )

  return { title, setTitle }
}
