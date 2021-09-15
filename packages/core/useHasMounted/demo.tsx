import { useHasMounted } from '.'

export function Demo() {
  const hasMounted = useHasMounted()

  return (
    <div className={`pill ${hasMounted ? 'success' : 'danger'}`}>
      {hasMounted ? 'Mounted' : 'Not Yet Mounted'}
    </div>
  )
}
