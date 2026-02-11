"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plane, MapPin, Star, DollarSign, Search, Filter, Heart } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function HotelsPage() {
  const [hotels, setHotels] = useState([
    {
      id: '1',
      name: 'Grand Luxury Hotel',
      location: 'Downtown, New York',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
      rating: 4.8,
      reviews: 328,
      price: 250,
      amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'],
      featured: true
    },
    {
      id: '2',
      name: 'Beachside Resort',
      location: 'Miami Beach, Florida',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop',
      rating: 4.9,
      reviews: 512,
      price: 320,
      amenities: ['Beach Access', 'WiFi', 'Pool', 'Bar'],
      featured: true
    },
    {
      id: '3',
      name: 'Mountain View Lodge',
      location: 'Aspen, Colorado',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=400&fit=crop',
      rating: 4.7,
      reviews: 245,
      price: 280,
      amenities: ['WiFi', 'Fireplace', 'Restaurant', 'Spa'],
      featured: false
    },
    {
      id: '4',
      name: 'City Center Hotel',
      location: 'San Francisco, California',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop',
      rating: 4.6,
      reviews: 189,
      price: 220,
      amenities: ['WiFi', 'Gym', 'Restaurant', 'Parking'],
      featured: false
    },
    {
      id: '5',
      name: 'Historic Inn',
      location: 'Boston, Massachusetts',
      image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&h=400&fit=crop',
      rating: 4.5,
      reviews: 156,
      price: 180,
      amenities: ['WiFi', 'Restaurant', 'Bar', 'Historic'],
      featured: false
    },
    {
      id: '6',
      name: 'Boutique Hotel',
      location: 'Los Angeles, California',
      image: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=600&h=400&fit=crop',
      rating: 4.8,
      reviews: 267,
      price: 300,
      amenities: ['WiFi', 'Pool', 'Spa', 'Rooftop'],
      featured: false
    }
  ])

  const [filters, setFilters] = useState({
    search: '',
    priceRange: 'all',
    rating: 'all',
    sortBy: 'featured'
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
              <Link href="/restaurants">
                <Button variant="ghost">Restaurants</Button>
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
            <h1 className="text-4xl md:text-5xl font-bold">Find Your Perfect Stay</h1>
            <p className="text-xl text-muted-foreground">
              Discover amazing hotels at the best prices
            </p>
          </div>

          {/* Search & Filters */}
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by city or hotel name..."
                  className="pl-10"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>

              <Select value={filters.priceRange} onValueChange={(value) => setFilters({ ...filters, priceRange: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="budget">Under $100</SelectItem>
                  <SelectItem value="mid">$100 - $250</SelectItem>
                  <SelectItem value="luxury">$250+</SelectItem>
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

              <Select value={filters.sortBy} onValueChange={(value) => setFilters({ ...filters, sortBy: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {hotels.length} hotels found
            </p>
            <Button variant="outline" size="sm">
              <MapPin className="w-4 h-4 mr-2" />
              View on Map
            </Button>
          </div>

          {/* Hotels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
                  <div className="relative">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {hotel.featured && (
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
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{hotel.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {hotel.location}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded">
                        <Star className="w-4 h-4 text-primary fill-primary" />
                        <span className="font-bold text-sm">{hotel.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({hotel.reviews} reviews)
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-muted px-2 py-1 rounded"
                        >
                          {amenity}
                        </span>
                      ))}
                      {hotel.amenities.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{hotel.amenities.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div>
                        <p className="text-2xl font-bold text-primary">
                          ${hotel.price}
                        </p>
                        <p className="text-xs text-muted-foreground">per night</p>
                      </div>
                      <Link href={`/hotels/${hotel.id}`}>
                        <Button>Book Now</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center">
            <Button variant="outline" size="lg">
              Load More Hotels
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
