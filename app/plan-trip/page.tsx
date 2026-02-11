"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plane, MapPin, DollarSign, Users, Calendar, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function PlanTripPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [itinerary, setItinerary] = useState<any>(null)
  const [formData, setFormData] = useState({
    destination: '',
    days: '3',
    budget: '',
    groupSize: '2',
    interests: [] as string[]
  })

  const interestOptions = [
    'Adventure', 'Culture', 'Food', 'Nature', 'Shopping', 
    'Nightlife', 'History', 'Beach', 'Mountains', 'Photography'
  ]

  const toggleInterest = (interest: string) => {
    if (formData.interests.includes(interest)) {
      setFormData({
        ...formData,
        interests: formData.interests.filter(i => i !== interest)
      })
    } else {
      setFormData({
        ...formData,
        interests: [...formData.interests, interest]
      })
    }
  }

  const handleGeneratePlan = async () => {
    setLoading(true)
    
    // TODO: Call AI API
    setTimeout(() => {
      setItinerary({
        days: [
          {
            day: 1,
            title: 'Arrival & City Tour',
            activities: [
              { time: '10:00 AM', activity: 'Arrive at destination', cost: 0 },
              { time: '12:00 PM', activity: 'Check-in at hotel', cost: 150 },
              { time: '2:00 PM', activity: 'Lunch at local restaurant', cost: 30 },
              { time: '4:00 PM', activity: 'City walking tour', cost: 25 },
              { time: '7:00 PM', activity: 'Dinner at waterfront', cost: 50 }
            ]
          },
          {
            day: 2,
            title: 'Adventure & Exploration',
            activities: [
              { time: '8:00 AM', activity: 'Breakfast at hotel', cost: 20 },
              { time: '10:00 AM', activity: 'Visit main attraction', cost: 40 },
              { time: '1:00 PM', activity: 'Lunch break', cost: 35 },
              { time: '3:00 PM', activity: 'Museum visit', cost: 15 },
              { time: '7:00 PM', activity: 'Dinner & nightlife', cost: 60 }
            ]
          }
        ],
        hotels: [
          {
            name: 'Grand Central Hotel',
            price: 150,
            rating: 4.5,
            location: 'Downtown'
          },
          {
            name: 'Beachside Resort',
            price: 200,
            rating: 4.8,
            location: 'Coastal Area'
          }
        ],
        estimatedCost: {
          accommodation: 450,
          food: 300,
          activities: 180,
          transport: 120,
          total: 1050
        }
      })
      setLoading(false)
      setStep(3)
    }, 2000)
  }

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
            <Link href="/dashboard">
              <Button variant="ghost">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        {step < 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <Sparkles className="inline-block w-10 h-10 text-primary mr-2" />
                AI Trip Planner
              </h1>
              <p className="text-xl text-muted-foreground">
                Let AI create your perfect itinerary
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-12">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      s === step
                        ? 'bg-primary text-primary-foreground'
                        : s < step
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {s}
                  </div>
                  {s < 2 && <ArrowRight className="w-6 h-6 text-muted-foreground" />}
                </div>
              ))}
            </div>

            <Card className="p-8">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <Label htmlFor="destination">Where do you want to go?</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="destination"
                        placeholder="e.g., Paris, Tokyo, New York"
                        className="pl-10"
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="days">Number of Days</Label>
                      <Select value={formData.days} onValueChange={(value) => setFormData({ ...formData, days: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 7, 10, 14].map((d) => (
                            <SelectItem key={d} value={d.toString()}>
                              {d} {d === 1 ? 'Day' : 'Days'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="groupSize">Group Size</Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="groupSize"
                          type="number"
                          min="1"
                          max="20"
                          className="pl-10"
                          value={formData.groupSize}
                          onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget (USD)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="budget"
                        type="number"
                        placeholder="e.g., 1000"
                        className="pl-10"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      />
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => setStep(2)}
                    disabled={!formData.destination || !formData.budget}
                  >
                    Continue <ArrowRight className="ml-2" />
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <Label>What are your interests?</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {interestOptions.map((interest) => (
                        <Button
                          key={interest}
                          type="button"
                          variant={formData.interests.includes(interest) ? 'default' : 'outline'}
                          className="w-full"
                          onClick={() => toggleInterest(interest)}
                        >
                          {interest}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" className="w-full" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button
                      className="w-full"
                      onClick={handleGeneratePlan}
                      disabled={formData.interests.length === 0 || loading}
                    >
                      {loading ? (
                        <>
                          <Sparkles className="mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          Generate Plan <Sparkles className="ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>
        )}

        {step === 3 && itinerary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-5xl mx-auto space-y-8"
          >
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Your Perfect Itinerary</h1>
              <p className="text-xl text-muted-foreground">
                {formData.days} days in {formData.destination}
              </p>
            </div>

            {/* Cost Summary */}
            <Card className="p-6 bg-gradient-to-r from-primary/10 to-purple-500/10">
              <h3 className="text-xl font-bold mb-4">Estimated Cost</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Accommodation</p>
                  <p className="text-xl font-bold">${itinerary.estimatedCost.accommodation}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Food</p>
                  <p className="text-xl font-bold">${itinerary.estimatedCost.food}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Activities</p>
                  <p className="text-xl font-bold">${itinerary.estimatedCost.activities}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Transport</p>
                  <p className="text-xl font-bold">${itinerary.estimatedCost.transport}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold text-primary">${itinerary.estimatedCost.total}</p>
                </div>
              </div>
            </Card>

            {/* Daily Itinerary */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Daily Plan</h2>
              {itinerary.days.map((day: any, index: number) => (
                <Card key={index} className="p-6">
                  <h3 className="text-xl font-bold mb-4">
                    Day {day.day}: {day.title}
                  </h3>
                  <div className="space-y-3">
                    {day.activities.map((activity: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-4 pb-3 border-b last:border-0">
                        <div className="text-sm font-medium text-primary min-w-[80px]">
                          {activity.time}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.activity}</p>
                        </div>
                        <div className="text-sm font-medium">${activity.cost}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            {/* Hotel Recommendations */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Recommended Hotels</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {itinerary.hotels.map((hotel: any, index: number) => (
                  <Card key={index} className="p-6">
                    <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
                    <p className="text-muted-foreground mb-4">{hotel.location}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-primary">${hotel.price}</p>
                        <p className="text-sm text-muted-foreground">per night</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">★ {hotel.rating}</p>
                        <p className="text-sm text-muted-foreground">rating</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1" onClick={() => {
                setStep(1)
                setItinerary(null)
              }}>
                Plan Another Trip
              </Button>
              <Button className="flex-1">
                Save Itinerary
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
