# Contestadora 911 v.2

Sistema de gestión de emergencias 911 desarrollado como ABP para el programa de Ingeniería Informática, 3er semestre, en la asignatura de Estructura de Datos.

---

## Tabla de Contenidos
- [Objetivos](#objetivos)
- [Tecnologías](#tecnologías)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Docker y Mapas (OSRM)](#docker-y-mapas-osrm)
- [Arquitectura del Sistema](#arquitectura-del-sistema)
- [Mapas y Rutas](#mapas-y-rutas)
- [Chatbot](#chatbot)
- [Testing e Historial](#testing-e-historial)
- [Despliegue](#despliegue)
- [Créditos](#créditos)

---

## Objetivos
- Simular un sistema real de atención de emergencias 911, integrando conceptos de estructuras de datos (colas, pilas, árboles de decisión).
- Permitir la gestión, priorización y visualización de emergencias en tiempo real.
- Aplicar buenas prácticas de desarrollo web, UI/UX y despliegue moderno.
- Fomentar el trabajo colaborativo y el aprendizaje activo (ABP) en el contexto universitario.

## Tecnologías
- **Python 3.12+**: Backend principal con Flask.
- **Flask**: Framework web para la API y renderizado de vistas.
- **HTML5, CSS3 (Neumorfismo), JavaScript**: Frontend moderno y responsivo.
- **Docker**: Contenedores para el servidor de mapas OSRM.
- **OSRM**: Motor de rutas y mapas, ejecutado en Docker sobre WSL/Ubuntu.
- **Pandas, Geopy, Folium**: Procesamiento de datos, geocodificación y visualización de mapas.
- **Estructuras de datos**: Implementación de colas, pilas y árboles de decisión personalizados.

## Requisitos
- Python 3.12 o superior
- pip (gestor de paquetes Python)
- Docker Desktop (recomendado en Windows con WSL2 y Ubuntu)
- Git
- Acceso a internet para descargar mapas y dependencias

## Instalación
1. **Clona el repositorio:**
   ```powershell
   git clone https://github.com/Mogollo7/Contestadora-911.git
   cd 'Contestadora-911/CSS proyecto'
   ```
2. **Instala las dependencias de Python:**
   ```powershell
   pip install -r requirements.txt
   ```
3. **Configura el servidor de mapas (OSRM) usando Docker:**
   - Asegúrate de tener Docker Desktop y WSL2 con Ubuntu instalados.
   - Ejecuta el script de configuración:
     ```bash
     bash setup_osrm.sh
     ```
   - Esto descargará el mapa de Colombia y preparará los archivos necesarios.
   - Para iniciar el servidor OSRM:
     ```bash
     cd osrm-data
     docker run -t -i -p 5000:5000 -v "${PWD}:/data" osrm/osrm-backend osrm-routed --algorithm mld /data/colombia-latest.osrm
     ```
4. **Ejecuta la aplicación Flask:**
   ```powershell
   python app.py
   ```
5. **Abre tu navegador en:**
   - [http://localhost:8080/Index](http://localhost:8080/Index)

---

## Docker y Mapas (OSRM)
El sistema utiliza OSRM (Open Source Routing Machine) para calcular rutas y mostrar mapas en tiempo real. El script `setup_osrm.sh` automatiza la descarga y preparación del mapa de Colombia. El contenedor Docker expone el servicio en el puerto 5000, que es consumido por la app Flask para mostrar rutas entre la base y la emergencia reportada.

**Diagrama de arquitectura:**

![Diagrama de arquitectura](CSS%20proyecto/static/img/diagrama.png)

---

## Arquitectura del Sistema
- **Frontend:** HTML5, CSS3 (neumorfismo), JS. Navegación coherente y responsiva.
- **Backend:** Flask, lógica de negocio, API REST, renderizado de vistas.
- **Estructuras de datos:**
  - **Cola (FIFO):** Para emergencias pendientes, priorizadas por nivel de urgencia.
  - **Pila (Stack):** Para historial de emergencias atendidas.
  - **Árbol de decisión:** Para determinar prioridad y departamento según el reporte.
- **Persistencia:** Archivos CSV (`emergencias.csv`, `historial.csv`).
- **Mapas:** OSRM en Docker, integración con Folium y geocodificación con Geopy.

---

## Mapas y Rutas
- El usuario reporta una emergencia con dirección.
- El sistema geocodifica la dirección y calcula la mejor ruta desde la base del departamento asignado usando OSRM.
- El mapa y la ruta se muestran en la interfaz de historial y detalles.

---

## Chatbot
- Permite reportar emergencias de forma conversacional.
- Utiliza lógica de árbol de decisión para asignar prioridad y departamento.
- Responde de forma empática y profesional.

---

## Testing e Historial
- El historial de emergencias atendidas se almacena en `data/historial.csv`.
- Puedes validar el correcto funcionamiento del sistema revisando este archivo tras atender emergencias.
- El sistema permite visualizar el historial en la interfaz y exportar los datos si es necesario.

---

## Despliegue
- El sistema está pensado para ejecutarse localmente, pero puede desplegarse en cualquier servidor compatible con Python y Docker.
- Se recomienda mantener Docker y OSRM activos para la funcionalidad de mapas.

---

## Créditos
- Desarrollado por:
  - [@Mogollo7](https://github.com/Mogollo7)
  - [@Brandsete](https://github.com/Brandsete)
  - [@ALEKSITOooo](https://github.com/ALEKSITOooo)
- Proyecto académico para Ingeniería Informática, 3er semestre, Estructura de Datos.

## Enlace al proyecto en Deepwiki

Puedes consultar la sección de *data management* en Deepwiki aquí:  
[Contestadora 911 - Data Management](https://deepwiki.com/Mogollo7/Contestadora-911/4-data-management)


