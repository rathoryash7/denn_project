# Test Backend Connection

## Quick Tests

### Test 1: Direct Browser Access

Open these URLs directly in your browser:

1. **Backend Root:**
   ```
   https://backend-dehn-project-r1541ewf6-rathoryash7s-projects.vercel.app/
   ```
   ✅ Should show: `{"message":"Backend API is running",...}`

2. **Health Check:**
   ```
   https://backend-dehn-project-r1541ewf6-rathoryash7s-projects.vercel.app/api/health
   ```
   ✅ Should show: `{"status":"OK",...}`

3. **Products:**
   ```
   https://backend-dehn-project-r1541ewf6-rathoryash7s-projects.vercel.app/api/products
   ```
   ✅ Should show: `{"success":true,"data":[...]}`

### Test 2: Browser Console Test

On your frontend page, press **F12** and run:

```javascript
// Test 1: Simple fetch
fetch('https://backend-dehn-project-r1541ewf6-rathoryash7s-projects.vercel.app/api/health')
  .then(r => {
    console.log('Status:', r.status);
    return r.json();
  })
  .then(data => console.log('✅ Success:', data))
  .catch(err => {
    console.error('❌ Error:', err);
    console.log('Error type:', err.name);
    console.log('Error message:', err.message);
  });
```

**Expected Results:**
- ✅ **If working**: You'll see `{status: "OK", ...}`
- ❌ **If CORS error**: You'll see `TypeError: Failed to fetch` or CORS policy error
- ❌ **If network error**: Connection timeout or DNS error

### Test 3: Check Network Tab

1. Open Developer Tools (F12)
2. Go to **Network** tab
3. Refresh your frontend page
4. Look for request to `backend-dehn-project-r1541ewf6-rathoryash7s-projects.vercel.app`
5. Check:
   - **Status**: What HTTP status code? (200 = good, CORS errors show as blocked)
   - **Response**: What does it say?
   - **Headers**: Look for `Access-Control-Allow-Origin` header (should include your frontend domain)

## Diagnosis

### If Direct Browser Access Works ✅
- Backend is accessible
- Issue is **CORS** - backend needs to allow your frontend domain

### If Direct Browser Access Fails ❌
- Backend might be down or URL is wrong
- Check backend deployment status

### If Console Shows CORS Error
- Backend is accessible but blocking requests
- **Solution**: Update backend CORS configuration (see CORS_FIX_INSTRUCTIONS.md)

