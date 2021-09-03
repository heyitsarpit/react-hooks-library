import { useFont } from '.'

export function Demo() {
  const fontName = 'JetBrains Mono Custom'
  const { error, loaded, font } = useFont(
    fontName,
    '/fonts/JetBrainsMono-Thin.woff2'
  )

  if (error) {
    return <div className="pill danger">Error loading font</div>
  }

  if (!loaded) {
    return <div>Loading Font</div>
  }

  return (
    <div>
      <div style={{ fontFamily: fontName }} className="pill active">
        New Font Loaded!!!
      </div>
      <div className="mt-4">Font Family - {font?.family}</div>
    </div>
  )
}
