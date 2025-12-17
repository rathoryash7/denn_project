# Fix Your .env File

Your `.env` file has some errors. Here's what to fix:

## Current Issues:

1. ❌ `SMTP_HOST=yashrathore20027@gmail.com` - WRONG! Should be `smtp.gmail.com`
2. ❌ `EMAIL_USER=yashrathore20027@gmail.com.` - Has extra period at end
3. ❌ `EMAIL_PASSWORD=rxbv vxzs wqwo kxuh` - Has spaces (remove them)

## Correct .env File:

Update `backend/.env` to:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_USER=yashrathore20027@gmail.com
EMAIL_PASSWORD=rxbvxzs wqwokxuh
PORT=3001
```

**Important:**
- SMTP_HOST must be `smtp.gmail.com` (not your email address!)
- EMAIL_USER should be your email without the period
- EMAIL_PASSWORD should have NO spaces (remove all spaces from the App Password)

After fixing, restart the backend server:
```bash
npm start
```

