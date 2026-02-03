// Loading Screen Animation
class LoadingScreen {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.percentage = document.querySelector('.loader-percentage');
        this.progress = 0;
        this.init();
    }

    init() {
        // Animate percentage counter
        const interval = setInterval(() => {
            this.progress += Math.random() * 15;
            if (this.progress >= 100) {
                this.progress = 100;
                clearInterval(interval);
                setTimeout(() => this.hideLoader(), 500);
            }
            this.percentage.textContent = Math.floor(this.progress) + '%';
        }, 100);
    }

    hideLoader() {
        this.loadingScreen.classList.add('loaded');
        // Enable scrolling after loading
        document.body.style.overflow = 'auto';
    }
}

// Skill Progress Bars Animation
class SkillBars {
    constructor() {
        this.init();
    }

    init() {
        const skillBars = document.querySelectorAll('.skill-progress');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.getAttribute('data-progress');
                    entry.target.style.setProperty('--progress-width', progress + '%');
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        skillBars.forEach(bar => observer.observe(bar));
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Disable scrolling during loading
        document.body.style.overflow = 'hidden';
        new LoadingScreen();
        new SkillBars();
    });
} else {
    document.body.style.overflow = 'hidden';
    new LoadingScreen();
    new SkillBars();
}
