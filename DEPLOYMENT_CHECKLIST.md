# Vercel Deployment Checklist

## ✅ Completed Changes

1. **Created Serverless API Functions**
   - ✅ `/api/send-pdf-email.js` - Email sending with memory storage
   - ✅ `/api/auth/login.js` - User login
   - ✅ `/api/auth/register.js` - User registration
   - ✅ `/api/auth/me.js` - Get current user
   - ✅ `/api/products/index.js` - List/Create products
   - ✅ `/api/products/[id].js` - Get/Update/Delete product
   - ✅ `/api/products/admin/all.js` - Admin: Get all products
   - ✅ `/api/health.js` - Health check

2. **Updated Configuration**
   - ✅ `vercel.json` - Vercel configuration
   - ✅ `package.json` - Added backend dependencies
   - ✅ `vite.config.js` - Base path set to `/` for Vercel
   - ✅ `src/config/api.js` - Automatic API URL detection

3. **Updated Frontend**
   - ✅ All API calls now use relative URLs in production
   - ✅ API base URL automatically switches between dev/prod

## 📋 Pre-Deployment Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up MongoDB Atlas (Recommended)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Replace `<password>` with your password
5. Whitelist IP `0.0.0.0/0` (or specific Vercel IPs)

### 3. Prepare Environment Variables
Create a `.env.local` file for testing, then add these to Vercel:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dehn-project
JWT_SECRET=your-super-secret-jwt-key-min-32-chars-please-change-this
JWT_EXPIRE=7d
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
DEFAULT_RECIPIENT_EMAIL=rathoryash1107@gmail.com
```

## 🚀 Deploy to Vercel

### Option 1: Via Vercel Dashboard (Recommended)

1. **Push to Git**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push
   ```

2. **Import on Vercel**
   - Go to https://vercel.com/new
   - Connect your Git repository
   - Vercel will auto-detect Vite

3. **Add Environment Variables**
   - Project Settings → Environment Variables
   - Add all variables from step 3 above

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variables (repeat for each)
vercel env add MONGODB_URI
vercel env add JWT_SECRET
# ... add all variables

# Deploy to production
vercel --prod
```

## ✅ Post-Deployment Checklist

- [ ] Verify deployment URL works
- [ ] Test login/register
- [ ] Test product listing
- [ ] Test admin dashboard (if admin user exists)
- [ ] Test email sending
- [ ] Check MongoDB connection
- [ ] Verify all API endpoints work
- [ ] Test protected routes

## 🔧 Troubleshooting

### Build Fails
- Check Node.js version (Vercel uses Node 18+)
- Verify all dependencies are in `package.json`
- Check build logs in Vercel dashboard

### API Routes Return 404
- Verify `vercel.json` configuration
- Check that files are in `/api` folder
- Ensure file exports default handler function

### MongoDB Connection Fails
- Verify `MONGODB_URI` is correct
- Check IP whitelist in MongoDB Atlas
- Ensure username/password are URL-encoded if special characters

### Email Not Sending
- Verify `EMAIL_USER` and `EMAIL_PASSWORD`
- Ensure using Gmail App Password (not regular password)
- Check function logs in Vercel dashboard

## 📝 Notes

- File uploads use memory storage (no disk access in serverless)
- MongoDB connections are cached for better performance
- API URLs automatically switch between dev/prod
- Base path is `/` (root) - change if deploying to subpath

## 📚 Documentation

- Full deployment guide: `VERCEL_DEPLOYMENT.md`
- Quick start: `VERCEL_QUICK_START.md`

