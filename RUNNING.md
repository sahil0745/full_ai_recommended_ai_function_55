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

### Quick Start (Recommended)

**Use the startup script:**
```bash
cd /home/runner/work/full_ai_recommended_ai_function_55/full_ai_recommended_ai_function_55
./start.sh
```

This will:
- Install dependencies if needed
- Create .env file if missing
- Start both frontend and backend servers
- Monitor server health

### Manual Start

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

**Quick Stop:**
```bash
pkill -f "next dev"
pkill -f "node backend/server.js"
```

**Or press `Ctrl + C` in each terminal window**

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

### "ERR_CONNECTION_REFUSED" Error

This means the servers are not running. Fix it:

```bash
# Check if servers are running
curl http://localhost:3000
curl http://localhost:3001/health

# If not, start them
./start.sh

# Or manually:
npm run dev &    # Frontend
npm run server & # Backend
```

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

# If missing, the start.sh script will create it
./start.sh

# Or manually recreate it from .env.example
cp .env.example .env
# Then edit .env with your values
```

### Port Already in Use
```bash
# Find processes using ports
lsof -i :3000
lsof -i :3001

# Kill specific processes
kill -9 <PID>

# Or kill all Node processes (use with caution)
pkill -f "next dev"
pkill -f "node backend/server.js"
```

### "Cannot GET /" or Blank Page

This usually means:
1. **Frontend not fully started** - Wait 10-15 seconds after starting
2. **Build cache issue** - Run `rm -rf .next` then restart
3. **Dependencies corrupted** - Run `rm -rf node_modules && npm install --legacy-peer-deps`

### Checking Server Status

```bash
# Quick check script
echo "Frontend:" && curl -s http://localhost:3000 > /dev/null && echo "✅ Running" || echo "❌ Stopped"
echo "Backend:" && curl -s http://localhost:3001/health && echo "✅ Running" || echo "❌ Stopped"

# View logs
tail -f /tmp/travelgenie-frontend.log
tail -f /tmp/travelgenie-backend.log
```

### MongoDB Connection Issues

The app works without MongoDB for development. If you see MongoDB warnings:
- They're just warnings, not errors
- The app will still function
- To fix: Install MongoDB locally or use MongoDB Atlas (see DEPLOYMENT.md)

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
