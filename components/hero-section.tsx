"use client"

import Link from "next/link"
import styles from "./hero-section.module.css"

export default function HeroSection() {
  return (
    <section className={styles.section}>
      {/* Background gradient */}
      <div className={styles.backgroundGradient} />

      {/* Hero car image */}
      <div className={styles.backgroundImage}>
        <img src="/luxury-sports-car-hero.jpg" alt="Premium luxury sports car" />
        <div className={styles.imageOverlay} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <span className={styles.label}>PREMIUM AUTOMOTIVE SHOWCASE</span>
        <h1 className={styles.title}>
          Engineering <span className={styles.titleHighlight}>Excellence</span>
        </h1>
        <p className={styles.description}>
          Discover our collection of meticulously crafted vehicles designed for those who demand perfection
        </p>
        <Link href="/models">
          <button className={styles.exploreButton}>
            Explore Models
            <span>→</span>
          </button>
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollIndicatorBorder}>
          <div className={styles.scrollIndicatorDot} />
        </div>
      </div>
    </section>
  )
}
