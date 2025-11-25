"use client"

import type React from "react"

import { useState, lazy, Suspense } from "react"
import Link from "next/link"
import Header from "@/components/header"
import { ChevronLeft } from "lucide-react"

// Lazy load footer component
const Footer = lazy(() => import("@/components/footer"))

// Note: metadata export not supported in client components
// SEO handled by layout.tsx and meta tags

export default function ReservePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    carModel: "",
    preferredDate: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const carModels = [
    "Apex GT-R Sports",
    "Quantum Sedan Luxury",
    "Titan SUV Performance",
    "Horizon EV Electric",
    "Ferrari F8 Tributo",
    "Lamborghini Huracán",
    "Tesla Model S Plaid",
    "BMW M5 Competition",
    "Porsche 911 Turbo",
    "Audi RS6 Avant",
    "Mercedes-AMG C63",
    "Jaguar F-Type R",
    "Aston Martin DB11",
    "Bentley Flying Spur",
    "Rolls-Royce Ghost",
    "Range Rover Sport SVR",
    "Volvo XC90 T8",
    "Lexus NX 450h+",
    "Polestar 3",
    "Lucid Air Grand",
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Reservation submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        carModel: "",
        preferredDate: "",
        message: "",
      })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <>
      <Header isScrolled={isScrolled} />
      <main className="min-h-screen bg-background pt-24">
        {/* Back Button */}
        <div className="max-w-2xl mx-auto px-6 mb-8">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors w-fit">
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Reserve Form Section */}
        <section className="max-w-2xl mx-auto px-6 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Reserve Your Vehicle</h1>
            <p className="text-muted-foreground">Schedule a test drive or reserve your dream car today</p>
          </div>

          {submitted ? (
            <div className="bg-primary/10 border border-primary rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-primary mb-2">Reservation Confirmed!</h2>
              <p className="text-muted-foreground">We'll contact you soon to confirm your reservation details.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              {/* Car Model Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Select Vehicle Model</label>
                <select
                  name="carModel"
                  value={formData.carModel}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none"
                >
                  <option value="">Choose a vehicle...</option>
                  {carModels.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-sm font-medium mb-2">Preferred Reservation Date</label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-2">Additional Message (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your interest..."
                  rows={4}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Confirm Reservation
              </button>
            </form>
          )}
        </section>

        {/* Info Section */}
        <section className="max-w-2xl mx-auto px-6 py-12 border-t border-border">
          <h2 className="text-2xl font-bold mb-6">Why Reserve With Us?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Priority Access</h3>
              <p className="text-sm text-muted-foreground">
                Be the first to know about new arrivals and exclusive offers
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Expert Guidance</h3>
              <p className="text-sm text-muted-foreground">Our specialists will help you find the perfect vehicle</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Flexible Options</h3>
              <p className="text-sm text-muted-foreground">Choose lease, purchase, or test drive options</p>
            </div>
          </div>
        </section>
      </main>
      <Suspense fallback={<div className="h-20" />}>
        <Footer />
      </Suspense>
    </>
  )
}
