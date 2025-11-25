import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { cars } from "@/lib/cars-data"
import type { Metadata } from "next"
import { siteConfig, generateBreadcrumbStructuredData } from "@/lib/seo-config"

const title = "All Models - Premium Luxury & Performance Vehicles"
const description = "Explore our complete lineup of 20 exceptional vehicles from 10 premium brands. Discover sports cars, electric vehicles, luxury sedans, and high-performance SUVs from APEX Motors."

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "all car models",
    "vehicle lineup",
    "luxury cars collection",
    "sports cars",
    "electric vehicles",
    "premium vehicles",
    "car inventory",
  ],
  openGraph: {
    title,
    description,
    url: `${siteConfig.url}/models`,
    type: "website",
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  alternates: {
    canonical: `${siteConfig.url}/models`,
  },
}

// This page uses SSG (Static Site Generation)
export default function ModelsPage() {
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: "Home", url: "/" },
    { name: "All Models", url: "/models" },
  ])

  const itemListData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: cars.length,
    itemListElement: cars.map((car, index) => ({
      "@type": "Car",
      position: index + 1,
      name: `${car.year} ${car.brand} ${car.name}`,
      url: `${siteConfig.url}/models/${car.id}`,
      image: car.image,
    })),
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListData) }}
      />
      
      <Header />

      <main className="pt-32 pb-20">
        <section className="max-w-7xl mx-auto px-6 mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            All <span className="text-primary">Models</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Explore our complete lineup of 20 exceptional vehicles from 10 premium brands.
          </p>
        </section>

        <section className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {cars.map((car) => (
              <Link href={`/models/${car.id}`} key={car.id}>
                <div className="bg-card rounded-lg border border-border overflow-hidden hover:border-primary transition-all group cursor-pointer h-full">
                  <div className="h-32 bg-muted overflow-hidden">
                    <img
                      src={car.image || "/placeholder.svg"}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-muted-foreground">{car.brand}</p>
                    <h3 className="text-sm font-bold truncate">{car.name}</h3>
                    <p className="text-primary font-semibold text-xs mt-1">{car.specs.Power}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
