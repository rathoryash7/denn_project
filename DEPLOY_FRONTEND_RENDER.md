# 🚀 Deploy Frontend to Render - Complete Guide

## Backend Status
✅ **Backend is live at:** `https://denn-project.onrender.com`

## Frontend Deployment Options

### Option 1: Static Site (Recommended - FREE)

Render offers **Static Site** hosting which is perfect for React/Vite apps.

#### Steps:

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com
   - Click: **New +** → **Static Site**

2. **Connect Repository**
   - Connect your GitHub/GitLab repository (same one with backend)
   - Select the repository

3. **Build Settings:**
   ```
   Name: denn-project-frontend (or any name)
   Branch: main (or your main branch)
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

4. **Click "Create Static Site"**

5. **Wait for deployment** (2-3 minutes)

6. **Your frontend will be live at:**
   - `https://denn-project-frontend.onrender.com` (or similar)

7. **That's it!** ✅

---

### Option 2: Web Service

If you prefer using a Web Service:

1. **Go to Render Dashboard** → **New +** → **Web Service**

2. **Repository Settings:**
   - Connect your repository
   - Branch: main

3. **Build & Start:**
   ```
   Build Command: npm install && npm run build
   Start Command: npx serve -s dist -l $PORT
   ```

4. **Environment:**
   - Runtime: Node

5. **Create Web Service**

---

## API Configuration

I've updated `src/config/api.js` to:
- Use Render backend (`https://denn-project.onrender.com/api`) in production
- Use localhost in development
- Support custom API URL via `VITE_API_BASE_URL` env var if needed

**No changes needed** - it will automatically use the Render backend in production! ✅

---

## After Deployment

1. **Test the frontend:**
   - Open your frontend URL
   - Check browser console (F12)
   - Products should load from Render backend

2. **If CORS errors:**
   - Make sure backend has the CORS fix applied
   - Frontend origin should be in backend's allowed origins

3. **Update CORS on backend** if needed:
   - Add your frontend Render URL to allowed origins
   - Example: `https://denn-project-frontend.onrender.com`

---

## Recommended: Use Static Site

**Why Static Site?**
- ✅ Faster (CDN cached)
- ✅ Free tier available
- ✅ Perfect for React/Vite apps
- ✅ No server needed
- ✅ Automatic HTTPS

**Why not Web Service?**
- Uses server resources
- More expensive on paid plans
- Overkill for static React apps

---

## Summary

1. ✅ Backend deployed at: `https://denn-project.onrender.com`
2. 📝 Deploy frontend as **Static Site** on Render
3. ✅ API config updated to use Render backend
4. 🎉 Frontend will connect to backend automatically!

Let me know once you've deployed the frontend and I can help test it! 🚀

