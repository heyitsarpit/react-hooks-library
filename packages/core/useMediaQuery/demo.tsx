import { useMediaQuery } from '.'

export function Demo() {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)')
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')

  const getClass = (condition: boolean) =>
    `mx-4 pill ${condition ? 'active' : 'danger'}`

  return (
    <div>
      <div className="mb-8">
        <div className="mb-1 text-xs opacity-80">
          Try resizing the window to observe change
        </div>
        <span>min-width: 1024px</span>
        <span className={getClass(isLargeScreen)}>{`${isLargeScreen}`}</span>
      </div>
      <div className="mt-4">
        <div className="mb-1 text-xs opacity-80">
          Try switching system color preference to observe change
        </div>
        <span>prefers-color-scheme: dark</span>
        <span className={getClass(prefersDark)}>{`${prefersDark}`}</span>
      </div>
    </div>
  )
}
