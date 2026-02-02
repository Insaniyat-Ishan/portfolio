// Custom Glowing Cursor Effect
class GlowingCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursorTrail = document.createElement('div');
        this.cursorTrail.className = 'cursor-trail';

        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorTrail);

        this.x = 0;
        this.y = 0;
        this.trailX = 0;
        this.trailY = 0;

        document.addEventListener('mousemove', (e) => {
            this.x = e.clientX;
            this.y = e.clientY;
        });

        this.animate();
    }

    animate() {
        this.trailX += (this.x - this.trailX) * 0.15;
        this.trailY += (this.y - this.trailY) * 0.15;

        this.cursor.style.left = this.x + 'px';
        this.cursor.style.top = this.y + 'px';
        this.cursorTrail.style.left = this.trailX + 'px';
        this.cursorTrail.style.top = this.trailY + 'px';

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize custom cursor on desktop
if (window.innerWidth > 768 && !('ontouchstart' in window)) {
    new GlowingCursor();
    document.body.style.cursor = 'none';

    // Add hover effects
    document.querySelectorAll('a, button, .card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.querySelector('.custom-cursor')?.classList.add('hover');
            document.querySelector('.cursor-trail')?.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            document.querySelector('.custom-cursor')?.classList.remove('hover');
            document.querySelector('.cursor-trail')?.classList.remove('hover');
        });
    });
}
