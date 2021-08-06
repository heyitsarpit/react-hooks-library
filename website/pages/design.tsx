import { getMDXComponent } from 'mdx-bundler/client'
import { InferGetStaticPropsType } from 'next'
import React, { useMemo, useRef, useState } from 'react'
import { useEffect } from 'react'

import { ThemeSwitch } from '../ui/ThemeSwitch'
import { loadMdx } from '../utils/loadMDX'

const Color = ({ className = '' }) => {
  const [color, setColor] = useState('')
  const ref = useRef()

  useEffect(() => {
    const color = getComputedStyle(ref.current).getPropertyValue(
      'background-color'
    )

    console.log(color)
  }, [])

  return (
    <div
      ref={ref}
      className={`w-12 h-12 rounded-full ring-1 ring-trueGray-200 dark:ring-warmGray-800 ${className}`}></div>
  )
}

export async function getStaticProps() {
  const mdxSource = `
  \`\`\`tsx
  /**
   * Used to debounce a quickly changing value.
   * Will return the latest value after a specified amount of time.
   *
   * @param {T} value
   * @param timeout
   * @returns {Readonly<T>} latest value
   * @see https://react-hooks-library.vercel.app/core/useDebounce
   */
  export function useDebounce<T>(value: T, timeout: number): Readonly<T> {
    const [state, setState] = useState(value)
  
    useEffect(() => {
      const tick = setTimeout(() => setState(value), timeout)
  
      return () => clearTimeout(tick)
    }, [value, timeout])
  
    if (timeout <= 0) return value
    return state
  }
  \`\`\`
`
  const posts = await loadMdx(mdxSource)
  return { props: posts }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function Design({ code }: Props) {
  const CodeComponent = useMemo(() => getMDXComponent(code), [code])

  return (
    <div className="flex flex-col w-full h-full gap-8 px-8 py-24 mx-auto md:max-w-screen-md 2xl:max-w-screen-2xl">
      <h1>Design System</h1>
      <ThemeSwitch />
      <section className="flex flex-col gap-8">
        <h2>Colors</h2>
        <div>
          <h3>Brand</h3>
          <div className="flex items-center gap-5">
            <div>{'--brand'}</div>
            <Color className="bg-brand"></Color>
          </div>
        </div>
        <div>
          <h3>Background</h3>
          <div className="flex items-center gap-5 mb-4">
            <div>{'--bg-1'}</div>
            <Color className="bg-bg-1"></Color>
          </div>
          <div className="flex items-center gap-5">
            <div>{'--bg-2'}</div>
            <Color className="bg-bg-2"></Color>
          </div>
        </div>

        <div>
          <h3>Foreground</h3>
          <div className="flex items-center gap-5">
            <div>{'--fg-1'}</div>
            <Color className="bg-fg-1"></Color>
          </div>
        </div>

        <div>
          <h3>Typography</h3>
          <div className="flex items-center gap-5 mb-4">
            <div>{'--txt-1'}</div>
            <Color className="bg-txt-1"></Color>
          </div>
          <div className="flex items-center gap-5">
            <div>{'--txt-2'}</div>
            <Color className="bg-txt-2"></Color>
          </div>
        </div>
      </section>

      <section>
        <h2>Pill</h2>
        <div className="flex gap-3">
          <div className="pill active">active</div>
          <div className="pill info">info</div>
          <div className="pill danger">danger</div>
          <div className="pill warning">warning</div>
          <div className="pill success">success</div>
        </div>
      </section>

      <section>
        <h2>Typography</h2>
        <p className="mt-6">h1</p>
        <h1>Sphinx of black quartz, judge my vow</h1>

        <p className="mt-6">h2</p>
        <h2>Sphinx of black quartz, judge my vow</h2>

        <p className="mt-6">h3</p>
        <h2>Sphinx of black quartz, judge my vow</h2>

        <p className="mt-6">h4</p>
        <h4>Sphinx of black quartz, judge my vow</h4>

        <p className="mt-6">p</p>
        <p>Sphinx of black quartz, judge my vow</p>

        <p className="mt-6">p (bold)</p>
        <p className="font-bold">Sphinx of black quartz, judge my vow</p>

        <p className="mt-6">strong</p>
        <strong>Sphinx of black quartz, judge my vow</strong>

        <p className="mt-6">p (italic)</p>
        <p className="italic">Sphinx of black quartz, judge my vow</p>

        <p className="mt-6">i</p>
        <i>Sphinx of black quartz, judge my vow</i>
      </section>

      <section>
        <h2>Lists</h2>
        <ul className="mb-6">
          <li>Charmander</li>
          <li>Squirtle</li>
          <li>Bulbasaur</li>
          <li>Pikachu</li>
        </ul>
        <ol>
          <li>Charmander</li>
          <li>Squirtle</li>
          <li>Bulbasaur</li>
          <li>Pikachu</li>
        </ol>
      </section>

      <section>
        <h2>Forms</h2>
        <div>
          <h3>Input</h3>
          <div className="flex flex-col gap-2">
            <input type="text" placeholder="enter text" />
            <div className="flex items-center gap-3">
              <input id="ds-checkbox" type="checkbox" />
              <label htmlFor="ds-checkbox">Checkbox</label>
            </div>
            <div>
              <div className="flex gap-3">
                <input
                  type="radio"
                  id="ds-radio-1"
                  name="ds-radio"
                  value="Radio 1"
                  defaultChecked
                />
                <label htmlFor="ds-radio-1">Radio 1</label>
              </div>
              <div className="flex gap-3">
                <input
                  type="radio"
                  id="ds-radio-2"
                  name="ds-radio"
                  value="Radio 2"
                  defaultChecked
                />
                <label htmlFor="ds-radio-2">Radio 2</label>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2>Code Block</h2>
        <CodeComponent />
      </section>
    </div>
  )
}
