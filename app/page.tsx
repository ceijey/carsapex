"use client"

import { useState, useEffect, lazy, Suspense } from "react"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import LoadingSpinner from "@/components/loading-spinner"

// Lazy load below-the-fold components to reduce initial bundle size
const CarShowcase = lazy(() => import("@/components/car-showcase"))
const CarDetails = lazy(() => import("@/components/car-details"))
const CarGrid = lazy(() => import("@/components/car-grid"))
const Footer = lazy(() => import("@/components/footer"))

export default function Home() {
  const [selectedCarIndex, setSelectedCarIndex] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <Header isScrolled={isScrolled} />
      <main className="min-h-screen bg-background text-foreground">
        <HeroSection />
      
      <Suspense fallback={<LoadingSpinner message="Loading showcase..." />}>
        <CarShowcase selectedIndex={selectedCarIndex} onSelectCar={setSelectedCarIndex} />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner message="Loading specifications..." />}>
        <CarDetails selectedIndex={selectedCarIndex} />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner message="Loading collection..." />}>
        <CarGrid />
      </Suspense>
      
      <Suspense fallback={<div className="h-20" />}>
        <Footer />
      </Suspense>
      </main>
    </>
  )
}
