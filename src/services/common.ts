import { Api } from "@/utils/apiList"
import axios from "axios"

interface axiosOption {
  withCredentials: boolean;
  headers?: object;
  params?: object;
  data?: object;
}

export const GetApi = async ($api: Api, $param?: object) => {
  let option = {
    method: $api.method,
    url: $api.url,
    withCredentials: true
  }

  /*if ($api.method === 'GET') {
    option = { ...option, ...$api, params: $param !== undefined ? $param : {} }
  } else {
    option = { ...option, ...$api, data: $param !== undefined ? $param : {} }
  }*/
  if ($api.method === 'GET') {
    option = Object.assign(option, {'params': $param !== undefined ? $param : ''})
  } else {
    option = Object.assign(option, {'data': $param !== undefined ? $param : ''})
  }
  console.log(`%c [${$api.url}] request : `, 'background-color:blue; color: white', $param)

  return await axios(option)
    .then((res) => {
      try {
        console.log(`%c [${$api.url}] response : `, 'background-color:red; color: white', res)
        return res
      } catch (e) {
        console.log('e : ', e)
      }
    }).catch((err) => {
      console.log('err : ', err)
      alert(`${err.response.data.errorMessage ? err.response.data.errorMessage : err.response.data.message}`)

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
