# CINEMATE

> [팀 프로젝트] 2023.04 ~ 2023.05 <br/> 
>
> : 영화를 좋아하는 모든 이들을 위한 커뮤니케이션 웹사이트
> 
> -  프론트 1명, 백엔드 1명
> - 역할) 서비스 화면 기획/디자인 및 퍼블리싱, 프론트 구현 
>
> 주소 : http://15.165.236.184:3000/
>
> → 자세한 프로젝트 실행과정 정리 ([노션](https://dygreen.notion.site/CINEMATE-873488df08b74282a4543651c7cedfcd?pvs=4)) 
> 
> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.Js&logoColor=white"> <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white">

***
## _Component Tree_
<img width="100%" alt="component tree" src="https://github.com/MovieApplication/cinemate/assets/95523625/c781c116-56b2-4647-ba36-9f84ae4efa0e">


***

## _Service Info_

메인 (Main page)
- 카테고리 별 영화 정보 (실시간 인기 순위 영화, 현재 상영 중인 영화 등..)
- 무한 스와이프 (Infinite Swiper = Pagination)
- 실시간 인기 순위 영화 넘버링

상세보기 (Detail page)
- 영화 포스터 클릭 시 해당 영화 상세 정보 확인
- 클릭한 영화와 비슷한 영화 추천
- 해당 영화 리뷰 확인 (paging)
- 해당 영화 리뷰 등록/수정/삭제 (카카오 로그인 필요, 폼 검증)

 로그인
-  [카카오] 로그인 토큰 발급 → [카카오] 사용자 정보 받기 → [CINEMATE] 유저 조회 → [CINEMATE] 기존 유저일 경우 로그인 / 신규 유저일 경우 유저 등록 후 로그인(토큰 발급+토큰 재발급)
- [카카오] 로그아웃

***

## _Detail_
[ Next.js ]
- `CSS Modules` : paint 하는데 필요한 최소한의 CSS만 로드
- `Dynamic Router` : 'moveId'에 따른 동적 라우팅
- `next/Image` : 필요한 이미지만 빠르게 로드
- `next/dynamic` : 페이지 로딩 속도 개선

[ SCSS ]
- 실시간 인기 순위 영화 넘버링 : `data-idx={index + 1}`를 통해 index 값을 넘겨주어 scss 파일 내에서 `attr(data-idx);` 스타일링
