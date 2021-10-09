/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useSidebar } from 'utils/useSidebar'

import { ThemeSwitch } from './ThemeSwitch'

function Github() {
  return (
    <div className="ml-auto hover:text-brand">
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
      <a className="flex items-center gap-4 py-2 ml-2 h-[var(--header-height)] w-32">
        <img src="/logo.png" alt="Logo" className="w-8 h-8" />
        <img
          className="hidden h-7 md:inline"
          src="/logo_text.png"
          alt="React Hooks Library Text"
        />
      </a>
    </Link>
  )
}

function Hamburger() {
  const { sidebarOpen, toggleSideBar } = useSidebar()

  const Row = () => <div className="w-6 h-[3px] rounded-md bg-txt-2"></div>

  return (
    <button
      onClick={toggleSideBar}
      // closing handler is at <Sidebar />
      disabled={sidebarOpen}
      className="flex flex-col gap-[5px] bg-transparent md:hidden disabled:bg-transparent disabled:opacity-100 hover:opacity-100">
      <Row />
      <Row />
      <Row />
    </button>
  )
}

export function Header() {
  return (
    <header className="fixed top-0 bottom-0 left-0 right-0 z-10 h-[var(--header-height)] border-b bg-bg-2 border-b-fg-1 flex items-center">
      <div className="flex items-center justify-between w-full gap-4 px-2">
        <div className="flex items-center">
          <Hamburger />
          <Logo />
        </div>

        <Github />
        <ThemeSwitch />
      </div>
    </header>
  )
}
