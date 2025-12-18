# Backend Separate Deployment Setup

## Architecture

Your backend is deployed separately at:
**https://backenddehnproject.vercel.app**

The frontend (this project) connects to this external backend.

## ✅ Changes Made

1. **Updated `src/config/api.js`**:
   - Production: Uses `https://backenddehnproject.vercel.app/api`
   - Development: Uses `http://localhost:3001/api`

2. **Updated `src/pages/NotepadPage.jsx`**:
   - Email endpoint now uses the deployed backend URL in production

## 📁 Backend Structure

Your backend folder should have these endpoints:

```
https://backenddehnproject.vercel.app/api/
├── /health
├── /auth/login
├── /auth/register
├── /auth/me
├── /products
├── /products/:id
├── /products/admin/all
└── /send-pdf-email
```

## ✅ Verification

### 1. Test Backend Endpoints

Test your deployed backend:

```bash
# Health check
curl https://backenddehnproject.vercel.app/api/health

# Get products
curl https://backenddehnproject.vercel.app/api/products

# Test endpoint (if exists)
curl https://backenddehnproject.vercel.app/api/test
```

### 2. Verify Frontend Connection

After deploying frontend, check browser console:
- Should see API calls to `https://backenddehnproject.vercel.app/api/...`
- No CORS errors

### 3. Common Issues

#### CORS Errors
If you see CORS errors, add CORS headers to your backend:

```javascript
// In your backend server.js
app.use(cors({
  origin: [
    'https://your-frontend.vercel.app',
    'http://localhost:5173', // Vite dev server
    'http://localhost:3000'  // Alternative dev port
  ],
  credentials: true
}));
```

#### 404 Errors
- Verify backend endpoints match the frontend API calls
- Check backend is actually deployed and running

#### Connection Refused
- Verify backend URL is correct
- Check backend deployment status on Vercel

## 🔧 Backend Configuration

Your backend should have:

1. **Environment Variables** (set in backend Vercel project):
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `EMAIL_USER`
   - `EMAIL_PASSWORD`
   - `SMTP_HOST`
   - `SMTP_PORT`

2. **CORS Configuration**:
   ```javascript
   const allowedOrigins = [
     'https://your-frontend.vercel.app',
     'http://localhost:5173'
   ];
   
   app.use(cors({
     origin: function (origin, callback) {
       if (!origin || allowedOrigins.indexOf(origin) !== -1) {
         callback(null, true);
       } else {
         callback(new Error('Not allowed by CORS'));
       }
     },
     credentials: true
   }));
   ```

## 📝 Next Steps

1. ✅ Frontend updated to use external backend
2. ⬜ Verify backend CORS is configured for your frontend domain
3. ⬜ Test all API endpoints
4. ⬜ Deploy frontend changes
5. ⬜ Test full integration

## 🎯 Frontend API Calls

All API calls from frontend now use:
- **Production**: `https://backenddehnproject.vercel.app/api/...`
- **Development**: `http://localhost:3001/api/...`

No local serverless functions needed! ✅

