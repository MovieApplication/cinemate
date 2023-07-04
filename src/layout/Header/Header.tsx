import {useEffect, useState} from "react"
import { useRouter } from 'next/router'
import Image from "next/image"
import Link from "next/link"
import header from './Header.module.scss'
import {Data, GetApi, KAKAO_AUTH_URL, kakaoLogout, sAlert} from "services/common"
import KakaoLogo from "../../../public/images/kakao_login_small.png"
import apiList from "utils/apiList"

export default function Header() {
  const router = useRouter()
  const [scrollValue, setScrollValue] = useState(0)
  const [kakaoLoginShow, setKakaoLoginShow] = useState(true)

  const [today, setToday] = useState(0)
  const [total, setTotal] = useState(0)

  const updateScroll = () => setScrollValue(window.scrollY || document.documentElement.scrollTop)

  // 카카오 로그아웃
  const fnGetKakaoLogout = () => {
    sAlert({
      html: '로그아웃 하시겠습니까?',
      showCancelButton: true,
    }).then((res: any) => {
      if (res.isConfirmed) {
        kakaoLogout()
      }
    })
  }

  // 방문자 수 가져오기
  const fnGetDailyVisitor = async () => {
    await GetApi(apiList.dailyVisitor).then(res => {
      if (res !== 'FAIL') {
        setToday(res.count)
      }
    })
  }

  const fnGetTotalVisitor = async () => {
    await GetApi(apiList.totalVisitor).then(res => {
      if (res !== 'FAIL') {
        setTotal(res.count)
      }
    })
  }

  // 방문자 수 가져오기
  useEffect(() => {
    fnGetDailyVisitor()
    fnGetTotalVisitor()
  },[])

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
          className={header.logo}
          width={150}
          height={30}
        />
      </Link>
      <p style={{fontWeight : "bold"}}>Today : {today}  / Total : {total}</p>
      {
        router.pathname !== '/auth/kakao' && (
          kakaoLoginShow
          ? <Link href={KAKAO_AUTH_URL}>
            <Image src={KakaoLogo} alt="카카오 로그인" className={header.kakaoLogo}/>
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
