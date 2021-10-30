import 'public/styles/global.css'
import 'public/styles/prism.css'
import 'public/styles/fonts.css'

import { AnimatePresence, motion } from 'framer-motion'
import { AppProps } from 'next/app'
import { Router } from 'next/router'
import { Header } from 'ui/Header'
import { SEO } from 'ui/SEO'
import { SideBar } from 'ui/SideBar'
import { ThemeProvider } from 'ui/ThemeProvider'
import { useSidebar } from 'utils/useSidebar'

Router.events.on('routeChangeComplete', () => {
  document.querySelector('#__next').scroll({
    top: 0,
    behavior: 'smooth'
  })
})

const App: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const { sidebarOpen } = useSidebar()

  return (
    <>
      <SEO />
      <ThemeProvider>
        <Header />
        {['/', '/design'].includes(router.asPath) ? (
          <div className="h-[calc(100%-var(--header-height))]">
            <Component {...pageProps} />
          </div>
        ) : (
          <>
            <SideBar />
            <AnimatePresence initial={false} exitBeforeEnter>
              <motion.main
                key={router.asPath.replace(/#.*/g, '')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`ml-0 md:ml-[var(--sidebar-width)] mt-[var(--header-height)] h-[calc(100%-var(--header-height))] 
                ${sidebarOpen ? 'blur-md md:blur-0 opacity-70' : ''}`}>
                <div className="mx-auto max-w-[75ch] px-4 md:px-8 h-full">
                  <Component {...pageProps} />
                </div>
              </motion.main>
            </AnimatePresence>
          </>
        )}
      </ThemeProvider>
    </>
  )
}

export default App
