from flask import Blueprint, render_template

tablas_bp = Blueprint('tablas', __name__, 
                      template_folder='templates',
                      url_prefix='/tablas')

@tablas_bp.route('/')
def index():
    """Página principal de tablas de multiplicar"""
    return render_template('tablas_multiplicar/practica.html', tabla_actual=None)

@tablas_bp.route('/practica/<tabla>')
def practica(tabla):
    """Página de práctica para una tabla específica"""
    if tabla not in ['mixta'] + [str(i) for i in range(2, 10)]:
        return render_template('tablas_multiplicar/practica.html', tabla_actual=None)
    return render_template('tablas_multiplicar/practica.html', tabla_actual=tabla)

# API endpoints para las preguntas (sin persistencia)
@tablas_bp.route('/api/pregunta/<tabla>')
def get_pregunta(tabla):
    """API para obtener una pregunta aleatoria"""
    from flask import jsonify, request
    import random
    
    multiplicador_anterior = request.args.get('anterior')
    
    if tabla == 'mixta':
        # Para práctica mixta: tablas 2-9, multiplicadores 2-9
        multiplicando = random.randint(2, 9)
        multiplicador = random.randint(2, 9)
        
        # Evitar repetir la misma pregunta
        if multiplicador_anterior:
            try:
                prev_multiplicando, prev_multiplicador = map(int, multiplicador_anterior.split('_'))
                while multiplicando == prev_multiplicando and multiplicador == prev_multiplicador:
                    multiplicando = random.randint(2, 9)
                    multiplicador = random.randint(2, 9)
            except:
                pass
        
        return jsonify({
            'pregunta': f"{multiplicando} × {multiplicador}",
            'respuesta_correcta': multiplicando * multiplicador,
            'multiplicador': f"{multiplicando}_{multiplicador}"
        })
    else:
        try:
            tabla_num = int(tabla)
            # Para tabla específica: multiplicadores 1-10
            multiplicador = random.randint(1, 10)
            
            # Evitar repetir el mismo multiplicador
            if multiplicador_anterior and multiplicador == int(multiplicador_anterior):
                opciones = [i for i in range(1, 11) if i != int(multiplicador_anterior)]
                multiplicador = random.choice(opciones)
            
            return jsonify({
                'pregunta': f"{tabla_num} × {multiplicador}",
                'respuesta_correcta': tabla_num * multiplicador,
                'multiplicador': multiplicador
            })
        except ValueError:
            return jsonify({'error': 'Tabla inválida'}), 400