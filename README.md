
# 🎵 Mixtape Hub

A modern web application for discovering, streaming, and downloading mixtapes.

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Vite (deployed on GitHub Pages)
- **Backend**: Node.js + Express + MongoDB (deployed on Vercel)
- **Database**: MongoDB Atlas
- **Styling**: Tailwind CSS + Shadcn UI

## 🚀 Live Demo

- **Frontend**: https://yourusername.github.io/mixtape-hub
- **Backend API**: https://your-backend.vercel.app

## 📁 Project Structure

```
mixtape-hub/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── hooks/           # Custom React hooks
│   │   └── types/           # TypeScript type definitions
│   ├── package.json
│   └── vite.config.ts
├── backend/                  # Node.js API server
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── middleware/          # Express middleware
│   ├── config/              # Configuration files
│   ├── scripts/             # Utility scripts
│   ├── utils/               # Helper functions
│   ├── server.js           # Main server file
│   └── vercel.json         # Vercel deployment config
└── .github/workflows/       # GitHub Actions
```

## 🛠️ Local Development

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB connection string
npm run dev
```

### Frontend Setup
```bash
cd frontend  
npm install
npm run dev
```

## 🚀 Deployment

See [DEPLOYMENT_STEPS.md](./DEPLOYMENT_STEPS.md) for complete deployment instructions.

### Quick Deploy Commands

**Backend to Vercel:**
```bash
cd backend
vercel --prod
```

**Frontend to GitHub Pages:**
```bash
cd frontend
npm run deploy
```

## 🔧 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://...
NODE_ENV=production
FRONTEND_URL=https://yourusername.github.io/mixtape-hub
```

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend.vercel.app/api
```

## 📊 API Endpoints

- `GET /health` - Health check
- `GET /api/mixtapes` - Get all mixtapes
- `GET /api/mixtapes/featured` - Get featured mixtapes  
- `GET /api/mixtapes/trending` - Get trending mixtapes
- `GET /api/genres` - Get all genres
- `POST /api/mixtapes/:id/play` - Increment play count
- `POST /api/mixtapes/:id/like` - Increment likes

## 🎯 Features

- 🎵 Browse and discover mixtapes
- 🔍 Search and filter by genre
- ⭐ Featured and trending sections
- 📱 Responsive design
- 🎮 Music player interface
- 💾 Download functionality
- 👍 Like and share features

## 🧪 Testing

**Backend Health Check:**
```bash
cd backend
node scripts/healthCheck.js
```

**Frontend Build Test:**
```bash
cd frontend
npm run build
```

## 📈 Monitoring

- **Backend Health**: `https://your-backend.vercel.app/health`
- **Vercel Dashboard**: Monitor function logs and performance
- **GitHub Actions**: Check deployment status

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details.

---

Built with ❤️ using React, Node.js, and MongoDB
