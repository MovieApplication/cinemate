import { useSearchParams } from 'next/navigation'
import {useEffect, useState} from "react"
import { useRouter } from 'next/router'
import Spinner from "../../../public/images/Spinner.gif"
import Image from "next/image"
import {GetApi, GetApiPath, CLIENT_ID, REDIRECT_URI, sAlert, Data} from "services/common"
import axios from "axios"
import apiList from "utils/apiList"

const Kakao = () => {
  const [kakaoAccessToken, setKakaoAccessToken] = useState<string>('')
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const router = useRouter()

  // 카카오 로그인 : 토큰 발급
  const fnGetKakaoOauthToken = async () => {
    const makeFormData = params => {
      const searchParams = new URLSearchParams()
      Object.keys(params).forEach(key => {
        searchParams.append(key, params[key])
      })

      return searchParams
    }

    await axios({
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
  const fnGetKakaoUserInfo = async () => {
    await axios({
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${kakaoAccessToken}`
      },
      url: "https://kapi.kakao.com/v2/user/me",
    }).then(res => {
      try {
        fnUserInfoCheck(res.data.id.toString(), res.data.kakao_account.profile.nickname)
      } catch (e) {
        console.log('e : ', e)
      }
    })
  }

  // 유저 조회
  const fnUserInfoCheck = ($kakaoId: string, $nickname: string) => {
    GetApiPath(apiList.userInfoCheck, $kakaoId).then($res => {
      // 기존 유저일 경우 : 로그인
      if ($res === true) {
        fnUserLogin($kakaoId)
      } else {
        // 유저가 아닐 경우 : 유저 등록 -> 로그인
        fnAddUserInfo($kakaoId, $nickname).then(() =>
          fnUserLogin($kakaoId)
        )
      }
    })
  }

  // 유저 등록
  const fnAddUserInfo = async ($kakaoId: string, $nickname: string) => {
    await GetApi(apiList.userInfo, {
      kakaoId: $kakaoId,
      userNickname: $nickname
    })
  }

  // 로그인 (토큰 획득)
  const fnUserLogin = async ($nickname: string) => {
    await GetApiPath(apiList.userLogin, $nickname).then(res => {
      if (res !== 'FAIL') {
        Data.set('login', res)

        sAlert({
          icon: 'success',
          html: 'CINEMATE 회원가입이<br>성공적으로 완료 되었습니다.',
          didClose: () => {
            router.push('/')
          }
        })
      }
    })
  }

  useEffect(() => {
    if (code !== null) fnGetKakaoOauthToken()
  },[code])

  useEffect(() => {
    if (kakaoAccessToken !== "") fnGetKakaoUserInfo()
  },[kakaoAccessToken])

  return (
    <div className="spinner">
      <Image src={Spinner} alt="로딩중" />
      <h2>잠시만 기다려 주세요!<br/>로그인 중입니다.</h2>
    </div>
  )
}

export default Kakao
