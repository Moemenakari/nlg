# 🚀 Next Level Games - Deployment Guide

## Quick Start (Local Development)

### 1. Database Setup
```bash
# Make sure MySQL is running on your machine
# Then run the automated setup:
cd backend
node database/setup.js
```

### 2. Backend Setup
```bash
cd backend
npm install
npm start
```
Backend will run on: `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```
Frontend will run on: `http://localhost:3000`

### 4. Default Admin Login
- **Username:** `admin`
- **Password:** `admin123`
- ⚠️ **CHANGE THIS IN PRODUCTION!**

---

## 🌐 Production Deployment

### Environment Variables

#### Backend (.env)
```env
PORT=5000
NODE_ENV=production
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=next_level_games
DB_PORT=3306
JWT_SECRET=your_secure_random_string_here
JWT_EXPIRE=7d
CORS_ORIGIN=https://yourdomain.com
```

#### Frontend (.env.production)
```env
REACT_APP_API_URL=https://api.yourdomain.com/api
```

### Build Frontend
```bash
cd frontend
npm run build
```

### Deployment Options

#### Option 1: VPS (DigitalOcean, Linode, AWS EC2)
1. Upload code to server
2. Install Node.js and MySQL
3. Run database setup: `node database/setup.js`
4. Install PM2: `npm install -g pm2`
5. Start backend: `pm2 start server.js --name nextlevel-backend`
6. Serve frontend build with Nginx

#### Option 2: Heroku
- Backend: Deploy as Node.js app
- Database: Use ClearDB MySQL addon
- Frontend: Deploy to Netlify/Vercel

#### Option 3: Docker
```bash
# Coming soon - Docker configuration
```

---

## ✅ All Fixed Issues

### Critical Fixes Applied:
1. ✅ **Image Display Bug** - Fixed duplicate `/uploads/` path
2. ✅ **Security Vulnerability** - Removed plaintext password comparison
3. ✅ **Database Schema** - Complete schema with all tables
4. ✅ **Upload Directories** - Auto-created on server start
5. ✅ **API Parameter Mismatch** - Fixed username/email inconsistency
6. ✅ **Error Handling** - Enhanced with better messages
7. ✅ **Auth Middleware** - Improved token validation

### What's Working:
- ✅ Admin Login & Authentication
- ✅ Game CRUD Operations with Image Upload
- ✅ Booking System
- ✅ Contact Form
- ✅ Testimonials Display
- ✅ Image Display on All Pages

---

## 🧪 Testing Checklist

- [ ] Test admin login at `/admin`
- [ ] Upload game image and verify display on home page
- [ ] Test booking form submission
- [ ] Test contact form
- [ ] Verify games show on Games page
- [ ] Verify games show on Build Your Event page
- [ ] Check all images load correctly

---

## 📞 Support

If you encounter any issues:
1. Check MySQL is running
2. Check all environment variables are set
3. Check uploads directory exists
4. Check console for errors

Good luck with your deployment! 🎮
