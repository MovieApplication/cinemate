import {Api} from "@/utils/apiList"
import axios from "axios"

interface axiosOption {
  withCredentials: boolean;
  headers?: object;
  params?: object;
  data?: object;
}

export const GetApi = async ($api: Api, $param?: object) => {
  let option: axiosOption = {
    withCredentials: true
  }

  if ($api.method === 'GET') {
    option = {...option, ...$api, params: $param !== undefined ? $param : {}}
  } else {
    option = {...option, ...$api, data: $param !== undefined ? $param : {}}
  }

  console.log(`%c [${$api.url}] request : `, 'background-color:blue; color: white', $param)

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
      alert(`${err.response.data.errorMessage ? err.response.data.errorMessage : err.response.data.message}`)

      return 'FAIL'
    })
}
