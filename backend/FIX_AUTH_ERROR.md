# Fix Authentication Error

## The Problem
You're getting an "Authentication failed" error when trying to send emails.

## Common Causes:

1. **Using Regular Password Instead of App Password**
   - Gmail requires an App Password for third-party applications
   - Your regular Gmail password will NOT work

2. **Incorrect .env File Format**
   - Spaces in the password
   - Wrong SMTP_HOST
   - Extra characters or quotes

3. **2-Step Verification Not Enabled**
   - App Passwords require 2-Step Verification to be enabled

## Solution Steps:

### Step 1: Enable 2-Step Verification (if not already enabled)
1. Go to https://myaccount.google.com/security
2. Under "Signing in to Google", click "2-Step Verification"
3. Follow the prompts to enable it

### Step 2: Generate App Password
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" as the app
3. Select "Other (Custom name)" as the device
4. Enter a name like "DEHN Project"
5. Click "Generate"
6. Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)

### Step 3: Update backend/.env File
Make sure your `backend/.env` file looks exactly like this (no spaces, no quotes):

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
PORT=3001
```

**Important:**
- Remove ALL spaces from the App Password
- Example: If Google gives you `abcd efgh ijkl mnop`, use `abcdefghijklmnop`
- NO quotes around values
- NO extra periods or spaces

### Step 4: Restart Backend Server
After updating the .env file:

1. Stop the backend server (Ctrl+C)
2. Start it again:
   ```bash
   cd backend
   npm start
   ```

3. Try sending an email again

## Verify Your Configuration:

Your `.env` file should have:
- ✅ `SMTP_HOST=smtp.gmail.com` (NOT your email address!)
- ✅ `EMAIL_USER=youractualemail@gmail.com` (your Gmail address)
- ✅ `EMAIL_PASSWORD=16characterapppassword` (NO spaces!)
- ✅ `PORT=3001`

## Still Having Issues?

Check the backend console output for more detailed error messages. Common issues:
- "EAUTH" error = Wrong password or not using App Password
- "ECONNECTION" error = SMTP_HOST or SMTP_PORT incorrect
- Check that the backend server is actually reading the .env file (restart after changes)

