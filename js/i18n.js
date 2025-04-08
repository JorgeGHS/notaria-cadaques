// js/i18n.js
document.addEventListener('DOMContentLoaded', () => {
    // Obtener el idioma guardado en localStorage, o usar 'es' como predeterminado
    const savedLanguage = localStorage.getItem('language') || 'es';

    // Cargar los archivos de traducción de forma asíncrona
    Promise.all([
        fetch('./locales/es.json').then(res => res.json()),
        fetch('./locales/ca.json').then(res => res.json()),
        fetch('./locales/fr.json').then(res => res.json())
    ]).then(([esTranslations, caTranslations, frTranslations]) => {
        // Inicializar i18next
        i18next.init({
            lng: savedLanguage, // Usar el idioma guardado
            fallbackLng: 'es', // Idioma de respaldo
            resources: {
                es: { translation: esTranslations },
                ca: { translation: caTranslations },
                fr: { translation: frTranslations }
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
                // Establecer el idioma inicial en el selector
                languageSwitcher.value = i18next.language;

                languageSwitcher.addEventListener('change', (event) => {
                    const newLang = event.target.value;
                    i18next.changeLanguage(newLang, (err) => {
                        if (err) {
                            console.error('Error al cambiar el idioma:', err);
                            return;
                        }
                        // Guardar el idioma seleccionado en localStorage
                        localStorage.setItem('language', newLang);
                        updateTranslations();
                    });
                });
            }
        });
    }).catch(err => {
        console.error('Error al cargar los archivos de traducción:', err);
    });
});