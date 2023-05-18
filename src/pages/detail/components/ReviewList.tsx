import {ReviewItem} from "utils/interface"
import detail from "../Detail.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPencil, faTrashCan} from "@fortawesome/free-solid-svg-icons"
import {faComments} from "@fortawesome/free-regular-svg-icons"

interface ReviewListProps {
  item: ReviewItem;
  fnSetReview($data: ReviewItem): void;
  fnDeleteReview($reviewId: string): void;
}

const ReviewList = (props: ReviewListProps) => {
  return props.item ? (
    <li>
      <div className={detail.iconTextBox}>
        <div className={detail.iconBox}>
          <FontAwesomeIcon icon={faComments}/>
        </div>
        <div className={detail.textBox}>
          <p>{props.item.userNickname}</p>
          <p>{props.item.content}</p>
        </div>
      </div>
      <div className={detail.buttonBox}>
        {/* 수정 버튼 */}
        <button
          type='button'
          onClick={() => props.fnSetReview(props.item)}
        >
          <FontAwesomeIcon icon={faPencil}/>
        </button>
        {/* 삭제 버튼 */}
        <button
          type='button'
          onClick={() => props.fnDeleteReview(props.item.reviewId as string)}
        >
          <FontAwesomeIcon icon={faTrashCan}/>
        </button>
      </div>
    </li>
  ) : <>err</>
}

export default ReviewList
