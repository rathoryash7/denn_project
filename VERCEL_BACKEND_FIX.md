# Fix: Backend Not Running on Vercel

## Issue
The backend API functions are not working on Vercel serverless environment.

## Solution

### ✅ Step 1: Verify API Functions Structure

All API functions in the `/api` folder should export a default handler function:

```javascript
export default async function handler(req, res) {
  // Handle request
  return res.json({ success: true });
}
```

### ✅ Step 2: Check Dependencies

Ensure all backend dependencies are in the **root** `package.json` (not just `backend/package.json`):

```json
{
  "dependencies": {
    "mongoose": "^8.20.3",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.3",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.7"
  }
}
```

### ✅ Step 3: Test API Endpoints

After deploying, test these endpoints:

1. **Test Endpoint**: `https://your-app.vercel.app/api/test`
   - Should return: `{"success": true, "message": "Serverless function is working!"}`

2. **Health Check**: `https://your-app.vercel.app/api/health`
   - Should return database status

3. **Products**: `https://your-app.vercel.app/api/products`
   - Should return products or error message

### ✅ Step 4: Check Function Logs

1. Go to Vercel Dashboard → Your Project
2. Click **Functions** tab
3. Select a function (e.g., `/api/products`)
4. Check logs for errors

### ✅ Step 5: Verify File Structure

Your project structure should be:

```
/
├── api/
│   ├── test.js              ← Test endpoint
│   ├── health.js            ← Health check
│   ├── send-pdf-email.js    ← Email API
│   ├── auth/
│   │   ├── login.js
│   │   ├── register.js
│   │   └── me.js
│   └── products/
│       ├── index.js
│       └── [id].js
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Product.js
│   └── middleware/
├── src/                     ← Frontend React code
├── vercel.json              ← Vercel config
└── package.json             ← Root dependencies
```

### ✅ Step 6: Deploy Changes

1. Commit and push changes:
   ```bash
   git add .
   git commit -m "Fix backend serverless functions"
   git push
   ```

2. Vercel will automatically redeploy

3. Wait for deployment to complete

4. Test the `/api/test` endpoint

## Common Issues & Fixes

### Issue: 404 on API endpoints
**Fix**: Check `vercel.json` rewrites configuration

### Issue: Module not found errors
**Fix**: Ensure all dependencies are in root `package.json`

### Issue: Functions timeout
**Fix**: Check function logs, might be MongoDB connection issue

### Issue: CORS errors
**Fix**: Functions now include CORS headers automatically

## Next Steps

1. ✅ Test `/api/test` endpoint
2. ✅ Check function logs in Vercel dashboard
3. ✅ Verify environment variables are set
4. ✅ Test actual API endpoints (`/api/products`, etc.)

Your backend should now work as serverless functions on Vercel! 🚀

