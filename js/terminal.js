// Interactive Security Terminal
class SecurityTerminal {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
        if (!this.element) return;

        this.output = this.element.querySelector('.terminal-output');
        this.commands = [
            { cmd: 'whoami', response: 'root@ishan-security' },
            { cmd: 'pwd', response: '/home/ishan/cybersecurity' },
            { cmd: 'ls -la', response: 'drwxr-xr-x  wazuh/\ndrwxr-xr-x  suricata/\ndrwxr-xr-x  zeek/\ndrwxr-xr-x  misp/\n-rw-r--r--  portfolio.md' },
            { cmd: 'cat skills.txt', response: 'Python | SOC Analysis | Threat Hunting\nSIEM/XDR | IDS/IPS | SOAR\nNetwork Security | Incident Response' },
            { cmd: 'nmap -v localhost', response: 'Starting Nmap scan...\nPORT     STATE SERVICE\n22/tcp   open  ssh\n80/tcp   open  http\n443/tcp  open  https\n8080/tcp open  http-proxy' },
            { cmd: 'help', response: 'Available commands:\nwhoami | pwd | ls | cat | nmap | clear | help' }
        ];

        this.currentIndex = 0;
        this.startAnimation();
    }

    async startAnimation() {
        await this.sleep(500);

        for (const { cmd, response } of this.commands) {
            await this.typeCommand(cmd);
            await this.sleep(300);
            await this.showResponse(response);
            await this.sleep(800);
        }

        this.showPrompt();
    }

    async typeCommand(cmd) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = '<span class="terminal-prompt">┌──(ishan@security)-[~]<br>└─$ </span>';

        const cmdSpan = document.createElement('span');
        cmdSpan.className = 'terminal-command';
        line.appendChild(cmdSpan);
        this.output.appendChild(line);

        for (let char of cmd) {
            cmdSpan.textContent += char;
            await this.sleep(50);
            this.output.scrollTop = this.output.scrollHeight;
        }
    }

    async showResponse(response) {
        const responseLine = document.createElement('div');
        responseLine.className = 'terminal-response';
        responseLine.textContent = response;
        this.output.appendChild(responseLine);
        this.output.scrollTop = this.output.scrollHeight;
    }

    showPrompt() {
        const prompt = document.createElement('div');
        prompt.className = 'terminal-line';
        prompt.innerHTML = '<span class="terminal-prompt">┌──(ishan@security)-[~]<br>└─$ </span><span class="terminal-cursor">█</span>';
        this.output.appendChild(prompt);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize terminal when visible
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.initialized) {
                entry.target.dataset.initialized = 'true';
                new SecurityTerminal('security-terminal');
                observer.unobserve(entry.target);
            }
        });
    });

    const terminal = document.getElementById('security-terminal');
    if (terminal) observer.observe(terminal);
}
