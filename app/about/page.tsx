"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { useState } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function AboutPage() {
  const [isScrolled, setIsScrolled] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header isScrolled={isScrolled} />

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 mb-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              About <span className="text-primary">APEX</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Pioneering the future of automotive excellence through innovation, performance, and luxury craftsmanship.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="max-w-7xl mx-auto px-6 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-card p-8 rounded-lg border border-border">
              <h2 className="text-3xl font-bold mb-4 text-primary">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To revolutionize the automotive industry by delivering exceptional vehicles that combine cutting-edge
                technology, uncompromising performance, and timeless design. We are committed to providing our customers
                with the ultimate driving experience.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our mission extends beyond vehicles—we aim to inspire, innovate, and lead the industry toward a more
                sustainable and thrilling future.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border">
              <h2 className="text-3xl font-bold mb-4 text-primary">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To become the world's most respected automotive brand, known for pushing boundaries and creating
                vehicles that define generations. We envision a future where technology and artistry merge seamlessly.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Through innovation and dedication, we're building a legacy of excellence that will inspire generations
                of drivers and shape the future of mobility.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-7xl mx-auto px-6 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { number: "20+", label: "Models Available" },
              { number: "10", label: "Premium Brands" },
              { number: "50K+", label: "Happy Customers" },
              { number: "2020", label: "Founded" },
            ].map((stat, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border border-border text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Explore Section */}
        <section className="max-w-7xl mx-auto px-6 mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center">Explore Our Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/categories">
              <div className="bg-card p-8 rounded-lg border border-border hover:border-primary hover:bg-card/80 transition-all cursor-pointer group">
                <h3 className="text-2xl font-bold mb-3 text-primary group-hover:translate-x-2 transition-transform">
                  By Category
                </h3>
                <p className="text-muted-foreground mb-4">
                  Browse our vehicles organized by type—Sports, Luxury, Performance, Electric, and more.
                </p>
                <div className="flex items-center text-primary">
                  View All <ChevronRight size={20} className="ml-2" />
                </div>
              </div>
            </Link>

            <Link href="/brands">
              <div className="bg-card p-8 rounded-lg border border-border hover:border-primary hover:bg-card/80 transition-all cursor-pointer group">
                <h3 className="text-2xl font-bold mb-3 text-primary group-hover:translate-x-2 transition-transform">
                  By Brand
                </h3>
                <p className="text-muted-foreground mb-4">
                  Discover all 10 premium brands that make up the APEX family, each with unique character.
                </p>
                <div className="flex items-center text-primary">
                  View All <ChevronRight size={20} className="ml-2" />
                </div>
              </div>
            </Link>

            <Link href="/models">
              <div className="bg-card p-8 rounded-lg border border-border hover:border-primary hover:bg-card/80 transition-all cursor-pointer group">
                <h3 className="text-2xl font-bold mb-3 text-primary group-hover:translate-x-2 transition-transform">
                  All Models
                </h3>
                <p className="text-muted-foreground mb-4">
                  Browse the complete collection of all 20 models with detailed specifications and pricing.
                </p>
                <div className="flex items-center text-primary">
                  View All <ChevronRight size={20} className="ml-2" />
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Values */}
        <section className="max-w-7xl mx-auto px-6 mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Innovation", desc: "Pushing technological boundaries" },
              { title: "Excellence", desc: "Uncompromising quality standards" },
              { title: "Performance", desc: "Thrilling driving dynamics" },
              { title: "Sustainability", desc: "Eco-conscious manufacturing" },
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary"></div>
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience Excellence?</h2>
            <p className="text-muted-foreground mb-6 text-lg">
              Start exploring our collection and find your perfect vehicle today.
            </p>
            <Link href="/">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-sm font-medium hover:bg-primary/90 transition-colors">
                Back to Showroom
              </button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
