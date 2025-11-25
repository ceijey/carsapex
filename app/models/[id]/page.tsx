import Header from "@/components/header"
import Footer from "@/components/footer"
import { cars } from "@/lib/cars-data"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { siteConfig, generateCarStructuredData, generateBreadcrumbStructuredData } from "@/lib/seo-config"

// Generate static params for all car IDs (SSG)
export async function generateStaticParams() {
  return cars.map((car) => ({
    id: car.id.toString(),
  }))
}

// Generate metadata for each car page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const car = cars.find((c) => c.id === Number.parseInt(id))

  if (!car) {
    return {
      title: "Model Not Found",
    }
  }

  const title = `${car.year} ${car.brand} ${car.name}`
  const description = `Explore the ${car.year} ${car.brand} ${car.name}, a premium ${car.category.toLowerCase()} vehicle. Features ${car.specs.Engine} with ${car.specs.Power}, ${car.specs.Acceleration}. View full specifications and reserve your test drive today.`

  return {
    title,
    description,
    keywords: [
      car.brand,
      car.name,
      car.category,
      "luxury car",
      "premium vehicle",
      car.year.toString(),
      ...Object.values(car.specs),
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: `${siteConfig.url}/models/${car.id}`,
      images: [
        {
          url: car.image || "/placeholder.svg",
          width: 1200,
          height: 630,
          alt: `${car.year} ${car.brand} ${car.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [car.image || "/placeholder.svg"],
    },
    alternates: {
      canonical: `${siteConfig.url}/models/${car.id}`,
    },
  }
}

// Enable ISR - revalidate every 24 hours
export const revalidate = 86400

// This page uses SSG with ISR (Incremental Static Regeneration)
export default async function ModelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const car = cars.find((c) => c.id === Number.parseInt(id))

  if (!car) {
    notFound()
  }

  // Generate structured data for SEO
  const carStructuredData = generateCarStructuredData(car)
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: "Home", url: "/" },
    { name: "Models", url: "/models" },
    { name: `${car.brand} ${car.name}`, url: `/models/${car.id}` },
  ])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(carStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      
      <Header />

      <main className="pt-20 pb-20">
        {/* Back Button */}
        <section className="max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/models"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft size={20} />
            Back to All Models
          </Link>
        </section>

        {/* Hero Image */}
        <section className="max-w-7xl mx-auto px-6 mb-12">
          <div className="h-96 rounded-lg overflow-hidden border border-border">
            <img src={car.image || "/placeholder.svg"} alt={car.name} className="w-full h-full object-cover" />
          </div>
        </section>

        {/* Car Info */}
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-primary font-semibold mb-2">{car.brand}</p>
              <h1 className="text-5xl font-bold mb-4">{car.name}</h1>
              <p className="text-2xl text-muted-foreground mb-6">{car.year}</p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Introducing the {car.name}, a masterpiece of engineering and design. This remarkable vehicle combines
                cutting-edge technology with timeless elegance, delivering an unparalleled driving experience that sets
                new standards in the {car.category.toLowerCase()} segment.
              </p>
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-sm font-medium hover:bg-primary/90 transition-colors">
                Reserve This Vehicle
              </button>
            </div>

            {/* Key Specs */}
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(car.specs).map(([key, value]) => (
                <div key={key} className="bg-card p-4 rounded-lg border border-border">
                  <p className="text-muted-foreground text-sm mb-1">{key}</p>
                  <p className="text-lg font-bold text-primary">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Models */}
        <section className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">Similar Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {cars
              .filter((c) => c.category === car.category && c.id !== car.id)
              .slice(0, 4)
              .map((relatedCar) => (
                <Link href={`/models/${relatedCar.id}`} key={relatedCar.id}>
                  <div className="bg-card rounded-lg border border-border overflow-hidden hover:border-primary transition-all group cursor-pointer">
                    <div className="h-40 bg-muted overflow-hidden">
                      <img
                        src={relatedCar.image || "/placeholder.svg"}
                        alt={relatedCar.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-muted-foreground mb-1">{relatedCar.brand}</p>
                      <h3 className="font-bold">{relatedCar.name}</h3>
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
