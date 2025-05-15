// Add this at the top of your script.js
console.log('Script loaded');

import { Terminal } from './terminal.js';

let terminalInstance = null; // Global variable to track terminal instance

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    const terminalElement = document.getElementById('terminal-content');
    console.log('Terminal element:', terminalElement);
    
    // Only create a new terminal if one doesn't exist
    if (terminalElement && !terminalInstance) {
        terminalInstance = new Terminal('terminal-content');
    }

    // Initialize typewriter effect
    initTypewriter();

    // Initialize event listeners
    initEventListeners();
});

// Typewriter effect initialization
function initTypewriter() {
    const phrases = ['Cybersecurity Consultant', 'CSTM Certified', 'Caffeine Addict'];
    let currentPhrase = 0;
    const typewriterElement = document.querySelector('.typewriter');
    
    if (typewriterElement) {
        setInterval(() => {
            typewriterElement.textContent = phrases[currentPhrase];
            currentPhrase = (currentPhrase + 1) % phrases.length;
        }, 3000);
    }
}

// Event listeners initialization
function initEventListeners() {
    // Navigation toggle for mobile
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                navLinks?.classList.remove('active');
            }
        });
    });

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        initThemeToggle(themeToggle);
    }

    // Project card flipping
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            this.querySelector('.card-inner')?.classList.toggle('flipped');
        });
    });

    // Modal handling using event delegation
    document.body.addEventListener('click', handleModalClick);

    // Optimize scroll handling with throttling
    window.addEventListener('scroll', throttle(handleScroll, 150), { passive: true });

    // Content filtering
    initContentFilters();
}

// Theme toggle initialization
function initThemeToggle(themeToggle) {
    const savedTheme = localStorage.getItem('theme');
    const icon = themeToggle.querySelector('i');
    
    if (savedTheme === 'light-mode') {
        document.body.classList.add('light-mode');
        icon.className = 'fas fa-moon';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light-mode' : '');
        icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
    });
}

// Modal click handler
function handleModalClick(e) {
    if (e.target.classList.contains('read-more')) {
        const postId = e.target.getAttribute('data-post-id');
        const modal = document.getElementById(`post-${postId}`);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    } else if (e.target.classList.contains('close-modal') || 
               e.target.classList.contains('blog-modal')) {
        const modal = e.target.closest('.blog-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
}

// Scroll handler with navbar background change
function handleScroll() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        navbar.style.background = window.scrollY > 50 ? 
            'rgba(10, 10, 10, 0.95)' : 'transparent';
    }
}

// Content filtering initialization
function initContentFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const contentCards = document.querySelectorAll('.content-card');

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
}

// Utility function for throttling
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Handle 404 page glitch effect
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

// Add this to the end of your script.js
// Clean up event listeners when components are removed
const cleanup = {
    observers: [],
    timeouts: [],
    intervals: [],
    
    addObserver(observer) {
        this.observers.push(observer);
    },
    
    addTimeout(timeout) {
        this.timeouts.push(timeout);
    },
    
    addInterval(interval) {
        this.intervals.push(interval);
    },
    
    clearAll() {
        this.observers.forEach(observer => observer.disconnect());
        this.timeouts.forEach(clearTimeout);
        this.intervals.forEach(clearInterval);
        
        this.observers = [];
        this.timeouts = [];
        this.intervals = [];
    }
};

// Clean up when navigating away
window.addEventListener('unload', () => cleanup.clearAll());

const phrases = [
    'Cybersecurity Consultant',
    'Security Researcher',
    'Python Developer',
    'Cloud Security Expert'
];

let currentPhraseIndex = 0;
let currentText = '';
let isDeleting = false;
let typingSpeed = 100; // Base typing speed

function typeEffect() {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isDeleting) {
        currentText = currentPhrase.substring(0, currentText.length - 1);
        typingSpeed = 50; // Faster when deleting
    } else {
        currentText = currentPhrase.substring(0, currentText.length + 1);
        typingSpeed = 100; // Normal speed when typing
    }

    document.querySelector('.typewriter').textContent = currentText;

    if (!isDeleting && currentText === currentPhrase) {
        // Start deleting after a pause
        typingSpeed = 2000; // Pause at the end of phrase
        isDeleting = true;
    } else if (isDeleting && currentText === '') {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before starting new phrase
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start the typing effect when the page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000); // Initial delay before starting
});

