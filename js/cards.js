document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', function () {
            const service = card.getAttribute('data-service');
            window.location.href = `./servicios.html?service=${service}`;
        });
    });
});