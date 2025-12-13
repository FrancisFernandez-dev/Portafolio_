// Smooth scroll to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const navHeight = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - (sectionId === 'hero' ? navHeight : navHeight);

        window.scrollTo({
            top: sectionId === 'hero' ? 0 : offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Active section highlighting on scroll
function updateActiveSection() {
    const sections = ['hero', 'about', 'projects', 'experience', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
            const offsetTop = element.offsetTop;
            const offsetHeight = element.offsetHeight;

            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                // Update nav links
                navLinks.forEach((link, index) => {
                    if (index === sections.indexOf(sectionId) - 1) { // -1 because hero is not in nav
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
                break;
            }
        }
    }
}

// Experience tabs functionality
function initExperienceTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const panels = document.querySelectorAll('.experience-panel');

    tabButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const tabIndex = button.getAttribute('data-tab');

            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            panels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            const activePanel = document.querySelector(`[data-panel="${tabIndex}"]`);
            if (activePanel) {
                activePanel.classList.add('active');
            }
        });
    });
}

// Theme toggle (optional - currently just visual)
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            // You can implement actual theme switching here
            console.log('Theme toggle clicked');
            // Example: document.body.classList.toggle('light-theme');
        });
    }
}

// Navbar background on scroll
function handleNavbarScroll() {
    const nav = document.getElementById('top-nav');
    
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(15, 15, 20, 0.95)';
    } else {
        nav.style.background = 'rgba(15, 15, 20, 0.8)';
    }
}

// Intersection Observer for fade-in animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Add floating animation to particles (already in SVG, but we can enhance)
function initParticleAnimations() {
    // Particles are animated via SVG animate elements
    // Additional JS animations could be added here if needed
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize tabs
    initExperienceTabs();
    
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Set up scroll event listeners
    window.addEventListener('scroll', () => {
        updateActiveSection();
        handleNavbarScroll();
    });
    
    // Initial calls
    updateActiveSection();
    handleNavbarScroll();
});

// Add smooth hover effects for buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button, a.btn-contact');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
});

// Prevent default anchor behavior for internal links
document.addEventListener('DOMContentLoaded', () => {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const sectionId = href.substring(1);
                scrollToSection(sectionId);
            }
        });
    });
});

// Add loading animation for the page
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Add keyboard shortcuts if needed
    // Example: Press numbers 1-4 to navigate to sections
    if (e.key >= '1' && e.key <= '4') {
        const sections = ['about', 'projects', 'experience', 'contact'];
        const sectionIndex = parseInt(e.key) - 1;
        if (sections[sectionIndex]) {
            scrollToSection(sections[sectionIndex]);
        }
    }
});

// Mobile menu toggle (if you want to add a hamburger menu later)
function initMobileMenu() {
    // Placeholder for mobile menu functionality
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        // You can add mobile-specific behavior here
    }
}

// Resize handler
window.addEventListener('resize', () => {
    initMobileMenu();
});

// Performance: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler
const debouncedScrollHandler = debounce(() => {
    updateActiveSection();
    handleNavbarScroll();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);
