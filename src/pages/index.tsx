// 메인 페이지
import type { NextPage } from 'next'
import React, {useEffect, useState} from 'react'
import home from '../styles/Home.module.scss'
import {GetApi} from "@/services/common"
import apiList from "@/utils/apiList"

interface PopularList {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const Home: NextPage = () => {
  const [popularList, setPopularList] = useState<PopularList[]>([])

  // 실시간 인기 순위 영화 리스트 목록 조회
  const fnGetPopularMovie = () => {
    GetApi(apiList.getPopularMovie).then(res => {
      setPopularList(res.results)
    })
  }

  useEffect(() => {
    fnGetPopularMovie()
  },[])

  return popularList.length > 0 ? (
    <div className={home.wrapper} style={{background: `url(${popularList[0].backdrop_path}) no-repeat center`, backgroundSize: '100%'}}>
      <h4>{popularList[0].title}</h4>
      <p>{popularList[0].overview}</p>
    </div>
  ) : <>err</>
}

export default Home
