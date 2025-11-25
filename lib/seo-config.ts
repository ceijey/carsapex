/**
 * SEO Configuration
 * Central configuration for site-wide SEO settings
 */

export const siteConfig = {
  name: "APEX Motors",
  title: "APEX Motors - Premium Luxury & Performance Vehicles",
  description:
    "Discover APEX Motors' exclusive collection of 20 luxury and performance vehicles from 10 premium brands. Explore sports cars, electric vehicles, luxury sedans, and high-performance SUVs.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://carsapex.com",
  ogImage: "/og-image.jpg",
  keywords: [
    "luxury cars",
    "premium vehicles",
    "sports cars",
    "electric vehicles",
    "performance cars",
    "luxury sedans",
    "high-performance SUVs",
    "automotive excellence",
    "car dealership",
    "luxury car brands",
    "exotic cars",
    "supercar dealership",
    "electric car sales",
    "premium car showroom",
    "automotive innovation",
  ],
  social: {
    twitter: "@apexmotors",
    facebook: "https://facebook.com/apexmotors",
    instagram: "https://instagram.com/apexmotors",
    youtube: "https://youtube.com/@apexmotors",
  },
  contact: {
    email: "info@apexmotors.com",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Premium Drive",
      city: "Beverly Hills",
      state: "CA",
      zip: "90210",
      country: "USA",
    },
  },
  business: {
    type: "AutoDealer",
    founded: 2020,
    priceRange: "$$$",
    hoursAvailable: {
      monday: "9:00 AM - 8:00 PM",
      tuesday: "9:00 AM - 8:00 PM",
      wednesday: "9:00 AM - 8:00 PM",
      thursday: "9:00 AM - 8:00 PM",
      friday: "9:00 AM - 8:00 PM",
      saturday: "10:00 AM - 6:00 PM",
      sunday: "12:00 PM - 5:00 PM",
    },
  },
}

/**
 * Generate structured data for a car product
 */
export function generateCarStructuredData(car: {
  id: number
  name: string
  brand: string
  category: string
  year: number
  image: string
  specs: Record<string, string>
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Car",
    name: `${car.year} ${car.brand} ${car.name}`,
    brand: {
      "@type": "Brand",
      name: car.brand,
    },
    model: car.name,
    vehicleModelDate: car.year,
    bodyType: car.category,
    image: car.image,
    vehicleEngine: {
      "@type": "EngineSpecification",
      name: car.specs.Engine,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      seller: {
        "@type": "AutoDealer",
        name: siteConfig.name,
      },
    },
  }
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  }
}

/**
 * Generate FAQ structured data
 */
export function generateFAQStructuredData(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

/**
 * Default metadata template
 */
export const defaultMetadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}
