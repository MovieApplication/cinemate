import { PropsWithChildren, useEffect, useState } from "react"
import Head from "next/head"
import Header from "layout/Header/Header"
import {useRouter} from "next/router"

export default function Layout({ children }: PropsWithChildren) {
  const [searchIcon, setSearchIcon] = useState(true)
  const toggleSearchIcon = () => setSearchIcon(!searchIcon)
  const router = useRouter()

  // search 페이지일 경우 header icon Xmark로 세팅
  useEffect(() => {
    router.pathname === '/search' ? setSearchIcon(false) : setSearchIcon(true)
  },[router])

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
