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
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
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
  "0m7a4857.jpg",
  "0m7a6596.jpg",
  "0m7a9144.jpg",
  "831a8777_1.jpg",
  "aquilina_domenic_mlt_twin_thoughts.jpg",
  "bb9i4613.jpg",
  "bb9i5630.jpg",
  "c80i5348.jpg",
  "cm6a7367.jpg",
  "cm6a7975.jpg",
  "da-bb9i9683-mlt.jpg",
  "da_074a3288.jpg",
  "da_074a4699.jpg",
  "da_074a5002.jpg",
  "da_074a5405.jpg",
  "da_074a5652.jpg",
  "da_074a6386.jpg",
  "da_074a6466.jpg",
  "da_074a8463.jpg",
  "da_0m7a1077fb.jpg",
  "da_0m7a2958.jpg",
  "da_0m7a6223.jpg",
  "da_0m7a9017.jpg",
  "da_831a9416.jpg",
  "da_c80i1882.jpg",
  "da_c80i4233.jpg",
  "da_cm6a0456.jpg",
  "da_cm6a0729.jpg",
  "da_cm6a1490.jpg",
  "da_mlt_c80i4703.jpg",
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
