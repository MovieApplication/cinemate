import header from './Header.module.scss'
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { useState } from 'react'

export default function Header() {
  const [searchIcon, setSearchIcon] = useState(true)
  const toggleSearchIcon = () => setSearchIcon(!searchIcon)

  return (
    <header className={header.header}>
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="CINEMATE"
          width={150}
          height={30}
        />
      </Link>
      {
        searchIcon
          ? <Link href="/search">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              height={25}
              onClick={toggleSearchIcon}
            />
          </Link>
          : <Link href="/">
            <FontAwesomeIcon
              icon={faXmark}
              height={25}
              onClick={toggleSearchIcon}
            />
          </Link>
      }
    </header>
  )
}
