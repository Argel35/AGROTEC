const API_URL = 'http://localhost:5000/api';
let currentUserType = 'farmer';

function showLogin() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    clearMessages();
}

function showRegister() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
    clearMessages();
}

function setUserType(type) {
    currentUserType = type;
    document.getElementById('userType').value = type;

    const customerBtn = document.querySelector('.user-type-btn:first-child');
    const farmerBtn = document.querySelector('.user-type-btn:last-child');

    if (type === 'customer') {
        customerBtn.classList.add('active');
        farmerBtn.classList.remove('active');
        document.getElementById('customerFields').classList.remove('hidden');
        document.getElementById('farmerFields').classList.add('hidden');
        document.getElementById('registerBtn').textContent = 'Create a personal account';
        document.getElementById('email').placeholder = 'E-mail';
    } else {
        customerBtn.classList.remove('active');
        farmerBtn.classList.add('active');
        document.getElementById('customerFields').classList.add('hidden');
        document.getElementById('farmerFields').classList.remove('hidden');
        document.getElementById('registerBtn').textContent = 'Create a farmer account';
        document.getElementById('email').placeholder = 'Business E-mail';
    }
}

function clearMessages() {
    document.getElementById('loginMessage').innerHTML = '';
    document.getElementById('registerMessage').innerHTML = '';
}

function showMessage(elementId, message, isError = false) {
    document.getElementById(elementId).innerHTML =
        `<div class="message ${isError ? 'error' : 'success'}">${message}</div>`;
}

async function handleLogin(e) {
    e.preventDefault();
    clearMessages();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            showMessage('loginMessage', `Welcome ${data.user.name}!`);
            setTimeout(() => {
                alert(`Successful login as ${data.user.user_type}`);
            }, 1500);
        } else {
            showMessage('loginMessage', data.error, true);
        }
    } catch (error) {
        showMessage('loginMessage', 'Connection error', true);
    }
}

async function handleRegister(e) {
    e.preventDefault();
    clearMessages();

    const formData = {
        name: document.getElementById('name').value,
        last_name: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        user_type: currentUserType === 'farmer' ? 'seller' : 'customer'
    };

    if (currentUserType === 'customer') {
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (formData.password !== confirmPassword) {
            showMessage('registerMessage', 'Passwords do not match', true);
            return;
        }
        formData.phone = document.getElementById('phone').value;
    } else {
        formData.location = document.getElementById('location').value;
        formData.phone = document.getElementById('farmerPhone').value;
        formData.business_name = document.getElementById('businessName').value;
    }

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            showMessage('registerMessage', 'Account created successfully');
            setTimeout(() => {
                showLogin();
                document.getElementById('loginEmail').value = formData.email;
            }, 2000);
        } else {
            showMessage('registerMessage', data.error, true);
        }
    } catch (error) {
        showMessage('registerMessage', 'Connection error', true);
    }
}

// Inicializar eventos
document.getElementById('loginFormData').addEventListener('submit', handleLogin);
document.getElementById('registerFormData').addEventListener('submit', handleRegister);
setUserType('farmer');
