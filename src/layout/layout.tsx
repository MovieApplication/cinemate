import { PropsWithChildren, useEffect, useState } from "react"
import Head from "next/head"
import Header from "@/layout/Header/Header"
import { Data } from "@/services/common"

export default function Layout({ children }: PropsWithChildren) {
  const [searchIcon, setSearchIcon] = useState(true)
  const toggleSearchIcon = () => setSearchIcon(!searchIcon)

  useEffect(() => {
    setSearchIcon(Data.get('search') === null || Data.get('search') === false)
  }, [])

  return (
    <>
      <Head>
        <title>CINEMATE</title>
        <meta name="description" content="CINEMATE" />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>

      <div>
        <Header searchIcon={searchIcon} toggleSearchIcon={toggleSearchIcon} />
        <div>
          {children}
        </div>
      </div>
    </>
  )
}
