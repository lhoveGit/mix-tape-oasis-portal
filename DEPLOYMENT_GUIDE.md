
# Complete MongoDB + Vercel Deployment Guide

## Part 1: MongoDB Setup

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create new cluster (M0 Free tier)
4. Wait 2-3 minutes for provisioning

### 2. Configure Database Access
```
Database Access → Add New Database User
- Username: mixtape-admin
- Password: Generate strong password (save it!)
- Database User Privileges: Atlas admin
```

### 3. Configure Network Access
```
Network Access → Add IP Address
- IP Address: 0.0.0.0/0 (allows access from anywhere)
- Comment: Allow all IPs for development
```

### 4. Get Connection String
```
Clusters → Connect → Connect your application
- Choose "Node.js" driver
- Copy connection string:
mongodb+srv://mixtape-admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

## Part 2: Backend Deployment (Vercel)

### 1. Prepare Backend
```bash
cd backend
npm install
```

### 2. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel login
vercel --prod
```

### 3. Set Environment Variables in Vercel
```
Dashboard → Your Project → Settings → Environment Variables

Add:
- MONGODB_URI: your-mongodb-connection-string
- NODE_ENV: production
- FRONTEND_URL: https://yourusername.github.io/mixtape-hub
```

### 4. Test Backend
Visit: `https://your-backend.vercel.app/health`

## Part 3: Seed Database

### 1. Add MongoDB URI to backend/.env
```
MONGODB_URI=your-connection-string-here
```

### 2. Run Seed Script
```bash
cd backend
node scripts/seedData.js
```

## Part 4: Frontend Deployment (GitHub Pages)

### 1. Update Frontend Environment
Create `frontend/.env`:
```
VITE_API_URL=https://your-backend.vercel.app/api
```

### 2. Build Frontend
```bash
cd frontend
npm install
npm run build
```

### 3. Deploy to GitHub Pages
```bash
# Install gh-pages
npm install -g gh-pages

# Deploy
npm run deploy
```

## Part 5: Update Frontend API Calls

Your frontend now uses real API calls instead of mock data!

## Testing Checklist

✅ MongoDB Atlas cluster created  
✅ Database user configured  
✅ Network access configured  
✅ Backend deployed to Vercel  
✅ Environment variables set  
✅ Database seeded with data  
✅ Frontend deployed to GitHub Pages  
✅ Frontend calling backend API  

## Important URLs

- **MongoDB Atlas**: https://cloud.mongodb.com  
- **Vercel Dashboard**: https://vercel.com/dashboard  
- **Your Backend API**: https://your-backend.vercel.app  
- **Your Frontend**: https://yourusername.github.io/mixtape-hub  

## Folder Structure After Restructure

```
mixtape-hub/
├── backend/                 # Deploy to Vercel
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── scripts/
│   ├── server.js
│   ├── package.json
│   └── vercel.json
├── frontend/                # Deploy to GitHub Pages
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
└── DEPLOYMENT_GUIDE.md
```

## Next Steps

1. **Get MongoDB connection string**
2. **Deploy backend to Vercel**  
3. **Set environment variables**
4. **Run database seed script**
5. **Deploy frontend to GitHub Pages**
6. **Test everything works!**
