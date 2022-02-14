import { DefaultSeo } from 'next-seo'

export const SEO: React.FC = () => {
  return (
    <DefaultSeo
      title="React Hooks Library"
      description="A collection of hooks and utilities for React"
      canonical="https://react-hooks-library.vercel.app"
      openGraph={{
        url: 'https://react-hooks-library.vercel.app',
        title: 'React Hooks Library',
        description: 'A collection of hooks and utilities for React',
        site_name: 'React Hooks Library',
        images: [
          {
            url: 'https://react-hooks-library.vercel.app/og_image.jpg',
            width: 1000,
            height: 509,
            alt: 'React Hooks Library'
          }
        ]
      }}
      twitter={{
        handle: '@heyitsarpit',
        site: 'https://react-hooks-library.vercel.app/',
        cardType: 'summary_large_image'
      }}
    />
  )
}
