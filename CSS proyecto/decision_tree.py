import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import LabelEncoder

def entrenar_arbol(df):
    
    X = df[['priority', 'emergency_type']]
    y = df['response_department']
    
    le_emergency = LabelEncoder()
    X['emergency_type_encoded'] = le_emergency.fit_transform(X['emergency_type'])
    X = X.drop(columns=['emergency_type'])
    
    le_response = LabelEncoder()
    y_encoded = le_response.fit_transform(y)
    
    clf = DecisionTreeClassifier(random_state=42)
    clf.fit(X, y_encoded)
    
    return clf, le_emergency, le_response

def predecir_ruta(clf, le_emergency, le_response, call):

    emergency_encoded = le_emergency.transform([call['emergency_type']])[0]
    X_pred = np.array([[call['priority'], emergency_encoded]])
    pred_encoded = clf.predict(X_pred)[0]
    return le_response.inverse_transform([pred_encoded])[0]

def get_prioridad_departamento(tipo):
    tipo = tipo.lower()
    arbol = [
        ('muerto', 10, 'policía judicial'),
        ('asesinato', 10, 'policía judicial'),
        ('explosion', 10, 'escuadrón antiterrorista'),
        ('incendio', 9, 'bomberos'),
        ('sangre', 9, 'salud'),
        ('herido', 8, 'salud'),
        ('accidente', 7, 'tránsito'),
        ('robo', 6, 'policía'),
        ('asalto', 6, 'policía'),
        ('pelea', 5, 'policía'),
        ('gritos', 4, 'vecinal'),
        ('ruido', 3, 'vecinal'),
    ]
    for palabra, prioridad, departamento in arbol:
        if palabra in tipo:
            return prioridad, departamento
    return 1, 'Por definir'

