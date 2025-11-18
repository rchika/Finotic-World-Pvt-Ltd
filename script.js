
// ===============================
//  Finotic World Pvt. Ltd. Script
// ===============================


// ======== Mobile Menu Toggle ========
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}


// ======== Smooth Scroll (Fixed) ========
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth',
      });
    }
  });
});


// ==========================================================
// SERVICE DETAIL TOGGLE (FIXED FOR .service-btn)
// ==========================================================
document.addEventListener('DOMContentLoaded', function () {
  const serviceButtons = document.querySelectorAll('.service-btn');
  const serviceDetails = document.querySelectorAll('.service-detail');

  serviceButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const targetId = this.dataset.target;

      serviceDetails.forEach(detail => {
        detail.style.display = 'none';
      });

      const targetDetail = document.getElementById(targetId);
      if (targetDetail) {
        targetDetail.style.display = 'block';
        targetDetail.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});


// ==========================================================
// APPLY FORM — BACKEND SUBMIT
// ==========================================================
const applyForm = document.getElementById('loanForm');

if (applyForm) {
  applyForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      fullname: applyForm.fullname.value,
      mobile: applyForm.mobile.value,
      email: applyForm.email.value,
      loanType: applyForm.loanType.value,
      message: applyForm.message.value
    };

    const res = await fetch("http://localhost:5000/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    alert(data.message);

    applyForm.reset();
  });
}


// ==========================================================
// CIBIL FORM — BACKEND SUBMIT
// ==========================================================
const cibilForm = document.getElementById("cibilForm");

if (cibilForm) {
  cibilForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      full_name: cibilForm.full_name.value,
      pan_name: cibilForm.pan_name.value,
      email_id: cibilForm.email_id.value,
      mobile: cibilForm.mobile.value,
      dob: cibilForm.dob.value,
      city: cibilForm.city.value
    };

    const res = await fetch("http://localhost:5000/api/cibil", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    alert(data.message);

    cibilForm.reset();
  });
}


// ==========================================================
// EMI Calculator
// ==========================================================
function calculateEMI() {
  const P = parseFloat(document.getElementById('loan-amount').value);
  const R_annual = parseFloat(document.getElementById('interest-rate').value);
  const N_years = parseFloat(document.getElementById('loan-term').value);

  if (isNaN(P) || isNaN(R_annual) || isNaN(N_years) || P <= 0 || R_annual < 0 || N_years <= 0) {
    document.getElementById('monthly-emi').innerText = 'Invalid Input';
    document.getElementById('total-interest').innerText = 'Invalid Input';
    document.getElementById('total-payment').innerText = 'Invalid Input';
    return;
  }

  const R_monthly = (R_annual / 100) / 12;
  const N_months = N_years * 12;

  let emi;

  if (R_monthly === 0) {
    emi = P / N_months;
  } else {
    const power = Math.pow(1 + R_monthly, N_months);
    emi = P * R_monthly * power / (power - 1);
  }

  const totalPayment = emi * N_months;
  const totalInterest = totalPayment - P;

  document.getElementById('monthly-emi').innerText = '₹ ' + emi.toFixed(2);
  document.getElementById('total-interest').innerText = '₹ ' + totalInterest.toFixed(2);
  document.getElementById('total-payment').innerText = '₹ ' + totalPayment.toFixed(2);
}


// ==========================================================
// CREDIT SCORE ESTIMATOR
// ==========================================================
function estimateScore() {
  const paymentWeight = parseFloat(document.getElementById('payment-history').value);
  const utilizationWeight = parseFloat(document.getElementById('credit-utilization').value);
  const ageWeight = parseFloat(document.getElementById('credit-age').value);

  let totalScore = 600 + paymentWeight + utilizationWeight + ageWeight;
  if (totalScore > 900) totalScore = 900;

  document.getElementById('estimated-score').innerText = totalScore;

  let message = '';
  let color = '';

  if (totalScore >= 750) {
    message = 'Excellent Score!';
    color = '#2ecc71';
  } else if (totalScore >= 650) {
    message = 'Good Score.';
    color = '#f39c12';
  } else {
    message = 'Low Score. Improvement Needed.';
    color = '#e74c3c';
  }

  document.getElementById('score-message').innerText = message;
  document.getElementById('score-message').style.color = color;
  document.getElementById('estimated-score').style.color = color;
}


// ==========================================================
// FAQ Toggle
// ==========================================================
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const answerId = button.dataset.faqId;
    const answer = document.getElementById(`faq-answer-${answerId}`);

    button.classList.toggle('active');
    answer.classList.toggle('open');
  });
});


// ==========================================================
// Feedback Carousel
// ==========================================================
const carousel = document.getElementById('feedbackCarousel');
const cards = document.querySelectorAll('.feedback-card');

const cardsPerView = window.innerWidth > 768 ? 3 : 1;
let currentIndex = 0;

function updateCarousel() {
  const cardWidthWithGap = cards[0].offsetWidth + 30;
  const offset = currentIndex * cardWidthWithGap;
  carousel.style.transform = `translateX(-${offset}px)`;
}

function moveCarousel(direction) {
  const totalCards = cards.length;

  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = totalCards - cardsPerView;
  } else if (currentIndex > totalCards - cardsPerView) {
    currentIndex = 0;
  }

  updateCarousel();
}

window.addEventListener('resize', updateCarousel);
window.addEventListener('load', updateCarousel);


