#!/bin/bash

# Crear directorio para datos OSRM si no existe
mkdir -p osrm-data
cd osrm-data

# Descargar mapa de Colombia de OpenStreetMap
if [ ! -f colombia-latest.osm.pbf ]; then
    echo "Descargando mapa de Colombia..."
    wget https://download.geofabrik.de/south-america/colombia-latest.osm.pbf
fi

# Procesar el mapa con OSRM
echo "Procesando el mapa con OSRM..."
docker run -t -v "${PWD}:/data" osrm/osrm-backend osrm-extract -p /opt/car.lua /data/colombia-latest.osm.pbf
docker run -t -v "${PWD}:/data" osrm/osrm-backend osrm-partition /data/colombia-latest.osrm
docker run -t -v "${PWD}:/data" osrm/osrm-backend osrm-customize /data/colombia-latest.osrm

echo "Configuración completada. Ahora puedes iniciar el servidor OSRM con:"
echo "docker run -t -i -p 5000:5000 -v \"\${PWD}/osrm-data:/data\" osrm/osrm-backend osrm-routed --algorithm mld /data/colombia-latest.osrm" 