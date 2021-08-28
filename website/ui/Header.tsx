import Image from 'next/image'
import Link from 'next/link'

import { ThemeSwitch } from './ThemeSwitch'

function Github() {
  return (
    <div className="hover:text-brand">
      <a
        className="flex items-center text-current hover:no-underline"
        href="https://github.com/react-hooks-library/react-hooks-library"
        target="_blank"
        rel="noopener noreferrer">
        Github
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 ml-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    </div>
  )
}

function Logo() {
  return (
    <Link href="/">
      <a className="flex gap-4 py-2 ml-2 h-[var(--header-height)] w-32">
        <img src="/logo.png" alt="abcd" />
        <img src="/logo_text.svg" alt="abcd" />
      </a>
    </Link>
  )
}

export function Header() {
  return (
    <header className="fixed top-0 bottom-0 left-0 right-0 z-10 h-[var(--header-height)] border-b bg-bg-2 border-b-fg-1 flex items-center">
      <div className="flex items-center justify-between w-full px-2">
        <Logo />
        <Github />
        <ThemeSwitch />
      </div>
    </header>
  )
}
