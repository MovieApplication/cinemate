import { useSearchParams } from 'next/navigation'
import {useEffect, useState} from "react"
import { useRouter } from 'next/router'
import Spinner from "../../../public/images/Spinner.gif"
import Image from "next/image"
import {CLIENT_ID, GetApi, GetApiPath, REDIRECT_URI} from "services/common"
import axios from "axios"
import apiList from "utils/apiList"

const Kakao = () => {
  const [kakaoAccessToken, setKakaoAccessToken] = useState<string>('')
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const router = useRouter()

  // 카카오 로그인 : 토큰 발급
  const fnGetKakaoOauthToken = () => {
    const makeFormData = params => {
      const searchParams = new URLSearchParams()
      Object.keys(params).forEach(key => {
        searchParams.append(key, params[key])
      })

      return searchParams
    }

    axios({
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      url: 'https://kauth.kakao.com/oauth/token',
      data: makeFormData({
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        code
      })
    }).then(res => {
      try {
        setKakaoAccessToken(res.data.access_token)
      } catch (e) {
        console.log('e : ', e)
      }
    })
  }

  // 카카오 로그인 : 사용자 정보 받기
  const fnGetKakaoUserInfo = () => {
    axios({
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${kakaoAccessToken}`
      },
      url: "https://kapi.kakao.com/v2/user/me",
    }).then(res => {
      try {
        fnGetUserInfo(res.data.kakao_account.profile.nickname)
        fnGetUserLogin(res.data.kakao_account.profile.nickname)
      } catch (e) {
        console.log('e : ', e)
      }
    })
  }

  // 유저 등록
  const fnGetUserInfo = async ($nickname: string) => {
    await GetApi(apiList.userInfo, {nickname: $nickname}).then(res => {
      if (res !== 'FAIL') {
        console.log('res : ', res)
      }
    })
  }

  // 로그인 (토큰 획득)
  const fnGetUserLogin = async ($nickname: string) => {
    await GetApiPath(apiList.userLogin, $nickname).then(res => {
      if (res !== 'FAIL') {
        router.push('/')
      }
    })
  }

  useEffect(() => {
    if (code !== null) {
      fnGetKakaoOauthToken()
    }
  },[code])

  useEffect(() => {
    if (kakaoAccessToken !== "") {
      fnGetKakaoUserInfo()
    }
  },[kakaoAccessToken])

  return (
    <div className="spinner">
      <Image src={Spinner} alt="로딩중" />
      <h2>잠시만 기다려 주세요!<br/>로그인 중입니다.</h2>
    </div>
  )
}

export default Kakao
