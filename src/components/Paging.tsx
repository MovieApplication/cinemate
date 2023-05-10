import {useMemo} from "react"

interface PagingProps {
  idx: number;
  curPageNo: number;
  fnChangePage(event: React.MouseEvent<HTMLAnchorElement>, $num: number): void;
}

const Paging = (props: PagingProps) => {
  const checkCurrent = useMemo(() => {
    return props.idx === props.curPageNo ? 'active' : ''
  },[props.curPageNo])

  return (
    <a
      href="#"
      className={checkCurrent}
      onClick={(event) => props.fnChangePage(event, props.idx)}
    >
      {props.idx}
    </a>
  )
}

export default Paging
