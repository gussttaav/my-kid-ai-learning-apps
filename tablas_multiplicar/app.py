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
    if tabla == 'mixta':
        # Para práctica mixta: tablas 2-9, multiplicadores 2-9 (evitar 1 y 10)
        multiplicando = random.randint(2, 9)
        multiplicador = random.randint(2, 9)
        
        # Evitar que sea la misma pregunta que la anterior
        if multiplicador_anterior is not None:
            # multiplicador_anterior contiene tanto multiplicando como multiplicador en formato "multiplicando_multiplicador"
            try:
                prev_multiplicando, prev_multiplicador = map(int, str(multiplicador_anterior).split('_') if '_' in str(multiplicador_anterior) else [0, multiplicador_anterior])
                # Generar nueva combinación diferente
                while multiplicando == prev_multiplicando and multiplicador == prev_multiplicador:
                    multiplicando = random.randint(2, 9)
                    multiplicador = random.randint(2, 9)
            except:
                pass  # Si hay error en el parsing, continuar con la pregunta generada
        
        return {
            'multiplicando': multiplicando,
            'multiplicador': multiplicador,
            'resultado': multiplicando * multiplicador,
            'codigo': f"{multiplicando}_{multiplicador}"  # Para identificar la pregunta anterior
        }
    else:
        # Para práctica individual: tabla específica, multiplicadores 1-10
        multiplicador = random.randint(1, 10)
        
        # Evitar que sea la misma pregunta que la anterior
        if multiplicador_anterior is not None and multiplicador == multiplicador_anterior:
            # Si hay 10 opciones y queremos evitar una, siempre hay alternativas
            opciones = [i for i in range(1, 11) if i != multiplicador_anterior]
            multiplicador = random.choice(opciones)
        
        return {
            'multiplicando': tabla,
            'multiplicador': multiplicador,
            'resultado': tabla * multiplicador,
            'codigo': multiplicador
        }

@app.route('/')
def index():
    """Página principal"""
    return render_template('index.html')

@app.route('/practica/<tabla>')
def practica(tabla):
    """Página de práctica para una tabla específica o mixta"""
    if tabla == 'mixta':
        return render_template('practica.html', tabla='mixta')
    
    try:
        tabla_num = int(tabla)
        if tabla_num < 2 or tabla_num > 9:
            return redirect(url_for('index'))
        return render_template('practica.html', tabla=tabla_num)
    except ValueError:
        return redirect(url_for('index'))

@app.route('/api/pregunta/<tabla>')
def get_pregunta(tabla):
    """API para obtener una pregunta aleatoria"""
    multiplicador_anterior = request.args.get('anterior')
    
    if tabla == 'mixta':
        question = generate_question('mixta', multiplicador_anterior)
        return jsonify({
            'pregunta': f"{question['multiplicando']} × {question['multiplicador']}",
            'respuesta_correcta': question['resultado'],
            'multiplicador': question['codigo']  # Para el siguiente request
        })
    else:
        try:
            tabla_num = int(tabla)
            multiplicador_anterior_int = int(multiplicador_anterior) if multiplicador_anterior else None
            question = generate_question(tabla_num, multiplicador_anterior_int)
            return jsonify({
                'pregunta': f"{question['multiplicando']} × {question['multiplicador']}",
                'respuesta_correcta': question['resultado'],
                'multiplicador': question['codigo']  # Para el siguiente request
            })
        except ValueError:
            return jsonify({'error': 'Tabla inválida'}), 400

@app.route('/api/resultado', methods=['POST'])
def save_resultado():
    """API para guardar el resultado de una práctica"""
    data = request.json
    save_result(data['tabla'], data['correctas'], data['incorrectas'])
    return jsonify({'success': True})

@app.route('/historial')
def historial():
    with open('resultados.json', 'r') as f:
        resultados_all = json.load(f)
    resultados_all = list(reversed(resultados_all))
    page = int(request.args.get('page', 1))
    per_page = 5
    total = len(resultados_all)
    start = (page - 1) * per_page
    end = start + per_page
    resultados = resultados_all[start:end]
    total_pages = (total + per_page - 1) // per_page

    return render_template(
        'historial.html',
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