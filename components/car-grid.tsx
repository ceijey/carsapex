"use client"

import { useState } from "react"
import { cars } from "@/lib/cars-data"
import styles from "./car-grid.module.css"

export default function CarGrid() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const categories = Array.from(new Set(cars.map((car) => car.category)))

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Complete <span className={styles.titleHighlight}>Collection</span>
          </h2>
          <p className={styles.description}>Browse all {cars.length} vehicles in our premium lineup</p>
        </div>

        {/* Grid by category */}
        {categories.map((category) => {
          const categoryVehicles = cars.filter((car) => car.category === category)
          return (
            <div key={category} className={styles.categorySection}>
              <h3 className={styles.categoryTitle}>{category}</h3>
              <div className={styles.grid}>
                {categoryVehicles.map((car) => (
                  <div
                    key={car.id}
                    onMouseEnter={() => setHoveredId(car.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={styles.carCard}
                  >
                    <div className={styles.imageWrapper}>
                      <img src={car.image || "/placeholder.svg"} alt={car.name} />
                    </div>
                    <div className={styles.imageOverlay} />
                    <div className={styles.carInfo}>
                      <h4 className={styles.carName}>{car.name}</h4>
                      <p className={styles.carBrand}>{car.brand}</p>
                      <p className={styles.carPower}>{car.specs.Power}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
