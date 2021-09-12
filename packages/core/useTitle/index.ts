import { useEffect, useState } from 'react'
import { useMount } from '../useMount'

import { useMutationObserver } from '../useMutationObserver'
import { _document } from '../_ssr.config'

/**
 * Reactive document title hook
 *
 * Set title or observe dom mutation reactively
 *
 * @param newTitle optional
 * @see https://react-hooks-library.vercel.app/core/useTitle
 */
export function useTitle(newTitle?: string) {
  const [title, setTitle] = useState(newTitle ?? '')

  useMount(() => {
    setTitle((newTitle || _document?.title) ?? '')
  })

  useEffect(() => {
    document.title = title
  }, [title])

  useMutationObserver(
    _document?.head.querySelector('title'),
    () => {
      if (document.title !== title) setTitle(document.title)
    },
    { childList: true }
  )

  return { title, setTitle }
}
