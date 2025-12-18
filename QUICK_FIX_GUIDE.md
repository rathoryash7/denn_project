# Quick Fix: Backend Not Connecting to Frontend

## The Problem
Your frontend cannot connect to your backend because of CORS (Cross-Origin Resource Sharing) restrictions.

## Quick Solution

### Step 1: Open Your External Backend Code
Go to your backend repository/project where `server.js` or `index.js` is located.

### Step 2: Find CORS Configuration
Search for `cors` in your backend code. You'll find something like:
```javascript
app.use(cors());
```
or
```javascript
app.use(cors({ origin: '*' }));
```

### Step 3: Replace With This Code

**Delete the old CORS configuration and replace with:**

```javascript
import cors from 'cors';

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (origin.includes('.vercel.app')) return callback(null, true);
    if (origin.includes('localhost')) return callback(null, true);
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // THIS LINE IS CRITICAL!
```

### Step 4: Deploy Backend

```bash
git add .
git commit -m "Fix CORS - Allow frontend to connect"
git push
```

### Step 5: Wait & Test

1. Wait for backend to redeploy (1-2 minutes)
2. Refresh your frontend
3. Should work! ✅

## Why This Works

- **Allows Vercel domains**: `origin.includes('.vercel.app')` allows all your frontend preview URLs
- **Handles preflight**: `app.options('*', cors(corsOptions))` handles OPTIONS requests
- **Works with credentials**: Properly configured for authentication

## Still Not Working?

1. **Check backend logs** on Vercel dashboard
2. **Verify backend deployed** successfully
3. **Clear browser cache** and try again
4. **Check Network tab** in browser DevTools (F12)

The backend MUST be updated with this CORS configuration for the frontend to connect!

