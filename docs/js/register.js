// =================== CONFIGURACIÓN ===================
let currentUserType = 'farmer';

// =================== FUNCIONES DE INTERFAZ ===================
function setUserType(type) {
    console.log(`Cambiando tipo de usuario a: ${type}`);
    currentUserType = type;
    
    const userTypeInput = document.getElementById('userType');
    if (userTypeInput) {
        userTypeInput.value = type;
    }

    const customerBtn = document.querySelector('.user-type-btn:first-child');
    const farmerBtn = document.querySelector('.user-type-btn:last-child');
    const imageSection = document.getElementById('imageSection');
    const farmerBg = document.getElementById('farmerBg');
    const customerBg = document.getElementById('customerBg');

    if (type === 'customer') {
        if (customerBtn) customerBtn.classList.add('active');
        if (farmerBtn) farmerBtn.classList.remove('active');
        
        const customerFields = document.getElementById('customerFields');
        const farmerFields = document.getElementById('farmerFields');
        const registerBtn = document.getElementById('registerBtn');
        const emailInput = document.getElementById('email');
        
        if (customerFields) customerFields.classList.remove('hidden');
        if (farmerFields) farmerFields.classList.add('hidden');
        if (registerBtn) registerBtn.textContent = 'Crear cuenta personal';
        if (emailInput) emailInput.placeholder = 'E-mail personal';
        
        // Cambiar imágenes
        if (imageSection) {
            imageSection.classList.add('transitioning');
            imageSection.classList.add('customer-mode');
            
            // Cambiar visibilidad de imágenes
            if (farmerBg) farmerBg.classList.add('hidden');
            if (customerBg) customerBg.classList.remove('hidden');
            
            // Remover la clase de transición después de la animación
            setTimeout(() => {
                imageSection.classList.remove('transitioning');
            }, 800);
        }
        
    } else if (type === 'farmer') {
        if (customerBtn) customerBtn.classList.remove('active');
        if (farmerBtn) farmerBtn.classList.add('active');
        
        const customerFields = document.getElementById('customerFields');
        const farmerFields = document.getElementById('farmerFields');
        const registerBtn = document.getElementById('registerBtn');
        const emailInput = document.getElementById('email');
        
        if (customerFields) customerFields.classList.add('hidden');
        if (farmerFields) farmerFields.classList.remove('hidden');
        if (registerBtn) registerBtn.textContent = 'Crear cuenta de farmer';
        if (emailInput) emailInput.placeholder = 'E-mail del negocio';
        
        // Cambiar imágenes
        if (imageSection) {
            imageSection.classList.add('transitioning');
            imageSection.classList.remove('customer-mode');
            
            // Cambiar visibilidad de imágenes
            if (customerBg) customerBg.classList.add('hidden');
            if (farmerBg) farmerBg.classList.remove('hidden');
            
            // Remover la clase de transición después de la animación
            setTimeout(() => {
                imageSection.classList.remove('transitioning');
            }, 800);
        }
    }
    
    console.log(`Interfaz actualizada para tipo: ${type}`);
}

// =================== CONFIGURAR EVENT LISTENERS PARA BOTONES ===================
function setupUserTypeButtons() {
    const customerBtn = document.querySelector('.user-type-btn:first-child');
    const farmerBtn = document.querySelector('.user-type-btn:last-child');
    
    if (customerBtn) {
        customerBtn.addEventListener('click', () => setUserType('customer'));
    }
    
    if (farmerBtn) {
        farmerBtn.addEventListener('click', () => setUserType('farmer'));
    }
    
    console.log('✅ Event listeners para botones de tipo de usuario configurados');
}

// =================== FUNCIÓN PARA MOSTRAR/OCULTAR CONTRASEÑA ===================
function setupPasswordToggle() {
    // Buscar todos los campos de contraseña
    const passwordFields = document.querySelectorAll('input[type="password"]');
    
    // IDs de campos que NO quieres que tengan el ícono del ojo
    const excludedFields = ['password', 'confirmPassword']; // Agrega o quita IDs según necesites
    
    passwordFields.forEach(passwordField => {
        // Saltar si el campo está en la lista de excluidos
        if (excludedFields.includes(passwordField.id)) {
            console.log(`Saltando ícono para campo: ${passwordField.id}`);
            return;
        }
        
        // Crear el contenedor para el icono
        const fieldContainer = passwordField.parentElement;
        fieldContainer.style.position = 'relative';
        
        // Crear el icono de mostrar/ocultar
        const toggleIcon = document.createElement('span');
        toggleIcon.innerHTML = '<i class="fas fa-eye"></i>';
        toggleIcon.className = 'password-toggle-icon';
        toggleIcon.style.cssText = `
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            color: #a0aec0;
            font-size: 18px;
            z-index: 10;
            user-select: none;
            transition: color 0.3s ease;
        `;
        
        // Agregar hover effect
        toggleIcon.addEventListener('mouseenter', () => {
            toggleIcon.style.color = '#4CAF50';
        });
        
        toggleIcon.addEventListener('mouseleave', () => {
            toggleIcon.style.color = '#a0aec0';
        });
        
        // Función para alternar visibilidad
        toggleIcon.addEventListener('click', () => {
            const isPassword = passwordField.type === 'password';
            
            if (isPassword) {
                passwordField.type = 'text';
                toggleIcon.innerHTML = '<i class="fas fa-eye-slash"></i>';
                toggleIcon.title = 'Ocultar contraseña';
            } else {
                passwordField.type = 'password';
                toggleIcon.innerHTML = '<i class="fas fa-eye"></i>';
                toggleIcon.title = 'Mostrar contraseña';
            }
        });
        
        // Agregar el icono al contenedor
        fieldContainer.appendChild(toggleIcon);
        
        // Ajustar padding del input para que no se superponga con el icono
        passwordField.style.paddingRight = '60px';
    });
    
    console.log('✅ Iconos de mostrar/ocultar contraseña configurados');
}

// =================== PRECARGAR Y CONFIGURAR IMÁGENES ===================
function setupImagePreloading() {
    const farmerBg = document.getElementById('farmerBg');
    const customerBg = document.getElementById('customerBg');
    
    if (farmerBg && customerBg) {
        // Precargar ambas imágenes para transiciones suaves
        const farmerImg = new Image();
        const customerImg = new Image();
        
        farmerImg.onload = () => console.log('✅ Imagen farmer precargada');
        customerImg.onload = () => console.log('✅ Imagen customer precargada');
        
        farmerImg.onerror = () => console.error('❌ Error cargando imagen farmer');
        customerImg.onerror = () => console.error('❌ Error cargando imagen customer');
        
        farmerImg.src = farmerBg.src;
        customerImg.src = customerBg.src;
        
        // Configurar estado inicial
        farmerBg.classList.remove('hidden');
        customerBg.classList.add('hidden');
        
        console.log('✅ Sistema de imágenes configurado');
    } else {
        console.warn('⚠️ No se encontraron las imágenes de fondo');
    }
}

function clearMessages() {
    const registerMessage = document.getElementById('registerMessage');
    const successMessage = document.getElementById('successMessage');
    
    if (registerMessage) registerMessage.innerHTML = '';
    if (successMessage) {
        successMessage.innerHTML = '';
        successMessage.style.display = 'none';
    }
}

function showMessage(message, isError = false) {
    const registerMessage = document.getElementById('registerMessage');
    if (registerMessage) {
        const messageClass = isError ? 'error' : (message.includes('...') ? 'loading' : 'success');
        registerMessage.innerHTML = `<div class="message ${messageClass}">${message}</div>`;
    }
}

function showSuccessRedirect(message, email) {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.innerHTML = `
            <div class="success-redirect">
                <i class="fas fa-check-circle" style="font-size: 48px; margin-bottom: 15px;"></i>
                <h3>${message}</h3>
                <p>Te redirigiremos al login en <span id="countdown">5</span> segundos...</p>
                <p>O puedes <a href="login.html" style="color: #fff; text-decoration: underline;">hacer clic aquí</a> para ir ahora</p>
            </div>
        `;
        successMessage.style.display = 'block';
        
        // Countdown y redirección automática
        let countdown = 5;
        const countdownElement = document.getElementById('countdown');
        
        const interval = setInterval(() => {
            countdown--;
            if (countdownElement) countdownElement.textContent = countdown;
            
            if (countdown <= 0) {
                clearInterval(interval);
                window.location.href = `login.html?email=${encodeURIComponent(email)}&message=registered`;
            }
        }, 1000);
    }
}

// =================== MANEJO DEL FORMULARIO ===================
async function handleRegistration(event) {
    event.preventDefault();
    clearMessages();
    
    console.log('Iniciando proceso de registro...');
    
    // Obtener valores del formulario
    const userType = document.getElementById('userType').value;
    const name = document.getElementById('name').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    console.log(`Registrando ${userType}:`, { name, lastName, email });

    // Validaciones básicas
    if (!name || !lastName || !email || !password) {
        showMessage('Por favor completa todos los campos obligatorios', true);
        return;
    }

    if (!validateEmail(email)) {
        showMessage('Por favor ingresa un email válido', true);
        return;
    }

    if (password.length < 6) {
        showMessage('La contraseña debe tener al menos 6 caracteres', true);
        return;
    }

    // Preparar datos del usuario
    const userData = {
        name: name,
        lastName: lastName,
        email: email,
        password: password,
        userType: userType
    };

    // Agregar campos específicos según el tipo de usuario
    if (userType === 'customer') {
        const confirmPassword = document.getElementById('confirmPassword').value;
        const phone = document.getElementById('phone').value.trim();

        if (password !== confirmPassword) {
            showMessage('Las contraseñas no coinciden', true);
            return;
        }

        if (!phone) {
            showMessage('El teléfono es obligatorio para customers', true);
            return;
        }

        if (!validatePhone(phone)) {
            showMessage('El formato del teléfono debe ser 0000-0000', true);
            return;
        }

        userData.phone = phone;

    } else if (userType === 'farmer') {
        const location = document.getElementById('location').value.trim();
        const farmerPhone = document.getElementById('farmerPhone').value.trim();
        const businessName = document.getElementById('businessName').value.trim();

        userData.location = location;
        userData.phone = farmerPhone;
        userData.businessName = businessName;
        
        console.log('Datos farmer específicos:', {
            location: location,
            phone: farmerPhone,
            businessName: businessName
        });
    }

    console.log('Datos finales a registrar:', userData);
    showMessage('Creando cuenta...');

    try {
        // Aquí puedes agregar tu lógica de registro
        // Por ejemplo, llamada a tu API o servicio de registro
        
        // Simulación de proceso de registro (eliminar en producción)
        setTimeout(() => {
            console.log('¡Registro exitoso!');
            
            // Ocultar SOLO el formulario y mostrar éxito
            const registerForm = document.getElementById('registerFormData');
            if (registerForm) registerForm.style.display = 'none';
            
            showSuccessRedirect(
                `¡Cuenta de ${userType} creada exitosamente!`,
                email
            );
        }, 1500);
        
    } catch (error) {
        console.error('Error en registro:', error);
        showMessage('Error interno. Inténtalo de nuevo.', true);
    }
}

// =================== VALIDACIONES ===================
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^\d{4}-\d{4}$/;
    return phoneRegex.test(phone);
}

// =================== INICIALIZACIÓN ===================
function initializeRegistration() {
    console.log('Inicializando página de registro...');
    
    // Configurar formulario
    const registerForm = document.getElementById('registerFormData');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegistration);
        console.log('✅ Formulario de registro configurado');
    } else {
        console.error('❌ Formulario de registro no encontrado');
    }
    
    // Configurar sistema de imágenes
    setupImagePreloading();
    
    // Configurar botones de tipo de usuario
    setupUserTypeButtons();
    
    // Configurar iconos de mostrar/ocultar contraseña
    setTimeout(() => {
        setupPasswordToggle();
    }, 100); // Pequeño delay para asegurar que el DOM esté listo
    
    // Establecer tipo de usuario por defecto
    setUserType('farmer');
    
    console.log('✅ Página de registro inicializada');
}

// =================== INICIALIZACIÓN AL CARGAR ===================
document.addEventListener('DOMContentLoaded', initializeRegistration);

if (document.readyState === 'loading') {
    console.log('Esperando carga del DOM...');
} else {
    console.log('DOM ya cargado, inicializando...');
    initializeRegistration();
}// Image switching functionality for register form
function setUserType(type) {
    const userTypeInput = document.getElementById('userType');
    const customerFields = document.getElementById('customerFields');
    const farmerFields = document.getElementById('farmerFields');
    const registerBtn = document.getElementById('registerBtn');
    const imageSection = document.getElementById('imageSection');
    const farmerBg = document.getElementById('farmerBg');
    const customerBg = document.getElementById('customerBg');
    
    // Remove active class from all buttons
    document.querySelectorAll('.user-type-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Update hidden input
    userTypeInput.value = type;
    
    // Add transition class
    imageSection.classList.add('transitioning');
    
    if (type === 'customer') {
        // Show customer fields, hide farmer fields
        customerFields.classList.remove('hidden');
        farmerFields.classList.add('hidden');
        
        // Update button text
        registerBtn.textContent = 'Crear cuenta de customer';
        
        // Switch to customer mode
        imageSection.classList.add('customer-mode');
        
        // Switch images
        farmerBg.classList.add('hidden');
        customerBg.classList.remove('hidden');
        
    } else {
        // Show farmer fields, hide customer fields
        farmerFields.classList.remove('hidden');
        customerFields.classList.add('hidden');
        
        // Update button text
        registerBtn.textContent = 'Crear cuenta de farmer';
        
        // Remove customer mode
        imageSection.classList.remove('customer-mode');
        
        // Switch images
        customerBg.classList.add('hidden');
        farmerBg.classList.remove('hidden');
    }
    
    // Remove transition class after animation completes
    setTimeout(() => {
        imageSection.classList.remove('transitioning');
    }, 800);
}

// Ensure images are loaded properly on page load
document.addEventListener('DOMContentLoaded', function() {
    const farmerBg = document.getElementById('farmerBg');
    const customerBg = document.getElementById('customerBg');
    
    // Preload both images
    if (farmerBg && customerBg) {
        const farmerImg = new Image();
        const customerImg = new Image();
        
        farmerImg.src = farmerBg.src;
        customerImg.src = customerBg.src;
        
        // Set initial state
        farmerBg.classList.remove('hidden');
        customerBg.classList.add('hidden');
    }
});

// Optional: Add smooth transitions for better UX
function addImageTransitionListeners() {
    const backgroundImages = document.querySelectorAll('.background-image');
    
    backgroundImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            console.warn('Failed to load image:', this.src);
            // You could add a fallback image here
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', addImageTransitionListeners);
