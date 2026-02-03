// Magnetic Hover Effect - Elements follow cursor
class MagneticEffect {
    constructor() {
        this.magneticElements = document.querySelectorAll('.btn, .stat-card, .skill-box, .tool-card');
        this.strength = 0.3;
        this.init();
    }

    init() {
        this.magneticElements.forEach(element => {
            element.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

            element.addEventListener('mouseenter', (e) => {
                element.style.transform = 'scale(1.02)';
            });

            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const deltaX = (e.clientX - centerX) * this.strength;
                const deltaY = (e.clientY - centerY) * this.strength;

                element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.02)`;
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new MagneticEffect();
    });
} else {
    new MagneticEffect();
}
