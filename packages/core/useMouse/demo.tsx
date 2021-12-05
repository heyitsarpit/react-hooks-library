import { useMouse } from '.'

export function Demo() {
  const { x, y } = useMouse()

  return (
    <div>
      <div className="flex flex-col min-w-[10rem] gap-4">
        <span>
          x: <span className="active pill">{x}</span>
        </span>
        <span>
          y: <span className="active pill">{y}</span>
        </span>
      </div>
    </div>
  )
}
