import {ReviewItem} from "utils/interface"
import detail from "../Detail.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faComments} from "@fortawesome/free-solid-svg-icons"

interface ReviewListProps {
  item: ReviewItem;
}

const ReviewList = (props: ReviewListProps) => {
  return props.item ? (
    <li>
      <div className={detail.iconBox}>
        <FontAwesomeIcon icon={faComments} />
      </div>
      <div className={detail.textBox}>
        <p>{props.item.userId}</p>
        <p>{props.item.content}</p>
      </div>
    </li>
  ) : <>err</>
}

export default ReviewList