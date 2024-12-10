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
const animatedElements = document.querySelectorAll('.skill-category, .project-card, .cert-card, .content-card');
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, { threshold: 0.1 }); // Reduced threshold for earlier animation

    animatedElements.forEach(el => observer.observe(el));
}

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

