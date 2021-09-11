import { useWindowSize } from '.'

export function Demo() {
  const { height, width } = useWindowSize()

  return (
    <div>
      <div>
        Dimensions - {height} x {width}
      </div>
      <div className="mb-1 text-xs opacity-80">
        Resize the window to observe changes
      </div>
    </div>
  )
}
