import React, {useEffect, useState} from "react"
import {useRouter} from "next/router"
import detail from "pages/detail/Detail.module.scss"
import {PaginationInfo, ReviewItem} from "utils/interface"
import ReviewList from "pages/detail/components/ReviewList"
import {Data, GetApiPath, KAKAO_AUTH_URL, sAlert} from "services/common"
import apiList from "utils/apiList"
import Paging from "components/Paging"
import ModalReviewAdd from "pages/detail/components/ModalReviewAdd"

interface ReviewProps {
  movieId: string;
}

const reviewItemInit: ReviewItem = {
  reviewId: "",
  movieId: "",
  content: ""
}

const paginationInfoInit: PaginationInfo = {
  totalRecordCount: 0,
  totalPageCount: 0,
  recordsPerPage: 8,
  pageSize: 10,
  firstPage: 1,
  lastPage: 10,
  startPage: true,
  endPage: false,
  currentPageNo: 1,
  empty: false
}

const Review = (props: ReviewProps) => {
  const [reviewList, setReviewList] = useState<ReviewItem[]>([])
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>(paginationInfoInit)
  const [currentPageNo, setCurrentPageNo] = useState<number>(1)
  // 현재 리뷰 데이터
  const [currentReview, setCurrentReview] = useState<ReviewItem>(reviewItemInit)

  const router = useRouter()

  // 리뷰 등록/수정 모달창 컨트롤
  const [reviewModalFlag, setReviewModalFlag] = useState<boolean>(false)
  const toggleReviewModal = () => {
    if (Data.get('login') === null || Data.get('userInfo') === null) {
      sAlert({
        html: '로그인 후 이용 가능 합니다.<br>로그인 페이지로 이동 하시겠습니까?',
        showCancelButton: true
      }).then((res: any) => {
        if (res.isConfirmed) {
          router.push(KAKAO_AUTH_URL)
        }
      })
    } else {
      setReviewModalFlag(!reviewModalFlag)
    }
  }

  // 리뷰 목록 조회
  const fnGetReview = () => {
    const pageParams = {
      recordsPerPage: paginationInfo.recordsPerPage,
      currentPageNo
    }

    GetApiPath(apiList.getReview, props.movieId, pageParams).then(res => {
      if (res !== 'FAIL') {
        setReviewList(res.items)
        setPaginationInfo(res.paginationInfo)
      }
    })
  }

  // 페이징
  const fnChangePage = (e: React.MouseEvent<HTMLAnchorElement>, $num: number) => {
    e.preventDefault()

    setCurrentPageNo($num)
  }

  // 리뷰 신규/수정 모달창 컨트롤
  const fnSetReview = ($data: ReviewItem) => {
    toggleReviewModal()
    setCurrentReview($data)
  }

  useEffect(() => {
    fnGetReview()
  },[currentPageNo])

  return (
    <>
      <div className={detail.review}>
        <div className={detail.title}>
          <p>해당 영화 리뷰</p>
          <button type='button' onClick={() => fnSetReview(reviewItemInit)}>리뷰 쓰기</button>
        </div>
        {
          reviewList.length > 0
            ? <>
              <ul>
                {
                  reviewList.map(item => (
                    <ReviewList item={item} key={item.reviewId}/>
                  ))
                }
              </ul>
              {/* 페이징 */}
              <div className={detail.paging}>
                {
                  Array.from({length: paginationInfo.lastPage - paginationInfo.firstPage + 1}, (v, i) => i + paginationInfo.firstPage).map(idx => (
                    <Paging
                      key={idx}
                      idx={idx}
                      curPageNo={paginationInfo.currentPageNo}
                      fnChangePage={fnChangePage}
                    />
                  ))
                }
              </div>
            </>
            : <p className={detail.nonReview}>아직 등록된 리뷰가 없습니다.<br/>
              첫 번째 리뷰를 남겨주세요!
            </p>
        }
      </div>

      {/* 리뷰 등록/수정 모달 */}
      {
        reviewModalFlag
          ? <ModalReviewAdd
            currentReview={currentReview}
            toggleReviewModal={toggleReviewModal}
          />
          : <></>
      }
    </>
  )
}

export default Review
