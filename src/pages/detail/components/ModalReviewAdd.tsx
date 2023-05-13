import {ReviewItem} from "utils/interface"
import detail from "pages/detail/Detail.module.scss"
import {faXmark} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React, {useEffect, useState} from "react"
import {hangulRegExp} from "utils/validation";

interface ReviewAddProps {
  currentReview: ReviewItem;
  toggleReviewModal(): void;
}

const ReviewItemInit: ReviewItem = {
  review_id: "",
  content: "",
  userId: ""
}

const ModalReviewAdd = (props: ReviewAddProps) => {
  const [currentReview, setCurrentReview] = useState<ReviewItem>(ReviewItemInit)
  const [checkUserId, setCheckUserId] = useState<boolean>(false)
  const [checkContent, setCheckContent] = useState<boolean>(false)

  // 리뷰 둥록/수정 onChange 시 데이터 세팅
  const fnOnchangeReview = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    // validation : userId의 경우 한글만 입력 가능
    if (e.target.name === 'userId') {
      setCheckUserId(hangulRegExp(e.target.value) && e.target.value !== "")
    }

    // validation : content의 경우 빈칸 불가능
    if (e.target.name === 'content') {
      setCheckContent(e.target.value.trim() !== "")
    }

    setCurrentReview({
      ...currentReview,
      [e.target.name]: e.target.value
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
            placeholder="이름을 입력해주세요."
            maxLength={5}
            name="userId"
            value={currentReview.userId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => fnOnchangeReview(e)}
          />
          {
            !checkUserId
              ? <p>이름을 확인해주세요.</p>
              : <></>
          }
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
        <button type='button' disabled={!(checkUserId && checkContent)}>등록</button>
      </div>
    </div>
  )
}

export default ModalReviewAdd