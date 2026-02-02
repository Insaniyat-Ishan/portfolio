// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when a link is clicked (mobile UX)
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll enhancement
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Active nav highlighting on scroll
const sections = Array.from(document.querySelectorAll('main section[id]'));
const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));

const setActive = (id) => {
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
};

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(sec => observer.observe(sec));
} else {
  // Fallback on scroll
  window.addEventListener('scroll', () => {
    let best = sections[0];
    let bestTop = Infinity;
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      const dist = Math.abs(rect.top - 100);
      if (dist < bestTop) { bestTop = dist; best = sec; }
    });
    setActive(best.id);
  });
}

// Copy email button (if present)
const copyBtn = document.getElementById('copyEmail');
if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    const email = "insaniyatislam11@gmail.com";

    navigator.clipboard.writeText(email).then(() => {
      copyBtn.textContent = "✅ Copied!";
      setTimeout(() => copyBtn.textContent = "📋 Copy Email", 2000);
    });
  });
}

// Scroll reveal: add .reveal to targets and toggle .in-view on enter
const revealTargets = [
  ...document.querySelectorAll('.hero-text'),
  ...document.querySelectorAll('.hero-terminal'),
  ...document.querySelectorAll('.section-title'),
  ...document.querySelectorAll('.cards .card'),
  ...document.querySelectorAll('.skills-grid span'),
  ...document.querySelectorAll('.contact-actions .btn')
];


revealTargets.forEach(el => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const revObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revObs.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.08 });

  revealTargets.forEach(el => revObs.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('in-view'));
}

// Typing Effect
const typingElement = document.getElementById('typing-text');
if (typingElement) {
  const words = ["Security Engineer.", "Threat Hunter.", "Python Developer.", "SOC Analyst.", "Cybersecurity Enthusiast."];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isWaiting = false;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isWaiting = true;
      setTimeout(() => {
        isDeleting = true;
        isWaiting = false;
        type();
      }, 2000); // Wait at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      type();
    } else {
      const speed = isDeleting ? 50 : 100;
      setTimeout(type, isWaiting ? 2000 : speed);
    }
  }

  type();
}

// Scroll Progress Bar
const scrollProgress = document.querySelector('.scroll-progress');
if (scrollProgress) {
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
  });
}

// Scroll to Top Button
const scrollToTopBtn = document.querySelector('.scroll-to-top');
if (scrollToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Animated Stats Counter
const animateCounter = (element) => {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000; // 2 seconds
  const increment = target / (duration / 16); // 60fps
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
};

// Observe stats and trigger counter animation
const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => statsObserver.observe(stat));
}
