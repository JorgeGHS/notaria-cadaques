document.addEventListener('DOMContentLoaded', function () {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const content = this.nextElementSibling;
            const isOpen = content.style.display === 'block';

            // Cerrar todos los acordeones
            document.querySelectorAll('.accordion-content').forEach(item => {
                item.style.display = 'none';
            });

            // Abrir el acordeón clicado si no estaba abierto
            if (!isOpen) {
                content.style.display = 'block';
            }
        });
    });
});