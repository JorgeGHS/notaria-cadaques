document.addEventListener('DOMContentLoaded', function () {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    const accordionItems = document.querySelectorAll('.accordion-item');

    // Función para cerrar todos los acordeones
    function closeAllAccordions() {
        accordionHeaders.forEach(header => {
            header.classList.remove('active');
            const content = header.nextElementSibling;
            content.classList.remove('active');
            content.style.maxHeight = null;
        });
    }

    // Manejar clics en los acordeones
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const isActive = header.classList.contains('active');
            closeAllAccordions();

            if (!isActive) {
                header.classList.add('active');
                const content = header.nextElementSibling;
                content.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // Leer el parámetro 'service' de la URL y abrir el acordeón correspondiente
    const urlParams = new URLSearchParams(window.location.search);
    const serviceToOpen = urlParams.get('service');

    if (serviceToOpen) {
        accordionItems.forEach(item => {
            if (item.getAttribute('data-service') === serviceToOpen) {
                const header = item.querySelector('.accordion-header');
                const content = header.nextElementSibling;
                closeAllAccordions();
                header.classList.add('active');
                content.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';

                // Desplazar la página hasta el acordeón abierto
                setTimeout(() => {
                    header.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        });
    }
});