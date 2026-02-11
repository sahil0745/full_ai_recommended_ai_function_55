const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
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
  amenities: [{
    type: String
  }],
  rooms: [{
    type: {
      type: String,
      required: true
    },
    description: String,
    capacity: Number,
    price: Number,
    available: {
      type: Boolean,
      default: true
    },
    amenities: [String]
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
    minPrice: Number,
    maxPrice: Number,
    currency: {
      type: String,
      default: 'USD'
    }
  },
  availability: {
    checkIn: String, // e.g., "14:00"
    checkOut: String, // e.g., "11:00"
  },
  policies: {
    cancellation: String,
    checkIn: String,
    pets: Boolean,
    smoking: Boolean
  },
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

hotelSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

hotelSchema.index({ 'location.coordinates': '2dsphere' });

module.exports = mongoose.model('Hotel', hotelSchema);
