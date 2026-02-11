require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Hotel = require('./models/Hotel.model');
const Restaurant = require('./models/Restaurant.model');
const User = require('./models/User.model');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/travelgenie';

// Sample Users
const users = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user'
  },
  {
    name: 'Admin User',
    email: 'admin@travelgenie.com',
    password: 'admin123',
    role: 'admin'
  }
];

// Sample Hotels
const hotels = [
  {
    name: 'Grand Luxury Hotel',
    description: 'Experience luxury at its finest with stunning views, world-class amenities, and exceptional service in the heart of downtown.',
    location: {
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zipCode: '10001',
      coordinates: {
        lat: 40.7589,
        lng: -73.9851
      }
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
        alt: 'Hotel exterior'
      }
    ],
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Room Service', 'Parking'],
    rooms: [
      {
        type: 'Standard Room',
        description: 'Comfortable room with queen bed',
        capacity: 2,
        price: 250,
        available: true,
        amenities: ['WiFi', 'TV', 'Mini Bar']
      },
      {
        type: 'Deluxe Suite',
        description: 'Spacious suite with king bed and city view',
        capacity: 3,
        price: 450,
        available: true,
        amenities: ['WiFi', 'TV', 'Mini Bar', 'Balcony', 'Coffee Maker']
      }
    ],
    rating: {
      average: 4.8,
      count: 328
    },
    pricing: {
      minPrice: 250,
      maxPrice: 450,
      currency: 'USD'
    },
    availability: {
      checkIn: '14:00',
      checkOut: '11:00'
    },
    policies: {
      cancellation: 'Free cancellation up to 24 hours before check-in',
      checkIn: '2:00 PM - 12:00 AM',
      pets: true,
      smoking: false
    },
    contact: {
      phone: '+1-212-555-0123',
      email: 'info@grandluxury.com',
      website: 'https://grandluxury.com'
    },
    featured: true,
    verified: true
  },
  {
    name: 'Beachside Resort',
    description: 'Tropical paradise with direct beach access, infinity pool, and breathtaking ocean views. Perfect for a relaxing getaway.',
    location: {
      address: '456 Beach Boulevard',
      city: 'Miami',
      state: 'FL',
      country: 'USA',
      zipCode: '33139',
      coordinates: {
        lat: 25.7907,
        lng: -80.1300
      }
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
        alt: 'Beach resort'
      }
    ],
    amenities: ['Beach Access', 'WiFi', 'Pool', 'Bar', 'Restaurant', 'Water Sports', 'Spa'],
    rooms: [
      {
        type: 'Ocean View Room',
        description: 'Beautiful room with ocean view',
        capacity: 2,
        price: 320,
        available: true,
        amenities: ['WiFi', 'TV', 'Balcony', 'Mini Fridge']
      }
    ],
    rating: {
      average: 4.9,
      count: 512
    },
    pricing: {
      minPrice: 320,
      maxPrice: 600,
      currency: 'USD'
    },
    featured: true,
    verified: true
  }
];

// Sample Restaurants
const restaurants = [
  {
    name: 'La Bella Italia',
    description: 'Authentic Italian cuisine in an elegant setting. Fresh pasta made daily, extensive wine selection.',
    location: {
      address: '789 Culinary Avenue',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zipCode: '10002',
      coordinates: {
        lat: 40.7282,
        lng: -73.9942
      }
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
        alt: 'Restaurant interior'
      }
    ],
    cuisine: ['Italian', 'Mediterranean'],
    menu: [
      {
        category: 'Appetizers',
        items: [
          {
            name: 'Bruschetta',
            description: 'Toasted bread with tomatoes and basil',
            price: 12,
            dietary: ['vegetarian'],
            popular: true
          }
        ]
      },
      {
        category: 'Main Course',
        items: [
          {
            name: 'Spaghetti Carbonara',
            description: 'Classic Roman pasta with eggs and pancetta',
            price: 24,
            dietary: [],
            popular: true
          },
          {
            name: 'Margherita Pizza',
            description: 'Traditional pizza with tomato, mozzarella, and basil',
            price: 18,
            dietary: ['vegetarian'],
            popular: true
          }
        ]
      }
    ],
    rating: {
      average: 4.8,
      count: 425
    },
    pricing: {
      priceRange: '$$$',
      averageCost: 50,
      currency: 'USD'
    },
    hours: {
      monday: { open: '11:00', close: '22:00' },
      tuesday: { open: '11:00', close: '22:00' },
      wednesday: { open: '11:00', close: '22:00' },
      thursday: { open: '11:00', close: '22:00' },
      friday: { open: '11:00', close: '23:00' },
      saturday: { open: '11:00', close: '23:00' },
      sunday: { open: '12:00', close: '21:00' }
    },
    reservations: {
      available: true,
      maxPartySize: 12,
      advanceBookingDays: 30
    },
    amenities: ['WiFi', 'Outdoor Seating', 'Bar', 'Private Dining'],
    contact: {
      phone: '+1-212-555-0456',
      email: 'reservations@labellaitalia.com',
      website: 'https://labellaitalia.com'
    },
    featured: true,
    verified: true
  },
  {
    name: 'Sushi Master',
    description: 'Premium Japanese sushi restaurant with master chefs and the freshest fish. Omakase available.',
    location: {
      address: '321 Asia Street',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zipCode: '10003',
      coordinates: {
        lat: 40.7312,
        lng: -73.9885
      }
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351',
        alt: 'Sushi platter'
      }
    ],
    cuisine: ['Japanese', 'Sushi'],
    rating: {
      average: 4.9,
      count: 612
    },
    pricing: {
      priceRange: '$$$$',
      averageCost: 80,
      currency: 'USD'
    },
    reservations: {
      available: true,
      maxPartySize: 8,
      advanceBookingDays: 14
    },
    featured: true,
    verified: true
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Hotel.deleteMany({});
    await Restaurant.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Hash passwords for users
    for (let user of users) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    // Insert sample data
    const createdUsers = await User.insertMany(users);
    console.log(`✅ Created ${createdUsers.length} users`);

    const createdHotels = await Hotel.insertMany(hotels);
    console.log(`✅ Created ${createdHotels.length} hotels`);

    const createdRestaurants = await Restaurant.insertMany(restaurants);
    console.log(`✅ Created ${createdRestaurants.length} restaurants`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Sample Credentials:');
    console.log('User: john@example.com / password123');
    console.log('Admin: admin@travelgenie.com / admin123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeder
seedDatabase();
