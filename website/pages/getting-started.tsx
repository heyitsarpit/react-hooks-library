import fs from 'fs'
import { getMDXComponent } from 'mdx-bundler/client'
import { InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import path from 'path'
import { useMemo } from 'react'
import { mdxComponents } from 'ui/docs/mdxComponents'
import { loadMdx } from 'utils/loadMDX'

export async function getStaticProps() {
  const docsDir = path.resolve(process.cwd(), 'docs')

  const mdxSource = fs.readFileSync(
    path.join(docsDir, 'getting-started.mdx'),
    'utf8'
  )

  const post = await loadMdx(mdxSource)
  return { props: post }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function GettingStarted({ code }: Props) {
  const CodeComponent = useMemo(() => getMDXComponent(code), [code])

  return (
    <>
      <NextSeo
        title="Get Started — React Hooks Library"
        description="Guide for react hooks library"
        canonical="https://react-hooks-library.vercel.app/getting-started"
        openGraph={{
          url: 'https://react-hooks-library.vercel.app/getting-started',
          title: 'Get Started — React Hooks Library',
          description: 'Guide for react hooks library'
        }}
      />
      <div className="py-8">
        <CodeComponent components={mdxComponents as any} />
      </div>
    </>
  )
}
