import '../public/styles/global.css'
import '../public/styles/prism.css'

import { AppProps } from 'next/app'

import { Header } from '../ui/Header'
import { SideBar } from '../ui/SideBar'
import { ThemeProvider } from '../ui/ThemeSwitch'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <ThemeProvider>
        <Header />
        <SideBar />
        <main className="ml-0 md:ml-[var(--sidebar-width)] mt-[var(--header-height)]">
          <div className="mx-auto max-w-[75ch] p-8">
            <Component {...pageProps} />
          </div>
        </main>
      </ThemeProvider>
    </>
  )
}

export default MyApp
