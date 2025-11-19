"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cars } from "@/lib/cars-data"
import styles from "./car-showcase.module.css"

interface CarShowcaseProps {
  selectedIndex: number
  onSelectCar: (index: number) => void
}

export default function CarShowcase({ selectedIndex, onSelectCar }: CarShowcaseProps) {
  const [autoRotate, setAutoRotate] = useState(true)

  useEffect(() => {
    if (!autoRotate) return

    const timer = setInterval(() => {
      onSelectCar((prev) => (prev + 1) % cars.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [autoRotate, onSelectCar])

  const goToPrevious = () => {
    setAutoRotate(false)
    onSelectCar((prev) => (prev - 1 + cars.length) % cars.length)
  }

  const goToNext = () => {
    setAutoRotate(false)
    onSelectCar((prev) => (prev + 1) % cars.length)
  }

  const currentCar = cars[selectedIndex]

  const getThumbnailIndices = () => {
    const indices = []
    for (let i = 0; i < 5; i++) {
      indices.push((selectedIndex + i) % cars.length)
    }
    return indices
  }

  return (
    <section id="models" className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.counter}>
            {String(selectedIndex + 1).padStart(2, "0")} / {String(cars.length).padStart(2, "0")}
          </span>
          <h2 className={styles.title}>{currentCar.category} Collection</h2>
          <p className={styles.brand}>{currentCar.brand}</p>
        </div>

        {/* Main showcase */}
        <div className={styles.showcase}>
          {/* Left side - Info */}
          <div className={styles.infoSection}>
            <div className={styles.infoContent}>
              <div className={styles.carNameContainer}>
                <h3>{currentCar.name}</h3>
                <p>
                  {currentCar.category} • {currentCar.year}
                </p>
              </div>

              <div className={styles.controls}>
                <button onClick={goToPrevious} className={styles.controlButton} aria-label="Previous car">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={goToNext} className={styles.controlButton} aria-label="Next car">
                  <ChevronRight size={20} />
                </button>
              </div>

              <button className={styles.viewDetailsButton}>View Details</button>
            </div>
          </div>

          {/* Center - Main image */}
          <div className={styles.imageContainer}>
            <img src={currentCar.image || "/placeholder.svg"} alt={currentCar.name} />
            <div className={styles.imageOverlay} />
          </div>

          {/* Right side - Thumbnails */}
          <div className={styles.thumbnailContainer}>
            <div className={styles.thumbnails}>
              {getThumbnailIndices().map((index) => (
                <button
                  key={cars[index].id}
                  onClick={() => {
                    setAutoRotate(false)
                    onSelectCar(index)
                  }}
                  className={`${styles.thumbnail} ${index === selectedIndex ? styles.thumbnailActive : ""}`}
                  title={cars[index].name}
                >
                  <img src={cars[index].image || "/placeholder.svg"} alt={cars[index].name} />
                </button>
              ))}
            </div>
            <p className={styles.thumbnailInfo}>
              Showing cars {selectedIndex + 1} - {Math.min(selectedIndex + 5, cars.length)} of {cars.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
