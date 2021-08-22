import { useRouter } from '.'

export function Demo() {
  const router = useRouter()

  return (
    <div>
      <pre className="text-sm whitespace-pre-wrap">
        <code>{JSON.stringify(router, null, 2)}</code>
      </pre>
    </div>
  )
}
