import { usePreferredColorScheme } from '.'

export function Demo() {
  const colorScheme = usePreferredColorScheme()

  return (
    <div>
      <div className="mb-1 text-xs opacity-80">
        Try switching system color preference to observe change
      </div>
      <div>
        Preferred color scheme is -{' '}
        <span className="pill active">{colorScheme}</span>
      </div>
    </div>
  )
}
