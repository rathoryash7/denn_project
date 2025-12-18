# Fix "Failed to fetch" Error

## Problem
"Failed to fetch" means the browser cannot connect to the backend server.

## Quick Fixes

### Fix 1: Verify Backend URL is Correct

Your backend should be at: `https://backenddehnproject.vercel.app`

Test if backend is accessible:
```
Open in browser: https://backenddehnproject.vercel.app/api/health
```

If this doesn't load, your backend is not deployed or not accessible.

### Fix 2: Add CORS to Backend

Your backend MUST allow requests from your frontend domain.

**Update `backend/server.js`:**

```javascript
import cors from 'cors';

// Add this AFTER creating the Express app
const app = express();

// CORS Configuration - ADD THIS
app.use(cors({
  origin: [
    'https://denn-project-jz9l2gaty-rathoryash7s-projects.vercel.app',
    'https://*.vercel.app',  // Allow all Vercel preview URLs
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Then add your other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

### Fix 3: Use Wildcard for Testing (Quick Fix)

For immediate testing, allow all origins:

```javascript
app.use(cors({
  origin: '*',
  credentials: true
}));
```

### Fix 4: Verify Backend Routes

Make sure your backend has these routes:
- `GET /api/health`
- `GET /api/products`
- `POST /api/auth/login`
- etc.

### Fix 5: Check Backend Deployment

1. Go to Vercel Dashboard
2. Select your backend project (`backenddehnproject`)
3. Check deployment status - should be "Ready"
4. Check function logs for errors

## Step-by-Step Fix

1. **Update backend `server.js` with CORS** (see Fix 2 above)

2. **Commit and push backend:**
   ```bash
   cd backend
   git add .
   git commit -m "Add CORS configuration"
   git push
   ```

3. **Wait for backend to redeploy** (check Vercel dashboard)

4. **Test backend directly:**
   ```
   https://backenddehnproject.vercel.app/api/health
   ```

5. **Test from frontend** - should work now!

## Debug Steps

### Check Browser Console (F12)
Look for detailed error messages in Console tab.

### Check Network Tab (F12)
1. Go to Network tab
2. Refresh page
3. Look for request to `backenddehnproject.vercel.app`
4. Click on it - what status code? What error?

### Test Backend Manually
```bash
# Test health endpoint
curl https://backenddehnproject.vercel.app/api/health

# Test products endpoint
curl https://backenddehnproject.vercel.app/api/products
```

## Common Causes

1. **CORS not configured** (90% of cases) - Backend blocks frontend requests
2. **Backend not deployed** - URL returns 404 or timeout
3. **Wrong backend URL** - Frontend calling wrong endpoint
4. **Backend crashed** - Check backend logs in Vercel

## Quick Test

Run this in browser console on your frontend page:

```javascript
// Test if backend is reachable
fetch('https://backenddehnproject.vercel.app/api/health')
  .then(r => r.json())
  .then(console.log)
  .catch(err => {
    console.error('Backend not reachable:', err);
    console.log('This means CORS is blocking or backend is down');
  });
```

If this fails, it confirms the backend is either:
- Not responding
- Blocking requests (CORS)
- Not deployed correctly

