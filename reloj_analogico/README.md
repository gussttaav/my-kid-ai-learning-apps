# 🕐 Aplicación de Práctica de Lectura de Reloj Analógico

Una aplicación web educativa para que los niños practiquen la lectura de relojes analógicos de forma interactiva.

## Características

- **Práctica interactiva**: 20 preguntas por sesión con relojes animados
- **Cuatro tipos de hora**: en punto, y cuarto, y media, menos cuarto
- **Sistema de puntuación**: Seguimiento de respuestas correctas e incorrectas
- **Historial completo**: Registro de todas las prácticas con estadísticas
- **Temporizador**: 30 segundos por pregunta para mantener el ritmo
- **Diseño responsivo**: Funciona en móviles, tablets y ordenadores
- **Persistencia de sesión**: Continúa donde lo dejaste si cierras la aplicación


## 🚀 Instalación y Ejecución

### Requisitos
- Tener instalado Python 3.7 o superior

### Paso 1. Descargar el repositorio completo si no lo has hecho antes
```bash
git clone https://github.com/gussttaav/my-kid-ai-learning-apps.git
cd my-kid-ai-learning-apps/reloj_anlogico
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

## Configuración

### Cambiar tiempo por pregunta
En el archivo `templates/practica.html`, buscar la línea:
```javascript
const TIEMPO_POR_PREGUNTA = 30; // segundos
```
Cambiar el valor para ajustar el tiempo disponible por pregunta.

### Cambiar número de preguntas
En el archivo `app.py`, buscar:
```python
self.totalPreguntas = 20
```
Y en `templates/practica.html`:
```javascript
this.totalPreguntas = 20;
```

## Funcionalidades Principales

### 1. Generación de Horas Aleatorias
- Horas de 1 a 12
- Minutos solo en: 0 (en punto), 15 (y cuarto), 30 (y media), 45 (menos cuarto)
- Cálculo automático de ángulos para las manecillas del reloj

### 2. Sistema de Evaluación
- Validación de hora y tipo de respuesta
- Puntuación inmediata
- Retroalimentación visual

### 3. Persistencia de Datos
- Almacenamiento local en archivo JSON
- Historial completo con paginación
- Estadísticas generales y de progreso

### 4. Interfaz Responsiva
- Adaptable a diferentes tamaños de pantalla
- Reloj analógico animado con CSS
- Controles táctiles amigables

## Personalización

### Colores y Estilos
Los estilos están definidos en `templates/base.html`. Puedes modificar:
- Colores del gradiente de fondo
- Estilos de botones
- Colores del reloj y manecillas
- Tipografía

### Mensajes y Textos
Todos los textos están en español y pueden modificarse directamente en los archivos HTML.

## Solución de Problemas

### La aplicación no inicia
- Verificar que Python esté instalado: `python --version`
- Verificar que Flask esté instalado: `pip list | grep Flask`
- Revisar que el puerto 5000 esté libre

### Los resultados no se guardan
- Verificar permisos de escritura en el directorio
- El archivo `resultados_reloj.json` se crea automáticamente

### El reloj no se muestra correctamente
- Verificar que el navegador soporte CSS moderno
- Probar en Chrome, Firefox o Safari actualizados

## Extensiones Posibles

1. **Más tipos de hora**: Agregar minutos específicos (ej: 10, 20, 40, 50)
2. **Niveles de dificultad**: Principiante, intermedio, avanzado
3. **Sonidos**: Efectos de sonido para feedback
4. **Múltiples usuarios**: Sistema de cuentas individuales
5. **Gráficos de progreso**: Visualización temporal del rendimiento