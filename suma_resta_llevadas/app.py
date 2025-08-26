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

def save_result(operacion, correctas, incorrectas):
    """Guarda un resultado en el archivo JSON"""
    results = load_results()
    new_result = {
        'fecha_hora': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'operacion': operacion,
        'correctas': correctas,
        'incorrectas': incorrectas
    }
    results.append(new_result)
    
    with open(RESULTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

def generate_suma_con_llevadas():
    """Genera una suma que garantiza llevadas"""
    while True:
        # Número de arriba: 2 cifras (10-99)
        num1 = random.randint(10, 99)
        # Número de abajo: 1 o 2 cifras
        if random.choice([True, False]):  # 50% probabilidad de 1 cifra
            num2 = random.randint(1, 9)
        else:
            num2 = random.randint(10, 99)
        
        # Verificar que hay llevadas
        unidades1 = num1 % 10
        unidades2 = num2 % 10
        
        decenas1 = num1 // 10
        decenas2 = num2 // 10
        
        # Para suma: debe haber al menos una llevada
        llevada_unidades = (unidades1 + unidades2) >= 10
        llevada_decenas = False
        
        if num2 >= 10:  # Solo si el segundo número tiene decenas
            llevada_decenas = (decenas1 + decenas2 + (1 if llevada_unidades else 0)) >= 10
        
        if llevada_unidades:  # Al menos llevada en unidades
            resultado = num1 + num2
            return {
                'num1': num1,
                'num2': num2,
                'resultado': resultado,
                'operacion': '+',
                'digitos_resultado': len(str(resultado))
            }

def generate_resta_con_llevadas():
    """Genera una resta que garantiza llevadas (prestamos)"""
    while True:
        # Para garantizar llevadas, el primer número debe ser mayor
        # y debe requerir préstamo
        num1 = random.randint(20, 99)  # Empezamos desde 20 para garantizar prestamos
        
        # El segundo número puede ser de 1 o 2 cifras
        if random.choice([True, False]):
            num2 = random.randint(1, 9)
        else:
            num2 = random.randint(10, min(num1 - 1, 99))  # Asegurar que num1 > num2
        
        # Verificar que requiere préstamo
        unidades1 = num1 % 10
        unidades2 = num2 % 10
        
        # Para resta: debe requerir préstamo en unidades
        if unidades1 < unidades2:  # Requiere préstamo
            resultado = num1 - num2
            if resultado > 0:  # Asegurar resultado positivo
                return {
                    'num1': num1,
                    'num2': num2,
                    'resultado': resultado,
                    'operacion': '-',
                    'digitos_resultado': len(str(resultado))
                }

@app.route('/')
def index():
    """Página principal"""
    return render_template('index.html')

@app.route('/practica/<operacion>')
def practica(operacion):
    """Página de práctica para una operación específica"""
    if operacion not in ['suma', 'resta']:
        return redirect(url_for('index'))
    
    return render_template('practica.html', operacion=operacion)

@app.route('/api/pregunta/<operacion>')
def get_pregunta(operacion):
    """API para obtener una pregunta aleatoria"""
    if operacion == 'suma':
        question = generate_suma_con_llevadas()
    elif operacion == 'resta':
        question = generate_resta_con_llevadas()
    else:
        return jsonify({'error': 'Operación no válida'})
    
    return jsonify({
        'num1': question['num1'],
        'num2': question['num2'],
        'operacion': question['operacion'],
        'respuesta_correcta': question['resultado'],
        'digitos_resultado': question['digitos_resultado']
    })

@app.route('/api/resultado', methods=['POST'])
def save_resultado():
    """API para guardar el resultado de una práctica"""
    data = request.json
    save_result(data['operacion'], data['correctas'], data['incorrectas'])
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