import { useLocation } from '.'

export function Demo() {
  const router = useLocation()

  return (
    <div>
      <pre className="text-sm whitespace-pre-wrap">
        <code>{JSON.stringify(router, null, 2)}</code>
      </pre>
    </div>
  )
}
