from flask import Blueprint, render_template

suma_resta_bp = Blueprint('suma_resta', __name__,
                          template_folder='templates',
                          static_folder='static',
                          url_prefix='/suma-resta')

@suma_resta_bp.route('/')
def index():
    return render_template('suma_resta_llevadas/practica.html')

@suma_resta_bp.route('/practica/<operacion>')
def practica(operacion):
    return render_template('suma_resta_llevadas/practica.html', operacion=operacion)