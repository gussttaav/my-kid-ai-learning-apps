# 🧮 Aplicación de Práctica de Tablas de Multiplicar

Una aplicación web interactiva desarrollada con Flask para ayudar a los niños a practicar y dominar las tablas de multiplicar del 2 al 9.

## ✨ Características Mejoradas

- 📚 **Práctica por tabla específica**: Selecciona cualquier tabla del 2 al 9
- ⏰ **Temporizador inteligente**: 10 segundos por pregunta con indicador visual de tiempo
- 🎯 **20 preguntas por sesión**: Cantidad óptima para una práctica efectiva
- 💾 **Persistencia de sesión**: Continúa donde quedaste si recargas la página
- 📊 **Historial completo**: Guarda automáticamente todos tus resultados
- 📈 **Estadísticas detalladas**: Progreso por tabla, promedios y tendencias
- 🎨 **Interfaz atractiva**: Diseño colorido y amigable para niños
- 📱 **Totalmente responsive**: Funciona perfectamente en móviles y tablets

## 🚀 Instalación y Ejecución

### Requisitos
- Python 3.7 o superior
- Flask

### Paso 1: Instalar Flask
```bash
pip install flask
```

### Paso 2: Ejecutar la aplicación
```bash
python app.py
```

### Paso 3: Abrir en el navegador
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

## 🔄 Nueva Funcionalidad: Persistencia de Sesión

La aplicación ahora guarda automáticamente tu progreso durante la práctica. Si accidentalmente recargas la página:

- ✅ Tu progreso se mantiene (pregunta actual, respuestas correctas/incorrectas)
- ✅ La práctica continúa exactamente donde la dejaste
- ✅ El temporizador se reinicia (nuevos 10 segundos para la pregunta actual)
- ✅ Los resultados finales se guardan correctamente al completar la práctica

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

## 🎨 Características de Diseño

- 🌈 **Interfaz colorida y moderna** con gradientes atractivos
- 📱 **Diseño completamente responsive** para todos los dispositivos
- ⚡ **Animaciones suaves** y feedback visual inmediato
- 🎯 **Colores intuitivos** (verde=correcto, rojo=incorrecto, naranja=advertencia)
- 📊 **Visualización clara** de estadísticas y progreso
- 🔤 **Tipografía legible** y tamaño adecuado para niños

## 🛠️ Personalización

Puedes modificar fácilmente estos parámetros:

- **Tiempo por pregunta**: Cambia `tiempoRestante = 10` en la clase `PracticaTablas`
- **Número de preguntas**: Modifica `totalPreguntas = 20` en la clase JavaScript
- **Tablas disponibles**: Ajusta el rango de validación en las rutas de Flask
- **Estilos visuales**: Personaliza los colores y diseño en `base.html`

## 🔧 Solución de Problemas

### La aplicación no inicia
- Verifica que Flask esté instalado correctamente: `pip list | grep Flask`
- Asegúrate de que el puerto 5000 esté disponible
- Verifica que todos los archivos HTML estén en la carpeta `templates/`

### No se guardan los resultados
- Comprueba que Python tenga permisos de escritura en el directorio
- El archivo `resultados.json` se crea automáticamente en el primer uso

### Problemas de persistencia de sesión
- Asegúrate de que tu navegador acepte cookies y almacenamiento local
- Verifica que JavaScript esté habilitado en tu navegador

### Errores de JavaScript
- Revisa la consola del navegador (F12) para ver mensajes de error específicos
- Asegúrate de que no haya errores de sintaxis en el código

## 🎓 Consejos de Uso para Mejor Aprendizaje

Para obtener los mejores resultados:

1. **Practica regularmente**: Sesiones cortas de 10-15 minutos son más efectivas
2. **Comienza con tablas fáciles**: Empieza con las tablas del 2, 5 y 10 para ganar confianza
3. **Identifica patrones**: Enseña a reconocer patrones en las tablas (todos los resultados de la tabla del 5 terminan en 0 o 5)
4. **Celebra el progreso**: Revisa el historial para motivarse con las mejoras
5. **Enfócate en las difíciles**: Usa las estadísticas para identificar qué tablas necesitan más práctica
6. **No te frustres**: Los errores son parte natural del aprendizaje

## 🆕 Novedades en esta Versión

- **Persistencia de sesión**: No pierdes el progreso al recargar la página
- **Mejor manejo del temporizador**: Comportamiento más estable y predecible
- **Interfaz más pulida**: Pequeños ajustes visuales para mejor experiencia
- **Código optimizado**: Mayor eficiencia y menos errores potenciales

¡Diviértete aprendiendo y dominando las tablas de multiplicar!