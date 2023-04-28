import header from './Header.module.scss'
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import {useEffect, useState} from "react"

interface HeaderProps {
  searchIcon: boolean;
  toggleSearchIcon(): void;
}

export default function Header(props: HeaderProps) {
  const [scrollValue, setScrollValue] = useState(0)

  const updateScroll = () => setScrollValue(window.scrollY || document.documentElement.scrollTop)

  useEffect(() => {
    // scroll event
    window.addEventListener('scroll', updateScroll)
  },[scrollValue])

  return (
    <header className={scrollValue > 100 ? header.blackHeader : header.header}>
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="CINEMATE"
          width={150}
          height={30}
        />
      </Link>
      {
        props.searchIcon
          ? <Link href="/search">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              height={25}
              onClick={props.toggleSearchIcon}
            />
          </Link>
          : <Link href="/">
            <FontAwesomeIcon
              icon={faXmark}
              height={25}
              onClick={props.toggleSearchIcon}
            />
          </Link>
      }
    </header>
  )
}
