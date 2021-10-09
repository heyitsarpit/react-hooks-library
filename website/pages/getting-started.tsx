import fs from 'fs'
import { getMDXComponent } from 'mdx-bundler/client'
import { InferGetStaticPropsType } from 'next'
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
    <div>
      <CodeComponent components={mdxComponents as any} />
    </div>
  )
}
