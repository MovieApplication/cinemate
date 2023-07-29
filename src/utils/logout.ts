import axios from "axios"
import {Data, deleteCookie} from "services/service"

export const kakaoLogout = async () => {
  await axios({
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