import { useRef } from 'react'

import { useIntersectionObserver } from '.'

export function Demo() {
  const outer = useRef<HTMLDivElement | null>(null)
  const inner = useRef<HTMLDivElement | null>(null)

  const { inView } = useIntersectionObserver(inner, { root: outer })

  return (
    <div className="w-full p-6">
      <div className="flex justify-center mb-5">
        {inView ? (
          <div className="pill active">Visible</div>
        ) : (
          <div className="pill warning">Not Visible</div>
        )}
      </div>
      <div
        ref={outer}
        className="w-full h-56 px-4 py-12 overflow-y-scroll border-2 border-red-600 border-dotted">
        <div className="flex justify-center">Scroll Down</div>
        <div className="flex items-center justify-center w-full h-[35rem]">
          <div
            ref={inner}
            className="flex items-center justify-center w-3/4 h-12 border-2 border-green-600 border-dotted">
            Inner Box
          </div>
        </div>
      </div>
    </div>
  )
}
