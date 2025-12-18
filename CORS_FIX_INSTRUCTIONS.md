# CORS Fix Instructions

## Issue
**Error**: "Network error: Failed to fetch. Check if backend is accessible and CORS is configured."

This means your external backend is **blocking requests** from your frontend due to CORS (Cross-Origin Resource Sharing) policy.

## Solution

Your **external backend** needs to allow requests from your frontend domain. 

### Option 1: Update Backend CORS (Recommended)

Ask your backend developer to add/update CORS configuration in the backend:

```javascript
import cors from 'cors';

app.use(cors({
  origin: [
    'https://denn-project-*.vercel.app',  // All Vercel preview URLs
    'https://*.vercel.app',                // All Vercel domains
    'http://localhost:5173',               // Local development
    'http://localhost:3000'                // Alternative local port
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

Or for quick testing (allow all origins - less secure):

```javascript
app.use(cors({
  origin: '*',
  credentials: true
}));
```

### Option 2: Check Current Backend CORS

1. Test backend directly in browser:
   ```
   https://backend-dehn-project-r1541ewf6-rathoryash7s-projects.vercel.app/api/products
   ```
   - If this works, backend is accessible ✅
   - If it fails, backend might be down ❌

2. Check browser console when frontend tries to fetch:
   - Open F12 → Network tab
   - Look for CORS error message
   - Status code will show if it's CORS (usually preflight OPTIONS request fails)

### Option 3: Verify Backend URL

Make sure your frontend is using the correct backend URL:
- Current: `https://backend-dehn-project-r1541ewf6-rathoryash7s-projects.vercel.app/api`

## Quick Test

Run this in browser console on your frontend page:

```javascript
fetch('https://backend-dehn-project-r1541ewf6-rathoryash7s-projects.vercel.app/api/products')
  .then(r => r.json())
  .then(console.log)
  .catch(err => {
    console.error('CORS or Network Error:', err);
    console.log('This confirms CORS is blocking the request');
  });
```

If you see a CORS error in console, the backend needs CORS configuration update.

## Next Steps

1. ✅ Contact backend developer or update backend CORS yourself
2. ✅ Add your frontend domain to allowed origins
3. ✅ Redeploy backend
4. ✅ Test frontend again

The error message is clear: **CORS is not configured correctly on your external backend**!

