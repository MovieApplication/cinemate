// 메인 페이지
import type { InferGetServerSidePropsType } from 'next'
import React, {useEffect, useState} from 'react'
import home from 'styles/Home.module.scss'
import {GetApi} from "services/common"
import apiList from "utils/apiList"
import {MovieResult} from "utils/interface"
import dynamic from "next/dynamic"
import Link from "next/link"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons"

// 해당 컴포넌트가 필요한 시점에만 로드
const MovieList = dynamic(() => import('components/MovieList'))

const movieResultInit: MovieResult = {
  page: 1,
  results: [],
  total_pages: 0,
  total_results: 0
}

const Home = ({popularListInit, inTheaterListInit, releaseListInit, voteListInit, yearListInit}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [popularList, setPopularList] = useState<MovieResult>(popularListInit)
  const [inTheaterList, setInTheaterList] = useState<MovieResult>(inTheaterListInit)
  const [releaseList, setReleaseList] = useState<MovieResult>(releaseListInit)
  const [voteList, setVoteList] = useState<MovieResult>(voteListInit)
  const [yearList, setYearList] = useState<MovieResult>(yearListInit)

  const movieListArr = [{
    title: '현재 상영 중인 영화',
    item: inTheaterList.results,
    page: inTheaterList.page
  }, {
    title: '실시간 인기 순위 영화',
    item: popularList.results,
    page: popularList.page
  }, {
    title: '높은 평점을 기록한 영화',
    item: voteList.results,
    page: voteList.page
  }, {
    title: '2023년 올해의 영화',
    item: yearList.results,
    page: yearList.page
  }, {
    title: '최근 개봉 영화',
    item: releaseList.results,
    page: releaseList.page
  }]

  // 실시간 인기 순위 영화 리스트 목록 조회
  const fnGetPopularMovie = async () => {
    await GetApi(apiList.getPopularMovie, {page: popularList.page}).then(res => {
      if (res !== 'FAIL') {
        setPopularList({
          ...popularList,
          results: [...popularList.results, ...res.results]
        })
      }
    })
  }

  // 현재 상영 중인 영화
  const fnGetInTheaterMovie = async () => {
    await GetApi(apiList.getInTheaterMovie, {page: inTheaterList.page}).then(res => {
      if (res !== 'FAIL') {
        setInTheaterList({
          ...inTheaterList,
          results: [...inTheaterList.results, ...res.results]
        })
      }
    })
  }

  // 최근에 개봉한 순 목록 조회 (현재날짜기준)
  const fnGetReleaseMovie = async () => {
    await GetApi(apiList.getReleaseMovie, {page: releaseList.page}).then(res => {
      if (res !== 'FAIL') {
        setReleaseList({
          ...releaseList,
          results: [...releaseList.results, ...res.results]
        })
      }
    })
  }

  // 평점 높은순으로 영화 목록 조회
  const fnGetVoteMovie = async () => {
    await GetApi(apiList.getVoteMovie, {page: voteList.page}).then(res => {
      if (res !== 'FAIL') {
        setVoteList({
          ...voteList,
          results: [...voteList.results, ...res.results]
        })
      }
    })
  }

  // 년도별 영화 목록 조회
  const fnGetYearMovie = async () => {
    await GetApi(apiList.getYearMovie, {page: yearList.page}).then(res => {
      if (res !== 'FAIL') {
        setYearList({
          ...yearList,
          results: [...yearList.results, ...res.results]
        })
      }
    })
  }

  // Infinite Swiper (pagination)
  const fnChangePage = ($page: number, $title: string) => {
    if ($title === '실시간 인기 순위 영화') {
      setPopularList({...popularList, page: $page})
    } else if ($title === '현재 상영 중인 영화') {
      setInTheaterList({...inTheaterList, page: $page})
    } else if ($title === '높은 평점을 기록한 영화') {
      setVoteList({...voteList, page: $page})
    } else if ($title === '2023년 올해의 영화') {
      setYearList({...yearList, page: $page})
    } else {
      setReleaseList({...releaseList, page: $page})
    }
  }

  useEffect(() => {
    if (popularList.page !== 1) fnGetPopularMovie()
  },[popularList.page])

  useEffect(() => {
    if (inTheaterList.page !== 1) fnGetInTheaterMovie()
  },[inTheaterList.page])

  useEffect(() => {
    if (releaseList.page !== 1) fnGetReleaseMovie()
  },[releaseList.page])

  useEffect(() => {
    if (voteList.page !== 1) fnGetVoteMovie()
  },[voteList.page])

  useEffect(() => {
    if (yearList.page !== 1) fnGetYearMovie()
  },[yearList.page])

  return (
    <>
      <div className={home.wrapper} style={{backgroundImage: `linear-gradient(to left, transparent, black), url(${popularList?.results[0]?.backdrop_path})`, backgroundSize: '100%'}}>
        <h4>{popularList?.results[0]?.title}</h4>
        <p>{popularList?.results[0]?.overview}</p>
        <Link href={`/detail/${encodeURIComponent(popularList?.results[0]?.id)}`}>
          <FontAwesomeIcon icon={faCircleInfo} />
          <span>상세 정보</span>
        </Link>
      </div>

      {/* Movie List */}
      {
        movieListArr.map((data, idx) => (
          data.item.length > 0
            ? <div className={`${home.list} ${data.title === '실시간 인기 순위 영화' ? home.popular : ''}`} key={idx}>
              <p>{data.title}</p>
              <MovieList
                detailList={false}
                listItem={data}
                fnChangePage={fnChangePage}
                width={200}
                height={270}
              />
            </div>
            : null
        ))
      }
    </>
  )
}

export const getServerSideProps = async () => {
  try {
    const popularListInit = await GetApi(apiList.getPopularMovie)
    const inTheaterListInit = await GetApi(apiList.getInTheaterMovie)
    const releaseListInit = await GetApi(apiList.getReleaseMovie)
    const voteListInit = await GetApi(apiList.getVoteMovie)
    const yearListInit = await GetApi(apiList.getYearMovie)

    return {
      props: {
        popularListInit: popularListInit === 'FAIL' ? movieResultInit : popularListInit,
        inTheaterListInit: inTheaterListInit === 'FAIL' ? movieResultInit : inTheaterListInit,
        releaseListInit: releaseListInit === 'FAIL' ? movieResultInit : releaseListInit,
        voteListInit: voteListInit === 'FAIL' ? movieResultInit : voteListInit,
        yearListInit: yearListInit === 'FAIL' ? movieResultInit : yearListInit,
      },
    }
  } catch (err) {
    console.warn('server side err : ' + err)
  }
}

export default Home
