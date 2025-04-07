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

    // Función para calcular el max-height incluyendo el padding
    function calculateMaxHeight(content) {
        // Calcular el padding vertical (top + bottom)
        const style = window.getComputedStyle(content);
        const paddingTop = parseFloat(style.paddingTop) || 0;
        const paddingBottom = parseFloat(style.paddingBottom) || 0;
        const totalPadding = paddingTop + paddingBottom;

        // Devolver el scrollHeight + padding
        return content.scrollHeight + totalPadding;
    }

    // Función para abrir un acordeón y calcular su altura
    function openAccordion(header) {
        closeAllAccordions();
        header.classList.add('active');
        const content = header.nextElementSibling;
        content.classList.add('active');

        // Función para establecer el max-height con un bucle de verificación
        function setMaxHeightWithRetry(attempts = 5, interval = 100) {
            let lastHeight = 0;
            let currentAttempt = 0;

            const checkHeight = () => {
                const newHeight = calculateMaxHeight(content);
                content.style.maxHeight = newHeight + 'px';

                // Si el height no ha cambiado desde la última verificación, o hemos alcanzado el máximo de intentos, paramos
                if (newHeight === lastHeight || currentAttempt >= attempts) {
                    return;
                }

                lastHeight = newHeight;
                currentAttempt++;
                setTimeout(checkHeight, interval);
            };

            // Iniciar la verificación
            checkHeight();
        }

        // Iniciar el cálculo del max-height con reintentos
        setMaxHeightWithRetry();
    }

    // Manejar clics en los acordeones
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const isActive = header.classList.contains('active');
            if (!isActive) {
                openAccordion(header);
            } else {
                closeAllAccordions();
            }
        });
    });

    // Ajustar el max-height al redimensionar la ventana
    window.addEventListener('resize', function () {
        accordionHeaders.forEach(header => {
            if (header.classList.contains('active')) {
                const content = header.nextElementSibling;
                const newHeight = calculateMaxHeight(content);
                content.style.maxHeight = newHeight + 'px';
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
                // Retrasar la apertura para asegurar que el contenido esté renderizado
                setTimeout(() => {
                    openAccordion(header);
                    // Desplazar la página hasta el acordeón abierto
                    header.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 200); // Aumentamos el retraso a 200ms para dar más tiempo al renderizado
            }
        });
    }

    // Recalcular el max-height después de que todos los recursos estén cargados
    window.addEventListener('load', function () {
        accordionHeaders.forEach(header => {
            if (header.classList.contains('active')) {
                const content = header.nextElementSibling;
                const newHeight = calculateMaxHeight(content);
                content.style.maxHeight = newHeight + 'px';
            }
        });
    });
});