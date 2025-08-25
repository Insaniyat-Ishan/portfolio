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

// Theme toggle (light/dark mode)
const toggle = document.createElement('button');
toggle.textContent = "🌙 Dark";
toggle.className = "theme-toggle";
document.body.appendChild(toggle);

let dark = true;
toggle.addEventListener('click', () => {
  dark = !dark;
  if (dark) {
    document.documentElement.classList.remove('light');
    toggle.textContent = "🌙 Dark";
  } else {
    document.documentElement.classList.add('light');
    toggle.textContent = "☀️ Light";
  }
});

// Light theme variables injected
const lightTheme = `
  :root.light {
    --bg: #ffffff;
    --panel: #f4f6fb;
    --panel-2: #eef1f6;
    --text: #11151f;
    --muted: #555e6c;
    --accent: #7c5cff;
    --accent-contrast: #ffffff;
    --border: #d0d5e0;
    --shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;
const styleEl = document.createElement('style');
styleEl.textContent = lightTheme;
document.head.appendChild(styleEl);

// Scroll reveal: add .reveal to targets and toggle .in-view on enter
const revealTargets = [
  ...document.querySelectorAll('.hero-text'),
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
  // Fallback: show all
  revealTargets.forEach(el => el.classList.add('in-view'));
}
