import { useRef, useState } from 'react'

import { useClickOutside } from '.'

function Dropdown(props: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) {
  const { isOpen, setIsOpen } = props
  const ref = useRef<HTMLDivElement>(null)

  useClickOutside(ref, () => {
    setIsOpen(false)
  })

  if (!isOpen) return null

  return (
    <div
      ref={ref}
      className="absolute flex items-center justify-center w-64 h-48 p-8 m-4 bg-fg-1">
      This is a dropdown, click outside to close
    </div>
  )
}

export function Demo() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <div>
        <button onClick={() => setIsOpen(true)} disabled={isOpen}>
          Open Dropdown
        </button>
      </div>
      <div>
        <Dropdown isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  )
}
