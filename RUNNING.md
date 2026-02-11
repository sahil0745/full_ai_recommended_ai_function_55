# 🚀 Quick Start Guide - Running TravelGenie

## Current Status: ✅ RUNNING

Both servers are currently operational!

---

## 🌐 Live URLs

### Frontend (Next.js)
- **URL**: http://localhost:3000
- **Status**: ✅ Running

### Backend (Express API)
- **URL**: http://localhost:3001
- **Health Check**: http://localhost:3001/health
- **Status**: ✅ Running

---

## 📱 Available Pages

Visit these URLs in your browser:

1. **Landing Page**: http://localhost:3000
   - Beautiful hero section
   - Feature showcase
   - Call-to-actions

2. **Hotels**: http://localhost:3000/hotels
   - Browse 6+ hotels
   - Search and filters
   - Book now functionality

3. **Restaurants**: http://localhost:3000/restaurants
   - Restaurant listings
   - Cuisine filters
   - Reservations

4. **AI Trip Planner**: http://localhost:3000/plan-trip
   - Smart itinerary generator
   - Budget calculator
   - Group size optimizer

5. **Dashboard**: http://localhost:3000/dashboard
   - User statistics
   - Quick actions
   - Recent activity

6. **Explore**: http://localhost:3000/explore
   - Map integration (ready)
   - Nearby places
   - Location detection

7. **Bookings**: http://localhost:3000/bookings
   - Booking management
   - History tracking
   - Cancellations

8. **Login**: http://localhost:3000/login
   - User authentication
   - Google OAuth ready

9. **Sign Up**: http://localhost:3000/signup
   - New user registration
   - Form validation

---

## 🛠️ How to Start/Stop

### Starting the Servers

**Terminal 1 - Frontend:**
```bash
cd /home/runner/work/full_ai_recommended_ai_function_55/full_ai_recommended_ai_function_55
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd /home/runner/work/full_ai_recommended_ai_function_55/full_ai_recommended_ai_function_55
npm run server
```

### Stopping the Servers

Press `Ctrl + C` in each terminal window

---

## 🔍 Testing the Application

### Frontend Tests
1. Open http://localhost:3000 in your browser
2. Navigate through different pages
3. Test responsive design (resize browser)
4. Try search and filter functionality
5. Click on various buttons and links

### Backend Tests
```bash
# Health check
curl http://localhost:3001/health

# Test API endpoints (requires authentication)
curl http://localhost:3001/api/hotels
curl http://localhost:3001/api/restaurants
```

---

## 📊 Server Logs

### Frontend Log Location
Console output in Terminal 1 where you ran `npm run dev`

### Backend Log Location
Console output in Terminal 2 where you ran `npm run server`

---

## ⚙️ Configuration

### Environment Variables (.env)
Already configured with demo credentials:
- MongoDB: localhost:27017
- JWT Secret: Development key
- OpenAI: Demo key
- Stripe: Demo key

**Note**: Replace with real API keys for production use.

---

## 🎨 Features Currently Working

✅ Landing page with animations
✅ Hotels listing with search/filters
✅ Restaurants listing
✅ AI Trip Planner wizard
✅ Navigation between pages
✅ Responsive design
✅ Dark theme
✅ Backend API endpoints
✅ Health monitoring

---

## 🔧 Troubleshooting

### Frontend Won't Start
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run dev
```

### Backend Won't Start
```bash
# Check .env file exists
ls -la .env

# Verify port 3001 is free
lsof -i :3001
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

---

## 📚 Additional Resources

- **README.md**: Complete project documentation
- **API_DOCS.md**: Full API reference
- **DEPLOYMENT.md**: Production deployment guide
- **CONTRIBUTING.md**: Development guidelines

---

## 🎉 Success!

Your TravelGenie application is now running!

- Frontend: http://localhost:3000
- Backend: http://localhost:3001/health

Enjoy exploring the AI-powered travel platform! 🌍✈️
