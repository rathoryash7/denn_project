# Debug: "Failed to load product" Error

## Quick Debug Steps

### 1. Check Browser Console
Open browser Developer Tools (F12) and check:
- **Console tab**: Look for error messages
- **Network tab**: Check if API calls are being made and what responses you get

### 2. Test Backend Directly
Open these URLs in your browser:

1. **Health Check**: 
   ```
   https://backenddehnproject.vercel.app/api/health
   ```

2. **Products Endpoint**: 
   ```
   https://backenddehnproject.vercel.app/api/products
   ```

### 3. Common Issues

#### Issue 1: Backend Not Responding
**Symptom**: Network tab shows connection refused or timeout
**Fix**: 
- Check if backend is deployed: https://backenddehnproject.vercel.app
- Check backend deployment status on Vercel dashboard

#### Issue 2: CORS Error
**Symptom**: Console shows "CORS policy" error
**Fix**: Add CORS configuration to backend (see below)

#### Issue 3: 404 Error
**Symptom**: API endpoint returns 404
**Fix**: Check backend routes match frontend API calls

#### Issue 4: Database Connection Error
**Symptom**: Backend returns "Database connection failed"
**Fix**: Configure MONGODB_URI in backend Vercel project

## Backend CORS Fix

Update your backend `server.js`:

```javascript
import cors from 'cors';

app.use(cors({
  origin: [
    'https://denn-project-ah1e8unk6-rathoryash7s-projects.vercel.app',
    'https://your-production-domain.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true
}));
```

Or allow all origins (for testing):

```javascript
app.use(cors({
  origin: '*',
  credentials: true
}));
```

## Check Frontend API Configuration

The frontend should be calling:
- Production: `https://backenddehnproject.vercel.app/api/products`
- Development: `http://localhost:3001/api/products`

Check browser Network tab to verify the URL being called.

