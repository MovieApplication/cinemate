// 검색 페이지
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import search from './Search.module.scss'
import { useEffect } from 'react'
import { Data } from '@/services/common'

const Search = () => {
  useEffect(() => {
    Data.set('search', true)
    return () => {
      Data.set('search', false)
    }
  }, [])

  return (
    <div className={search.wrapper}>
      <div className={search.inputGroup}>
        <input type="text" placeholder="영화 제목을 입력해보세요." />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          height={35}
        />
      </div>
    </div>
  )
}

export default Search