from flask import Flask, render_template, request, jsonify
from geopy.geocoders import Nominatim
import requests
import pandas as pd
from datetime import datetime
import csv
import os
import folium

app = Flask(__name__)

# Asegurar que el directorio data existe
def asegurar_directorios():
    data_dir = os.path.join(os.path.dirname(__file__), "data")
    if not os.path.exists(data_dir):
        os.makedirs(data_dir)
    return data_dir

# Crear archivo arbol_emergencias.csv si no existe
def crear_arbol_emergencias():
    data_dir = asegurar_directorios()
    arbol_path = os.path.join(data_dir, "arbol_emergencias.csv")
    
    if not os.path.exists(arbol_path):
        datos_iniciales = {
            'palabra_clave': ['muerto', 'asesinato', 'explosion', 'incendio', 'sangre', 
                            'herido', 'accidente', 'robo', 'asalto', 'pelea', 'gritos', 'ruido'],
            'prioridad': [10, 10, 10, 9, 9, 8, 7, 6, 6, 5, 4, 3],
            'departamento': ['policía judicial', 'policía judicial', 'escuadrón antiterrorista',
                           'bomberos', 'salud', 'salud', 'tránsito', 'policía', 'policía',
                           'policía', 'vecinal', 'vecinal']
        }
        df = pd.DataFrame(datos_iniciales)
        df.to_csv(arbol_path, index=False, encoding='latin1')

# Función para consultar LLaMA
def consultar_llama(prompt):
    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={"model": "llama3", "prompt": prompt, "stream": False}
        )
        if response.status_code == 200:
            return response.json()["response"].strip()
        else:
            return "🤖 Error al consultar el modelo LLaMA."
    except Exception as e:
        return f"⚠️ Error al conectarse con Ollama: {str(e)}"

# Función para obtener coordenadas
def obtener_coordenadas(direccion):
    try:
        geolocator = Nominatim(user_agent="emergency-bot")
        location = geolocator.geocode(direccion)
        if location:
            return location.latitude, location.longitude
        return None
    except Exception as e:
        print(f"Error al obtener coordenadas: {str(e)}")
        return None

# Función para obtener ruta desde la base de emergencias
def obtener_ruta(origen_coords, destino_coords):
    try:
        url = f"http://localhost:5000/route/v1/driving/{origen_coords[1]},{origen_coords[0]};{destino_coords[1]},{destino_coords[0]}?overview=full&geometries=geojson"
        response = requests.get(url)
        
        if response.status_code == 200:
            data = response.json()
            return {
                'route': data['routes'][0]['geometry']['coordinates'],
                'distance': data['routes'][0]['distance'] / 1000,  # convertir a km
                'duration': data['routes'][0]['duration'] / 60  # convertir a minutos
            }
        return None
    except Exception as e:
        print(f"Error al obtener ruta: {str(e)}")
        return None

# Cargar árbol de decisiones
def cargar_arbol_csv():
    try:
        crear_arbol_emergencias()
        ruta_arbol = os.path.join(os.path.dirname(__file__), "data", "arbol_emergencias.csv")
        return pd.read_csv(ruta_arbol, encoding="latin1")
    except Exception as e:
        print(f"Error al cargar el árbol: {str(e)}")
        return pd.DataFrame(columns=['palabra_clave', 'prioridad', 'departamento'])

# Buscar prioridad y departamento basado en palabras clave
def buscar_prioridad_y_departamento(texto):
    texto = texto.lower()
    for _, row in arbol.iterrows():
        if str(row["palabra_clave"]).lower() in texto:
            return int(row["prioridad"]), row["departamento"]
    return 3, "Por definir"

# Guardar emergencia
def guardar_emergencia(nombre, direccion, tipo, prioridad, departamento):
    data_dir = asegurar_directorios()
    ruta_emergencias = os.path.join(data_dir, "emergencias.csv")
    
    if not os.path.exists(ruta_emergencias):
        with open(ruta_emergencias, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow(['fecha', 'nombre', 'direccion', 'tipo', 'prioridad', 'departamento'])
    
    with open(ruta_emergencias, mode="a", newline="", encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow([datetime.now(), nombre, direccion, tipo, prioridad, departamento])

@app.route('/Index')
def index():
    return render_template("Index.html")

@app.route('/chat')
def chat():
    return render_template("chat.html")

@app.route('/cola')
def cola():
    return render_template("cola.html")

@app.route('/pila')
def pila():
    return render_template("pila.html")

@app.route('/doc')
def doc():
    return render_template("doc.html")

@app.route('/procesar_mensaje', methods=['POST'])
def procesar_mensaje():
    data = request.json
    mensaje = data.get('mensaje', '')
    direccion = data.get('direccion', '')
    
    # Procesamos el mensaje usando la lógica del bot
    prioridad, departamento = buscar_prioridad_y_departamento(mensaje)
    
    # Consultamos a LLaMA para obtener una respuesta más natural
    prompt = f"Eres un asistente de emergencias 911. El usuario reporta: '{mensaje}'. Dale una respuesta empática y profesional, mencionando que la prioridad es {prioridad}/10 y que se ha asignado al departamento de {departamento}."
    respuesta_llama = consultar_llama(prompt)
    
    # Información de ruta si hay dirección
    info_ruta = None
    if direccion:
        coords_destino = obtener_coordenadas(direccion)
        if coords_destino:
            # Coordenadas de la base de emergencias (ejemplo)
            coords_base = obtener_coordenadas("Cra 46 #50-30, Medellín, Antioquia, Colombia")
            if coords_base:
                info_ruta = obtener_ruta(coords_base, coords_destino)
    
    # Guardamos la emergencia
    guardar_emergencia(
        nombre="Usuario Chat",
        direccion=direccion if direccion else "Pendiente",
        tipo=mensaje,
        prioridad=prioridad,
        departamento=departamento
    )
    
    # Preparamos la respuesta
    respuesta = {
        'mensaje': respuesta_llama,
        'prioridad': prioridad,
        'departamento': departamento,
        'ruta': info_ruta
    }
    
    return jsonify(respuesta)

# Inicializar el árbol de decisiones al inicio
arbol = cargar_arbol_csv()

if __name__ == '__main__':
    app.run(debug=True, port=8080)