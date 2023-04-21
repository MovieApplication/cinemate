const domain = '//localhost:8080'

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
  // 단일 파일 조회
  'getSingleFile': {
    method: 'GET',
    url: '/api/v1/file/',
    desc: '단일 파일 조회'
  },
}

export default apiList
