# 🚀 TravelGenie Deployment Guide

This guide covers deploying the TravelGenie platform to production.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Database Setup (MongoDB Atlas)](#database-setup)
- [Backend Deployment](#backend-deployment)
- [Frontend Deployment (Vercel)](#frontend-deployment)
- [API Keys Setup](#api-keys-setup)
- [Post-Deployment](#post-deployment)

---

## Prerequisites

Before deploying, ensure you have:

- ✅ GitHub account
- ✅ MongoDB Atlas account
- ✅ Vercel account
- ✅ Railway/Render account (for backend)
- ✅ All required API keys (OpenAI, Google Maps, Stripe, Firebase)

---

## Database Setup (MongoDB Atlas)

### 1. Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a new project: "TravelGenie"

### 2. Create Cluster

1. Click "Build a Cluster"
2. Choose the FREE tier (M0)
3. Select your preferred region
4. Name your cluster: "travelgenie-cluster"
5. Click "Create Cluster" (wait 3-5 minutes)

### 3. Configure Database Access

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create username and strong password
4. Set "Database User Privileges" to "Read and write to any database"
5. Click "Add User"

### 4. Configure Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, restrict to specific IPs
4. Click "Confirm"

### 5. Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `travelgenie`

Example:
```
mongodb+srv://username:password@travelgenie-cluster.xxxxx.mongodb.net/travelgenie?retryWrites=true&w=majority
```

---

## Backend Deployment

### Option 1: Railway

#### 1. Create Railway Account
1. Go to [Railway](https://railway.app/)
2. Sign up with GitHub

#### 2. Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Connect your repository
4. Select `full_ai_recommended_ai_function_55`

#### 3. Configure Service
1. Click on your service
2. Go to "Settings"
3. Set Root Directory: `/` (or leave empty)
4. Set Start Command: `node backend/server.js`
5. Set Custom Domain (optional)

#### 4. Add Environment Variables
Go to "Variables" tab and add:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars
JWT_EXPIRES_IN=7d
OPENAI_API_KEY=sk-your_openai_key
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
PORT=3001
NODE_ENV=production
```

#### 5. Deploy
Railway will automatically deploy. Note the deployment URL (e.g., `https://yourapp.railway.app`)

---

### Option 2: Render

#### 1. Create Render Account
1. Go to [Render](https://render.com/)
2. Sign up with GitHub

#### 2. Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: travelgenie-api
   - **Region**: Choose closest to your users
   - **Branch**: main or copilot/create-travelgenie-platform
   - **Root Directory**: (leave empty)
   - **Runtime**: Node
   - **Build Command**: `npm install --legacy-peer-deps`
   - **Start Command**: `node backend/server.js`
   - **Plan**: Free

#### 3. Add Environment Variables
Add all environment variables (same as Railway)

#### 4. Deploy
Click "Create Web Service". Render will build and deploy automatically.

---

## Frontend Deployment (Vercel)

### 1. Create Vercel Account
1. Go to [Vercel](https://vercel.com/)
2. Sign up with GitHub

### 2. Import Project
1. Click "Add New..." → "Project"
2. Import your GitHub repository
3. Select `full_ai_recommended_ai_function_55`

### 3. Configure Project
- **Framework Preset**: Next.js
- **Root Directory**: `./` (leave as default)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install --legacy-peer-deps`

### 4. Add Environment Variables

Click "Environment Variables" and add:

```env
# Backend API
NEXT_PUBLIC_API_URL=https://your-railway-or-render-url.app

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key

# Stripe (Public Key)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_public_key
```

### 5. Deploy
1. Click "Deploy"
2. Wait for build to complete (2-5 minutes)
3. Your app will be live at `https://your-project.vercel.app`

### 6. Custom Domain (Optional)
1. Go to "Settings" → "Domains"
2. Add your custom domain
3. Follow DNS configuration instructions

---

## API Keys Setup

### Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project: "TravelGenie"
3. Go to Project Settings → General
4. Scroll to "Your apps" → Click Web icon (<//>)
5. Register app name: "TravelGenie Web"
6. Copy the configuration values
7. Enable Authentication:
   - Go to "Authentication" → "Sign-in method"
   - Enable "Email/Password"
   - Enable "Google" provider

### Google Maps API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable APIs:
   - Maps JavaScript API
   - Places API
   - Directions API
   - Distance Matrix API
   - Geolocation API
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Restrict the API key:
   - Set Application restrictions (HTTP referrers)
   - Add your domain(s)
   - Select APIs to restrict key to

### OpenAI API

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create account or log in
3. Go to API Keys section
4. Click "Create new secret key"
5. Copy the key (shown only once!)
6. Add billing method if needed

### Stripe

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create account or log in
3. Get API keys from "Developers" → "API keys"
4. Copy Publishable key and Secret key
5. For webhooks:
   - Go to "Developers" → "Webhooks"
   - Add endpoint: `https://your-backend-url/api/payments/webhook`
   - Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
   - Copy webhook secret

---

## Post-Deployment

### 1. Seed Database

SSH into your backend server or run locally:

```bash
# Update .env with production MongoDB URI
MONGODB_URI=your_production_mongodb_uri npm run seed
```

### 2. Test the Application

1. Visit your Vercel URL
2. Test registration and login
3. Test hotel search
4. Test AI trip planner
5. Test booking flow
6. Test all major features

### 3. Monitor Logs

#### Vercel (Frontend)
- Go to your project → "Deployments"
- Click on latest deployment
- Check "Functions" tab for logs

#### Railway/Render (Backend)
- Go to your service
- Click "Logs" tab
- Monitor for errors

### 4. Set Up Analytics

1. Vercel Analytics:
   - Go to your project → "Analytics"
   - Enable analytics
   - Already integrated via `@vercel/analytics`

2. Google Analytics (Optional):
   - Add tracking code to `app/layout.tsx`

### 5. Configure CORS

Update backend CORS settings if needed:

```javascript
// backend/server.js
app.use(cors({
  origin: [
    'https://your-vercel-domain.vercel.app',
    'https://your-custom-domain.com'
  ],
  credentials: true
}));
```

### 6. SSL/HTTPS

- Vercel provides automatic HTTPS
- Railway/Render provide automatic HTTPS
- For custom domains, follow provider instructions

---

## Environment Variables Reference

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_min_32_chars
JWT_EXPIRES_IN=7d
OPENAI_API_KEY=sk-...
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
FIREBASE_ADMIN_PROJECT_ID=...
FIREBASE_ADMIN_PRIVATE_KEY=...
FIREBASE_ADMIN_CLIENT_EMAIL=...
PORT=3001
NODE_ENV=production
```

### Frontend (Vercel)
```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
```

---

## Troubleshooting

### Build Fails on Vercel
```bash
# Use legacy peer deps
npm install --legacy-peer-deps
```

### Backend Can't Connect to MongoDB
- Check MongoDB Atlas network access
- Verify connection string format
- Check database user permissions

### CORS Errors
- Verify backend CORS configuration
- Check if frontend URL is allowed
- Ensure credentials are properly set

### API Keys Not Working
- Verify keys are not exposed in frontend code
- Check environment variable names (NEXT_PUBLIC_ prefix for frontend)
- Restart deployment after adding new env vars

---

## Performance Optimization

### 1. Enable Caching
- MongoDB query caching
- Next.js image optimization
- API response caching

### 2. CDN Configuration
- Vercel automatically uses CDN
- Optimize static assets

### 3. Database Indexes
```javascript
// Add indexes for frequently queried fields
hotelSchema.index({ 'location.city': 1 });
hotelSchema.index({ 'rating.average': -1 });
hotelSchema.index({ 'pricing.minPrice': 1 });
```

---

## Security Checklist

- [ ] All API keys in environment variables
- [ ] MongoDB network access restricted
- [ ] JWT secret is strong and secret
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] SQL/NoSQL injection prevention
- [ ] XSS protection
- [ ] HTTPS enabled everywhere
- [ ] Regular security updates

---

## Support

For issues or questions:
- GitHub Issues: [Create an issue](https://github.com/sahil0745/full_ai_recommended_ai_function_55/issues)
- Email: support@travelgenie.com

---

**Congratulations! 🎉 Your TravelGenie platform is now live!**
