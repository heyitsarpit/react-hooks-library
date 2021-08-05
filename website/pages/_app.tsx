import '../public/styles/global.css'
import '../public/styles/prism.css'

import { AppProps } from 'next/app'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default MyApp
