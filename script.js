
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

// main.js फ़ाइल में जोड़ें
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. स्लाइड डेटा (सभी 4 स्लाइड्स के लिए URLs)
    const slides = [
        {
            title: "Instant Personal Loan",
            description: "Quick approval for your personal expenses with flexible EMIs. Empowering individuals with financial freedom.",
            image: "http://googleusercontent.com/image_collection/image_retrieval/8986303280919051218_0", 
            buttonLink: "#apply-personal-loan",
        },
        {
            title: "Fuel Your Business Growth",
            description: "Get business loans with easy options and minimal documentation. Take your business to the next level.",
            image: "http://googleusercontent.com/image_collection/image_retrieval/13026697473709372493_0", 
            buttonLink: "#apply-business-loan",
        },
        {
            title: "Your Dream Home Awaits",
            description: "Turn your dream home into reality with our trusted home loan financing solutions.",
            image: "http://googleusercontent.com/image_collection/image_retrieval/15231437097599506162_0", 
            buttonLink: "#apply-home-loan",
        },
        {
            title: "Drive Your Dream Car",
            description: "Get your dream car with affordable interest rates and hassle-free approval process.",
            image: "http://googleusercontent.com/image_collection/image_retrieval/10180069441444894034_0", 
            buttonLink: "#apply-car-loan",
        },
    ];

    let currentSlide = 0;
    let slideTimer;

    // 2. DOM एलिमेंट्स को पकड़ें
    const titleEl = document.getElementById('carousel-title');
    const descriptionEl = document.getElementById('carousel-description');
    const imageEl = document.getElementById('current-slide-image');
    const buttonEl = document.getElementById('carousel-button');
    const prevBtn = document.getElementById('prev-slide-btn');
    const nextBtn = document.getElementById('next-slide-btn');
    const dotsContainer = document.getElementById('dot-indicators');

    // 3. स्लाइड अपडेट करने का फ़ंक्शन
    function updateSlide() {
        const slide = slides[currentSlide];

        // ट्रांज़िशन के लिए पहले opacity कम करें (Fade effect)
        titleEl.style.opacity = 0;
        descriptionEl.style.opacity = 0;
        imageEl.style.opacity = 0;
        buttonEl.style.opacity = 0;

        setTimeout(() => {
            // कंटेंट को अपडेट करें
            titleEl.textContent = slide.title;
            descriptionEl.textContent = slide.description;
            imageEl.src = slide.image;
            imageEl.alt = slide.title;
            buttonEl.href = slide.buttonLink;
            
            // अपडेट के बाद opacity बढ़ाएँ
            titleEl.style.opacity = 1;
            descriptionEl.style.opacity = 1;
            imageEl.style.opacity = 1;
            buttonEl.style.opacity = 1;
        }, 300); // 300ms के बाद अपडेट

        updateDots();
    }

    // 4. डॉट्स अपडेट करने का फ़ंक्शन
    function updateDots() {
        dotsContainer.innerHTML = ''; 
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'slide-dot';
            dot.style.cssText = `
                height: 8px; width: ${index === currentSlide ? '25px' : '8px'};
                background-color: ${index === currentSlide ? '#4169e1' : '#ccc'};
                border: none; border-radius: 4px; margin: 0 4px; cursor: pointer;
                transition: all 0.3s;
            `;
            dot.onclick = () => goToSlide(index);
            dotsContainer.appendChild(dot);
        });
    }

    // 5. नेविगेशन फ़ंक्शन्स
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlide();
        resetTimer();
    }

    // 6. ऑटोमेटिक स्लाइडिंग टाइमर (5 सेकंड)
    function startTimer() {
        slideTimer = setInterval(nextSlide, 5000); 
    }

    function resetTimer() {
        clearInterval(slideTimer);
        startTimer();
    }

    // 7. इवेंट लिसनर्स सेट करें
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide();
        resetTimer();
    });
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetTimer();
    });

    // 8. शुरू करें
    if (slides.length > 0) {
        updateSlide(); 
        startTimer();  
    }
});
