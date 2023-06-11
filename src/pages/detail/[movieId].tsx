import {useRouter} from "next/router"
import {useEffect, useState} from "react"
import {GetApiPath} from "services/common"
import apiList from "utils/apiList"
import {MovieDetailItems, MovieResult} from "utils/interface"
import detail from "./Detail.module.scss"
import Image from "next/image"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faStar} from "@fortawesome/free-solid-svg-icons"
import dynamic from "next/dynamic"

// 해당 컴포넌트가 필요한 시점에만 로드
const MovieList = dynamic(() => import('components/MovieList'))
const Review = dynamic(() => import('pages/detail/components/Review'))

const movieResultInit: MovieResult = {
  page: 1,
  results: [],
  total_pages: 0,
  total_results: 0
}

const MovieDetail = () => {
  const router = useRouter()
  const [movieId, setMovieId] = useState<string>("")
  const [detailData, setDetailData] = useState<MovieDetailItems>()
  const [similarData, setSimilarData] = useState<MovieResult>(movieResultInit)

  const movieListArr = {
    title: '비슷한 영화',
    item: similarData.results,
    page: similarData.page
  }

  // 영화 세부 정보 조회
  const fnGetMovieDetail = async () => {
    await GetApiPath(apiList.getMovieDetail, movieId).then(res => {
      if (res !== 'FAIL') {
        setDetailData(res)
      }
    })
  }

  // 해당 영화와 유사한 영화 목록 조회
  const fnGetSimilarMovie = async () => {
    await GetApiPath(apiList.getSimilarMovie, movieId, {page: similarData.page}).then(res => {
      if (res !== 'FAIL') {
        setSimilarData({
          ...similarData,
          results: [...similarData.results, ...res.results]
        })
      }
    })
  }

  // Infinite Swiper (pagination)
  const fnChangePage = ($page: number) => {
    setSimilarData({...similarData, page: $page})
  }

  // url query 변경 감지
  useEffect(() => {
    if (router.query.movieId) {
      setMovieId(router.query.movieId as string)
    }
  }, [router.query.movieId])

  // url query 변경 시: 세부 정보 -> 유사한 영화 목록 조회
  useEffect(() => {
    if (movieId !== '') {
      fnGetMovieDetail().then(() =>
        fnGetSimilarMovie()
      )
    }
  },[movieId])

  useEffect(() => {
    if (similarData.page !== 1) fnGetSimilarMovie()
  },[similarData.page])

  return detailData !== undefined && movieId !== '' ? (
    <div className={detail.wrapper}>
      <div className={detail.container}>
        {/* 영화 포스터 이미지 */}
        <div className={detail.imageBox}>
          <Image
            src={detailData.poster_path === 'https://image.tmdb.org/t/p/w500/null' ? '/images/none_poster.png' : detailData.poster_path}
            alt={detailData.title}
            width={370}
            height={525}
          />
        </div>

        {/* 상세 정보 */}
        <div className={detail.detailBox}>
          <ul>
            <li>{detailData.title}</li>
            <li>
              <p>{detailData.release_date} | {detailData.runtime}분</p>
              <div>
                <p>{detailData.vote_average?.toFixed(1)}</p>
                <FontAwesomeIcon icon={faStar}/>
              </div>
            </li>
            <li>{detailData.tagline === '' ? detailData.original_title : detailData.tagline}</li>
            <li>{detailData.overview}</li>
          </ul>
          {/* 비슷한 영화 추천 */}
          {
            similarData.results.length > 0
              ? <div className={detail.similar}>
                <p>&lt;{detailData.title}&gt; 와 비슷한 영화</p>
                <MovieList
                  detailList={true}
                  listItem={movieListArr}
                  fnChangePage={fnChangePage}
                  width={170}
                  height={230}
                />
              </div>
              : <></>
          }
        </div>
      </div>

      {/* 리뷰 컴포넌트 */}
      <Review movieId={movieId}/>
    </div>
  ) : <>err</>
}

export default MovieDetail
