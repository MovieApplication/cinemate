import React, {useEffect, useState} from "react"
import {useRouter} from "next/router"
import {ReviewItem} from "utils/interface"
import detail from "pages/detail/Detail.module.scss"
import {faXmark} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Data, GetApi, sAlert} from "services/common"
import apiList from "utils/apiList"

interface ReviewAddProps {
  currentReview: ReviewItem;
  toggleReviewModal(): void;
  fnAddNewReview(): void;
}

const reviewItemInit: ReviewItem = {
  reviewId: "",
  movieId: "",
  content: ""
}

const ModalReviewAdd = (props: ReviewAddProps) => {
  const router = useRouter()
  const movieId = router.query.movieId as string
  const [currentReview, setCurrentReview] = useState<ReviewItem>(reviewItemInit)
  const [checkContent, setCheckContent] = useState<boolean>(false)

  // 리뷰 둥록/수정 onChange 시 데이터 세팅
  const fnOnchangeReview = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // validation : content의 경우 빈칸 불가능
    setCheckContent(e.target.value.trim() !== "")

    setCurrentReview({
      ...currentReview,
      [e.target.name]: e.target.value.trim()
    })
  }

  // 리뷰 등록/수정
  const fnAddReview = () => {
    sAlert({
      html: '리뷰를 등록 하시겠습니까?',
      showCancelButton: true,
    }).then((res: any) => {
      if (res.isConfirmed) {
        const $api = props.currentReview.reviewId === '' ? apiList.postReview : apiList.putReview
        const $param = props.currentReview.reviewId === '' ?
          {
            content: currentReview.content,
            movieId: movieId
          } : {
            content: currentReview.content,
            reviewId: currentReview.reviewId
          }

        GetApi($api, $param).then(res => {
          if (res !== 'FAIL') {
            props.fnAddNewReview()
          } else {
            sAlert({
              html: '동일한 내용의 리뷰는 작성하실 수 없습니다.'
            })
          }
        })
      }
    })
  }

  // 모달창 컨트롤 시 overflow-y 조정
  useEffect(() => {
    document.documentElement.style.overflowY = "hidden"

    return () => {
      document.documentElement.style.overflowY = "auto"
    }
  },[])

  useEffect(() => {
    setCurrentReview(props.currentReview)
  },[props.currentReview])

  return (
    <div className={detail.reviewAddModal}>
      <div className={detail.addBox}>
        <h2>리뷰 쓰기</h2>
        <FontAwesomeIcon
          icon={faXmark}
          height={35}
          onClick={props.toggleReviewModal}
        />
        <div className={detail.addText}>
          <input
            type="text"
            disabled
            maxLength={5}
            defaultValue={Data.get('userInfo').kakao_account.profile.nickname}
          />
          <textarea
            placeholder="영화에 대한 솔직한 리뷰를 남겨주세요."
            maxLength={100}
            name="content"
            value={currentReview.content}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => fnOnchangeReview(e)}
          />
          {
            !checkContent
              ? <p>내용을 입력해주세요.</p>
              : <></>
          }
        </div>
        <button
          type='button'
          disabled={!checkContent}
          onClick={fnAddReview}
        >
          등록
        </button>
      </div>
    </div>
  )
}

export default ModalReviewAdd
