# 📚 TravelGenie API Documentation

Complete API reference for the TravelGenie backend.

**Base URL (Development)**: `http://localhost:3001`  
**Base URL (Production)**: `https://your-backend-url.app`

---

## Table of Contents

- [Authentication](#authentication)
- [Users](#users)
- [Hotels](#hotels)
- [Restaurants](#restaurants)
- [Bookings](#bookings)
- [Reviews](#reviews)
- [AI Features](#ai-features)
- [Payments](#payments)
- [Admin](#admin)
- [Error Handling](#error-handling)

---

## Authentication

### Register User

**POST** `/api/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

### Login User

**POST** `/api/auth/login`

Authenticate existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "photoURL": ""
  }
}
```

---

### Google OAuth

**POST** `/api/auth/google`

Authenticate with Google account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "googleId": "google_user_id_123",
  "photoURL": "https://..."
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Google login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

---

## Users

All user endpoints require authentication. Include token in header:
```
Authorization: Bearer <token>
```

### Get User Profile

**GET** `/api/users/profile`

Get authenticated user's profile.

**Response:** `200 OK`
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "user",
    "wishlist": [],
    "bookings": [],
    "savedTrips": [],
    "preferences": {
      "language": "en",
      "currency": "USD",
      "theme": "system"
    }
  }
}
```

---

### Update User Profile

**PUT** `/api/users/profile`

Update user profile information.

**Request Body:**
```json
{
  "name": "John Smith",
  "phone": "+1234567890",
  "preferences": {
    "language": "en",
    "currency": "EUR",
    "theme": "dark"
  }
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": { ... }
}
```

---

### Add to Wishlist

**POST** `/api/users/wishlist`

Add item to user's wishlist.

**Request Body:**
```json
{
  "itemId": "507f1f77bcf86cd799439011",
  "type": "Hotel"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Added to wishlist"
}
```

---

### Remove from Wishlist

**DELETE** `/api/users/wishlist/:itemId`

Remove item from wishlist.

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Removed from wishlist"
}
```

---

## Hotels

### Get All Hotels

**GET** `/api/hotels`

Get list of hotels with optional filters.

**Query Parameters:**
- `city` (string): Filter by city name
- `minPrice` (number): Minimum price per night
- `maxPrice` (number): Maximum price per night
- `rating` (number): Minimum rating (1-5)
- `page` (number): Page number (default: 1)
- `limit` (number): Results per page (default: 10, max: 100)

**Example:**
```
GET /api/hotels?city=Paris&minPrice=100&maxPrice=500&rating=4&page=1&limit=10
```

**Response:** `200 OK`
```json
{
  "success": true,
  "hotels": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Grand Hotel",
      "description": "Luxury hotel...",
      "location": {
        "address": "123 Main St",
        "city": "Paris",
        "country": "France",
        "coordinates": { "lat": 48.8566, "lng": 2.3522 }
      },
      "images": [
        { "url": "https://...", "alt": "Hotel exterior" }
      ],
      "amenities": ["WiFi", "Pool", "Spa"],
      "rating": { "average": 4.8, "count": 328 },
      "pricing": {
        "minPrice": 250,
        "maxPrice": 450,
        "currency": "USD"
      },
      "featured": true,
      "verified": true
    }
  ],
  "totalPages": 5,
  "currentPage": 1,
  "total": 42
}
```

---

### Get Nearby Hotels

**GET** `/api/hotels/nearby`

Get hotels near a specific location.

**Query Parameters:**
- `lat` (number, required): Latitude
- `lng` (number, required): Longitude
- `maxDistance` (number): Maximum distance in meters (default: 10000)

**Example:**
```
GET /api/hotels/nearby?lat=40.7128&lng=-74.0060&maxDistance=5000
```

**Response:** `200 OK`
```json
{
  "success": true,
  "hotels": [ ... ]
}
```

---

### Get Single Hotel

**GET** `/api/hotels/:id`

Get detailed information about a specific hotel.

**Response:** `200 OK`
```json
{
  "success": true,
  "hotel": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Grand Hotel",
    "description": "...",
    "location": { ... },
    "images": [ ... ],
    "amenities": [ ... ],
    "rooms": [
      {
        "type": "Standard Room",
        "description": "...",
        "capacity": 2,
        "price": 250,
        "available": true,
        "amenities": ["WiFi", "TV"]
      }
    ],
    "rating": { "average": 4.8, "count": 328 },
    "reviews": [ ... ],
    "policies": {
      "cancellation": "Free cancellation...",
      "checkIn": "2:00 PM - 12:00 AM",
      "pets": true,
      "smoking": false
    },
    "contact": {
      "phone": "+1-212-555-0123",
      "email": "info@grandhotel.com",
      "website": "https://..."
    }
  }
}
```

---

## Restaurants

### Get All Restaurants

**GET** `/api/restaurants`

Get list of restaurants with optional filters.

**Query Parameters:**
- `city` (string): Filter by city
- `cuisine` (string): Filter by cuisine type
- `priceRange` (string): $, $$, $$$, $$$$
- `rating` (number): Minimum rating
- `page` (number): Page number
- `limit` (number): Results per page

**Example:**
```
GET /api/restaurants?city=Paris&cuisine=Italian&priceRange=$$$&rating=4
```

**Response:** `200 OK`
```json
{
  "success": true,
  "restaurants": [ ... ],
  "totalPages": 3,
  "currentPage": 1,
  "total": 28
}
```

---

### Get Nearby Restaurants

**GET** `/api/restaurants/nearby`

Get restaurants near a location.

**Query Parameters:**
- `lat` (number, required): Latitude
- `lng` (number, required): Longitude
- `maxDistance` (number): Maximum distance in meters (default: 5000)

---

### Get Single Restaurant

**GET** `/api/restaurants/:id`

Get detailed restaurant information including menu.

---

## Bookings

All booking endpoints require authentication.

### Create Booking

**POST** `/api/bookings`

Create a new booking.

**Request Body (Hotel):**
```json
{
  "bookingType": "hotel",
  "hotel": "507f1f77bcf86cd799439011",
  "room": "Standard Room",
  "checkIn": "2024-03-15",
  "checkOut": "2024-03-18",
  "guests": 2,
  "payment": {
    "amount": 750,
    "currency": "USD"
  },
  "contactInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  },
  "specialRequests": "Late check-in"
}
```

**Request Body (Restaurant):**
```json
{
  "bookingType": "restaurant",
  "restaurant": "507f1f77bcf86cd799439012",
  "reservationDate": "2024-03-10",
  "reservationTime": "19:00",
  "partySize": 4,
  "payment": {
    "amount": 0,
    "currency": "USD"
  },
  "contactInfo": { ... }
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Booking created successfully",
  "booking": {
    "_id": "...",
    "bookingReference": "TG1234567890",
    "bookingType": "hotel",
    "status": "pending",
    ...
  }
}
```

---

### Get User Bookings

**GET** `/api/bookings`

Get all bookings for authenticated user.

**Response:** `200 OK`
```json
{
  "success": true,
  "bookings": [ ... ]
}
```

---

### Get Single Booking

**GET** `/api/bookings/:id`

Get details of a specific booking.

---

### Cancel Booking

**PUT** `/api/bookings/:id/cancel`

Cancel a booking.

**Request Body:**
```json
{
  "reason": "Change of plans"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Booking cancelled successfully",
  "booking": { ... }
}
```

---

## Reviews

### Create Review

**POST** `/api/reviews`

Create a review for hotel or restaurant.

**Request Body:**
```json
{
  "reviewType": "hotel",
  "itemId": "507f1f77bcf86cd799439011",
  "rating": 5,
  "title": "Amazing stay!",
  "comment": "The hotel was excellent. Great service and amenities.",
  "images": [
    { "url": "https://...", "alt": "Room view" }
  ]
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Review created successfully",
  "review": { ... }
}
```

---

### Get Reviews

**GET** `/api/reviews/:type/:itemId`

Get all reviews for a specific item.

**Parameters:**
- `type`: "hotel" or "restaurant"
- `itemId`: ID of the hotel or restaurant

**Example:**
```
GET /api/reviews/hotel/507f1f77bcf86cd799439011
```

---

## AI Features

### AI Trip Planner

**POST** `/api/ai/trip-planner`

Generate AI-powered trip itinerary.

**Request Body:**
```json
{
  "destination": "Paris",
  "days": 5,
  "budget": 2000,
  "interests": ["Culture", "Food", "History"],
  "groupSize": 2
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "itinerary": "Day 1: Arrival in Paris...\n\nDay 2: Visit Eiffel Tower..."
}
```

---

### AI Chatbot

**POST** `/api/ai/chat`

Chat with AI travel assistant.

**Request Body:**
```json
{
  "message": "What are the best places to visit in Paris?",
  "history": [
    { "role": "user", "content": "I'm planning a trip" },
    { "role": "assistant", "content": "Great! Where would you like to go?" }
  ]
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "reply": "Paris has many amazing attractions! Here are the must-visit places..."
}
```

---

### AI Recommendations

**POST** `/api/ai/recommendations`

Get AI-powered recommendations.

**Request Body:**
```json
{
  "location": "Paris",
  "preferences": ["Museums", "Fine Dining", "Shopping"]
}
```

---

## Payments

### Create Payment Intent

**POST** `/api/payments/create-intent`

Create Stripe payment intent.

**Request Body:**
```json
{
  "amount": 750,
  "currency": "usd"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "clientSecret": "pi_xxx_secret_xxx"
}
```

---

### Confirm Payment

**POST** `/api/payments/confirm`

Confirm payment and update booking.

**Request Body:**
```json
{
  "paymentIntentId": "pi_xxx",
  "bookingId": "507f1f77bcf86cd799439011"
}
```

---

## Admin

All admin endpoints require authentication and admin role.

### Get Admin Stats

**GET** `/api/admin/stats`

Get dashboard statistics.

**Response:** `200 OK`
```json
{
  "success": true,
  "stats": {
    "totalHotels": 125,
    "totalRestaurants": 83,
    "totalBookings": 1456,
    "totalUsers": 3421,
    "totalRevenue": 245680
  }
}
```

---

### Create Hotel

**POST** `/api/admin/hotels`

Create new hotel (admin only).

---

### Update Hotel

**PUT** `/api/admin/hotels/:id`

Update hotel information.

---

### Delete Hotel

**DELETE** `/api/admin/hotels/:id`

Delete hotel.

---

### Manage Restaurants

Similar CRUD operations for restaurants:
- `POST /api/admin/restaurants`
- `PUT /api/admin/restaurants/:id`
- `DELETE /api/admin/restaurants/:id`

---

### Get All Bookings (Admin)

**GET** `/api/admin/bookings`

Get all bookings in the system.

---

### Get All Users (Admin)

**GET** `/api/admin/users`

Get all registered users.

---

## Error Handling

All endpoints return errors in the following format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### HTTP Status Codes

- `200 OK`: Success
- `201 Created`: Resource created
- `400 Bad Request`: Invalid input
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

---

## Rate Limiting

- Default: 100 requests per 15 minutes per IP
- Authentication endpoints: 5 requests per 15 minutes per IP
- Implement rate limiting in production

---

## Pagination

Endpoints that return lists support pagination:

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Results per page (default: 10, max: 100)

**Response includes:**
- `totalPages`: Total number of pages
- `currentPage`: Current page number
- `total`: Total number of results

---

## Testing

Use tools like Postman or cURL:

```bash
# Register
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'

# Get hotels (with auth token)
curl -X GET http://localhost:3001/api/hotels \
  -H "Authorization: Bearer <token>"
```

---

**Last Updated**: February 2024
