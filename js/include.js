// js/include.js (temporal para pruebas)
document.addEventListener('DOMContentLoaded', () => {
    async function loadHTML(elementId, filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error(`Error al cargar ${filePath}`);
            const html = await response.text();
            document.getElementById(elementId).innerHTML = html;
        } catch (error) {
            console.error('Error al cargar el archivo:', error);
            throw error;
        }
    }

    function initializeScripts() {
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('nav');
        if (menuToggle && nav) {
            menuToggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                menuToggle.classList.toggle('active');
            });
        }
    }

    Promise.all([
        loadHTML('header-placeholder', 'http://localhost:63343/notaria-cadaques/includes/header.html'),
        loadHTML('footer-placeholder', 'http://localhost:63343/notaria-cadaques/includes/footer.html')
    ])
        .then(() => {
            initializeScripts();
        })
        .catch(error => {
            console.error('Error al cargar header o footer:', error);
        });
});