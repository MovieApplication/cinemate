import {useRouter} from "next/router"
import {useEffect, useState} from "react"
import {GetApiPath} from "services/common"
import apiList from "utils/apiList"
import {MovieDetailItems, MovieListItems} from "utils/interface"
import detail from "./Detail.module.scss"
import Image from "next/image"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faStar} from "@fortawesome/free-solid-svg-icons"
import dynamic from "next/dynamic"

// 해당 컴포넌트가 필요한 시점에만 로드
const MovieList = dynamic(() => import('components/MovieList'))

const MovieDetail = () => {
  const router = useRouter()
  const [id] = router.query.movieId as string[]
  const [detailData, setDetailData] = useState<MovieDetailItems>()
  const [similarData, setSimilarData] = useState<MovieListItems[]>([])

  // 영화 세부 정보 조회
  const fnGetMovieDetail = async () => {
    await GetApiPath(apiList.getMovieDetail, id).then(res => {
      if (res !== 'FAIL') {
        setDetailData(res)
      }
    })
  }

  // 해당 영화와 유사한 영화 목록 조회
  const fnGetSimilarMovie = async () => {
    await GetApiPath(apiList.getSimilarMovie, id).then(res => {
      if (res !== 'FAIL') {
        setSimilarData(res.results)
      }
    })
  }

  // url query 변경 시: 세부 정보 + 유사한 영화 목록 조회
  useEffect(() => {
    fnGetMovieDetail()
    fnGetSimilarMovie()
  },[id])

  return detailData !== undefined ? (
    <div className={detail.wrapper}>
      <div className={detail.container}>
        {/* 영화 포스터 이미지 */}
        <div className={detail.imageBox}>
          <Image
            src={detailData.poster_path === 'https://image.tmdb.org/t/p/w500/null' ? '/images/none_poster.png' : detailData.poster_path}
            alt={detailData.title}
            width={400}
            height={575}
          />
        </div>

        {/* 상세 정보 */}
        <div className={detail.detailBox}>
          <ul>
            <li>{detailData.title}</li>
            <li>
              <p>{detailData.release_date} | {detailData.runtime}분</p>
              <div>
                <p>{detailData.vote_average.toFixed(1)}</p>
                <FontAwesomeIcon icon={faStar}/>
              </div>
            </li>
            <li>{detailData.tagline === '' ? detailData.original_title : detailData.tagline}</li>
            <li>{detailData.overview}</li>
          </ul>
          {/* 비슷한 영화 추천 */}
          <div className={detail.similar}>
            <p>&lt;{detailData.title}&gt; 와 비슷한 영화</p>
            <MovieList
              detailList={true}
              ListItem={similarData}
              perView={4.5}
              perGroup={4}
              width={180}
              height={260}
            />
          </div>
        </div>
      </div>
    </div>
  ) : <>err</>
}

export default MovieDetail
