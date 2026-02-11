# How to Start the TravelGenie Servers

## Quick Start (Recommended)

### Method 1: Start Both Servers Together

```bash
# Open two terminal windows

# Terminal 1 - Backend Server
cd /home/runner/work/full_ai_recommended_ai_function_55/full_ai_recommended_ai_function_55
node backend/server.js

# Terminal 2 - Frontend Server
cd /home/runner/work/full_ai_recommended_ai_function_55/full_ai_recommended_ai_function_55
npm run dev
```

### Method 2: Start in Background (Detached Mode)

This method keeps servers running even after closing the terminal:

```bash
cd /home/runner/work/full_ai_recommended_ai_function_55/full_ai_recommended_ai_function_55

# Start backend in background
node backend/server.js > /tmp/backend.log 2>&1 &
echo "Backend started with PID: $!"

# Wait a moment for backend to initialize
sleep 2

# Start frontend in background
npm run dev > /tmp/frontend.log 2>&1 &
echo "Frontend started with PID: $!"

# Wait for frontend to be ready
sleep 8

# Check status
curl http://localhost:3001/health
curl -s http://localhost:3000 | grep "<title>"
```

---

## Prerequisites

Before starting servers, ensure:

1. **Dependencies are installed:**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Environment file exists:**
   ```bash
   # Check if .env file exists
   ls -la .env
   
   # If missing, create it with required variables (see .env.example)
   ```

3. **Ports are available:**
   ```bash
   # Check if ports 3000 and 3001 are free
   lsof -i :3000
   lsof -i :3001
   
   # If ports are in use, stop those processes first
   ```

---

## Verify Servers are Running

### Check Server Status

```bash
# Check processes
ps aux | grep -E "node backend/server|next-server" | grep -v grep

# Check ports
netstat -tuln | grep -E ":3000|:3001"

# Or use lsof
lsof -i :3000 -i :3001
```

### Test Server Responses

```bash
# Test backend health check
curl http://localhost:3001/health
# Expected: {"status":"ok","message":"TravelGenie API is running","timestamp":"..."}

# Test frontend
curl -s http://localhost:3000 | grep "<title>"
# Expected: <title>TravelGenie - AI-Powered Travel Platform</title>

# Open in browser
# Frontend: http://localhost:3000
# Backend API: http://localhost:3001
```

---

## View Server Logs

### If Running in Foreground
Logs will appear directly in the terminal.

### If Running in Background
```bash
# View backend logs
tail -f /tmp/backend.log

# View frontend logs
tail -f /tmp/frontend.log

# View last 50 lines
tail -50 /tmp/backend.log
tail -50 /tmp/frontend.log
```

---

## Stop Servers

### If Running in Foreground
Press `Ctrl+C` in the terminal window.

### If Running in Background

```bash
# Find process IDs
ps aux | grep -E "node backend/server|next-server" | grep -v grep

# Stop backend
pkill -f "node backend/server"

# Stop frontend
pkill -f "next-server"

# Or stop by PID
kill <PID>
```

---

## Troubleshooting

### Issue: "ERR_CONNECTION_REFUSED"
**Solution:** Servers are not running. Start them using the methods above.

### Issue: "Port 3000 or 3001 already in use"
**Solution:** Stop existing processes:
```bash
# Find what's using the port
lsof -i :3000
lsof -i :3001

# Kill the process
kill <PID>
```

### Issue: "Cannot find module"
**Solution:** Install dependencies:
```bash
npm install --legacy-peer-deps
```

### Issue: ".env file not found" or backend crashes
**Solution:** Create .env file with required variables:
```bash
cp .env.example .env
# Edit .env with your actual API keys
```

### Issue: Backend warnings about MongoDB
**Solution:** These are just deprecation warnings and can be ignored. The server still works.

---

## Server URLs

After starting successfully:

- **Frontend (Main Site):** http://localhost:3000
- **Backend API:** http://localhost:3001
- **Backend Health Check:** http://localhost:3001/health

---

## Environment Variables Required

Ensure your `.env` file contains:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/travelgenie

# JWT
JWT_SECRET=your-secret-key-change-this-in-production-min-32-chars
JWT_EXPIRE=7d

# API Keys
OPENAI_API_KEY=your-openai-api-key
STRIPE_SECRET_KEY=your-stripe-secret-key
GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# Server Config
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:3001
```

For development/testing, you can use demo keys (as shown in .env.example).

---

## Quick Reference Commands

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start backend (foreground)
node backend/server.js

# Start frontend (foreground)
npm run dev

# Check if servers are running
ps aux | grep -E "node backend/server|next-server" | grep -v grep

# Check backend health
curl http://localhost:3001/health

# Check frontend
curl -s http://localhost:3000 | grep "<title>"

# Stop all Node processes (use with caution!)
pkill node
```

---

## Notes

- **Backend** runs on port **3001**
- **Frontend** runs on port **3000**
- Both servers must be running for the full application to work
- Backend provides the API; Frontend provides the user interface
- The servers communicate via API calls from frontend to backend

---

For more detailed information, see:
- `README.md` - Complete project documentation
- `RUNNING.md` - Detailed server management guide
- `SERVER_STATUS.md` - Current server status and troubleshooting
- `QUICK_START.md` - Quick start guide
