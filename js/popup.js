document.addEventListener('DOMContentLoaded', function () {
    const openPopupBtn = document.getElementById('open-mortgage-form');
    const popup = document.getElementById('mortgage-popup');
    const closePopupBtn = document.querySelector('.close-popup');

    // Mostrar el popup al hacer clic en el botón
    openPopupBtn.addEventListener('click', function (e) {
        e.preventDefault(); // Evitar que el enlace # recargue la página
        popup.style.display = 'flex';
    });

    // Cerrar el popup al hacer clic en la "X"
    closePopupBtn.addEventListener('click', function () {
        popup.style.display = 'none';
    });

    // Cerrar el popup al hacer clic fuera del contenido
    popup.addEventListener('click', function (e) {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
});