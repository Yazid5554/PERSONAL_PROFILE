// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Typing Animation - sesuai dengan HTML structure
const typingTexts = [
  "Web Developer",
  "UI/UX Designer",
  "Frontend Developer",
  "Creative Coder",
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector(".typing-animation");
const typingSpeed = 140;
const deletingSpeed = 80;

function typeText() {
  if (!typingElement) return;

  const currentText = typingTexts[textIndex];

  if (isDeleting) {
    // Proses menghapus
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      // Selesai menghapus, ganti ke teks berikutnya
      isDeleting = false;
      textIndex = (textIndex + 1) % typingTexts.length;
      setTimeout(typeText, 500); // Jeda sebelum teks baru
      return;
    }
    setTimeout(typeText, deletingSpeed);
    return;
  }

  // Proses mengetik
  typingElement.textContent = currentText.substring(0, charIndex + 1);
  charIndex++;

  if (charIndex === currentText.length) {
    // SELESAI MENGETIK - JEDA DULU SEBELUM MULAI HAPUS
    setTimeout(() => {
      isDeleting = true;
      setTimeout(typeText, 50);
    }, 1500); // Jeda 2.5 detik setelah selesai mengetik
    return;
  }

  setTimeout(typeText, typingSpeed);
}

// Start typing animation ketika DOM ready
document.addEventListener("DOMContentLoaded", () => {
  const checkElement = document.querySelector(".typing-animation");
  if (checkElement) {
    setTimeout(() => {
      typeText();
    }, 1000); // Delay 1 detik sebelum mulai
  }
});

// Enhanced Active Navigation System
function initActiveNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");
  const navLogo = document.querySelector(".nav-logo");

  // Create section indicator dots
  createSectionIndicator();

  // Update active nav on scroll
  function updateActiveNav() {
    let current = "";
    const scrollPosition = window.scrollY + 200;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    // Update navigation links
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");

        // Add click animation
        link.classList.add("nav-pulse");
        setTimeout(() => {
          link.classList.remove("nav-pulse");
        }, 600);
      }
    });

    // Update section indicator dots
    const sectionDots = document.querySelectorAll(".section-dot");
    sectionDots.forEach((dot) => {
      dot.classList.remove("active");
      if (dot.getAttribute("data-target") === current) {
        dot.classList.add("active");
      }
    });

    // Update logo state when on home
    if (current === "home") {
      navLogo.classList.add("home-active");
    } else {
      navLogo.classList.remove("home-active");
    }
  }

  // Create section indicator
  function createSectionIndicator() {
    const indicator = document.createElement("div");
    indicator.className = "section-indicator";

    sections.forEach((section) => {
      const dot = document.createElement("div");
      dot.className = "section-dot";
      dot.setAttribute("data-target", section.id);
      dot.setAttribute(
        "data-section",
        section.id.charAt(0).toUpperCase() + section.id.slice(1)
      );

      dot.addEventListener("click", () => {
        smoothScrollToSection(`#${section.id}`);
      });

      indicator.appendChild(dot);
    });

    document.body.appendChild(indicator);
  }

  // Enhanced click effects for nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Remove active from all links
      navLinks.forEach((l) => l.classList.remove("active"));

      // Add active to clicked link
      this.classList.add("active");

      // Add click animation
      this.classList.add("nav-clicked");
      setTimeout(() => {
        this.classList.remove("nav-clicked");
      }, 300);
    });
  });

  // Throttled scroll listener
  let ticking = false;
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateActiveNav);
      ticking = true;
      setTimeout(() => {
        ticking = false;
      }, 100);
    }
  }

  window.addEventListener("scroll", requestTick);

  // Initial call
  updateActiveNav();
}

// More About Me button functionality
const ctaButton = document.querySelector(".cta-button");
if (ctaButton) {
  ctaButton.addEventListener("click", (e) => {
    e.preventDefault();
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(26, 26, 46, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 212, 255, 0.1)";
  } else {
    navbar.style.background = "rgba(26, 26, 46, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// Scroll down arrow functionality
const scrollDown = document.querySelector(".scroll-down");
if (scrollDown) {
  scrollDown.addEventListener("click", () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Parallax effect for home section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const homeSection = document.querySelector(".home");
  const rate = scrolled * -0.5;

  if (homeSection) {
    homeSection.style.transform = `translateY(${rate}px)`;
  }
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Social media links (replace with your actual links)
const socialLinks = {
  instagram: "https://www.instagram.com/m_y.zid",
  whatsapp: "https://wa.me/62895366780417",
  tiktok: "https://www.tiktok.com/@my.m.yazid",
  linkedin: "https://www.linkedin.com/in/muhammad-yazid-72b189334/",
};

document.querySelectorAll(".social-icon, .social-link").forEach((link) => {
  const platform = link.getAttribute("data-platform");
  if (socialLinks[platform]) {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      window.open(socialLinks[platform], "_blank");
    });
  }
});
// Add ripple effect to buttons
function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add("ripple");

  const ripple = button.getElementsByClassName("ripple")[0];
  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

// Add smooth scroll behavior with offset for navbar
function smoothScrollToSection(targetId) {
  const targetSection = document.querySelector(targetId);
  const navbar = document.querySelector(".navbar");
  const navbarHeight = navbar.offsetHeight;

  if (targetSection) {
    const targetPosition = targetSection.offsetTop - navbarHeight - 20;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }
}

// Update CTA button to use the improved scroll function
if (ctaButton) {
  ctaButton.addEventListener("click", (e) => {
    e.preventDefault();
    smoothScrollToSection("#about");
  });
}

// Update scroll down arrow to use the improved scroll function
if (scrollDown) {
  scrollDown.addEventListener("click", () => {
    smoothScrollToSection("#about");
  });
}

// Enhanced profile image animations
function initProfileAnimations() {
  const imageContainer = document.querySelector(".avatar-container");
  const profileImg = document.querySelector(".avatar");

  if (!imageContainer || !profileImg) return;

  // Mouse follow effect
  imageContainer.addEventListener("mousemove", (e) => {
    const rect = imageContainer.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (y / rect.height) * 10;
    const rotateY = (x / rect.width) * -10;

    profileImg.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        scale(1.05)
      `;
  });

  // Reset on mouse leave
  imageContainer.addEventListener("mouseleave", () => {
    profileImg.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
  });

  // Click effect
  imageContainer.addEventListener("click", () => {
    imageContainer.classList.add("profile-clicked");
    setTimeout(() => {
      imageContainer.classList.remove("profile-clicked");
    }, 600);
  });
}

// Start typing animation when page loads
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeText, 1000);

  // Initialize enhanced navigation
  initActiveNavigation();

  // Initialize profile animations
  initProfileAnimations();
});

// Add ripple effect to CTA button
if (ctaButton) {
  ctaButton.addEventListener("mousedown", createRipple);
}

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-navigation");
  }
});

document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-navigation");
});

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.code);

  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }

  if (konamiCode.join(",") === konamiSequence.join(",")) {
    // Easter egg activated
    document.body.style.animation = "rainbow 2s infinite";

    setTimeout(() => {
      document.body.style.animation = "";
      alert("🎉 Easter egg found! You're a true developer! 🎉");
    }, 4000);

    konamiCode = [];
  }
});

// Performance monitoring
function logPerformance() {
  if (performance.mark) {
    performance.mark("page-loaded");
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
  }
}

// Handle page visibility changes
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Pause animations when page is not visible
    document.body.style.animationPlayState = "paused";
  } else {
    // Resume animations when page becomes visible
    document.body.style.animationPlayState = "running";
  }
});

// Handle window resize
window.addEventListener(
  "resize",
  throttle(() => {
    // Recalculate positions if needed
    const updateEvent = new Event("scroll");
    window.dispatchEvent(updateEvent);
  }, 250)
);

// Throttle function for performance
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Preload images for better performance
function preloadImages() {
  const images = ["images/IMG-20221018-WA0023.jpg"];

  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

// Call preload on page load
window.addEventListener("load", () => {
  preloadImages();
  logPerformance();
});

// Service Worker registration for PWA (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// Add rainbow animation for easter egg
const rainbowCSS = `
@keyframes rainbow {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
`;

// Inject rainbow CSS
const rainbowStyle = document.createElement("style");
rainbowStyle.textContent = rainbowCSS;
document.head.appendChild(rainbowStyle);

// Tambahkan di bagian akhir script.js

// Navigation Animation Controller
class NavigationAnimator {
  constructor() {
    this.navbar = document.querySelector(".navbar");
    this.navItems = document.querySelectorAll(".nav-item");
    this.navLogo = document.querySelector(".nav-logo");
    this.hamburger = document.querySelector(".hamburger");
    this.isAnimating = false;

    this.init();
  }

  init() {
    // Jalankan animasi saat DOM loaded
    document.addEventListener("DOMContentLoaded", () => {
      this.startNavAnimation();
    });

    // Jalankan animasi saat page visibility berubah (refresh detection)
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && !this.isAnimating) {
        this.restartNavAnimation();
      }
    });

    // Jalankan animasi saat window focus (tab switch back)
    window.addEventListener("focus", () => {
      if (!this.isAnimating) {
        this.restartNavAnimation();
      }
    });
  }

  startNavAnimation() {
    this.isAnimating = true;

    // Reset semua elemen ke state awal
    this.resetNavElements();

    // Trigger animasi dengan menambah class
    setTimeout(() => {
      this.navbar?.classList.add("navbar-loaded");
      this.navLogo?.classList.add("logo-loaded");

      this.navItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("nav-item-loaded");

          // Tambah efek glowing setelah animasi selesai
          setTimeout(() => {
            item.classList.add("animation-complete");
          }, 600);
        }, index * 100);
      });

      // Hamburger menu terakhir
      setTimeout(() => {
        this.hamburger?.classList.add("hamburger-loaded");
        this.isAnimating = false;
      }, this.navItems.length * 100 + 200);
    }, 100);
  }

  restartNavAnimation() {
    // Hanya restart jika tidak sedang animasi
    if (this.isAnimating) return;

    this.isAnimating = true;

    // Reset dan restart animasi
    this.resetNavElements();

    // Tambah class refresh untuk animasi berbeda
    this.navbar?.classList.add("navbar-refreshed");

    setTimeout(() => {
      this.startNavAnimation();
      this.navbar?.classList.remove("navbar-refreshed");
    }, 200);
  }

  resetNavElements() {
    // Remove semua animation classes
    this.navbar?.classList.remove("navbar-loaded", "navbar-refreshed");
    this.navLogo?.classList.remove("logo-loaded");
    this.hamburger?.classList.remove("hamburger-loaded");

    this.navItems.forEach((item) => {
      item.classList.remove("nav-item-loaded", "animation-complete");
    });
  }

  // Method untuk trigger animasi manual (bisa dipanggil dari console)
  triggerAnimation() {
    this.restartNavAnimation();
  }
}

// Initialize Navigation Animator
const navAnimator = new NavigationAnimator();

// Tambahkan CSS classes untuk loaded states
const navAnimationCSS = `
  .navbar-loaded {
    animation: navbarSlideDown 0.8s ease forwards;
  }
  
  .logo-loaded {
    animation: logoPopUp 0.8s ease forwards;
  }
  
  .nav-item-loaded {
    animation: navPopUp 0.6s ease forwards;
  }
  
  .hamburger-loaded {
    animation: hamburgerPopUp 0.6s ease forwards;
  }
  
  /* Efek khusus untuk refresh */
  .navbar-refreshed .nav-item {
    animation: navRefreshPop 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  }
  
  @keyframes navRefreshPop {
    0% {
      opacity: 0;
      transform: translateY(-40px) scale(0.5) rotate(-10deg);
    }
    60% {
      opacity: 0.8;
      transform: translateY(8px) scale(1.1) rotate(5deg);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1) rotate(0deg);
    }
  }
  
  /* Stagger animation untuk refresh */
  .navbar-refreshed .nav-item:nth-child(1) { animation-delay: 0.1s; }
  .navbar-refreshed .nav-item:nth-child(2) { animation-delay: 0.2s; }
  .navbar-refreshed .nav-item:nth-child(3) { animation-delay: 0.3s; }
  .navbar-refreshed .nav-item:nth-child(4) { animation-delay: 0.4s; }
  .navbar-refreshed .nav-item:nth-child(5) { animation-delay: 0.5s; }
  `;

// Inject CSS
const navAnimationStyle = document.createElement("style");
navAnimationStyle.textContent = navAnimationCSS;
document.head.appendChild(navAnimationStyle);

// Tambahkan event listener untuk performance monitoring
window.addEventListener("load", () => {
  console.log("🎉 Navigation animations loaded successfully!");

  // Optional: Tambah debug info
  if (window.location.search.includes("debug=true")) {
    console.log("Navigation Animator:", navAnimator);

    // Expose ke global scope untuk debugging
    window.navAnimator = navAnimator;
  }
});

// Easter egg: Ketik "animate" di console untuk trigger animasi
window.animate = () => {
  navAnimator.triggerAnimation();
  console.log("🚀 Navigation animation triggered!");
};

// Social Media Animation - Simple & Clean
class SocialMediaAnimator {
  constructor() {
    this.socialContainer = document.querySelector(".social-media");
    this.socialIcons = document.querySelectorAll(".social-icon");
    this.isAnimating = false;

    this.init();
  }

  init() {
    // Jalankan animasi saat DOM loaded
    document.addEventListener("DOMContentLoaded", () => {
      this.startAnimation();
    });

    // Jalankan animasi saat refresh
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && !this.isAnimating) {
        this.restartAnimation();
      }
    });

    // Simple click effect
    this.addClickEffects();
  }

  startAnimation() {
    this.isAnimating = true;

    // Reset elements
    this.resetElements();

    // Animation akan berjalan otomatis karena CSS animation
    setTimeout(() => {
      this.isAnimating = false;
    }, 2500);
  }

  restartAnimation() {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.resetElements();

    // Add refresh class
    this.socialContainer?.classList.add("social-media-refreshed");

    setTimeout(() => {
      this.socialContainer?.classList.remove("social-media-refreshed");
      this.isAnimating = false;
    }, 1000);
  }

  resetElements() {
    this.socialContainer?.classList.remove("social-media-refreshed");

    // Reset animation dengan re-trigger
    this.socialIcons.forEach((icon) => {
      icon.style.animation = "none";
      icon.offsetHeight; // Trigger reflow
      icon.style.animation = null;
    });
  }

  addClickEffects() {
    this.socialIcons.forEach((icon) => {
      // Simple ripple effect
      icon.addEventListener("click", (e) => {
        const ripple = document.createElement("span");
        const rect = icon.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
          `;

        icon.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }

  // Public method untuk trigger manual
  trigger() {
    this.restartAnimation();
  }
}

// Initialize
const socialAnimator = new SocialMediaAnimator();

// Add ripple CSS
const rippleCSS = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .social-icon {
    position: relative;
    overflow: hidden;
  }
  `;

const rippleStyle = document.createElement("style");
rippleStyle.textContent = rippleCSS;
document.head.appendChild(rippleStyle);

// Expose untuk debugging
window.socialAnimator = socialAnimator;
window.animateSocial = () => {
  socialAnimator.trigger();
  console.log("🎯 Social animation triggered!");
};

console.log("✨ Simple social media animations loaded!");

// Tambahkan JavaScript untuk About page animations

// Scroll Animation Observer
class ScrollAnimator {
  constructor() {
    this.animatedElements = document.querySelectorAll(".scroll-animate");
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    this.init();
  }

  init() {
    this.createObserver();
    this.observeElements();
    this.initCounters();
    this.initSkillBars();
  }

  createObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const delay = element.dataset.delay || 0;

          setTimeout(() => {
            element.classList.add("animate");

            // Trigger specific animations
            if (element.querySelector(".stat-number")) {
              this.animateCounters(element);
            }

            if (element.classList.contains("skill-category")) {
              this.animateSkillBars(element);
            }
          }, delay * 1000);

          // Stop observing once animated
          this.observer.unobserve(element);
        }
      });
    }, this.observerOptions);
  }

  observeElements() {
    this.animatedElements.forEach((element) => {
      this.observer.observe(element);
    });
  }

  initCounters() {
    this.counters = document.querySelectorAll(".stat-number");
  }

  initSkillBars() {
    this.skillBars = document.querySelectorAll(".skill-progress");
  }

  animateCounters(container) {
    const counters = container.querySelectorAll(".stat-number");

    counters.forEach((counter) => {
      const target = parseInt(counter.dataset.target);
      const increment = target / 50;
      let current = 0;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
    });
  }

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Animates the skill bars in a given container. This function is
   * designed to be used with the IntersectionObserver API to animate
   * skill bars when they come into view.

/*******  44c0ce89-0af7-442c-9051-bb17d01136e0  *******/
  animateSkillBars(container) {
    const skillBars = container.querySelectorAll(".skill-progress");

    skillBars.forEach((bar, index) => {
      setTimeout(() => {
        const targetWidth = bar.dataset.width;
        bar.style.width = targetWidth;
      }, index * 200);
    });
  }
}

// Enhanced Navigation for About page
class AboutNavigation {
  constructor() {
    this.navLinks = document.querySelectorAll(".nav-link");
    this.sections = document.querySelectorAll("section[id]");

    this.init();
  }

  init() {
    this.updateActiveNavOnScroll();
    this.addSmoothScrolling();
  }

  updateActiveNavOnScroll() {
    window.addEventListener("scroll", () => {
      let current = "";

      this.sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id");
        }
      });

      this.navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
          link.classList.add("active");
        }
      });
    });
  }

  addSmoothScrolling() {
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");

        if (href.startsWith("#")) {
          e.preventDefault();
          const targetSection = document.querySelector(href);

          if (targetSection) {
            const navbar = document.querySelector(".navbar");
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight - 20;

            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            });
          }
        }
      });
    });
  }
}

// Page Loading Animation
class PageLoader {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.animatePageLoad();
    });
  }

  animatePageLoad() {
    // Add loaded class to body
    document.body.classList.add("page-loaded");

    // Animate hero section first
    const heroContent = document.querySelector(".about-hero-content");
    if (heroContent) {
      setTimeout(() => {
        heroContent.classList.add("animate");
      }, 300);
    }
  }
}

// Interactive Elements
class InteractiveElements {
  constructor() {
    this.init();
  }

  init() {
    this.addProfileImageEffects();
    this.addSkillCategoryEffects();
    this.addTimelineEffects();
  }

  addProfileImageEffects() {
    const imageContainer = document.querySelector(".image-container");
    const profileImg = document.querySelector(".profile-img");

    if (!imageContainer || !profileImg) return;

    // Mouse follow effect
    imageContainer.addEventListener("mousemove", (e) => {
      const rect = imageContainer.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = (y / rect.height) * 10;
      const rotateY = (x / rect.width) * -10;

      profileImg.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        scale(1.05)
      `;
    });

    // Reset on mouse leave
    imageContainer.addEventListener("mouseleave", () => {
      profileImg.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    });
  }

  addSkillCategoryEffects() {
    const skillCategories = document.querySelectorAll(".skill-category");

    skillCategories.forEach((category) => {
      category.addEventListener("mouseenter", () => {
        const icon = category.querySelector(".category-icon");
        if (icon) {
          icon.style.transform = "scale(1.1) rotate(5deg)";
        }
      });

      category.addEventListener("mouseleave", () => {
        const icon = category.querySelector(".category-icon");
        if (icon) {
          icon.style.transform = "scale(1) rotate(0deg)";
        }
      });
    });
  }

  addTimelineEffects() {
    const timelineItems = document.querySelectorAll(".timeline-item");

    timelineItems.forEach((item) => {
      const content = item.querySelector(".timeline-content");

      item.addEventListener("mouseenter", () => {
        content.style.transform = "translateY(-5px) scale(1.02)";
      });

      item.addEventListener("mouseleave", () => {
        content.style.transform = "translateY(0) scale(1)";
      });
    });
  }
}

// Initialize all classes when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const scrollAnimator = new ScrollAnimator();
  const aboutNavigation = new AboutNavigation();
  const pageLoader = new PageLoader();
  const interactiveElements = new InteractiveElements();

  console.log("✨ About page animations initialized!");
});

// Add CSS for page loading animation
const pageLoadCSS = `
.page-loaded .about-hero-content {
  animation: fadeInUp 1s ease forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Smooth transitions for interactive elements */
.category-icon {
  transition: transform 0.3s ease;
}

.timeline-content {
  transition: transform 0.3s ease;
}

.profile-img {
  transition: transform 0.3s ease;
}
`;

// Inject CSS
const pageLoadStyle = document.createElement("style");
pageLoadStyle.textContent = pageLoadCSS;
document.head.appendChild(pageLoadStyle);

// Expose to global scope for debugging
window.scrollAnimator = ScrollAnimator;
window.aboutNavigation = AboutNavigation;

console.log("🎯 About page script loaded successfully!");

// Tambahkan di akhir script.js yang sudah ada

// About Section Animations
class AboutAnimations {
  constructor() {
    this.animatedElements = document.querySelectorAll(".scroll-animate");
    this.counters = document.querySelectorAll(".stat-number");
    this.skillBars = document.querySelectorAll(".skill-progress");

    this.observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    this.init();
  }

  init() {
    this.createObserver();
    this.observeElements();
    this.addProfileImageEffects();
  }

  createObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const delay = element.dataset.delay || 0;

          setTimeout(() => {
            element.classList.add("animate");

            // Trigger specific animations
            if (element.querySelector(".stat-number")) {
              this.animateCounters(element);
            }

            if (element.classList.contains("skill-category-card")) {
              this.animateSkillBar(element);
            }
          }, delay * 1000);

          // Stop observing once animated
          this.observer.unobserve(element);
        }
      });
    }, this.observerOptions);
  }

  observeElements() {
    this.animatedElements.forEach((element) => {
      this.observer.observe(element);
    });
  }

  animateCounters(container) {
    const counters = container.querySelectorAll(".stat-number");

    counters.forEach((counter) => {
      const target = parseInt(counter.dataset.target);
      const increment = target / 50;
      let current = 0;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
    });
  }

  animateSkillBar(card) {
    const skillBar = card.querySelector(".skill-progress");
    if (skillBar) {
      setTimeout(() => {
        const targetWidth = skillBar.dataset.width;
        skillBar.style.width = targetWidth;
      }, 500);
    }
  }

  addProfileImageEffects() {
    const imageContainer = document.querySelector(".image-container");
    const profileImg = document.querySelector(".profile-img");

    if (!imageContainer || !profileImg) return;

    // Mouse follow effect
    imageContainer.addEventListener("mousemove", (e) => {
      const rect = imageContainer.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = (y / rect.height) * 10;
      const rotateY = (x / rect.width) * -10;

      profileImg.style.transform = `
          perspective(1000px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          scale(1.05)
        `;
    });

    // Reset on mouse leave
    imageContainer.addEventListener("mouseleave", () => {
      profileImg.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    });

    // Click effect
    imageContainer.addEventListener("click", () => {
      profileImg.style.animation = "profilePulse 0.6s ease";
      setTimeout(() => {
        profileImg.style.animation = "";
      }, 600);
    });
  }
}

// Enhanced CTA Button for About section
function updateCTAButton() {
  const ctaButton = document.querySelector(".cta-button");
  if (ctaButton) {
    ctaButton.addEventListener("click", (e) => {
      e.preventDefault();

      // Smooth scroll to about section
      const aboutSection = document.querySelector("#about");
      if (aboutSection) {
        const navbar = document.querySelector(".navbar");
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = aboutSection.offsetTop - navbarHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  }
}

// Enhanced scroll down arrow
function updateScrollDown() {
  const scrollDown = document.querySelector(".scroll-down");
  if (scrollDown) {
    scrollDown.addEventListener("click", () => {
      const aboutSection = document.querySelector("#about");
      if (aboutSection) {
        const navbar = document.querySelector(".navbar");
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = aboutSection.offsetTop - navbarHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  }
}

// Add CSS for profile pulse animation
const profilePulseCSS = `
  @keyframes profilePulse {
    0% { 
      transform: scale(1); 
      box-shadow: 0 0 20px var(--primary-color);
    }
    50% { 
      transform: scale(1.05); 
      box-shadow: 0 0 40px var(--primary-color), 0 0 80px var(--primary-color);
    }
    100% { 
      transform: scale(1); 
      box-shadow: 0 0 20px var(--primary-color);
    }
  }
  
  .profile-img {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  `;

// Inject CSS
const profilePulseStyle = document.createElement("style");
profilePulseStyle.textContent = profilePulseCSS;
document.head.appendChild(profilePulseStyle);

// Initialize About animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize existing animations
  setTimeout(typeText, 1000);

  // Initialize About section animations
  const aboutAnimations = new AboutAnimations();

  // Update CTA and scroll functionality
  updateCTAButton();
  updateScrollDown();

  console.log("✨ About section animations initialized!");
});

// Expose for debugging
window.aboutAnimations = AboutAnimations;

console.log("🎯 Enhanced script loaded with About section!");

// Tambahkan di bagian akhir script.js
document.addEventListener("DOMContentLoaded", () => {
  // Skill cards pop up animation
  const skillCards = document.querySelectorAll(".skill-category-card");

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll(".skill-category-card");
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("animate");
          }, index * 150);
        });
      }
    });
  }, observerOptions);

  // Observe skills container
  const skillsContainer = document.querySelector(".skills-overview");
  if (skillsContainer) {
    skillObserver.observe(skillsContainer);
  }
});

// Particle Network/Constellation Effect
class ParticleNetwork {
  constructor(container) {
    this.container = container;
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.mouse = { x: 0, y: 0 };
    this.animationId = null;

    this.config = {
      particleCount: window.innerWidth < 768 ? 50 : 80,
      maxDistance: window.innerWidth < 768 ? 100 : 150,
      particleSpeed: 0.5,
      particleSize: 2,
      lineOpacity: 0.3,
      particleOpacity: 0.8,
      mouseRadius: 150,
      colors: {
        particles: "#00d4ff",
        lines: "#00d4ff",
        mouseLines: "#00ff88",
      },
    };

    this.init();
  }

  init() {
    this.createCanvas();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  createCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvas.className = "particle-canvas";
    this.ctx = this.canvas.getContext("2d");

    this.resize();
    this.container.appendChild(this.canvas);
  }

  createParticles() {
    this.particles = [];

    for (let i = 0; i < this.config.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.config.particleSpeed,
        vy: (Math.random() - 0.5) * this.config.particleSpeed,
        size: Math.random() * this.config.particleSize + 1,
      });
    }
  }

  bindEvents() {
    window.addEventListener("resize", () => this.resize());

    // Mouse interaction
    this.container.addEventListener("mousemove", (e) => {
      const rect = this.container.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    this.container.addEventListener("mouseleave", () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });
  }

  resize() {
    this.canvas.width = this.container.offsetWidth;
    this.canvas.height = this.container.offsetHeight;

    // Adjust particle count based on screen size
    const newCount = window.innerWidth < 768 ? 50 : 80;
    if (newCount !== this.config.particleCount) {
      this.config.particleCount = newCount;
      this.createParticles();
    }
  }

  updateParticles() {
    this.particles.forEach((particle) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off edges
      if (particle.x < 0 || particle.x > this.canvas.width) {
        particle.vx *= -1;
      }
      if (particle.y < 0 || particle.y > this.canvas.height) {
        particle.vy *= -1;
      }

      // Keep particles in bounds
      particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
    });
  }

  drawParticles() {
    this.ctx.fillStyle = this.config.colors.particles;

    this.particles.forEach((particle) => {
      this.ctx.globalAlpha = this.config.particleOpacity;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();

      // Glow effect
      this.ctx.shadowColor = this.config.colors.particles;
      this.ctx.shadowBlur = 10;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    });
  }

  drawConnections() {
    this.particles.forEach((particle, i) => {
      // Connect to nearby particles
      for (let j = i + 1; j < this.particles.length; j++) {
        const other = this.particles[j];
        const distance = Math.sqrt(
          Math.pow(particle.x - other.x, 2) + Math.pow(particle.y - other.y, 2)
        );

        if (distance < this.config.maxDistance) {
          const opacity =
            this.config.lineOpacity * (1 - distance / this.config.maxDistance);

          this.ctx.globalAlpha = opacity;
          this.ctx.strokeStyle = this.config.colors.lines;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(other.x, other.y);
          this.ctx.stroke();
        }
      }

      // Connect to mouse
      const mouseDistance = Math.sqrt(
        Math.pow(particle.x - this.mouse.x, 2) +
          Math.pow(particle.y - this.mouse.y, 2)
      );

      if (mouseDistance < this.config.mouseRadius) {
        const opacity = 0.6 * (1 - mouseDistance / this.config.mouseRadius);

        this.ctx.globalAlpha = opacity;
        this.ctx.strokeStyle = this.config.colors.mouseLines;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(particle.x, particle.y);
        this.ctx.lineTo(this.mouse.x, this.mouse.y);
        this.ctx.stroke();
      }
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.updateParticles();
    this.drawConnections();
    this.drawParticles();

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.canvas) {
      this.canvas.remove();
    }
  }
}

// Initialize Particle Network
function createParticleNetwork() {
  const aboutSection = document.querySelector(".about-section");

  if (!aboutSection) {
    console.log("About section not found");
    return;
  }

  // Create container
  const networkContainer = document.createElement("div");
  networkContainer.className = "particle-network loading";
  aboutSection.appendChild(networkContainer);

  // Initialize particle system
  const particleSystem = new ParticleNetwork(networkContainer);

  // Fade in effect
  setTimeout(() => {
    networkContainer.classList.remove("loading");
    networkContainer.classList.add("loaded");
  }, 500);

  // Store reference for cleanup
  window.particleSystem = particleSystem;

  console.log("Particle network created successfully");
}

// Cleanup function
function destroyParticleNetwork() {
  if (window.particleSystem) {
    window.particleSystem.destroy();
    window.particleSystem = null;
  }

  const existingNetwork = document.querySelector(".particle-network");
  if (existingNetwork) {
    existingNetwork.remove();
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(createParticleNetwork, 500);
});

// Handle page visibility changes for performance
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Pause animation when page is not visible
    if (window.particleSystem && window.particleSystem.animationId) {
      cancelAnimationFrame(window.particleSystem.animationId);
      window.particleSystem.animationId = null;
    }
  } else {
    // Resume animation when page becomes visible
    if (window.particleSystem && !window.particleSystem.animationId) {
      window.particleSystem.animate();
    }
  }
});

// Enhanced Profile Image Animations
class ProfileImageAnimator {
  constructor() {
    this.imageContainer = null;
    this.profileImg = null;
    this.isAnimating = false;
    this.particles = [];
    this.init();
  }

  init() {
    this.imageContainer = document.querySelector(".image-container");
    this.profileImg = document.querySelector(".profile-img");

    if (!this.imageContainer || !this.profileImg) {
      console.log("Profile image elements not found");
      return;
    }

    this.setupEntranceAnimation();
    this.setupMouseEffects();
    this.setupClickEffects();
    this.createParticleSystem();
    this.setupKeyboardInteraction();
  }

  setupEntranceAnimation() {
    // Trigger entrance animation when image comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.isAnimating) {
            this.isAnimating = true;
            this.profileImg.classList.add("animate-in");

            // Add stagger effect to other elements
            setTimeout(() => {
              this.animateStatsContainer();
            }, 1000);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(this.imageContainer);
  }

  setupMouseEffects() {
    let isHovering = false;

    // 3D tilt effect
    this.imageContainer.addEventListener("mousemove", (e) => {
      if (!isHovering) return;

      const rect = this.imageContainer.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = (y / rect.height) * 15;
      const rotateY = (x / rect.width) * -15;

      this.profileImg.classList.add("tilt-active");
      this.profileImg.style.transform = `
          perspective(1000px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          translateY(-10px) 
          scale(1.05)
        `;
    });

    this.imageContainer.addEventListener("mouseenter", () => {
      isHovering = true;
      this.createHoverParticles();
    });

    this.imageContainer.addEventListener("mouseleave", () => {
      isHovering = false;
      this.profileImg.classList.remove("tilt-active");
      this.profileImg.style.transform = "";
    });
  }

  setupClickEffects() {
    this.imageContainer.addEventListener("click", () => {
      this.profileImg.classList.add("clicked");
      this.createClickParticles();
      this.showImageInfo();

      setTimeout(() => {
        this.profileImg.classList.remove("clicked");
      }, 800);
    });
  }

  createParticleSystem() {
    // Create particle container
    const particleContainer = document.createElement("div");
    particleContainer.className = "image-particles";
    this.imageContainer.appendChild(particleContainer);

    // Create floating particles
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        this.createFloatingParticle(particleContainer);
      }, i * 500);
    }

    // Continuous particle generation
    setInterval(() => {
      if (Math.random() > 0.7) {
        this.createFloatingParticle(particleContainer);
      }
    }, 2000);
  }

  createFloatingParticle(container) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random position around the circle
    const angle = Math.random() * Math.PI * 2;
    const radius = 120 + Math.random() * 30;
    const x = 150 + Math.cos(angle) * radius;
    const y = 150 + Math.sin(angle) * radius;

    particle.style.left = x + "px";
    particle.style.top = y + "px";
    particle.style.animationDelay = Math.random() * 2 + "s";
    particle.style.animationDuration = 2 + Math.random() * 2 + "s";

    container.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 4000);
  }

  createHoverParticles() {
    const container = this.imageContainer.querySelector(".image-particles");

    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const particle = document.createElement("div");
        particle.className = "particle";
        particle.style.background = "#00ff88";

        const angle = Math.random() * Math.PI * 2;
        const radius = 100 + Math.random() * 50;
        const x = 150 + Math.cos(angle) * radius;
        const y = 150 + Math.sin(angle) * radius;

        particle.style.left = x + "px";
        particle.style.top = y + "px";
        particle.style.animationDuration = "1s";

        container.appendChild(particle);

        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 1000);
      }, i * 100);
    }
  }

  createClickParticles() {
    const container = this.imageContainer.querySelector(".image-particles");

    // Burst effect
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.background = "#ffffff";
      particle.style.width = "6px";
      particle.style.height = "6px";

      const angle = (i / 12) * Math.PI * 2;
      const startRadius = 80;
      const endRadius = 200;

      const startX = 150 + Math.cos(angle) * startRadius;
      const startY = 150 + Math.sin(angle) * startRadius;
      const endX = 150 + Math.cos(angle) * endRadius;
      const endY = 150 + Math.sin(angle) * endRadius;

      particle.style.left = startX + "px";
      particle.style.top = startY + "px";

      // Custom animation
      particle.animate(
        [
          {
            transform: "translate(0, 0) scale(1)",
            opacity: 1,
          },
          {
            transform: `translate(${endX - startX}px, ${
              endY - startY
            }px) scale(0)`,
            opacity: 0,
          },
        ],
        {
          duration: 800,
          easing: "ease-out",
        }
      );

      container.appendChild(particle);

      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 800);
    }
  }

  animateStatsContainer() {
    const statsContainer = document.querySelector(".stats-container");
    if (statsContainer) {
      statsContainer.style.opacity = "0";
      statsContainer.style.transform = "translateY(30px)";

      setTimeout(() => {
        statsContainer.style.transition = "all 0.8s ease";
        statsContainer.style.opacity = "1";
        statsContainer.style.transform = "translateY(0)";
      }, 200);
    }
  }

  showImageInfo() {
    // Create temporary info popup
    const infoPopup = document.createElement("div");
    infoPopup.innerHTML = `
        <div style="
          position: absolute;
          top: -50px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(26, 26, 46, 0.95);
          color: var(--primary-color);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
          border: 1px solid var(--primary-color);
          box-shadow: var(--neon-glow);
          backdrop-filter: blur(10px);
          white-space: nowrap;
          z-index: 1000;
          animation: fadeInScale 0.3s ease;
        ">
          <i class="fas fa-camera"></i> Click for more interactions!
        </div>
      `;

    this.imageContainer.appendChild(infoPopup);

    setTimeout(() => {
      if (infoPopup.parentNode) {
        infoPopup.style.opacity = "0";
        infoPopup.style.transform =
          "translateX(-50%) translateY(-10px) scale(0.8)";
        setTimeout(() => {
          infoPopup.parentNode.removeChild(infoPopup);
        }, 300);
      }
    }, 2000);
  }

  setupKeyboardInteraction() {
    // Add keyboard accessibility
    this.imageContainer.setAttribute("tabindex", "0");
    this.imageContainer.setAttribute("role", "button");
    this.imageContainer.setAttribute(
      "aria-label",
      "Profile image with interactive animations"
    );

    this.imageContainer.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.imageContainer.click();
      }
    });

    this.imageContainer.addEventListener("focus", () => {
      this.profileImg.style.outline = "2px solid var(--primary-color)";
      this.profileImg.style.outlineOffset = "4px";
    });

    this.imageContainer.addEventListener("blur", () => {
      this.profileImg.style.outline = "none";
    });
  }

  // Public methods for external control
  triggerFloatAnimation() {
    this.profileImg.style.animation = "none";
    setTimeout(() => {
      this.profileImg.style.animation = "profileFloat 2s ease-in-out infinite";
    }, 10);
  }

  pauseAnimations() {
    this.profileImg.style.animationPlayState = "paused";
    const glowRing = this.imageContainer.querySelector(".glow-ring");
    if (glowRing) {
      glowRing.style.animationPlayState = "paused";
    }
  }

  resumeAnimations() {
    this.profileImg.style.animationPlayState = "running";
    const glowRing = this.imageContainer.querySelector(".glow-ring");
    if (glowRing) {
      glowRing.style.animationPlayState = "running";
    }
  }
}

// Enhanced CSS animations
const profileAnimationCSS = `
  @keyframes fadeInScale {
    0% {
      opacity: 0;
      transform: translateX(-50%) scale(0.5);
    }
    100% {
      opacity: 1;
      transform: translateX(-50%) scale(1);
    }
  }
  
  /* Smooth transitions for all profile elements */
  .image-container * {
    transition: all 0.3s ease;
  }
  
  /* Enhanced focus states */
  .image-container:focus {
    outline: none;
  }
  
  .image-container:focus .profile-img {
    box-shadow: 
      var(--neon-glow-strong),
      0 0 0 4px rgba(0, 212, 255, 0.3);
  }
  
  /* Loading state */
  .profile-img.loading {
    opacity: 0;
    transform: scale(0.8);
    filter: blur(5px);
  }
  
  /* Success state after loading */
  .profile-img.loaded {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
    transition: all 1s ease;
  }
  
  /* Pulse effect for attention */
  .image-container.pulse .profile-img {
    animation: profilePulse 1.5s ease-in-out;
  }
  
  @keyframes profilePulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: var(--neon-glow-strong);
    }
    50% {
      transform: scale(1.05);
      box-shadow: 
        var(--neon-glow-strong),
        0 0 40px rgba(0, 212, 255, 0.6);
    }
  }
  
  /* Glitch effect (easter egg) */
  .image-container.glitch .profile-img {
    animation: profileGlitch 0.5s ease-in-out;
  }
  
  @keyframes profileGlitch {
    0%, 100% { transform: translate(0); }
    10% { transform: translate(-2px, 2px); }
    20% { transform: translate(2px, -2px); }
    30% { transform: translate(-2px, -2px); }
    40% { transform: translate(2px, 2px); }
    50% { transform: translate(-2px, 2px); }
    60% { transform: translate(2px, -2px); }
    70% { transform: translate(-2px, -2px); }
    80% { transform: translate(2px, 2px); }
    90% { transform: translate(-2px, 2px); }
  }
  `;

// Inject enhanced CSS
const profileStyle = document.createElement("style");
profileStyle.textContent = profileAnimationCSS;
document.head.appendChild(profileStyle);

// Initialize Profile Image Animator
let profileAnimator;

document.addEventListener("DOMContentLoaded", () => {
  // Wait a bit for other elements to load
  setTimeout(() => {
    profileAnimator = new ProfileImageAnimator();

    // Store global reference
    window.profileAnimator = profileAnimator;
  }, 1000);
});

// Additional interactive features
document.addEventListener("DOMContentLoaded", () => {
  // Double click for special effect
  let clickCount = 0;
  let clickTimer = null;

  document.addEventListener("click", (e) => {
    if (e.target.closest(".image-container")) {
      clickCount++;

      if (clickCount === 1) {
        clickTimer = setTimeout(() => {
          clickCount = 0;
        }, 300);
      } else if (clickCount === 2) {
        clearTimeout(clickTimer);
        clickCount = 0;

        // Double click effect
        const container = e.target.closest(".image-container");
        container.classList.add("pulse");

        setTimeout(() => {
          container.classList.remove("pulse");
        }, 1500);
      }
    }
  });

  // Easter egg: Konami code for glitch effect
  let konamiSequence = [];
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ];

  document.addEventListener("keydown", (e) => {
    konamiSequence.push(e.code);

    if (konamiSequence.length > konamiCode.length) {
      konamiSequence.shift();
    }

    if (konamiSequence.join(",") === konamiCode.join(",")) {
      const container = document.querySelector(".image-container");
      if (container) {
        container.classList.add("glitch");
        setTimeout(() => {
          container.classList.remove("glitch");
        }, 500);
      }
      konamiSequence = [];
    }
  });
});

// Performance optimization
document.addEventListener("visibilitychange", () => {
  if (window.profileAnimator) {
    if (document.hidden) {
      window.profileAnimator.pauseAnimations();
    } else {
      window.profileAnimator.resumeAnimations();
    }
  }
});

// Intersection Observer for performance
const profileObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const container = entry.target;
      if (entry.isIntersecting) {
        // Resume animations when visible
        container.style.animationPlayState = "running";
      } else {
        // Pause animations when not visible
        container.style.animationPlayState = "paused";
      }
    });
  },
  { threshold: 0.1 }
);

// Observe profile container when it exists
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const profileContainer = document.querySelector(".image-container");
    if (profileContainer) {
      profileObserver.observe(profileContainer);
    }
  }, 1500);
});

// Pure Consistent Live Background System
class ConsistentLiveBackground {
  constructor() {
    this.mouseGlow = null;
    this.isInitialized = false;
    this.animationFrameId = null;
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.isMouseActive = false;
    this.performanceMode = "normal"; // normal, reduced, minimal
    this.lastFrameTime = 0;
    this.frameCount = 0;
  }

  init() {
    if (this.isInitialized) return;

    console.log("🎨 Initializing Consistent Live Background...");

    this.createBackground();
    this.setupMouseInteraction();
    this.setupClickEffects();
    this.setupScrollEffects();
    this.setupTouchSupport();
    this.startPerformanceMonitoring();
    this.setupVisibilityHandling();

    this.isInitialized = true;
    console.log("✅ Consistent Live Background initialized successfully");
  }

  createBackground() {
    // Remove existing background if any
    this.removeExistingBackground();

    // Create main consistent animated background
    const consistentBg = document.createElement("div");
    consistentBg.className = "consistent-live-bg";
    consistentBg.setAttribute("aria-hidden", "true");
    document.body.appendChild(consistentBg);

    // Create mouse glow effect
    this.mouseGlow = document.createElement("div");
    this.mouseGlow.className = "mouse-glow-consistent";
    this.mouseGlow.setAttribute("aria-hidden", "true");
    document.body.appendChild(this.mouseGlow);

    console.log("🎨 Background elements created");
  }

  removeExistingBackground() {
    const existingElements = [
      ".consistent-live-bg",
      ".mouse-glow-consistent",
      ".live-animated-bg",
      ".animated-gradient-bg",
    ];

    existingElements.forEach((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        element.remove();
      }
    });
  }

  setupMouseInteraction() {
    let mouseTimeout;
    let isMoving = false;

    const handleMouseMove = (e) => {
      this.targetX = e.clientX;
      this.targetY = e.clientY;

      if (!isMoving) {
        isMoving = true;
        this.isMouseActive = true;
        if (this.mouseGlow) {
          this.mouseGlow.style.opacity = "1";
        }
      }

      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        isMoving = false;
        this.isMouseActive = false;
        if (this.mouseGlow) {
          this.mouseGlow.style.opacity = "0";
        }
      }, 2000);
    };

    // Throttle mouse move events for better performance
    let ticking = false;
    document.addEventListener("mousemove", (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleMouseMove(e);
          ticking = false;
        });
        ticking = true;
      }
    });

    // Start smooth mouse following animation
    this.startMouseAnimation();
  }

  startMouseAnimation() {
    const updateMouseGlow = () => {
      if (this.mouseGlow && this.isMouseActive) {
        // Smooth interpolation
        this.mouseX += (this.targetX - this.mouseX) * 0.1;
        this.mouseY += (this.targetY - this.mouseY) * 0.1;

        this.mouseGlow.style.left = this.mouseX + "px";
        this.mouseGlow.style.top = this.mouseY + "px";
      }

      this.animationFrameId = requestAnimationFrame(updateMouseGlow);
    };

    updateMouseGlow();
  }

  setupClickEffects() {
    document.addEventListener("click", (e) => {
      this.createClickRipple(e.clientX, e.clientY);
    });

    // Add click ripple styles if not exists
    if (!document.querySelector("#consistent-click-styles")) {
      this.addClickStyles();
    }
  }

  createClickRipple(x, y) {
    const ripple = document.createElement("div");

    ripple.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: radial-gradient(
          circle,
          rgba(0, 212, 255, 0.6) 0%,
          rgba(0, 212, 255, 0.3) 50%,
          transparent 100%
        );
        pointer-events: none;
        z-index: 9999;
        animation: consistentClickRipple 0.8s ease-out forwards;
      `;

    document.body.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 800);
  }

  addClickStyles() {
    const clickStyles = document.createElement("style");
    clickStyles.id = "consistent-click-styles";
    clickStyles.textContent = `
        @keyframes consistentClickRipple {
          0% {
            width: 0;
            height: 0;
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(0);
          }
          50% {
            opacity: 0.4;
            transform: translate(-50%, -50%) scale(0.5);
          }
                  100% {
          width: 200px;
          height: 200px;
          opacity: 0;
          transform: translate(-50%, -50%) scale(1);
        }
      }
    `;
    document.head.appendChild(clickStyles);
  }

  setupScrollEffects() {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateScrollEffects();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
  }

  updateScrollEffects() {
    const scrollPercent =
      window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight);
    const consistentBg = document.querySelector(".consistent-live-bg");

    if (consistentBg) {
      // Subtle parallax effect
      const translateY = scrollPercent * 20;
      consistentBg.style.transform = `translateY(${translateY}px) translateZ(0)`;

      // Slight opacity change for depth
      const opacity = 0.85 - scrollPercent * 0.05;
      consistentBg.style.opacity = Math.max(0.75, opacity);
    }
  }

  setupTouchSupport() {
    if (!("ontouchstart" in window)) return;

    let touchTimeout;

    document.addEventListener(
      "touchstart",
      (e) => {
        const touch = e.touches[0];
        this.createClickRipple(touch.clientX, touch.clientY);
      },
      { passive: true }
    );

    document.addEventListener(
      "touchmove",
      (e) => {
        const touch = e.touches[0];
        this.targetX = touch.clientX;
        this.targetY = touch.clientY;

        if (this.mouseGlow) {
          this.mouseGlow.style.opacity = "0.7";
        }

        clearTimeout(touchTimeout);
        touchTimeout = setTimeout(() => {
          if (this.mouseGlow) {
            this.mouseGlow.style.opacity = "0";
          }
        }, 1000);
      },
      { passive: true }
    );

    document.addEventListener(
      "touchend",
      () => {
        setTimeout(() => {
          if (this.mouseGlow) {
            this.mouseGlow.style.opacity = "0";
          }
        }, 500);
      },
      { passive: true }
    );

    console.log("📱 Touch support enabled");
  }

  startPerformanceMonitoring() {
    let frameCount = 0;
    let lastTime = performance.now();
    let fpsHistory = [];

    const monitorFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        const fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;

        fpsHistory.push(fps);
        if (fpsHistory.length > 3) {
          fpsHistory.shift();
        }

        const avgFPS =
          fpsHistory.reduce((a, b) => a + b, 0) / fpsHistory.length;
        this.adjustPerformance(avgFPS);
      }

      requestAnimationFrame(monitorFPS);
    };

    monitorFPS();
    console.log("📊 Performance monitoring started");
  }

  adjustPerformance(fps) {
    const consistentBg = document.querySelector(".consistent-live-bg");
    if (!consistentBg) return;

    if (fps < 30 && this.performanceMode !== "minimal") {
      // Reduce effects for better performance
      this.performanceMode = "minimal";
      consistentBg.style.animationDuration = "30s";
      consistentBg.style.opacity = "0.7";

      const beforeElement = consistentBg;
      beforeElement.style.setProperty("--particle-opacity", "0.3");

      console.log(
        "🔧 Performance mode: MINIMAL (FPS: " + Math.round(fps) + ")"
      );
    } else if (fps >= 30 && fps < 50 && this.performanceMode !== "reduced") {
      // Moderate performance mode
      this.performanceMode = "reduced";
      consistentBg.style.animationDuration = "25s";
      consistentBg.style.opacity = "0.8";

      console.log(
        "🔧 Performance mode: REDUCED (FPS: " + Math.round(fps) + ")"
      );
    } else if (fps >= 50 && this.performanceMode !== "normal") {
      // Full effects
      this.performanceMode = "normal";
      consistentBg.style.animationDuration = "20s";
      consistentBg.style.opacity = "0.85";

      console.log("🔧 Performance mode: NORMAL (FPS: " + Math.round(fps) + ")");
    }
  }

  setupVisibilityHandling() {
    document.addEventListener("visibilitychange", () => {
      const consistentBg = document.querySelector(".consistent-live-bg");

      if (document.hidden) {
        // Pause animations when tab is not visible
        if (consistentBg) {
          consistentBg.style.animationPlayState = "paused";
        }
        if (this.animationFrameId) {
          cancelAnimationFrame(this.animationFrameId);
        }
        console.log("⏸️ Background paused (tab hidden)");
      } else {
        // Resume animations when tab becomes visible
        if (consistentBg) {
          consistentBg.style.animationPlayState = "running";
        }
        this.startMouseAnimation();
        console.log("▶️ Background resumed (tab visible)");
      }
    });
  }

  // Utility methods
  updateColorIntensity(intensity = 1) {
    const consistentBg = document.querySelector(".consistent-live-bg");
    if (consistentBg) {
      const clampedIntensity = Math.max(0.5, Math.min(1.2, intensity));
      consistentBg.style.filter = `brightness(${clampedIntensity}) saturate(${clampedIntensity})`;
    }
  }

  setOpacity(opacity = 0.85) {
    const consistentBg = document.querySelector(".consistent-live-bg");
    if (consistentBg) {
      const clampedOpacity = Math.max(0.3, Math.min(1, opacity));
      consistentBg.style.opacity = clampedOpacity;
    }
  }

  // Cleanup method
  destroy() {
    console.log("🧹 Cleaning up Consistent Live Background...");

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    // Remove all created elements
    const elements = [".consistent-live-bg", ".mouse-glow-consistent"];

    elements.forEach((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        element.remove();
      }
    });

    // Remove styles
    const style = document.querySelector("#consistent-click-styles");
    if (style) {
      style.remove();
    }

    this.isInitialized = false;
    console.log("✅ Background cleanup completed");
  }

  // Public API methods
  pause() {
    const consistentBg = document.querySelector(".consistent-live-bg");
    if (consistentBg) {
      consistentBg.style.animationPlayState = "paused";
    }
  }

  resume() {
    const consistentBg = document.querySelector(".consistent-live-bg");
    if (consistentBg) {
      consistentBg.style.animationPlayState = "running";
    }
  }

  getPerformanceMode() {
    return this.performanceMode;
  }

  isActive() {
    return this.isInitialized;
  }
}

// Initialize the consistent live background
const consistentLiveBackground = new ConsistentLiveBackground();

// Auto-start when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Small delay to ensure all elements are loaded
  setTimeout(() => {
    consistentLiveBackground.init();
  }, 150);
});

// Handle page unload
window.addEventListener("beforeunload", () => {
  consistentLiveBackground.destroy();
});

// Handle window resize with debouncing
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (consistentLiveBackground.isActive()) {
      console.log("🔄 Handling window resize...");
      // Just update scroll effects, no need to recreate
      consistentLiveBackground.updateScrollEffects();
    }
  }, 250);
});

// Handle focus/blur for performance
window.addEventListener("focus", () => {
  if (consistentLiveBackground.isActive()) {
    consistentLiveBackground.resume();
  }
});

window.addEventListener("blur", () => {
  if (consistentLiveBackground.isActive()) {
    consistentLiveBackground.pause();
  }
});

// Export for external use
window.ConsistentLiveBackground = consistentLiveBackground;

// Development helpers (remove in production)
if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
) {
  window.bgControls = {
    pause: () => consistentLiveBackground.pause(),
    resume: () => consistentLiveBackground.resume(),
    destroy: () => consistentLiveBackground.destroy(),
    init: () => consistentLiveBackground.init(),
    setOpacity: (opacity) => consistentLiveBackground.setOpacity(opacity),
    updateIntensity: (intensity) =>
      consistentLiveBackground.updateColorIntensity(intensity),
    getMode: () => consistentLiveBackground.getPerformanceMode(),
  };
  console.log("🛠️ Dev controls available: window.bgControls");
}

console.log("🎨 Pure Consistent Live Background System loaded successfully!");

// Enhanced Skills Animations with Pure Consistent Live Animated Background
function initEnhancedSkillsAnimations() {
  // Create additional floating particles dynamically
  const skillsSection = document.querySelector(".skills-section");
  const floatingElements = skillsSection.querySelector(".floating-elements");

  // Add more floating particles for richer animation
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement("div");
    particle.className = "floating-particle";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 10 + "s";
    particle.style.animationDuration = Math.random() * 5 + 5 + "s";
    floatingElements.appendChild(particle);
  }

  // Enhanced skill bar animations with stagger effect
  const skillCategories = document.querySelectorAll(".skill-category");

  const enhancedSkillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const skillBars = entry.target.querySelectorAll(".skill-progress");

          skillBars.forEach((bar, barIndex) => {
            setTimeout(() => {
              const targetWidth = bar.dataset.width;
              bar.style.width = targetWidth;

              // Add completion animation
              setTimeout(() => {
                bar.parentElement.classList.add("skill-completed");
              }, 2000);
            }, barIndex * 300);
          });

          enhancedSkillObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "0px 0px -100px 0px",
    }
  );

  skillCategories.forEach((category) => {
    enhancedSkillObserver.observe(category);
  });

  // Parallax effect for background elements
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const skillsSection = document.querySelector(".skills-section");
    const skillsRect = skillsSection.getBoundingClientRect();

    if (skillsRect.top < window.innerHeight && skillsRect.bottom > 0) {
      const particles = skillsSection.querySelectorAll(".floating-particle");

      particles.forEach((particle, index) => {
        const speed = 0.5 + index * 0.1;
        const yPos = scrolled * speed * 0.1;
        particle.style.transform = `translateY(${yPos}px) translateX(${
          Math.sin(scrolled * 0.01 + index) * 10
        }px)`;
      });
    }
  });
}

// Initialize enhanced animations
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    initEnhancedSkillsAnimations();
  }, 1000);
});

console.log(
  "🌟 Enhanced Skills section with Pure Consistent Live Animated Background loaded!"
);

// Enhanced Pop-up Animations for Hard Skills
function initSkillCardPopUpAnimations() {
  const skillCards = document.querySelectorAll(".skill-category");

  // Intersection Observer untuk trigger pop-up animation
  const popUpObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add staggered delay based on card position
          setTimeout(() => {
            entry.target.classList.add("animate");

            // Trigger skill bar animations after card pop-up
            setTimeout(() => {
              const skillBars =
                entry.target.querySelectorAll(".skill-progress");
              skillBars.forEach((bar, barIndex) => {
                setTimeout(() => {
                  const targetWidth = bar.dataset.width;
                  bar.style.width = targetWidth;
                }, barIndex * 200);
              });
            }, 600);
          }, index * 200);

          popUpObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  skillCards.forEach((card) => {
    popUpObserver.observe(card);
  });

  // Add click effect
  skillCards.forEach((card) => {
    card.addEventListener("click", function () {
      this.style.transform = "translateY(-10px) scale(0.98)";

      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });

    // Add mouse enter/leave effects
    card.addEventListener("mouseenter", function () {
      this.style.zIndex = "10";
    });

    card.addEventListener("mouseleave", function () {
      this.style.zIndex = "2";
    });
  });
}

// Enhanced scroll-triggered animations
function initEnhancedScrollAnimations() {
  const animatedElements = document.querySelectorAll(".scroll-animate");

  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;

          setTimeout(() => {
            entry.target.classList.add("animate");

            // Special handling for skill categories
            // Special handling for skill categories
            if (entry.target.classList.contains("skill-category")) {
              // Add extra pop effect
              entry.target.style.transform = "scale(1.1)";

              setTimeout(() => {
                entry.target.style.transform = "";
              }, 300);

              // Animate skill bars with enhanced effect
              const skillBars =
                entry.target.querySelectorAll(".skill-progress");
              skillBars.forEach((bar, barIndex) => {
                setTimeout(() => {
                  const targetWidth = bar.dataset.width;
                  bar.style.width = targetWidth;

                  // Add completion sparkle effect
                  setTimeout(() => {
                    createSparkleEffect(bar);
                  }, 1500);
                }, barIndex * 300 + 800);
              });
            }

            // Special handling for skill headers
            if (entry.target.classList.contains("skills-category-title")) {
              entry.target.style.animation =
                "titleBounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
            }
          }, delay * 100);

          scrollObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -100px 0px",
    }
  );

  animatedElements.forEach((element) => {
    scrollObserver.observe(element);
  });
}

// Create sparkle effect for completed skill bars
function createSparkleEffect(skillBar) {
  const sparkles = [];
  const sparkleCount = 8;

  for (let i = 0; i < sparkleCount; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "skill-sparkle";
    sparkle.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    background: #00d4ff;
    border-radius: 50%;
    pointer-events: none;
    z-index: 100;
    box-shadow: 0 0 6px #00d4ff;
  `;

    // Position sparkles around the skill bar
    const rect = skillBar.getBoundingClientRect();
    const angle = (i / sparkleCount) * Math.PI * 2;
    const radius = 20;

    sparkle.style.left =
      rect.left + rect.width + Math.cos(angle) * radius + "px";
    sparkle.style.top =
      rect.top + rect.height / 2 + Math.sin(angle) * radius + "px";

    document.body.appendChild(sparkle);
    sparkles.push(sparkle);

    // Animate sparkle
    sparkle.animate(
      [
        {
          transform: "scale(0) rotate(0deg)",
          opacity: 0,
        },
        {
          transform: "scale(1.5) rotate(180deg)",
          opacity: 1,
          offset: 0.5,
        },
        {
          transform: "scale(0) rotate(360deg)",
          opacity: 0,
        },
      ],
      {
        duration: 1000,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      }
    ).onfinish = () => {
      sparkle.remove();
    };
  }
}

// Enhanced card interaction effects
function initCardInteractionEffects() {
  const skillCards = document.querySelectorAll(".skill-category");

  skillCards.forEach((card) => {
    // Mouse move parallax effect
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = (y / rect.height) * 5;
      const rotateY = (x / rect.width) * -5;

      card.style.transform = `
      translateY(-15px) 
      scale(1.03) 
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg)
    `;
    });

    // Reset on mouse leave
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });

    // Double click effect
    card.addEventListener("dblclick", () => {
      card.style.animation = "cardExcitement 0.6s ease";

      // Create burst effect
      createBurstEffect(card);

      setTimeout(() => {
        card.style.animation = "";
      }, 600);
    });

    // Long press effect (for mobile)
    let pressTimer;
    card.addEventListener("touchstart", (e) => {
      pressTimer = setTimeout(() => {
        card.style.animation = "cardPulse 1s ease infinite";
        navigator.vibrate && navigator.vibrate(100);
      }, 500);
    });

    card.addEventListener("touchend", () => {
      clearTimeout(pressTimer);
      card.style.animation = "";
    });
  });
}

// Create burst effect
function createBurstEffect(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 12; i++) {
    const particle = document.createElement("div");
    particle.className = "burst-particle";
    particle.style.cssText = `
    position: fixed;
    width: 6px;
    height: 6px;
    background: linear-gradient(45deg, #00d4ff, #00ffff);
    border-radius: 50%;
    pointer-events: none;
    z-index: 1000;
    left: ${centerX}px;
    top: ${centerY}px;
    box-shadow: 0 0 10px #00d4ff;
  `;

    document.body.appendChild(particle);

    const angle = (i / 12) * Math.PI * 2;
    const velocity = 100 + Math.random() * 50;
    const lifetime = 800 + Math.random() * 400;

    particle.animate(
      [
        {
          transform: "translate(0, 0) scale(1)",
          opacity: 1,
        },
        {
          transform: `translate(${Math.cos(angle) * velocity}px, ${
            Math.sin(angle) * velocity
          }px) scale(0)`,
          opacity: 0,
        },
      ],
      {
        duration: lifetime,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      }
    ).onfinish = () => {
      particle.remove();
    };
  }
}

// Add CSS animations via JavaScript
function injectEnhancedAnimations() {
  const style = document.createElement("style");
  style.textContent = `
  @keyframes titleBounce {
    0% {
      transform: translateY(0) scale(1);
    }
    30% {
      transform: translateY(-10px) scale(1.05);
    }
    50% {
      transform: translateY(-5px) scale(1.02);
    }
    70% {
      transform: translateY(-8px) scale(1.03);
    }
    100% {
      transform: translateY(0) scale(1);
    }
  }
  
  @keyframes cardExcitement {
    0%, 100% {
      transform: scale(1) rotate(0deg);
    }
    25% {
      transform: scale(1.1) rotate(2deg);
    }
    50% {
      transform: scale(1.05) rotate(-1deg);
    }
    75% {
      transform: scale(1.08) rotate(1deg);
    }
  }
  
  @keyframes cardPulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 25px 80px rgba(0, 212, 255, 0.4);
    }
    50% {
      transform: scale(1.02);
      box-shadow: 0 30px 100px rgba(0, 212, 255, 0.6);
    }
  }
  
  /* Enhanced skill bar glow effect */
  .skill-progress::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    transform: translateX(-100%);
    animation: skillBarShine 2s ease-in-out infinite;
  }
  
  @keyframes skillBarShine {
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  
  /* Card entrance animation variants */
  .skill-category.animate.variant-1 {
    animation: popUpRotate 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
  
  .skill-category.animate.variant-2 {
    animation: popUpBounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  }
  
  .skill-category.animate.variant-3 {
    animation: popUpSlide 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  
  @keyframes popUpRotate {
    0% {
      opacity: 0;
      transform: scale(0.8) translateY(50px) rotate(-10deg);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0px) rotate(0deg);
    }
  }
  
  @keyframes popUpBounce {
    0% {
      opacity: 0;
      transform: scale(0.3) translateY(100px);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.1) translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0px);
    }
  }
  
  @keyframes popUpSlide {
    0% {
      opacity: 0;
      transform: scale(0.8) translateX(-100px) translateY(50px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateX(0px) translateY(0px);
    }
  }
  `;

  document.head.appendChild(style);
}

// Add random animation variants
function addRandomAnimationVariants() {
  const skillCards = document.querySelectorAll(".skill-category");
  const variants = ["variant-1", "variant-2", "variant-3"];

  skillCards.forEach((card, index) => {
    const randomVariant = variants[index % variants.length];
    card.classList.add(randomVariant);
  });
}

// Initialize all enhanced animations
function initAllEnhancedAnimations() {
  // Inject CSS animations
  injectEnhancedAnimations();

  // Add random variants
  addRandomAnimationVariants();

  // Initialize pop-up animations
  initSkillCardPopUpAnimations();

  // Initialize scroll animations
  initEnhancedScrollAnimations();

  // Initialize interaction effects
  initCardInteractionEffects();

  console.log("🎉 Enhanced Pop-up Animations for Hard Skills Cards loaded!");
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    initAllEnhancedAnimations();
  }, 500);
});

// Mark animation completion
function markAnimationComplete() {
  performance.mark("skill-animation-start");
  setTimeout(() => {
    performance.mark("skill-animation-end");
    performance.measure(
      "skill-animation-complete",
      "skill-animation-start",
      "skill-animation-end"
    );
  }, 2000);
}

// Call when animations start
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(markAnimationComplete, 1000);
});

// Gentle Fade & Float Animations for Soft Skills
function initSoftSkillAnimations() {
  const softSkillCards = document.querySelectorAll(".soft-skill-card");

  // Intersection Observer untuk gentle fade & float
  const softSkillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add gentle staggered animation
          setTimeout(() => {
            entry.target.classList.add("animate");

            // Add gentle sound effect (optional)
            playGentleSound();

            // Mark as animated
            entry.target.setAttribute("data-animated", "true");
          }, index * 200);

          softSkillObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -30px 0px",
    }
  );

  softSkillCards.forEach((card) => {
    softSkillObserver.observe(card);
  });

  // Add gentle interaction effects
  softSkillCards.forEach((card, index) => {
    // Gentle hover effect
    card.addEventListener("mouseenter", function () {
      this.style.zIndex = "5";

      // Add gentle ripple effect
      createGentleRipple(this);
    });

    card.addEventListener("mouseleave", function () {
      this.style.zIndex = "2";
    });

    // Gentle click effect
    card.addEventListener("click", function () {
      this.classList.add("active");

      // Create gentle particles
      createGentleParticles(this);

      // Remove active state after animation
      setTimeout(() => {
        this.classList.remove("active");
      }, 3000);
    });

    // Touch support for mobile
    card.addEventListener("touchstart", function () {
      this.style.transform = "translateY(-5px) scale(0.98)";
    });

    card.addEventListener("touchend", function () {
      this.style.transform = "";
    });
  });
}

// Create gentle ripple effect
function createGentleRipple(card) {
  const ripple = document.createElement("div");
  ripple.className = "gentle-ripple";

  const rect = card.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);

  ripple.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%);
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0);
      pointer-events: none;
      z-index: 1;
    `;

  card.appendChild(ripple);

  // Animate ripple
  ripple.animate(
    [
      {
        transform: "translate(-50%, -50%) scale(0)",
        opacity: 0.8,
      },
      {
        transform: "translate(-50%, -50%) scale(1)",
        opacity: 0,
      },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    }
  ).onfinish = () => {
    ripple.remove();
  };
}

// Create gentle floating particles
function createGentleParticles(card) {
  const rect = card.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 6; i++) {
    const particle = document.createElement("div");
    particle.className = "gentle-particle";

    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(0, 212, 255, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${centerX}px;
        top: ${centerY}px;
        box-shadow: 0 0 8px rgba(0, 212, 255, 0.4);
      `;

    document.body.appendChild(particle);

    const angle = (i / 6) * Math.PI * 2;
    const distance = 60 + Math.random() * 40;
    const duration = 2000 + Math.random() * 1000;

    particle.animate(
      [
        {
          transform: "translate(0, 0) scale(1)",
          opacity: 0.8,
        },
        {
          transform: `translate(${Math.cos(angle) * distance}px, ${
            Math.sin(angle) * distance - 30
          }px) scale(0.5)`,
          opacity: 0.4,
          offset: 0.7,
        },
        {
          transform: `translate(${Math.cos(angle) * distance * 1.2}px, ${
            Math.sin(angle) * distance * 1.2 - 50
          }px) scale(0)`,
          opacity: 0,
        },
      ],
      {
        duration: duration,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }
    ).onfinish = () => {
      particle.remove();
    };
  }
}

// Gentle sound effect (optional)
function playGentleSound() {
  // Create audio context for gentle sound
  if (
    typeof AudioContext !== "undefined" ||
    typeof webkitAudioContext !== "undefined"
  ) {
    try {
      const audioContext = new (AudioContext || webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        400,
        audioContext.currentTime + 0.3
      );

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.1
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.3
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      // Silently fail if audio context is not supported
    }
  }
}

// Enhanced scroll-based animations
function initSoftSkillScrollEffects() {
  const softSkillsSection = document.querySelector(".soft-skills-section");

  if (!softSkillsSection) return;

  const softSkillCards = softSkillsSection.querySelectorAll(".soft-skill-card");

  // Parallax effect for soft skills section
  window.addEventListener(
    "scroll",
    throttle(() => {
      const scrolled = window.pageYOffset;
      const sectionTop = softSkillsSection.offsetTop;
      const sectionHeight = softSkillsSection.offsetHeight;
      const windowHeight = window.innerHeight;

      // Check if section is in viewport
      if (
        scrolled + windowHeight > sectionTop &&
        scrolled < sectionTop + sectionHeight
      ) {
        const progress =
          (scrolled + windowHeight - sectionTop) /
          (sectionHeight + windowHeight);

        // Apply gentle parallax to cards
        softSkillCards.forEach((card, index) => {
          if (card.classList.contains("animate")) {
            const offset = Math.sin(progress * Math.PI + index * 0.5) * 5;
            card.style.transform = `translateY(${offset}px)`;
          }
        });
      }
    }, 16)
  );

  // Gentle reveal on scroll
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const delay = parseInt(card.dataset.delay) || 0;

          setTimeout(() => {
            card.classList.add("animate");

            // Animate level dots
            const dots = card.querySelectorAll(".dot");
            dots.forEach((dot, dotIndex) => {
              setTimeout(() => {
                if (dot.classList.contains("active")) {
                  dot.style.animation = "dotGentleAppear 0.3s ease forwards";
                }
              }, dotIndex * 100);
            });
          }, delay);

          revealObserver.unobserve(card);
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  softSkillCards.forEach((card, index) => {
    card.dataset.delay = index * 200;
    revealObserver.observe(card);
  });
}

// Soft skill level animation
function animateSoftSkillLevels() {
  const levelDots = document.querySelectorAll(".soft-skill-card .dot");

  levelDots.forEach((dot) => {
    if (dot.classList.contains("active")) {
      dot.addEventListener("animationend", () => {
        // Add gentle glow effect after animation
        dot.style.boxShadow = "0 0 12px rgba(0, 212, 255, 0.8)";

        setTimeout(() => {
          dot.style.boxShadow = "0 0 8px rgba(0, 212, 255, 0.6)";
        }, 500);
      });
    }
  });
}

// Gentle card interaction manager
function initSoftSkillInteractions() {
  const softSkillCards = document.querySelectorAll(".soft-skill-card");

  softSkillCards.forEach((card) => {
    let hoverTimeout;
    let isHovering = false;

    // Enhanced hover effect
    card.addEventListener("mouseenter", function () {
      isHovering = true;
      this.style.transition = "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

      // Delayed hover effects
      hoverTimeout = setTimeout(() => {
        if (isHovering) {
          // Add gentle breathing effect
          this.classList.add("breathing");

          // Enhance icon glow
          const icon = this.querySelector(".soft-skill-icon");
          if (icon) {
            icon.style.boxShadow = "0 0 25px rgba(0, 212, 255, 0.6)";
          }

          // Enhance level dots
          const activeDots = this.querySelectorAll(".dot.active");
          activeDots.forEach((dot, index) => {
            setTimeout(() => {
              dot.style.transform = "scale(1.2)";
              dot.style.boxShadow = "0 0 15px rgba(0, 212, 255, 0.9)";
            }, index * 100);
          });
        }
      }, 300);
    });

    card.addEventListener("mouseleave", function () {
      isHovering = false;
      clearTimeout(hoverTimeout);

      this.classList.remove("breathing");
      this.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

      // Reset icon glow
      const icon = this.querySelector(".soft-skill-icon");
      if (icon) {
        icon.style.boxShadow = "";
      }

      // Reset level dots
      const activeDots = this.querySelectorAll(".dot.active");
      activeDots.forEach((dot) => {
        dot.style.transform = "";
        dot.style.boxShadow = "0 0 8px rgba(0, 212, 255, 0.6)";
      });
    });

    // Focus management for accessibility
    card.addEventListener("focus", function () {
      this.style.outline = "2px solid var(--primary-color)";
      this.style.outlineOffset = "4px";
    });

    card.addEventListener("blur", function () {
      this.style.outline = "";
      this.style.outlineOffset = "";
    });

    // Keyboard interaction
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  });
}

// Performance monitoring for soft skills
function monitorSoftSkillPerformance() {
  const softSkillCards = document.querySelectorAll(".soft-skill-card");
  let animationStartTime = performance.now();

  // Monitor animation completion
  const checkAnimationComplete = () => {
    const animatedCards = document.querySelectorAll(".soft-skill-card.animate");

    if (animatedCards.length === softSkillCards.length) {
      const animationEndTime = performance.now();
      const duration = animationEndTime - animationStartTime;

      console.log(
        `✨ Soft Skills animations completed in ${duration.toFixed(2)}ms`
      );

      // Mark performance
      if (performance.mark) {
        performance.mark("soft-skills-animation-complete");
      }

      return true;
    }
    return false;
  };

  // Check every 100ms
  const checkInterval = setInterval(() => {
    if (checkAnimationComplete()) {
      clearInterval(checkInterval);
    }
  }, 100);

  // Timeout after 10 seconds
  setTimeout(() => {
    clearInterval(checkInterval);
  }, 10000);
}

// Gentle loading state management
function initSoftSkillLoadingStates() {
  const softSkillCards = document.querySelectorAll(".soft-skill-card");

  // Add loading state initially
  softSkillCards.forEach((card) => {
    card.classList.add("loading");
  });

  // Remove loading state when ready
  setTimeout(() => {
    softSkillCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.remove("loading");
        card.classList.add("ready");
      }, index * 100);
    });
  }, 500);
}

// Error handling for soft skills
function handleSoftSkillErrors() {
  const softSkillCards = document.querySelectorAll(".soft-skill-card");

  softSkillCards.forEach((card) => {
    // Check for missing required elements
    const icon = card.querySelector(".soft-skill-icon");
    const title = card.querySelector(".soft-skill-title");
    const description = card.querySelector(".soft-skill-description");

    if (!icon || !title || !description) {
      console.warn("Soft skill card missing required elements:", card);
      card.classList.add("error");
      return;
    }

    // Check for valid level dots
    const dots = card.querySelectorAll(".dot");
    const activeDots = card.querySelectorAll(".dot.active");

    if (dots.length === 0 || activeDots.length === 0) {
      console.warn("Soft skill card missing level indicators:", card);
    }

    // Mark as valid
    card.classList.add("valid");
  });
}

// Accessibility enhancements
function enhanceSoftSkillAccessibility() {
  const softSkillCards = document.querySelectorAll(".soft-skill-card");

  softSkillCards.forEach((card, index) => {
    // Add ARIA attributes
    card.setAttribute("role", "article");
    card.setAttribute("aria-labelledby", `soft-skill-title-${index}`);
    card.setAttribute("aria-describedby", `soft-skill-desc-${index}`);
    card.setAttribute("tabindex", "0");

    // Add IDs to title and description
    const title = card.querySelector(".soft-skill-title");
    const description = card.querySelector(".soft-skill-description");

    if (title) {
      title.id = `soft-skill-title-${index}`;
    }

    if (description) {
      description.id = `soft-skill-desc-${index}`;
    }

    // Add level information for screen readers
    const levelText = card.querySelector(".level-text");
    const activeDots = card.querySelectorAll(".dot.active");
    const totalDots = card.querySelectorAll(".dot");

    if (levelText && activeDots.length && totalDots.length) {
      const level = `${activeDots.length} out of ${totalDots.length}`;
      levelText.setAttribute("aria-label", `Skill level: ${level}`);
    }
  });
}

// Initialize all soft skill animations and interactions
function initAllSoftSkillFeatures() {
  // Check if soft skills section exists
  if (!document.querySelector(".soft-skill-card")) {
    console.log("No soft skill cards found, skipping initialization");
    return;
  }

  console.log(
    "🌸 Initializing Gentle Fade & Float animations for Soft Skills..."
  );

  // Initialize loading states
  initSoftSkillLoadingStates();

  // Handle errors
  handleSoftSkillErrors();

  // Enhance accessibility
  enhanceSoftSkillAccessibility();

  // Initialize animations
  initSoftSkillAnimations();

  // Initialize scroll effects
  initSoftSkillScrollEffects();

  // Initialize interactions
  initSoftSkillInteractions();

  // Animate skill levels
  animateSoftSkillLevels();

  // Monitor performance
  monitorSoftSkillPerformance();

  console.log("✨ Soft Skills animations initialized successfully!");
}

// CSS injection for additional styles
function injectSoftSkillStyles() {
  const style = document.createElement("style");
  style.textContent = `
      .soft-skill-card.breathing {
        animation: gentleBreathing 3s ease-in-out infinite;
      }
      
      .soft-skill-card.ready {
        transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      
      .soft-skill-card.valid {
        border-color: rgba(0, 212, 255, 0.2);
      }
      
      @keyframes gentleBreathing {
        0%, 100% {
          transform: translateY(-15px) scale(1.02);
        }
        50% {
          transform: translateY(-18px) scale(1.025);
        }
      }
      
      /* Gentle focus ring */
      .soft-skill-card:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 4px;
        animation: focusGlow 1s ease-in-out infinite alternate;
      }
      
      /* Loading shimmer effect */
      .soft-skill-card.loading::before {
        animation: loadingShimmer 1.5s infinite;
      }
      
      /* Success state for completed animations */
      .soft-skill-card.animate {
        border-color: rgba(0, 212, 255, 0.3);
      }
    `;

  document.head.appendChild(style);
}

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Inject additional styles
  injectSoftSkillStyles();

  // Initialize with delay to ensure other scripts are loaded
  setTimeout(() => {
    initAllSoftSkillFeatures();
  }, 800);
});

// Initialize on window load as fallback
window.addEventListener("load", () => {
  // Double-check initialization
  if (!document.querySelector(".soft-skill-card.animate")) {
    console.log("Fallback: Re-initializing soft skills animations...");
    setTimeout(initAllSoftSkillFeatures, 200);
  }
});

// Export functions for external use
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initSoftSkillAnimations,
    initSoftSkillScrollEffects,
    initSoftSkillInteractions,
    createGentleRipple,
    createGentleParticles,
  };
}
// ===== PORTFOLIO FUNCTIONALITY =====
document.addEventListener("DOMContentLoaded", function () {
  // Portfolio elements
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const projectPopupOverlay = document.getElementById("projectPopup");
  const projectPopup = document.querySelector(".project-popup");
  const popupClose = document.getElementById("popupClose");

  console.log("Filter buttons found:", filterBtns.length);
  console.log("Project cards found:", projectCards.length);

  // Project data
  const projectsData = {
    "E-Commerce Website": {
      image: "images/E-COMMERS.jpeg",
      description:
        "Website e-commerce modern dengan fitur lengkap termasuk sistem pembayaran, manajemen produk, keranjang belanja, dan dashboard admin yang responsive. Dibangun dengan teknologi terkini untuk performa optimal.",
      features: [
        "Responsive design untuk semua device",
        "Payment gateway integration",
        "Admin dashboard dengan analytics",
        "Product management system",
        "User authentication & authorization",
        "Shopping cart & wishlist",
        "Order tracking system",
        "SEO optimized",
      ],
      techStack: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
      duration: "3 Weeks",
      role: "Full Stack Developer",
      year: "2024",
    },
    "Mobile App UI Design": {
      image: "images/Mobile APP.jpeg",
      description:
        "Design UI/UX untuk aplikasi mobile dengan konsep modern dan user-friendly interface. Fokus pada user experience yang optimal dengan design system yang konsisten dan accessible.",
      features: [
        "Modern & clean interface design",
        "Consistent design system",
        "User-centered design approach",
        "Interactive prototyping",
        "Accessibility compliance",
        "Dark & light mode support",
        "Micro-interactions design",
        "Responsive layouts",
      ],
      techStack: ["Figma", "Adobe XD", "Principle", "Sketch"],
      duration: "2 Weeks",
      role: "UI/UX Designer",
      year: "2024",
    },
    "Smart Home IoT System": {
      image: "images/IoT.png",
      description:
        "Sistem IoT untuk smart home dengan kontrol lampu, suhu, keamanan, dan monitoring real-time menggunakan ESP32. Terintegrasi dengan aplikasi mobile untuk kontrol jarak jauh.",
      features: [
        "Real-time sensor monitoring",
        "Remote control via mobile app",
        "Automated lighting system",
        "Temperature & humidity control",
        "Security system integration",
        "Energy consumption tracking",
        "Voice control support",
        "Cloud data storage",
      ],
      techStack: ["ESP32", "Arduino IDE", "Blynk", "Firebase", "C++"],
      duration: "4 Weeks",
      role: "IoT Developer",
      year: "2023",
    },
    "Personal Portfolio": {
      image: "images/Portofolio.png",
      description:
        "Website portfolio personal dengan design modern, animasi smooth, dan fully responsive. Menampilkan projects, skills, dan pengalaman dengan interactive elements yang menarik.",
      features: [
        "Modern & interactive design",
        "Smooth animations & transitions",
        "Fully responsive layout",
        "SEO optimized",
        "Fast loading performance",
        "Contact form integration",
        "Social media integration",
        "Progressive Web App features",
      ],
      techStack: ["React.js", "SCSS", "JavaScript", "Webpack"],
      duration: "2 Weeks",
      role: "Frontend Developer",
      year: "2024",
    },
    "Brand Identity Design": {
      image: "images/Brand Identity Design.png",
      description:
        "Pembuatan brand identity lengkap termasuk logo design, color palette, typography, dan brand guidelines. Menciptakan identitas visual yang kuat dan memorable untuk brand.",
      features: [
        "Logo design & variations",
        "Complete color palette",
        "Typography system",
        "Brand guidelines document",
        "Business card design",
        "Letterhead & stationery",
        "Social media templates",
        "Brand application examples",
      ],
      techStack: ["Adobe Illustrator", "Photoshop", "InDesign", "Figma"],
      duration: "3 Weeks",
      role: "Brand Designer",
      year: "2023",
    },
    "IoT Weather Station": {
      image: "images/IoT Sensor.png",
      description:
        "Stasiun cuaca IoT dengan sensor suhu, kelembaban, tekanan udara, dan kualitas udara yang terhubung ke cloud. Data real-time dapat diakses melalui web dashboard dan mobile app.",
      features: [
        "Multi-sensor data collection",
        "Real-time weather monitoring",
        "Cloud data synchronization",
        "Historical data analysis",
        "Weather prediction algorithms",
        "Mobile app integration",
        "Alert & notification system",
        "Data visualization dashboard",
      ],
      techStack: ["ESP32", "Sensors", "Firebase", "React.js", "Chart.js"],
      duration: "5 Weeks",
      role: "IoT & Full Stack Developer",
      year: "2023",
    },
  };

  // Filter functionality - PERBAIKAN
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      console.log("Filter button clicked:", this.getAttribute("data-filter"));

      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Add click animation
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);

      const filterValue = this.getAttribute("data-filter");

      // Filter projects with animation
      projectCards.forEach((card, index) => {
        const category = card.getAttribute("data-category");

        setTimeout(() => {
          if (filterValue === "all" || category === filterValue) {
            card.style.display = "block";
            card.classList.remove("hide");
            card.classList.add("show");

            // Staggered animation
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0) scale(1)";
            }, index * 100);
          } else {
            card.style.opacity = "0";
            card.style.transform = "translateY(20px) scale(0.9)";
            card.classList.remove("show");
            card.classList.add("hide");

            setTimeout(() => {
              card.style.display = "none";
            }, 300);
          }
        }, index * 50);
      });
    });
  });

  // Project card click functionality
  projectCards.forEach((card) => {
    card.addEventListener("click", function () {
      const projectTitle = this.querySelector(".project-title").textContent;
      const projectData = projectsData[projectTitle];

      if (projectData) {
        showProjectPopup(projectTitle, projectData);
      }
    });

    // Enhanced hover effect
    card.addEventListener("mouseenter", function () {
      if (!this.classList.contains("hide")) {
        this.style.transform = "translateY(-10px) scale(1.02)";
      }
    });

    card.addEventListener("mouseleave", function () {
      if (!this.classList.contains("hide")) {
        this.style.transform = "translateY(0) scale(1)";
      }
    });
  });

  // Show project popup
  function showProjectPopup(title, data) {
    // Populate popup content
    document.getElementById("popupImage").src = data.image;
    document.getElementById("popupImage").alt = title;
    document.getElementById("popupTitle").textContent = title;
    document.getElementById("popupDescription").textContent = data.description;
    document.getElementById("popupDuration").textContent = data.duration;
    document.getElementById("popupRole").textContent = data.role;
    document.getElementById("popupYear").textContent = data.year;

    // Populate tech stack
    const techStackContainer = document.getElementById("popupTechStack");
    techStackContainer.innerHTML = "";
    data.techStack.forEach((tech) => {
      const techTag = document.createElement("span");
      techTag.className = "tech-tag";
      techTag.innerHTML = `<i class="fas fa-code"></i> ${tech}`;
      techStackContainer.appendChild(techTag);
    });

    // Populate features
    const featuresList = document.getElementById("popupFeatures");
    featuresList.innerHTML = "";
    data.features.forEach((feature) => {
      const li = document.createElement("li");
      li.textContent = feature;
      featuresList.appendChild(li);
    });

    // Show popup
    projectPopupOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Hide project popup
  function hideProjectPopup() {
    projectPopupOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Close popup events
  if (popupClose) {
    popupClose.addEventListener("click", hideProjectPopup);
  }

  if (projectPopupOverlay) {
    projectPopupOverlay.addEventListener("click", function (e) {
      if (e.target === projectPopupOverlay) {
        hideProjectPopup();
      }
    });
  }

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (
      e.key === "Escape" &&
      projectPopupOverlay &&
      projectPopupOverlay.classList.contains("active")
    ) {
      hideProjectPopup();
    }
  });

  console.log("✅ Portfolio system initialized with working filters");
});

// Contact Form
const contactForm = document.querySelector(".contact-section form");
const contactFormInputs = contactForm.querySelectorAll("input, textarea");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const jsonData = Object.fromEntries(formData.entries());
});

// Animasi form contact
contactFormInputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.classList.add("focused");
  });
  input.addEventListener("blur", () => {
    input.classList.remove("focused");
  });
});

// Animasi button submit
const submitButton = contactForm.querySelector('input[type="submit"]');
submitButton.addEventListener("mouseover", () => {
  submitButton.classList.add("hover");
});
submitButton.addEventListener("mouseout", () => {
  submitButton.classList.remove("hover");
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Ambil nilai input
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // ===== CONTACT FORM FUNCTIONALITY =====
  document.addEventListener("DOMContentLoaded", function () {
    // Contact form elements
    const contactForm = document.getElementById("contactForm");
    const contactFormInputs = document.querySelectorAll(
      "#contactForm input, #contactForm textarea"
    );
    const submitButton = document.querySelector(
      '#contactForm input[type="submit"], #contactForm button[type="submit"]'
    );

    console.log("Contact form found:", contactForm ? "Yes" : "No");
    console.log("Submit button found:", submitButton ? "Yes" : "No");

    // Input focus animations
    contactFormInputs.forEach((input) => {
      input.addEventListener("focus", () => {
        input.classList.add("focused");
      });

      input.addEventListener("blur", () => {
        if (input.value === "") {
          input.classList.remove("focused");
        }
      });
    });

    // Submit button hover effects
    if (submitButton) {
      submitButton.addEventListener("mouseover", () => {
        submitButton.classList.add("hover");
      });

      submitButton.addEventListener("mouseout", () => {
        submitButton.classList.remove("hover");
      });
    }

    // Form submission handler
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        console.log("Form submission triggered");

        // Get form values
        const firstName = document.getElementById("firstName")?.value || "";
        const lastName = document.getElementById("lastName")?.value || "";
        const email = document.getElementById("email")?.value || "";
        const phone = document.getElementById("phone")?.value || "";
        const subject = document.getElementById("subject")?.value || "";
        const message = document.getElementById("message")?.value || "";

        console.log("Form data:", {
          firstName,
          lastName,
          email,
          phone,
          subject,
          message,
        });

        // Validate required fields
        const requiredFields = [
          { field: firstName, name: "First Name" },
          { field: lastName, name: "Last Name" },
          { field: email, name: "Email" },
          { field: subject, name: "Subject" },
          { field: message, name: "Message" },
        ];

        const missingFields = requiredFields.filter(
          (item) => !item.field || item.field.trim() === ""
        );

        if (missingFields.length > 0) {
          const missingFieldNames = missingFields
            .map((item) => item.name)
            .join(", ");
          alert(
            `Please fill in the following required fields: ${missingFieldNames}`
          );
          return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert("Please enter a valid email address.");
          return;
        }

        // Show loading state
        const originalText = submitButton.innerHTML || submitButton.value;
        if (submitButton.tagName === "INPUT") {
          submitButton.value = "Sending...";
        } else {
          submitButton.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Sending...';
        }
        submitButton.disabled = true;

        // Format WhatsApp message
        const whatsappMessage =
          `Hi Muhammad Yazid!%0A%0A` +
          `Nama: ${firstName} ${lastName}%0A` +
          `Email: ${email}%0A` +
          `Phone: ${phone}%0A` +
          `Subject: ${subject}%0A%0A` +
          `Message: ${message}%0A%0A` +
          `Saya tertarik untuk diskusi project lebih lanjut.`;

        // WhatsApp redirect
        const whatsappURL = `https://wa.me/62895366780417?text=${whatsappMessage}`;

        // Simulate processing time
        setTimeout(() => {
          console.log("Opening WhatsApp...");

          // Open WhatsApp
          window.open(whatsappURL, "_blank");

          // Show success message
          alert("Message prepared! Opening WhatsApp...");

          // Reset form
          contactForm.reset();

          // Remove focused classes
          contactFormInputs.forEach((input) => {
            input.classList.remove("focused");
          });

          // Reset button
          if (submitButton.tagName === "INPUT") {
            submitButton.value = originalText;
          } else {
            submitButton.innerHTML = originalText;
          }
          submitButton.disabled = false;

          console.log("Form processing completed");
        }, 1000);
      });
    }

    // Additional form status functions (if you have status elements in HTML)
    function showFormStatus(type, message = "") {
      const formStatus = document.getElementById("formStatus");
      const successMessage = document.getElementById("successMessage");
      const errorMessage = document.getElementById("errorMessage");

      if (formStatus) {
        formStatus.style.display = "block";

        if (type === "success") {
          if (successMessage) {
            successMessage.style.display = "block";
            successMessage.textContent =
              message || "Message sent successfully!";
          }
          if (errorMessage) {
            errorMessage.style.display = "none";
          }
        } else if (type === "error") {
          if (errorMessage) {
            errorMessage.style.display = "block";
            errorMessage.textContent =
              message || "Something went wrong. Please try again.";
          }
          if (successMessage) {
            successMessage.style.display = "none";
          }
        }

        // Hide status after 5 seconds
        setTimeout(() => {
          if (formStatus) formStatus.style.display = "none";
        }, 5000);
      } else {
        // Fallback to alert if no status elements
        alert(message || (type === "success" ? "Success!" : "Error occurred!"));
      }
    }

    // FAQ functionality (if you have FAQ items)
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");
      if (question) {
        question.addEventListener("click", () => {
          item.classList.toggle("active");
        });
      }
    });

    console.log("Contact form script initialized successfully");
  });

  // Form status display
  function showFormStatus(type, customMessage = null) {
    formStatus.style.display = "block";

    if (type === "success") {
      successMessage.style.display = "flex";
      errorMessage.style.display = "none";
    } else {
      successMessage.style.display = "none";
      errorMessage.style.display = "flex";

      if (customMessage) {
        errorMessage.querySelector("p").textContent = customMessage;
      }
    }

    // Auto hide after 5 seconds
    setTimeout(() => {
      formStatus.style.display = "none";
    }, 5000);

    // Scroll to status
    formStatus.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // Enhanced form interactions
  const formInputs = document.querySelectorAll(
    ".form-input, .form-select, .form-textarea"
  );

  formInputs.forEach((input) => {
    // Focus animations
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", function () {
      this.parentElement.classList.remove("focused");

      // Validation on blur
      if (this.hasAttribute("required") && !this.value.trim()) {
        this.style.borderColor = "rgba(255, 68, 68, 0.5)";
      } else {
        this.style.borderColor = "";
      }
    });

    // Real-time validation
    input.addEventListener("input", function () {
      if (this.style.borderColor === "rgba(255, 68, 68, 0.5)") {
        this.style.borderColor = "";
      }
    });
  });

  // Contact method click handlers
  const contactMethods = document.querySelectorAll(".contact-method");

  contactMethods.forEach((method) => {
    method.addEventListener("click", function () {
      const link = this.querySelector(".method-link");
      if (link && link.href) {
        window.open(link.href, "_blank");
      }
    });
  });

  // Social link analytics
  const socialLinks = document.querySelectorAll(".social-link");

  socialLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const platform = this.getAttribute("data-platform");
      console.log(`Social link clicked: ${platform}`);

      // Add click effect
      this.style.transform = "translateY(-3px) scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 200);
    });
  });

  // Form field character counter for textarea
  const messageTextarea = document.getElementById("message");
  if (messageTextarea) {
    const maxLength = 1000;

    // Create character counter
    const counter = document.createElement("div");
    counter.className = "char-counter";
    counter.style.cssText = `
      position: absolute;
      bottom: 10px;
      right: 15px;
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.5);
      pointer-events: none;
    `;

    messageTextarea.parentElement.style.position = "relative";
    messageTextarea.parentElement.appendChild(counter);

    function updateCounter() {
      const length = messageTextarea.value.length;
      counter.textContent = `${length}/${maxLength}`;

      if (length > maxLength * 0.9) {
        counter.style.color = "#ff4444";
      } else if (length > maxLength * 0.7) {
        counter.style.color = "#ffaa00";
      } else {
        counter.style.color = "rgba(255, 255, 255, 0.5)";
      }
    }

    messageTextarea.addEventListener("input", updateCounter);
    messageTextarea.setAttribute("maxlength", maxLength);
    updateCounter();
  }

  // Auto-resize textarea
  const textareas = document.querySelectorAll(".form-textarea");
  textareas.forEach((textarea) => {
    textarea.addEventListener("input", function () {
      this.style.height = "auto";
      this.style.height = Math.min(this.scrollHeight, 200) + "px";
    });
  });

  // Initialize contact animations
  function initContactAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
        }
      });
    });

    // Observe contact elements
    const animatedElements = document.querySelectorAll(
      ".contact-method, .faq-item, .social-link"
    );
    animatedElements.forEach((element) => {
      observer.observe(element);
    });
  }

  // Initialize
  initContactAnimations();

  console.log(
    "✅ Contact system initialized with Live Animated Grid Background"
  );
});

// ===== CONTACT GRID BACKGROUND ENHANCEMENTS =====
document.addEventListener("DOMContentLoaded", function () {
  // Enhanced grid interactions for contact section
  const contactGridContainer = document.querySelector(
    ".contact-section .grid-container"
  );

  if (contactGridContainer) {
    // Add mouse interaction to contact grid
    contactGridContainer.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      // Create contact-specific glow effect
      const glow = document.createElement("div");
      glow.style.position = "absolute";
      glow.style.left = x + "%";
      glow.style.top = y + "%";
      glow.style.width = "80px";
      glow.style.height = "80px";
      glow.style.background =
        "radial-gradient(circle, rgba(0, 212, 255, 0.4), transparent)";
      glow.style.borderRadius = "50%";
      glow.style.transform = "translate(-50%, -50%)";
      glow.style.pointerEvents = "none";
      glow.style.animation = "contactGlowFade 1.5s ease-out forwards";

      this.appendChild(glow);

      setTimeout(() => {
        if (glow.parentNode) {
          glow.parentNode.removeChild(glow);
        }
      }, 1500);
    });

    // Add random animation delays to contact grid elements
    const contactGridDots = contactGridContainer.querySelectorAll(".grid-dot");
    const contactGridLines =
      contactGridContainer.querySelectorAll(".grid-line");

    contactGridDots.forEach((dot, index) => {
      dot.style.animationDelay = `${Math.random() * 4}s`;
    });

    contactGridLines.forEach((line, index) => {
      line.style.animationDelay = `${Math.random() * 3}s`;
    });
  }
});

// Add contact-specific glow fade animation
const contactStyle = document.createElement("style");
contactStyle.textContent = `
  @keyframes contactGlowFade {
    0% {
      opacity: 0.8;
      transform: translate(-50%, -50%) scale(0);
    }
    50% {
      opacity: 0.4;
      transform: translate(-50%, -50%) scale(1);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(1.8);
    }
  }
  
  .form-group.focused .form-label {
    color: #00d4ff;
    transform: translateY(-2px);
  }
  
  .char-counter {
    transition: color 0.3s ease;
  }
`;
document.head.appendChild(contactStyle);

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = parseInt(counter.getAttribute("data-target"), 10); // Konversi ke angka
      const count = parseInt(counter.innerText, 10);

      if (isNaN(target)) {
        console.error("Data target tidak valid:", counter); // Debugging jika data-target tidak valid
        return;
      }

      const increment = Math.ceil(target / 200); // Kecepatan animasi

      if (count < target) {
        counter.innerText = count + increment;
        setTimeout(updateCount, 10); // Waktu jeda
      } else {
        counter.innerText = target; // Pastikan angka akhir sesuai target
      }
    };

    updateCount();
  });
});
