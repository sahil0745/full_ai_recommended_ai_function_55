const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    address: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  images: [{
    url: String,
    alt: String
  }],
  cuisine: [{
    type: String
  }],
  menu: [{
    category: String,
    items: [{
      name: String,
      description: String,
      price: Number,
      image: String,
      dietary: [String], // vegetarian, vegan, gluten-free, etc.
      popular: Boolean
    }]
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  pricing: {
    priceRange: {
      type: String,
      enum: ['$', '$$', '$$$', '$$$$']
    },
    averageCost: Number,
    currency: {
      type: String,
      default: 'USD'
    }
  },
  hours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  reservations: {
    available: Boolean,
    maxPartySize: Number,
    advanceBookingDays: Number
  },
  amenities: [{
    type: String
  }],
  contact: {
    phone: String,
    email: String,
    website: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  verified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

restaurantSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

restaurantSchema.index({ 'location.coordinates': '2dsphere' });

module.exports = mongoose.model('Restaurant', restaurantSchema);
