import { getMDXComponent } from 'mdx-bundler/client'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useMemo } from 'react'

import { getAllFunctionsMeta, getFunction } from '../../utils/loadMDX'

export async function getStaticPaths() {
  const posts = await getAllFunctionsMeta()
  const paths = posts.map(({ pkg, name }) => ({
    params: { package: pkg, function: name }
  }))

  return {
    paths,
    fallback: false // -> /404
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  console.log('I Ran', { context })
  const pkg = context.params?.package as string
  const name = context.params?.function as string

  const posts = await getFunction(pkg, name)

  return { props: posts }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function Functions({ meta, code }: Props) {
  const Component = useMemo(() => getMDXComponent(code), [code])
  return (
    <div>
      <Component />
    </div>
  )
}
