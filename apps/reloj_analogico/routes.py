from flask import Blueprint, render_template

reloj_bp = Blueprint('reloj', __name__,
                     template_folder='templates',
                     static_folder='static',
                     url_prefix='/reloj')

@reloj_bp.route('/')
def index():
    return render_template('reloj_analogico/practica.html')

@reloj_bp.route('/practica')
def practica():
    return render_template('reloj_analogico/practica.html')