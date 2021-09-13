import { useIsSupported } from '.'

export function Demo() {
  const isSupported = useIsSupported(() => !!navigator?.connection)

  return isSupported ? (
    <div className="pill success">`navigator.connection` Is supported</div>
  ) : (
    <div className="pill danger">`navigator.connection` Is not supported</div>
  )
}
