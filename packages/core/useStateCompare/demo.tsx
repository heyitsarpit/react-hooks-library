import { useStateCompare } from '.'

type State = {
  count: number
}
const compare = (oldState: State, newState: State) =>
  oldState.count === newState.count ? oldState : newState

export function Demo() {
  const [state, setState] = useStateCompare<State>({
    initialValue: () => ({ count: 0 }),
    compare
  })

  return (
    <div className="flex flex-col justify-center gap-4">
      <div>
        Count - <span className="pill active">{state.count}</span>
      </div>
      <div>
        <button onClick={() => setState({ count: state.count + 1 })}>
          Increment
        </button>
      </div>
    </div>
  )
}
