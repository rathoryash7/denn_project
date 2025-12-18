# Vercel Deployment Troubleshooting Guide

## Issue: "Failed to load product" on Vercel

This guide helps you fix common deployment issues.

## ✅ Step 1: Check Environment Variables

**Most Common Issue**: MongoDB connection string is not configured.

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Ensure you have set:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dehn-project
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_EXPIRE=7d
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
DEFAULT_RECIPIENT_EMAIL=rathoryash1107@gmail.com
```

**Important**: 
- Replace `username` and `password` in `MONGODB_URI` with your actual MongoDB Atlas credentials
- Replace `<password>` placeholder in the connection string
- Make sure there are **no spaces** around the `=` sign
- Use MongoDB Atlas (cloud) connection string, not localhost

## ✅ Step 2: Set Up MongoDB Atlas

If you haven't set up MongoDB Atlas yet:

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a new cluster (free tier M0)
4. Create a database user:
   - Go to **Database Access** → **Add New Database User**
   - Username: `your-username`
   - Password: Generate a strong password (save it!)
   - Database User Privileges: **Read and write to any database**
5. Whitelist IP addresses:
   - Go to **Network Access** → **Add IP Address**
   - Click **Allow Access from Anywhere** (or add `0.0.0.0/0`)
   - Click **Confirm**
6. Get connection string:
   - Go to **Clusters** → Click **Connect** on your cluster
   - Choose **Connect your application**
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `dehn-project` (or your preferred database name)
   - Example: `mongodb+srv://username:password123@cluster0.xxxxx.mongodb.net/dehn-project?retryWrites=true&w=majority`

## ✅ Step 3: Verify API Endpoints

Test your API endpoints directly:

1. **Health Check**: `https://your-app.vercel.app/api/health`
   - Should return: `{"status":"OK","database":"connected",...}`

2. **Get Products**: `https://your-app.vercel.app/api/products`
   - Should return: `{"success":true,"count":X,"data":[...]}`

If you see errors:
- **404**: API routes not found - check `vercel.json` configuration
- **500 with "Database not configured"**: MongoDB URI not set
- **500 with "Database connection failed"**: MongoDB URI incorrect or IP not whitelisted

## ✅ Step 4: Check Vercel Function Logs

1. Go to Vercel Dashboard → Your Project → **Functions** tab
2. Click on a function (e.g., `/api/products`)
3. Check the logs for error messages
4. Common errors:
   - `MongoServerSelectionError`: Connection failed - check MongoDB URI and IP whitelist
   - `MongooseServerSelectionError`: Same as above
   - `Module not found`: Missing dependencies in `package.json`

## ✅ Step 5: Verify Package Dependencies

Make sure all backend dependencies are in root `package.json`:

```json
{
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "mongoose": "^8.20.3",
    "jsonwebtoken": "^9.0.3",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.7",
    ...
  }
}
```

## ✅ Step 6: Seed Database

After setting up MongoDB, seed your database:

**Option 1: Use MongoDB Atlas Web Interface**
1. Go to MongoDB Atlas → **Browse Collections**
2. Create database: `dehn-project`
3. Create collection: `products`
4. Click **Insert Document** and add a product manually

**Option 2: Use Local Script (Pointing to Atlas)**
1. Update your local `.env` file with MongoDB Atlas URI
2. Run: `cd backend && npm run seed`

**Option 3: Use Admin Dashboard**
1. Deploy your app first
2. Create an admin user (use create-admin script locally)
3. Log in to admin dashboard
4. Add products through the UI

## ✅ Step 7: Test Locally with Production Config

Test your API locally before deploying:

1. Create `.env.local` file in root:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dehn-project
JWT_SECRET=test-secret-key
```

2. Test API endpoint:
```bash
curl http://localhost:3001/api/products
```

## 🔍 Common Error Messages

### "Database not configured"
- **Fix**: Set `MONGODB_URI` environment variable in Vercel

### "Database connection failed"
- **Fix**: 
  - Check MongoDB Atlas IP whitelist
  - Verify connection string format
  - Check username/password are correct
  - Ensure database name is correct

### "Module not found: Can't resolve '../../backend/models/Product'"
- **Fix**: Make sure `backend/models` folder exists and files are committed to Git

### "Failed to load product" (Frontend)
- **Fix**: 
  - Check browser console for API errors
  - Verify API endpoints return data
  - Check MongoDB connection

### API returns 404
- **Fix**: Check `vercel.json` rewrites configuration

## 📝 Quick Checklist

- [ ] MongoDB Atlas account created
- [ ] Database user created with read/write permissions
- [ ] IP address whitelisted (0.0.0.0/0 or specific IPs)
- [ ] `MONGODB_URI` environment variable set in Vercel
- [ ] Connection string format is correct (no spaces, password replaced)
- [ ] Database has at least one product document
- [ ] API endpoints return data when tested directly
- [ ] Browser console shows no CORS errors

## 🆘 Still Having Issues?

1. **Check Vercel Function Logs**: Most errors are logged there
2. **Test API Directly**: Use browser or curl to test endpoints
3. **Verify Environment Variables**: Double-check spelling and values
4. **Check MongoDB Atlas**: Ensure cluster is running and accessible
5. **Review Error Messages**: They usually point to the exact issue

## 📞 Next Steps

Once your MongoDB is connected:
1. Seed your database with products
2. Create an admin user
3. Test all functionality
4. Monitor function logs for any issues

Your app should work once MongoDB is properly configured! 🎉

