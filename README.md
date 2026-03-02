# 🎓 Aplicaciones Educativas para mi Niño

![Version](https://img.shields.io/badge/version-2.0-blue)
![Flask](https://img.shields.io/badge/Flask-2.3-green)
![Vercel](https://img.shields.io/badge/deploy-Vercel-black)

Una colección personal de aplicaciones web educativas unificadas en una sola plataforma, creadas con ❤️ para apoyar el aprendizaje de mi hijo. Ahora disponible como una aplicación única, fácil de desplegar y usar desde cualquier lugar.

**[🌐 Demo en Vivo](https://my-kid-ai-learning-apps.vercel.app)** | **[📖 Documentación](#)** | **[🐛 Reportar un Problema](https://github.com/gussttaav/my-kid-ai-learning-apps/issues)**

---

## 📋 Tabla de Contenidos
- [La Historia Detrás del Proyecto](#-la-historia-detrás-del-proyecto)
- [Aplicaciones Disponibles](#-aplicaciones-disponibles)
- [Características Principales](#-características-principales)
- [Instalación y Despliegue](#-instalación-y-despliegue)
  - [Ejecución Local](#ejecución-local)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Guía para Desarrolladores](#-guía-para-desarrolladores)
  - [Añadir una Nueva Aplicación](#añadir-una-nueva-aplicación)
  - [Personalización](#personalización)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Próximas Mejoras](#-próximas-mejoras)
- [Licencia](#-licencia)
- [Una Nota Personal](#-una-nota-personal)

---

## 💝 La Historia Detrás del Proyecto

Como padre, siempre busco maneras creativas y efectivas de ayudar a mi niño con sus estudios. Cuando vi que necesitaba más práctica con las tablas de multiplicar, decidí crear algo especial: aplicaciones web interactivas que fueran divertidas, educativas y que realmente funcionaran.

Con la ayuda de inteligencia artificial, he desarrollado estas herramientas pensando específicamente en las necesidades de aprendizaje de mi hijo. Lo que comenzó como una colección de aplicaciones separadas, ahora es una **plataforma educativa unificada** que centraliza todas las actividades de aprendizaje en un solo lugar.

**¿Por qué hacerlo público?** Porque sé que no soy el único padre que quiere herramientas educativas de calidad, sin anuncios, sin suscripciones y sin complicaciones.

---

## 📚 Aplicaciones Disponibles

| Aplicación | Descripción | Tiempo por Pregunta |
|------------|-------------|---------------------|
| **🧮 Tablas de Multiplicar** | Practica las tablas del 2 al 9 o desafío mixto (2×2 al 9×9) | 10 segundos |
| **➕➖ Sumas y Restas con Llevadas** | Domina las llevadas y préstamos paso a paso | 25 segundos |
| **🕐 Lectura de Reloj Analógico** | Aprende a leer la hora en relojes de manecillas | 30 segundos |

### Características Comunes
- ✅ **20 preguntas por sesión** - Suficientes para practicar sin abrumar
- ✅ **Temporizador visual** - Con cambio de color al acercarse al límite
- ✅ **Feedback inmediato** - Respuesta correcta/incorrecta al instante
- ✅ **Progreso en tiempo real** - Barra de progreso y contador de preguntas
- ✅ **Resultados al finalizar** - Estadísticas completas de la sesión
- ✅ **Guardado en sesión** - Continúa donde lo dejaste si recargas la página

---

## ✨ Características Principales

### Para Padres y Educadores
- **📱 Totalmente responsivo** - Funciona en móviles, tablets y ordenadores
- **🔒 Sin registro** - Tus hijos pueden usar la app inmediatamente
- **🎨 Diseño atractivo** - Interfaz colorida y amigable para niños
- **📊 Seguimiento por sesión** - Resultados disponibles al finalizar cada práctica

### Para Desarrolladores
- **🏗️ Arquitectura modular** con Blueprints de Flask
- **📁 Estructura organizada** por tipo de aplicación
- **💾 Persistencia en sesión** usando `sessionStorage`
- **🎯 Clase base JavaScript** para todas las prácticas
- **🎨 CSS unificado** con componentes reutilizables
- **⚡ Preparado para serverless** (Vercel, Netlify, etc.)

---

## 🚀 Instalación y Despliegue

### Requisitos Previos
- Python 3.7 o superior
- pip (gestor de paquetes de Python)
- Git (opcional, para clonar)

### Ejecución Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/gussttaav/my-kid-ai-learning-apps.git
cd my-kid-ai-learning-apps

# 2. Instalar dependencias
pip install -r requirements.txt

# 3. Ejecutar la aplicación
python app.py

# 4. Abrir en el navegador
# http://localhost:5000
```

---

## 📁 Estructura del Proyecto

```
my-kid-ai-learning-apps/
├── app.py                    # Aplicación Flask principal
├── requirements.txt          # Dependencias
├── vercel.json               # Configuración para Vercel
├── README.md                  # Este archivo
├── apps/                      # Módulos de las aplicaciones
│   ├── __init__.py
│   ├── tablas_multiplicar/
│   │   ├── __init__.py
│   │   └── routes.py
│   ├── suma_resta_llevadas/
│   │   ├── __init__.py
│   │   └── routes.py
│   └── reloj_analogico/
│       ├── __init__.py
│       └── routes.py
├── static/                    # Archivos estáticos
│   ├── css/
│   │   ├── base.css           # Estilos base (reset, header, footer)
│   │   └── components.css     # Componentes reutilizables
│   └── js/
│       ├── practica-base.js   # Clase base para todas las prácticas
│       ├── tablas.js          # Lógica específica de tablas
│       ├── suma-resta.js      # Lógica específica de sumas/restas
│       └── reloj.js           # Lógica específica del reloj
└── templates/                  # Plantillas HTML
    ├── base.html              # Plantilla base
    ├── index.html             # Página principal unificada
    ├── tablas_multiplicar/
    │   └── practica.html      # Práctica de tablas
    ├── suma_resta_llevadas/
    │   └── practica.html      # Práctica de sumas/restas
    └── reloj_analogico/
        └── practica.html      # Práctica del reloj
```

---

## 🛠️ Guía para Desarrolladores

### Añadir una Nueva Aplicación

#### Paso 1: Crear el módulo
```python
# apps/mi_nueva_app/routes.py
from flask import Blueprint, render_template

mi_app_bp = Blueprint('mi_app', __name__, 
                      template_folder='templates',
                      static_folder='static',
                      url_prefix='/mi-app')

@mi_app_bp.route('/')
def index():
    return render_template('mi_nueva_app/practica.html')

@mi_app_bp.route('/practica/<parametro>')
def practica(parametro):
    return render_template('mi_nueva_app/practica.html', param=parametro)
```

#### Paso 2: Registrar en app.py
```python
# app.py
from apps.mi_nueva_app.routes import mi_app_bp
app.register_blueprint(mi_app_bp)
```

#### Paso 3: Crear plantilla
```html
<!-- templates/mi_nueva_app/practica.html -->
{% extends "base.html" %}

{% block content %}
<!-- Tu contenido específico -->
{% endblock %}

{% block scripts %}
<script src="{{ url_for('static', filename='js/mi-app.js') }}"></script>
{% endblock %}
```

#### Paso 4: Añadir JavaScript específico
```javascript
// static/js/mi-app.js
class MiNuevaPractica extends PracticaBase {
    constructor(param) {
        super({
            tiempoPorPregunta: 15,
            totalPreguntas: 20,
            nombre: `mi_app_${param}`
        });
        // Tu lógica específica
    }
}
```

#### Paso 5: Añadir tarjeta en index.html
```html
<!-- templates/index.html -->
<div class="app-card">
    <div class="card-header tu-color">
        <span class="emoji-icon">✨</span>
        <h3>Mi Nueva App</h3>
    </div>
    <div class="card-body">
        <p>Descripción de la aplicación</p>
    </div>
    <div class="card-actions">
        <a href="/mi-app" class="btn btn-primary">Comenzar</a>
    </div>
</div>
```

### Personalización

#### Cambiar colores
```css
/* static/css/components.css */
.card-header.tu-color {
    background: linear-gradient(135deg, #tu-color1 0%, #tu-color2 100%);
}
```

#### Modificar tiempos por pregunta
```javascript
// En cada clase específica
super({
    tiempoPorPregunta: 20,  // Nuevo tiempo en segundos
    totalPreguntas: 15,      // Nuevo número de preguntas
    nombre: 'mi_practica'
});
```

---

## 🛠️ Tecnologías Utilizadas

### Backend
- **Flask 2.3** - Framework web minimalista
- **Python 3.7+** - Lenguaje de programación
- **Blueprint** - Modularización de rutas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos con variables CSS y gradientes
- **JavaScript (ES6+)** - Lógica interactiva
- **SessionStorage** - Persistencia en sesión

### DevOps
- **Vercel** - Plataforma de despliegue serverless
- **Git** - Control de versiones

---

## 🚧 Próximas Mejoras

Basadas en la experiencia con mi hijo:

- [ ] **🎵 Efectos de sonido opcionales** - Feedback auditivo (activar/desactivar)
- [ ] **🏆 Sistema simple de logros** - Motivación sin ser adictivo
- [ ] **📱 Mejor experiencia táctil** - Gestos y controles optimizados para móvil
- [ ] **👨‍👩‍👧‍👦 Perfiles múltiples** - Seguimiento separado para varios hijos
- [ ] **📊 Estadísticas avanzadas** - Gráficos de progreso con Chart.js
- [ ] **🌙 Modo oscuro** - Para practicar por la noche
- [ ] **🔤 Más actividades** - Lectoescritura, geografía, inglés

---

## 📜 Licencia

Este proyecto está bajo la **Licencia MIT** - ver el archivo [LICENSE](LICENSE) para detalles completos.

En palabras sencillas: **puedes hacer lo que quieras con este código**
- ✅ Usarlo en tu casa con tus hijos
- ✅ Modificarlo para adaptarlo a tus necesidades
- ✅ Compartirlo con otros padres
- ✅ Usarlo comercialmente si quieres
- ✅ Desplegarlo en tu propio servidor

La única condición es mantener el aviso de copyright original.

---

## 💌 Una Nota Personal

Si eres padre o madre y estas aplicaciones te ayudan con la educación de tus hijos, me hace muy feliz saberlo. No dudes en contactarme para contarme cómo las usas o qué mejoras te gustaría ver.

Al final, todos queremos lo mismo: **que nuestros niños aprendan de manera efectiva y se diviertan haciéndolo.**

> "El aprendizaje no es un espectáculo, sino un viaje de descubrimiento. Cada pequeño paso cuenta."

**De padre a padre: ¡que estas aplicaciones ayuden a tus niños tanto como han ayudado al mío!** 🎓❤️

---

## 📬 Contacto

- **GitHub**: [@gussttaav](https://github.com/gussttaav)
- **Issues**: [Reportar un problema](https://github.com/gussttaav/my-kid-ai-learning-apps/issues)
- **Discusiones**: [Compartir ideas](https://github.com/gussttaav/my-kid-ai-learning-apps/discussions)