import { useOnline } from '.'

export function Demo() {
  const isOnline = useOnline()

  return (
    <div className="flex flex-col items-center">
      {isOnline ? (
        <div className="pill success">Online</div>
      ) : (
        <div className="pill danger">Offline</div>
      )}
      <small className="mt-4 opacity-70">
        Toggle your network to observe changes
      </small>
    </div>
  )
}
