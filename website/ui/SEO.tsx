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
        site_name: 'React Hooks Library'
        // images: [
        //   {
        //     url: 'https://www.example.ie/og-image-01.jpg',
        //     width: 800,
        //     height: 600,
        //     alt: 'Og Image Alt'
        //   },
        //   {
        //     url: 'https://www.example.ie/og-image-02.jpg',
        //     width: 900,
        //     height: 800,
        //     alt: 'Og Image Alt Second'
        //   },
        //   { url: 'https://www.example.ie/og-image-03.jpg' },
        //   { url: 'https://www.example.ie/og-image-04.jpg' }
        // ]
      }}
      //   twitter={{
      //     handle: '',
      //     site: '',
      //     cardType: 'summary_large_image'
      //   }}
    />
  )
}
