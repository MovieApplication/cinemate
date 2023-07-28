import apiList, { Api } from "utils/apiList"
import axios, {AxiosRequestConfig} from "axios"
import Swal from 'sweetalert2'
import moment from "moment"
import 'moment/locale/ko'
import {Data, deleteCookie, getCookie, setCookie} from "services/service"

const authHeader = () => {
  return { 'Authorization': 'Bearer ' + Data.get('login') }
}

// 토큰 재발급
export const getAuthenticate = async () => {
  await GetApi(apiList.getRefreshToken, {
    refreshTokenId: getCookie('CRT')
  }).then(($res) => {
    if($res !== 'FAIL') {
      // access-token 만료 시 : 토큰 재발급
      Data.set('login', $res.accessToken)
      // 쿠키 세팅 : 10시간
      setCookie('CRT', $res.refreshTokenId, {
        expires: 36000000,
        SameSite: 'Strict'
      })
    }
  })
}

const fnAuthCheck = async () => {
  if(!tokenExpireCheck()) {
    await getAuthenticate()
  }
}

export const kakaoLogout = () => {
  axios({
    method: 'POST',
    url: 'https://kapi.kakao.com/v1/user/logout',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Bearer ${Data.get('kakaoLogin')}`
    },
  }).then(() => {
    ['kakaoLogin', 'login', 'userInfo'].forEach((key: string) => {
      Data.remove(key)
    })

    deleteCookie('CRT')

    window.location.href = '/'
  }).catch((e) => {
    // console.log('e : ' , e)
    // 이미 만료된 토큰일 경우
    if (e.response.data.code === -401) {
      ['kakaoLogin', 'login', 'userInfo'].forEach((key: string) => {
        Data.remove(key)
      })

      deleteCookie('CRT')

      window.location.href = '/'
    }
  })
}

export const GetApi = async ($api: Api, $param?: object) => {
  let option: AxiosRequestConfig = {
    withCredentials: true
  }

  if ($api.method === 'GET') {
    option = { ...option, ...$api, params: $param !== undefined ? $param : {} }
  } else {
    option = { ...option, ...$api, data: $param !== undefined ? $param : {} }
  }

  if ($api.private) {
    await fnAuthCheck()
    option.headers = authHeader()
  }

  return await axios(option)
    .then((res) => {
      try {
        //console.log(`%c [${$api.url}] response : `, 'background-color:red; color: white', res.data)

        return res.data
      } catch(e) {
        console.log('e : ', e)
      }
    }).catch((err) => {
      //console.log('err : ' , err)
      if (err.response.data.errorCode === "INTERNAL_SERVER_ERROR" || err.response.data.errorCode === "EXPIRED_TOKEN") {
        sAlert({
          html: '로그인 대기 유효 시간이 만료 되었습니다.<br>다시 로그인 시도해 주시기 바랍니다.',
          didClose: () => {
            kakaoLogout()
          }
        })
      } else {
        sAlert({
          text: err.response.data.errorMessage ? err.response.data.errorMessage : err.response.data.message,
          icon: 'error'
        })
      }

      return 'FAIL'
    })
}

export const GetApiPath = async ($api: Api, $param?: string | number, $page?: object) => {
  let option: AxiosRequestConfig = {
    withCredentials: true
  }

  if ($param) {
    $api = {
      ...$api,
      url: encodeURI($api.url + $param)
    }
  }

  if ($api.method === 'GET') {
    option = { ...option, ...$api, params: $page !== undefined ? $page : {} }
  } else {
    option = { ...option, ...$api, data: $page !== undefined ? $page : {} }
  }

  if ($api.private) {
    await fnAuthCheck()
    option.headers = authHeader()
  }

  return await axios(option)
    .then((res) => {
      try {
        //console.log(`%c [${$api.url}] response : `, 'background-color:red; color: white', res.data)

        return res.data
      } catch(e) {
        console.log('e : ', e)
      }
    }).catch((err) => {
      //console.log('err : ' , err)
      if (err.response.data.errorCode === "INTERNAL_SERVER_ERROR" || err.response.data.errorCode === "EXPIRED_TOKEN") {
        sAlert({
          html: '로그인 대기 유효 시간이 만료 되었습니다.<br>다시 로그인 시도해 주시기 바랍니다.',
          didClose: () => {
            kakaoLogout()
          }
        })
      } else {
        sAlert({
          text: err.response.data.errorMessage ? err.response.data.errorMessage : err.response.data.message,
          icon: 'error'
        })
      }

      return 'FAIL'
    })
}



// 카카오 로그인
// export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_LOCAL_URI}&response_type=code`
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`

// sweetAlert
const mixAlert = Swal.mixin({
  position: 'center',
  icon: 'warning',
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  allowOutsideClick: false
})

export const sAlert = ($opt: object | undefined) => {
  const opt = $opt !== undefined ? $opt : {}
  return new Promise( (resolve, reject) => {
    mixAlert.fire(opt).then((res) => {
      if(resolve !== undefined) {
        resolve(res)
      }
    })
  })
}

export const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))

  return JSON.parse(jsonPayload)
}

export const tokenExpireCheck = () => {
  const $t = Data.get('login')
  let $tData

  if ($t !== 'undefined' && $t !== null && typeof $t !== 'string') {
    const now = moment().format('X')

    $tData = parseJwt($t)

    return now < $tData.exp
  } else {
    return false
  }
}

export const getLoginId = () => {
  const $t = Data.get('login')

  if ($t !== 'undefined' && $t !== null) {
    const $tData = parseJwt($t)

    return $tData.sub
  }
}
