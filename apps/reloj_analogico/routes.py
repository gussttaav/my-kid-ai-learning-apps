from flask import Blueprint, render_template, jsonify
import random

reloj_bp = Blueprint('reloj', __name__,
                     template_folder='templates',
                     url_prefix='/reloj')


@reloj_bp.route('/')
def index():
    """Página principal de lectura de reloj"""
    return render_template('reloj_analogico/practica.html')


@reloj_bp.route('/practica')
def practica():
    """Página de práctica de lectura de reloj"""
    return render_template('reloj_analogico/practica.html')


@reloj_bp.route('/api/hora')
def get_hora():
    """API para obtener una hora aleatoria"""

    def generar_hora_aleatoria():
        """Genera una hora aleatoria con minutos específicos"""
        # Horas de 1 a 12
        hora = random.randint(1, 12)

        # Minutos en posiciones clave
        minutos_opciones = [0, 15, 30, 45]  # en punto, y cuarto, y media, menos cuarto
        minutos = random.choice(minutos_opciones)

        # Calcular ángulos para las manecillas
        angulo_minutero = minutos * 6  # 360° / 60 min = 6° por minuto
        angulo_horario = (hora % 12) * 30 + (minutos * 0.5)  # 30° por hora + 0.5° por minuto

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
            hora_display = (hora % 12) + 1  # Para "menos cuarto" se usa la hora siguiente

        return {
            'hora': hora,
            'minutos': minutos,
            'angulo_horario': round(angulo_horario, 1),
            'angulo_minutero': angulo_minutero,
            'tipo_respuesta': tipo_respuesta,
            'hora_display': hora_display
        }

    try:
        pregunta = generar_hora_aleatoria()
        return jsonify(pregunta)
    except Exception as e:
        return jsonify({'error': str(e)}), 500