
function mostrar(seccion) {
    const seccionDiv = document.getElementById('seccion');
  
    if (seccion === 'introduccion') {
        seccionDiv.innerHTML = `
            <section class="intro-section">
                <h3>Introducción</h3>

                <p>
                El proyecto consiste en desarrollar un chatbot que, mediante el uso de diversas estructuras de datos, permita evaluar el tipo de emergencia, su prioridad, calcular la ruta óptima para atenderla y gestionarla según su nivel de urgencia. Además, se crea un historial de emergencias para conformar una base de datos con información pertinente.
                </p>

                <p>
                Este sistema surge ante la creciente necesidad de apoyar la gestión de emergencias con herramientas tecnológicas, dado que los recursos humanos a menudo resultan insuficientes para atender la alta demanda de incidentes.
                </p>

                <div class="alert alert-info">
                <p>
                    Con base en el consolidado de estadísticas que reporta la Unidad Nacional para la Gestión del Riesgo de Desastres (UNGRD), en lo correspondiente al año 2022, los movimientos en masa son los eventos que se presentan con mayor frecuencia en el país y alcanzan un 30,56 % del total de emergencias. Esto, seguido de inundaciones (20,46 %) e incendios forestales (20,29 %).
                </p>
                <p class="alert-footer">
                    <hr class="custom-hr" />
                    Fuente: <a href="https://www.portafolio.co/economia/regiones/aumentan-en-un-15-las-emergencias-por-desastres-en-colombia-en-el-ultimo-ano-590607" target="_blank">Portafolio (2023)</a>
                </p>
                </div>

                <p>
                La línea 123 es fundamental para la atención de situaciones críticas. En 2024 se reportaron más de <strong>5.2 millones de llamadas</strong>, pero solo el <strong>29 %</strong> fueron verdaderas emergencias. Esto significa que cerca de <strong>3.7 millones</strong> no requerían atención inmediata.
                </p>

                <p>
                Además, en los primeros cuatro meses de 2023 se observó un incremento del <strong>18 %</strong> respecto al mismo periodo de 2022, con un total de <strong>2 899 022 llamadas</strong> frente a <strong>2 454 899</strong> del año anterior.
                </p>

                <div class="alert alert-info">
                <div class="chart-container" style="width: 100%; max-width: 600px; margin: auto; padding: 20px 0;">
                    <canvas id="chartEmergencias"></canvas>
                </div>
                <p class="alert-footer">
                    <hr class="custom-hr" />
                    Fuentes:
                    <a href="https://repository.unad.edu.co/bitstream/handle/10596/66917/dsperezpat.pdf?sequence=3&isAllowed=y" target="_blank">UNAD (2023)</a>
                </p>
                </div>

                <p>
                El chatbot inicia la interacción saludando al usuario, solicitando su nombre y ubicación, con la cual se calcula una ruta para atender su emergencia. Asimismo, intenta tranquilizar al usuario y, utilizando un árbol de decisiones, determina el tipo de prioridad y el departamento asignado.
                </p>

    
                <div class="button-container">
                    <button class="neo-button" onclick="mostrar('objetivos')">Siguiente
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                    </button>
                </div>
    

            </section>
        `;

        
            setTimeout(() => {
                const ctx = document.getElementById('chartEmergencias').getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Riñas', 'Ruido excesivo', 'Accidentes de tránsito', 'SPA'],
                        datasets: [{
                            label: 'Incidentes reportados en Bogotá (2023)',
                            data: [142754, 94896, 66834, 24788],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(75, 192, 192, 0.6)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: { display: false },
                            title: {
                                display: true,
                                text: 'Incidentes reportados - Línea 123 (Bogotá)'
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    stepSize: 10000
                                }
                            }
                        }
                    }
                });
            }, 200); 
        
    
        
    
    
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

//Diagrama 

