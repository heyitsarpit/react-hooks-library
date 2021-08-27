import 'public/styles/global.css'
import 'public/styles/prism.css'

import { AnimatePresence, motion } from 'framer-motion'
import { AppProps } from 'next/app'
import { Header } from 'ui/Header'
import { SideBar } from 'ui/SideBar'
import { ThemeProvider } from 'ui/ThemeProvider'

const App: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  return (
    <>
      <ThemeProvider>
        <Header />
        <SideBar />
        <AnimatePresence initial={false} exitBeforeEnter>
          <motion.main
            key={router.asPath}
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
