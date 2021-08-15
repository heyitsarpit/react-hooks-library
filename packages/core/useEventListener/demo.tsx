import { useRef, useState } from 'react'

import { useEventListener } from '.'

export function Demo() {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [clickCount, setClickCount] = useState(0)
  const [lastClicked, setLastClicked] = useState('null')

  useEventListener('keyup', (ev) => {
    setLastClicked(ev.key)
  })

  useEventListener(buttonRef, 'click', () => {
    setClickCount((c) => c + 1)
  })

  return (
    <div>
      <button ref={buttonRef}>Button Clicked {clickCount} times!</button>
      <div className="mt-4">
        <div>Click any button - </div>
        <div className="mt-4">
          Last clicked: <span className="p-1 border">{lastClicked}</span>
        </div>
      </div>
    </div>
  )
}
