// ... existing code ...
} else if (seccion === 'docker') {
    seccionDiv.innerHTML = `
        <section class="intro-section section-spacing">
            <h3>Configuración de Docker</h3>
            <p>En esta sección se detalla la configuración de Docker para el proyecto, incluyendo la creación de contenedores y la gestión de servicios.</p>

            <div class="neo-section">
                <h4>1. Estructura de Contenedores</h4>
                <ul class="docker-structure">
                    <li><strong>Backend Flask:</strong> Servicio principal que maneja las peticiones HTTP</li>
                    <li><strong>OSRM Server:</strong> Servidor de rutas para Colombia</li>
                    <li><strong>Ollama Service:</strong> Servicio de IA para el chatbot</li>
                </ul>
            </div>

            <div class="neo-section">
                <h4>2. Docker Compose</h4>
                <div class="code-box">
                    <div class="code-box-content">
                        <code>docker-compose up -d</code>
                        <button class="neo-button copiar-btn" onclick="copiarTexto('docker1')">
                            <i class="fa-solid fa-copy"></i> Copiar
                        </button>
                    </div>
                </div>
            </div>

            <div class="neo-section">
                <h4>3. Gestión de Volúmenes</h4>
                <p>Los volúmenes persistentes incluyen:</p>
                <ul class="volume-list">
                    <li>Datos de mapas OSRM</li>
                    <li>Modelos de IA</li>
                    <li>Logs del sistema</li>
                </ul>
            </div>

            <div class="button-container">
                <button class="neo-button" onclick="mostrar('instalacion')">
                    <ion-icon name="arrow-back-outline"></ion-icon> Anterior
                </button>
                <button class="neo-button" onclick="mostrar('arquitectura')">
                    Siguiente <ion-icon name="arrow-forward-outline"></ion-icon>
                </button>
            </div>
        </section>
    `;
} else if (seccion === 'arquitectura') {
    seccionDiv.innerHTML = `
        <section class="intro-section">
            <h3>Arquitectura del Sistema</h3>
            <p>La arquitectura del sistema está diseñada para manejar llamadas de emergencia de manera eficiente y escalable.</p>

            <div class="diagram-container neo-diagram">
                <img src="diagrama.png" alt="Diagrama de arquitectura del sistema" class="diagram-image">
            </div>

            <h4>Explicación del Diagrama</h4>
            <p>El diagrama muestra el flujo completo del sistema, que se divide en los siguientes componentes principales:</p>

            <div class="neo-section">
                <h5>1. Interfaz Principal (Streamlit)</h5>
                <ul class="architecture-components">
                    <li>Punto de entrada para operadores del 911</li>
                    <li>Interfaz para visualizar colas de prioridad</li>
                    <li>Botón de llamada de emergencia para iniciar el proceso</li>
                </ul>
            </div>

            <div class="neo-section">
                <h5>2. Procesamiento de Llamadas</h5>
                <ul class="architecture-components">
                    <li><strong>Ventana de Llamada (n8n):</strong> Interfaz para la gestión de llamadas entrantes</li>
                    <li><strong>Chatbot IA:</strong> Agente inteligente que procesa la conversación</li>
                    <li><strong>Árbol de Decisión:</strong> Sistema de clasificación de emergencias</li>
                </ul>
            </div>

            <div class="neo-section">
                <h5>3. Gestión de Datos</h5>
                <ul class="architecture-components">
                    <li><strong>Almacenamiento en Pilas:</strong> Registro detallado de llamadas que incluye:
                        <ul>
                            <li>Nombre del llamante</li>
                            <li>Tipo de emergencia</li>
                            <li>Resumen del incidente</li>
                            <li>Nivel de prioridad</li>
                            <li>Departamento asignado</li>
                            <li>Tiempos de respuesta</li>
                            <li>Ubicación de la emergencia y unidades</li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div class="button-container">
                <button class="neo-button" onclick="mostrar('docker')">
                    <ion-icon name="arrow-back-outline"></ion-icon> Anterior
                </button>
                <button class="neo-button" onclick="mostrar('mapas')">
                    Siguiente <ion-icon name="arrow-forward-outline"></ion-icon>
                </button>
            </div>
        </section>
    `;
}
// ... existing code ... 