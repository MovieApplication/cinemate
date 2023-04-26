const domain = 'http://localhost:8080'

export interface Api {
  method: string;
  url: string;
  desc: string;
  headers?: object;
  public?: boolean;
}

interface ApiList {
  [key: string]: Api;
}

const apiList: ApiList = {
  // 실시간 인기 순위 영화 리스트 목록 조회
  'getPopularMovie': {
    method: 'GET',
    url: `${domain}/api/v1/movie/popular`,
    desc: '실시간 인기 순위 영화 리스트 목록 조회'
  },
}

export default apiList
