"use client"

import { useState, useEffect } from "react"
import Header from "@/components/organisms/header"
import HeroSection from "@/components/organisms/hero-section"
import CarShowcase from "@/components/organisms/car-showcase"
import CarDetails from "@/components/molecules/car-details"
import CarGrid from "@/components/molecules/car-grid"
import Footer from "@/components/organisms/footer"

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
