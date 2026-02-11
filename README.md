# 🌍 TravelGenie - AI-Powered Travel Platform

<div align="center">

![TravelGenie](https://img.shields.io/badge/TravelGenie-v1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.5.12-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green.svg)
![AI](https://img.shields.io/badge/AI-OpenAI-purple.svg)

**A complete production-ready, modern, full-stack AI-powered Tour & Travel web platform**

Plan, Book, and Explore with AI - Hotels, Restaurants, Cabs, and complete trip planning in one place.

[Features](#features) • [Quick Start](#quick-start) • [Tech Stack](#tech-stack) • [Troubleshooting](#troubleshooting) • [API Documentation](#api-documentation)

</div>

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation & Running

```bash
# Clone the repository
git clone <repository-url>
cd full_ai_recommended_ai_function_55

# Option 1: Use the startup script (Recommended)
./start.sh

# Option 2: Manual start
npm install --legacy-peer-deps
npm run dev     # Frontend (Port 3000)
npm run server  # Backend (Port 3001) - in another terminal
```

**Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

### ⚠️ Troubleshooting "ERR_CONNECTION_REFUSED"

If you see this error, the servers aren't running. Fix it:

```bash
# Quick fix
./start.sh

# Or check what's wrong
curl http://localhost:3000  # Check frontend
curl http://localhost:3001/health  # Check backend

# View detailed troubleshooting
cat RUNNING.md
```

---

## ✨ Features

### 🎯 Core Features

- **🏠 Landing Page**: Beautiful hero section with parallax scrolling, smooth animations, and CTA buttons
- **🔐 Authentication System**: JWT-based auth with Google OAuth, signup/login, password reset
- **🗺️ Smart Search**: Search hotels, restaurants, and attractions with advanced filters (price, rating, distance, etc.)
- **📍 Real-Time Map Integration**: GPS location detection, nearby places, markers, directions (ready for Google Maps API)
- **🏨 Hotels Module**: Comprehensive hotel listings, price comparison, availability calendar, booking system
- **🍽️ Restaurant Module**: Restaurant discovery, table reservations, menu preview, ratings & reviews
- **🚕 Transportation**: Cab booking, fare calculation, route preview, ETA (UI ready)
- **🤖 AI Trip Planner**: Generate personalized itineraries based on budget, days, interests, and group size
- **💬 AI Chatbot**: 24/7 floating assistant for travel queries and booking help
- **💳 Booking System**: One-click booking, booking history, cancellation, invoice generation
- **⭐ Reviews & Ratings**: User reviews with star ratings for hotels and restaurants
- **❤️ Wishlist**: Save favorite destinations and places
- **👤 User Dashboard**: View trips, bookings, statistics, and recent activity
- **📊 Admin Panel**: Manage hotels, restaurants, bookings, users, and analytics (backend ready)

### 🎨 UI/UX Features

- **Modern Design**: Glassmorphism, gradient backgrounds, smooth transitions
- **Animations**: Framer Motion + AOS for scroll animations
- **Responsive**: Mobile-first design, works on all devices
- **Dark/Light Mode**: Theme switching with system preference support
- **Loading States**: Smooth loading indicators and skeleton screens

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.1.6 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 4.x
- **UI Components**: Radix UI + Shadcn/UI
- **Animations**: Framer Motion, AOS
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + Firebase Auth
- **AI**: OpenAI API (GPT-3.5-turbo)
- **Payments**: Stripe
- **Maps**: Google Maps API / Mapbox (ready for integration)

### Additional Tools
- **Image API**: Unsplash API
- **Email**: SendGrid (ready for integration)
- **Weather**: Weather API (ready for integration)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sahil0745/full_ai_recommended_ai_function_55.git
   cd full_ai_recommended_ai_function_55
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Fill in your API keys and configuration:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/travelgenie
   
   # JWT
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=7d
   
   # Firebase (for authentication)
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   
   # OpenAI
   OPENAI_API_KEY=sk-your_openai_api_key_here
   
   # Google Maps
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   
   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   
   # Backend API URL
   NEXT_PUBLIC_API_URL=http://localhost:3001
   PORT=3001
   ```

4. **Run MongoDB**
   
   Make sure MongoDB is running locally or use MongoDB Atlas connection string

5. **Start the backend server**
   ```bash
   npm run server
   ```
   
   Backend will run on http://localhost:3001

6. **Start the frontend development server**
   ```bash
   npm run dev
   ```
   
   Frontend will run on http://localhost:3000

7. **Build for production**
   ```bash
   npm run build
   npm start
   ```

---

## 📁 Project Structure

```
├── app/                      # Next.js App Router
│   ├── page.tsx             # Landing page
│   ├── login/               # Login page
│   ├── signup/              # Signup page
│   ├── dashboard/           # User dashboard
│   ├── plan-trip/           # AI Trip Planner
│   ├── hotels/              # Hotels listing
│   ├── restaurants/         # Restaurants listing
│   ├── explore/             # Map & nearby places
│   ├── bookings/            # Bookings management
│   └── layout.tsx           # Root layout with chatbot
│
├── backend/                 # Express.js Backend
│   ├── server.js           # Main server file
│   ├── models/             # MongoDB schemas
│   │   ├── User.model.js
│   │   ├── Hotel.model.js
│   │   ├── Restaurant.model.js
│   │   ├── Booking.model.js
│   │   └── Review.model.js
│   ├── routes/             # API routes
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── hotel.routes.js
│   │   ├── restaurant.routes.js
│   │   ├── booking.routes.js
│   │   ├── review.routes.js
│   │   ├── ai.routes.js
│   │   ├── payment.routes.js
│   │   └── admin.routes.js
│   └── middleware/         # Auth middleware
│
├── components/              # React components
│   ├── ui/                 # Shadcn UI components
│   ├── ai-chatbot.tsx      # AI Chatbot
│   └── theme-provider.tsx  # Theme provider
│
├── lib/                     # Utility functions
├── public/                  # Static assets
├── styles/                  # Global styles
├── .env.example            # Environment variables template
├── package.json            # Dependencies
└── README.md               # This file
```

---

## 🔌 API Documentation

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Google OAuth
```http
POST /api/auth/google
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "googleId": "google_user_id",
  "photoURL": "https://..."
}
```

### Hotels

#### Get All Hotels
```http
GET /api/hotels?city=Paris&minPrice=100&maxPrice=500&rating=4&page=1&limit=10
```

#### Get Nearby Hotels
```http
GET /api/hotels/nearby?lat=40.7128&lng=-74.0060&maxDistance=5000
```

#### Get Single Hotel
```http
GET /api/hotels/:id
```

### Restaurants

#### Get All Restaurants
```http
GET /api/restaurants?city=Paris&cuisine=Italian&priceRange=$$$&rating=4
```

#### Get Nearby Restaurants
```http
GET /api/restaurants/nearby?lat=40.7128&lng=-74.0060&maxDistance=3000
```

### Bookings

#### Create Booking
```http
POST /api/bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "bookingType": "hotel",
  "hotel": "hotel_id",
  "checkIn": "2024-03-15",
  "checkOut": "2024-03-18",
  "guests": 2,
  "payment": {
    "amount": 750,
    "currency": "USD"
  }
}
```

#### Get User Bookings
```http
GET /api/bookings
Authorization: Bearer <token>
```

#### Cancel Booking
```http
PUT /api/bookings/:id/cancel
Authorization: Bearer <token>
Content-Type: application/json

{
  "reason": "Change of plans"
}
```

### AI Features

#### AI Trip Planner
```http
POST /api/ai/trip-planner
Authorization: Bearer <token>
Content-Type: application/json

{
  "destination": "Paris",
  "days": 5,
  "budget": 2000,
  "interests": ["Culture", "Food", "History"],
  "groupSize": 2
}
```

#### AI Chatbot
```http
POST /api/ai/chat
Content-Type: application/json

{
  "message": "What are the best places to visit in Paris?",
  "history": []
}
```

### Reviews

#### Create Review
```http
POST /api/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "reviewType": "hotel",
  "itemId": "hotel_id",
  "rating": 5,
  "title": "Amazing stay!",
  "comment": "The hotel was excellent..."
}
```

---

## 🎨 Screenshots

### Landing Page
Beautiful hero section with smooth animations and gradient backgrounds

### AI Trip Planner
Step-by-step wizard to create personalized travel itineraries

### Hotels & Restaurants
Comprehensive listings with search, filters, and beautiful cards

### AI Chatbot
Floating assistant available on all pages

### User Dashboard
Track bookings, trips, and statistics

---

## 🔐 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Secure payment processing with Stripe
- ✅ Input validation and sanitization
- ✅ CORS protection
- ✅ Environment variables for sensitive data
- ✅ HTTPS ready for production

---

## 🚦 Development

### Available Scripts

- `npm run dev` - Start development server (frontend only)
- `npm run build` - Build for production
- `npm start` - Start production server (frontend)
- `npm run server` - Start backend API server
- `npm run lint` - Run ESLint

### Backend Development

The backend runs independently on port 3001. Make sure MongoDB is running before starting the backend:

```bash
# Start MongoDB (if local)
mongod

# Start backend server
npm run server
```

---

## 🌐 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

### Backend (Railway/Render/DigitalOcean)

1. Create new Node.js project
2. Add environment variables
3. Set start command: `node backend/server.js`
4. Deploy

### Database (MongoDB Atlas)

1. Create MongoDB Atlas account
2. Create cluster
3. Get connection string
4. Update `MONGODB_URI` in environment variables

---

## 📝 TODO / Future Enhancements

- [ ] Complete Google Maps/Mapbox integration
- [ ] Add real-time cab booking with live tracking
- [ ] Implement weather API integration
- [ ] Add currency converter
- [ ] Multi-language support (i18n)
- [ ] PWA functionality with offline support
- [ ] Email notifications (SendGrid)
- [ ] Advanced admin analytics dashboard
- [ ] Social media sharing
- [ ] Trip collaboration features
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Sahil0745**

- GitHub: [@sahil0745](https://github.com/sahil0745)

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Shadcn for beautiful UI components
- OpenAI for AI capabilities
- All open-source contributors

---

<div align="center">

**Made with ❤️ for travelers around the world**

⭐ Star this repo if you find it helpful!

</div>
