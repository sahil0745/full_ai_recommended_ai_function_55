"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plane, MapPin, Star, DollarSign, Search, Utensils, Heart, Clock } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([
    {
      id: '1',
      name: 'La Bella Italia',
      cuisine: ['Italian', 'Mediterranean'],
      location: 'Downtown, New York',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
      rating: 4.8,
      reviews: 425,
      priceRange: '$$$',
      hours: 'Open until 10:00 PM',
      featured: true,
      reservations: true
    },
    {
      id: '2',
      name: 'Sushi Master',
      cuisine: ['Japanese', 'Sushi'],
      location: 'Midtown, New York',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&h=400&fit=crop',
      rating: 4.9,
      reviews: 612,
      priceRange: '$$$$',
      hours: 'Open until 11:00 PM',
      featured: true,
      reservations: true
    },
    {
      id: '3',
      name: 'The Steakhouse',
      cuisine: ['American', 'Steakhouse'],
      location: 'Upper East Side, New York',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop',
      rating: 4.7,
      reviews: 338,
      priceRange: '$$$$',
      hours: 'Open until 10:30 PM',
      featured: false,
      reservations: true
    },
    {
      id: '4',
      name: 'Taco Fiesta',
      cuisine: ['Mexican', 'Latin'],
      location: 'Brooklyn, New York',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=400&fit=crop',
      rating: 4.6,
      reviews: 289,
      priceRange: '$$',
      hours: 'Open until 9:00 PM',
      featured: false,
      reservations: false
    },
    {
      id: '5',
      name: 'Café Parisien',
      cuisine: ['French', 'Café'],
      location: 'West Village, New York',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop',
      rating: 4.8,
      reviews: 456,
      priceRange: '$$$',
      hours: 'Open until 8:00 PM',
      featured: false,
      reservations: true
    },
    {
      id: '6',
      name: 'Dragon Palace',
      cuisine: ['Chinese', 'Asian'],
      location: 'Chinatown, New York',
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop',
      rating: 4.5,
      reviews: 367,
      priceRange: '$$',
      hours: 'Open until 11:30 PM',
      featured: false,
      reservations: true
    }
  ])

  const [filters, setFilters] = useState({
    search: '',
    cuisine: 'all',
    priceRange: 'all',
    rating: 'all'
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Plane className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                TravelGenie
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/hotels">
                <Button variant="ghost">Hotels</Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
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
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Discover Great Food</h1>
            <p className="text-xl text-muted-foreground">
              Find the perfect dining experience for every occasion
            </p>
          </div>

          {/* Search & Filters */}
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search restaurants or cuisine..."
                  className="pl-10"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>

              <Select value={filters.cuisine} onValueChange={(value) => setFilters({ ...filters, cuisine: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Cuisine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cuisines</SelectItem>
                  <SelectItem value="italian">Italian</SelectItem>
                  <SelectItem value="japanese">Japanese</SelectItem>
                  <SelectItem value="chinese">Chinese</SelectItem>
                  <SelectItem value="mexican">Mexican</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="american">American</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.priceRange} onValueChange={(value) => setFilters({ ...filters, priceRange: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="$">$ Budget</SelectItem>
                  <SelectItem value="$$">$$ Moderate</SelectItem>
                  <SelectItem value="$$$">$$$ Upscale</SelectItem>
                  <SelectItem value="$$$$">$$$$ Fine Dining</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.rating} onValueChange={(value) => setFilters({ ...filters, rating: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="4.5">4.5+ Stars</SelectItem>
                  <SelectItem value="4">4+ Stars</SelectItem>
                  <SelectItem value="3">3+ Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {restaurants.length} restaurants found
            </p>
            <Button variant="outline" size="sm">
              <MapPin className="w-4 h-4 mr-2" />
              Nearby Restaurants
            </Button>
          </div>

          {/* Restaurants Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
                  <div className="relative">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {restaurant.featured && (
                      <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </div>
                    )}
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-2 right-2"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="secondary" className="bg-background/90">
                        {restaurant.priceRange}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{restaurant.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {restaurant.location}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded">
                        <Star className="w-4 h-4 text-primary fill-primary" />
                        <span className="font-bold text-sm">{restaurant.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({restaurant.reviews} reviews)
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {restaurant.cuisine.map((cuisine, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-muted px-2 py-1 rounded"
                        >
                          {cuisine}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{restaurant.hours}</span>
                    </div>

                    <div className="flex gap-2 pt-3 border-t">
                      <Link href={`/restaurants/${restaurant.id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          View Menu
                        </Button>
                      </Link>
                      {restaurant.reservations && (
                        <Link href={`/restaurants/${restaurant.id}/book`} className="flex-1">
                          <Button className="w-full">
                            <Utensils className="w-4 h-4 mr-2" />
                            Reserve
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center">
            <Button variant="outline" size="lg">
              Load More Restaurants
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
