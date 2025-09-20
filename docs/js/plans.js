document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const cards = document.querySelectorAll('.card');
    const buttons = document.querySelectorAll('.cta-button');
    const footerLinks = document.querySelectorAll('.footer-link');

    // Animación de entrada para las tarjetas
    function animateCardsOnLoad() {
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Efectos hover mejorados para las tarjetas
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Reducir ligeramente la opacidad de las otras tarjetas
            cards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.style.opacity = '0.7';
                }
            });
        });

        card.addEventListener('mouseleave', function() {
            // Restaurar opacidad de todas las tarjetas
            cards.forEach(otherCard => {
                otherCard.style.opacity = '1';
            });
        });
    });

    // Funcionalidad de los botones
    buttons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Efecto de click
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);

            // Obtener el nombre del plan
            const card = button.closest('.card');
            const planName = card.querySelector('h2').textContent;
            const planPrice = card.querySelector('.amount').textContent;
            
            // Simular selección del plan
            showPlanSelection(planName, planPrice);
        });
    });

    // Función para mostrar selección del plan
    function showPlanSelection(planName, planPrice) {
        // Crear modal de confirmación
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            max-width: 400px;
            margin: 20px;
            transform: translateY(50px);
            transition: transform 0.3s ease;
        `;

        modalContent.innerHTML = `
            <h3 style="color: #4a7c4e; margin-bottom: 15px; font-size: 1.5rem;">¡Excelente elección!</h3>
            <p style="color: #666; margin-bottom: 10px;">Has seleccionado el plan:</p>
            <h4 style="color: #333; margin-bottom: 5px; font-size: 1.3rem;">${planName}</h4>
            <p style="color: #4a7c4e; font-weight: bold; font-size: 1.2rem; margin-bottom: 20px;">${planPrice}/MONTH</p>
            <button id="confirmBtn" style="
                background: #4a7c4e;
                color: white;
                border: none;
                padding: 12px 25px;
                border-radius: 25px;
                margin-right: 10px;
                cursor: pointer;
                font-weight: 600;
            ">Continuar</button>
            <button id="cancelBtn" style="
                background: #ccc;
                color: #666;
                border: none;
                padding: 12px 25px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
            ">Cancelar</button>
        `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Animar entrada del modal
        setTimeout(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'translateY(0)';
        }, 10);

        // Funcionalidad de los botones del modal
        document.getElementById('confirmBtn').addEventListener('click', function() {
            alert(`¡Perfecto! Serás redirigido para completar la suscripción al plan ${planName}.`);
            closeModal();
        });

        document.getElementById('cancelBtn').addEventListener('click', closeModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeModal();
        });

        function closeModal() {
            modal.style.opacity = '0';
            modalContent.style.transform = 'translateY(50px)';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
    }

    // Funcionalidad de los enlaces del footer
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (link.textContent.includes('View plan information')) {
                showPlanInfo();
            } else if (link.textContent.includes('Skip')) {
                showSkipConfirmation();
            }
        });
    });

    // Mostrar información de planes
    function showPlanInfo() {
        alert('Aquí se mostraría información detallada de todos los planes disponibles.');
    }

    // Mostrar confirmación de saltar
    function showSkipConfirmation() {
        const skip = confirm('¿Estás seguro de que quieres decidir más tarde? Puedes volver en cualquier momento.');
        if (skip) {
            alert('¡Entendido! Te recordaremos más adelante para elegir tu plan.');
        }
    }

    // Funcionalidad de scroll suave
    function smoothScroll() {
        const cards = document.querySelector('.pricing-cards');
        if (cards) {
            cards.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        }
    }

    // Efecto parallax sutil en el fondo
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.card');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Inicializar animaciones
    animateCardsOnLoad();

    // Efecto de escritura en el título
    const title = document.querySelector('.header h1');
    const originalText = title.textContent;
    title.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    setTimeout(typeWriter, 500);

    // Agregar efectos de partículas sutiles (opcional)
    function createFloatingParticles() {
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                pointer-events: none;
                animation: float ${5 + Math.random() * 5}s infinite linear;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            document.body.appendChild(particle);
        }
    }

    // Agregar animación CSS para las partículas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Crear partículas flotantes
    createFloatingParticles();
    
    // Recrear partículas cada 10 segundos
    setInterval(createFloatingParticles, 10000);
});