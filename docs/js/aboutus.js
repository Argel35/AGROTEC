// AGROTEC Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for read more buttons
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'translateY(-2px) scale(0.98)';
            
            setTimeout(() => {
                this.style.transform = 'translateY(-2px) scale(1)';
            }, 150);
            
            // Here you can add functionality for each button
            const sectionName = this.closest('section').classList.contains('agrotec-section') ? 'AGROTEC' : 
                               this.closest('.vision-card') ? 'VISION' : 'MISSION';
            
            console.log(`Read more clicked for: ${sectionName}`);
            
            // You can add modal functionality or navigation here
            showMoreInfo(sectionName);
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.logo-container, .text-section, .mission-card, .vision-card');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease-out';
        observer.observe(element);
    });
    
    // Image hover effects
    const images = document.querySelectorAll('.agrotec-main-image, .person-image, .hands-image');
    
    images.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Card hover effects
    const cards = document.querySelectorAll('.mission-card, .vision-card, .text-section');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
});

// Function to show more information (can be customized)
function showMoreInfo(section) {
    const messages = {
        'AGROTEC': 'Discover more about AGROTEC\'s innovative agricultural technology solutions!',
        'VISION': 'Learn more about our vision to revolutionize e-commerce for agricultural products!',
        'MISSION': 'Explore how we empower merchants and enhance customer experiences!'
    };
    
    // You can replace this with a modal or navigation
    alert(messages[section] || 'More information coming soon!');
    
    // Example of how you might navigate to different sections or pages:
    // window.location.href = `#${section.toLowerCase()}`;
    // or open a modal:
    // openModal(section);
}

// Smooth scrolling function (if needed for navigation)
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Window resize handler
window.addEventListener('resize', function() {
    // Adjust layouts if needed for responsive design
    const windowWidth = window.innerWidth;
    
    if (windowWidth < 768) {
        // Mobile adjustments
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
    }
});

// Initialize on load
window.addEventListener('load', function() {
    // Add loaded class for additional animations
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        const firstSection = document.querySelector('.agrotec-section');
        if (firstSection) {
            firstSection.style.opacity = '1';
        }
    }, 100);
});