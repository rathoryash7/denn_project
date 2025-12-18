# Debug "Failed to fetch" Error

## Quick Debug Steps

### Step 1: Check Browser Console (CRITICAL)

1. Press **F12** to open Developer Tools
2. Go to **Console** tab
3. Look for error messages - they will show the exact issue
4. Go to **Network** tab
5. Refresh the page
6. Look for requests to `backend-dehn-project-r1541ewf6-rathoryash7s-projects.vercel.app`
7. Click on the failed request and check:
   - **Status code** (404, 500, CORS error?)
   - **Response** (what error message?)

### Step 2: Test Backend Directly

Open these URLs directly in your browser:

1. **Backend Root:**
   ```
   https://backend-dehn-project-r1541ewf6-rathoryash7s-projects.vercel.app/
   ```
   Should show: `{"message":"Backend API is running",...}`

2. **Health Check:**
   ```
   https://backend-dehn-project-r1541ewf6-rathoryash7s-projects.vercel.app/api/health
   ```
   Should show: `{"status":"OK","database":"connected",...}`

3. **Products:**
   ```
   https://backend-dehn-project-r1541ewf6-rathoryash7s-projects.vercel.app/api/products
   ```
   Should show: `{"success":true,"count":X,"data":[...]}`

### Step 3: Test from Browser Console

On your frontend page, open console (F12) and run:

```javascript
// Test backend connection
fetch('https://backend-dehn-project-r1541ewf6-rathoryash7s-projects.vercel.app/api/products')
  .then(r => {
    console.log('Status:', r.status);
    return r.json();
  })
  .then(data => console.log('Response:', data))
  .catch(err => console.error('Error:', err));
```

This will show you exactly what's happening!

## Common Issues & Fixes

### Issue 1: CORS Error
**Symptom**: Console shows "CORS policy" error

**Fix**: Your external backend needs to allow your frontend domain. Ask your backend developer to add CORS:

```javascript
app.use(cors({
  origin: [
    'https://denn-project-*.vercel.app',  // Your frontend domain
    'http://localhost:5173'
  ],
  credentials: true
}));
```

### Issue 2: Backend Not Responding
**Symptom**: Network tab shows connection timeout or 502/503 error

**Fix**: 
- Check if backend is deployed and running
- Verify backend URL is correct
- Check backend logs on Vercel

### Issue 3: 404 Error
**Symptom**: Network tab shows 404

**Fix**: Check if backend routes match. Should have:
- `/api/products`
- `/api/health`
- `/api/auth/*`

### Issue 4: Wrong URL
**Symptom**: Network tab shows requests going to wrong URL

**Fix**: Verify `src/config/api.js` has correct backend URL

## Current Configuration

Your frontend is configured to use:
- **Production**: `https://backend-dehn-project-r1541ewf6-rathoryash7s-projects.vercel.app/api`
- **Development**: `http://localhost:3001/api`

## Most Likely Issue

Since the backend shows it's running, the most likely issue is **CORS**. Your external backend needs to allow requests from your frontend domain.

Ask your backend developer to add your frontend domain to CORS allowed origins!

