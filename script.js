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
