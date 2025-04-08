// js/i18n.js
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar i18next
    i18next.init({
        lng: 'es', // Idioma por defecto: español
        fallbackLng: 'es', // Idioma de respaldo
        resources: {
            es: {
                translation: fetch('./locales/es.json').then(res => res.json())
            },
            ca: {
                translation: fetch('./locales/ca.json').then(res => res.json())
            },
            fr: {
                translation: fetch('./locales/fr.json').then(res => res.json())
            }
        }
    }, (err, t) => {
        if (err) {
            console.error('Error al inicializar i18next:', err);
            return;
        }

        // Función para actualizar las traducciones en la página
        function updateTranslations() {
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (key.startsWith('[text]')) {
                    // Para elementos como <a> donde solo queremos traducir el texto
                    const actualKey = key.replace('[text]', '');
                    element.textContent = i18next.t(actualKey);
                } else {
                    // Para elementos donde queremos traducir el contenido completo
                    element.innerHTML = i18next.t(key);
                }
            });

            // Actualizar el atributo lang del HTML
            document.documentElement.setAttribute('lang', i18next.language);
        }

        // Actualizar las traducciones inicialmente
        updateTranslations();

        // Manejar el cambio de idioma
        const languageSwitcher = document.getElementById('language-switcher');
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
    });
});