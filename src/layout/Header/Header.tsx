import {useEffect, useState} from "react"
import Image from "next/image"
import Link from "next/link"
import header from './Header.module.scss'
import {KAKAO_AUTH_URL} from "services/common"
import KakaoLogo from "../../../public/images/kakao_login_small.png"

export default function Header() {
  const [scrollValue, setScrollValue] = useState(0)

  const updateScroll = () => setScrollValue(window.scrollY || document.documentElement.scrollTop)

  useEffect(() => {
    // scroll event
    window.addEventListener('scroll', updateScroll)
  },[scrollValue])

  return (
    <header className={scrollValue > 100 ? header.blackHeader : header.header}>
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="CINEMATE"
          width={150}
          height={30}
        />
      </Link>

      <Link href={KAKAO_AUTH_URL}>
        <Image src={KakaoLogo} alt="카카오 로그인"/>
      </Link>
    </header>
  )
}
