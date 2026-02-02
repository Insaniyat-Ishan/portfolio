// Konami Code Easter Egg
class KonamiCode {
    constructor() {
        this.sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        this.userInput = [];

        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    handleKeyPress(e) {
        this.userInput.push(e.key);
        this.userInput = this.userInput.slice(-this.sequence.length);

        if (this.checkMatch()) {
            this.activate();
        }
    }

    checkMatch() {
        return this.sequence.every((key, index) => key === this.userInput[index]);
    }

    activate() {
        // Create epic animation overlay
        const overlay = document.createElement('div');
        overlay.className = 'konami-overlay';
        overlay.innerHTML = `
      <div class="konami-content">
        <h1 class="konami-title">🎮 KONAMI CODE ACTIVATED! 🎮</h1>
        <p class="konami-message">You found the secret! Welcome, fellow hacker! 🔓</p>
        <div class="konami-matrix">
          <div class="matrix-text">ACCESS GRANTED</div>
          <div class="matrix-text">SECURITY CLEARANCE: ULTRA</div>
          <div class="matrix-text">THREAT LEVEL: ZERO</div>
        </div>
        <button class="konami-close">CLOSE [ESC]</button>
      </div>
    `;
        document.body.appendChild(overlay);

        // Trigger intense matrix effect
        this.intensifyMatrix();

        // Play sound (if available)
        this.playSound();

        // Close handlers
        const closeBtn = overlay.querySelector('.konami-close');
        closeBtn.addEventListener('click', () => this.close(overlay));
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close(overlay);
        }, { once: true });

        setTimeout(() => overlay.classList.add('active'), 10);
    }

    intensifyMatrix() {
        const canvas = document.getElementById('matrix-canvas');
        if (canvas) {
            canvas.style.opacity = '0.4';
            setTimeout(() => {
                canvas.style.opacity = '0.15';
            }, 5000);
        }
    }

    playSound() {
        // Create beep sound with Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'square';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    }

    close(overlay) {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    }
}

// Initialize Konami Code
new KonamiCode();
