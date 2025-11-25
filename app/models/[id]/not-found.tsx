import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ModelNotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h2 className="text-3xl font-bold mb-6">Model Not Found</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            The model you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/models"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Back to All Models
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
