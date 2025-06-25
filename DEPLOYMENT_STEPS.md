
# Complete Deployment Guide

## Prerequisites Checklist
✅ MongoDB Atlas cluster created and configured  
✅ Database user created with proper permissions  
✅ Network access configured (0.0.0.0/0 for development)  
✅ MongoDB connection string obtained  
✅ GitHub repository created  
✅ Vercel account created  

## Step 1: Backend Deployment to Vercel

### 1.1 Install Vercel CLI
```bash
npm install -g vercel
```

### 1.2 Login to Vercel
```bash
vercel login
```

### 1.3 Deploy Backend
```bash
cd backend
vercel --prod
```

### 1.4 Set Environment Variables in Vercel
Go to your Vercel dashboard → Your Project → Settings → Environment Variables

Add these variables:
- `MONGODB_URI`: Your MongoDB connection string
- `NODE_ENV`: `production`  
- `FRONTEND_URL`: `https://yourusername.github.io/mixtape-hub`

### 1.5 Redeploy with Environment Variables
```bash
vercel --prod
```

### 1.6 Test Your Backend
Visit: `https://your-backend.vercel.app/health`

You should see a JSON response with status "OK".

## Step 2: Populate MongoDB Database

### 2.1 Update Backend .env File
```bash
cd backend
cp .env.example .env
```

Edit `.env` and add your MongoDB connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/mixtape-hub
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### 2.2 Install Backend Dependencies
```bash
npm install
```

### 2.3 Run Database Seed Script
```bash
node scripts/seedData.js
```

You should see:
```
Connected to MongoDB
Cleared existing data
Genres seeded successfully
Mixtapes seeded successfully
Database seeded successfully!
```

## Step 3: Frontend Configuration

### 3.1 Update Frontend Environment
Create `frontend/.env.production`:
```
VITE_API_URL=https://your-backend.vercel.app/api
```

### 3.2 Update Package.json Homepage
Edit `frontend/package.json` and update the homepage:
```json
"homepage": "https://yourusername.github.io/mixtape-hub"
```

## Step 4: Frontend Deployment to GitHub Pages

### 4.1 Enable GitHub Pages
1. Go to your GitHub repository
2. Settings → Pages
3. Source: GitHub Actions

### 4.2 Add GitHub Secrets
Go to your repository → Settings → Secrets and variables → Actions

Add this secret:
- `VITE_API_URL`: `https://your-backend.vercel.app/api`

### 4.3 Deploy Frontend
```bash
cd frontend
npm install
npm run build
npm run deploy
```

Or push to GitHub to trigger automatic deployment.

## Step 5: Testing Everything

### 5.1 Test Backend API
- Health: `https://your-backend.vercel.app/health`
- Mixtapes: `https://your-backend.vercel.app/api/mixtapes`
- Genres: `https://your-backend.vercel.app/api/genres`

### 5.2 Test Frontend
Visit: `https://yourusername.github.io/mixtape-hub`

## Important URLs to Update

Replace these placeholders with your actual values:

1. **your-backend.vercel.app** → Your actual Vercel backend URL
2. **yourusername.github.io** → Your actual GitHub username
3. **mixtape-hub** → Your actual repository name

## Troubleshooting

### Backend Issues
- Check Vercel function logs
- Verify environment variables are set
- Test MongoDB connection string locally

### Frontend Issues  
- Check GitHub Actions logs
- Verify API URL is correct
- Test API endpoints manually

### CORS Issues
- Ensure FRONTEND_URL matches your GitHub Pages URL exactly
- Check browser network tab for CORS errors

## Production Checklist

✅ Backend deployed to Vercel  
✅ Environment variables configured  
✅ Database seeded with data  
✅ Frontend deployed to GitHub Pages  
✅ API calls working  
✅ All pages loading correctly  
✅ Download functionality working  

## Next Steps

1. **Custom Domain**: Configure custom domain in GitHub Pages settings
2. **Analytics**: Add Google Analytics or similar
3. **SEO**: Add meta tags and sitemap
4. **Monitoring**: Set up error tracking with Sentry
5. **Content Management**: Use the admin interface to add more mixtapes

Your mixtape hub is now live and production-ready! 🎉
