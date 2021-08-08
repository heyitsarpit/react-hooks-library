type Props = {
  pkg: string
  name: string
}

export function Source({ name, pkg }: Props) {
  const baseUrl =
    'https://github.com/react-hooks-library/react-hooks-library/blob/main/packages'

  const props = {
    target: '_blank',
    rel: 'noopener noreferrer'
  }
  return (
    <div>
      <a href={`${baseUrl}/${pkg}/${name}/index.ts`} {...props}>
        Source
      </a>
      {' | '}
      <a href={`${baseUrl}/${pkg}/${name}/demo.tsx`} {...props}>
        Demo
      </a>
      {' | '}
      <a href={`${baseUrl}/${pkg}/${name}/docs.mdx`} {...props}>
        Docs
      </a>
    </div>
  )
}
