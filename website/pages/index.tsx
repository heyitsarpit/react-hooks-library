/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

const features = [
  {
    img: '🔮',
    title: 'Typescript',
    description:
      'Written in typescript so you get the advantage of strong type safety'
  },
  {
    img: '🧠',
    title: 'Server Side Ready',
    description:
      'All hooks handle SSR rendering and work well with frameworks like Next/Gatsby'
  },
  {
    img: '🌿',
    title: 'Tree Shakable',
    description:
      'Exported as es modules, import cost for individual function is tiny'
  },

  {
    img: '🎡',
    title: 'Interactive Demos',
    description: 'All hooks have a demo example to demonstrate their use'
  }
]

const Logo = () => (
  <div className="relative">
    <div className="relative z-[1] flex items-start justify-center gap-8 h-16 md:h-28">
      <img src="/logo.png" alt="logo" className="h-full" />
      <img src="/logo_text.png" alt="react hooks library" className="h-full" />
    </div>
    <div className="absolute top-0 left-8 z-0 flex justify-center gap-4 saturate-200 scale-[2] h-28 blur-3xl">
      <img src="/logo_text.png" alt="react hooks library" />
      <div className="absolute z-[-1] w-20 h-20 opacity-40 rounded-full logo"></div>
    </div>
  </div>
)

export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-200px)] gap-20 p-8 overflow-hidden polka polka-animation">
        <Logo />
        <div>
          <p className="mb-8">A collection of hooks and utilities for React</p>
          <div className="p-4 font-mono text-sm font-light border-2 md:text-base logo-glow dark:border-trueGray-900/90 border-trueGray-200/90 border-opacity-20 rounded-3xl dark:bg-trueGray-900/50 bg-trueGray-200/50">
            npm i @react-hooks-library/core
          </div>
        </div>
        <div className="flex gap-8">
          <Link href="/getting-started">
            <a className="!no-underline font-light shadow-lg dark:shadow-white-lg dark:hover:shadow-white-xl hover:shadow-xl text-sm uppercase rounded-lg p-3 text-bg-2 bg-trueGray-900 dark:bg-white">
              Get Started
            </a>
          </Link>
          <Link href="/functions">
            <a className="!no-underline bg-white dark:bg-trueGray-900 font-light text-sm uppercase border border-trueGray-900 dark:border-trueGray-100 p-3 rounded-lg text-trueGray-900 dark:text-white">
              All Functions
            </a>
          </Link>
        </div>
      </div>

      <div className="grid w-2/3 grid-cols-2 gap-4 mx-auto mt-12">
        {features.map(({ img, description, title }) => (
          <section key={title} className="flex items-start gap-4 mb-4">
            <div>
              <div className="relative flex items-center justify-center w-12 h-12 mt-2 overflow-hidden rounded-lg">
                <div className="text-3xl">{img}</div>
                <div className="absolute text-3xl scale-150 blur-lg">{img}</div>
              </div>
            </div>
            <div>
              <h2 className="m-0 text-lg">{title}</h2>
              <p>{description}</p>
            </div>
          </section>
        ))}
      </div>
      <div className="flex justify-center mt-16 mb-6 opacity-50">
        MIT © 2021 | Arpit
      </div>
    </div>
  )
}
