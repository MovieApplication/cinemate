import { useSearchParams } from 'next/navigation'
import {useEffect} from "react"
import Spinner from "../../../public/images/Spinner.gif"
import Image from "next/image"

const Kakao = () => {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')

  // useEffect(() => {
  //   if (code !== null) {}
  // },[code])

  return (
    <div className="spinner">
      <Image src={Spinner} alt="로딩중" />
      <h2>잠시만 기다려 주세요!<br/>로그인 중입니다.</h2>
    </div>
  )
}

export default Kakao