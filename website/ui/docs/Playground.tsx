import React from 'react'

type Props = { children: React.ReactNode }

export function Playground({ children }: Props) {
  return (
    <div className="bleed min-h-[16rem] polka px-12 py-2 top-[-2rem] border-b border-b-coolGray-200 dark:border-b-coolGray-900">
      <div className="absolute opacity-30 top-2 right-5">DEMO</div>
      <div className="flex items-center justify-center min-h-[inherit]">
        {children}
      </div>
    </div>
  )
}
