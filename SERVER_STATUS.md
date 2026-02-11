# Server Status and Management

## Current Status

**Last Updated**: 2026-02-11

### Servers Running ✅

1. **Frontend (Next.js)**
   - Status: ✅ RUNNING
   - Port: 3000
   - URL: http://localhost:3000
   - Process: `npm run dev` (PID: 3860)
   - Version: Next.js 15.5.12

2. **Backend (Express.js)**
   - Status: ✅ RUNNING
   - Port: 3001
   - URL: http://localhost:3001
   - Health Check: http://localhost:3001/health
   - Process: `node backend/server.js` (PID: 3843)

### Quick Health Check

```bash
# Check if servers are responding
curl http://localhost:3000         # Frontend
curl http://localhost:3001/health  # Backend
```

Expected Response:
```json
{"status":"ok","message":"TravelGenie API is running","timestamp":"..."}
```

---

## How Servers Were Started

### Backend (Detached Mode)
```bash
cd /home/runner/work/full_ai_recommended_ai_function_55/full_ai_recommended_ai_function_55
nohup node backend/server.js > /tmp/backend.log 2>&1 &
```

### Frontend (Detached Mode)
```bash
cd /home/runner/work/full_ai_recommended_ai_function_55/full_ai_recommended_ai_function_55
nohup npm run dev > /tmp/frontend.log 2>&1 &
```

### Why Detached Mode?
- Servers continue running even after terminal session ends
- Logs are saved to files for later inspection
- Suitable for development environments

---

## Log Files

- **Frontend Logs**: `/tmp/frontend.log`
- **Backend Logs**: `/tmp/backend.log`

### View Logs
```bash
tail -f /tmp/frontend.log    # Follow frontend logs
tail -f /tmp/backend.log     # Follow backend logs
```

---

## Stopping Servers

### Find Process IDs
```bash
ps aux | grep -E "node.*backend/server|npm.*dev|next-server" | grep -v grep
```

### Stop Individual Server
```bash
kill <PID>    # Replace <PID> with actual process ID
```

### Stop All Node Processes (Nuclear Option)
```bash
pkill -f "node backend/server"
pkill -f "npm run dev"
pkill -f "next-server"
```

---

## Restarting Servers

If servers stop or you need to restart:

### Quick Restart (Using start.sh)
```bash
./start.sh
```

### Manual Restart

1. **Stop existing servers** (if running)
   ```bash
   pkill -f "node backend/server"
   pkill -f "npm run dev"
   ```

2. **Start backend**
   ```bash
   cd /home/runner/work/full_ai_recommended_ai_function_55/full_ai_recommended_ai_function_55
   nohup node backend/server.js > /tmp/backend.log 2>&1 &
   ```

3. **Start frontend**
   ```bash
   cd /home/runner/work/full_ai_recommended_ai_function_55/full_ai_recommended_ai_function_55
   nohup npm run dev > /tmp/frontend.log 2>&1 &
   ```

4. **Verify**
   ```bash
   curl http://localhost:3001/health
   curl http://localhost:3000
   ```

---

## Troubleshooting

### Server Won't Start

1. **Check if port is already in use**
   ```bash
   lsof -i :3000   # Frontend
   lsof -i :3001   # Backend
   ```

2. **Kill processes using the port**
   ```bash
   kill -9 $(lsof -t -i:3000)
   kill -9 $(lsof -t -i:3001)
   ```

3. **Check if .env file exists**
   ```bash
   ls -la .env
   ```
   If missing, create it from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. **Check if node_modules exists**
   ```bash
   ls -d node_modules
   ```
   If missing, install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

### Server Running But Site Not Accessible

1. **Check server logs**
   ```bash
   tail -50 /tmp/frontend.log
   tail -50 /tmp/backend.log
   ```

2. **Check for errors**
   ```bash
   grep -i error /tmp/frontend.log
   grep -i error /tmp/backend.log
   ```

3. **Verify environment variables**
   ```bash
   cat .env
   ```

### ERR_CONNECTION_REFUSED Error

This means the server is not running. Follow these steps:

1. **Check if servers are running**
   ```bash
   ps aux | grep -E "node|npm" | grep -v grep
   ```

2. **If no servers running, start them**
   ```bash
   ./start.sh
   ```
   or follow "Manual Restart" steps above

3. **Wait 15-20 seconds for servers to fully start**

4. **Verify servers are accessible**
   ```bash
   curl http://localhost:3000
   curl http://localhost:3001/health
   ```

---

## Environment Variables

Required in `.env` file:

```
MONGODB_URI=mongodb://localhost:27017/travelgenie
JWT_SECRET=your-super-secret-jwt-key-change-in-production-12345
JWT_EXPIRES_IN=7d
OPENAI_API_KEY=sk-demo-key-for-development-only
STRIPE_SECRET_KEY=sk_test_demo_key_for_development
GOOGLE_MAPS_API_KEY=demo-google-maps-api-key
PORT=3001
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=demo-google-maps-api-key
```

---

## Quick Reference

### Status Check
```bash
curl -s http://localhost:3001/health && echo "✅ Backend OK"
curl -s -I http://localhost:3000 | head -1 && echo "✅ Frontend OK"
```

### Process Check
```bash
ps aux | grep -E "node.*backend|npm.*dev|next-server" | grep -v grep
```

### Port Check
```bash
netstat -tuln | grep -E ":3000|:3001"
# or
lsof -i :3000 -i :3001
```

### Log Monitoring
```bash
tail -f /tmp/frontend.log /tmp/backend.log
```

---

## Access URLs

- **Landing Page**: http://localhost:3000
- **Hotels**: http://localhost:3000/hotels
- **Restaurants**: http://localhost:3000/restaurants
- **AI Trip Planner**: http://localhost:3000/plan-trip
- **Dashboard**: http://localhost:3000/dashboard
- **Explore**: http://localhost:3000/explore
- **Bookings**: http://localhost:3000/bookings
- **Login**: http://localhost:3000/login
- **Sign Up**: http://localhost:3000/signup
- **Backend API Health**: http://localhost:3001/health

---

**Last Verified**: 2026-02-11 at 11:55 UTC  
**Status**: ✅ All systems operational
