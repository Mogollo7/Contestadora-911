
function mostrar(seccion) {
    const seccionDiv = document.getElementById('seccion');
  
    if (seccion === 'introduccion') {
        seccionDiv.innerHTML = `
        <h3>Introducción</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.</p>
        <div class="button-container">
            <button class="neo-button" onclick="mostrar('objetivos')">Siguiente
                <ion-icon name="arrow-forward-outline"></ion-icon> 
            </button>
        </div>
    `;
    
    } else if (seccion === 'objetivos') {
        seccionDiv.innerHTML = `
            <h3>Objetivos</h3>
            <p>Algo</p>
            <div class="button-container">
                <button class="neo-button" onclick="mostrar('introduccion')">
                    <ion-icon name="arrow-back-outline"></ion-icon> Anterior
                </button>
                <button class="neo-button" onclick="mostrar('alcance')">Siguiente
                    <ion-icon name="arrow-forward-outline"></ion-icon> 
                </button>
            </div>
        `;



    } else if (seccion === 'alcance') {
        seccionDiv.innerHTML = `
            <h3>Alcance</h3>
            <p>Algo</p>
            <div class="button-container">
                <button class="neo-button" onclick="mostrar('objetivos')">
                    <ion-icon name="arrow-back-outline"></ion-icon> Anterior
                </button>
                <button class="neo-button" onclick="mostrar('tecnologias')">Siguiente
                    <ion-icon name="arrow-forward-outline"></ion-icon> 
                </button>
            </div>
        `;
    } else if (seccion === 'tecnologias') {
        seccionDiv.innerHTML = `
            <h3>Tecnologias</h3>
            <p>Algo</p>
            <div class="button-container">
                <button class="neo-button" onclick="mostrar('alcance')">
                    <ion-icon name="arrow-back-outline"></ion-icon> Anterior
                </button>
                <button class="neo-button" onclick="mostrar('requisitos')">Siguiente
                    <ion-icon name="arrow-forward-outline"></ion-icon> 
                </button>
            </div>
        `;



    } else if (seccion === 'requisitos') {
        seccionDiv.innerHTML = `
            <h3>Requisitos</h3>
            <p>Algo</p>
            <div class="button-container">
                <button class="neo-button" onclick="mostrar('tecnologias')">
                    <ion-icon name="arrow-back-outline"></ion-icon> Anterior
                </button>
                <button class="neo-button" onclick="mostrar('instalacion')">Siguiente
                    <ion-icon name="arrow-forward-outline"></ion-icon> 
                </button>
            </div>
        `;
    } else if (seccion === 'instalacion') {
        seccionDiv.innerHTML = `
            <h3>Instalacion</h3>
            <p>Algo</p>
            <div class="button-container">
                <button class="neo-button" onclick="mostrar('requisitos')">
                    <ion-icon name="arrow-back-outline"></ion-icon> Anterior
                </button>
                <button class="neo-button" onclick="mostrar('docker')">Siguiente
                    <ion-icon name="arrow-forward-outline"></ion-icon> 
                </button>
            </div>
        `;



    } else if (seccion === 'docker') {
        seccionDiv.innerHTML = `
            <h3>Docker</h3>
            <p>Algo</p>
            <div class="button-container">
                <button class="neo-button" onclick="mostrar('instalacion')">
                    <ion-icon name="arrow-back-outline"></ion-icon> Anterior
                </button>
                <button class="neo-button" onclick="mostrar('arquitectura')">Siguiente
                    <ion-icon name="arrow-forward-outline"></ion-icon> 
                </button>
            </div>
        `;
    } else if (seccion === 'arquitectura') {
        seccionDiv.innerHTML = `
            <h3>Arquitectura</h3>
            <p>Algo</p>
            <div class="button-container">
                <button class="neo-button" onclick="mostrar('docker')">
                    <ion-icon name="arrow-back-outline"></ion-icon> Anterior
                </button>
                <button class="neo-button" onclick="mostrar('mapas')">Siguiente
                    <ion-icon name="arrow-forward-outline"></ion-icon> 
                </button>
            </div>
        `;
    } else if (seccion === 'mapas') {
        seccionDiv.innerHTML = `
            <h3>Mapas</h3>
            <p>Algo</p>
            <div class="button-container">
                <button class="neo-button" onclick="mostrar('arquitectura')">
                    <ion-icon name="arrow-back-outline"></ion-icon> Anterior
                </button>
                <button class="neo-button" onclick="mostrar('chatbot')">Siguiente
                    <ion-icon name="arrow-forward-outline"></ion-icon> 
                </button>
            </div>
        `;
    } else if (seccion === 'chatbot') {
        seccionDiv.innerHTML = `
            <h3>Chat bot</h3>
            <p>Algo</p>
            <div class="button-container">
                <button class="neo-button" onclick="mostrar('mapas')">
                    <ion-icon name="arrow-back-outline"></ion-icon> Anterior
                </button>
                <button class="neo-button" onclick="mostrar('testing')">Siguiente
                    <ion-icon name="arrow-forward-outline"></ion-icon> 
                </button>
            </div>
        `;
    } else if (seccion === 'testing') {
        seccionDiv.innerHTML = `
            <h3>Testing</h3>
            <p>Algo</p>
            <div class="button-container">
                <button class="neo-button" onclick="mostrar('chatbot')">
                    <ion-icon name="arrow-back-outline"></ion-icon> Anterior
                </button>
                <button class="neo-button" onclick="mostrar('despliegue')">Siguiente
                    <ion-icon name="arrow-forward-outline"></ion-icon> 
                </button>
            </div>
        `;
    } else if (seccion === 'despliegue') {
        seccionDiv.innerHTML = `
            <h3>Despliegue</h3>
            <p>Algo</p>
            <div class="button-container">
                <button class="neo-button" onclick="mostrar('testing')">
                    <ion-icon name="arrow-back-outline"></ion-icon> Anterior
                </button>
                <button class="neo-button" onclick="mostrar('creditos')">Siguiente
                    <ion-icon name="arrow-forward-outline"></ion-icon> 
                </button>
            </div>
        `;
    } else if (seccion === 'creditos') {
        seccionDiv.innerHTML = `
            <h3>Creditos</h3>
            <p>Algo</p>
            <div class="button-container">
                <button class="neo-button" onclick="mostrar('objetivos')">
                    <ion-icon name="arrow-back-outline"></ion-icon> Anterior
                </button>
            </div>
        `;
    }
    
}
//Scroll
  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY === 0) {
        header.style.top = '0';
    } else {
        header.style.top = '-100px'; 
    }
});