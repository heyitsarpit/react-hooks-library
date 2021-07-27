import { useCounter } from '.'

export function Demo() {
  const { dec, get, inc, reset, set } = useCounter(0)

  return (
    <div>
      <div>The value of count is - {get()}</div>
      <button onClick={() => inc()}>Increment</button>
      <button onClick={() => dec()}>Decrement</button>
      <button onClick={() => reset()}>Reset</button>
      <button onClick={() => set(-1000)}>Set to -1000</button>
    </div>
  )
}
