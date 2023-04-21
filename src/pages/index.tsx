import type { NextPage } from 'next'
import React from 'react'
import home from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={home.wrapper}>
      썸네일 영역
      <h4>타이틀</h4>
      <p>상세 설명</p>
    </div>
  )
}

export default Home
