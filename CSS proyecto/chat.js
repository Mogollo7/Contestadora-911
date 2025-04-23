function send(){
    var message = document.getElementById('msg');
    var container = document.getElementById('msg-plt');
    var message_container = document.createElement('div');
    var message_text = document.createElement('p');
    message_text.innerHTML = message.value;
    message_text.classList.add('message-text');

    message_container.appendChild(message_text)
    message_container.classList.add('message-container')
    message_container.classList.add('self')
    container.appendChild(message_container)
    message.value = ''
}