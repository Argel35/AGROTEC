// Variables globales
let currentImageTarget = null;
let isListView = false;

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    updateViewToggle();
});

// Configurar event listeners
function initializeEventListeners() {
    // Búsqueda
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Toggle de vista
    const gridViewBtn = document.getElementById('gridView');
    const listViewBtn = document.getElementById('listView');
    
    gridViewBtn.addEventListener('click', () => switchView('grid'));
    listViewBtn.addEventListener('click', () => switchView('list'));

    // Input de archivo para imágenes
    const imageInput = document.getElementById('imageInput');
    imageInput.addEventListener('change', handleImageUpload);
}

// Función de búsqueda
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const farmerCards = document.querySelectorAll('.farmer-card');
    
    if (searchTerm === '') {
        // Mostrar todas las cartas si no hay término de búsqueda
        farmerCards.forEach(card => {
            card.style.display = '';
        });
        return;
    }
    
    farmerCards.forEach(card => {
        const farmerName = card.querySelector('.farmer-name').value.toLowerCase();
        if (farmerName.includes(searchTerm)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// Cambiar entre vista de grilla y lista
function switchView(viewType) {
    const farmersGrid = document.getElementById('farmersGrid');
    const gridViewBtn = document.getElementById('gridView');
    const listViewBtn = document.getElementById('listView');
    
    if (viewType === 'list') {
        farmersGrid.classList.remove('farmers-grid');
        farmersGrid.classList.add('farmers-list');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        isListView = true;
    } else {
        farmersGrid.classList.remove('farmers-list');
        farmersGrid.classList.add('farmers-grid');
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        isListView = false;
    }
}

// Actualizar el estado del toggle de vista
function updateViewToggle() {
    const gridViewBtn = document.getElementById('gridView');
    const listViewBtn = document.getElementById('listView');
    
    if (isListView) {
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    } else {
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    }
}

// Abrir perfil
function openProfile(farmerName, farmerId) { /* ... */ }

// Agregar nuevo agricultor
function addNewFarmer() {
    const farmersGrid = document.getElementById('farmersGrid');
    const farmerCount = farmersGrid.children.length + 1;
    
    const newFarmerCard = document.createElement('div');
    newFarmerCard.className = 'farmer-card';
    newFarmerCard.innerHTML = `
        <div class="farmer-image">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect fill='%23e9ecef' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='0.3em' fill='%23666' font-size='18'%3EClick para cambiar%3C/text%3E%3C/svg%3E" alt="Agricultor ${farmerCount}">
            
        </div>
        <div class="farmer-info">
        <span class="farmer-name">Nuevo Agricultor ${farmerCount}</span>
    </div>
    `;
    
    farmersGrid.appendChild(newFarmerCard);
    
    // Scroll hacia la nueva carta
    newFarmerCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Resaltar la nueva carta brevemente
    newFarmerCard.style.transform = 'scale(1.05)';
    newFarmerCard.style.boxShadow = '0 20px 40px rgba(65, 168, 95, 0.3)';
    
    setTimeout(() => {
        newFarmerCard.style.transform = '';
        newFarmerCard.style.boxShadow = '';
    }, 1000);
}

// Eliminar agricultor (función adicional)
function deleteFarmer(button) {
    if (confirm('¿Estás seguro de que quieres eliminar este agricultor?')) {
        const farmerCard = button.closest('.farmer-card');
        farmerCard.style.transition = 'all 0.3s ease';
        farmerCard.style.transform = 'scale(0)';
        farmerCard.style.opacity = '0';
        
        setTimeout(() => {
            farmerCard.remove();
        }, 300);
    }
}

// Función para exportar datos (funcionalidad adicional)
function exportFarmersData() {
    const farmers = [];
    const farmerCards = document.querySelectorAll('.farmer-card');
    
    farmerCards.forEach((card, index) => {
        const name = card.querySelector('.farmer-name').value;
        const imgSrc = card.querySelector('img').src;
        
        farmers.push({
            id: index + 1,
            name: name,
            image: imgSrc.startsWith('data:') ? 'custom_image' : imgSrc
        });
    });
    
    const dataStr = JSON.stringify(farmers, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'farmers_data.json';
    link.click();
    
    URL.revokeObjectURL(url);
}

// Smooth scroll para búsquedas
function smoothScrollToResults() {
    const farmersSection = document.querySelector('.farmers-section');
    farmersSection.scrollIntoView({ behavior: 'smooth' });
}

// Animación de entrada para nuevas cartas
function animateCardEntrance(card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
}

// Validación de archivos de imagen
function validateImageFile(file) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!validTypes.includes(file.type)) {
        alert('Por favor selecciona un archivo de imagen válido (JPEG, PNG, GIF, WebP)');
        return false;
    }
    
    if (file.size > maxSize) {
        alert('El archivo es demasiado grande. Por favor selecciona una imagen menor a 5MB');
        return false;
    }
    
    return true;
}