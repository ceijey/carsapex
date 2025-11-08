"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { useState } from "react"
import Link from "next/link"
import { cars } from "@/lib/cars-data"

export default function BrandsPage() {
  const [isScrolled, setIsScrolled] = useState(false)

  // Get unique brands
  const brands = Array.from(new Set(cars.map((car) => car.brand)))

  // Group cars by brand
  const brandCars = brands.map((brand) => ({
    name: brand,
    cars: cars.filter((car) => car.brand === brand),
  }))

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header isScrolled={isScrolled} />

      <main className="pt-32 pb-20">
        <section className="max-w-7xl mx-auto px-6 mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Explore Our <span className="text-primary">Premium Brands</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Discover the 10 exclusive automotive brands that define luxury, performance, and innovation.
          </p>
        </section>

        <div className="max-w-7xl mx-auto px-6">
          {brandCars.map((brand) => (
            <div key={brand.name} className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-primary">{brand.name}</h2>
                <span className="text-muted-foreground text-sm">{brand.cars.length} models</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {brand.cars.map((car) => (
                  <Link href={`/models/${car.id}`} key={car.id}>
                    <div className="bg-card rounded-lg border border-border overflow-hidden hover:border-primary transition-all group cursor-pointer">
                      <div className="h-40 bg-muted overflow-hidden">
                        <img
                          src={car.image || "/placeholder.svg"}
                          alt={car.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold">{car.name}</h3>
                        <p className="text-primary font-semibold text-sm mt-2">{car.category}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
