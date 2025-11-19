import Link from "next/link"
import styles from "./header.module.css"

interface HeaderProps {
  isScrolled: boolean
}

export default function Header({ isScrolled }: HeaderProps) {
  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          APEX
        </Link>

        <ul className={styles.navLinks}>
          <li>
            <Link href="/models">Models</Link>
          </li>
          <li>
            <Link href="/categories">Categories</Link>
          </li>
          <li>
            <Link href="/brands">Brands</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>

        <Link href="/reserve" className={styles.reserveBtn}>
          Reserve
        </Link>
      </nav>
    </header>
  )
}
