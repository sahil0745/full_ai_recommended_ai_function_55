# 🚀 TravelGenie - Quick Start Guide

## If You See "ERR_CONNECTION_REFUSED"

This means the servers aren't running. Follow these steps:

### Option 1: Use the Startup Script (Recommended)
```bash
cd /home/runner/work/full_ai_recommended_ai_function_55/full_ai_recommended_ai_function_55
./start.sh
```

### Option 2: Manual Start (Detached Mode)
```bash
cd /home/runner/work/full_ai_recommended_ai_function_55/full_ai_recommended_ai_function_55

# Start backend (runs in background)
nohup node backend/server.js > /tmp/backend.log 2>&1 &

# Wait 3 seconds
sleep 3

# Start frontend (runs in background)
nohup npm run dev > /tmp/frontend.log 2>&1 &

# Wait 10 seconds for frontend to compile
sleep 10

# Verify both are running
curl http://localhost:3000 > /dev/null && echo "✅ Frontend: RUNNING"
curl http://localhost:3001/health && echo "✅ Backend: RUNNING"
```

### Option 3: Manual Start (Foreground)
```bash
# Terminal 1 - Backend
cd /home/runner/work/full_ai_recommended_ai_function_55/full_ai_recommended_ai_function_55
npm run server

# Terminal 2 - Frontend (in a new terminal)
cd /home/runner/work/full_ai_recommended_ai_function_55/full_ai_recommended_ai_function_55
npm run dev
```

---

## 🌐 Access URLs

Once servers are running:
- **Main Site**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

---

## 🔍 Check Server Status

```bash
# Quick check
curl http://localhost:3000 > /dev/null && echo "Frontend: ✅" || echo "Frontend: ❌"
curl http://localhost:3001/health > /dev/null && echo "Backend: ✅" || echo "Backend: ❌"

# Detailed check
ps aux | grep -E "next dev|node backend/server.js" | grep -v grep
```

---

## 📋 View Logs

If servers are running in background:
```bash
# Frontend logs
tail -f /tmp/frontend.log

# Backend logs
tail -f /tmp/backend.log
```

---

## 🛑 Stop Servers

```bash
# Kill all processes
pkill -f "next dev"
pkill -f "node backend/server.js"

# Or find and kill specific PIDs
ps aux | grep -E "next dev|node backend/server.js" | grep -v grep
kill <PID>
```

---

## 🔧 Troubleshooting

### Dependencies Missing
```bash
npm install --legacy-peer-deps
```

### Environment File Missing
```bash
cp .env.example .env
# Or the start.sh script will create it automatically
```

### Port Already in Use
```bash
# Find what's using the port
lsof -i :3000
lsof -i :3001

# Kill the process
kill -9 <PID>
```

### Build Issues
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

---

## ✅ Quick Verification

After starting servers, run:
```bash
echo "🌐 Site Status:"
curl -s http://localhost:3000 > /dev/null && echo "  ✅ Frontend accessible" || echo "  ❌ Frontend not responding"
curl -s http://localhost:3001/health | jq -r '"  ✅ Backend: " + .message' || echo "  ❌ Backend not responding"
```

---

## 📖 More Documentation

- **README.md** - Complete project overview
- **RUNNING.md** - Detailed troubleshooting
- **DEPLOYMENT.md** - Production deployment
- **API_DOCS.md** - API reference

---

**Need help?** Check the detailed troubleshooting in `RUNNING.md`
