import Link from "next/link"
import { Mail, Phone } from "lucide-react"
import styles from "./footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand */}
          <div>
            <Link href="/" className={styles.logo}>
              APEX
            </Link>
            <p>Engineering excellence and automotive innovation since 2020.</p>
          </div>

          {/* Quick Links */}
          <div className={styles.section}>
            <h4>Browse</h4>
            <ul className={styles.linkList}>
              <li>
                <Link href="/models">All Models</Link>
              </li>
              <li>
                <Link href="/categories">Categories</Link>
              </li>
              <li>
                <Link href="/brands">Brands</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className={styles.section}>
            <h4>Support</h4>
            <ul className={styles.linkList}>
              <li>
                <Link href="/about">Financing</Link>
              </li>
              <li>
                <Link href="/about">Warranty</Link>
              </li>
              <li>
                <Link href="/about">Service</Link>
              </li>
              <li>
                <Link href="/about">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.section}>
            <h4>Contact</h4>
            <ul className={styles.contactList}>
              <li>
                <a href="tel:+1234567890" className={styles.contactItem}>
                  <Phone size={16} />
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <a href="mailto:info@apex.com" className={styles.contactItem}>
                  <Mail size={16} />
                  info@apex.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider}>
          <div className={styles.bottomContent}>
            <p>&copy; 2025 APEX Automotive. All rights reserved.</p>
            <div className={styles.bottomLinks}>
              <Link href="/about">Privacy</Link>
              <Link href="/about">Terms</Link>
              <Link href="/about">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
