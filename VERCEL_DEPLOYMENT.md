# Vercel Deployment Guide

This guide explains how to deploy your DEHN project to Vercel.

## Prerequisites

1. Vercel account (sign up at https://vercel.com)
2. MongoDB Atlas account (for cloud database) or MongoDB connection string
3. All environment variables ready

## Step 1: Prepare Your Code

The codebase has been updated for Vercel deployment:

- ✅ Backend routes converted to serverless functions in `/api` folder
- ✅ File uploads use memory storage (no disk access)
- ✅ MongoDB connection with caching for serverless
- ✅ API URLs automatically detect environment (development vs production)

## Step 2: Set Up MongoDB Atlas (Recommended)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Replace `<password>` with your database password
5. Add your IP address to the whitelist (or use `0.0.0.0/0` for all IPs - less secure)

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push
   ```

2. **Import project on Vercel**
   - Go to https://vercel.com/new
   - Import your repository
   - Vercel will auto-detect it's a Vite project

3. **Configure environment variables**
   In Vercel project settings → Environment Variables, add:
   
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dehn-project
   JWT_SECRET=your-super-secret-jwt-key-min-32-chars
   JWT_EXPIRE=7d
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   DEFAULT_RECIPIENT_EMAIL=rathoryash1107@gmail.com
   NODE_ENV=production
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add environment variables**
   ```bash
   vercel env add MONGODB_URI
   vercel env add JWT_SECRET
   vercel env add EMAIL_USER
   vercel env add EMAIL_PASSWORD
   # ... add all other variables
   ```

5. **Deploy to production**
   ```bash
   vercel --prod
   ```

## Step 4: Update API Endpoints (Already Done)

The code has been updated to automatically use:
- Relative URLs (`/api/...`) in production (Vercel)
- `http://localhost:3001/api/...` in development

No manual changes needed!

## Step 5: Verify Deployment

1. Visit your Vercel deployment URL
2. Test the application:
   - Login/Register
   - View products
   - Add products to notepad
   - Admin dashboard (if you have admin access)

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-secret-key-change-in-production` |
| `JWT_EXPIRE` | JWT token expiration | `7d` |
| `SMTP_HOST` | SMTP server hostname | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP server port | `587` |
| `EMAIL_USER` | Email address for sending | `your-email@gmail.com` |
| `EMAIL_PASSWORD` | App password (not regular password) | `your-app-password` |
| `DEFAULT_RECIPIENT_EMAIL` | Default email recipient | `rathoryash1107@gmail.com` |

## Important Notes

### 1. MongoDB Connection
- Use MongoDB Atlas for cloud hosting
- Connection string format: `mongodb+srv://username:password@cluster.mongodb.net/database-name`
- Make sure to whitelist Vercel IP addresses (or use `0.0.0.0/0`)

### 2. File Uploads
- Changed to memory storage (no disk access in serverless)
- File size limit: 10MB (configurable in `api/send-pdf-email.js`)

### 3. Serverless Functions
- All API routes are now serverless functions in `/api` folder
- Cold starts may occur on first request
- Connection pooling is handled automatically

### 4. Build Process
- Frontend builds using Vite
- Output directory: `dist`
- Serverless functions are automatically detected

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify Node.js version (Vercel uses Node 18+ by default)
- Check build logs in Vercel dashboard

### API Routes Not Working
- Verify environment variables are set
- Check function logs in Vercel dashboard
- Ensure MongoDB connection string is correct

### MongoDB Connection Issues
- Verify connection string format
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

### Email Not Sending
- Verify SMTP credentials
- Check that you're using App Password (not regular password)
- Review function logs for errors

## File Structure for Vercel

```
/
├── api/                    # Serverless functions
│   ├── send-pdf-email.js
│   ├── health.js
│   ├── auth/
│   │   ├── login.js
│   │   ├── register.js
│   │   └── me.js
│   └── products/
│       ├── index.js
│       └── [id].js
├── backend/                # Shared models and middleware
│   ├── models/
│   └── middleware/
├── src/                    # React frontend
├── dist/                   # Build output (generated)
├── vercel.json            # Vercel configuration
├── package.json
└── vite.config.js
```

## Next Steps After Deployment

1. **Seed your database**
   - Run the seed script locally pointing to your MongoDB Atlas database
   - Or manually add products through admin dashboard

2. **Create admin user**
   - Use the create-admin script locally
   - Or register and update user role in MongoDB

3. **Custom Domain (Optional)**
   - Add your custom domain in Vercel project settings
   - Configure DNS records

4. **Monitor**
   - Check Vercel Analytics
   - Monitor function logs
   - Set up error tracking if needed

## Support

For Vercel-specific issues:
- Vercel Documentation: https://vercel.com/docs
- Vercel Community: https://github.com/vercel/vercel/discussions

For application issues:
- Check function logs in Vercel dashboard
- Review MongoDB Atlas logs
- Check browser console for frontend errors

