# Backend Server Setup - Real PDF Attachments

## Quick Setup Guide

### Step 1: Start Backend Server

Open terminal in the `backend` folder:

```bash
cd backend
npm start
```

You should see: `Server is running on port 3001`

**Keep this terminal open!** The server must be running for emails to work.

### Step 2: Configure Email

Create `backend/.env` file with your Gmail credentials:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
PORT=3001
```

### Step 3: Get Gmail App Password

1. Go to: https://myaccount.google.com/apppasswords
2. Enable "2-Step Verification" (if needed)
3. Generate App Password for "Mail"
4. Copy the 16-character password
5. Paste in `backend/.env` file

### Step 4: Restart Backend

After creating/editing `.env` file:

```bash
npm start
```

## That's It! ✅

Now when you click "Print notepad":
- PDF is generated with full quality
- Sent as **real file attachment** (not a link!)
- No size limits
- Works with all email clients

## Troubleshooting

**"Failed to fetch" error:**
- Make sure backend server is running (`npm start` in backend folder)
- Check that it shows: "Server is running on port 3001"

**"Email service not configured":**
- Check that `backend/.env` file exists
- Verify EMAIL_USER and EMAIL_PASSWORD are set correctly
- Make sure you're using App Password, not regular password

**Email not received:**
- Check spam folder
- Verify recipient email: rathoryash1107@gmail.com
- Check backend console for error messages

## Benefits of Backend Approach

✅ **Real file attachments** (not links)  
✅ **No size limits** (unlike EmailJS 50KB limit)  
✅ **Full PDF quality** (no compression needed)  
✅ **Works with all email clients**  
✅ **Free to use** (just need Gmail account)

