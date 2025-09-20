// js/script.js
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const gridBtn = document.querySelector('.grid-btn');
    const listBtn = document.querySelector('.list-btn');
    const productsGrid = document.getElementById('productsGrid');
    const favoriteButtons = document.querySelectorAll('.favorite-btn');

    // Search functionality
    searchBtn.addEventListener('click', function() {
        performSearch();
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const productCards = document.querySelectorAll('.product-card');

        if (searchTerm === '') {
            // Show all products
            productCards.forEach(card => {
                card.style.display = '';
            });
            return;
        }

        productCards.forEach(card => {
            const productName = card.querySelector('.product-name').textContent.toLowerCase();
            const productTag = card.querySelector('.product-tag').textContent.toLowerCase();
            
            if (productName.includes(searchTerm) || productTag.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // View toggle functionality
    gridBtn.addEventListener('click', function() {
        switchToGridView();
    });

    listBtn.addEventListener('click', function() {
        switchToListView();
    });

    function switchToGridView() {
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
        productsGrid.classList.remove('list-view');
    }

    function switchToListView() {
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
        productsGrid.classList.add('list-view');
    }

    // Favorite functionality
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            toggleFavorite(this);
        });
    });

    function toggleFavorite(button) {
        if (button.textContent === '♡') {
            button.textContent = '♥';
            button.style.color = '#ff4757';
            button.style.background = 'rgba(255, 255, 255, 0.95)';

            document.addEventListener('DOMContentLoaded', function () {
                const addButtons = document.querySelectorAll('.add-btn');
                
                addButtons.forEach(btn => {
                    btn.addEventListener('click', () => {
                        alert('Producto añadido al carrito 🛒');
                    });
                });
            });

            
            // Add animation
            button.style.transform = 'scale(1.3)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 200);
        } else {
            button.textContent = '♡';
            button.style.color = '#ccc';
            button.style.background = 'rgba(255, 255, 255, 0.9)';
        }
    }

    // Smooth scroll animation for product cards
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

    // Initialize animation for product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Auto-complete search suggestions
    const searchSuggestions = [
        'lettuce', 'tomato', 'broccoli', 'parsley', 'cabbage',
        'onion', 'cucumber', 'carrot', 'garlic', 'local flavor',
        'market fresh', 'francisco\'s market', 'sofia market'
    ];

    searchInput.addEventListener('input', function() {
        const value = this.value.toLowerCase();
        if (value.length > 2) {
            const suggestions = searchSuggestions.filter(item => 
                item.includes(value)
            );
            // You could implement a dropdown here
            console.log('Suggestions:', suggestions);
        }
    });

    // Product card hover effects
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Loading animation
    function showLoading() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-overlay';
        loadingDiv.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Loading products...</p>
            </div>
        `;
        document.body.appendChild(loadingDiv);

        // Add loading styles
        const style = document.createElement('style');
        style.textContent = `
            .loading-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
            }
            .loading-spinner {
                text-align: center;
                color: white;
            }
            .spinner {
                width: 40px;
                height: 40px;
                border: 4px solid #4CAF50;
                border-top: 4px solid transparent;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        // Remove loading after 1.5 seconds
        setTimeout(() => {
            loadingDiv.remove();
            style.remove();
        }, 1500);
    }

    // Simulate loading on page load
    showLoading();

    // Filter by price range
    function filterByPrice(minPrice, maxPrice) {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const priceText = card.querySelector('.product-price').textContent;
            const price = parseFloat(priceText.replace('B/.', ''));
            
            if (price >= minPrice && price <= maxPrice) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Sort products
    function sortProducts(criteria) {
        const productCards = Array.from(document.querySelectorAll('.product-card'));
        const container = productsGrid;
        
        productCards.sort((a, b) => {
            switch(criteria) {
                case 'price-low':
                    const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('B/.', ''));
                    const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('B/.', ''));
                    return priceA - priceB;
                case 'price-high':
                    const priceA2 = parseFloat(a.querySelector('.product-price').textContent.replace('B/.', ''));
                    const priceB2 = parseFloat(b.querySelector('.product-price').textContent.replace('B/.', ''));
                    return priceB2 - priceA2;
                case 'name':
                    const nameA = a.querySelector('.product-name').textContent;
                    const nameB = b.querySelector('.product-name').textContent;
                    return nameA.localeCompare(nameB);
                default:
                    return 0;
            }
        });
        
        // Re-append sorted cards
        productCards.forEach(card => container.appendChild(card));
    }

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchInput.value = '';
            performSearch();
        }
        
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            searchInput.focus();
        }
    });

    console.log('FARMERS website loaded successfully!');
});