# Quick Start: Deploy to Vercel

## Prerequisites
1. Vercel account (sign up at https://vercel.com)
2. MongoDB Atlas account (free tier available)
3. GitHub/GitLab/Bitbucket repository (recommended)

## Step 1: Push Code to Git

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push
```

## Step 2: Deploy on Vercel

1. Go to https://vercel.com/new
2. Import your Git repository
3. Vercel will auto-detect Vite configuration

## Step 3: Add Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dehn-project
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRE=7d
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
DEFAULT_RECIPIENT_EMAIL=rathoryash1107@gmail.com
```

## Step 4: Deploy

Click "Deploy" and wait for build to complete.

## Done! 🎉

Your app will be live at `https://your-project.vercel.app`

## Important Notes

- Use MongoDB Atlas for cloud database (free tier available)
- Use Gmail App Password (not regular password) for email
- All API routes are at `/api/*`
- Frontend automatically uses relative URLs in production

## Troubleshooting

- **Build fails?** Check build logs in Vercel dashboard
- **API not working?** Verify environment variables are set
- **Database errors?** Check MongoDB Atlas connection string and IP whitelist
- **Email not sending?** Verify SMTP credentials (use App Password)

