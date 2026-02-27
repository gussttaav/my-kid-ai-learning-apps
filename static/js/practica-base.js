// Clase base para todas las prácticas
class PracticaBase {
    constructor(config) {
        this.tiempoPorPregunta = config.tiempoPorPregunta || 10;
        this.totalPreguntas = config.totalPreguntas || 20;
        this.nombre = config.nombre || 'practica';
        
        this.preguntaActual = 0;
        this.correctas = 0;
        this.incorrectas = 0;
        this.tiempoRestante = this.tiempoPorPregunta;
        this.timer = null;
        this.preguntaRespondida = false;
        
        this.cargarEstado();
    }

    cargarEstado() {
        const estadoGuardado = sessionStorage.getItem(this.nombre);
        if (estadoGuardado) {
            const estado = JSON.parse(estadoGuardado);
            this.preguntaActual = estado.preguntaActual || 0;
            this.correctas = estado.correctas || 0;
            this.incorrectas = estado.incorrectas || 0;
            this.preguntaRespondida = false;
        }
    }

    guardarEstado() {
        const estado = {
            preguntaActual: this.preguntaActual,
            correctas: this.correctas,
            incorrectas: this.incorrectas
        };
        sessionStorage.setItem(this.nombre, JSON.stringify(estado));
    }

    limpiarEstado() {
        sessionStorage.removeItem(this.nombre);
    }

    iniciarTimer() {
        if (this.timer) clearInterval(this.timer);
        
        this.tiempoRestante = this.tiempoPorPregunta;
        this.actualizarTimer();
        
        this.timer = setInterval(() => {
            this.tiempoRestante--;
            this.actualizarTimer();
            
            if (this.tiempoRestante <= 0) {
                clearInterval(this.timer);
                this.timer = null;
                this.timeOut();
            }
        }, 1000);
    }

    actualizarTimer() {
        const timerElement = document.getElementById('timer');
        if (!timerElement) return;
        
        timerElement.textContent = `⏰ ${this.tiempoRestante}`;
        timerElement.className = 'timer';
        
        if (this.tiempoRestante <= 3) {
            timerElement.classList.add('danger');
        } else if (this.tiempoRestante <= 5) {
            timerElement.classList.add('warning');
        }
    }

    timeOut() {
        // Método a sobrescribir
    }

    mostrarFeedback(mensaje, esCorrecto) {
        const feedback = document.getElementById('feedback');
        if (!feedback) return;
        
        feedback.textContent = mensaje;
        feedback.className = `feedback ${esCorrecto ? 'correcto' : 'incorrecto'}`;
        feedback.style.display = 'block';
    }

    actualizarProgreso() {
        const progreso = (this.preguntaActual / this.totalPreguntas) * 100;
        const barra = document.getElementById('progreso-barra');
        if (barra) {
            barra.style.width = `${progreso}%`;
        }
        
        const numeroPregunta = document.getElementById('numero-pregunta');
        if (numeroPregunta) {
            numeroPregunta.textContent = this.preguntaActual + 1;
        }
    }

    finalizarPractica() {
        this.limpiarEstado();
        
        const resultados = document.getElementById('resultados');
        const practica = document.getElementById('practica');
        const inicio = document.getElementById('inicio');
        
        if (resultados) resultados.style.display = 'block';
        if (practica) practica.style.display = 'none';
        if (inicio) inicio.style.display = 'none';
        
        const correctasEl = document.getElementById('correctas-final');
        const incorrectasEl = document.getElementById('incorrectas-final');
        const porcentajeEl = document.getElementById('porcentaje-final');
        
        if (correctasEl) correctasEl.textContent = this.correctas;
        if (incorrectasEl) incorrectasEl.textContent = this.incorrectas;
        
        const porcentaje = Math.round((this.correctas / this.totalPreguntas) * 100);
        if (porcentajeEl) porcentajeEl.textContent = `${porcentaje}%`;
    }

    reiniciar() {
        if (this.timer) clearInterval(this.timer);
        
        this.limpiarEstado();
        
        this.preguntaActual = 0;
        this.correctas = 0;
        this.incorrectas = 0;
        
        const practica = document.getElementById('practica');
        const resultados = document.getElementById('resultados');
        const inicio = document.getElementById('inicio');
        
        if (practica) practica.style.display = 'none';
        if (resultados) resultados.style.display = 'none';
        if (inicio) inicio.style.display = 'block';
        
        this.mostrarMensaje('Práctica reiniciada', '#f56565');
    }

    mostrarMensaje(texto, color) {
        const mensaje = document.createElement('div');
        mensaje.textContent = texto;
        mensaje.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${color};
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        `;
        document.body.appendChild(mensaje);
        
        setTimeout(() => {
            if (document.body.contains(mensaje)) {
                document.body.removeChild(mensaje);
            }
        }, 2000);
    }
}