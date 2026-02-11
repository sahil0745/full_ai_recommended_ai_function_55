#!/bin/bash

# TravelGenie - Startup Script
# This script starts both frontend and backend servers

echo "================================================"
echo "🚀 Starting TravelGenie Application"
echo "================================================"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install --legacy-peer-deps
    echo "✅ Dependencies installed"
    echo ""
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚙️  Creating .env file..."
    cat > .env << 'EOF'
# TravelGenie Environment Variables

# Database
MONGODB_URI=mongodb://localhost:27017/travelgenie

# JWT
JWT_SECRET=demo_secret_key_for_development_only_change_in_production
JWT_EXPIRES_IN=7d

# OpenAI (Demo mode - will not make actual API calls)
OPENAI_API_KEY=sk-demo-key-for-local-development

# Stripe (Demo mode)
STRIPE_SECRET_KEY=sk_test_demo_key_for_local_development

# Server
PORT=3001
NODE_ENV=development
EOF
    echo "✅ Environment file created"
    echo ""
fi

# Kill any existing processes
echo "🔄 Checking for existing processes..."
pkill -f "next dev" 2>/dev/null
pkill -f "node backend/server.js" 2>/dev/null
sleep 2

# Start Backend
echo "🔧 Starting Backend Server (Port 3001)..."
npm run server > /tmp/travelgenie-backend.log 2>&1 &
BACKEND_PID=$!
sleep 3

# Check if backend started
if curl -s http://localhost:3001/health > /dev/null 2>&1; then
    echo "✅ Backend Server: RUNNING (PID: $BACKEND_PID)"
else
    echo "❌ Backend Server: FAILED TO START"
    echo "Check logs: tail -f /tmp/travelgenie-backend.log"
    exit 1
fi

# Start Frontend
echo "🎨 Starting Frontend Server (Port 3000)..."
npm run dev > /tmp/travelgenie-frontend.log 2>&1 &
FRONTEND_PID=$!
sleep 5

# Check if frontend started
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Frontend Server: RUNNING (PID: $FRONTEND_PID)"
else
    echo "❌ Frontend Server: FAILED TO START"
    echo "Check logs: tail -f /tmp/travelgenie-frontend.log"
    exit 1
fi

echo ""
echo "================================================"
echo "✨ TravelGenie is now running!"
echo "================================================"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:3001"
echo ""
echo "📋 Logs:"
echo "   Frontend: tail -f /tmp/travelgenie-frontend.log"
echo "   Backend:  tail -f /tmp/travelgenie-backend.log"
echo ""
echo "🛑 To stop servers:"
echo "   pkill -f 'next dev'"
echo "   pkill -f 'node backend/server.js'"
echo ""
echo "Press Ctrl+C to stop monitoring (servers will continue running)"
echo ""

# Monitor servers
while true; do
    sleep 10
    if ! curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo "⚠️  Frontend stopped!"
        break
    fi
    if ! curl -s http://localhost:3001/health > /dev/null 2>&1; then
        echo "⚠️  Backend stopped!"
        break
    fi
done
