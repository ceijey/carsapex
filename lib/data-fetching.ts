import { cars } from "./cars-data"

/**
 * Data Fetching Utilities
 * 
 * These functions demonstrate Next.js 15+ data fetching patterns:
 * - SSG (Static Site Generation) - Build-time data fetching
 * - ISR (Incremental Static Regeneration) - Periodic revalidation
 * - SSR (Server-Side Rendering) - Request-time data fetching
 */

// Type definitions
export type Car = typeof cars[0]
export type Brand = string
export type Category = string

/**
 * Get all cars (SSG - Static Site Generation)
 * Cached at build time, no revalidation by default
 */
export async function getAllCars(): Promise<Car[]> {
  // In a real app, this would fetch from an API or database
  // For now, we return the static data
  return cars
}

/**
 * Get a single car by ID (SSG with ISR)
 * Revalidates every 24 hours
 */
export async function getCarById(id: number): Promise<Car | undefined> {
  const allCars = await getAllCars()
  return allCars.find((car) => car.id === id)
}

/**
 * Get all unique brands (SSG)
 * Cached at build time
 */
export async function getAllBrands(): Promise<Brand[]> {
  const allCars = await getAllCars()
  return Array.from(new Set(allCars.map((car) => car.brand))).sort()
}

/**
 * Get all unique categories (SSG)
 * Cached at build time
 */
export async function getAllCategories(): Promise<Category[]> {
  const allCars = await getAllCars()
  return Array.from(new Set(allCars.map((car) => car.category))).sort()
}

/**
 * Get cars by brand (SSG)
 */
export async function getCarsByBrand(brand: string): Promise<Car[]> {
  const allCars = await getAllCars()
  return allCars.filter((car) => car.brand === brand)
}

/**
 * Get cars by category (SSG)
 */
export async function getCarsByCategory(category: string): Promise<Car[]> {
  const allCars = await getAllCars()
  return allCars.filter((car) => car.category === category)
}

/**
 * Get featured cars (first 6 cars) - for homepage
 */
export async function getFeaturedCars(): Promise<Car[]> {
  const allCars = await getAllCars()
  return allCars.slice(0, 6)
}

/**
 * Search cars by name or brand (Could be SSR if dynamic)
 */
export async function searchCars(query: string): Promise<Car[]> {
  const allCars = await getAllCars()
  const lowerQuery = query.toLowerCase()
  
  return allCars.filter(
    (car) =>
      car.name.toLowerCase().includes(lowerQuery) ||
      car.brand.toLowerCase().includes(lowerQuery) ||
      car.category.toLowerCase().includes(lowerQuery)
  )
}

/**
 * Get related cars by category (excluding current car)
 */
export async function getRelatedCars(carId: number, limit: number = 4): Promise<Car[]> {
  const car = await getCarById(carId)
  if (!car) return []

  const allCars = await getAllCars()
  return allCars
    .filter((c) => c.category === car.category && c.id !== car.id)
    .slice(0, limit)
}

/**
 * Get statistics for the about page
 */
export async function getSiteStats() {
  const allCars = await getAllCars()
  const brands = await getAllBrands()
  const categories = await getAllCategories()

  return {
    totalModels: allCars.length,
    totalBrands: brands.length,
    totalCategories: categories.length,
    founded: 2020,
  }
}
