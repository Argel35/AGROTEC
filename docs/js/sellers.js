// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const gridView = document.getElementById('gridView');
const listView = document.getElementById('listView');
const sellersGrid = document.getElementById('sellersGrid');
const sellerCards = document.querySelectorAll('.seller-card');

// Search functionality
function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    sellerCards.forEach(card => {
        const sellerName = card.querySelector('.seller-name').textContent.toLowerCase();
        
        if (sellerName.includes(searchTerm) || searchTerm === '') {
            card.style.display = 'block';
            // Add fade in animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show message if no results found
    const visibleCards = Array.from(sellerCards).filter(card => 
        card.style.display !== 'none'
    );
    
    if (visibleCards.length === 0 && searchTerm !== '') {
        showNoResultsMessage();
    } else {
        removeNoResultsMessage();
    }
}

function showNoResultsMessage() {
    removeNoResultsMessage(); // Remove existing message
    
    const noResultsDiv = document.createElement('div');
    noResultsDiv.className = 'no-results-message';
    noResultsDiv.innerHTML = `
        <div style="text-align: center; padding: 40px; color: #666;">
            <h3>No sellers found</h3>
            <p>Try adjusting your search terms</p>
        </div>
    `;
    
    sellersGrid.appendChild(noResultsDiv);
}

function removeNoResultsMessage() {
    const existingMessage = document.querySelector('.no-results-message');
    if (existingMessage) {
        existingMessage.remove();
    }
}

// View toggle functionality
function toggleGridView() {
    sellersGrid.classList.remove('list-view');
    gridView.classList.add('active');
    listView.classList.remove('active');
    
    // Reset card styles for grid view
    sellerCards.forEach(card => {
        card.style.display = 'block';
    });
}

function toggleListView() {
    sellersGrid.classList.add('list-view');
    listView.classList.add('active');
    gridView.classList.remove('active');
    
    // Show visible cards in list view
    sellerCards.forEach(card => {
        if (card.style.display !== 'none') {
            card.style.display = 'flex';
        }
    });
}

// Seller card interactions
function addCardInteractions() {
    sellerCards.forEach(card => {
        // Add click effect
        card.addEventListener('click', function() {
            const sellerName = this.querySelector('.seller-name').textContent;
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(76, 175, 80, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                left: 50%;
                top: 50%;
                width: 100px;
                height: 100px;
                margin-left: -50px;
                margin-top: -50px;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Show seller info (you can customize this)
            console.log(`Selected seller: ${sellerName}`);
        });
        
        // Add hover effects for images
        const img = card.querySelector('img');
        if (img) {
            card.addEventListener('mouseenter', function() {
                img.style.transform = 'scale(1.05)';
            });
            
            card.addEventListener('mouseleave', function() {
                img.style.transform = 'scale(1)';
            });
        }
    });
}

// Real-time search as user types
function setupLiveSearch() {
    searchInput.addEventListener('input', function() {
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            performSearch();
        }, 300); // Debounce search
    });
}

// Keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + F to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            searchInput.focus();
        }
        
        // Enter to search
        if (e.key === 'Enter' && document.activeElement === searchInput) {
            performSearch();
        }
        
        // Escape to clear search
        if (e.key === 'Escape') {
            searchInput.value = '';
            performSearch();
            searchInput.blur();
        }
    });
}

// Smooth scroll for better UX
function smoothScrollToResults() {
    if (searchInput.value.trim() !== '') {
        sellersGrid.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// Add CSS animation for ripple effect
function addRippleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize all functionality
function init() {
    // Event listeners
    searchBtn.addEventListener('click', () => {
        performSearch();
        smoothScrollToResults();
    });
    
    gridView.addEventListener('click', toggleGridView);
    listView.addEventListener('click', toggleListView);
    
    // Setup features
    setupLiveSearch();
    setupKeyboardShortcuts();
    addCardInteractions();
    addRippleAnimation();
    
    // Focus search input on page load
    setTimeout(() => {
        searchInput.focus();
    }, 500);
}

// Run initialization when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export functions for external use if needed
window.SellersApp = {
    performSearch,
    toggleGridView,
    toggleListView
};