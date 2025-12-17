# PHP Email Service Setup Guide

This guide explains how to set up the PHP email service to replace the Node.js backend.

## Prerequisites

- PHP 7.4 or higher
- Composer (PHP dependency manager)
- Web server with PHP support (Apache/Nginx)
- SMTP credentials (Gmail App Password recommended)

## Installation Steps

### 1. Install Composer (if not already installed)

**Windows:**
- Download and run the installer from https://getcomposer.org/download/
- Or use: `php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"`
- Then: `php composer-setup.php` and `php composer.phar install`

**Linux/Mac:**
```bash
curl -sS https://getcomposer.org/installer | php
php composer.phar install
```

### 2. Install PHPMailer

From the project root directory, run:
```bash
composer install
```

Or if composer is installed globally:
```bash
composer require phpmailer/phpmailer
```

### 3. Configure Environment Variables

Create a `.env` file in the project root (same directory as `composer.json`):

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FROM_NAME=DEHN
```

**Important:** 
- For Gmail, use an **App Password**, not your regular password
- To generate a Gmail App Password:
  1. Go to Google Account settings
  2. Security → 2-Step Verification → App passwords
  3. Generate a password for "Mail"
  4. Use the 16-character password (remove spaces)

### 4. Update Frontend API Endpoint

The frontend code in `src/pages/NotepadPage.jsx` needs to be updated to point to the PHP endpoint instead of the Node.js backend.

Change the fetch URL from:
```javascript
const response = await fetch('http://localhost:3001/api/send-pdf-email', {
```

To:
```javascript
const response = await fetch('/api/send-pdf-email.php', {
```

Or if using a different domain:
```javascript
const response = await fetch('https://yourdomain.com/api/send-pdf-email.php', {
```

### 5. Web Server Configuration

#### Apache
- Ensure `mod_php` and `mod_rewrite` are enabled
- The `.htaccess` file in the `api/` directory should handle CORS and file uploads
- Upload limit should be at least 20MB for PDF files

#### Nginx
Add to your Nginx configuration:
```nginx
location /api {
    try_files $uri $uri/ =404;
    fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
    fastcgi_index index.php;
    include fastcgi_params;
    fastcgi_param PHP_VALUE "upload_max_filesize=20M \n post_max_size=20M";
}
```

### 6. Test the Setup

1. Start your web server (or use PHP built-in server for testing):
   ```bash
   php -S localhost:8000
   ```

2. Test the endpoint:
   ```bash
   curl -X POST http://localhost:8000/api/send-pdf-email.php \
     -F "pdf=@test.pdf" \
     -F "recipientEmail=test@example.com" \
     -F "subject=Test Email" \
     -F "message=Test message"
   ```

3. Check the response - it should return JSON with `{"success": true, ...}`

## File Structure

```
project-root/
├── api/
│   ├── send-pdf-email.php  # Main PHP email endpoint
│   └── .htaccess           # Apache configuration
├── vendor/                 # Composer dependencies (generated)
├── .env                    # Environment variables (create this)
├── composer.json           # PHP dependencies
└── composer.lock           # Dependency lock file
```

## Troubleshooting

### Error: "PHPMailer library not found"
- Run `composer install` from the project root
- Ensure `vendor/autoload.php` exists

### Error: "Email service not configured"
- Check that `.env` file exists and has correct values
- Ensure EMAIL_USER and EMAIL_PASSWORD are set
- Remove any spaces or quotes around values in `.env`

### Error: "SMTP connect() failed"
- Verify SMTP_HOST and SMTP_PORT are correct
- For Gmail: Use `smtp.gmail.com` and port `587`
- Check firewall settings
- Verify you're using an App Password, not regular password

### Error: "Invalid file type"
- Ensure the uploaded file is a PDF
- Check file upload size limits in PHP configuration

### CORS Issues
- The `.htaccess` file should handle CORS
- If using Nginx, add CORS headers to your configuration
- For production, restrict `Access-Control-Allow-Origin` to your domain

## Production Deployment

1. **Security:**
   - Move `.env` file outside web root or restrict access
   - Restrict CORS to specific domains
   - Use HTTPS for API calls

2. **Performance:**
   - Consider using a queue system for email sending
   - Implement rate limiting
   - Add logging for debugging

3. **Monitoring:**
   - Set up error logging
   - Monitor email delivery rates
   - Track failed sends

## Migrating from Node.js Backend

If you were using the Node.js backend:

1. Stop the Node.js server
2. Follow the setup steps above
3. Update the frontend API endpoint
4. Test thoroughly before deploying

The Node.js backend files can be kept as backup or removed if no longer needed.

