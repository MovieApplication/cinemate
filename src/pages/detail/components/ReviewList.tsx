import {ReviewItem} from "utils/interface"
import detail from "../Detail.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPencil, faTrashCan} from "@fortawesome/free-solid-svg-icons"
import {faComments} from "@fortawesome/free-regular-svg-icons"
import {Data, getLoginId} from "services/common"

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
          <p>
            {props.item.userNickname}
            <span>{props.item.regDatetime}</span>
          </p>
          <p>{props.item.content}</p>
        </div>
      </div>
      {
        Number(getLoginId()) === Data.get('userInfo')?.id
        ? <div className={detail.buttonBox}>
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
        : null
      }
    </li>
  ) : <>err</>
}

export default ReviewList
