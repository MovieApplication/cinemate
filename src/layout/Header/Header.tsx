import header from './Header.module.scss'
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

interface HeaderProps {
  searchIcon: boolean;
  toggleSearchIcon(): void;
}

export default function Header(props: HeaderProps) {
  return (
    <header className={header.header}>
      <Link href="/src/pages">
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
          : <Link href="/src/pages">
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
