// Main script for the website
console.log('Script loaded');

// Global variables
let terminalInstance = null;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    
    // Initialize all functionality
    initNavigation();
    initThemeToggle();
    initSmoothScrolling();
    initContentFilters();
    initScrollEffects();
    initAnimations();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle?.querySelector('i');
    
    if (themeToggle && icon) {
        // Set initial theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle?.querySelector('i');
    
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Content filtering functionality
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
                        card.classList.remove('hidden');
                    } else {
                        if (card.classList.contains(filterValue)) {
                            card.style.display = 'block';
                            card.classList.remove('hidden');
                        } else {
                            card.style.display = 'none';
                            card.classList.add('hidden');
                        }
                    }
                });
            });
        });
    }
}

// Scroll effects
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', throttle(() => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            
            if (window.scrollY > 50) {
                if (currentTheme === 'dark') {
                    navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                }
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.borderBottom = '1px solid var(--border)';
            } else {
                navbar.style.background = 'var(--background)';
                navbar.style.backdropFilter = 'none';
                navbar.style.borderBottom = '1px solid var(--border)';
            }
        }, 100));
    }
}

// Animation on scroll
function initAnimations() {
    const animatedElements = document.querySelectorAll(
        '.card, .content-card, .project-card'
    );

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        animatedElements.forEach(el => el.classList.add('animate'));
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

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'dark'); // Default to dark for cybersecurity theme
    setTheme(theme);
});

// Handle 404 page glitch effect if it exists
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

