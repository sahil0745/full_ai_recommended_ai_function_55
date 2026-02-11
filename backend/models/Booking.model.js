const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookingType: {
    type: String,
    enum: ['hotel', 'restaurant', 'cab', 'package'],
    required: true
  },
  // Hotel Booking Details
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel'
  },
  room: {
    type: String
  },
  checkIn: Date,
  checkOut: Date,
  guests: Number,
  
  // Restaurant Booking Details
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
  reservationDate: Date,
  reservationTime: String,
  partySize: Number,
  
  // Cab Booking Details
  cab: {
    pickupLocation: {
      address: String,
      coordinates: {
        lat: Number,
        lng: Number
      }
    },
    dropLocation: {
      address: String,
      coordinates: {
        lat: Number,
        lng: Number
      }
    },
    distance: Number,
    duration: String,
    vehicleType: String,
    scheduledTime: Date
  },
  
  // Package Details (for complete trip packages)
  package: {
    name: String,
    description: String,
    items: [{
      type: String, // hotel, restaurant, attraction, cab
      itemId: mongoose.Schema.Types.ObjectId,
      details: mongoose.Schema.Types.Mixed
    }],
    startDate: Date,
    endDate: Date
  },
  
  // Payment Details
  payment: {
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    method: String,
    transactionId: String,
    paidAt: Date
  },
  
  // Booking Status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  
  // Contact Information
  contactInfo: {
    name: String,
    email: String,
    phone: String
  },
  
  // Special Requests
  specialRequests: String,
  
  // Booking Reference
  bookingReference: {
    type: String,
    unique: true
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  
  // Cancellation
  cancellation: {
    cancelled: {
      type: Boolean,
      default: false
    },
    cancelledAt: Date,
    reason: String,
    refundAmount: Number
  }
});

// Generate unique booking reference
bookingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  if (!this.bookingReference) {
    this.bookingReference = 'TG' + Date.now() + Math.random().toString(36).slice(2, 11).toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
