/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSidebar } from 'utils/useSidebar'

import { ThemeSwitch } from './ThemeSwitch'

export function Github() {
  return (
    <div className="hover:text-brand">
      <a
        className="flex items-center text-current hover:no-underline"
        href="https://github.com/react-hooks-library/react-hooks-library"
        target="_blank"
        rel="noopener noreferrer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-github">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
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
  const { toggleSideBar } = useSidebar()
  const router = useRouter()
  const Row = () => <div className="w-6 h-[3px] rounded-md bg-txt-2"></div>

  if (['/', '/design'].includes(router.asPath)) {
    return null
  }

  return (
    <button
      onClick={toggleSideBar}
      className="flex flex-col gap-[5px] bg-transparent md:hidden disabled:bg-transparent disabled:opacity-100 hover:opacity-100">
      <Row />
      <Row />
      <Row />
    </button>
  )
}

export function NavLinks() {
  const router = useRouter()
  const links = [
    {
      href: '/getting-started',
      label: 'Getting Started',
      isActive: router.asPath.includes('/getting-started')
    },
    {
      href: '/functions',
      label: 'Functions',
      isActive: router.asPath.includes('/functions')
    }
  ]

  return (
    <>
      {links.map(({ href, label, isActive }) => (
        <Link href={href} key={href}>
          <a
            className={`
        !no-underline
        pill hover:active
         ${isActive ? 'active text-brand' : 'text-txt-1'}`}>
            {label}
          </a>
        </Link>
      ))}
    </>
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

        <div className="ml-auto"></div>

        <div className="hidden gap-4 md:flex">
          <NavLinks />
        </div>

        <Github />
        <ThemeSwitch />
      </div>
    </header>
  )
}
