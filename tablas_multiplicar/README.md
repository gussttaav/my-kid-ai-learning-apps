# 🧮 Aplicación de Práctica de Tablas de Multiplicar

Una aplicación web interactiva desarrollada con Flask para ayudar a los niños a practicar y dominar las tablas de multiplicar del 2 al 9.

## 🚀 Instalación y Ejecución

### Requisitos
- Tener instalado Python 3.7 o superior

### Paso 1. Descargar el repositorio completo si no lo has hecho antes
```bash
git clone https://github.com/gussttaav/my-kid-ai-learning-apps.git
cd my-kid-ai-learning-apps/tablas_multiplicar
```

### Paso 2: Instalar Flask
```bash
pip install flask
```

### Paso 3: Ejecutar la aplicación desde el directorio tablas_multiplicar
```bash
python app.py
```

### Paso 4: Abrir en el navegador
Abre tu navegador web y ve a:
```
http://localhost:5000
```

## 🎮 Cómo usar la aplicación

1. **Página Principal**: Selecciona una tabla de multiplicar (del 2 al 9)
2. **Iniciar Práctica**: Haz clic en "¡Comenzar Práctica!"
3. **Responder**: Escribe tu respuesta y presiona Enter o haz clic en "Siguiente"
4. **Feedback inmediato**: Verás si tu respuesta es correcta o incorrecta
5. **Continuar automáticamente**: La práctica avanza después de cada respuesta
6. **Ver Resultados**: Al finalizar, verás tus estadísticas detalladas
7. **Consultar Historial**: Revisa todos tus intentos anteriores y tu progreso

## 📊 Funcionalidades de Seguimiento

### Durante la Práctica
- ⏰ **Contador regresivo visual** con cambio de color según el tiempo restante
- 📈 **Barra de progreso** que muestra el avance en tiempo real
- ✅ **Feedback inmediato** con colores intuitivos (verde=correcto, rojo=incorrecto)
- 🔄 **Transición automática** entre preguntas después de cada respuesta
- 💾 **Guardado automático** del progreso después de cada pregunta

### Resultados y Estadísticas
- 📊 **Porcentaje de aciertos** por práctica con código de colores
- 📅 **Historial completo** con fecha y hora exacta de cada práctica
- 🎯 **Estadísticas desglosadas por tabla** de multiplicar
- 📈 **Promedio general** de todas las prácticas realizadas
- 📝 **Resumen por tabla** con porcentajes de acierto específicos
- 💡 **Consejos personalizados** para mejorar el aprendizaje

## 💾 Almacenamiento de Datos

Los resultados se guardan automáticamente en un archivo JSON (`resultados.json`) que incluye:

- Fecha y hora exacta de cada práctica
- Tabla específica practicada
- Número de respuestas correctas e incorrectas
- Cálculo automático de porcentajes de acierto
- Datos estructurados para análisis estadístico

## 🛠️ Personalización

Puedes modificar fácilmente estos parámetros:

- **Tiempo por pregunta**: Cambia `tiempoRestante = 10` en la clase `PracticaTablas`
- **Número de preguntas**: Modifica `totalPreguntas = 20` en la clase JavaScript
- **Tablas disponibles**: Ajusta el rango de validación en las rutas de Flask
- **Estilos visuales**: Personaliza los colores y diseño en `base.html`


## 🎓 Consejos de Uso para Mejor Aprendizaje

Para obtener los mejores resultados:

1. **Practica regularmente**: Sesiones cortas de 10-15 minutos son más efectivas
2. **Comienza con tablas fáciles**: Empieza con las tablas del 2, 5 y 10 para ganar confianza
3. **Identifica patrones**: Enseña a reconocer patrones en las tablas (todos los resultados de la tabla del 5 terminan en 0 o 5)
4. **Celebra el progreso**: Revisa el historial para motivarse con las mejoras
5. **Enfócate en las difíciles**: Usa las estadísticas para identificar qué tablas necesitan más práctica
6. **No te frustres**: Los errores son parte natural del aprendizaje


¡Diviértete aprendiendo y dominando las tablas de multiplicar!