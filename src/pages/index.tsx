// 메인 페이지
import type { NextPage } from 'next'
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

const MovieResultInit: MovieResult = {
  page: 1,
  results: [],
  total_pages: 0,
  total_results: 0
}

const Home: NextPage = () => {
  const [popularList, setPopularList] = useState<MovieResult>(MovieResultInit)
  const [inTheaterList, setInTheaterList] = useState<MovieResult>(MovieResultInit)
  const [releaseList, setReleaseList] = useState<MovieResult>(MovieResultInit)
  const [voteList, setVoteList] = useState<MovieResult>(MovieResultInit)
  const [yearList, setYearList] = useState<MovieResult>(MovieResultInit)

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
    fnGetPopularMovie().then(() =>
      fnGetInTheaterMovie().then(() =>
        fnGetReleaseMovie().then(() =>
          fnGetVoteMovie().then(() =>
            fnGetYearMovie()
          )
        )
      )
    )
  },[])

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

  return popularList.results.length > 0 ? (
    <>
      <div className={home.wrapper} style={{backgroundImage: `linear-gradient(to left, transparent, black), url(${popularList.results[0].backdrop_path})`, backgroundSize: '100%'}}>
        <h4>{popularList.results[0].title}</h4>
        <p>{popularList.results[0].overview}</p>
        <Link href={`/detail/${encodeURIComponent(popularList.results[0].id)}`}>
          <FontAwesomeIcon icon={faCircleInfo} />
          <span>상세 정보</span>
        </Link>
      </div>

      {/* Movie List */}
      {
        movieListArr.map(data => (
          data.item.length > 0
            ? <div className={`${home.list} ${data.title === '실시간 인기 순위 영화' ? home.popular : ''}`} key={data.title}>
              <p>{data.title}</p>
              <MovieList
                detailList={false}
                listItem={data}
                fnChangePage={fnChangePage}
                perView={7.5}
                perGroup={7}
                width={200}
                height={270}
              />
            </div>
            : <></>
        ))
      }
    </>
  ) : <>err</>
}

export default Home
