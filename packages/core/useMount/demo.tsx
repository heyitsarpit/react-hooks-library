import { useState } from 'react'

import { useMount } from '.'

function Child() {
  useMount(() => {
    alert('I have been mounted')
  })

  return <div></div>
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
