// Hide loader when page is fully loaded
window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(function () {
      loader.style.display = "none";
    }, 300);
  }
});

// Slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const dotsContainer = document.querySelector(".slider-dots");

// Create dots
slides.forEach((_, index) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (index === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(index));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function showSlide(n) {
  if (n >= slides.length) {
    currentSlide = 0;
  }
  if (n < 0) {
    currentSlide = slides.length - 1;
  }

  // Update slider position for sliding effect
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Update dots
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });
  dots[currentSlide].classList.add("active");
}

function moveSlide(n) {
  currentSlide += n;
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }
  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }
  showSlide(currentSlide);
}

function goToSlide(n) {
  currentSlide = n;
  showSlide(currentSlide);
}

// Auto-advance slider
let autoSlideInterval = setInterval(() => {
  moveSlide(1);
}, 5000);

// Pause auto-advance on hover
const sliderContainer = document.querySelector(".slider-container");
sliderContainer.addEventListener("mouseenter", () => {
  clearInterval(autoSlideInterval);
});

sliderContainer.addEventListener("mouseleave", () => {
  autoSlideInterval = setInterval(() => {
    moveSlide(1);
  }, 5000);
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    moveSlide(-1);
  } else if (e.key === "ArrowRight") {
    moveSlide(1);
  }
});

// Touch navigation for mobile
let startX = 0;
let endX = 0;

sliderContainer.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

sliderContainer.addEventListener("touchmove", (e) => {
  // Prevent scrolling while swiping
  e.preventDefault();
});

sliderContainer.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  const diffX = startX - endX;

  if (Math.abs(diffX) > 50) { // Minimum swipe distance
    if (diffX > 0) {
      moveSlide(1); // Swipe left, next slide
    } else {
      moveSlide(-1); // Swipe right, previous slide
    }
  }
});

// Contact form handling
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  // Here you would typically send the form data to a server
  console.log("Form submitted:", formData);

  // Show success message
  alert("Thank you for your message! I will get back to you soon.");

  // Reset form
  contactForm.reset();
});

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offset = 70; // Height of fixed navbar
      const targetPosition = target.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Navbar shrink on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.05,
  rootMargin: "0px 0px -20px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll("section").forEach((section) => {
  // Skip the hero section as it's already visible
  if (section.classList.contains("hero")) return;

  section.style.opacity = "0";
  section.style.transform = "translateY(20px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(section);
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navLinks = document.querySelector(".nav-links");

mobileMenuToggle.addEventListener("click", () => {
  mobileMenuToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
  document.body.style.overflow = navLinks.classList.contains("active")
    ? "hidden"
    : "auto";
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenuToggle.classList.remove("active");
    navLinks.classList.remove("active");
    document.body.style.overflow = "auto";
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
    mobileMenuToggle.classList.remove("active");
    navLinks.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Photo Gallery
const photoFiles = [
  "074A2017.jpg",
  "074A4699.jpg",
  "074A5652.jpg",
  "074A6386.jpg",
  "074A8463.jpg",
  "0M7A9017.jpg",
  "831A9421.jpg",
  "BB9I4613.jpg",
  "C80I5348.jpg",
  "CM6A1490.jpg",
  "CM6A1630.jpg",
  "CM6A7367.jpg",
  "CM6A7371.jpg",
  "DA_074A5002.jpg",
  "DA_0M7A1077.jpg",
  "DA_831A9502.jpg",
  "DA_BB9I4705_MIPP.jpg",
  "DA_BB9I5630_Messi_12x8.jpg",
  "DA_BB9I9683_MIPP.jpg",
  "DA_C80I4233.jpg",
  "DA_CM6A0729.jpg",
  "uefa_champions_league_the_final_istanbul_2025_06.jpg",
];

const photoGrid = document.getElementById("photo-grid");
let galleryImages = [];

// Load photos into gallery
photoFiles.forEach((filename, index) => {
  const photoItem = document.createElement("div");
  photoItem.classList.add("photo-grid-item");

  const img = document.createElement("img");
  img.src = `images/photos/${filename}`;
  img.alt = `Gallery Photo ${index + 1}`;
  img.loading = "lazy";

  photoItem.appendChild(img);
  photoGrid.appendChild(photoItem);

  galleryImages.push(img.src);

  // Add click event for lightbox
  photoItem.addEventListener("click", () => openLightbox(index));
});

// Lightbox functionality
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");
let currentLightboxIndex = 0;

function openLightbox(index) {
  currentLightboxIndex = index;
  lightboxImg.src = galleryImages[index];
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "auto";
}

function showLightboxImage(index) {
  if (index >= galleryImages.length) {
    currentLightboxIndex = 0;
  } else if (index < 0) {
    currentLightboxIndex = galleryImages.length - 1;
  } else {
    currentLightboxIndex = index;
  }
  lightboxImg.src = galleryImages[currentLightboxIndex];
}

// Lightbox event listeners
lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

lightboxPrev.addEventListener("click", (e) => {
  e.stopPropagation();
  showLightboxImage(currentLightboxIndex - 1);
});

lightboxNext.addEventListener("click", (e) => {
  e.stopPropagation();
  showLightboxImage(currentLightboxIndex + 1);
});

// Keyboard navigation for lightbox
document.addEventListener("keydown", (e) => {
  if (lightbox.classList.contains("active")) {
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      showLightboxImage(currentLightboxIndex - 1);
    } else if (e.key === "ArrowRight") {
      showLightboxImage(currentLightboxIndex + 1);
    }
  }
});
