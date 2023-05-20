import {useEffect} from "react"
import { useRouter } from 'next/router'
import Spinner from "../../../public/images/Spinner.gif"
import Image from "next/image"
import {Data} from "services/common"
import axios from "axios"

const Logout = () => {
  const router = useRouter()

  // 카카오 로그아웃
  const fnGetKakaoLogout = async () => {
    await axios({
      method: 'POST',
      url: 'https://kapi.kakao.com/v1/user/logout',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${Data.get('kakaoLogin').access_token}`
      },
    }).then(() => {
      try {
        ['kakaoLogin', 'login', 'userInfo'].forEach((key: string) => {
          Data.remove(key)
        })

        router.replace('/')
      } catch (e) {
        console.log('e : ', e)
      }
    })
  }

  useEffect(() => {
    fnGetKakaoLogout()
  },[])

  return (
    <div className="spinner">
      <Image src={Spinner} alt="로딩중" />
      <h2>잠시만 기다려 주세요!<br/>로그아웃 중입니다.</h2>
    </div>
  )
}

export default Logout
