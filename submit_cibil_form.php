<?php
// 1. PHPMailer फ़ाइलों को शामिल करें (आपको इन्हें सर्वर पर अपलोड करना होगा)
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// मान लें कि आपने PHPMailer फ़ाइलों को 'vendor' फ़ोल्डर में रखा है
require 'vendor/PHPMailer/src/Exception.php';
require 'vendor/PHPMailer/src/PHPMailer.php';
require 'vendor/PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // सुरक्षा के लिए इनपुट डेटा को सैनिटाइज करें
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email_from = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $mobile = filter_var($_POST['mobile'], FILTER_SANITIZE_STRING);
    $dob = filter_var($_POST['dob'], FILTER_SANITIZE_STRING);
    $city = filter_var($_POST['city'], FILTER_SANITIZE_STRING);

    // ईमेल मैसेज का कंटेंट तैयार करें
    $body_content = "<h2 style='color: #007bff;'>CIBIL Check Request Details</h2>";
    $body_content .= "<table style='border: 1px solid #ccc; border-collapse: collapse; width: 100%;'>";
    $body_content .= "<tr><td style='padding: 8px; border: 1px solid #ccc; font-weight: bold; background-color: #f2f2f2;'>Name:</td><td style='padding: 8px; border: 1px solid #ccc;'>" . htmlspecialchars($name) . "</td></tr>";
    // ... बाकी टेबल रो यहाँ जोड़ें ...

    $mail = new PHPMailer(true);

    try {
        // 2. SMTP सेटिंग्स
        $mail->isSMTP();
        $mail->Host       = 'smtp.example.com';   // <--- अपनी SMTP होस्ट बदलें (जैसे smtp.gmail.com)
        $mail->SMTPAuth   = true;
        $mail->Username   = 'your_smtp_username@example.com'; // <--- अपना SMTP यूज़रनेम बदलें
        $mail->Password   = 'your_smtp_password'; // <--- अपना SMTP पासवर्ड बदलें
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // या ENCRYPTION_STARTTLS
        $mail->Port       = 465; // या 587 (यदि STARTTLS का उपयोग कर रहे हैं)

        // 3. प्राप्तकर्ता और प्रेषक (Recipients and Sender)
        $mail->setFrom('no-replydivyaku9525@gmail.com', 'Website Lead'); // आपका वेबसाइट ईमेल
        $mail->addAddress('your-business-emailhrmanagerfinotic@outlook.com', 'Finotic World Team'); // <--- प्राप्तकर्ता ईमेल
        $mail->addReplyTo($email_from, $name); // ग्राहक की ईमेल पर जवाब दें

        // 4. ईमेल कंटेंट
        $mail->isHTML(true);
        $mail->Subject = 'New CIBIL Check Lead: ' . $name;
        $mail->Body    = $body_content;

        $mail->send();
        
        // सफलता पर: यूजर को 'धन्यवाद' पेज पर रीडायरेक्ट करें
        header('Location: thank-you.html'); 
        exit();

    } catch (Exception $e) {
        // असफलता पर: एरर दिखाएं
        echo "<h1 style='color: red;'>Submission Failed</h1>";
        echo "<p>Error: The message could not be sent. Mailer Error: {$mail->ErrorInfo}</p>";
        // यदि आप 405 एरर देख रहे हैं, तो यह SMTP एरर को प्रिंट करेगा
    }
} else {
    header('Location: index.html');
    exit();
}
?>
