"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plane, MapPin, Navigation, Search, Hotel, Utensils, Landmark } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'

export default function ExplorePage() {
  const { toast } = useToast()
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          toast({
            title: "Location detected",
            description: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`,
          })
        },
        (error) => {
          toast({
            title: "Location error",
            description: "Unable to detect location. Please enable location services.",
            variant: "destructive"
          })
        }
      )
    } else {
      toast({
        title: "Not supported",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive"
      })
    }
  }

  const nearbyPlaces = {
    hotels: [
      { id: '1', name: 'Grand Hotel', distance: '0.5 km', rating: 4.8 },
      { id: '2', name: 'City Center Inn', distance: '1.2 km', rating: 4.6 },
      { id: '3', name: 'Luxury Suites', distance: '1.8 km', rating: 4.9 }
    ],
    restaurants: [
      { id: '1', name: 'Italian Bistro', distance: '0.3 km', rating: 4.7 },
      { id: '2', name: 'Sushi Bar', distance: '0.8 km', rating: 4.8 },
      { id: '3', name: 'Steakhouse', distance: '1.5 km', rating: 4.6 }
    ],
    attractions: [
      { id: '1', name: 'Central Park', distance: '0.7 km', rating: 4.9 },
      { id: '2', name: 'Museum of Art', distance: '1.1 km', rating: 4.8 },
      { id: '3', name: 'Historic Square', distance: '2.0 km', rating: 4.7 }
    ]
  }

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
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
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
            <h1 className="text-4xl md:text-5xl font-bold">Explore Nearby</h1>
            <p className="text-xl text-muted-foreground">
              Discover amazing places around you
            </p>
          </div>

          {/* Location Detection */}
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search for a location or place..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button onClick={detectLocation} className="md:w-auto">
                <Navigation className="w-5 h-5 mr-2" />
                Use My Location
              </Button>
            </div>

            {currentLocation && (
              <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                <p className="text-sm font-medium">
                  📍 Current Location: {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
                </p>
              </div>
            )}
          </Card>

          {/* Map Placeholder */}
          <Card className="overflow-hidden">
            <div className="h-96 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative">
              <div className="text-center space-y-4">
                <MapPin className="w-16 h-16 text-primary mx-auto" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Interactive Map</h3>
                  <p className="text-muted-foreground">
                    Google Maps integration will display nearby hotels, restaurants, and attractions
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    (Map requires Google Maps API key)
                  </p>
                </div>
              </div>

              {/* Mock Map Markers */}
              <div className="absolute top-8 left-8 bg-white p-2 rounded-lg shadow-lg">
                <MapPin className="w-6 h-6 text-red-500" />
              </div>
              <div className="absolute top-16 right-12 bg-white p-2 rounded-lg shadow-lg">
                <Hotel className="w-6 h-6 text-blue-500" />
              </div>
              <div className="absolute bottom-12 left-16 bg-white p-2 rounded-lg shadow-lg">
                <Utensils className="w-6 h-6 text-orange-500" />
              </div>
              <div className="absolute bottom-16 right-16 bg-white p-2 rounded-lg shadow-lg">
                <Landmark className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </Card>

          {/* Nearby Places */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Nearby Places</h2>
            
            <Tabs defaultValue="hotels" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="hotels">
                  <Hotel className="w-4 h-4 mr-2" />
                  Hotels
                </TabsTrigger>
                <TabsTrigger value="restaurants">
                  <Utensils className="w-4 h-4 mr-2" />
                  Restaurants
                </TabsTrigger>
                <TabsTrigger value="attractions">
                  <Landmark className="w-4 h-4 mr-2" />
                  Attractions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="hotels" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {nearbyPlaces.hotels.map((place) => (
                    <Card key={place.id} className="p-4 hover:shadow-lg transition-shadow">
                      <h3 className="font-bold mb-2">{place.name}</h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>📍 {place.distance}</span>
                        <span>⭐ {place.rating}</span>
                      </div>
                      <Button className="w-full mt-3" size="sm">
                        View Details
                      </Button>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="restaurants" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {nearbyPlaces.restaurants.map((place) => (
                    <Card key={place.id} className="p-4 hover:shadow-lg transition-shadow">
                      <h3 className="font-bold mb-2">{place.name}</h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>📍 {place.distance}</span>
                        <span>⭐ {place.rating}</span>
                      </div>
                      <Button className="w-full mt-3" size="sm">
                        View Menu
                      </Button>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="attractions" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {nearbyPlaces.attractions.map((place) => (
                    <Card key={place.id} className="p-4 hover:shadow-lg transition-shadow">
                      <h3 className="font-bold mb-2">{place.name}</h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>📍 {place.distance}</span>
                        <span>⭐ {place.rating}</span>
                      </div>
                      <Button className="w-full mt-3" size="sm">
                        Get Directions
                      </Button>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Features Info */}
          <Card className="p-6 bg-gradient-to-r from-primary/10 to-purple-500/10">
            <h3 className="text-xl font-bold mb-4">Map Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-semibold mb-1">🗺️ Real-time Navigation</p>
                <p className="text-muted-foreground">Get directions to any destination</p>
              </div>
              <div>
                <p className="font-semibold mb-1">📍 Live Location Tracking</p>
                <p className="text-muted-foreground">Track your current position</p>
              </div>
              <div>
                <p className="font-semibold mb-1">🎯 Route Optimization</p>
                <p className="text-muted-foreground">Find the fastest route</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
