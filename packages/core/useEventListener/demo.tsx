import { useRef, useState } from 'react'

import { useEventListener } from '.'

export function Demo() {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [clickCount, setClickCount] = useState(0)
  const [lastPressed, setLastPressed] = useState('null')

  useEventListener('keyup', (ev) => {
    setLastPressed(ev.key)
  })

  useEventListener(buttonRef, 'click', () => {
    setClickCount((c) => c + 1)
  })

  return (
    <div>
      <button ref={buttonRef}>button clicked {clickCount} times!</button>
      <div className="mt-4">
        <div>press any key - </div>
        <div className="mt-4">
          last pressed: <span className="p-1 border">{lastPressed}</span>
        </div>
      </div>
    </div>
  )
}
