import React, {useMemo} from "react"

interface PagingProps {
  idx: number;
  curPageNo: number;
  fnChangePage($num: number): void;
}

const Paging = (props: PagingProps) => {
  const checkCurrent = useMemo(() => {
    return props.idx === props.curPageNo ? 'active' : ''
  },[props.curPageNo])

  return (
    <button
      type='button'
      className={checkCurrent}
      onClick={() => props.fnChangePage(props.idx)}
    >
      {props.idx}
    </button>
  )
}

export default Paging
