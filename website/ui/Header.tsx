import { ThemeSwitch } from './ThemeSwitch'

export function Header() {
  return (
    <header className="fixed top-0 bottom-0 left-0 right-0 z-10 h-[var(--header-height)] border-b bg-bg-2 border-b-fg-1 flex items-center">
      <div className="flex items-center justify-between w-full px-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.svg"
          alt="React Hooks Library Logo"
          className="py-2 ml-2 h-[var(--header-height)]"
        />
        <ThemeSwitch />
      </div>
    </header>
  )
}
