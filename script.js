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
