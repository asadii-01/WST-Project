// Initialize AOS
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    easing: "ease",
    once: true,
    offset: 100,
  });

  // Preloader
  setTimeout(function () {
    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(function () {
      document.querySelector(".preloader").style.display = "none";
    }, 1000);
  }, 1500);

  // Custom cursor
  const cursor = document.querySelector(".cursor-dot");
  const cursorOutline = document.querySelector(".cursor-outline");

  document.addEventListener("mousemove", function (e) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    cursorOutline.animate(
      {
        left: e.clientX + "px",
        top: e.clientY + "px",
      },
      { duration: 500, fill: "forwards" }
    );
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");

  menuToggle.addEventListener("click", function () {
    nav.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Header scroll effect
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Back to top button
  const backToTopButton = document.querySelector(".back-to-top");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  backToTopButton.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Animated counter
  const stats = document.querySelectorAll(".stat-number");

  function animateCounter() {
    stats.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-count"));
      const count = parseInt(stat.innerText);
      const increment = target / 50;

      if (count < target) {
        stat.innerText = Math.ceil(count + increment);
        setTimeout(animateCounter, 40);
      } else {
        stat.innerText = target;
      }
    });
  }

  // Start counter animation when about section is in view
  const aboutSection = document.querySelector(".about");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(aboutSection);

  // Testimonial slider
  const slides = document.querySelectorAll(".testimonial-slide");
  const dots = document.querySelectorAll(".dot");
  const prevButton = document.querySelector(".control-prev");
  const nextButton = document.querySelector(".control-next");
  let currentSlide = 0;

  function showSlide(n) {
    slides.forEach((slide) => {
      slide.style.transform = `translateX(-${n * 100}%)`;
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === n);
    });
  }

  prevButton.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });

  nextButton.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Auto slide testimonials
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);

  // Form submission
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Simulate form submission
    const submitButton = contactForm.querySelector(".btn-submit");
    submitButton.innerHTML =
      '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';

    setTimeout(() => {
      contactForm.reset();
      submitButton.innerHTML =
        '<span>Message Sent!</span> <i class="fas fa-check"></i>';

      setTimeout(() => {
        submitButton.innerHTML =
          '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
      }, 3000);
    }, 2000);
  });

  // Split text animation
  const splitTextElements = document.querySelectorAll(".split-text");

  splitTextElements.forEach((element) => {
    const text = element.textContent;
    let html = "";

    for (let i = 0; i < text.length; i++) {
      if (text[i] === " ") {
        html += " ";
      } else {
        html += `<span style="animation-delay: ${i * 0.05}s">${text[i]}</span>`;
      }
    }

    element.innerHTML = html;
  });

  // Typing text animation
  const typingText = document.querySelector(".typing-text");
  const text = typingText.textContent;
  typingText.textContent = "";

  let i = 0;
  const typeInterval = setInterval(() => {
    if (i < text.length) {
      typingText.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typeInterval);
    }
  }, 100);
});
