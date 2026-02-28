from flask import Blueprint, render_template, jsonify, request
import random

suma_resta_bp = Blueprint('suma_resta', __name__,
                          template_folder='templates',
                          url_prefix='/suma-resta')


@suma_resta_bp.route('/')
def index():
    """Página principal de sumas y restas"""
    return render_template('suma_resta_llevadas/practica.html', operacion=None)


@suma_resta_bp.route('/practica/<operacion>')
def practica(operacion):
    """Página de práctica para una operación específica"""
    if operacion not in ['suma', 'resta']:
        return render_template('suma_resta_llevadas/practica.html', operacion=None)
    return render_template('suma_resta_llevadas/practica.html', operacion=operacion)


@suma_resta_bp.route('/api/pregunta/<operacion>')
def get_pregunta(operacion):
    """API para obtener una pregunta aleatoria"""

    def generar_suma_con_llevadas():
        """Genera una suma que garantiza llevadas"""
        while True:
            # Número de arriba: 2 cifras (10-99)
            num1 = random.randint(10, 99)
            # Número de abajo: 1 o 2 cifras
            if random.choice([True, False]):
                num2 = random.randint(1, 9)
            else:
                num2 = random.randint(10, 99)

            # Verificar que hay llevadas
            unidades1 = num1 % 10
            unidades2 = num2 % 10

            # Para suma: debe haber al menos una llevada
            if (unidades1 + unidades2) >= 10:  # Llevada en unidades
                resultado = num1 + num2
                return {
                    'num1': num1,
                    'num2': num2,
                    'resultado': resultado,
                    'operacion': '+',
                    'digitos_resultado': len(str(resultado))
                }

    def generar_resta_con_llevadas():
        """Genera una resta que garantiza llevadas (préstamos)"""
        while True:
            num1 = random.randint(20, 99)

            if random.choice([True, False]):
                num2 = random.randint(1, 9)
            else:
                num2 = random.randint(10, min(num1 - 1, 99))

            unidades1 = num1 % 10
            unidades2 = num2 % 10

            if unidades1 < unidades2:  # Requiere préstamo
                resultado = num1 - num2
                if resultado > 0:
                    return {
                        'num1': num1,
                        'num2': num2,
                        'resultado': resultado,
                        'operacion': '-',
                        'digitos_resultado': len(str(resultado))
                    }

    try:
        if operacion == 'suma':
            pregunta = generar_suma_con_llevadas()
        elif operacion == 'resta':
            pregunta = generar_resta_con_llevadas()
        else:
            return jsonify({'error': 'Operación no válida'}), 400

        return jsonify({
            'num1': pregunta['num1'],
            'num2': pregunta['num2'],
            'operacion': pregunta['operacion'],
            'respuesta_correcta': pregunta['resultado'],
            'digitos_resultado': pregunta['digitos_resultado']
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500