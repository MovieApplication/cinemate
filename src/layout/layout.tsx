import { PropsWithChildren } from "react"
import Head from "next/head"
import Header from "layout/Header/Header"

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Head>
        <title>CINEMATE</title>
        <meta name="description" content="CINEMATE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Header />
        <div>
          {children}
        </div>
      </div>
    </>
  )
}
