import { useIsSupported } from '.'

type NavigatorWithConnection = Navigator & {
  connection?: unknown
}

export function Demo() {
  const isSupported = useIsSupported(
    () => !!(navigator as NavigatorWithConnection)?.connection
  )

  return isSupported ? (
    <div className="pill success">`navigator.connection` Is supported</div>
  ) : (
    <div className="pill danger">`navigator.connection` Is not supported</div>
  )
}
