# Deploy Frontend & Backend from Same Repo on Render

## Current Setup

✅ **Backend:** Already deployed at `https://denn-project.onrender.com`
- Located in `backend/` folder
- From same repository

🎯 **Frontend:** Needs to be deployed
- Located in root folder
- Same repository

## What I've Updated

### 1. Backend CORS Configuration

Updated `backend/server.js` to allow all `.onrender.com` domains, so your frontend Render URL will be automatically allowed.

```javascript
// Allow all Render domains (frontend will be on .onrender.com)
if (origin.includes('.onrender.com')) {
  return callback(null, true);
}
```

This means **any frontend deployed on Render** (`.onrender.com`) will work automatically! ✅

### 2. Frontend API Configuration

Updated `src/config/api.js` to use Render backend in production:
- Production: `https://denn-project.onrender.com/api`
- Development: `http://localhost:3001/api`

## Deploy Frontend Now

### Option 1: Static Site (Recommended)

1. **Render Dashboard** → **New +** → **Static Site**

2. **Settings:**
   ```
   Name: denn-project-frontend
   Repository: [your repo]
   Branch: main
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

3. **Create Static Site**

4. **Frontend will be live at:** `https://denn-project-frontend.onrender.com`

### Option 2: Web Service

1. **Render Dashboard** → **New +** → **Web Service**

2. **Settings:**
   ```
   Name: denn-project-frontend
   Repository: [your repo]
   Branch: main
   Build Command: npm install && npm run build
   Start Command: npx serve -s dist -l $PORT
   Runtime: Node
   ```

3. **Create Web Service**

## After Deployment

1. ✅ **Frontend will automatically connect** to `https://denn-project.onrender.com/api`
2. ✅ **CORS is already configured** to allow `.onrender.com` domains
3. ✅ **No additional configuration needed!**

## Commit & Push Changes

Before deploying frontend, commit the CORS update:

```bash
git add backend/server.js src/config/api.js
git commit -m "Update CORS to allow Render domains and set Render backend URL"
git push
```

This ensures the backend has the latest CORS configuration when it redeploys.

## Summary

- ✅ Backend: `https://denn-project.onrender.com` (already deployed)
- 📝 Frontend: Deploy as Static Site or Web Service
- ✅ CORS: Already configured to allow Render domains
- ✅ API Config: Already pointing to Render backend

Everything is ready! Just deploy the frontend and it will work! 🚀

