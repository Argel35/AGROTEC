document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.querySelector('.search-input');
  const searchBtn = document.querySelector('.search-btn');
  const gridBtn = document.querySelector('.grid-btn');
  const listBtn = document.querySelector('.list-btn');
  const savingsGrid = document.getElementById('savingsGrid');
  const favoriteButtons = document.querySelectorAll('.favorite-btn');
  const addButtons = document.querySelectorAll('.add-btn');

  // Buscar
  function performSearch() {
    const term = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
      const name = card.querySelector('.product-name').textContent.toLowerCase();
      if (name.includes(term)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', e => { if (e.key === 'Enter') performSearch(); });

  // Cambiar vista
  gridBtn.addEventListener('click', () => {
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
    savingsGrid.classList.remove('list-view');
  });

  listBtn.addEventListener('click', () => {
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
    savingsGrid.classList.add('list-view');
  });

  // Favoritos
  favoriteButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.textContent = btn.textContent === '♡' ? '♥' : '♡';
    });
  });

  // Añadir al carrito
  addButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Producto añadido al carrito 🛒');
    });
  });
});
