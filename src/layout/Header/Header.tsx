import {useEffect, useState} from "react"
import { useRouter } from 'next/router'
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import header from './Header.module.scss'
import {Data, KAKAO_AUTH_URL, sAlert} from "services/common"
import KakaoLogo from "../../../public/images/kakao_login_small.png"

export default function Header() {
  const [scrollValue, setScrollValue] = useState(0)
  const [kakaoLoginShow, setKakaoLoginShow] = useState(true)
  const router = useRouter()

  const updateScroll = () => setScrollValue(window.scrollY || document.documentElement.scrollTop)

  // 카카오 로그아웃
  const fnGetKakaoLogout = () => {
    sAlert({
      html: '로그아웃 하시겠습니까?',
      showCancelButton: true,
    }).then((res: any) => {
      if (res.isConfirmed) {
        axios({
          method: 'POST',
          url: 'https://kapi.kakao.com/v1/user/logout',
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Bearer ${Data.get('kakaoLogin').access_token}`
          },
        }).then(() => {
          try {
            sAlert({
              icon: 'success',
              html: '로그아웃이 완료 되었습니다.',
              didClose: () => {
                ['kakaoLogin', 'login', 'userInfo'].forEach((key: string) => {
                  Data.remove(key)
                })

                router.replace('/')
              }
            })
          } catch (e) {
            console.log('e : ', e)
          }
        })
      }
    })
  }

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
        router.pathname !== '/auth/kakao' && (
          kakaoLoginShow
          ? <Link href={KAKAO_AUTH_URL}>
            <Image src={KakaoLogo} alt="카카오 로그인"/>
          </Link>
          : <button
              type='button'
              className={header.logout}
              onClick={fnGetKakaoLogout}
            >
              로그아웃
          </button>
        )
      }
    </header>
  )
}
