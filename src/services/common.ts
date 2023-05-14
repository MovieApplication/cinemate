import { Api } from "utils/apiList"
import axios from "axios"

export const GetApi = async ($api: Api, $param?: object) => {
  let option: object = {
    withCredentials: true
  }

  if ($api.method === 'GET') {
    option = { ...option, ...$api, params: $param !== undefined ? $param : {} }
  } else {
    option = { ...option, ...$api, data: $param !== undefined ? $param : {} }
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
  let option: object = {
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
const CLIENT_ID = "d406d04caf54515425c2000ab78a1e9e"
const REDIRECT_URI = "http://localhost:3006/auth/kakao"
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`