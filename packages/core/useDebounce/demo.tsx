import { useState } from 'react'

import { useDebounce } from '.'

export function Demo() {
  const [text, setText] = useState('Hello World')
  const [delay, setDelay] = useState(1000)

  const debouncedText = useDebounce(text, delay)

  return (
    <div className="flex flex-col">
      <div>
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          defaultValue={text}
        />
        <span>
          <span>
            Delay(ms)
            <input
              type="number"
              defaultValue={delay}
              min="0"
              max="10000"
              step="100"
              onChange={(e) => setDelay(Number(e.target.value))}
            />
          </span>
        </span>
      </div>
      <div>
        Debounced Value - <div className="text-lg">{debouncedText}</div>
      </div>
    </div>
  )
}
