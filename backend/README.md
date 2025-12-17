# Backend Server - Email Service

This backend server handles sending PDF emails when the print button is clicked on the notepad page.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure email settings:**
   
   **IMPORTANT:** Create a `.env` file in the backend directory with your email credentials:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   PORT=3001
   ```

   **For Gmail:**
   - You MUST use an App Password, not your regular password
   - Go to Google Account > Security > 2-Step Verification > App passwords
   - Generate an app password and use it in the `.env` file
   - Make sure 2-Step Verification is enabled on your Google account

   **Important Notes:**
   - The `.env` file must be in the `backend` folder
   - Do NOT commit the `.env` file to git (it's in .gitignore)
   - Replace `your-email@gmail.com` with your actual Gmail address
   - Replace `your-app-password` with your actual app password

3. **Start the server:**
   ```bash
   npm start
   ```

   You should see:
   ```
   Server is running on port 3001
   Health check: http://localhost:3001/api/health
   ```

4. **Test the server:**
   - Open http://localhost:3001/api/health in your browser
   - You should see: `{"status":"OK"}`

## How It Works

When a user clicks the "Print notepad" button:
1. The frontend generates a PDF from the notepad content
2. The PDF is automatically sent to `rathoryash1107@gmail.com`
3. The browser print dialog opens for the user to print if needed

## Troubleshooting

If emails are not sending:

1. **Check if server is running:**
   - Visit http://localhost:3001/api/health
   - Should return `{"status":"OK"}`

2. **Check email configuration:**
   - Make sure `.env` file exists in the `backend` folder
   - Verify EMAIL_USER and EMAIL_PASSWORD are set correctly
   - Check the server console for error messages

3. **Check Gmail App Password:**
   - Ensure 2-Step Verification is enabled
   - Generate a new App Password if needed
   - Make sure you're using the App Password, not your regular password

4. **Check server logs:**
   - Look at the console output when you click "Print notepad"
   - Error messages will help identify the issue

## API Endpoint

### POST `/api/send-pdf-email`
Sends a PDF file via email to the configured recipient.

**Request:**
- Content-Type: `multipart/form-data`
- Body:
  - `pdf` (file): PDF file to send
  - `recipientEmail` (string): Recipient email (defaults to rathoryash1107@gmail.com)
  - `subject` (string, optional): Email subject
  - `message` (string, optional): Email message

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "messageId": "..."
}
```
