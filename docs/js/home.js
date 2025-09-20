/*
 * AGROTEC Website - Main JavaScript
 * Author: Senior Front-End Developer  
 * Date: September 2025
 * Description: Core functionality for AGROTEC website
 */

(function() {
    'use strict';

    // DOM Elements
    const navbar = document.querySelector('.navbar');
    const navbarToggle = document.querySelector('.navbar__toggle');
    const navbarMenu = document.querySelector('.navbar__menu');
    const navbarLinks = document.querySelectorAll('.navbar__link');

    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
        initSmoothScrolling();
        initScrollEffects();
    });

    /**
     * Mobile Menu Functionality
     */
    function initMobileMenu() {
        if (!navbarToggle || !navbarMenu) return;

        navbarToggle.addEventListener('click', toggleMobileMenu);
        
        // Close menu when clicking on links
        navbarLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target) && navbarMenu.classList.contains('navbar__menu--open')) {
                closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navbarMenu.classList.contains('navbar__menu--open')) {
                closeMobileMenu();
            }
        });
    }

    /**
     * Toggle mobile menu
     */
    function toggleMobileMenu() {
        const isOpen = navbarMenu.classList.contains('navbar__menu--open');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    /**
     * Open mobile menu
     */
    function openMobileMenu() {
        navbarMenu.classList.add('navbar__menu--mobile', 'navbar__menu--open');
        navbarToggle.setAttribute('aria-expanded', 'true');
        navbarToggle.classList.add('navbar__toggle--active');
        document.body.style.overflow = 'hidden';
        
        // Focus first menu item for accessibility
        const firstLink = navbarMenu.querySelector('.navbar__link');
        if (firstLink) {
            firstLink.focus();
        }
    }

    /**
     * Close mobile menu
     */
    function closeMobileMenu() {
        navbarMenu.classList.remove('navbar__menu--open');
        navbarToggle.setAttribute('aria-expanded', 'false');
        navbarToggle.classList.remove('navbar__toggle--active');
        document.body.style.overflow = '';
        
        // Return focus to toggle button
        navbarToggle.focus();
        
        // Remove mobile classes after animation
        setTimeout(() => {
            navbarMenu.classList.remove('navbar__menu--mobile');
        }, 300);
    }

    /**
     * Smooth scrolling for internal links
     */
    function initSmoothScrolling() {
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's just "#"
                if (href === '#') return;
                
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Close mobile menu if open
                    closeMobileMenu();
                    
                    // Calculate offset for fixed navbar
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Scroll effects (navbar background, animations)
     */
    function initScrollEffects() {
        let ticking = false;
        
        function updateScrollEffects() {
            const scrollY = window.pageYOffset;
            
            // Navbar background opacity based on scroll
            if (scrollY > 50) {
                navbar.classList.add('navbar--scrolled');
            } else {
                navbar.classList.remove('navbar--scrolled');
            }
            
            // Animate elements on scroll
            animateOnScroll();
            
            ticking = false;
        }
        
        function requestScrollUpdate() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestScrollUpdate, { passive: true });
        
        // Initial call
        updateScrollEffects();
    }

    /**
     * Animate elements when they come into view
     */
    function animateOnScroll() {
        const animationElements = document.querySelectorAll('[data-animate]');
        
        animationElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                const animationType = element.getAttribute('data-animate') || 'fade-in-up';
                element.classList.add(animationType, 'animated');
            }
        });
    }

    /**
     * Check if element is in viewport
     */
    function isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= windowHeight + 100 && // Add 100px buffer
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        ) || (
            rect.top < windowHeight &&
            rect.bottom >= 0
        );
    }

    /**
     * Intersection Observer for better performance (modern browsers)
     */
    function initIntersectionObserver() {
        if (!('IntersectionObserver' in window)) {
            // Fallback to scroll-based animation
            return;
        }

        const observerOptions = {
            root: null,
            rootMargin: '50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    const animationType = entry.target.getAttribute('data-animate') || 'fade-in-up';
                    entry.target.classList.add(animationType, 'animated');
                }
            });
        }, observerOptions);

        // Observe all elements with data-animate attribute
        const animationElements = document.querySelectorAll('[data-animate]');
        animationElements.forEach(element => {
            observer.observe(element);
        });
    }

    /**
     * Form handling utilities
     */
    function initFormHandling() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                // Basic form validation can be added here
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                    } else {
                        field.classList.remove('error');
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                }
            });
        });
    }

    /**
     * Accessibility improvements
     */
    function initAccessibility() {
        // Skip link functionality
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.focus();
                    target.scrollIntoView();
                }
            });
        }
        
        // Keyboard navigation for dropdowns/modals
        document.addEventListener('keydown', function(e) {
            // Handle escape key for modals/menus
            if (e.key === 'Escape') {
                const openModals = document.querySelectorAll('.modal--open');
                openModals.forEach(modal => {
                    // Close modal logic here
                });
            }
        });
    }

    /**
     * Lazy loading images (if not using native loading="lazy")
     */
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.getAttribute('data-src');
                        img.removeAttribute('data-src');
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            lazyImages.forEach(img => {
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
            });
        }
    }

    // Initialize all functionality
    document.addEventListener('DOMContentLoaded', function() {
        initIntersectionObserver();
        initFormHandling();
        initAccessibility();
        initLazyLoading();
    });

    // Expose utilities globally if needed
    window.AGROTEC = {
        openMobileMenu,
        closeMobileMenu,
        toggleMobileMenu
    };

})();