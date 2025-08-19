from flask import Flask, render_template, request, jsonify, redirect, url_for
import json
import os
import random
from datetime import datetime

app = Flask(__name__)

# Archivo para guardar los resultados
RESULTS_FILE = 'resultados.json'

def load_results():
    """Carga los resultados desde el archivo JSON"""
    if os.path.exists(RESULTS_FILE):
        try:
            with open(RESULTS_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            return []
    return []

def save_result(tabla, correctas, incorrectas):
    """Guarda un resultado en el archivo JSON"""
    results = load_results()
    new_result = {
        'fecha_hora': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'tabla': tabla,
        'correctas': correctas,
        'incorrectas': incorrectas
    }
    results.append(new_result)
    
    with open(RESULTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

def generate_question(tabla, multiplicador_anterior=None):
    """Genera una pregunta aleatoria para la tabla especificada, evitando repetir la anterior"""
    multiplicador = random.randint(1, 10)
    
    # Evitar que sea la misma pregunta que la anterior
    if multiplicador_anterior is not None and multiplicador == multiplicador_anterior:
        # Si hay 10 opciones y queremos evitar una, siempre hay alternativas
        opciones = [i for i in range(1, 11) if i != multiplicador_anterior]
        multiplicador = random.choice(opciones)
    
    return {
        'multiplicando': tabla,
        'multiplicador': multiplicador,
        'resultado': tabla * multiplicador
    }

@app.route('/')
def index():
    """Página principal"""
    return render_template('index.html')

@app.route('/practica/<int:tabla>')
def practica(tabla):
    """Página de práctica para una tabla específica"""
    if tabla < 2 or tabla > 9:
        return redirect(url_for('index'))
    
    return render_template('practica.html', tabla=tabla)

@app.route('/api/pregunta/<int:tabla>')
def get_pregunta(tabla):
    """API para obtener una pregunta aleatoria"""
    multiplicador_anterior = request.args.get('anterior', type=int)
    question = generate_question(tabla, multiplicador_anterior)
    return jsonify({
        'pregunta': f"{question['multiplicando']} × {question['multiplicador']}",
        'respuesta_correcta': question['resultado'],
        'multiplicador': question['multiplicador']  # Para el siguiente request
    })

@app.route('/api/resultado', methods=['POST'])
def save_resultado():
    """API para guardar el resultado de una práctica"""
    data = request.json
    save_result(data['tabla'], data['correctas'], data['incorrectas'])
    return jsonify({'success': True})

@app.route('/historial')
def historial():
    """Página para ver el historial de resultados"""
    results = load_results()
    # Ordenar por fecha más reciente primero
    results.reverse()
    return render_template('historial.html', resultados=results)

if __name__ == '__main__':
    # Crear directorio templates si no existe
    if not os.path.exists('templates'):
        os.makedirs('templates')
    
    app.run(host="0.0.0.0", debug=True, port=5000)