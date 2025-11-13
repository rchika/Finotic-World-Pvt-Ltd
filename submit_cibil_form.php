<?php
// submit_cibil_form.php

// 1. PHPMailer फ़ाइलों को शामिल करें (सुनिश्चित करें कि 'vendor' फ़ोल्डर सर्वर पर अपलोड है)
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// PHPMailer फ़ाइलों के पाथ को एडजस्ट करें अगर आपने उन्हें किसी और जगह रखा है
require 'vendor/PHPMailer/src/Exception.php';
require 'vendor/PHPMailer/src/PHPMailer.php';
require 'vendor/PHPMailer/src/SMTP.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // सुरक्षा के लिए इनपुट डेटा को सैनिटाइज करें
    // FIX: HTML फॉर्म से आए सही इनपुट नामों का उपयोग करें: full_name और email_id
    $name = filter_var($_POST['full_name'], FILTER_SANITIZE_STRING); // <--- FIXED
    $email_from = filter_var($_POST['email_id'], FILTER_SANITIZE_EMAIL); // <--- FIXED
    $mobile = filter_var($_POST['mobile'], FILTER_SANITIZE_STRING);
    $dob = filter_var($_POST['dob'], FILTER_SANITIZE_STRING);
    $city = filter_var($_POST['city'], FILTER_SANITIZE_STRING);

    // 2. ईमेल मैसेज का कंटेंट तैयार करें (सभी फील्ड्स शामिल करें)
    $body_content = "<h2 style='color: #007bff;'>CIBIL Check Request Details</h2>";
    $body_content .= "<table style='border: 1px solid #ccc; border-collapse: collapse; width: 100%;'>";
    
    $body_content .= "<tr><td style='padding: 8px; border: 1px solid #ccc; font-weight: bold; background-color: #f2f2f2;'>Name:</td><td style='padding: 8px; border: 1px solid #ccc;'>" . htmlspecialchars($name) . "</td></tr>";
    $body_content .= "<tr><td style='padding: 8px; border: 1px solid #ccc; font-weight: bold; background-color: #f2f2f2;'>Mobile:</td><td style='padding: 8px; border: 1px solid #ccc;'>" . htmlspecialchars($mobile) . "</td></tr>";
    $body_content .= "<tr><td style='padding: 8px; border: 1px solid #ccc; font-weight: bold; background-color: #f2f2f2;'>Email:</td><td style='padding: 8px; border: 1px solid #ccc;'>" . htmlspecialchars($email_from) . "</td></tr>";
    $body_content .= "<tr><td style='padding: 8px; border: 1px solid #ccc; font-weight: bold; background-color: #f2f2f2;'>Date of Birth:</td><td style='padding: 8px; border: 1px solid #ccc;'>" . htmlspecialchars($dob) . "</td></tr>";
    $body_content .= "<tr><td style='padding: 8px; border: 1px solid #ccc; font-weight: bold; background-color: #f2f2f2;'>City:</td><td style='padding: 8px; border: 1px solid #ccc;'>" . htmlspecialchars($city) . "</td></tr>";

    $body_content .= "</table>";
    
    $mail = new PHPMailer(true);

    try {
        // 3. SMTP सेटिंग्स (इन्हें अपनी होस्टिंग या बिज़नेस ईमेल डिटेल्स से बदलें)
        $mail->isSMTP();
        $mail->Host       = 'finoticworld.com';   // <--- SMTP Host (e.g., mail.yourdomain.com, smtp.gmail.com)
        $mail->SMTPAuth   = true;
        $mail->Username   = 'divyaku9525@gmail.com'; // <--- SMTP Username
        $mail->Password   = 'Divya@7290'; // <--- SMTP Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // आमतौर पर 465 के लिए SMTPS
        $mail->Port       = 465; // या 587 (यदि STARTTLS का उपयोग कर रहे हैं)

        // 4. प्राप्तकर्ता और प्रेषक (Recipients and Sender)
        $mail->setFrom('no-replyhrmanagerfinotic@outlook.com', 'Finotic Website Lead'); // आपका वेबसाइट ईमेल
        $mail->addAddress('your-business-email@example.com', 'Finotic World Team'); // <--- प्राप्तकर्ता ईमेल (जहाँ लीड्स जानी चाहिए)
        $mail->addReplyTo($email_from, $name); // ग्राहक की ईमेल पर जवाब दें

        // 5. ईमेल कंटेंट
        $mail->isHTML(true);
        $mail->Subject = 'NEW CIBIL LEAD: ' . $name;
        $mail->Body    = $body_content;

        $mail->send();
        
        // सफलता पर: यूजर को 'धन्यवाद' पेज पर रीडायरेक्ट करें
        header('Location: thank-you.html'); 
        exit();

    } catch (Exception $e) {
        // असफलता पर: एरर दिखाएं (यह 405/500 एरर को समझने में मदद करेगा)
        echo "<h1 style='color: red;'>Submission Failed!</h1>";
        echo "<p>We couldn't send the email. Please contact support.</p>";
        echo "<p>Mailer Error: {$mail->ErrorInfo}</p>"; // यह लाइन आपको डीबग करने में मदद करेगी
    }

} else {
    // अगर कोई यूजर सीधे PHP फ़ाइल को एक्सेस करता है, तो उसे होमपेज पर भेजें
    header('Location: index.html');
    exit();
}
?>
