import apiList, { Api } from "utils/apiList"
import axios, {AxiosRequestConfig} from "axios"
import Swal from 'sweetalert2'
import moment from "moment"
import 'moment/locale/ko'

const authHeader = () => {
  return { 'Authorization': 'Bearer ' + Data.get('login').accessToken }
}

// 토큰 재발급
export const getAuthenticate = async () => {
  await GetApi(apiList.getRefreshToken, {
    refreshTokenId: Data.get('login').refreshTokenId
  }).then(($res: object | string) => {
    if($res !== 'FAIL') {
      Data.set('login', $res)
    }
  }, () => {
    fnLogOut()
  })
}

const fnAuthCheck = async () => {
  if(!tokenExpireCheck()) {
    await getAuthenticate()
  }
}

export const fnLogOut = () => {
  ['kakaoLogin', 'login', 'userInfo'].forEach((key: string) => {
    Data.remove(key)
  })

  window.location.href = '/'
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
        console.log(`%c [${$api.url}] response : `, 'background-color:red; color: white', res.data)

        return res.data
      } catch(e) {
        console.log('e : ', e)
      }
    }).catch((err) => {
      console.log('err : ' , err)

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
        console.log(`%c [${$api.url}] response : `, 'background-color:red; color: white', res.data)

        return res.data
      } catch(e) {
        console.log('e : ', e)
      }
    }).catch((err) => {
      console.log('err : ' , err)

      return 'FAIL'
    })
}

export const Data = {
  set: ($name: string, $value: boolean | string | object) => {
    const value: string = typeof $value === 'object' ? JSON.stringify($value) : typeof $value === 'boolean' ? $value.toString() : $value

    window.localStorage.setItem($name, value)
  },
  get: ($name: string) => {
    try {
      const data: string | null = window.localStorage.getItem($name)

      return data !== 'undefined' && data !== null ? JSON.parse(data) : data
    } catch (e) {
      return window.localStorage.getItem($name)
    }
  },
  remove: ($name: string) => {
    window.localStorage.removeItem($name)
  },
  clear: () => {
    window.localStorage.clear()
  }
}

// 카카오 로그인
export const CLIENT_ID = "d406d04caf54515425c2000ab78a1e9e"
export const REDIRECT_URI = "http://localhost:3006/auth/kakao"
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`

// 카카오 로그아웃
export const LOGOUT_REDIRECT_URI = "http://localhost:3006/auth/logout"
export const KAKAO_LOGOUT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${CLIENT_ID}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`

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

    $tData = parseJwt($t.accessToken)

    return now < $tData.exp
  } else {
    return false
  }
}

export const getLoginId = () => {
  const $t = Data.get('login')

  if ($t !== 'undefined' && $t !== null) {
    const $tData = parseJwt($t.accessToken)

    return $tData.sub
  }
}
