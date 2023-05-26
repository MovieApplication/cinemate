import React, {useEffect, useState} from "react"
import Image from "next/image"
import {PaginationInfo} from "utils/interface"
import DoubleBack from "../../public/images/doubleback.png"
import Back from "../../public/images/back.png"
import Forward from "../../public/images/forward.png"
import DoubleForward from "../../public/images/doubleforward.png"

interface PagingProps {
  info: PaginationInfo;
  setOption($curNo: number): void;
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

const Paging = (props: PagingProps) => {
  const [info, setInfo] = useState<PaginationInfo>(paginationInfoInit)

  const fnChangePage = ($pagingParam: string | number) => {
    switch ($pagingParam) {
      case 'first':
        props.setOption(1)
        break
      case 'prev':
        props.setOption(info.firstPage === 1 ? 1 : info.firstPage - 1)
        break
      case 'next':
        props.setOption(info.lastPage === info.totalPageCount ? info.totalPageCount : info.lastPage + 1)
        break
      case 'last':
        props.setOption(info.totalPageCount)
        break
      default:
        props.setOption(Number($pagingParam))
        break
    }
  }

  useEffect(() => {
    if(props.info) setInfo(props.info)
  }, [props.info])

  return (
    <div className="paging">
      {
        info.currentPageNo > 10
          ? <button
            type="button"
            onClick={() => fnChangePage('first')}
          >
            <Image
              src={DoubleBack}
              alt="처음으로"
            />
          </button>
          : <></>
      }
      {
        info.currentPageNo > 1
          ? <button
            type="button"
            onClick={() => fnChangePage('prev')}
          >
            <Image
              src={Back}
              alt="back"
            />
          </button>
          : <></>
      }

      {
        Array.from({ length: info.lastPage - info.firstPage + 1 }, (v, i) => i + info.firstPage).map(idx => (
          <button
            key={idx}
            type="button"
            className={idx === info.currentPageNo ? 'active' : ''}
            onClick={() => fnChangePage(idx)}
          >
            {idx}
          </button>
        ))
      }

      {
        info.currentPageNo !== info.totalPageCount
          ? <button
            type="button"
            onClick={() => fnChangePage('next')}
          >
            <Image
              src={Forward}
              alt="forward"
            />
          </button>
          : <></>
      }
      {
        info.lastPage !== info.totalPageCount
          ? <button
            type="button"
            onClick={() => fnChangePage('last')}
          >
            <Image
              src={DoubleForward}
              alt="맨 뒤로"
            />
          </button>
          : <></>
      }
    </div>
  )
}

export default Paging
