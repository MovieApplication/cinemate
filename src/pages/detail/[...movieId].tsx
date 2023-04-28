import {useRouter} from "next/router"
import {useEffect, useState} from "react"
import {GetApiPath} from "services/common"
import apiList from "utils/apiList"
import {MovieDetailItems} from "utils/interface"
import detail from "./Detail.module.scss"
import Image from "next/image"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faStar} from "@fortawesome/free-solid-svg-icons";


const MovieDetail = () => {
  const router = useRouter()
  const [id] = router.query.movieId
  const [detailData, setDetailData] = useState<MovieDetailItems>()

  // 영화 세부 정보 조회
  const fnGetMovieDetail = () => {
    GetApiPath(apiList.getMovieDetail, id).then(res => {
      if (res !== 'FAIL') {
        setDetailData(res)
      }
    })
  }

  useEffect(() => {
    fnGetMovieDetail()
  },[])

  return detailData !== undefined ? (
    <div className={detail.wrapper}>
      <div className={detail.container}>
        {/* 영화 포스터 이미지 */}
        <div className={detail.imageBox}>
          <Image
            src={detailData.poster_path === 'https://image.tmdb.org/t/p/w500/null' ? '/images/none_poster.png' : detailData.poster_path}
            alt={detailData.title}
            width={400}
            height={560}
          />
        </div>

        {/* 상세 정보 */}
        <ul className={detail.detailBox}>
          <li>{detailData.title}</li>
          <li>
            <p>{detailData.release_date} | {detailData.runtime}분</p>
            <div>
              <p>{detailData.vote_average.toFixed(1)}</p>
              <FontAwesomeIcon icon={faStar}/>
            </div>
          </li>
          <li>{detailData.tagline}</li>
          <li>{detailData.overview}</li>
          {/* 비슷한 영화 추천 */}

        </ul>
      </div>
    </div>
  ) : <>err</>
}

export default MovieDetail
