import {ReviewItem} from "utils/interface"
import detail from "../Detail.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faVideo} from "@fortawesome/free-solid-svg-icons"

interface ReviewProps {
  item: ReviewItem;
}

const Review = (props: ReviewProps) => {
  return (
    <li>
      <div className={detail.iconBox}>
        <FontAwesomeIcon icon={faVideo} />
      </div>
      <div className={detail.textBox}>
        <p>이**</p>
        <p>Aperiam nobis suscipit delectus corrupti necessitatibus optio quasi.</p>
      </div>
    </li>
  )
}

export default Review