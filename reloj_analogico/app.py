from flask import Flask, render_template, request, jsonify, redirect, url_for
import json
import os
import random
from datetime import datetime

app = Flask(__name__)

# Archivo para guardar los resultados
RESULTS_FILE = 'resultados_reloj.json'

def load_results():
    """Carga los resultados desde el archivo JSON"""
    if os.path.exists(RESULTS_FILE):
        try:
            with open(RESULTS_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            return []
    return []

def save_result(correctas, incorrectas):
    """Guarda un resultado en el archivo JSON"""
    results = load_results()
    new_result = {
        'fecha_hora': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'correctas': correctas,
        'incorrectas': incorrectas
    }
    results.append(new_result)
    
    with open(RESULTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

def generate_hora_aleatoria():
    """Genera una hora aleatoria con minutero en posiciones específicas"""
    # Horas de 1 a 12
    hora = random.randint(1, 12)
    
    # Minutos solo en posiciones específicas
    minutos_opciones = [0, 15, 30, 45]  # en punto, y cuarto, y media, menos cuarto
    minutos = random.choice(minutos_opciones)
    
    # Calcular ángulos para las manecillas
    # Minutero: cada minuto son 6 grados (360°/60min)
    angulo_minutero = minutos * 6
    
    # Horario: cada hora son 30 grados + movimiento por minutos
    angulo_horario = (hora % 12) * 30 + (minutos * 0.5)
    
    # Determinar el tipo de respuesta esperada
    if minutos == 0:
        tipo_respuesta = "en punto"
        hora_display = hora
    elif minutos == 15:
        tipo_respuesta = "y cuarto"
        hora_display = hora
    elif minutos == 30:
        tipo_respuesta = "y media"
        hora_display = hora
    else:  # minutos == 45
        tipo_respuesta = "menos cuarto"
        # Para "menos cuarto" se usa la hora siguiente
        hora_display = (hora % 12) + 1
    
    return {
        'hora': hora,
        'minutos': minutos,
        'angulo_horario': angulo_horario,
        'angulo_minutero': angulo_minutero,
        'tipo_respuesta': tipo_respuesta,
        'hora_display': hora_display
    }

@app.route('/')
def index():
    """Página principal"""
    return render_template('index_reloj.html')

@app.route('/practica')
def practica():
    """Página de práctica para leer la hora"""
    return render_template('practica_reloj.html')

@app.route('/api/hora')
def get_hora():
    """API para obtener una hora aleatoria"""
    question = generate_hora_aleatoria()
    
    return jsonify({
        'hora': question['hora'],
        'minutos': question['minutos'],
        'angulo_horario': question['angulo_horario'],
        'angulo_minutero': question['angulo_minutero'],
        'tipo_respuesta': question['tipo_respuesta'],
        'hora_display': question['hora_display']
    })

@app.route('/api/resultado', methods=['POST'])
def save_resultado():
    """API para guardar el resultado de una práctica"""
    data = request.json
    save_result(data['correctas'], data['incorrectas'])
    return jsonify({'success': True})

@app.route('/historial')
def historial():
    """Página para ver el historial de resultados"""
    resultados_all = load_results()
    # Ordenar por fecha más reciente primero
    resultados_all.reverse()
    page = int(request.args.get('page', 1))
    per_page = 5
    total = len(resultados_all)
    start = (page - 1) * per_page
    end = start + per_page
    resultados = resultados_all[start:end]
    total_pages = (total + per_page - 1) // per_page

    return render_template(
        'historial_reloj.html',
        resultados=resultados,
        resultados_all=resultados_all,
        page=page,
        total_pages=total_pages
    )

if __name__ == '__main__':
    # Crear directorio templates si no existe
    if not os.path.exists('templates'):
        os.makedirs('templates')
    
    app.run(host="0.0.0.0", debug=True, port=5000)