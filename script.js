// ===============================
//  Finotic World Pvt. Ltd. Script
// ===============================

// ======== Mobile Menu Toggle ========
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links'); // Use .nav-links for toggle

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

// ======== Smooth Scroll ========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId !== '#') {
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: 'smooth',
        });
      }
    }
  });
});
// ==========================================================
// NEW CODE: Toggle Service Details on Click
// ==========================================================
document.addEventListener('DOMContentLoaded', function() {
    // 1. सभी सर्विस बॉक्सेस और डिटेल्स को ढूँढना 
    const serviceBoxes = document.querySelectorAll('.service-box'); 
    const serviceDetails = document.querySelectorAll('.service-detail');

    // 2. हर सर्विस बॉक्स पर क्लिक लिसनर जोड़ना
    serviceBoxes.forEach(box => {
        box.addEventListener('click', function() {
            // उस डिटेल की ID प्राप्त करना जिसे दिखाना है
            const targetId = this.dataset.target; 
            
            // 3. पहले से खुले सभी डिटेल्स को छुपाना
            serviceDetails.forEach(detail => {
                detail.style.display = 'none';
            });

            // 4. चुने हुए डिटेल को दिखाना
            const targetDetail = document.getElementById(targetId);
            if (targetDetail) {
                targetDetail.style.display = 'block'; 
                
                // (वैकल्पिक) यूजर को डिटेल सेक्शन तक स्क्रॉल करना
                targetDetail.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// ======== Form Submit Success ========
const form = document.querySelector('.apply form');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic Validation
    const name = form.querySelector('input[type="text"]').value.trim();
    const mobile = form.querySelector('input[type="tel"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const loanType = form.querySelector('select').value.trim();

    if (!name || !mobile || !email || !loanType) {
      alert('⚠️ Please fill in all required fields before submitting.');
      return;
    }

    // Success Message
    alert('🎉 Your loan application has been submitted successfully! We will contact you soon.');

    // Reset Form
    form.reset();
  });
}

// ======== Scroll Animation (Optional Bonus) ========
const fadeElements = document.querySelectorAll('.card, .about, .stats, .apply, .contact');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target); // Stop observing once faded in
      }
    });
  }, { threshold: 0.2 });

  fadeElements.forEach(el => observer.observe(el));
}
// ==========================================================
// NEW CODE: EMI Calculator Function
// ==========================================================
function calculateEMI() {
    // इनपुट वैल्यू प्राप्त करना
    const P = parseFloat(document.getElementById('loan-amount').value); // Principal
    const R_annual = parseFloat(document.getElementById('interest-rate').value); // Annual Rate (%)
    const N_years = parseFloat(document.getElementById('loan-term').value); // Term (Years)

    // इनपुट सत्यापन (Validation)
    if (isNaN(P) || isNaN(R_annual) || isNaN(N_years) || P <= 0 || R_annual < 0 || N_years <= 0) {
        document.getElementById('monthly-emi').innerText = 'Invalid Input';
        document.getElementById('total-interest').innerText = 'Invalid Input';
        document.getElementById('total-payment').innerText = 'Invalid Input';
        return;
    }

    // EMI गणना के लिए मासिक दर और अवधि में बदलना
    const R_monthly = (R_annual / 100) / 12; // Monthly Rate (decimal)
    const N_months = N_years * 12; // Total Months

    let emi;

    if (R_monthly === 0) {
        // यदि ब्याज दर शून्य है
        emi = P / N_months;
    } else {
        // EMI सूत्र: [P x R x (1 + R)^N] / [(1 + R)^N - 1]
        const power = Math.pow(1 + R_monthly, N_months);
        emi = P * R_monthly * power / (power - 1);
    }
    
    // परिणाम गणना
    const totalPayment = emi * N_months;
    const totalInterest = totalPayment - P;

    // परिणामों को फ़ॉर्मेट करके HTML में प्रदर्शित करना (भारतीय फॉर्मेट)
    // toLocaleString('en-IN') भारतीय संख्या प्रारूप (Indian number format) प्रदान करता है।
    document.getElementById('monthly-emi').innerText = '₹ ' + emi.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",").toLocaleString('en-IN');
    document.getElementById('total-interest').innerText = '₹ ' + totalInterest.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",").toLocaleString('en-IN');
    document.getElementById('total-payment').innerText = '₹ ' + totalPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",").toLocaleString('en-IN');
}

// ==========================================================
// NEW CODE: Credit Score Estimator Function
// ==========================================================
function estimateScore() {
    // इनपुट वैल्यू प्राप्त करना (वे weights हैं जो स्कोर को प्रभावित करते हैं)
    const paymentWeight = parseFloat(document.getElementById('payment-history').value);
    const utilizationWeight = parseFloat(document.getElementById('credit-utilization').value);
    const ageWeight = parseFloat(document.getElementById('credit-age').value);

    // बेस स्कोर 600 मानकर चलें (भारत में न्यूनतम अच्छा स्कोर)
    let baseScore = 600; 

    // वेटेज जोड़ना
    let totalScore = baseScore + paymentWeight + utilizationWeight + ageWeight;

    // स्कोर को 900 से अधिक न होने देना
    if (totalScore > 900) {
        totalScore = 900;
    }

    // परिणाम डिस्प्ले करना
    document.getElementById('estimated-score').innerText = totalScore;
    let message = '';
    let color = '';

    if (totalScore >= 750) {
        message = 'उत्कृष्ट! आपको लोन आसानी से मिल सकता है।';
        color = '#2ecc71'; // हरा
    } else if (totalScore >= 650) {
        message = 'अच्छा स्कोर! आपको प्रतिस्पर्धी दरों पर लोन मिल सकता है।';
        color = '#f39c12'; // नारंगी
    } else {
        message = 'कम स्कोर। लोन के लिए आवेदन करने से पहले सुधार की ज़रूरत है।';
        color = '#e74c3c'; // लाल
    }

    document.getElementById('score-message').innerText = message;
    document.getElementById('score-message').style.color = color;
    document.getElementById('estimated-score').style.color = color;
}
/* ==========================================================
   FAQ ACCORDION FUNCTIONALITY
   ========================================================== */
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const answerId = button.dataset.faqId;
        const answer = document.getElementById(`faq-answer-${answerId}`);
        
        // 1. बटन पर 'active' क्लास टॉगल करें (यह CSS से '+' को 'X' में बदलता है)
        button.classList.toggle('active');
        
        // 2. जवाब पर 'open' क्लास टॉगल करें (यह CSS से max-height को बदलता है)
        answer.classList.toggle('open');
    });
});
/* ==========================================================
   FEEDBACK CAROUSEL FUNCTIONALITY
   ========================================================== */
const carousel = document.getElementById('feedbackCarousel');
const cards = document.querySelectorAll('.feedback-card');

// कितनी कार्ड्स को एक बार में स्लाइड करना है
const cardsPerView = window.innerWidth > 768 ? 3 : 1;
let currentIndex = 0;

function updateCarousel() {
    // 1. कार्ड की चौड़ाई, गैप सहित, (यानी एक स्लाइड का कितना हिस्सा)
    // 768px से ऊपर: 33.33% (कार्ड की चौड़ाई) + 15px (गैप)
    // 768px से नीचे: 100% (कार्ड की चौड़ाई) + 10px (गैप)
    
    // (CSS में 15px margin है, इसलिए 15px * 2 = 30px का गैप)
    const cardWidthWithGap = cards[0].offsetWidth + 30; 
    
    // 2. ट्रांसलेट वैल्यू की गणना करें
    const offset = currentIndex * cardWidthWithGap;

    // 3. Carousel को ट्रांसलेट करें
    carousel.style.transform = `translateX(-${offset}px)`;
}

function moveCarousel(direction) {
    const totalCards = cards.length;
    
    // अगला इंडेक्स निकालें
    currentIndex += direction;
    
    // बाएँ किनारे पर रोलओवर (यदि पहला कार्ड है तो वापस अंतिम कार्ड पर जाएँ)
    if (currentIndex < 0) {
        currentIndex = totalCards - cardsPerView;
    } 
    // दाएँ किनारे पर रोलओवर (यदि अंतिम कार्ड है तो वापस पहले कार्ड पर जाएँ)
    else if (currentIndex > totalCards - cardsPerView) {
        currentIndex = 0;
    }

    updateCarousel();
}

// पेज लोड होने पर और साइज़ बदलने पर अपडेट करें
window.addEventListener('resize', updateCarousel);
window.addEventListener('load', updateCarousel);

// सुनिश्चित करें कि यह कोड आपकी index.html में <script src="script.js"></script> से लिंक है।

<script>
    // यह कोड सुनिश्चित करता है कि आपकी पुरानी स्क्रिप्ट के साथ कोई टकराव न हो
    document.addEventListener('DOMContentLoaded', () => {
        
        const counters = document.querySelectorAll('.counter');
        const speed = 200; // गिनती की गति को नियंत्रित करता है (मिलीसेकंड में)
        
        // एक फंक्शन जो गिनती करता है
        const animateCounter = (counter) => {
            // data-target से फाइनल नंबर प्राप्त करें
            const target = +counter.getAttribute('data-target');
            // वर्तमान में दिख रहा नंबर प्राप्त करें
            let current = 0; 
            
            // Increment (बढ़ने) के लिए वैल्यू कैलकुलेट करें
            // यह सुनिश्चित करता है कि छोटे और बड़े दोनों नंबर्स सही समय में पूरे हो जाएं
            const increment = target / speed; 

            const updateCount = () => {
                // वर्तमान मान को वृद्धि (increment) द्वारा बढ़ाएँ
                current += increment;
                
                if (current < target) {
                    // अगर अभी तक फाइनल नंबर तक नहीं पहुंचा है
                    // K (हज़ार) वाले नंबर्स के लिए
                    if (target >= 1000) {
                        counter.innerText = Math.ceil(current / 1000); // 1000 से भाग करके K में दिखाएँ
                    } else {
                        counter.innerText = Math.ceil(current); // छोटे नंबर्स को सीधे दिखाएँ
                    }
                    
                    // 4 मिलीसेकंड के बाद फिर से फंक्शन चलाएँ
                    setTimeout(updateCount, 4); 
                } else {
                    // फाइनल नंबर पर पहुँच गया है, तो असली वैल्यू दिखाएँ
                    if (target >= 1000) {
                        counter.innerText = (target / 1000); // जैसे 25000 को 25 दिखाएँ
                    } else {
                        counter.innerText = target; // जैसे 30 को 30 दिखाएँ
                    }
                }
            };

            // गिनती शुरू करें
            updateCount();
        };

        // पेज पर मौजूद सभी .counter एलिमेंट्स पर एनीमेशन चलाएँ
        counters.forEach(animateCounter);

        // अन्य JavaScript कोड (जैसे menu-toggle) को यहाँ रखें 
        document.getElementById('menu-toggle').addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
        });
        // ... अन्य कोड ...
    });
</script>


