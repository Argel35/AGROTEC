// =================== MANEJO DEL LOGIN ===================

function showMessage(message, isError = false) {
    const loginMessage = document.getElementById('loginMessage');
    if (loginMessage) {
        const messageClass = isError ? 'error' : (message.includes('...') ? 'loading' : 'success');
        loginMessage.innerHTML = `<div class="message ${messageClass}">${message}</div>`;
    }
}

function clearMessages() {
    const loginMessage = document.getElementById('loginMessage');
    if (loginMessage) loginMessage.innerHTML = '';
}

async function handleLogin(event) {
    event.preventDefault();
    clearMessages();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        showMessage('Por favor completa todos los campos', true);
        return;
    }

    showMessage('Verificando credenciales...');

    try {
        // Aquí puedes agregar tu lógica de autenticación
        // Por ejemplo, llamada a tu API o servicio de autenticación
        
        // Simulación de proceso de login (eliminar en producción)
        setTimeout(() => {
            // Ejemplo de validación básica (reemplazar con tu lógica real)
            if (email && password.length >= 6) {
                showMessage(`¡Bienvenido!`);
                
                // Aquí puedes manejar el éxito del login
                // Por ejemplo: guardar token, redirigir, etc.
                
                setTimeout(() => {
                    // Redireccionar después del login exitoso
                    // window.location.href = 'dashboard.html';
                    console.log('Login exitoso - redirección pendiente');
                }, 1500);
                
            } else {
                showMessage('Credenciales incorrectas', true);
            }
        }, 1000);
        
    } catch (error) {
        console.error('Error en login:', error);
        showMessage('Error de conexión. Inténtalo de nuevo.', true);
    }
}

// =================== INICIALIZACIÓN ===================
function initializeLogin() {
    console.log('Inicializando página de login...');
    
    // Configurar formulario
    const loginForm = document.getElementById('loginFormData');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        console.log('✅ Formulario de login configurado');
    } else {
        console.error('❌ Formulario de login no encontrado');
    }
    
    // Verificar si vienen parámetros de URL (desde registro exitoso)
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const message = urlParams.get('message');
    
    if (email) {
        const emailInput = document.getElementById('loginEmail');
        if (emailInput) emailInput.value = email;
    }
    
    if (message === 'registered') {
        showMessage('Cuenta creada exitosamente. Ya puedes iniciar sesión.');
    }
    
    console.log('✅ Página de login inicializada');
}

// =================== INICIALIZACIÓN AL CARGAR ===================
document.addEventListener('DOMContentLoaded', initializeLogin);

if (document.readyState === 'loading') {
    console.log('Esperando carga del DOM...');
} else {
    console.log('DOM ya cargado, inicializando...');
    initializeLogin();
}
