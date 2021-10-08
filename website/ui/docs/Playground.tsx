import React from 'react'

type Props = { children: React.ReactNode }

export function Playground({ children }: Props) {
  return (
    <div className="bleed min-h-[16rem] polka px-12 pt-10 pb-2 top-[-2rem] border-b border-b-coolGray-200 dark:border-b-coolGray-900">
      <div className="absolute text-sm opacity-30 top-10 right-5 md:text-base">
        DEMO
      </div>
      <div className="flex items-center justify-center min-h-[inherit]">
        {children}
      </div>
    </div>
  )
}
