import { getMDXComponent } from 'mdx-bundler/client'
import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { useMemo } from 'react'
import { Color } from 'ui/Color'
import { Callout } from 'ui/docs/Callout'
import { loadMdx } from 'utils/loadMDX'

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

  \`\`\`tsx
  import { useRouter } from '.'

  export function Demo() {
    const router = useRouter()
  
    return (
      <div>
        <pre className="text-sm whitespace-pre-wrap">
          <code>{JSON.stringify(router, null, 2)}</code>
        </pre>
      </div>
    )
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
    <>
      <NextSeo
        title="Design — React Hooks Library"
        description="Design system for react hooks library docs website"
        canonical="https://react-hooks-library.vercel.app/design"
        openGraph={{
          url: 'https://react-hooks-library.vercel.app/design',
          title: 'Design — React Hooks Library',
          description: 'Design system for react hooks library docs website'
        }}
      />
      <div className="flex flex-col w-full h-full gap-8 px-4 py-8 mx-auto mt-[var(--header-height)] md:px-8 md:max-w-screen-md 2xl:max-w-screen-2xl">
        <h1>Design System</h1>
        <section className="flex flex-col gap-8">
          <h2>Colors</h2>
          <div>
            <h3>Brand</h3>
            <Color className="bg-brand" varName="--brand" />
          </div>
          <div>
            <h3>Background</h3>
            <div className="flex flex-col gap-4">
              <Color className="bg-bg-1" varName="--bg-1" />
              <Color className="bg-bg-2" varName="--bg-2" />
            </div>
          </div>

          <div>
            <h3>Foreground</h3>
            <Color className="bg-fg-1" varName="--fg-1" />
          </div>

          <div>
            <h3>Typography</h3>
            <div className="flex flex-col gap-4">
              <Color className="bg-txt-1" varName="--txt-1" />
              <Color className="bg-txt-2" varName="--txt-2" />
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
          <h2>Buttons</h2>
          <button className="mr-5">Submit</button>
          <button disabled>Disabled</button>
        </section>

        <section>
          <h2>Link</h2>
          <Link href="/">
            <a>Home</a>
          </Link>
        </section>

        <section>
          <h2>Callouts</h2>
          {['info', 'warning', 'danger', 'success'].map(
            (type: 'info' | 'warning' | 'danger' | 'success') => (
              <Callout key={type} type={type}>
                <p>This is a {type} callout</p>
              </Callout>
            )
          )}
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
    </>
  )
}
