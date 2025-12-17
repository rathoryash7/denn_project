<?php
/**
 * Send PDF Email API Endpoint
 * Handles sending PDF attachments via email using PHPMailer
 * 
 * Requirements:
 * - PHPMailer library (install via Composer: composer require phpmailer/phpmailer)
 * - PHP 7.4 or higher
 * - SMTP credentials configured in environment variables or .env file
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit();
}

// Load environment variables from .env file if it exists
// Load environment variables from .env file if it exists
// Supports both .env in project root and api/.env
$envFiles = [
    __DIR__ . '/../.env',
    __DIR__ . '/.env'
];

foreach ($envFiles as $envFile) {
    if (file_exists($envFile)) {
        $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            $line = trim($line);
            if (empty($line) || strpos($line, '#') === 0) continue; // Skip empty lines and comments
            if (strpos($line, '=') === false) continue; // Skip invalid lines
            list($key, $value) = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value);
            // Remove quotes if present
            $value = trim($value, '"\'');
            $_ENV[$key] = $value;
        }
        break; // Use first found .env file
    }
}

// Get email configuration from environment variables or use defaults
$smtpHost = $_ENV['SMTP_HOST'] ?? 'smtp.gmail.com';
$smtpPort = (int)($_ENV['SMTP_PORT'] ?? 587);
$emailUser = $_ENV['EMAIL_USER'] ?? '';
$emailPassword = $_ENV['EMAIL_PASSWORD'] ?? '';
$fromEmail = $_ENV['EMAIL_USER'] ?? 'noreply@example.com';
$fromName = $_ENV['FROM_NAME'] ?? 'DEHN';

// Validate email configuration
if (empty($emailUser) || empty($emailPassword)) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Email service not configured. Please set EMAIL_USER and EMAIL_PASSWORD in .env file or environment variables.'
    ]);
    exit();
}

// Check if PHPMailer is available
if (!class_exists('PHPMailer\PHPMailer\PHPMailer')) {
    // Try to autoload PHPMailer if installed via Composer
    $autoloadPath = __DIR__ . '/../vendor/autoload.php';
    if (file_exists($autoloadPath)) {
        require_once $autoloadPath;
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'PHPMailer library not found. Please install via Composer: composer require phpmailer/phpmailer'
        ]);
        exit();
    }
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

try {
    // Validate uploaded file
    if (!isset($_FILES['pdf']) || $_FILES['pdf']['error'] !== UPLOAD_ERR_OK) {
        throw new Exception('PDF file is required and must be uploaded successfully');
    }

    $pdfFile = $_FILES['pdf'];
    
    // Validate file type
    $allowedTypes = ['application/pdf'];
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mimeType = finfo_file($finfo, $pdfFile['tmp_name']);
    finfo_close($finfo);
    
    if (!in_array($mimeType, $allowedTypes)) {
        throw new Exception('Invalid file type. Only PDF files are allowed.');
    }

    // Get form data
    $recipientEmail = $_POST['recipientEmail'] ?? 'rathoryash1107@gmail.com';
    $subject = $_POST['subject'] ?? 'Dealer Quotation Request – Domeq';
    $message = $_POST['message'] ?? 'Please find the quotation PDF attached.';

    // Validate recipient email
    if (empty($recipientEmail) || !filter_var($recipientEmail, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid recipient email address');
    }

    // Initialize PHPMailer
    $mail = new PHPMailer(true);

    // SMTP Configuration
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->SMTPAuth = true;
    $mail->Username = $emailUser;
    $mail->Password = $emailPassword;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = $smtpPort;
    $mail->CharSet = 'UTF-8';

    // Email settings
    $mail->setFrom($fromEmail, $fromName);
    $mail->addAddress($recipientEmail);
    $mail->addReplyTo($fromEmail, $fromName);

    // Check if message is HTML
    $isHtml = (strpos($message, '<html') !== false || 
               strpos($message, '<!DOCTYPE') !== false || 
               strpos($message, '<div') !== false);

    $mail->isHTML($isHtml);
    $mail->Subject = $subject;
    
    if ($isHtml) {
        $mail->Body = $message;
        $mail->AltBody = strip_tags($message);
    } else {
        $mail->Body = $message;
    }

    // Attach PDF file
    $mail->addAttachment(
        $pdfFile['tmp_name'],
        $pdfFile['name'] ?? 'quotation.pdf'
    );
    
    // Note: Temporary file will be automatically deleted by PHP after script execution

    // Send email
    $mail->send();

    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Email sent successfully',
        'recipient' => $recipientEmail
    ]);

} catch (Exception $e) {
    // Log error for debugging (optional)
    error_log('Email sending error: ' . $e->getMessage());

    // Return error response
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to send email: ' . $e->getMessage()
    ]);
}
?>

