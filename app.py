from flask import Flask, render_template
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-key-for-vercel')

# Importar y registrar blueprints de las aplicaciones
from apps.tablas_multiplicar.routes import tablas_bp
# from apps.suma_resta_llevadas.routes import suma_resta_bp
# from apps.reloj_analogico.routes import reloj_bp

app.register_blueprint(tablas_bp, url_prefix='/tablas')
# app.register_blueprint(suma_resta_bp, url_prefix='/suma-resta')
# app.register_blueprint(reloj_bp, url_prefix='/reloj')

@app.route('/')
def index():
    """Página principal unificada"""
    return render_template('index.html')

# Health check para Vercel
@app.route('/api/health')
def health():
    return {'status': 'ok'}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)