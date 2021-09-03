import { useState } from 'react'

import { useMount } from '../useMount'

/**
 * React FontFace, a hook to load fonts asynchronously
 *
 * @param family
 * @param source
 * @param descriptors
 *
 * @see https://react-hooks-library.vercel.app/core/useFont
 */
export function useFont(
  family: string,
  source: string | Blob,
  descriptors?: FontFaceDescriptors
) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [font, setFont] = useState<FontFace | null>(null)

  useMount(() => {
    const font = new FontFace(family, `url(${source})`, descriptors)

    setFont(font)

    font
      .load()
      .then(() => {
        document.fonts.add(font)
        setLoaded(true)
      })
      .catch(() => setError(true))
  })

  return { loaded, error, font }
}
