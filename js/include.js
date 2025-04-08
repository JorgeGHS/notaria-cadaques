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

            // Obtener el idioma guardado en localStorage, o usar 'es' como predeterminado
            const savedLanguage = localStorage.getItem('language') || 'es';
            console.log('Idioma recuperado de localStorage:', savedLanguage); // Depuración

            // Inicializar i18next
            await i18next.init({
                lng: savedLanguage, // Usar el idioma guardado
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

            // Manejar el selector de idiomas personalizado
            const customSelect = document.querySelector('.custom-select');
            const selectedOption = customSelect.querySelector('.selected-option');
            const optionsList = customSelect.querySelector('.options-list');
            const options = optionsList.querySelectorAll('li');

            // Establecer la opción inicial según el idioma guardado
            const languageNames = {
                es: 'Español',
                ca: 'Català',
                fr: 'Français'
            };
            selectedOption.querySelector('span').textContent = languageNames[savedLanguage];
            selectedOption.querySelector('span').setAttribute('data-lang', savedLanguage);

            // Mostrar/ocultar la lista al hacer clic en la opción seleccionada
            selectedOption.addEventListener('click', () => {
                optionsList.classList.toggle('active');
                selectedOption.classList.toggle('active');
            });

            // Manejar la selección de una opción
            options.forEach(option => {
                option.addEventListener('click', () => {
                    const newLang = option.getAttribute('data-lang');
                    console.log('Cambiando idioma a:', newLang); // Depuración
                    i18next.changeLanguage(newLang, (err) => {
                        if (err) {
                            console.error('Error al cambiar el idioma:', err);
                            return;
                        }
                        // Guardar el idioma seleccionado en localStorage
                        localStorage.setItem('language', newLang);
                        console.log('Idioma guardado en localStorage:', localStorage.getItem('language')); // Depuración
                        // Actualizar la opción seleccionada
                        selectedOption.querySelector('span').textContent = option.textContent;
                        selectedOption.querySelector('span').setAttribute('data-lang', newLang);
                        // Cerrar la lista
                        optionsList.classList.remove('active');
                        selectedOption.classList.remove('active');
                        // Actualizar las traducciones
                        updateTranslations();
                    });
                });
            });

            // Cerrar la lista si se hace clic fuera del selector
            document.addEventListener('click', (event) => {
                if (!customSelect.contains(event.target)) {
                    optionsList.classList.remove('active');
                    selectedOption.classList.remove('active');
                }
            });
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