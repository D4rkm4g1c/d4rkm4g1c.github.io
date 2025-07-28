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
    initParallaxEffects();
    initTypewriterEffect();
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

// Theme functionality - Always dark mode
function initThemeToggle() {
    // Always set theme to dark
    setTheme('dark');
    
    // Hide theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.style.display = 'none';
    }
}

function setTheme(theme) {
    // Always use dark theme
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
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

// Enhanced scroll effects
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
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.borderBottom = '1px solid var(--border)';
            } else {
                navbar.style.background = 'var(--background)';
                navbar.style.backdropFilter = 'none';
                navbar.style.borderBottom = '1px solid var(--border)';
            }
        }, 100));
    }
}

// Enhanced animation on scroll
function initAnimations() {
    const animatedElements = document.querySelectorAll(
        '.card, .content-card, .project-card, .service-card'
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

// Parallax effects for hero section
function initParallaxEffects() {
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }, 16));
    }
}

// Typewriter effect for hero title
function initTypewriterEffect() {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid var(--primary)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }
}

// Enhanced hover effects for cards
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.card, .content-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
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

// Enhanced loading animations
window.addEventListener('load', () => {
    // Add loaded class to body for additional animations
    document.body.classList.add('loaded');
    
    // Initialize card hover effects
    initCardHoverEffects();
    
    // Add staggered animation to cards
    const cards = document.querySelectorAll('.card, .content-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

