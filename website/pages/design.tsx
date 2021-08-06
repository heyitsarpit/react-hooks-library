import { getMDXComponent } from 'mdx-bundler/client'
import { InferGetStaticPropsType } from 'next'
import React, { useMemo } from 'react'

import { loadMdx } from '../utils/loadMDX'

const Color = ({ className = '' }) => (
  <div
    className={`w-12 h-12 rounded-full ring-1 ring-trueGray-200 ${className}`}></div>
)

export async function getStaticProps() {
  const mdxSource = `
  \`\`\`typescript
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
  console.log(posts)
  return { props: posts }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function Design({ code }: Props) {
  const CodeComponent = useMemo(() => getMDXComponent(code), [code])

  return (
    <div className="flex flex-col gap-8 px-8 mx-auto my-24 md:max-w-screen-md ">
      <h1>Design System</h1>
      <section className="flex flex-col gap-8">
        <h2>Colors</h2>
        <div>
          <h3>Brand</h3>
          <Color className="bg-cyan-600"></Color>
        </div>
        <div>
          <h3>Background</h3>
          <div className="flex gap-2">
            <Color className="bg-gray-50"></Color>
            <Color className="bg-white"></Color>
          </div>
        </div>

        <div>
          <h3>Foreground</h3>
          <Color className="bg-warmGray-100"></Color>
        </div>

        <div>
          <h3>Typography</h3>
          <div className="flex gap-2">
            <Color className="bg-gray-600"></Color>
            <Color className="bg-trueGray-700"></Color>
          </div>
        </div>
      </section>

      <section>
        <h2>Pill</h2>
        <div className="flex gap-3">
          <div className="px-2 py-1 rounded-lg text-cyan-600 bg-cyan-600/20 w-max">
            active
          </div>
          <div className="px-2 py-1 rounded-lg text-sky-600 bg-sky-600/20 w-max">
            info
          </div>
          <div className="px-2 py-1 text-red-600 rounded-lg bg-red-600/20 w-max">
            danger
          </div>
          <div className="px-2 py-1 text-yellow-600 rounded-lg bg-yellow-600/20 w-max">
            warning
          </div>
          <div className="px-2 py-1 text-green-600 rounded-lg bg-green-600/20 w-max">
            success
          </div>
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
