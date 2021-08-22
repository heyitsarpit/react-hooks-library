import { BreakPointHooks, breakpointsTailwind } from '.'

const { useGreater, useBetween, isGreater } =
  BreakPointHooks(breakpointsTailwind)

export function Demo() {
  const greater = useGreater('md')
  const between = useBetween('md', 'lg')

  const greaterNonReactive = isGreater('lg')

  const getClass = (condition: boolean) =>
    `mx-4 pill ${condition ? 'active' : 'danger'}`

  return (
    <div>
      <div className="mb-4 text-xs opacity-80">
        Try resizing the window to observe change
      </div>
      <div className="mb-4">
        <span>Size greater than &quot;md&quot; -</span>
        <span className={getClass(greater)}>{`${greater}`}</span>
      </div>
      <div className="mb-4">
        <span>Size greater than &quot;md&quot; (non reactive) -</span>
        <span
          className={getClass(
            greaterNonReactive
          )}>{`${greaterNonReactive}`}</span>
      </div>
      <div>
        <span>Size between &quot;md&quot; and &quot;lg&quot;-</span>
        <span className={getClass(between)}>{`${between}`}</span>
      </div>
    </div>
  )
}
