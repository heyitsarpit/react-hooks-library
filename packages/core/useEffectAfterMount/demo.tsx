import { useEffect, useState } from 'react'

import { useEffectAfterMount } from '.'

export function Demo() {
  const [count, setCount] = useState(0)
  const [firstEffect, setFirstEffect] = useState(false)
  const [secondEffect, setSecondEffect] = useState(false)

  useEffect(() => {
    setFirstEffect(true)
  }, [count])

  useEffectAfterMount(() => {
    setSecondEffect(true)
  }, [count])

  return (
    <div className="flex flex-col items-center gap-4">
      <div>
        First effect -{' '}
        <span className={`pill ${firstEffect ? 'active' : 'danger'}`}>
          {firstEffect ? 'ran' : 'did not run'}
        </span>
      </div>
      <div>
        Second effect -{' '}
        <span className={`pill ${secondEffect ? 'active' : 'danger'}`}>
          {secondEffect ? 'ran' : 'did not run'}
        </span>
      </div>
      <button onClick={() => setCount((c) => c + 1)}>Rerender</button>
    </div>
  )
}
