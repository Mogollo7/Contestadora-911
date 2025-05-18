let userAddress = '';
let userName = '';

function createMap(route) {
    // Crear contenedor para el mapa
    const mapContainer = document.createElement('div');
    mapContainer.style.width = '100%';
    mapContainer.style.height = '300px';
    mapContainer.style.marginTop = '10px';
    mapContainer.id = 'map-' + Date.now();

    // Crear iframe para el mapa
    const mapFrame = document.createElement('iframe');
    mapFrame.style.width = '100%';
    mapFrame.style.height = '100%';
    mapFrame.style.border = 'none';
    
    // Agregar el iframe al contenedor
    mapContainer.appendChild(mapFrame);
    
    return mapContainer;
}

function addMessage(text, isUser = false) {
    const container = document.getElementById('msg-plt');
    const messageContainer = document.createElement('div');
    const messageText = document.createElement('div');
    
    messageText.innerHTML = `<p>${text}</p>`;
    messageText.classList.add('message-text');
    
    messageContainer.appendChild(messageText);
    messageContainer.classList.add('message-container');
    if (isUser) messageContainer.classList.add('self');
    
    container.appendChild(messageContainer);
    container.scrollTop = container.scrollHeight;
    
    return messageContainer;
}

async function send() {
    const messageInput = document.getElementById('msg');
    const message = messageInput.value.trim();
    
    if (message === '') return;
    
    // Mostrar mensaje del usuario
    addMessage(message, true);
    
    try {
        // Si no tenemos nombre
        if (!userName && !message.toLowerCase().startsWith('nombre:')) {
            addMessage('Por favor, proporciona tu nombre. Escribe: "Nombre: <tu nombre>"');
            messageInput.value = 'Nombre: ';
            messageInput.focus();
            return;
        }

        if (message.toLowerCase().startsWith('nombre:')) {
            userName = message.substring(7).trim();
            addMessage('Gracias. Ahora, por favor proporciona la dirección con "Dirección: <dirección>"');
            messageInput.value = 'Dirección: ';
            messageInput.focus();
            return;
        }

        // Si no tenemos dirección, preguntarla primero
        if (!userAddress && !message.toLowerCase().includes('dirección:')) {
            addMessage('Por favor, proporciona la dirección de la emergencia. Comienza tu mensaje con "Dirección:"');
            messageInput.value = 'Dirección: ';
            messageInput.focus();
            return;
        }
        
        // Si el mensaje comienza con "Dirección:", actualizar la dirección
        if (message.toLowerCase().startsWith('dirección:')) {
            userAddress = message.substring(10).trim();
            addMessage('Gracias por proporcionar la dirección. Ahora, por favor describe la emergencia.');
            messageInput.value = '';
            messageInput.focus();
            return;
        }
        
        // Enviar mensaje al servidor
        const response = await fetch('/procesar_mensaje', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mensaje: message,
                direccion: userAddress,
                nombre: userName
            })
        });

        const data = await response.json();
        
        // Mostrar respuesta del bot
        const botContainer = addMessage(data.mensaje);
        
        // Mostrar link al mapa si hay id
        if (data.id) {
            const linkDiv = document.createElement('div');
            linkDiv.style.marginTop = '10px';
            linkDiv.innerHTML = `<a href="/mapa/${data.id}" target="_blank" style="color: #007bff; text-decoration: underline;">Ver mapa de la emergencia</a>`;
            botContainer.appendChild(linkDiv);
        }

    } catch (error) {
        console.error('Error:', error);
        addMessage('Lo siento, hubo un error al procesar tu mensaje.');
    }

    // Limpiar input
    messageInput.value = '';
    messageInput.focus();
}

// Permitir enviar con Enter y salto de línea con Shift+Enter
document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.getElementById('msg');
    messageInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    });
});
