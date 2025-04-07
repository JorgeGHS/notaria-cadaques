document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    fetch('https://formspree.io/f/tu-id', {  // Reemplaza "tu-id" con tu endpoint de Formspree
        method: 'POST',
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                alert('Mensaje enviado con éxito. ¡Gracias por contactarnos!');
                form.reset();
            } else {
                alert('Hubo un error al enviar el mensaje. Inténtalo de nuevo.');
            }
        })
        .catch(error => {
            alert('Error: ' + error.message);
        });
});