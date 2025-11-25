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

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isScrolled, setIsScrolled] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Set auth cookie (in real app, this would be done server-side)
    document.cookie = `auth-token=demo-token-${Date.now()}; path=/; max-age=86400`
    
    // Get redirect URL from query params
    const params = new URLSearchParams(window.location.search)
    const from = params.get('from') || '/'
    
    // Redirect to original destination or home
    window.location.href = from
  }

  return (
    <>
      <Header isScrolled={isScrolled} />
      <main className="min-h-screen bg-background pt-24">
        <div className="max-w-md mx-auto px-6 mb-8">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors w-fit">
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <section className="max-w-md mx-auto px-6 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 space-y-6">
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

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Sign In
            </button>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </section>
      </main>
      <Suspense fallback={<div className="h-20" />}>
        <Footer />
      </Suspense>
    </>
  )
}
