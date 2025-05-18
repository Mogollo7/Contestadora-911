from flask import Flask, render_template, request, jsonify
from geopy.geocoders import Nominatim
import requests
import pandas as pd
from datetime import datetime
import csv
import os
import folium
import hashlib
from decision_tree import get_prioridad_departamento
import shutil

app = Flask(__name__)

ESTACIONES = {
    'bomberos': "Cl. 142a Sur #50 - 25, Caldas, Antioquia",
    'policía': "Cl. 138b Sur #46-94, Caldas, Antioquia",
    'salud': "Carrera 48 #135 SUR - 41",
    'tránsito': "Cra. 48 #129 - 59, Caldas, Antioquia",
    'vecinal': "Cl. 138b Sur #46-94, Caldas, Antioquia",
    'policía judicial': "Cl. 138b Sur #46-94, Caldas, Antioquia",
    'escuadrón antiterrorista': "Cl. 71 #65-20, El Progreso, Medellín, Castilla, Medellín, Antioquia"
}

def asegurar_directorios():
    data_dir = os.path.join(os.path.dirname(__file__), "data")
    if not os.path.exists(data_dir):
        os.makedirs(data_dir)
    return data_dir

def generar_id(nombre, direccion, tipo, fecha):
    raw = f"{nombre}{direccion}{tipo}{fecha}".encode('utf-8')
    return hashlib.sha256(raw).hexdigest()

def guardar_emergencia(id_emergencia, fecha, nombre, direccion, tipo, prioridad, departamento, base):
    data_dir = asegurar_directorios()
    ruta_emergencias = os.path.join(data_dir, "emergencias.csv")
    existe = os.path.exists(ruta_emergencias)
    with open(ruta_emergencias, 'a', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        if not existe:
            writer.writerow(['id', 'fecha', 'nombre', 'direccion', 'tipo', 'prioridad', 'departamento', 'base'])
        writer.writerow([id_emergencia, fecha, nombre, direccion, tipo, prioridad, departamento, base])

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

def obtener_ruta(origen_coords, destino_coords):
    try:
        url = f"http://localhost:5000/route/v1/driving/{origen_coords[1]},{origen_coords[0]};{destino_coords[1]},{destino_coords[0]}?overview=full&geometries=geojson"
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            return {
                'route': data['routes'][0]['geometry']['coordinates'],
                'distance': data['routes'][0]['distance'] / 1000,
                'duration': data['routes'][0]['duration'] / 60
            }
        return None
    except Exception as e:
        print(f"Error al obtener ruta: {str(e)}")
        return None

def limpiar_emergencias_y_guardar_historial():
    data_dir = asegurar_directorios()
    ruta_emergencias = os.path.join(data_dir, "emergencias.csv")
    ruta_historial = os.path.join(data_dir, "historial.csv")
    # Si existe emergencias.csv y tiene datos, los agregamos a historial.csv
    if os.path.exists(ruta_emergencias):
        with open(ruta_emergencias, 'r', encoding='utf-8') as f:
            lineas = f.readlines()
        if len(lineas) > 1:  # Si hay datos además de la cabecera
            # Si historial.csv no existe, escribe la cabecera
            if not os.path.exists(ruta_historial):
                with open(ruta_historial, 'w', encoding='utf-8') as h:
                    h.write(lineas[0])
            # Añade los datos (sin la cabecera)
            with open(ruta_historial, 'a', encoding='utf-8') as h:
                for linea in lineas[1:]:
                    h.write(linea)
    # Limpiar emergencias.csv (dejar solo la cabecera)
    with open(ruta_emergencias, 'w', encoding='utf-8') as f:
        f.write('id,fecha,nombre,direccion,tipo,prioridad,departamento,base\n')

# Llamar a la función al iniciar el programa
limpiar_emergencias_y_guardar_historial()

@app.route('/procesar_mensaje', methods=['POST'])
def procesar_mensaje():
    data = request.json
    mensaje = data.get('mensaje', '')
    direccion = data.get('direccion', '')
    nombre = data.get('nombre', 'Usuario Chat')

    prioridad, departamento = get_prioridad_departamento(mensaje)
    fecha = datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
    base = ESTACIONES.get(departamento.lower(), "CALLE 142 A SUR CARRERA 50 25 CALDAS Antioquia")
    id_emergencia = generar_id(nombre, direccion, mensaje, fecha)

    # Guardar emergencia
    guardar_emergencia(id_emergencia, fecha, nombre, direccion, mensaje, prioridad, departamento, base)

    # Respuesta de LLaMA
    prompt = f"Eres un asistente de emergencias 911. El usuario reporta: '{mensaje}'. Dale una respuesta empática y profesional, mencionando que la prioridad es {prioridad}/10 y que se ha asignado al departamento de {departamento}."
    respuesta_llama = consultar_llama(prompt)

    # Ruta
    info_ruta = None
    if direccion:
        coords_destino = obtener_coordenadas(direccion)
        coords_base = obtener_coordenadas(base)
        if coords_destino and coords_base:
            info_ruta = obtener_ruta(coords_base, coords_destino)

    respuesta = {
        'mensaje': respuesta_llama,
        'prioridad': prioridad,
        'departamento': departamento,
        'ruta': info_ruta,
        'id': id_emergencia
    }
    return jsonify(respuesta)

@app.route('/Index')
def index():
    return render_template("Index.html")

@app.route('/chat')
def chat():
    return render_template("chat.html")

@app.route('/cola')
def cola():
    data_dir = asegurar_directorios()
    ruta_emergencias = os.path.join(data_dir, "emergencias.csv")
    departamentos = [
        'policía',
        'bomberos',
        'salud',
        'tránsito',
        'vecinal',
        'policía judicial',
        'escuadrón antiterrorista'
    ]
    conteo = {dep: 0 for dep in departamentos}

    if os.path.exists(ruta_emergencias):
        df = pd.read_csv(ruta_emergencias)
        for dep in df['departamento']:
            dep = str(dep).strip().lower()
            if dep in conteo:
                conteo[dep] += 1
    return render_template("cola.html", conteo=conteo)

@app.route('/pila')
def pila():
    return render_template("pila.html")

@app.route('/doc')
def doc():
    return render_template("doc.html")

@app.route('/mapa/<id_emergencia>')
def mapa(id_emergencia):
    data_dir = asegurar_directorios()
    ruta_emergencias = os.path.join(data_dir, "emergencias.csv")
    df = pd.read_csv(ruta_emergencias)

    # Buscar la fila correspondiente al id
    fila = df[df['id'] == id_emergencia]
    if fila.empty:
        return "ID de emergencia no encontrado", 404

    fila = fila.iloc[0]
    direccion_usuario = fila['direccion']
    base = fila['base']

    coords_usuario = obtener_coordenadas(direccion_usuario)
    coords_base = obtener_coordenadas(base)

    if not coords_usuario or not coords_base:
        return "No se pudieron obtener las coordenadas para el mapa", 400

    # Crear el mapa con Folium
    m = folium.Map(location=coords_usuario, zoom_start=14)
    folium.Marker(coords_usuario, tooltip="Emergencia", icon=folium.Icon(color='red')).add_to(m)
    folium.Marker(coords_base, tooltip="Base", icon=folium.Icon(color='blue')).add_to(m)

    ruta = obtener_ruta(coords_base, coords_usuario)
    if ruta:
        folium.PolyLine(
            locations=[(lat, lon) for lon, lat in ruta['route']],
            color='blue',
            weight=5
        ).add_to(m)

    # Renderizar el mapa como HTML
    return m._repr_html_()

if __name__ == '__main__':
    app.run(debug=True, port=8080)