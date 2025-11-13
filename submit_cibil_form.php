<?php
// 1. सुनिश्चित करें कि फॉर्म POST मेथड से सबमिट हुआ है
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 2. सुरक्षा के लिए इनपुट डेटा को सैनिटाइज (sanitize) करें
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $mobile = filter_var($_POST['mobile'], FILTER_SANITIZE_STRING);
    $dob = filter_var($_POST['dob'], FILTER_SANITIZE_STRING);
    $city = filter_var($_POST['city'], FILTER_SANITIZE_STRING);

    // 3. ईमेल सेटिंग्स (अपनी डिटेल्स यहाँ बदलें)
    $to = "your-business-email@example.com"; // <-- अपना बिजनेस ईमेल पता यहाँ बदलें
    $subject = "New CIBIL Check Lead from Finotic World Website";
    
    // 4. ईमेल मैसेज का कंटेंट तैयार करें
    $message = "<html><body>";
    $message .= "<h2 style='color: #007bff;'>CIBIL Check Request Details</h2>";
    $message .= "<table style='border: 1px solid #ccc; border-collapse: collapse; width: 100%;'>";
    $message .= "<tr><td style='padding: 8px; border: 1px solid #ccc; font-weight: bold; background-color: #f2f2f2;'>Name:</td><td style='padding: 8px; border: 1px solid #ccc;'>" . htmlspecialchars($name) . "</td></tr>";
    $message .= "<tr><td style='padding: 8px; border: 1px solid #ccc; font-weight: bold; background-color: #f2f2f2;'>Mobile:</td><td style='padding: 8px; border: 1px solid #ccc;'>" . htmlspecialchars($mobile) . "</td></tr>";
    $message .= "<tr><td style='padding: 8px; border: 1px solid #ccc; font-weight: bold; background-color: #f2f2f2;'>Email:</td><td style='padding: 8px; border: 1px solid #ccc;'>" . htmlspecialchars($email) . "</td></tr>";
    $message .= "<tr><td style='padding: 8px; border: 1px solid #ccc; font-weight: bold; background-color: #f2f2f2;'>Date of Birth:</td><td style='padding: 8px; border: 1px solid #ccc;'>" . htmlspecialchars($dob) . "</td></tr>";
    $message .= "<tr><td style='padding: 8px; border: 1px solid #ccc; font-weight: bold; background-color: #f2f2f2;'>City:</td><td style='padding: 8px; border: 1px solid #ccc;'>" . htmlspecialchars($city) . "</td></tr>";
    $message .= "</table>";
    $message .= "<p style='margin-top: 20px;'>*यह एक लीड है। कृपया ग्राहक से संपर्क करें और CIBIL चेक प्रक्रिया पूरी करें।*</p>";
    $message .= "</body></html>";

    // 5. ईमेल हेडर सेट करें
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'From: Finotic World Website <no-replyinfo@finoticworld.com,no-replyhrmanagerfinotic@outlook.com>' . "\r\n";
    
    // 6. ईमेल भेजें
    if (mail($to, $subject, $message, $headers)) {
        // सफलता पर: यूजर को एक 'धन्यवाद' पेज पर रीडायरेक्ट करें
        // सुनिश्चित करें कि आपके पास thank-you.html नामक एक पेज है
        header('Location: thank-you.html'); 
        exit(); // महत्वपूर्ण: रीडायरेक्ट के बाद स्क्रिप्ट को रोकें
    } else {
        // असफलता पर: यूजर को एक एरर मैसेज दिखाएं
        echo "<h1 style='color: red;'>Submission Failed</h1>";
        echo "<p>We are sorry, but there was an error submitting your request. Please try again later.</p>";
    }

} else {
    // अगर कोई यूजर सीधे इस PHP फ़ाइल को एक्सेस करता है, तो उसे होमपेज पर भेजें
    header('Location: index.html');
    exit();
}
?>
