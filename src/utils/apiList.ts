const domain = 'http://15.165.236.184:8080'

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
  /*
  영화 조회
  * */
  // 실시간 인기 순위 영화 리스트 목록 조회
  'getPopularMovie': {
    method: 'GET',
    url: `${domain}/api/v1/movie/popular`,
    desc: '실시간 인기 순위 영화 리스트 목록 조회'
  },
  // 최근에 개봉한순으로 목록 조회(현재날짜기준)
  'getReleaseMovie': {
    method: 'GET',
    url: `${domain}/api/v1/movie/release-date`,
    desc: '최근에 개봉한순으로 목록 조회(현재날짜기준)'
  },
  // 평점 높은순으로 영화 목록 조회
  'getVoteMovie': {
    method: 'GET',
    url: `${domain}/api/v1/movie/vote-average`,
    desc: '평점 높은순으로 영화 목록 조회'
  },
  // 년도별 영화 목록 조회
  'getYearMovie': {
    method: 'GET',
    url: `${domain}/api/v1/movie/year`,
    desc: '년도별 영화 목록 조회'
  },
  // 현재 상영 중인 영화 목록 조회
  'getInTheaterMovie': {
    method: 'GET',
    url: `${domain}/api/v1/movie`,
    desc: '현재 상영 중인 영화 목록 조회'
  },
  // 영화 세부 정보 조회
  'getMovieDetail': {
    method: 'GET',
    url: `${domain}/api/v1/movie/`,
    desc: '영화 세부 정보 조회'
  },
  // 해당 영화와 유사한 영화 목록 조회
  'getSimilarMovie': {
    method: 'GET',
    url: `${domain}/api/v1/movie/similar/`,
    desc: '해당 영화와 유사한 영화 목록 조회'
  },
  /*
  리뷰
  * */
  // 리뷰 목록 조회
  'getReview': {
    method: 'GET',
    url: `${domain}/api/v1/review/`,
    desc: '리뷰 목록 조회'
  },
  // 리뷰 등록
  'postReview': {
    method: 'POST',
    url: `${domain}/api/v1/review`,
    desc: '리뷰 등록',
    public: true
  },
  // 리뷰 수정
  'putReview': {
    method: 'PUT',
    url: `${domain}/api/v1/review`,
    desc: '리뷰 수정',
    public: true
  },
  // 리뷰 삭제
  'deleteReview': {
    method: 'DELETE',
    url: `${domain}/api/v1/review/`,
    desc: '리뷰 삭제',
    public: true
  },
  /*
  로그인
  * */
  // 유저 조회
  'userInfoCheck': {
    method: 'GET',
    url: `${domain}/api/v1/user/info/`,
    desc: '유저 조회'
  },
  // 유저 등록
  'userInfo': {
    method: 'POST',
    url: `${domain}/api/v1/user/info`,
    desc: '유저 등록'
  },
  // 로그인 (토큰 획득)
  'userLogin': {
    method: 'POST',
    url: `${domain}/api/v1/user/login/`,
    desc: '로그인 (토큰 획득)'
  },
}

export default apiList
