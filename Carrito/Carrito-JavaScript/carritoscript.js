let cartItems = [
    { id: 1, name: "Onion- 1 Und(2.5 - 3 Lbs Aprox)", price: 1.00, quantity: 3 },
    { id: 2, name: "Broccoli - 1 Lb (1 Ramo Grande)", price: 1.98, quantity: 1 },
    { id: 3, name: "Carrot 1 Und (0.48-0.50)", price: 0.45, quantity: 2 },
    { id: 4, name: "Tomato 1 Und (0.50)", price: 0.50, quantity: 3 }
];

const taxRate = 0.30;
const discount = 0.00;

function updateQuantity(itemId, change) {
    const item = cartItems.find(item => item.id === itemId);
    if (!item) return;

    item.quantity += change;

    // Si la cantidad es 0 o menor, eliminar el item
    if (item.quantity <= 0) {
        removeItem(itemId);
        return;
    }

    // Solo actualizamos los elementos visibles (no recreamos todo el HTML)
    const cartItemElem = document.querySelector(`.cart-item[data-id="${itemId}"]`);
    cartItemElem.querySelector('.quantity').textContent = item.quantity;
    cartItemElem.querySelector('.unit-price').textContent = `${item.quantity} x $${item.price.toFixed(2)}`;
    cartItemElem.querySelector('.total-price').textContent = `$${(item.price * item.quantity).toFixed(2)}`;

    updateSummary();
}

function removeItem(itemId) {
    // Eliminar del array
    cartItems = cartItems.filter(item => item.id !== itemId);

    // Eliminar del DOM
    const cartItemElem = document.querySelector(`.cart-item[data-id="${itemId}"]`);
    if (cartItemElem) {
        cartItemElem.remove();
    }

    // Si después de eliminar no queda nada, mostramos el mensaje de carrito vacío
    if (cartItems.length === 0) {
        updateCartItems();
    }

    updateSummary();
}

function emptyCart() {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        cartItems = [];
        updateCartItems();
        updateSummary();
    }
}

function createList() {
    if (cartItems.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    let listText = 'Lista de compras:\n\n';
    cartItems.forEach(item => {
        listText += `• ${item.name} - Cantidad: ${item.quantity}\n`;
    });

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(listText).then(() => {
            alert('Lista copiada al portapapeles');
        }).catch(() => {
            alert('Lista creada:\n\n' + listText);
        });
    } else {
        alert('Lista creada:\n\n' + listText);
    }
}

function processOrder() {
    if (cartItems.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    const total = calculateTotal();
    alert(`Orden procesada exitosamente!\nTotal: $${total.toFixed(2)}`);
}

function calculateSubtotal() {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function calculateTax() {
    return calculateSubtotal() * taxRate;
}

function calculateTotal() {
    return calculateSubtotal() - discount + calculateTax();
}

function getItemImage(itemId) {
    const images = {
        1: '../CarritoImagenes/Cebolla.png',
        2: '../CarritoImagenes/Brocoli.png',
        3: '../CarritoImagenes/Zanahoria.png',
        4: '../CarritoImagenes/Tomate.png'
    };
    return images[itemId] || 'https://via.placeholder.com/50x50/ccc/666?text=IMG';
}

function updateCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');

if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = `
        <div class="empty-cart">
            <div class="empty-cart-icon">
                <img src="../CarritoImagenes/carro-vacio.png" alt="Carrito vacío" width="80" height="80">
            </div>
            <p>Tu carrito está vacío</p>
        </div>
    `;
    return;
}


    // Dibujar el carrito completo (esto solo se ejecuta al entrar o cuando queda vacío y vuelve a agregarse algo)
    cartItemsContainer.innerHTML = cartItems.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="item-image">
                <img src="${getItemImage(item.id)}" alt="${item.name}">
            </div>
            <div class="item-details">
                <h3>${item.name}</h3>
                <div class="item-controls">
                    <button class="remove-item" onclick="removeItem(${item.id})">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3,6 5,6 21,6"/>
                            <path d="m5,6 1,14a2,2 0 0,0 2,2h8a2,2 0 0,0 2,-2l1,-14"/>
                        </svg>
                    </button>
                    <div class="quantity-control">
                        <button class="quantity-btn minus" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
            </div>
            <div class="item-price">
                <div class="unit-price">${item.quantity} x $${item.price.toFixed(2)}</div>
                <div class="total-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        </div>
    `).join('');
}

function updateSummary() {
    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    const total = calculateTotal();

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('discount').textContent = `-$${discount.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartItems();
    updateSummary();

    document.querySelector('.empty-cart-btn').addEventListener('click', emptyCart);
    document.querySelector('.create-list-btn').addEventListener('click', createList);
    document.querySelector('.process-order-btn').addEventListener('click', processOrder);
});
