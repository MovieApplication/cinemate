import {useEffect, useState} from "react"
import Image from "next/image"
import Link from "next/link"
import header from './Header.module.scss'
import {KAKAO_AUTH_URL, KAKAO_LOGOUT_URL} from "services/common"
import KakaoLogo from "../../../public/images/kakao_login_small.png"
import axios from "axios"

export default function Header() {
  const [scrollValue, setScrollValue] = useState(0)

  const updateScroll = () => setScrollValue(window.scrollY || document.documentElement.scrollTop)

  // 카카오 로그아웃
  const fnGetKakaoLogout = async () => {
    await axios({
      method: 'GET',
      url: KAKAO_LOGOUT_URL,
    }).then(() => {
      try {
        alert('로그아웃')
      } catch (e) {
        console.log('e : ', e)
      }
    })
  }

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

      <button type='button' onClick={fnGetKakaoLogout}>
        로그아웃
      </button>
    </header>
  )
}
