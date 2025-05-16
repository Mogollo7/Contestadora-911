// Contenido 
function mostrar(seccion) {
    const seccionDiv = document.getElementById('seccion');
    if (seccion === 'objetivos') {
        seccionDiv.innerHTML = `
            <section class="intro-section">
                <h3>Objetivos</h3>
                <h4>Objetivo General</h4>
                                    <hr class="custom-hr" />


                <div class="alert-insert alert-info">
                    <p>
                    Desarrollar un sistema de simulación inteligente para la recepción, 
                    priorización y gestión de llamadas de emergencia al 911, 
                    integrando algoritmos de rutas óptimas, 
                    geolocalización en tiempo real y un chatbot asistido por inteligencia artificial, 
                    todo dentro de una arquitectura escalable.
                    </p>
                </div>

                <h4>Objetivo Especifico</h4>
                                    <hr class="custom-hr" />

                <div class="alert-insert alert-info">
                    <ul class="objetivos-secundarios">
                        <li>Implementar un backend en Flask capaz de recibir y procesar llamadas simuladas con estructuras de datos eficientes.</li>
                        <li>Desarrollar un chatbot conversacional basado en árboles de decisión que permita una primera clasificación de emergencias.</li>
                        <li>Integrar el algoritmo de Dijkstra junto con OSMnx para calcular rutas óptimas desde estaciones de emergencia hasta el punto de incidente.</li>
                        <li>Contenerizar toda la aplicación utilizando Docker y automatizar el despliegue con Docker Compose.</li>
                        <li>Configurar el entorno de desarrollo en Ubuntu 22.04 dentro de WSL, asegurando compatibilidad y eficiencia en el entorno local.</li>
                    </ul>
                </div>

            </section>


            <div class="button-container">
            <button class="neo-button" onclick="location.href='doc.html'">
                <ion-icon name="arrow-back-outline"></ion-icon> Anterior
            </button>
            <button class="neo-button" onclick="mostrar('alcance')">
                Siguiente <ion-icon name="arrow-forward-outline"></ion-icon>
            </button>
            </div>

        `;
    } else if (seccion === 'alcance') {
        seccionDiv.innerHTML = `
        <section class="intro-section">
            <h3>Alcance</h3>
                <p>
                    El primer prototipo del sistema fue desarrollado utilizando <strong>Streamlit</strong> como entorno de pruebas ágil, 
                    permitiendo validar de forma rápida el comportamiento de las principales estructuras de datos necesarias: <strong>colas</strong> para la gestión de llamadas, 
                    <strong>pilas</strong> para navegación de decisiones y <strong>árboles de decisión</strong> para clasificar emergencias según los síntomas reportados por el usuario.
                </p>
                <p>
                    Este prototipo también sirvió para verificar la lógica de negocio del <strong>backend</strong>, incluyendo la forma en que se procesan y priorizan las llamadas de emergencia, 
                    así como la integración básica con funciones que más adelante serían optimizadas y migradas a Flask. 
                    La visualización directa de los procesos en Streamlit resultó útil para detectar errores tempranos y comprender las necesidades reales del flujo de interacción.
                </p>
                <p>
                    No obstante, <strong>Streamlit</strong> presenta ciertas limitaciones, como la imposibilidad de mostrar múltiples ventanas independientes dentro de una misma interfaz. 
                    Para simular la navegación entre distintas etapas del proceso (recepción, clasificación, asignación de recursos), fue necesario dividir el flujo en pestañas 
                    o páginas internas, lo que reducía la fluidez del sistema y evidenciaba la necesidad de una arquitectura más robusta.
                </p>
                <p>
                    Por esta razón, el prototipo cumplió su función como prueba de concepto, pero no fue concebido como solución definitiva. 
                    El alcance de este desarrollo inicial se limitó a pruebas locales, sin integración con servicios externos ni despliegue en producción. 
                    Fue un paso crucial para consolidar la lógica funcional y guiar el diseño de la versión contenerizada y desplegable con Flask, Docker y OSMnx en un entorno Ubuntu sobre WSL.
                </p>
            

            <div class="button-container">
                <button class="neo-button" onclick="mostrar('objetivos')">
                    <ion-icon name="arrow-back-outline"></ion-icon> Anterior
                </button>
                <button class="neo-button" onclick="mostrar('tecnologias')">Siguiente
                    <ion-icon name="arrow-forward-outline"></ion-icon> 
                </button>
            </div>
        </section>
        `;
    } else if (seccion === 'tecnologias') {
        seccionDiv.innerHTML = `
            <section class="intro-section">

                <h3>Tecnologias</h3>
                <h4>2.1 Backend</h4>
                    <p>
                        <strong>Flask</strong> es un micro-framework en Python que facilita la construcción de APIs RESTful ligeras y escalables. 
                        Ofrece enrutamiento sencillo, manejo de peticiones y extensibilidad mediante extensiones, 
                        lo que lo convierte en la base ideal para nuestro servicio de gestión de emergencias.
                    </p>

                    <h4>2.2 Inteligencia Artificial</h4>
                    <p>
                        Para el componente de lenguaje natural, utilizamos <strong>Ollama</strong> como gestor local de modelos LLM. 
                        El modelo principal es <strong>Llama 3.1 (8B)</strong>, cuya arquitectura de 8 mil millones de parámetros 
                        proporciona un buen equilibrio entre precisión y consumo de recursos. 
                        En sistemas con menor capacidad de memoria, es posible optar por <strong>Llama 3B</strong> sin sacrificar la coherencia del chatbot.
                    </p>

                    <h4>2.3 Estructuras de Datos</h4>
                    <p>
                        Las estructuras de datos fundamentales se implementaron con módulos nativos y de terceros:
                    </p>
                    <ul class="objetivos-secundarios">                        <li>
                        <strong>heapq</strong>: colas de prioridad para asegurar que las llamadas más urgentes se atiendan primero.
                        </li>
                        <li>
                        <strong>collections.deque</strong> y listas nativas de Python: pilas y colas simples para manejo de permisos de navegación y deshacer/rehacer acciones.
                        </li>
                        <li>
                        <strong>scikit-learn</strong>: <em>DecisionTreeClassifier</em> y <em>LabelEncoder</em> para construir árboles de decisión que clasifican rápidamente el tipo de emergencia.
                        </li>
                    </ul>

                    <h4>2.4 Algoritmos de Grafos</h4>
                    <p>
                        Para el cálculo de rutas óptimas en el grafo vial, combinamos:
                    </p>
                    <ul class="objetivos-secundarios">
                        <li>
                        <strong>OSMnx</strong>: descarga y construcción del grafo de carreteras desde OpenStreetMap, permitiendo trabajar con datos realistas de cualquier región.
                        </li>
                        <li>
                        <strong>NetworkX</strong>: aplicación del algoritmo de Dijkstra sobre el grafo para obtener la ruta más rápida, considerando distancias y pesos personalizados (por ejemplo, congestión simulada).
                        </li>
                    </ul>

                    <h4>2.5 Geolocalización</h4>
                    <p>
                        La conversión de direcciones y la obtención de rutas se apoyan en:
                    </p>
                    <ul class="objetivos-secundarios">
                        <li>
                        <strong>geopy</strong> (Nominatim): geocodificación rápida desde direcciones reales a coordenadas GPS.
                        </li>
                        <li>
                        <strong>requests</strong>: interfaz HTTP para comunicarse con el servidor OSRM (Open Source Routing Machine) y obtener cálculos de ruta externos cuando sea necesario.
                        </li>
                        <li>
                        <strong>Folium</strong>: generación de mapas interactivos en HTML, útiles para visualizar tanto el prototipo en Streamlit como en la futura interfaz Flask.
                        </li>
                        <li>
                        <strong>streamlit-folium</strong>: integración de Folium dentro de Streamlit durante la fase de prototipado.
                        </li>
                    </ul>

                    <h4>2.6 Utilidades y Prototipado</h4>
                    <p>
                        Para acelerar el desarrollo y las pruebas iniciales:
                    </p>
                    <ul class="objetivos-secundarios">
                        <li>
                        <strong>Streamlit</strong>: plataforma de prototipado rápido que permitió validar la lógica de negocio y las estructuras de datos; 
                        se descartó para producción debido a sus limitaciones de navegación multipágina.
                        </li>
                        <li>
                        <strong>tempfile</strong> y <strong>os</strong>: manejo dinámico de archivos temporales y rutas de sistema durante la gestión de datos en memoria.
                        </li>
                        <li>
                        <strong>pandas</strong> y <strong>numpy</strong>: análisis y preprocesamiento de datos históricos de emergencias para pruebas de rendimiento.
                        </li>
                        <li>
                        <strong>matplotlib</strong>: visualización de resultados de clasificación y diagramas de árboles de decisión.
                        </li>
                        <li>
                        <strong>csv</strong> y <strong>datetime</strong>: importación y registro temporal de incidentes simulados.
                        </li>
                    </ul>

                    <h4>2.7 Contenerización y Despliegue</h4>
                    <p>
                        La aplicación y sus dependencias se aíslan y orquestan mediante:
                    </p>
                    <ul class="objetivos-secundarios">
                        <li>
                        <strong>Docker</strong>: construcción de imágenes que incluyen Flask, modelos LLM y un contenedor adicional para almacenar localmente el grafo OSM, 
                        reduciendo la latencia de descarga en cada ejecución.
                        </li>
                        <li>
                        <strong>Docker Compose</strong>: definición de servicios y redes para levantar el sistema completo con un solo comando, 
                        incluyendo backend, volumen del mapa y posibles bases de datos.
                        </li>
                    </ul>

            </section>

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
            <section class="intro-section">
                <h3>Requisitos</h3>
                <p>Antes de comenzar con la instalación y configuración del entorno, asegúrate de cumplir con los siguientes requisitos de software y hardware para garantizar un desarrollo y despliegue sin contratiempos.</p>
                                    <hr class="custom-hr" />

                <h4>Software</h4>
                <ul class="objetivos-secundarios">
                    <li>Windows 10/11 con <strong>WSL 2</strong> habilitado y distribución <strong>Ubuntu 22.04</strong>.</li>
                    <li><strong>Docker Desktop</strong> (con integración WSL 2) y <strong>Docker Compose</strong> para orquestar contenedores.</li>
                    <li><strong>Python 3.10+</strong> instalado dentro de WSL (incluyendo <code>python3-venv</code> y <code>python3-pip</code>).</li>
                    <li><strong>Ollama</strong> configurado para gestionar el modelo <em>Llama 3.1 (8B)</em> (opcionalmente <em>Llama 3B</em> para entornos de menor capacidad).</li>
                    <li>Bibliotecas Python instalables vía <code>pip</code>:
                    <ul>
                        <li><strong>Flask</strong>, <strong>OSMnx</strong>, <strong>NetworkX</strong></li>
                        <li><strong>geopy</strong> (Nominatim), <strong>folium</strong>, <strong>streamlit</strong> (solo prototipo)</li>
                        <li><strong>pandas</strong>, <strong>numpy</strong>, <strong>scikit-learn</strong>, <strong>matplotlib</strong></li>
                        <li><strong>streamlit-folium</strong>, <strong>requests</strong></li>
                    </ul>
                    </li>
                    <li>Acceso a Internet estable para la descarga inicial de datos de OpenStreetMap, modelos LLM y consultas a OSRM.</li>
                </ul>
                                    <hr class="custom-hr" />

                <h4>Hardware</h4>
                <ul class="objetivos-secundarios">
                    <li>CPU multicore (recomendado ≥ 4 núcleos físicos) para procesamiento paralelo de rutas y clasificación.</li>
                    <li>Memoria RAM mínima de 8 GB (16 GB recomendado, especialmente al ejecutar Llama 3.1 8B en Ollama).</li>
                    <li>Almacenamiento SSD con al menos 20 GB de espacio libre para caché de mapas y modelos.</li>
                    <li>Conexión a Internet de alta velocidad y baja latencia para geocodificación y servicios de routing externos.</li>
                </ul>

                <p>Con este entorno configurado, podrás seguir los pasos de clonación, contenerización y despliegue sin interrupciones, asegurando que el prototipo y la versión final funcionen de manera óptima.</p>
            </section>


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
            <section class="intro-section">
                <h3>Guía de Instalación del Proyecto</h3>
                <p>Esta guía detalla los pasos necesarios para instalar y ejecutar correctamente el proyecto de la contestadora automática 911.</p>

                <h4>1. Requisitos Básicos</h4>
                
                <h5>1.1. Python</h5>
                <p>Python es el lenguaje base de este proyecto. Descarga e instala la versión más reciente:</p>
                <div class="code-box">
                    <div class="code-box-content">
                        <a id="link1" href="https://www.python.org/downloads/" target="_blank">https://www.python.org/downloads/</a>
                    </div>
                </div>

                <h5>1.2. Visual Studio Code</h5>
                <p>IDE recomendado para el desarrollo del proyecto:</p>
                <div class="code-box">
                    <div class="code-box-content">
                        <a id="link2" href="https://code.visualstudio.com/" target="_blank">https://code.visualstudio.com/</a>
                    </div>
                </div>

                <h5>1.3. Git</h5>
                <p>Sistema de control de versiones necesario para clonar el repositorio:</p>
                <div class="code-box">
                    <div class="code-box-content">
                        <a id="link3" href="https://git-scm.com/downloads" target="_blank">https://git-scm.com/downloads</a>
                    </div>
                </div>

                <h4>2. Configuración del Proyecto</h4>

                <h5>2.1. Clonar el Repositorio</h5>
                <div class="code-box">
                    <div class="code-box-content">
                        <code id="codigo4">git clone https://github.com/Mogollo7/Contestadora-911.git</code>
                        <button class="neo-button copiar-btn" onclick="copiarTexto('codigo4')">
                            <i class="fa-solid fa-copy"></i> Copiar
                        </button>
                    </div>
                </div>

                <h5>2.2. Entorno Virtual</h5>
                <p>Activa el entorno virtual para aislar las dependencias del proyecto:</p>
                <div class="code-box">
                    <div class="code-box-content">
                        <code id="codigo5">.\venv\Scripts\activate</code>
                        <button class="neo-button copiar-btn" onclick="copiarTexto('codigo5')">
                            <i class="fa-solid fa-copy"></i> Copiar
                        </button>
                    </div>
                </div>

                <h5>2.3. Instalación de Dependencias</h5>
                <div class="code-box">
                    <div class="code-box-content">
                        <code id="codigo6">pip install -r requirements.txt</code>
                        <button class="neo-button copiar-btn" onclick="copiarTexto('codigo6')">
                            <i class="fa-solid fa-copy"></i> Copiar
                        </button>
                    </div>
                </div>

                <h4>3. Configuración del Entorno Linux (WSL)</h4>
                
                <h5>3.1. Instalación de WSL</h5>
                <p>Ejecuta PowerShell como administrador y ejecuta:</p>
                <div class="code-box">
                    <div class="code-box-content">
                        <code id="codigo7">wsl --install</code>
                        <button class="neo-button copiar-btn" onclick="copiarTexto('codigo7')">
                            <i class="fa-solid fa-copy"></i> Copiar
                        </button>
                    </div>
                </div>

                <h5>3.2. Iniciar WSL</h5>
                <div class="code-box">
                    <div class="code-box-content">
                        <code id="codigo8">wsl</code>
                        <button class="neo-button copiar-btn" onclick="copiarTexto('codigo8')">
                            <i class="fa-solid fa-copy"></i> Copiar
                        </button>
                    </div>
                </div>

                <h4>4. Instalación de Docker</h4>

                <h5>4.1. Preparación del Sistema</h5>
                <div class="code-box">
                    <div class="code-box-content">
                        <code id="codigo9">sudo apt update && sudo apt upgrade -y</code>
                        <button class="neo-button copiar-btn" onclick="copiarTexto('codigo9')">
                            <i class="fa-solid fa-copy"></i> Copiar
                        </button>
                    </div>
                </div>

                <h5>4.2. Instalación de Dependencias</h5>
                <div class="code-box">
                    <div class="code-box-content">
                        <code id="codigo10">sudo apt install -y ca-certificates curl gnupg lsb-release</code>
                        <button class="neo-button copiar-btn" onclick="copiarTexto('codigo10')">
                            <i class="fa-solid fa-copy"></i> Copiar
                        </button>
                    </div>
                </div>

                <h5>4.3. Configuración del Repositorio Docker</h5>
                <div class="code-box">
                    <div class="code-box-content">
                        <code id="codigo11">sudo mkdir -p /etc/apt/keyrings</code>
                        <button class="neo-button copiar-btn" onclick="copiarTexto('codigo11')">
                            <i class="fa-solid fa-copy"></i> Copiar
                        </button>
                    </div>
                    <div class="code-box-content">
                        <code id="codigo12">curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg</code>
                        <button class="neo-button copiar-btn" onclick="copiarTexto('codigo12')">
                            <i class="fa-solid fa-copy"></i> Copiar
                        </button>
                    </div>
                </div>

                <h5>4.4. Instalación de Docker Engine</h5>
                <div class="code-box">
                    <div class="code-box-content">
                        <code id="codigo13">sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin</code>
                        <button class="neo-button copiar-btn" onclick="copiarTexto('codigo13')">
                            <i class="fa-solid fa-copy"></i> Copiar
                        </button>
                    </div>
                </div>

                <h4>5. Configuración de OSRM</h4>

                <h5>5.1. Preparación del Entorno OSRM</h5>
                <div class="code-box">
                    <div class="code-box-content">
                        <code>mkdir -p ~/osrm-data && cd ~/osrm-data</code>
                        <button class="neo-button copiar-btn" onclick="copiarTexto('codigo14')">
                            <i class="fa-solid fa-copy"></i> Copiar
                        </button>
                    </div>
                </div>

                <h5>5.2. Descarga de Datos</h5>
                <div class="code-box">
                    <div class="code-box-content">
                        <code>wget https://download.geofabrik.de/south-america/colombia-latest.osm.pbf</code>
                        <button class="neo-button copiar-btn" onclick="copiarTexto('codigo15')">
                            <i class="fa-solid fa-copy"></i> Copiar
                        </button>
                    </div>
                </div>

                <h5>5.3. Procesamiento de Datos</h5>
                <div class="code-box">
                    <div class="code-box-content">
                        <code>docker run -t -v $(pwd):/data osrm/osrm-backend osrm-extract -p /opt/car.lua /data/colombia-latest.osm.pbf</code>
                        <button class="neo-button copiar-btn" onclick="copiarTexto('codigo16')">
                            <i class="fa-solid fa-copy"></i> Copiar
                        </button>
                    </div>
                </div>

                <h5>5.4. Iniciar Servidor OSRM</h5>
                <div class="code-box">
                    <div class="code-box-content">
                        <code>docker run -t -i -p 5000:5000 -v $(pwd):/data osrm/osrm-backend osrm-routed --algorithm mld /data/colombia-latest.osrm</code>
                        <button class="neo-button copiar-btn" onclick="copiarTexto('codigo17')">
                            <i class="fa-solid fa-copy"></i> Copiar
                        </button>
                    </div>
                </div>

                <h4>6. Instalación de Ollama y Llama</h4>
                <p>Ollama es una herramienta que nos permite ejecutar modelos de lenguaje localmente. Instalaremos Ollama y el modelo Llama 3B, que ofrece un buen balance entre rendimiento y recursos necesarios.</p>

                <h5>6.1. Instalación de Ollama</h5>
                <p>Primero, descargamos e instalamos Ollama usando curl:</p>
                <div class="code-box">
                    <div class="code-box-content">
                        <code id="codigo_ollama1">curl -fsSL https://ollama.com/install.sh | sh</code>
                        <button class="neo-button copiar-btn" onclick="copiarTexto('codigo_ollama1')">
                            <i class="fa-solid fa-copy"></i> Copiar
                        </button>
                    </div>
                </div>

                <h5>6.2. Iniciar el Servicio Ollama</h5>
                <p>Una vez instalado, iniciamos el servicio:</p>
                <div class="code-box">
                    <div class="code-box-content">
                        <code id="codigo_ollama2">ollama serve</code>
                        <button class="neo-button copiar-btn" onclick="copiarTexto('codigo_ollama2')">
                            <i class="fa-solid fa-copy"></i> Copiar
                        </button>
                    </div>
                </div>

                <h5>6.3. Descarga de Llama 3B</h5>
                <p>Recomendamos el modelo Llama 3B por las siguientes razones:</p>
                <ul class="model-benefits">
                    <li>Menor consumo de recursos (RAM y GPU)</li>
                    <li>Tiempo de respuesta más rápido</li>
                    <li>Buen balance entre rendimiento y precisión</li>
                    <li>Ideal para equipos con recursos limitados</li>
                </ul>

                <p>Para descargar el modelo Llama 3B, ejecuta:</p>
                <div class="code-box">
                    <div class="code-box-content">
                        <code id="codigo_ollama3">ollama pull llama2:3b</code>
                        <button class="neo-button copiar-btn" onclick="copiarTexto('codigo_ollama3')">
                            <i class="fa-solid fa-copy"></i> Copiar
                        </button>
                    </div>
                </div>

                <h5>6.4. Ejecutar el Modelo</h5>
                <p>Para iniciar una conversación con el modelo:</p>
                <div class="code-box">
                    <div class="code-box-content">
                        <code id="codigo_ollama4">ollama run llama2:3b</code>
                        <button class="neo-button copiar-btn" onclick="copiarTexto('codigo_ollama4')">
                            <i class="fa-solid fa-copy"></i> Copiar
                        </button>
                    </div>
                </div>

                <h5>6.5. Requisitos del Sistema</h5>
                <p>Para ejecutar Llama 3B de manera óptima, se recomienda:</p>
                <ul class="system-requirements">
                    <li>Mínimo 8GB de RAM</li>
                    <li>Al menos 5GB de espacio en disco</li>
                    <li>Procesador con 4 núcleos o más</li>
                    <li>Sistema operativo Ubuntu 20.04 o superior</li>
                </ul>

                <p>Nota: Si prefieres el modelo de 8B, puedes instalarlo con <code>ollama pull llama2:8b</code>, pero ten en cuenta que requiere más recursos (mínimo 16GB de RAM).</p>

                <div class="button-container">
                    <button class="neo-button" onclick="mostrar('requisitos')">
                        <ion-icon name="arrow-back-outline"></ion-icon> Anterior
                    </button>
                    <button class="neo-button" onclick="mostrar('docker')">
                        Siguiente <ion-icon name="arrow-forward-outline"></ion-icon>
                    </button>
                </div>
            </section>
        `;
    } else if (seccion === 'docker') {
        seccionDiv.innerHTML = `
            <section class="intro-section">
                <h3>Configuración de Docker</h3>
                <p>En esta sección se detalla la configuración de Docker para el proyecto, incluyendo la creación de contenedores y la gestión de servicios.</p>

                <h4>1. Estructura de Contenedores</h4>
                <ul class="docker-structure">
                    <li><strong>Backend Flask:</strong> Servicio principal que maneja las peticiones HTTP</li>
                    <li><strong>OSRM Server:</strong> Servidor de rutas para Colombia</li>
                    <li><strong>Ollama Service:</strong> Servicio de IA para el chatbot</li>
                </ul>

                <h4>2. Docker Compose</h4>
                <div class="code-box">
                    <div class="code-box-content">
                        <code>docker-compose up -d</code>
                        <button class="neo-button copiar-btn" onclick="copiarTexto('docker1')">
                            <i class="fa-solid fa-copy"></i> Copiar
                        </button>
                    </div>
                </div>

                <h4>3. Gestión de Volúmenes</h4>
                <p>Los volúmenes persistentes incluyen:</p>
                <ul class="volume-list">
                    <li>Datos de mapas OSRM</li>
                    <li>Modelos de IA</li>
                    <li>Logs del sistema</li>
                </ul>

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

                <div class="diagram-container">
        <img src="/static/img/diagrama.png" alt="Diagrama de arquitectura del sistema" width="100%" height="600px">
                </div>


                <h4>Explicación del Diagrama</h4>
                <p>El diagrama muestra el flujo completo del sistema, que se divide en los siguientes componentes principales:</p>

                <h5>1. Interfaz Principal (Streamlit)</h5>
                <ul class="architecture-components">
                    <li>Punto de entrada para operadores del 911</li>
                    <li>Interfaz para visualizar colas de prioridad</li>
                    <li>Botón de llamada de emergencia para iniciar el proceso</li>
                </ul>

                <h5>2. Procesamiento de Llamadas</h5>
                <ul class="architecture-components">
                    <li><strong>Ventana de Llamada (n8n):</strong> Interfaz para la gestión de llamadas entrantes</li>
                    <li><strong>Chatbot IA:</strong> Agente inteligente que procesa la conversación</li>
                    <li><strong>Árbol de Decisión:</strong> Sistema de clasificación de emergencias</li>
                </ul>

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

                <h5>4. Módulos de Procesamiento</h5>
                <ul class="architecture-components">
                    <li><strong>Integración OpenStreetMap:</strong> Sistema de geolocalización y mapeo</li>
                    <li><strong>Módulo de Asignación de Unidades:</strong> Gestión de recursos de emergencia</li>
                    <li><strong>Módulo de Cálculo y Grafos:</strong> Implementación del algoritmo Dijkstra para rutas óptimas</li>
                </ul>

                <h5>5. Visualización y Resultados</h5>
                <ul class="architecture-components">
                    <li><strong>Chart de Tiempos:</strong> Visualización de métricas y recomendaciones</li>
                    <li><strong>Panel de Prioridad:</strong> Interfaz para gestión de colas de emergencia</li>
                </ul>

                <h4>Flujo de Trabajo</h4>
                <ol class="workflow-steps">
                    <li>El operador recibe una llamada a través de la interfaz principal</li>
                    <li>El chatbot IA procesa la conversación y extrae información clave</li>
                    <li>El árbol de decisión clasifica la emergencia según su naturaleza y prioridad</li>
                    <li>El sistema de geolocalización determina la ubicación exacta</li>
                    <li>El módulo de cálculo determina la ruta más eficiente</li>
                    <li>Se asignan las unidades más cercanas y apropiadas</li>
                    <li>Toda la información se almacena en el sistema de pilas para seguimiento</li>
                </ol>

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
    } else if (seccion === 'mapas') {
        seccionDiv.innerHTML = `
            <section class="intro-section">
                <h3>Sistema de Mapas y Rutas</h3>
                <p>El sistema utiliza OSRM y OpenStreetMap para proporcionar servicios de ruteo precisos.</p>

                <h4>1. Componentes del Sistema de Mapas</h4>
                <ul class="map-components">
                    <li><strong>OSRM Backend:</strong> Motor de cálculo de rutas</li>
                    <li><strong>OSM Data:</strong> Datos cartográficos de Colombia</li>
                    <li><strong>Geocoding Service:</strong> Conversión de direcciones a coordenadas</li>
                </ul>

                <h4>2. Actualización de Datos</h4>
                <p>Los datos se actualizan periódicamente para mantener la precisión:</p>
                <div class="code-box">
                    <div class="code-box-content">
                        <code>./update_maps.sh</code>
                        <button class="neo-button copiar-btn" onclick="copiarTexto('maps1')">
                            <i class="fa-solid fa-copy"></i> Copiar
                        </button>
                    </div>
                </div>

                <div class="button-container">
                    <button class="neo-button" onclick="mostrar('arquitectura')">
                        <ion-icon name="arrow-back-outline"></ion-icon> Anterior
                    </button>
                    <button class="neo-button" onclick="mostrar('chatbot')">
                        Siguiente <ion-icon name="arrow-forward-outline"></ion-icon>
                    </button>
                </div>
            </section>
        `;
    } else if (seccion === 'chatbot') {
        seccionDiv.innerHTML = `
            <section class="intro-section">
                <h3>Sistema de Chatbot</h3>
                <p>El chatbot utiliza Llama 3B para proporcionar respuestas inteligentes y contextualmente relevantes.</p>

                <h4>1. Capacidades del Chatbot</h4>
                <ul class="chatbot-capabilities">
                    <li>Clasificación de emergencias</li>
                    <li>Recopilación de información crítica</li>
                    <li>Instrucciones de primeros auxilios</li>
                    <li>Priorización de casos</li>
                </ul>

                <h4>2. Integración con Llama</h4>
                <p>El sistema utiliza Llama 3B para:</p>
                <ul class="llama-features">
                    <li>Procesamiento de lenguaje natural</li>
                    <li>Análisis de sentimientos</li>
                    <li>Extracción de información clave</li>
                    <li>Generación de respuestas contextuales</li>
                </ul>

                <div class="button-container">
                    <button class="neo-button" onclick="mostrar('mapas')">
                        <ion-icon name="arrow-back-outline"></ion-icon> Anterior
                    </button>
                    <button class="neo-button" onclick="mostrar('testing')">
                        Siguiente <ion-icon name="arrow-forward-outline"></ion-icon>
                    </button>
                </div>
            </section>
        `;
    } else if (seccion === 'testing') {
        seccionDiv.innerHTML = `
            <section class="intro-section">
                <h3>Pruebas del Sistema</h3>
                <p>El sistema incluye pruebas automatizadas para garantizar su funcionamiento correcto.</p>

                <h4>1. Tipos de Pruebas</h4>
                <ul class="test-types">
                    <li><strong>Unitarias:</strong> Componentes individuales</li>
                    <li><strong>Integración:</strong> Interacción entre servicios</li>
                    <li><strong>Carga:</strong> Rendimiento bajo estrés</li>
                    <li><strong>E2E:</strong> Flujos completos</li>
                </ul>

                <h4>2. Ejecución de Pruebas</h4>
                <div class="code-box">
                    <div class="code-box-content">
                        <code>python -m pytest tests/</code>
                        <button class="neo-button copiar-btn" onclick="copiarTexto('test1')">
                            <i class="fa-solid fa-copy"></i> Copiar
                        </button>
                    </div>
                </div>

                <div class="button-container">
                    <button class="neo-button" onclick="mostrar('chatbot')">
                        <ion-icon name="arrow-back-outline"></ion-icon> Anterior
                    </button>
                    <button class="neo-button" onclick="mostrar('despliegue')">
                        Siguiente <ion-icon name="arrow-forward-outline"></ion-icon>
                    </button>
                </div>
            </section>
        `;
    } else if (seccion === 'despliegue') {
        seccionDiv.innerHTML = `
            <section class="intro-section">
                <h3>Despliegue</h3>
                <p>Guía para el despliegue del sistema en producción.</p>

                <h4>1. Preparación</h4>
                <ul class="deployment-steps">
                    <li>Configuración de variables de entorno</li>
                    <li>Verificación de dependencias</li>
                    <li>Pruebas de integración</li>
                </ul>

                <h4>2. Comandos de Despliegue</h4>
                <div class="code-box">
                    <div class="code-box-content">
                        <code>./deploy.sh production</code>
                        <button class="neo-button copiar-btn" onclick="copiarTexto('deploy1')">
                            <i class="fa-solid fa-copy"></i> Copiar
                        </button>
                    </div>
                </div>

                <div class="button-container">
                    <button class="neo-button" onclick="mostrar('testing')">
                        <ion-icon name="arrow-back-outline"></ion-icon> Anterior
                    </button>
                    <button class="neo-button" onclick="mostrar('creditos')">
                        Siguiente <ion-icon name="arrow-forward-outline"></ion-icon>
                    </button>
                </div>
            </section>
        `;
    } else if (seccion === 'creditos') {
        seccionDiv.innerHTML = `
            <section class="intro-section">
                <h3>Créditos y Agradecimientos</h3>
                <p>Este proyecto fue desarrollado por el equipo de la Contestadora 911.</p>

                <h4>Equipo de Desarrollo</h4>
                <ul class="team-members">
                    <li><strong>Líder del Proyecto:</strong> [Nombre]</li>
                    <li><strong>Desarrolladores:</strong>
                        <ul>
                            <li>[Nombre 1] - Backend</li>
                            <li>[Nombre 2] - IA y Chatbot</li>
                            <li>[Nombre 3] - Sistemas de Mapas</li>
                        </ul>
                    </li>
                </ul>

                <h4>Tecnologías Utilizadas</h4>
                <ul class="technologies">
                    <li>Python / Flask</li>
                    <li>Docker / Docker Compose</li>
                    <li>OSRM / OpenStreetMap</li>
                    <li>Llama / Ollama</li>
                </ul>

                <div class="button-container">
                    <button class="neo-button" onclick="mostrar('despliegue')">
                        <ion-icon name="arrow-back-outline"></ion-icon> Anterior
                    </button>
                </div>
            </section>
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
window.addEventListener('DOMContentLoaded', () => {
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
            ticks: { stepSize: 10000 }
          }
        }
      }
    });
});

//Copiar texto
window.addEventListener('DOMContentLoaded', () => {
    // Función para copiar texto
    window.copiarTexto = function(id) {
        const texto = document.getElementById(id).textContent;
        navigator.clipboard.writeText(texto)
            .then(() => {
                const btn = document.querySelector(`[onclick="copiarTexto('${id}')"]`);
                const icon = btn.querySelector('i');
                
                // Cambiar el icono temporalmente
                icon.classList.remove('fa-copy');
                icon.classList.add('fa-check');
                
                // Volver al icono original después de 1 segundo
                setTimeout(() => {
                    icon.classList.remove('fa-check');
                    icon.classList.add('fa-copy');
                }, 1000);
            })
            .catch(err => console.error('Error al copiar: ', err));
    }
});
