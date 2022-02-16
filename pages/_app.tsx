import '../styles/globals.css'

import {DefaultSeo} from 'next-seo'
import type { AppProps } from 'next/app'

import SEO_DEFAULT from '../utils/next-seo-config'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <DefaultSeo {...SEO_DEFAULT} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
