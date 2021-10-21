import { useSessionStorage } from '.'

export function Demo() {
  const [value, setValue] = useSessionStorage(
    'useSessionStorageKey',
    'Hello World'
  )

  return (
    <div className="flex flex-col justify-center gap-4">
      <div>
        State - <span className="pill active">{value}</span>
      </div>
      <div>
        <label htmlFor="useSessionStorage" className="text-sm opacity-70">
          Enter some text to update state and localStorage
        </label>
        <input
          type="text"
          id="useSessionStorage"
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  )
}
