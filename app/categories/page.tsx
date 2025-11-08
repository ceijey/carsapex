"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { useState } from "react"
import Link from "next/link"
import { cars } from "@/lib/cars-data"

export default function CategoriesPage() {
  const [isScrolled, setIsScrolled] = useState(false)

  // Get unique categories
  const categories = Array.from(new Set(cars.map((car) => car.category)))

  // Group cars by category
  const categoryCars = categories.map((category) => ({
    name: category,
    cars: cars.filter((car) => car.category === category),
  }))

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header isScrolled={isScrolled} />

      <main className="pt-32 pb-20">
        <section className="max-w-7xl mx-auto px-6 mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Browse by <span className="text-primary">Category</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Discover our entire collection organized by vehicle type. Each category offers unique advantages tailored to
            different lifestyles.
          </p>
        </section>

        {categoryCars.map((category) => (
          <section key={category.name} className="max-w-7xl mx-auto px-6 mb-20">
            <h2 className="text-4xl font-bold mb-8 text-primary">{category.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.cars.map((car) => (
                <Link href={`/models/${car.id}`} key={car.id}>
                  <div className="bg-card rounded-lg border border-border overflow-hidden hover:border-primary transition-all group cursor-pointer">
                    <div className="h-48 bg-muted overflow-hidden">
                      <img
                        src={car.image || "/placeholder.svg"}
                        alt={car.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-muted-foreground mb-1">{car.brand}</p>
                      <h3 className="text-lg font-bold">{car.name}</h3>
                      <p className="text-primary font-semibold mt-2">{car.specs.Power}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  )
}
