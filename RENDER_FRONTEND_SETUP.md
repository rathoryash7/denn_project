# Deploy Frontend to Render

## Current Situation

- ✅ Backend is deployed at: `https://denn-project.onrender.com`
- ❌ Frontend needs to be deployed

## Option 1: Deploy Frontend as Static Site (Recommended)

Render has a **Static Site** service that's perfect for React/Vite apps.

### Steps:

1. **Go to Render Dashboard** → New → Static Site

2. **Connect your repository** (same repo as backend)

3. **Build Settings:**
   ```
   Build Command: npm run build
   Publish Directory: dist
   ```

4. **Environment Variables:**
   - No environment variables needed for static sites
   - The frontend will use the API URL from `src/config/api.js`

5. **Click Create Static Site**

6. **Update Frontend API Configuration** to use Render backend:
   - Update `src/config/api.js` to use `https://denn-project.onrender.com/api` in production

## Option 2: Deploy Frontend as Web Service

If you want to use a Web Service instead:

1. **Go to Render Dashboard** → New → Web Service

2. **Connect your repository**

3. **Build Command:**
   ```
   npm install && npm run build
   ```

4. **Start Command:**
   ```
   npm run preview
   ```
   OR use a simple static file server:
   ```
   npx serve -s dist -l $PORT
   ```

5. **Environment:**
   - Node

## Update API Configuration

We need to update the frontend to use the Render backend URL in production.

Let me update the API configuration file for you!

