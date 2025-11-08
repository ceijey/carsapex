"use client"

import { cars } from "@/lib/cars-data"
import styles from "./car-details.module.css"

interface CarDetailsProps {
  selectedIndex: number
}

export default function CarDetails({ selectedIndex }: CarDetailsProps) {
  const currentCar = cars[selectedIndex]

  return (
    <section id="features" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Performance <span className={styles.titleHighlight}>Specifications</span>
          </h2>
          <p className={styles.description}>{currentCar.name} — Premium Engineering</p>
        </div>

        {/* Specs grid */}
        <div className={styles.specsGrid}>
          {Object.entries(currentCar.specs).map(([key, value]) => (
            <div key={key} className={styles.specCard}>
              <p className={styles.specLabel}>{key}</p>
              <p className={styles.specValue}>{value}</p>
            </div>
          ))}
        </div>

        {/* Features highlight */}
        <div className={styles.featuresGrid}>
          {[
            { title: "Precision Engineering", desc: "Crafted with meticulous attention to detail" },
            { title: "Advanced Technology", desc: "State-of-the-art systems and features" },
            { title: "Premium Interior", desc: "Luxury materials and comfortable seating" },
            { title: "Safety First", desc: "Advanced safety systems and features" },
          ].map((feature, idx) => (
            <div key={idx} className={styles.featureCard}>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
