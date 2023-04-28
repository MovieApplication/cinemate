// 메인 페이지
import type { NextPage } from 'next'
import React, {useEffect, useState} from 'react'
import home from 'styles/Home.module.scss'
import {GetApi} from "services/common"
import apiList from "utils/apiList"
import {MovieListItems} from "utils/interface"
import dynamic from "next/dynamic"

// 해당 컴포넌트가 필요한 시점에만 로드
const MovieList = dynamic(() => import('components/MovieList'))

const Home: NextPage = () => {
  const [popularList, setPopularList] = useState<MovieListItems[]>([])
  const [inTheaterMovie, setInTheaterMovie] = useState<MovieListItems[]>([])
  const [releaseList, setReleaseList] = useState<MovieListItems[]>([])
  const [voteList, setVoteList] = useState<MovieListItems[]>([])
  const [yearList, setYearList] = useState<MovieListItems[]>([])

  const movieListArr = [{
    title: '실시간 인기 순위 영화',
    item: popularList
  }, {
    title: '현재 상영 중인 영화',
    item: inTheaterMovie
  }, {
    title: '높은 평점을 기록한 영화',
    item: voteList
  }, {
    title: '2023년 올해의 영화',
    item: yearList
  }, {
    title: '최근 개봉 영화',
    item: releaseList
  }]

  // 실시간 인기 순위 영화 리스트 목록 조회
  const fnGetPopularMovie = () => {
    GetApi(apiList.getPopularMovie).then(res => {
      if (res !== 'FAIL') {
        setPopularList(res.results)
      }
    })
  }

  // 현재 상영 중인 영화
  const fnGetInTheaterMovie = () => {
    GetApi(apiList.getInTheaterMovie).then(res => {
      if (res !== 'FAIL') {
        setInTheaterMovie(res.results)
      }
    })
  }

  // 최근에 개봉한 순 목록 조회 (현재날짜기준)
  const fnGetReleaseMovie = () => {
    GetApi(apiList.getReleaseMovie).then(res => {
      if (res !== 'FAIL') {
        setReleaseList(res.results)
      }
    })
  }

  // 평점 높은순으로 영화 목록 조회
  const fnGetVoteMovie = () => {
    GetApi(apiList.getVoteMovie).then(res => {
      if (res !== 'FAIL') {
        setVoteList(res.results)
      }
    })
  }

  // 년도별 영화 목록 조회
  const fnGetYearMovie = () => {
    GetApi(apiList.getYearMovie).then(res => {
      if (res !== 'FAIL') {
        setYearList(res.results)
      }
    })
  }

  useEffect(() => {
    fnGetPopularMovie()
    fnGetInTheaterMovie()
    fnGetReleaseMovie()
    fnGetVoteMovie()
    fnGetYearMovie()
  },[])

  return popularList.length > 0 ? (
    <>
      <div className={home.wrapper} style={{backgroundImage: `linear-gradient(to left, transparent, black), url(${popularList[0].backdrop_path})`, backgroundSize: '100%'}}>
        <h4>{popularList[0].title}</h4>
        <p>{popularList[0].overview}</p>
      </div>

      {/* Movie List */}
      {
        movieListArr.map(data => (
          <div className={home.list} key={data.title}>
            <p>{data.title}</p>
            <MovieList
              detailList={false}
              ListItem={data.item}
              perView={7.5}
              perGroup={7}
              width={200}
              height={260}
            />
          </div>
        ))
      }
    </>
  ) : <>err</>
}

export default Home
