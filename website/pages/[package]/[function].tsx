import { getMDXComponent } from 'mdx-bundler/client'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import { useMemo } from 'react'
import { mdxComponents } from 'ui/docs/mdxComponents'
import { getAllFunctionsMeta, getFunction } from 'utils/loadMDX'

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
  const pkg = context.params?.package as string
  const name = context.params?.function as string

  const posts = await getFunction(pkg, name)

  return { props: posts }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function Functions({ meta, code }: Props) {
  const Component = useMemo(() => getMDXComponent(code), [code])
  return (
    <>
      <NextSeo
        title={`${meta.name} — React Hooks Library`}
        description={meta.description}
        canonical={`https://react-hooks-library.vercel.app/${meta.name}`}
        openGraph={{
          url: `https://react-hooks-library.vercel.app/${meta.name}`,
          title: `${meta.name} — React Hooks Library`,
          description: meta.description
        }}
      />
      <article>
        <Component components={mdxComponents as any} />
      </article>
    </>
  )
}
