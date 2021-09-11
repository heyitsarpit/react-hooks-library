import { useToggle } from '.'

export function Demo() {
  const { bool, setFalse, setTrue, toggle } = useToggle()

  return (
    <div>
      <div className="mb-4 text-[8rem] text-center">{bool ? '🐵' : '🙈'}</div>
      <div className="flex gap-4">
        <button onClick={toggle}>Toggle</button>
        <button onClick={setTrue} disabled={bool}>
          On
        </button>
        <button onClick={setFalse} disabled={!bool}>
          Off
        </button>
      </div>
    </div>
  )
}
