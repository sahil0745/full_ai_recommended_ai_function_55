"use client"

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plane, MapPin, Hotel, Utensils, Car, Sparkles, TrendingUp, Shield, Clock } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function LandingPage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic'
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <Plane className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                TravelGenie
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/signup">
                <Button>Get Started</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Your AI-Powered
                <br />
                <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Travel Companion
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Plan, Book, and Explore with AI. Hotels, Restaurants, Cabs, and complete trip planning in one place.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link href="/plan-trip">
                <Button size="lg" className="text-lg px-8 py-6">
                  <Sparkles className="mr-2" />
                  Plan Your Trip with AI
                </Button>
              </Link>
              <Link href="/explore">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  <MapPin className="mr-2" />
                  Explore Destinations
                </Button>
              </Link>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative mt-16"
            >
              <div className="rounded-2xl overflow-hidden border-4 border-primary/20 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop"
                  alt="Travel destination"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4" data-aos="fade-up">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything You Need</h2>
            <p className="text-xl text-muted-foreground">All-in-one platform for seamless travel</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Hotel,
                title: 'Hotels',
                description: 'Find and book the perfect stay',
                color: 'text-blue-500'
              },
              {
                icon: Utensils,
                title: 'Restaurants',
                description: 'Discover amazing dining experiences',
                color: 'text-orange-500'
              },
              {
                icon: Car,
                title: 'Transportation',
                description: 'Book cabs and plan routes',
                color: 'text-green-500'
              },
              {
                icon: Sparkles,
                title: 'AI Planner',
                description: 'Smart itinerary generation',
                color: 'text-purple-500'
              }
            ].map((feature, index) => (
              <Card
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="p-6 hover:shadow-lg transition-shadow duration-300 border-2 hover:border-primary/50"
              >
                <feature.icon className={`w-12 h-12 mb-4 ${feature.color}`} />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-muted/30" data-aos="fade-up">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why TravelGenie?</h2>
            <p className="text-xl text-muted-foreground">The smartest way to travel</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'AI-Powered',
                description: 'Smart recommendations based on your preferences and budget'
              },
              {
                icon: TrendingUp,
                title: 'Best Prices',
                description: 'Compare and find the best deals on hotels, restaurants, and more'
              },
              {
                icon: Shield,
                title: 'Secure Booking',
                description: 'Safe and encrypted payment process with instant confirmation'
              },
              {
                icon: Clock,
                title: '24/7 Support',
                description: 'AI chatbot and human support available anytime you need help'
              },
              {
                icon: MapPin,
                title: 'Real-Time Maps',
                description: 'Live location tracking and navigation with route optimization'
              },
              {
                icon: Hotel,
                title: 'Verified Places',
                description: 'All hotels and restaurants are verified and reviewed'
              }
            ].map((item, index) => (
              <Card
                key={index}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                className="p-8 text-center hover:shadow-xl transition-all duration-300"
              >
                <item.icon className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4" data-aos="fade-up">
        <div className="container mx-auto">
          <Card className="p-12 text-center bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border-2 border-primary/30">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who trust TravelGenie for their adventures
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="text-lg px-8 py-6">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  Watch Demo
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Plane className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">TravelGenie</span>
            </div>
            <p className="text-muted-foreground">
              © 2024 TravelGenie. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
