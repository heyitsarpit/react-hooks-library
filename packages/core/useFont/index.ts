import { useEffect, useState } from 'react'

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
  const [loaded, setLoaded] = useState(true)
  const [error, setError] = useState(false)
  const [font, setFont] = useState<FontFace | null>(null)

  useEffect(() => {
    const font = new FontFace(family, `url(${source})`, descriptors)

    setFont(font)
    setLoaded(false)

    font
      .load()
      .then(() => document.fonts.add(font))
      .catch(() => setError(true))
      .finally(() => setLoaded(true))
  }, [descriptors, family, source])

  return { loaded, error, font }
}
