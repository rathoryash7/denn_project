# Fix Backend for Vercel Deployment

## Problem
"Failed to fetch" means your backend Express app needs to be configured for Vercel serverless functions.

## ✅ Fix Applied

1. **Created `backend/vercel.json`** - Vercel configuration for Express app
2. **Updated `backend/server.js`** - Export app as default export for Vercel

## 📝 Next Steps

### 1. Commit and Push Backend Changes

```bash
cd backend
git add .
git commit -m "Configure backend for Vercel serverless deployment"
git push
```

### 2. Verify Backend Deployment

After pushing, check:
1. Vercel Dashboard → Backend project
2. Deployment should complete successfully
3. Visit: `https://backenddehnproject.vercel.app/api/health`
4. Should return: `{"status":"OK","database":"connected",...}`

### 3. Test from Frontend

Once backend is deployed:
1. Frontend should now connect successfully
2. Products should load
3. No more "Failed to fetch" error

## 🔍 If Still Not Working

### Check Backend Logs
1. Vercel Dashboard → Backend project → Functions/Logs
2. Look for startup errors
3. Check if server.js is being executed

### Verify Backend URL
Make sure frontend is calling:
- `https://backenddehnproject.vercel.app/api/products`

### Test Backend Directly
```bash
curl https://backenddehnproject.vercel.app/api/health
```

Should return JSON response, not an error page.

## Key Changes

**backend/vercel.json** - Tells Vercel to use Node.js runtime for server.js
**backend/server.js** - Exports app as default export (required for Vercel)

Your backend should now work as a Vercel serverless function! 🚀

