import { ThemeSwitch } from './ThemeSwitch'

export function Header() {
  return (
    <header className="fixed top-0 bottom-0 left-0 right-0 z-10 h-[var(--header-height)] border-b bg-bg-2 border-b-fg-1">
      <ThemeSwitch />
    </header>
  )
}
