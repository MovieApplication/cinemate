import React, {useMemo} from "react"

interface PagingProps {
  idx: number;
  curPageNo: number;
  fnChangePage($num: number, event: React.MouseEvent<HTMLAnchorElement>): void;
}

const Paging = (props: PagingProps) => {
  const checkCurrent = useMemo(() => {
    return props.idx === props.curPageNo ? 'active' : ''
  },[props.curPageNo])

  return (
    <a
      href="#"
      className={checkCurrent}
      onClick={(event) => props.fnChangePage(props.idx, event)}
    >
      {props.idx}
    </a>
  )
}

export default Paging
