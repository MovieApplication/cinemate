import {useEffect, useState} from "react"
import { useRouter } from 'next/router'
import Image from "next/image"
import Link from "next/link"
import header from './Header.module.scss'
import {Data, KAKAO_AUTH_URL, KAKAO_LOGOUT_URL} from "services/common"
import KakaoLogo from "../../../public/images/kakao_login_small.png"

export default function Header() {
  const [scrollValue, setScrollValue] = useState(0)
  const [kakaoLoginShow, setKakaoLoginShow] = useState(true)
  const router = useRouter()

  const updateScroll = () => setScrollValue(window.scrollY || document.documentElement.scrollTop)

  // router 변경마다 로그인 여부 체크해 아이콘 변경
  useEffect(() => {
    setKakaoLoginShow(Data.get('kakaoLogin') === null)
  },[router])

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

      {
        router.pathname !== '/auth/kakao' && router.pathname !== '/auth/logout' && (
          kakaoLoginShow
          ? <Link href={KAKAO_AUTH_URL}>
            <Image src={KakaoLogo} alt="카카오 로그인"/>
          </Link>
          : <Link href={KAKAO_LOGOUT_URL}>
            <button type='button' className={header.logout}>로그아웃</button>
          </Link>
        )
      }
    </header>
  )
}
