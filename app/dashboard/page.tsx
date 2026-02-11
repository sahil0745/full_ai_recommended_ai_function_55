"use client"

import { motion } from 'framer-motion'
import { Plane, MapPin, Hotel, Calendar, Heart, History, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Plane className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                TravelGenie
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <Link href="/explore">
                <Button variant="ghost">Explore</Button>
              </Link>
              <Link href="/plan-trip">
                <Button>Plan Trip</Button>
              </Link>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Welcome Section */}
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome back, Traveler!</h1>
            <p className="text-xl text-muted-foreground">Ready for your next adventure?</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/plan-trip">
              <Card className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/50">
                <MapPin className="w-10 h-10 text-primary mb-3" />
                <h3 className="text-lg font-bold mb-1">Plan Trip</h3>
                <p className="text-sm text-muted-foreground">AI-powered itinerary</p>
              </Card>
            </Link>

            <Link href="/hotels">
              <Card className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/50">
                <Hotel className="w-10 h-10 text-blue-500 mb-3" />
                <h3 className="text-lg font-bold mb-1">Find Hotels</h3>
                <p className="text-sm text-muted-foreground">Best deals near you</p>
              </Card>
            </Link>

            <Link href="/bookings">
              <Card className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/50">
                <Calendar className="w-10 h-10 text-green-500 mb-3" />
                <h3 className="text-lg font-bold mb-1">My Bookings</h3>
                <p className="text-sm text-muted-foreground">View reservations</p>
              </Card>
            </Link>

            <Link href="/wishlist">
              <Card className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/50">
                <Heart className="w-10 h-10 text-pink-500 mb-3" />
                <h3 className="text-lg font-bold mb-1">Wishlist</h3>
                <p className="text-sm text-muted-foreground">Saved destinations</p>
              </Card>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Trips Planned</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <MapPin className="w-12 h-12 text-primary/20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Places Visited</p>
                  <p className="text-3xl font-bold">28</p>
                </div>
                <Hotel className="w-12 h-12 text-blue-500/20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Upcoming Trips</p>
                  <p className="text-3xl font-bold">3</p>
                </div>
                <Calendar className="w-12 h-12 text-green-500/20" />
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
            <Card className="p-6">
              <div className="space-y-4">
                {[
                  {
                    icon: Hotel,
                    title: 'Booked Grand Hotel',
                    location: 'Paris, France',
                    date: '2 days ago'
                  },
                  {
                    icon: MapPin,
                    title: 'Planned trip to Tokyo',
                    location: 'Tokyo, Japan',
                    date: '5 days ago'
                  },
                  {
                    icon: Heart,
                    title: 'Added to wishlist',
                    location: 'Bali, Indonesia',
                    date: '1 week ago'
                  }
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 pb-4 border-b last:border-0 last:pb-0"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <activity.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{activity.title}</h4>
                      <p className="text-sm text-muted-foreground">{activity.location}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
