# Setup: Separate Backend Deployment

## ✅ Configuration Complete

Your frontend is now configured to use your separate backend deployment:
**https://backenddehnproject.vercel.app**

## 📋 What Changed

1. **`src/config/api.js`** - Updated to use external backend URL
2. **`src/pages/NotepadPage.jsx`** - Email endpoint updated
3. **`vercel.json`** - Removed unnecessary API routes (backend is separate)

## ⚠️ Important: Backend CORS Configuration

Your backend must allow requests from your frontend domain. Add this to your backend `server.js`:

```javascript
import cors from 'cors';

const allowedOrigins = [
  'https://your-frontend-app.vercel.app',  // Replace with your frontend Vercel URL
  'http://localhost:5173',                  // Vite dev server
  'http://localhost:3000'                   // Alternative dev port
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

Or allow all origins (less secure, for testing):

```javascript
app.use(cors({
  origin: '*',
  credentials: true
}));
```

## 🧪 Testing

### 1. Test Backend

```bash
# Health check
curl https://backenddehnproject.vercel.app/api/health

# Products
curl https://backenddehnproject.vercel.app/api/products
```

### 2. Test Frontend

After deploying frontend:
1. Open browser console
2. Check Network tab
3. Verify API calls go to `backenddehnproject.vercel.app`
4. Check for CORS errors

### 3. Fix CORS if Needed

If you see CORS errors:
1. Update backend CORS configuration
2. Add your frontend domain to allowed origins
3. Redeploy backend

## 📝 Environment Variables

### Frontend (this project)
- No API-related env vars needed (using hardcoded backend URL)

### Backend (separate project)
Set these in backend Vercel project:
- `MONGODB_URI`
- `JWT_SECRET`
- `EMAIL_USER`
- `EMAIL_PASSWORD`
- `SMTP_HOST`
- `SMTP_PORT`
- `DEFAULT_RECIPIENT_EMAIL`

## ✅ Deployment Checklist

### Frontend
- [x] API configuration updated
- [ ] Deploy frontend to Vercel
- [ ] Test frontend connects to backend
- [ ] Verify no CORS errors

### Backend
- [ ] CORS configured for frontend domain
- [ ] Environment variables set
- [ ] Backend deployed and accessible
- [ ] Test backend endpoints work

## 🚀 Deploy

1. **Commit changes**:
   ```bash
   git add .
   git commit -m "Configure frontend to use separate backend deployment"
   git push
   ```

2. **Deploy frontend** (auto-deploys on push to Vercel)

3. **Update backend CORS** if needed:
   - Add your frontend Vercel URL to allowed origins
   - Redeploy backend

4. **Test everything**:
   - Frontend loads
   - Products load
   - Login works
   - Email sending works

## 🎯 Result

- ✅ Frontend: Deployed separately
- ✅ Backend: Deployed separately at `backenddehnproject.vercel.app`
- ✅ Frontend connects to external backend
- ✅ Clean separation of concerns

Your frontend will now call your separate backend! 🎉

