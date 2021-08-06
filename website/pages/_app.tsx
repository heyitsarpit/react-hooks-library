import '../public/styles/global.css'
import '../public/styles/prism.css'

import { AppProps } from 'next/app'

import { ThemeProvider } from '../ui/ThemeSwitch'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
