// 메인 페이지
import type { InferGetServerSidePropsType } from 'next'
import React from 'react'
import dynamic from "next/dynamic"
import Link from "next/link"
import { useInfiniteQuery } from 'react-query'
import home from 'styles/Home.module.scss'
import {GetApi} from "services/common"
import apiList from "utils/apiList"
import {MovieResult} from "utils/interface"
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

const Home = ({popularListInit, inTheaterListInit, voteListInit, yearListInit, releaseListInit}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // 실시간 인기 순위 영화 리스트 목록 조회
  const popularListQuery: any = useInfiniteQuery(
    ['popularList'],
    ({ pageParam = 1 }) => GetApi(apiList.getPopularMovie, { page: pageParam }),
    {
      initialData: {
        pages: [popularListInit],
        pageParams: [1]
      },
      getNextPageParam: (res) => {
        const nextPage = res.page + 1;
        return res.page >= res.total_pages ? undefined : nextPage;
      },
    }
  )

  // 현재 상영 중인 영화
  const inTheaterListQuery: any = useInfiniteQuery(
    ['inTheaterList'],
    ({ pageParam = 1 }) => GetApi(apiList.getInTheaterMovie, { page: pageParam }),
    {
      initialData: {
        pages: [inTheaterListInit],
        pageParams: [1]
      },
      getNextPageParam: (res) => {
        const nextPage = res.page + 1;
        return res.page >= res.total_pages ? undefined : nextPage;
      },
    }
  )
  
  // 평점 높은순으로 영화 목록 조회
  const voteListQuery: any = useInfiniteQuery(
    ['voteList'],
    ({ pageParam = 1 }) => GetApi(apiList.getVoteMovie, { page: pageParam }),
    {
      initialData: {
        pages: [voteListInit],
        pageParams: [1]
      },
      getNextPageParam: (res) => {
        const nextPage = res.page + 1;
        return res.page >= res.total_pages ? undefined : nextPage;
      },
    }
  )

  // 연도별 영화 목록 조회
  const yearListQuery: any = useInfiniteQuery(
    ['yearList'],
    ({ pageParam = 1 }) => GetApi(apiList.getYearMovie, { page: pageParam }),
    {
      initialData: {
        pages: [yearListInit],
        pageParams: [1]
      },
      getNextPageParam: (res) => {
        const nextPage = res.page + 1;
        return res.page >= res.total_pages ? undefined : nextPage;
      },
    }
  )

  // 최근에 개봉한 순 목록 조회 (현재날짜기준)
  const releaseListQuery: any = useInfiniteQuery(
    ['releaseList'],
    ({ pageParam = 1 }) => GetApi(apiList.getReleaseMovie, { page: pageParam }),
    {
      initialData: {
        pages: [releaseListInit],
        pageParams: [1]
      },
      getNextPageParam: (res) => {
        const nextPage = res.page + 1;
        return res.page >= res.total_pages ? undefined : nextPage;
      },
    }
  )

  const movieListArr = [{
    title: '현재 상영 중인 영화',
    item: inTheaterListQuery.data?.pages.map((page: MovieResult) => page.results).flat(),
    page: inTheaterListQuery.data?.pages.map((page: MovieResult) => page.page).flat(),
    fetchNext: inTheaterListQuery.fetchNextPage
  }, {
    title: '실시간 인기 순위 영화',
    item: popularListQuery.data?.pages.map((page: MovieResult) => page.results).flat(),
    page: popularListQuery.data?.pages.map((page: MovieResult) => page.page).flat(),
    fetchNext: popularListQuery.fetchNextPage
  }, {
    title: '높은 평점을 기록한 영화',
    item: voteListQuery.data?.pages.map((page: MovieResult) => page.results).flat(),
    page: voteListQuery.data?.pages.map((page: MovieResult) => page.page).flat(),
    fetchNext: voteListQuery.fetchNextPage
  }, {
    title: '2023년 올해의 영화',
    item: yearListQuery.data?.pages.map((page: MovieResult) => page.results).flat(),
    page: yearListQuery.data?.pages.map((page: MovieResult) => page.page).flat(),
    fetchNext: yearListQuery.fetchNextPage
  }, {
    title: '최근 개봉 영화',
    item: releaseListQuery.data?.pages.map((page: MovieResult) => page.results).flat(),
    page: releaseListQuery.data?.pages.map((page: MovieResult) => page.page).flat(),
    fetchNext: releaseListQuery.fetchNextPage
  }]

  return (
    <>
      <div
        className={home.wrapper}
        style={{backgroundImage: `linear-gradient(to left, transparent, black), url(${popularListQuery.data?.pages[0].results[0].backdrop_path})`}}
      >
        <h4>{popularListQuery.data?.pages[0].results[0].title}</h4>
        <p>{popularListQuery.data?.pages[0].results[0].overview}</p>
        <Link href={`/detail/${encodeURIComponent(popularListQuery.data?.pages[0].results[0].id as number)}`}>
          <FontAwesomeIcon icon={faCircleInfo} />
          <span>상세 정보</span>
        </Link>
      </div>

      {/* Movie List */}
      {
        movieListArr.map((data, idx) => (
          <div 
            className={`${home.list} ${data.title === '실시간 인기 순위 영화' ? home.popular : ''}`}
            data-popular={`${data.title === '실시간 인기 순위 영화' ? 'popular' : ''}`}
            key={idx}
          >
            <p>{data.title}</p>
            <MovieList
              detailList={false}
              listItem={data}
              width={200}
              height={270}
            />
          </div>
        ))
      }
    </>
  )
}

export const getServerSideProps = async () => {
  try {
    const popularListInit = await GetApi(apiList.getPopularMovie, { page: 1 })
    const inTheaterListInit = await GetApi(apiList.getInTheaterMovie, { page: 1 })
    const releaseListInit = await GetApi(apiList.getReleaseMovie, { page: 1 })
    const voteListInit = await GetApi(apiList.getVoteMovie, { page: 1 })
    const yearListInit = await GetApi(apiList.getYearMovie, { page: 1 })

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
