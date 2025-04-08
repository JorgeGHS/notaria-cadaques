// js/include.js
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

    async function initializeTranslations() {
        try {
            // Cargar los archivos de traducción
            const [es, ca, fr] = await Promise.all([
                fetch('./locales/es.json').then(res => res.json()),
                fetch('./locales/ca.json').then(res => res.json()),
                fetch('./locales/fr.json').then(res => res.json())
            ]);

            // Inicializar i18next
            await i18next.init({
                lng: 'es', // Idioma por defecto: español
                fallbackLng: 'es', // Idioma de respaldo
                resources: {
                    es: { translation: es },
                    ca: { translation: ca },
                    fr: { translation: fr }
                }
            });

            // Función para actualizar las traducciones
            function updateTranslations() {
                document.querySelectorAll('[data-i18n]').forEach(element => {
                    const key = element.getAttribute('data-i18n');
                    if (key.startsWith('[text]')) {
                        const actualKey = key.replace('[text]', '');
                        element.textContent = i18next.t(actualKey);
                    } else {
                        element.innerHTML = i18next.t(key);
                    }
                });

                // Actualizar el atributo lang del HTML
                document.documentElement.setAttribute('lang', i18next.language);
            }

            // Actualizar las traducciones inicialmente
            updateTranslations();

            // Manejar el cambio de idioma
            const languageSwitcher = document.querySelector('#language-switcher');
            if (languageSwitcher) {
                languageSwitcher.addEventListener('change', (event) => {
                    const newLang = event.target.value;
                    i18next.changeLanguage(newLang, (err) => {
                        if (err) {
                            console.error('Error al cambiar el idioma:', err);
                            return;
                        }
                        updateTranslations();
                    });
                });

                // Establecer el idioma inicial en el selector
                languageSwitcher.value = i18next.language;
            }
        } catch (error) {
            console.error('Error al inicializar las traducciones:', error);
        }
    }

    function initializeScripts() {
        // Inicializar el menú hamburguesa
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('nav');
        if (menuToggle && nav) {
            menuToggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                menuToggle.classList.toggle('active');
            });
        }
    }

    // Cargar el header y el footer, y luego inicializar los scripts y traducciones
    Promise.all([
        loadHTML('header-placeholder', './includes/header.html'),
        loadHTML('footer-placeholder', './includes/footer.html')
    ])
        .then(() => {
            initializeScripts();
            initializeTranslations();
        })
        .catch(error => {
            console.error('Error al cargar header o footer:', error);
        });
});