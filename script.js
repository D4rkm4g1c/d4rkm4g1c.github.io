// Add this at the top of your script.js
console.log('Script loaded');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    const terminalElement = document.getElementById('terminal-content');
    console.log('Terminal element:', terminalElement);
    if (terminalElement) {
        const terminal = new Terminal('terminal-content');
    } else {
        console.error('Terminal element not found');
    }
});


// Typewriter effect
const typewriterText = document.getElementById('typewriter-text');
const phrases = [
    'Cybersecurity Consultant',
    'CSTM Certified',
    'Caffeine Addict'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterDelay = 100;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typewriterDelay = 2000; // Pause at end of phrase
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typewriterDelay = 200;
    } else {
        typewriterDelay = isDeleting ? 50 : 100;
    }
    
    setTimeout(typeWriter, typewriterDelay);
}

// Start the typewriter effect
typeWriter();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Navbar background change on scroll
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            const navbar = document.getElementById('navbar');
            navbar.style.background = window.scrollY > 50 ? 
                'rgba(10, 10, 10, 0.95)' : 'transparent';
            scrollTimeout = null;
        }, 100); // Throttle to run max once every 100ms
    }
}, { passive: true }); // Add passive flag for better scroll performance

// Add animation to elements when they come into view
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll(
        '.skill-category, .project-card, .cert-card, .content-card, .research-card, .coming-soon-card'
    );

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Add animation class when element is 10% visible
                if (entry.isIntersecting) {
                    // Small delay for smoother loading
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });

        // Observe elements in chunks to improve performance
        let delay = 0;
        animatedElements.forEach((el, index) => {
            if (index % 3 === 0) {
                delay += 50; // Stagger the observations
            }
            setTimeout(() => {
                observer.observe(el);
            }, delay);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        animatedElements.forEach(el => el.classList.add('animate'));
    }
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light-mode') {
    body.classList.add('light-mode');
    icon.className = 'fas fa-moon';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    
    // Save theme preference
    localStorage.setItem('theme', isLight ? 'light-mode' : '');
    
    // Update icon
    icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
});

document.addEventListener('DOMContentLoaded', function() {
    // Particle.js configuration
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 40, // Reduced from 80
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#9d00ff'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 2, // Reduced from 3
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00e5ff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 1.5, // Reduced from 2
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                }
            }
        },
        retina_detect: true
    });
});

// Blog Modal Functionality
document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', () => {
        const postId = button.getAttribute('data-post-id');
        const modal = document.getElementById(`post-${postId}`);
        modal.style.display = 'block';
    });
});

document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', () => {
        button.closest('.blog-modal').style.display = 'none';
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('blog-modal')) {
        e.target.style.display = 'none';
    }
});

// 404 Page Glitch Effect
if (document.querySelector('.glitch')) {
    const glitchText = document.querySelector('.glitch');
    setInterval(() => {
        const originalText = glitchText.getAttribute('data-text');
        glitchText.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
        setTimeout(() => {
            glitchText.style.transform = 'translate(0, 0)';
        }, 50);
    }, 2000);
}

function showProjectModal(projectId) {
    const modal = document.getElementById(`${projectId}-modal`);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal when clicking the close button
document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.project-modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('project-modal')) {
        e.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Content Filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const contentCards = document.querySelectorAll('.content-card');

    // Only proceed if we have filter buttons and content cards
    if (filterButtons.length && contentCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.dataset.filter;
                
                contentCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease forwards';
                    } else {
                        if (card.classList.contains(filterValue)) {
                            card.style.display = 'block';
                            card.style.animation = 'fadeIn 0.5s ease forwards';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
});

// Optimize modal event listeners
const modalHandler = (e) => {
    const modal = e.target.closest('.blog-modal, .project-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

// Use event delegation for modal events
document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('read-more')) {
        const postId = e.target.getAttribute('data-post-id');
        const modal = document.getElementById(`post-${postId}`);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    } else if (e.target.classList.contains('close-modal') || 
               e.target.classList.contains('blog-modal') || 
               e.target.classList.contains('project-modal')) {
        modalHandler(e);
    }
});

class Terminal {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.commandHistory = [];
        this.historyIndex = -1;
        this.currentCommand = '';
        this.isTyping = false;
        
        // Initial commands and responses
        this.commands = [
            { command: 'whoami', response: 'Cybersecurity Professional' },
            { command: 'ls ./skills', response: [
                '> Penetration Testing',
                '> Cloud Security',
                '> Security Tool Development'
            ]},
            { command: 'cat /etc/profile', response: [
                'Experience:',
                '- Security Assessments',
                '- Tool Development',
                '- Cloud Security'
            ]}
        ];
        
        this.init();
    }

    init() {
        this.clearTerminal();
        this.typeNextCommand();
    }

    clearTerminal() {
        this.container.innerHTML = '';
    }

    createCommandLine(command) {
        const line = document.createElement('div');
        line.className = 'command-line';
        
        const prompt = document.createElement('span');
        prompt.className = 'prompt';
        prompt.textContent = '$';
        
        const commandText = document.createElement('span');
        commandText.className = 'command-text';
        
        // Syntax highlighting
        const highlightedCommand = this.highlightSyntax(command);
        commandText.innerHTML = highlightedCommand;
        
        line.appendChild(prompt);
        line.appendChild(commandText);
        
        return line;
    }

    highlightSyntax(command) {
        // Split command into parts
        const parts = command.split(' ');
        let highlighted = '';
        
        // Highlight first word as command
        highlighted += `<span class="command-text">${parts[0]}</span>`;
        
        // Highlight remaining parts
        for (let i = 1; i < parts.length; i++) {
            const part = parts[i];
            if (part.startsWith('--') || part.startsWith('-')) {
                highlighted += ` <span class="parameter">${part}</span>`;
            } else if (part.startsWith('./') || part.includes('/')) {
                highlighted += ` <span class="argument">${part}</span>`;
            } else {
                highlighted += ` ${part}`;
            }
        }
        
        return highlighted;
    }

    async typeCommand(command, element) {
        const chars = command.split('');
        for (let char of chars) {
            await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 50));
            element.innerHTML += char;
        }
    }

    createResponse(response) {
        const responseElement = document.createElement('div');
        responseElement.className = 'response';
        
        if (Array.isArray(response)) {
            response.forEach(line => {
                const lineElement = document.createElement('div');
                lineElement.textContent = line;
                responseElement.appendChild(lineElement);
            });
        } else {
            responseElement.textContent = response;
        }
        
        return responseElement;
    }

    async typeNextCommand() {
        if (this.isTyping || this.commands.length === 0) return;
        
        this.isTyping = true;
        const command = this.commands.shift();
        
        // Create and add command line
        const commandLine = this.createCommandLine('');
        this.container.appendChild(commandLine);
        
        // Add blinking cursor
        const cursor = document.createElement('span');
        cursor.className = 'cursor-blink';
        commandLine.appendChild(cursor);
        
        // Type command
        await this.typeCommand(command.command, commandLine.querySelector('.command-text'));
        
        // Remove cursor and add response
        cursor.remove();
        
        // Add response after small delay
        await new Promise(resolve => setTimeout(resolve, 500));
        this.container.appendChild(this.createResponse(command.response));
        
        // Scroll to bottom
        this.container.scrollTop = this.container.scrollHeight;
        
        // Store in history
        this.commandHistory.push(command.command);
        
        this.isTyping = false;
        
        // Continue with next command after delay
        setTimeout(() => this.typeNextCommand(), 1000);
    }
}

