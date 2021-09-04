import 'public/styles/global.css'
import 'public/styles/prism.css'

import { AnimatePresence, motion } from 'framer-motion'
import { AppProps } from 'next/app'
import { Router } from 'next/router'
import { Header } from 'ui/Header'
import { SEO } from 'ui/SEO'
import { SideBar } from 'ui/SideBar'
import { ThemeProvider } from 'ui/ThemeProvider'

Router.events.on('routeChangeComplete', () => {
  document.querySelector('#__next').scroll({
    top: 0,
    behavior: 'smooth'
  })
})

const App: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  return (
    <>
      <SEO />
      <ThemeProvider>
        <Header />
        <SideBar />
        <AnimatePresence initial={false} exitBeforeEnter>
          <motion.main
            key={router.asPath.replace(/#.*/g, '')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="ml-0 md:ml-[var(--sidebar-width)] mt-[var(--header-height)]">
            <div className="mx-auto max-w-[75ch] p-8">
              <Component {...pageProps} />
            </div>
          </motion.main>
        </AnimatePresence>
      </ThemeProvider>
    </>
  )
}

export default App
