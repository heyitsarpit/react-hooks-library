import React from 'react'

type Props = { children: React.ReactNode }

export function Playground({ children }: Props) {
  return (
    <div className="relative playground w-screen md:w-[var(--width)] ml-[var(--margin-left)] p-12 bg-fg-1 top-[-2rem]">
      {children}
    </div>
  )
}
