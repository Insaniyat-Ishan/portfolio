// Smooth Scroll Animations & Parallax Effects
class ScrollEffects {
    constructor() {
        this.init();
    }

    init() {
        // Scroll reveal for sections
        this.initScrollReveal();

        // Stagger card animations
        this.initCardAnimations();

        // Parallax effect
        this.initParallax();
    }

    initScrollReveal() {
        const sections = document.querySelectorAll('.section');
        console.log('Scroll Effects: Found', sections.length, 'sections');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    console.log('Section visible:', entry.target.id);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        sections.forEach(section => {
            observer.observe(section);
            // Make visible immediately if already in viewport
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                section.classList.add('visible');
            }
        });
    }

    initCardAnimations() {
        const cards = document.querySelectorAll('.cards .card');
        console.log('Scroll Effects: Found', cards.length, 'cards');

        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    cardObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        cards.forEach(card => {
            cardObserver.observe(card);
            // Make visible immediately if already in viewport
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                card.classList.add('animate-in');
            }
        });
    }

    initParallax() {
        // Parallax on hero section elements
        const parallaxElements = document.querySelectorAll('.hero-content, .hero-terminal');
        console.log('Scroll Effects: Parallax initialized for', parallaxElements.length, 'elements');

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            parallaxElements.forEach((el, index) => {
                const speed = 0.3 + (index * 0.1);
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ScrollEffects();
    });
} else {
    new ScrollEffects();
}
