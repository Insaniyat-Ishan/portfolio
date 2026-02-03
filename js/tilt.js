// 3D Tilt Effect for Cards
class TiltEffect {
    constructor() {
        this.cards = document.querySelectorAll('.cards .card, .cert-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            // Enable 3D perspective
            card.style.transformStyle = 'preserve-3d';
            card.style.transition = 'transform 0.3s ease-out';

            card.addEventListener('mouseenter', () => {
                card.style.transition = 'transform 0.1s ease-out';
            });

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * 10; // Max 10deg
                const rotateY = ((centerX - x) / centerX) * 10; // Max 10deg

                card.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale3d(1.02, 1.02, 1.02)
                `;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transition = 'transform 0.5s ease-out';
                card.style.transform = `
                    perspective(1000px)
                    rotateX(0deg)
                    rotateY(0deg)
                    scale3d(1, 1, 1)
                `;
            });
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new TiltEffect();
    });
} else {
    new TiltEffect();
}
