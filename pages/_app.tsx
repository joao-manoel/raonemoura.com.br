import '../styles/globals.css'

import {DefaultSeo} from 'next-seo'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';

import SEO_DEFAULT from '../utils/next-seo-config'

import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <ToastContainer 
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover />
      <DefaultSeo {...SEO_DEFAULT} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
