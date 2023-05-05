# CINEMATE

> 2023.04.18 ~ 

***

## _Service Info_

- 카테고리 별 영화 정보 (실시간 인기 순위 영화, 현재 상영 중인 영화 등..)
- 무한 스와이프 (Infinite Swiper = Pagination)
- 실시간 인기 순위 영화 넘버링
- 영화 포스터 클릭 시 해당 영화 정보 확인
- 클릭한 영화와 비슷한 영화 추천


***

## _Detail_
[ SCSS ]
- style={{'--idx': `'${index + 1}'`}}를 통해 index 값을 넘겨주어 scss 파일 내에서 `var(--idx)` 스타일링

[ Next.js ]
- `CSS Modules` : paint 하는데 필요한 최소한의 CSS만 로드
- `next/Image` : 필요한 이미지만 빠르게 로드
- `next/dynamic` : 페이지 로딩 속도 개선