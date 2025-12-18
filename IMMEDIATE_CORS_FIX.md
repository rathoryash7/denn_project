# Immediate Fix for "Failed to fetch" Error

## Problem
**Error**: "Network error: Failed to fetch. Check if backend is accessible and CORS is configured."

This is a **CORS (Cross-Origin Resource Sharing)** issue. Your backend is blocking requests from your frontend.

## Root Cause

Your external backend at `https://backend-dehn-project-r1541ewf6-rathoryash7s-projects.vercel.app` needs to allow requests from your frontend domain.

## Solution: Update Backend CORS

**You need to update your external backend** to allow your frontend domain.

### Backend Code (Add/Update CORS)

In your backend server file, add or update CORS configuration:

```javascript
import cors from 'cors';

// Allow all Vercel domains (recommended for Vercel deployments)
app.use(cors({
  origin: [
    'https://*.vercel.app',              // All Vercel domains
    'http://localhost:5173',             // Local development
    'http://localhost:3000'              // Alternative local port
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

Or for quick testing (allow all origins - less secure but works immediately):

```javascript
app.use(cors({
  origin: '*',
  credentials: true
}));
```

### After Updating Backend

1. **Save the changes** to your backend code
2. **Commit and push** to your backend repository
3. **Wait for backend to redeploy** on Vercel
4. **Test frontend again** - should work now!

## Verify Fix

After backend is updated, test:

1. **Direct backend access** (should work):
   ```
   https://backend-dehn-project-r1541ewf6-rathoryash7s-projects.vercel.app/api/products
   ```

2. **From frontend** (should work after CORS fix):
   - Frontend should now load products
   - No more "Failed to fetch" error

## Quick Test

Before updating CORS, test in browser console:

```javascript
fetch('https://backend-dehn-project-r1541ewf6-rathoryash7s-projects.vercel.app/api/products')
  .then(r => r.json())
  .then(console.log)
  .catch(err => console.error('CORS Error:', err));
```

If you see a CORS error, this confirms the issue and the fix above will resolve it.

## Summary

✅ **Frontend is correctly configured** - pointing to right backend URL  
❌ **Backend CORS needs update** - must allow your frontend domain  
🔧 **Fix**: Update backend CORS configuration (code shown above)  
🚀 **Result**: Frontend will connect successfully after backend CORS is fixed

