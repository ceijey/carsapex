"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import CarShowcase from "@/components/car-showcase"
import CarDetails from "@/components/car-details"
import CarGrid from "@/components/car-grid"
import Footer from "@/components/footer"

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
    <main className="min-h-screen bg-background text-foreground">
      <Header isScrolled={isScrolled} />
      <HeroSection />
      <CarShowcase selectedIndex={selectedCarIndex} onSelectCar={setSelectedCarIndex} />
      <CarDetails selectedIndex={selectedCarIndex} />
      <CarGrid />
      <Footer />
    </main>
  )
}
