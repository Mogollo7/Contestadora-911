function send(){
    var message = document.getElementById('msg');
    var container = document.getElementById('msg-plt');
    
    // Crear el contenedor del nuevo mensaje
    var message_container = document.createElement('div');
    var message_text = document.createElement('p');
    message_text.innerHTML = message.value;  // Poner el texto del input en el párrafo
    message_text.classList.add('message-text');  // Añadir clase para estilo

    // Añadir el mensaje al contenedor del mensaje
    message_container.appendChild(message_text);
    message_container.classList.add('message-container');
    message_container.classList.add('self');

    // Añadir el mensaje al contenedor de mensajes
    container.appendChild(message_container);

    // Limpiar el input
    message.value = '';

    // Desplazar el contenedor de mensajes hacia abajo
    container.scrollTop = container.scrollHeight;
}
