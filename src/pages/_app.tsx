import 'styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "layout/layout"
import '@sweetalert2/theme-dark/dark.scss'

export default function App({ Component, pageProps }: AppProps) {
  return <Layout><Component {...pageProps} /></Layout>
}
