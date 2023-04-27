// 메인 페이지
import type { NextPage } from 'next'
import React, {useEffect, useState} from 'react'
import home from '../styles/Home.module.scss'
import {GetApi} from "services/common"
import apiList from "utils/apiList"
import {MovieListItems} from "utils/interface"
import dynamic from "next/dynamic"

// 해당 컴포넌트가 필요한 시점에만 로드
const MovieListMain = dynamic(() => import('components/MovieListMain'))

const Home: NextPage = () => {
  const [popularList, setPopularList] = useState<MovieListItems[]>([])

  // 실시간 인기 순위 영화 리스트 목록 조회
  const fnGetPopularMovie = () => {
    GetApi(apiList.getPopularMovie).then(res => {
      if (res !== 'FAIL') {
        setPopularList(res.results)
      }
    })
  }

  useEffect(() => {
    fnGetPopularMovie()
  },[])

  return popularList.length > 0 ? (
    <>
      <div className={home.wrapper} style={{background: `url(${popularList[0].backdrop_path}) no-repeat center`, backgroundSize: '100%'}}>
        <h4>{popularList[0].title}</h4>
        <p>{popularList[0].overview}</p>
      </div>

      {/* Movie List */}
      <div className={home.list}>
        <p>실시간 인기 순위 영화</p>
        <MovieListMain popularList={popularList}/>
      </div>
    </>
  ) : <>err</>
}

export default Home
