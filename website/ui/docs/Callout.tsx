type CalloutProps = {
  type: 'info' | 'success' | 'warning' | 'danger'
  children: React.ReactNode
}

export function Callout({ type, children }: CalloutProps) {
  const emoji =
    type === 'info'
      ? '💡'
      : type === 'success'
        ? '✅'
        : type === 'warning'
          ? '⚠️'
          : '🚨'

  return (
    <blockquote
      className={`my-4 px-2 py-1 rounded-lg flex items-center ${type}`}>
      <div className="mx-2 text-xl">{emoji}</div>
      {children}
    </blockquote>
  )
}
