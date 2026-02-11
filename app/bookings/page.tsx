"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plane, Calendar, MapPin, Hotel, Utensils, Clock, CheckCircle, XCircle, Download } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

export default function BookingsPage() {
  const [bookings] = useState([
    {
      id: 'TG1234567890',
      type: 'hotel',
      name: 'Grand Luxury Hotel',
      location: 'New York, USA',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop',
      status: 'confirmed',
      checkIn: '2024-03-15',
      checkOut: '2024-03-18',
      guests: 2,
      totalAmount: 750,
      bookingDate: '2024-02-10'
    },
    {
      id: 'TG1234567891',
      type: 'restaurant',
      name: 'La Bella Italia',
      location: 'New York, USA',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop',
      status: 'confirmed',
      reservationDate: '2024-03-10',
      reservationTime: '7:00 PM',
      partySize: 4,
      totalAmount: 200,
      bookingDate: '2024-02-12'
    },
    {
      id: 'TG1234567892',
      type: 'hotel',
      name: 'Beachside Resort',
      location: 'Miami, USA',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&h=200&fit=crop',
      status: 'completed',
      checkIn: '2024-01-20',
      checkOut: '2024-01-25',
      guests: 2,
      totalAmount: 1600,
      bookingDate: '2024-01-05'
    },
    {
      id: 'TG1234567893',
      type: 'restaurant',
      name: 'Sushi Master',
      location: 'New York, USA',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop',
      status: 'cancelled',
      reservationDate: '2024-02-20',
      reservationTime: '8:00 PM',
      partySize: 2,
      totalAmount: 150,
      bookingDate: '2024-02-08',
      cancelledDate: '2024-02-18'
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/10 text-green-700 border-green-500/20'
      case 'completed':
        return 'bg-blue-500/10 text-blue-700 border-blue-500/20'
      case 'cancelled':
        return 'bg-red-500/10 text-red-700 border-red-500/20'
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-500/20'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      case 'cancelled':
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const filteredBookings = {
    all: bookings,
    upcoming: bookings.filter(b => b.status === 'confirmed'),
    completed: bookings.filter(b => b.status === 'completed'),
    cancelled: bookings.filter(b => b.status === 'cancelled')
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Bookings</h1>
              <p className="text-muted-foreground">
                Manage and track all your reservations
              </p>
            </div>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Total Bookings</p>
              <p className="text-2xl font-bold">{bookings.length}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Upcoming</p>
              <p className="text-2xl font-bold text-green-600">
                {filteredBookings.upcoming.length}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Completed</p>
              <p className="text-2xl font-bold text-blue-600">
                {filteredBookings.completed.length}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
              <p className="text-2xl font-bold text-primary">
                ${bookings.reduce((sum, b) => sum + b.totalAmount, 0)}
              </p>
            </Card>
          </div>

          {/* Bookings List */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">
                All ({filteredBookings.all.length})
              </TabsTrigger>
              <TabsTrigger value="upcoming">
                Upcoming ({filteredBookings.upcoming.length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({filteredBookings.completed.length})
              </TabsTrigger>
              <TabsTrigger value="cancelled">
                Cancelled ({filteredBookings.cancelled.length})
              </TabsTrigger>
            </TabsList>

            {Object.entries(filteredBookings).map(([key, bookingList]) => (
              <TabsContent key={key} value={key} className="mt-6 space-y-4">
                {bookingList.length === 0 ? (
                  <Card className="p-12 text-center">
                    <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">No bookings found</h3>
                    <p className="text-muted-foreground mb-4">
                      You don't have any {key === 'all' ? '' : key} bookings yet
                    </p>
                    <Link href="/hotels">
                      <Button>Explore Hotels & Restaurants</Button>
                    </Link>
                  </Card>
                ) : (
                  bookingList.map((booking) => (
                    <Card key={booking.id} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Image */}
                        <img
                          src={booking.image}
                          alt={booking.name}
                          className="w-full md:w-48 h-32 object-cover rounded-lg"
                        />

                        {/* Details */}
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                {booking.type === 'hotel' ? (
                                  <Hotel className="w-5 h-5 text-blue-500" />
                                ) : (
                                  <Utensils className="w-5 h-5 text-orange-500" />
                                )}
                                <h3 className="text-xl font-bold">{booking.name}</h3>
                              </div>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {booking.location}
                              </p>
                            </div>
                            <Badge className={getStatusColor(booking.status)}>
                              {getStatusIcon(booking.status)}
                              <span className="ml-1 capitalize">{booking.status}</span>
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground mb-1">Booking ID</p>
                              <p className="font-medium">{booking.id}</p>
                            </div>
                            {booking.type === 'hotel' ? (
                              <>
                                <div>
                                  <p className="text-muted-foreground mb-1">Check-in</p>
                                  <p className="font-medium">{booking.checkIn}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground mb-1">Check-out</p>
                                  <p className="font-medium">{booking.checkOut}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground mb-1">Guests</p>
                                  <p className="font-medium">{booking.guests}</p>
                                </div>
                              </>
                            ) : (
                              <>
                                <div>
                                  <p className="text-muted-foreground mb-1">Date</p>
                                  <p className="font-medium">{booking.reservationDate}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground mb-1">Time</p>
                                  <p className="font-medium">{booking.reservationTime}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground mb-1">Party Size</p>
                                  <p className="font-medium">{booking.partySize}</p>
                                </div>
                              </>
                            )}
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t">
                            <div>
                              <p className="text-sm text-muted-foreground">Total Amount</p>
                              <p className="text-2xl font-bold text-primary">
                                ${booking.totalAmount}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Invoice
                              </Button>
                              {booking.status === 'confirmed' && (
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              )}
                              {booking.status === 'confirmed' && (
                                <Button variant="destructive" size="sm">
                                  Cancel
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
