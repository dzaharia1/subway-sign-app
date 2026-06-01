import '../styles/globals.scss'
import Head from 'next/head'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const viewport = window.visualViewport
    if (!viewport) return

    // Track the actual visible height (above the on-screen keyboard) so the
    // layout shrinks instead of being overlaid/hidden by the keyboard.
    const updateAppHeight = () => {
      document.documentElement.style.setProperty('--app-height', `${viewport.height}px`)
    }

    updateAppHeight()
    viewport.addEventListener('resize', updateAppHeight)
    viewport.addEventListener('scroll', updateAppHeight)

    return () => {
      viewport.removeEventListener('resize', updateAppHeight)
      viewport.removeEventListener('scroll', updateAppHeight)
    }
  }, [])

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1, viewport-fit=cover' />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
