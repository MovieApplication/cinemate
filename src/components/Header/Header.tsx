import header from './Header.module.scss'
import Image from "next/image"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

export default function Header() {
  return (
    <header className={header.header}>
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="CINEMATE"
          width={200}
          height={30}
        />
      </Link>
      <Link href="/">
        <FontAwesomeIcon icon={faMagnifyingGlass} height={30} />
      </Link>
    </header>
  )
}
