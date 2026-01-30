// ======================================
// GREEN PITCH - JavaScript
// Avec améliorations UX et Accessibilité
// ======================================

// === VARIABLES GLOBALES ===
let currentLang = 'fr';

// === INITIALISATION ===
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    initNavigation();
    initForm();
    initKeyboardNavigation();
    updateLanguageAttributes();
});

// === GESTION DU THÈME ===
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    updateThemeIcon(newTheme);
    updateLanguageContent();
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('theme-icon');
    const text = document.getElementById('theme-text');
    
    if (!icon || !text) return;
    
    if (theme === 'light') {
        icon.className = 'fa-solid fa-moon';
        text.setAttribute('data-fr', 'Mode Sombre');
        text.setAttribute('data-en', 'Dark Mode');
    } else {
        icon.className = 'fa-solid fa-sun';
        text.setAttribute('data-fr', 'Mode Clair');
        text.setAttribute('data-en', 'Light Mode');
    }
    
    const textContent = text.getAttribute('data-' + currentLang);
    if (textContent) {
        text.textContent = textContent;
    }
}

// === GESTION DE LA LANGUE ===
function initLanguage() {
    const savedLang = localStorage.getItem('language') || 'fr';
    if (savedLang !== 'fr') {
        switchLang(savedLang);
    }
}

function switchLang(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Update HTML lang attribute for accessibility
    document.documentElement.lang = lang;
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const isActive = btn.textContent.toLowerCase() === lang;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive);
    });
    
    // Update all content
    updateLanguageContent();
}

function updateLanguageContent() {
    document.querySelectorAll('.lang').forEach(element => {
        const text = element.getAttribute('data-' + currentLang);
        if (text) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else if (element.tagName === 'OPTION') {
                element.textContent = text;
            } else {
                element.innerHTML = text;
            }
        }
    });
}

function updateLanguageAttributes() {
    // Update aria-label attributes based on current language
    const burgerBtn = document.querySelector('.burger');
    if (burgerBtn) {
        const label = currentLang === 'fr' ? 'Ouvrir le menu de navigation' : 'Open navigation menu';
        burgerBtn.setAttribute('aria-label', label);
    }
}

// === NAVIGATION ===
function initNavigation() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            burger.setAttribute('aria-expanded', isExpanded);
            
            // Accessibility: Focus management
            if (isExpanded) {
                const firstLink = navLinks.querySelector('a');
                if (firstLink) {
                    setTimeout(() => firstLink.focus(), 100);
                }
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
                burger.focus();
            }
        });
    }
}

// === GESTION DES PAGES ===
function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById('page-' + pageName);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    const activeLink = document.querySelector(`[data-page="${pageName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Close mobile menu
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.remove('active');
    }
    const burger = document.querySelector('.burger');
    if (burger) {
        burger.setAttribute('aria-expanded', 'false');
    }
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Focus on main content for accessibility
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.focus();
    }
}

// === GESTION DES DÉTAILS SPORTS ===
function showSportDetail(sportName) {
    // Hide overview
    const overview = document.getElementById('sports-overview');
    if (overview) {
        overview.style.display = 'none';
    }
    
    // Hide all sport details
    document.querySelectorAll('.sport-detail').forEach(detail => {
        detail.style.display = 'none';
    });
    
    // Show selected sport
    const targetSport = document.getElementById('sport-' + sportName);
    if (targetSport) {
        targetSport.style.display = 'block';
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Focus on the sport title for accessibility
    const sportTitle = targetSport?.querySelector('h1');
    if (sportTitle) {
        sportTitle.setAttribute('tabindex', '-1');
        sportTitle.focus();
    }
}

function showSportsOverview() {
    // Hide all sport details
    document.querySelectorAll('.sport-detail').forEach(detail => {
        detail.style.display = 'none';
    });
    
    // Show overview
    const overview = document.getElementById('sports-overview');
    if (overview) {
        overview.style.display = 'grid';
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Focus on sports title for accessibility
    const sportsTitle = document.getElementById('sports-title');
    if (sportsTitle) {
        sportsTitle.setAttribute('tabindex', '-1');
        sportsTitle.focus();
    }
}

// === GESTION DU FORMULAIRE ===
function initForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate form
        if (!validateForm(form)) {
            return;
        }
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show success message
        const successMessage = currentLang === 'fr'
            ? 'Merci pour votre message ! Nous vous contacterons bientôt.'
            : 'Thank you for your message! We will contact you soon.';
        
        alert(successMessage);
        
        // Reset form
        form.reset();
        
        // Focus back to first input for accessibility
        const firstInput = form.querySelector('input');
        if (firstInput) {
            firstInput.focus();
        }
    });
    
    // Real-time validation feedback
    form.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) {
                validateField(input);
            }
        });
    });
}

function validateForm(form) {
    let isValid = true;
    
    form.querySelectorAll('.form-control[required]').forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    if (input.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = currentLang === 'fr' ? 'Ce champ est obligatoire' : 'This field is required';
    } else if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = currentLang === 'fr' ? 'Email invalide' : 'Invalid email';
        }
    } else if (input.type === 'tel' && value) {
        const phoneRegex = /^[0-9\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = currentLang === 'fr' ? 'Numéro invalide' : 'Invalid number';
        }
    }
    
    // Update field styling
    input.classList.toggle('invalid', !isValid);
    input.classList.toggle('valid', isValid && value);
    
    // Update aria-invalid attribute for accessibility
    input.setAttribute('aria-invalid', !isValid);
    
    // Show/hide error message
    let errorElement = input.parentElement.querySelector('.error-message');
    
    if (!isValid && errorMessage) {
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            errorElement.style.color = '#ef4444';
            errorElement.style.fontSize = '0.85rem';
            errorElement.style.marginTop = '4px';
            errorElement.style.display = 'block';
            errorElement.setAttribute('role', 'alert');
            input.parentElement.appendChild(errorElement);
        }
        errorElement.textContent = errorMessage;
        input.setAttribute('aria-describedby', errorElement.id || 'error-' + input.id);
    } else if (errorElement) {
        errorElement.remove();
        input.removeAttribute('aria-describedby');
    }
    
    return isValid;
}

// === NAVIGATION AU CLAVIER ===
function initKeyboardNavigation() {
    // Allow keyboard navigation in card grids
    document.querySelectorAll('.card, .team-card, .game-card').forEach(card => {
        if (!card.hasAttribute('tabindex')) {
            card.setAttribute('tabindex', '0');
        }
        
        // Allow Enter and Space to activate cards
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
    
    // Improve video box keyboard accessibility
    document.querySelectorAll('.video-box').forEach(box => {
        if (!box.hasAttribute('tabindex')) {
            box.setAttribute('tabindex', '0');
        }
    });
    
    // Add keyboard shortcut hints (optional)
    document.addEventListener('keydown', (e) => {
        // Alt+H for home
        if (e.altKey && e.key === 'h') {
            e.preventDefault();
            showPage('accueil');
        }
        // Alt+S for sports
        if (e.altKey && e.key === 's') {
            e.preventDefault();
            showPage('sports');
        }
        // Alt+C for contact
        if (e.altKey && e.key === 'c') {
            e.preventDefault();
            showPage('contact');
        }
    });
}

// === SMOOTH SCROLL FOR ANCHOR LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href.startsWith('#page-')) {
            // Let showPage() handle these
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Focus target for accessibility
            target.focus();
        }
    });
});

// === LAZY LOADING IMAGES ===
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// === DETECT USER ACTIVITY FOR ACCESSIBILITY ===
let userActivityTimeout;

function resetUserActivity() {
    clearTimeout(userActivityTimeout);
    userActivityTimeout = setTimeout(() => {
        // User has been inactive - could trigger accessibility helpers
    }, 30000); // 30 seconds
}

document.addEventListener('mousemove', resetUserActivity);
document.addEventListener('keydown', resetUserActivity);
document.addEventListener('scroll', resetUserActivity);
document.addEventListener('touchstart', resetUserActivity);

// === PERFORMANCE MONITORING ===
if ('PerformanceObserver' in window) {
    try {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                // Log performance metrics (could be sent to analytics)
                if (entry.duration > 1000) {
                    console.warn('Slow operation detected:', entry.name, entry.duration);
                }
            }
        });
        observer.observe({ entryTypes: ['measure', 'navigation'] });
    } catch (e) {
        // Performance Observer not supported
    }
}

// === PREVENT ZOOM ON INPUT FOCUS (iOS) ===
document.querySelectorAll('input, select, textarea').forEach(element => {
    // Already set font-size to 16px in CSS to prevent iOS zoom
    element.addEventListener('focus', function() {
        if (this.style.fontSize !== '16px') {
            this.style.fontSize = '16px';
        }
    });
});

// === ACCESSIBILITY ANNOUNCEMENTS ===
function announce(message, priority = 'polite') {
    const announcer = document.getElementById('aria-announcer') || createAnnouncer();
    announcer.setAttribute('aria-live', priority);
    announcer.textContent = message;
    
    // Clear after announcement
    setTimeout(() => {
        announcer.textContent = '';
    }, 1000);
}

function createAnnouncer() {
    const announcer = document.createElement('div');
    announcer.id = 'aria-announcer';
    announcer.setAttribute('role', 'status');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.position = 'absolute';
    announcer.style.left = '-10000px';
    announcer.style.width = '1px';
    announcer.style.height = '1px';
    announcer.style.overflow = 'hidden';
    document.body.appendChild(announcer);
    return announcer;
}

// === EXPORT FUNCTIONS FOR GLOBAL USE ===
window.showPage = showPage;
window.showSportDetail = showSportDetail;
window.showSportsOverview = showSportsOverview;
window.toggleTheme = toggleTheme;
window.switchLang = switchLang;

// === SERVICE WORKER REGISTRATION (OPTIONAL) ===
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(err => console.log('SW registration failed'));
    });
}

// === CONSOLE MESSAGE ===
console.log('%c🏃 GREEN PITCH - Site chargé avec succès!', 'color: #10b981; font-size: 16px; font-weight: bold;');
console.log('%c✅ Accessibilité: Navigation clavier, Focus visible, ARIA labels', 'color: #34d399;');
console.log('%c🌐 Langues: FR/EN disponibles', 'color: #34d399;');
console.log('%c🎨 Thèmes: Sombre/Clair disponibles', 'color: #34d399;');
