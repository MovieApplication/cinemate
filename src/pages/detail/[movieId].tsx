import {useRouter} from "next/router"
import type { InferGetServerSidePropsType } from 'next'
import {useEffect, useState} from "react"
import { useInfiniteQuery } from "react-query"
import {GetApiPath} from "services/common"
import apiList from "utils/apiList"
import {MovieDetailItems, MovieResult} from "utils/interface"
import detail from "./Detail.module.scss"
import Image from "next/image"
import dynamic from "next/dynamic"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faStar} from "@fortawesome/free-solid-svg-icons"

// 해당 컴포넌트가 필요한 시점에만 로드
const MovieList = dynamic(() => import('components/MovieList'))
const Review = dynamic(() => import('pages/detail/components/Review'))

const movieResultInit: MovieResult = {
  page: 1,
  results: [],
  total_pages: 0,
  total_results: 0
}

const MovieDetail = ({similarDataInit}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const [movieId, setMovieId] = useState<string>("")
  const [detailData, setDetailData] = useState<MovieDetailItems>()

  // 해당 영화와 유사한 영화 목록 조회
  const similarDataQuery: any = useInfiniteQuery(
    ['similarData', movieId],
    ({ pageParam = 1 }) => GetApiPath(apiList.getSimilarMovie, movieId, { page: pageParam }),
    {
      initialData: {
        pages: [similarDataInit],
        pageParams: [1]
      },
      getNextPageParam: (res) => {
        const nextPage = res.page + 1;
        return res.page >= res.total_pages ? undefined : nextPage;
      },
    }
  )

  const movieListArr = {
    title: '비슷한 영화',
    item: similarDataQuery.data?.pages.map((page: MovieResult) => page.results).flat(),
    page: similarDataQuery.data?.pages.map((page: MovieResult) => page.page).flat(),
    fetchNext: similarDataQuery.fetchNextPage
  }

  // 영화 세부 정보 조회
  const fnGetMovieDetail = async () => {
    await GetApiPath(apiList.getMovieDetail, movieId).then(res => {
      if (res !== 'FAIL') {
        setDetailData(res)
      }
    })
  }
  
  // url query 변경 감지
  useEffect(() => {
    if (router.query.movieId) setMovieId(router.query.movieId as string)
  }, [router.query.movieId])

  // url query 변경 시: 세부 정보 -> 유사한 영화 목록 조회
  useEffect(() => {
    if (movieId !== '') fnGetMovieDetail()
  },[movieId])

  return detailData !== undefined && (
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
            movieListArr.item.length > 0 &&
              <div
                className={detail.similar}
                data-similar="similar"
              >
                <p>&lt;{detailData.title}&gt; 와 비슷한 영화</p>
                <MovieList
                  detailList={true}
                  listItem={movieListArr}
                  width={170}
                  height={230}
                />
              </div>
          }
        </div>
      </div>

      {/* 리뷰 컴포넌트 */}
      <Review movieId={movieId}/>
    </div>
  )
}

export const getServerSideProps = async ({params}: {params: any}) => {
  try {
    const similarDataInit = await GetApiPath(apiList.getSimilarMovie, params.movieId, {page: 1})

    return {
      props: {
        similarDataInit: similarDataInit === 'FAIL' ? movieResultInit : similarDataInit
      }
    }
  } catch (err) {
    console.log('detail server side err : ' + err)
  }
}

export default MovieDetail
