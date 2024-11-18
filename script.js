/**
 * Objeto que mantiene el estado de la aplicación
 * @type {Object}
 */
const appState = {
    currentSection: 'inicio',
    user: null,
    users: [] // Simula una base de datos de usuarios
};

/**
 * Muestra una sección específica y oculta las demás
 * @param {string} sectionId - El ID de la sección a mostrar
 */
function showSection(sectionId) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.classList.add('hidden'));

    // Mostrar la sección seleccionada
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.remove('hidden');
    }

    // Actualizar estado
    appState.currentSection = sectionId;

    // Actualizar botones de navegación
    updateNavigationButtons(sectionId);
}

/**
 * Actualiza los estados activos de los botones de navegación
 * @param {string} activeSection - El ID de la sección activa
 */
function updateNavigationButtons(activeSection) {
    const buttons = document.querySelectorAll('.nav-links button');
    buttons.forEach(button => {
        button.classList.remove('active');
        if (button.textContent.toLowerCase().includes(activeSection.toLowerCase())) {
            button.classList.add('active');
        }
    });
}

/**
 * Maneja el registro de nuevos usuarios
 * @param {Event} event - El evento del formulario
 */
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validaciones
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    if (!validateEmail(email)) {
        alert('Por favor, ingresa un correo electrónico válido');
        return;
    }

    // Verificar si el usuario ya existe
    if (appState.users.some(user => user.email === email)) {
        alert('Este correo electrónico ya está registrado');
        return;
    }

    // Registrar nuevo usuario
    const newUser = { name, email, password };
    appState.users.push(newUser);
    
    // Limpiar formulario
    document.getElementById('registerForm').reset();
    
    // Mostrar mensaje de éxito y redirigir al login
    alert('Registro exitoso. Por favor, inicia sesión.');
    showSection('iniciarSesion');
}

/**
 * Maneja el inicio de sesión
 * @param {Event} event - El evento del formulario
 */
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Buscar usuario
    const user = appState.users.find(u => u.email === email && u.password === password);

    if (user) {
        // Actualizar estado y UI
        appState.user = user;
        updateUIForLoggedInUser(user);
        showSection('inicio');
        document.getElementById('loginForm').reset();
    } else {
        alert('Credenciales incorrectas');
    }
}

/**
 * Actualiza la UI cuando un usuario inicia sesión
 * @param {Object} user - El usuario que inició sesión
 */
function updateUIForLoggedInUser(user) {
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userDisplay').classList.remove('hidden');
    document.getElementById('authButtons').classList.add('hidden');
}

/**
 * Maneja el cierre de sesión
 */
function logout() {
    appState.user = null;
    document.getElementById('userDisplay').classList.add('hidden');
    document.getElementById('authButtons').classList.remove('hidden');
    showSection('inicio');
}

/**
 * Valida el formato de un correo electrónico
 * @param {string} email - El correo electrónico a validar
 * @returns {boolean} - True si el formato es válido
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Maneja la búsqueda de restaurantes
 */
function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    
    if (searchTerm === '') {
        alert('Por favor, ingresa un término de búsqueda');
        return;
    }
    
    // Aquí iría la lógica de búsqueda real
    alert(`Buscando restaurantes con: ${searchTerm}`);
}

/**
 * Maneja los errores de la aplicación
 * @param {Error} error - El error a manejar
 */
function handleError(error) {
    console.error('Error en la aplicación:', error);
    alert('Ha ocurrido un error. Por favor, intenta nuevamente.');
}

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', () => {
    try {
        showSection('inicio');
        
        // Añadir evento al botón de búsqueda
        const searchButton = document.getElementById('searchButton');
        if (searchButton) {
            searchButton.addEventListener('click', handleSearch);
        }
        
        // Añadir evento para buscar al presionar Enter
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    handleSearch();
                }
            });
        }
    } catch (error) {
        handleError(error);
    }
});