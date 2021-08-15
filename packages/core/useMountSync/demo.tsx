import { useState } from 'react'

import { useMountSync } from '.'

function Child() {
  useMountSync(() => {
    const el = document.querySelector('#mount-sync')
    alert(`I have been mounted. I am a <${el?.tagName}> tag`)
  })

  return <strong id="mount-sync"></strong>
}

export function Demo() {
  const [mounted, setMounted] = useState(false)

  return (
    <div>
      <button onClick={() => setMounted((b) => !b)}>
        {mounted ? 'Mounted' : 'UnMounted'}
      </button>

      {mounted ? <Child /> : null}
    </div>
  )
}
