export class Terminal {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.commands = [
            'whoami',
            'ls -la',
            'cat about.txt',
            'nmap -sV localhost'
        ];
        this.currentCommand = 0;
        this.observers = [];
        this.timeouts = [];
        this.intervals = [];
        this.init();
    }

    init() {
        this.clearTerminal();
        this.typeNextCommand();
    }

    clearTerminal() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }

    createCommandLine(command) {
        const line = document.createElement('div');
        line.className = 'command-line';
        
        const prompt = document.createElement('span');
        prompt.className = 'prompt';
        prompt.textContent = 'visitor@d4rkm4g1c:~$ ';
        
        const cmd = document.createElement('span');
        cmd.className = 'command';
        cmd.innerHTML = this.highlightSyntax(command);
        
        line.appendChild(prompt);
        line.appendChild(cmd);
        return line;
    }

    highlightSyntax(command) {
        // Basic syntax highlighting
        return command
            .replace(/(sudo|apt|git|npm|yarn)/g, '<span class="keyword">$1</span>')
            .replace(/(-[a-zA-Z]+ ?)/g, '<span class="flag">$1</span>')
            .replace(/("|'|`)(.*?)("|'|`)/g, '<span class="string">$1$2$3</span>')
            .replace(/(#.*$)/gm, '<span class="comment">$1</span>');
    }

    async typeCommand(command, element) {
        for (let i = 0; i < command.length; i++) {
            await new Promise(resolve => {
                const timeout = setTimeout(() => {
                    element.textContent += command[i];
                    resolve();
                }, 50);
                this.addTimeout(timeout);
            });
        }
    }

    createResponse(response) {
        const responseElement = document.createElement('div');
        responseElement.className = 'response';
        responseElement.textContent = response;
        return responseElement;
    }

    async typeNextCommand() {
        if (this.currentCommand >= this.commands.length) {
            this.currentCommand = 0;
        }

        const command = this.commands[this.currentCommand];
        const commandLine = this.createCommandLine('');
        this.container.appendChild(commandLine);

        const cmdSpan = commandLine.querySelector('.command');
        await this.typeCommand(command, cmdSpan);

        // Add response after command
        const responses = {
            'whoami': 'visitor',
            'ls -la': 'total 40\ndrwxr-xr-x  2 visitor visitor 4096 Mar 15 10:30 .\ndrwxr-xr-x 15 visitor visitor 4096 Mar 15 10:30 ..\n-rw-r--r--  1 visitor visitor  220 Mar 15 10:30 about.txt',
            'cat about.txt': 'Cybersecurity professional specializing in cloud security and automation.\nExpertise in Azure security assessments and compliance.',
            'nmap -sV localhost': 'Starting Nmap 7.80...\nScanning localhost...\nNmap scan report for localhost\nHost is up.'
        };

        const response = this.createResponse(responses[command] || 'Command not found');
        this.container.appendChild(response);

        this.currentCommand++;

        // Schedule next command
        const timeout = setTimeout(() => this.typeNextCommand(), 3000);
        this.addTimeout(timeout);
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    addTimeout(timeout) {
        this.timeouts.push(timeout);
    }

    addInterval(interval) {
        this.intervals.push(interval);
    }

    clearAll() {
        // Clear all timeouts
        this.timeouts.forEach(timeout => clearTimeout(timeout));
        this.timeouts = [];

        // Clear all intervals
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals = [];

        // Clear terminal content
        this.clearTerminal();
    }
} 