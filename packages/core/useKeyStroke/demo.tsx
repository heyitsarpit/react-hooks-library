import { useState } from 'react'
import { useKeyDown } from '.'

export function Demo() {
  const [posX, setPosX] = useState(0)
  const [posY, setPosY] = useState(0)

  useKeyDown(['w', 'W', 'ArrowUp'], (e) => {
    setPosY((y) => y - 20)
    e.preventDefault()
  })
  useKeyDown(['s', 'S', 'ArrowDown'], (e) => {
    setPosY((y) => y + 20)
    e.preventDefault()
  })

  useKeyDown(['a', 'A', 'ArrowLeft'], (e) => {
    setPosX((x) => x - 20)
    e.preventDefault()
  })
  useKeyDown(['d', 'D', 'ArrowRight'], (e) => {
    setPosX((x) => x + 20)
    e.preventDefault()
  })

  return (
    <div>
      <div>
        Use
        <code>w</code>
        <code>a</code>
        <code>s</code>
        <code>d</code>
        or
        <code>&#8593;</code>
        <code>&#8592;</code>
        <code>&#8595;</code>
        <code>&#8594;</code>
        to move the orb
      </div>
      <div className="flex items-center justify-center w-80 h-52 ">
        <div
          className="z-50 w-10 h-10 rounded-full logo blur-sm animate-pulse"
          style={{
            transform: `translate(${posX}px, ${posY}px)`
          }}></div>
      </div>
    </div>
  )
}
