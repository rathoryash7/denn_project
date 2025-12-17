# PHP Email API

This directory contains the PHP email service for sending PDF attachments.

## Quick Setup

1. **Install Composer dependencies:**
   ```bash
   composer install
   ```

2. **Create `.env` file in project root:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   FROM_NAME=DEHN
   ```

3. **Test the endpoint:**
   ```bash
   php -S localhost:8000
   ```

## Files

- `send-pdf-email.php` - Main email sending endpoint
- `.htaccess` - Apache configuration for CORS and file uploads

## API Endpoint

**URL:** `/api/send-pdf-email.php`

**Method:** POST

**Content-Type:** multipart/form-data

**Parameters:**
- `pdf` (file) - PDF file to attach
- `recipientEmail` (string) - Recipient email address
- `subject` (string) - Email subject
- `message` (string) - Email body (HTML or plain text)

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "recipient": "email@example.com"
}
```

For detailed setup instructions, see `README_PHP_SETUP.md` in the project root.

