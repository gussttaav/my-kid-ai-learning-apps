# 🧮 Aplicación de Práctica de Sumas y Restas

Una aplicación web interactiva desarrollada con Flask para ayudar a los niños a practicar y dominar las sumas y restas con llevadas y préstamos de manera visual e intuitiva.

## 🚀 Instalación y Ejecución

### Requisitos
- Tener instalado Python 3.7 o superior

### Paso 1. Descargar el repositorio completo si no lo has hecho antes
```bash
git clone https://github.com/gussttaav/my-kid-ai-learning-apps.git
cd my-kid-ai-learning-apps/suma_resta_llevadas
```

### Paso 2: Instalar Flask
```bash
pip install flask
```

### Paso 3: Ejecutar la aplicación desde el directorio sumas_restas
```bash
python app.py
```

### Paso 4: Abrir en el navegador
Abre tu navegador web y ve a:
```
http://localhost:5000
```

## 🎮 Cómo usar la aplicación

1. **Página Principal**: Selecciona el tipo de operación (➕ Sumas con llevadas o ➖ Restas con préstamos)
2. **Iniciar Práctica**: Haz clic en "¡Comenzar Práctica!"
3. **Resolver Operaciones**: 
   - Observa la operación presentada verticalmente (como en papel)
   - Escribe cada dígito del resultado en su casilla correspondiente
   - Comienza escribiendo desde la derecha (unidades) hacia la izquierda
4. **Navegación**: 
   - Al escribir un dígito, el cursor se mueve automáticamente a la izquierda
   - Usa las flechas ← → para moverte entre casillas
   - Presiona Enter para verificar tu respuesta
5. **Controles durante la práctica**:
   - **Verificar Respuesta**: Confirma tu respuesta actual
   - **Reiniciar Práctica**: Vuelve al inicio sin guardar el progreso
6. **Feedback inmediato**: Verás si tu respuesta es correcta o incorrecta
7. **Continuar automáticamente**: La práctica avanza después de cada respuesta
8. **Ver Resultados**: Al finalizar, verás tus estadísticas detalladas
9. **Consultar Historial**: Revisa todos tus intentos anteriores y tu progreso

## 📊 Funcionalidades de Seguimiento

### Durante la Práctica
- ⏰ **Contador regresivo visual** con cambio de color según el tiempo restante (25 segundos por defecto)
- 📈 **Barra de progreso** que muestra el avance en tiempo real
- ✅ **Feedback inmediato** con colores intuitivos (verde=correcto, rojo=incorrecto)
- 🔄 **Transición automática** entre preguntas después de cada respuesta
- 💾 **Guardado automático** del progreso después de cada pregunta
- 🎯 **Presentación visual matemática**: Operaciones mostradas verticalmente como en papel tradicional

### Ejemplo Visual de Operación
```
    47
+   36
  ----
  [8][3]  ← Escribe aquí: primero 3, luego 8
```

### Resultados y Estadísticas
- 📊 **Porcentaje de aciertos** por práctica con código de colores
- 📅 **Historial completo** con fecha y hora exacta de cada práctica
- 🎯 **Estadísticas desglosadas por operación** (sumas vs restas)
- 📈 **Promedio general** de todas las prácticas realizadas
- 📝 **Resumen por operación** con porcentajes de acierto específicos
- 💡 **Consejos personalizados** para mejorar el aprendizaje matemático

## 🔢 Características de las Operaciones

### Sumas con Llevadas
- **Números superiores**: 2 cifras (10-99)
- **Números inferiores**: 1 o 2 cifras
- **Garantía**: Todas las sumas requieren llevadas (suma de unidades ≥ 10)
- **Ejemplo**: 47 + 36 = 83 (7+6=13, se lleva 1)

### Restas con Préstamos
- **Números superiores**: 2 cifras (20-99)
- **Números inferiores**: 1 o 2 cifras (siempre menor que el superior)
- **Garantía**: Todas las restas requieren préstamos (unidades del minuendo < unidades del sustraendo)
- **Ejemplo**: 62 - 28 = 34 (2<8, se pide prestado del 6)

## 💾 Almacenamiento de Datos

Los resultados se guardan automáticamente en un archivo JSON (`resultados.json`) que incluye:

- Fecha y hora exacta de cada práctica
- Tipo de operación practicada (suma o resta)
- Número de respuestas correctas e incorrectas
- Cálculo automático de porcentajes de acierto
- Datos estructurados para análisis estadístico

## 🛠️ Personalización

Puedes modificar fácilmente estos parámetros:

- **Tiempo por pregunta**: Cambia `TIEMPO_POR_PREGUNTA = 25` al inicio del archivo JavaScript en `practica.html`
- **Número de preguntas**: Modifica `totalPreguntas = 20` en la clase `PracticaOperaciones`
- **Rango de números**: Ajusta los valores en las funciones de generación en `app.py`
- **Estilos visuales**: Personaliza los colores y diseño en `base.html`

## 🎓 Consejos de Uso para Mejor Aprendizaje

Para obtener los mejores resultados:

1. **Practica regularmente**: Sesiones cortas de 15-20 minutos son más efectivas
2. **Comienza con sumas**: Las sumas suelen ser más fáciles de visualizar que las restas
3. **Visualiza el proceso**: Enseña a imaginar las llevadas y préstamos paso a paso
4. **Usa los dedos inicialmente**: Ayuda a contar las llevadas hasta que se automatice el proceso
5. **Alterna operaciones**: Practica tanto sumas como restas para mantener ambas habilidades activas
6. **Celebra el progreso**: Revisa el historial para motivarse con las mejoras
7. **Enfócate en las difíciles**: Usa las estadísticas para identificar qué tipo de operación necesita más práctica
8. **Verifica mentalmente**: Enseña a hacer una comprobación rápida del resultado
9. **No te frustres**: Los errores son parte natural del aprendizaje matemático
10. **Usa el reinicio**: Si una sesión no va bien, usa la función de reiniciar para empezar fresco

## 💡 Beneficios Educativos

Esta aplicación ayuda a desarrollar:

- **Comprensión conceptual** de llevadas y préstamos
- **Habilidades de cálculo mental** mediante práctica repetitiva
- **Confianza matemática** a través del feedback positivo
- **Pensamiento lógico** en la resolución de problemas aritméticos
- **Precisión** en la escritura y posicionamiento de dígitos
- **Velocidad de cálculo** con el sistema de tiempo limitado

¡Diviértete aprendiendo y dominando las sumas y restas con llevadas y préstamos! 🎯📚