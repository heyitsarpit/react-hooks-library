import React from 'react'

type Props = { children: React.ReactNode }

export function Playground({ children }: Props) {
  return (
    <div className="relative border-b border-b-coolGray-200 dark:border-b-coolGray-900 polka playground w-screen md:w-[var(--width)] ml-[var(--margin-left)] p-12 top-[-2rem]">
      <div className="absolute opacity-30 top-2 left-2">DEMO</div>
      {children}
    </div>
  )
}
