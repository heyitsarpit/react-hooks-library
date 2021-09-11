import { useRef } from 'react'

import { useScroll } from '.'

export function Demo() {
  const box = useRef<HTMLDivElement | null>(null)
  const { x, y } = useScroll(box)

  return (
    <div className="w-full p-6">
      <div className="flex justify-center mb-5">
        <div className="flex flex-col gap-4">
          <div>
            Horizontally scrolled -{' '}
            <span className="active pill">{(x * 100).toFixed(0)}%</span>
          </div>
          <div>
            Vertically scrolled -{' '}
            <span className="active pill">{(y * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>
      <div
        ref={box}
        className="w-full h-56 px-4 py-12 overflow-y-scroll border-2 border-red-600 border-dotted">
        <div className="flex items-center justify-center">
          Scroll Vertically and Horizontally
        </div>
        <div className="flex items-center justify-center w-[100rem] h-[35rem]"></div>
      </div>
    </div>
  )
}
