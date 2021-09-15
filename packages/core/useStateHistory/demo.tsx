import { useStateHistory } from '.'

const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2)

export function Demo() {
  const { state, undo, redo, push, history, reset, redoAllowed } =
    useStateHistory({ num: 0, id: uid() }, { maxHistory: 5 })

  return (
    <div>
      <div className="mb-4">
        Current State: <span className="pill active">{state.num}</span>
      </div>
      <div>
        <ul className="flex gap-4 w-80">
          {history.map(({ num, id }) => (
            <li
              key={id}
              className={`pill before:hidden ${
                id === state.id ? 'active' : 'inactive'
              }`}>
              {num}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-4">
        <button onClick={() => push({ num: state.num + 2, id: uid() })}>
          Push
        </button>
        <button onClick={undo}>Undo</button>
        <button onClick={redo} disabled={!redoAllowed}>
          Redo
        </button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
}
