import streamlit as st
from geopy.geocoders import Nominatim
import requests
import folium
from streamlit_folium import folium_static
import csv
from datetime import datetime
import os
import pandas as pd

st.set_page_config(page_title="Bot 911 + Rutas", layout="wide")
st.title("🚨 Asistente 911 + Mapa de Emergencia v 2.0")

#  Inicialización de memoria conversacional
if "messages" not in st.session_state:
    st.session_state.messages = []

for var in ["nombre", "direccion", "tipo", "prioridad", "departamento"]:
    if var not in st.session_state:
        st.session_state[var] = None

# Función para consultar LLaMA 3 local vía Ollama
def consultar_ollama(prompt):
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

# Cargar árbol de decisiones
def cargar_arbol_csv():
    try:
        return pd.read_csv("arbol_emergencias.csv", encoding="latin1")
    except FileNotFoundError:
        raise FileNotFoundError("❌ No se encontró el archivo arbol_emergencias.csv.")
    except UnicodeDecodeError:
        raise UnicodeDecodeError("❌ Error al leer el archivo. Intenta con otra codificación como 'utf-8-sig' o 'latin1'.")

arbol = cargar_arbol_csv()

# Buscar prioridad y departamento basado en palabras clave
def buscar_prioridad_y_departamento(texto):
    texto = texto.lower()
    for _, row in arbol.iterrows():
        if row["palabra_clave"] in texto:
            return int(row["prioridad"]), row["departamento"]
    return 3, "Por definir"

# Guardar emergencia
def guardar_emergencia(nombre, direccion, tipo, prioridad, departamento):
    with open("emergencias.csv", mode="a", newline="") as file:
        writer = csv.writer(file)
        writer.writerow([datetime.now(), nombre, direccion, tipo, prioridad, departamento])  # historial basico

# Entrada del usuario
entrada = st.chat_input("Describe la emergencia o responde al chatbot...")
if entrada:
    st.session_state.messages.append({"role": "user", "content": entrada})

    if st.session_state.nombre is None:
        st.session_state.nombre = entrada.strip()
        respuesta = consultar_ollama(f"Eres un asistente de emergencias 911. El usuario acaba de decir: '{entrada}'. Respóndele amablemente pidiéndole su ubicación exacta.")
        st.session_state.messages.append({"role": "assistant", "content": respuesta})

    elif st.session_state.direccion is None:
        st.session_state.direccion = entrada.strip()
        respuesta = consultar_ollama(f"El usuario está en '{entrada}'. Pregunta con amabilidad qué tipo de emergencia está ocurriendo.")
        st.session_state.messages.append({"role": "assistant", "content": respuesta})

    elif st.session_state.tipo is None:
        st.session_state.tipo = entrada.strip()
        prioridad, departamento = buscar_prioridad_y_departamento(st.session_state.tipo)
        st.session_state.prioridad = prioridad
        st.session_state.departamento = departamento

        guardar_emergencia(
            st.session_state.nombre,
            st.session_state.direccion,
            st.session_state.tipo,
            prioridad,
            departamento
        )

        resumen = (
            f"📝 **Resumen de la emergencia**\n"
            f"- 👤 Nombre: {st.session_state.nombre}\n"
            f"- 📍 Dirección: {st.session_state.direccion}\n"
            f"- 🚨 Tipo: {st.session_state.tipo}\n"
            f"- 🔥 Prioridad: {prioridad}/10\n"
            f"- 🧭 Departamento asignado: {departamento}"
        )
        st.session_state.messages.append({"role": "assistant", "content": resumen})

        respuesta = consultar_ollama("Dile al usuario que se está calculando la ruta hacia su ubicación y que mantenga la calma.")
        st.session_state.messages.append({"role": "assistant", "content": respuesta})

# Mostrar mensajes del chat
for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])

# Mostrar mapa si hay dirección
if st.session_state.direccion:
    try:
        geolocator = Nominatim(user_agent="streamlit-bot911")
        destino_location = geolocator.geocode(st.session_state.direccion)
        base_emergencia = "Cra 46 #50-30, Medellín, Antioquia, Colombia" # se debe de mejorar para que con el arbol de desiciones se escoja la direcion
        origen_location = geolocator.geocode(base_emergencia)

        if destino_location and origen_location:
            orig_coords = (origen_location.latitude, origen_location.longitude)
            dest_coords = (destino_location.latitude, destino_location.longitude)

            url = f"http://localhost:5000/route/v1/driving/{orig_coords[1]},{orig_coords[0]};{dest_coords[1]},{dest_coords[0]}?overview=full&geometries=geojson"
            response = requests.get(url)

            if response.status_code == 200:
                data = response.json()
                route = data['routes'][0]['geometry']['coordinates']
                distancia_km = data['routes'][0]['distance'] / 1000
                duracion_min = data['routes'][0]['duration'] / 60

                st.subheader("🗺️ Ruta desde base de emergencias")
                st.info(f"📏 Distancia: {distancia_km:.2f} km")
                st.info(f"⏱️ Duración estimada: {duracion_min:.2f} minutos")

                m = folium.Map(location=orig_coords, zoom_start=13)
                folium.Marker(location=orig_coords, popup="Base de Emergencias", icon=folium.Icon(color="green")).add_to(m)
                folium.Marker(location=dest_coords, popup="Emergencia", icon=folium.Icon(color="red")).add_to(m)
                folium.PolyLine(locations=[(lat, lon) for lon, lat in route], color="blue").add_to(m)

                folium_static(m)
            else:
                st.error("❌ No se pudo obtener la ruta desde el servidor OSRM.")
        else:
            st.error("❌ No se pudieron geolocalizar las direcciones.")
    except Exception as e:
        st.error(f"⚠️ Error al procesar el mapa: {str(e)}")
