// Enhanced Particle Network Animation
class ParticleNetwork {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-2';
        this.canvas.style.opacity = '0.6'; // Increased from 0.3
        this.canvas.style.pointerEvents = 'none';
        document.body.insertBefore(this.canvas, document.body.firstChild);

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null };
        this.particleCount = 120; // Increased from 80
        this.maxDistance = 180; // Increased connection distance

        this.resize();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        window.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                radius: Math.random() * 3 + 2 // Increased size (was 2+1)
            });
        }
    }

    drawParticle(particle) {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = '#7000ff';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = '#7000ff';
        this.ctx.fill();
        this.ctx.shadowBlur = 0; // Reset shadow
    }

    drawLine(p1, p2, distance) {
        const opacity = (1 - distance / this.maxDistance) * 0.5;
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.strokeStyle = `rgba(112, 0, 255, ${opacity})`;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }

    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update particles
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off walls
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Mouse interaction - particles avoid the cursor
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = particle.x - this.mouse.x;
                const dy = particle.y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    particle.vx += dx / distance * 0.1;
                    particle.vy += dy / distance * 0.1;
                }
            }

            // Maintain constant velocity - clamp to original speed range (0.25 max)
            const maxVel = 0.25;
            const vel = Math.sqrt(particle.vx ** 2 + particle.vy ** 2);
            if (vel > maxVel) {
                particle.vx = (particle.vx / vel) * maxVel;
                particle.vy = (particle.vy / vel) * maxVel;
            }

            this.drawParticle(particle);
        });

        // Draw connections
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.maxDistance) {
                    this.drawLine(this.particles[i], this.particles[j], distance);
                }
            }
        }
    }

    animate() {
        this.update();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ParticleNetwork();
    });
} else {
    new ParticleNetwork();
}
