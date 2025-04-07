document.addEventListener('DOMContentLoaded', function () {
    // Seleccionar los elementos
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav');

    // Depuración: Verificar si los elementos existen
    if (!menuToggle) {
        console.error('Error: No se encontró el elemento con clase .menu-toggle');
        return;
    }

    if (!navMenu) {
        console.error('Error: No se encontró el elemento nav');
        return;
    }

    // Añadir el evento de clic al botón hamburguesa
    menuToggle.addEventListener('click', function () {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar el menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('nav a');
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    } else {
        console.warn('No se encontraron enlaces en el menú de navegación');
    }
});