# 🚀 Next Level Games - Deployment Guide

<<<<<<< HEAD
=======
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

## 🌐 Vercel & Render Deployment Guide

### 0. ⚠️ Prerequisite: Cloud Database
**You cannot use `localhost` for your database on Render.**
You need a free cloud MySQL database.
1. Sign up for **[Aiven Console](https://console.aiven.io/signup)** (Free Tier available) or **[PlanetScale](https://planetscale.com)**.
2. Create a new **MySQL** service.
3. Get your **Connection URI** (looks like `mysql://user:password@host:port/defaultdb...`).
4. **Keep this safe!** You will need the Host, User, Password, Port, and Database Name for Render.

---

### 1. Backend Deployment (Render)
1. Go to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repo: `Moemenakari/nlg`.
4. **Settings:**
   - **Name:** `next-level-games-api`
   - **Root Directory:** `backend` (Important!)
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
5. **Environment Variables:** (Scroll down)
   - Add the following keys (copy values from your Cloud Database):
     - `DB_HOST`: (e.g., `mysql-service.aivencloud.com`)
     - `DB_USER`: (e.g., `avnadmin`)
     - `DB_PASSWORD`: (your database password)
     - `DB_NAME`: `defaultdb` (or whatever you named it)
     - `DB_PORT`: `3306` (or whatever port they gave you)
     - `JWT_SECRET`: (generate a random secure string)
     - `CORS_ORIGIN`: `https://nlg-frontend.vercel.app,https://nlg-admin.vercel.app` (You will update this *after* deploying frontend)
     - `ADMIN_USERNAME`: `youradmin`
     - `ADMIN_PASSWORD`: `yoursecurepassword`
6. Click **Create Web Service**.
7. **Copy your Backend URL** (e.g., `https://next-level-games-api.onrender.com`).

---

### 2. Frontend Deployment (Vercel)
1. Go to [Vercel Dashboard](https://vercel.com/new).
2. Import `Moemenakari/nlg`.
3. **Configure Project:**
   - **Project Name:** `nlg-frontend`
   - **Framework Preset:** Create React App
   - **Root Directory:** Edit -> Select `frontend` folder.
4. **Environment Variables:**
   - Name: `REACT_APP_API_URL`
   - Value: Your Render Backend URL + `/api` (e.g., `https://next-level-games-api.onrender.com/api`)
5. Click **Deploy**.

---

### 3. Admin Panel Deployment (Vercel)
1. Go to [Vercel Dashboard](https://vercel.com/new) *again*.
2. Import `Moemenakari/nlg` *again*.
3. **Configure Project:**
   - **Project Name:** `nlg-admin`
   - **Framework Preset:** Create React App
   - **Root Directory:** Edit -> Select `admin-panel` folder.
4. **Environment Variables:**
   - Name: `REACT_APP_API_URL`
   - Value: Your Render Backend URL (e.g., `https://next-level-games-api.onrender.com`) (Note: No `/api` suffix for admin usually, check your code logic if needed, but standard is base URL)
5. Click **Deploy**.

---

### 4. Final Step: Connect Everything
1. Go back to **Render** (Backend).
2. Update the `CORS_ORIGIN` environment variable.
3. Add the URLs of your new Vercel sites:
   `https://nlg-frontend.vercel.app,https://nlg-admin.vercel.app`
4. The backend will restart automatically.
5. **Done!** 🚀

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
>>>>>>> d37c9b9 (fix: add trust proxy and production setup script)
