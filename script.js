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
