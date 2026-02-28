class PracticaReloj extends PracticaBase {
    constructor() {
        super({
            tiempoPorPregunta: 30,
            totalPreguntas: 20,
            nombre: 'practicaReloj'
        });
        
        // Usar el mismo nombre que en el original para compatibilidad
        this.nombre = 'practicaReloj';
        this.horaCorrecta = null;
        this.tipoRespuestaCorrecta = null;
        this.opcionSeleccionada = null;
        
        // Cargar estado con el nombre original
        this.cargarEstadoReloj();
    }
    
    cargarEstadoReloj() {
        const estadoGuardado = sessionStorage.getItem(this.nombre);
        if (estadoGuardado) {
            try {
                const estado = JSON.parse(estadoGuardado);
                this.preguntaActual = estado.preguntaActual || 0;
                this.correctas = estado.correctas || 0;
                this.incorrectas = estado.incorrectas || 0;
            } catch (e) {
                console.error('Error cargando estado:', e);
            }
        }
    }
    
    guardarEstado() {
        const estado = {
            preguntaActual: this.preguntaActual,
            correctas: this.correctas,
            incorrectas: this.incorrectas
        };
        sessionStorage.setItem(this.nombre, JSON.stringify(estado));
        sessionStorage.setItem('practicaReloj_activa', 'true');
    }
    
    limpiarEstado() {
        sessionStorage.removeItem(this.nombre);
        sessionStorage.removeItem('practicaReloj_activa');
    }
    
    async empezarPractica() {
        document.getElementById('inicio').style.display = 'none';
        document.getElementById('practica').style.display = 'block';
        
        this.guardarEstado();
        
        if (this.preguntaActual > 0) {
            this.actualizarProgreso();
            document.getElementById('numero-pregunta').textContent = this.preguntaActual + 1;
        } else {
            this.preguntaActual = 0;
            this.actualizarProgreso();
            document.getElementById('numero-pregunta').textContent = 1;
        }
        
        await this.cargarPregunta();
    }
    
    async cargarPregunta() {
        try {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
            
            const response = await fetch('/reloj/api/hora');
            const data = await response.json();
            
            this.horaCorrecta = data.hora_display;
            this.tipoRespuestaCorrecta = data.tipo_respuesta;
            this.preguntaRespondida = false;
            this.opcionSeleccionada = null;
            
            this.mostrarReloj(data);
            this.limpiarRespuesta();
            
            document.getElementById('feedback').style.display = 'none';
            
            this.actualizarProgreso();
            document.getElementById('numero-pregunta').textContent = this.preguntaActual + 1;
            
            this.guardarEstado();
            this.iniciarTimer();
            
        } catch (error) {
            console.error('Error al cargar pregunta:', error);
        }
    }
    
    mostrarReloj(data) {
        const horario = document.getElementById('manecilla-horario');
        const minutero = document.getElementById('manecilla-minutero');
        
        if (horario) {
            horario.style.transform = `rotate(${data.angulo_horario}deg)`;
        }
        if (minutero) {
            minutero.style.transform = `rotate(${data.angulo_minutero}deg)`;
        }
    }
    
    limpiarRespuesta() {
        const input = document.getElementById('hora-input');
        const conectiva = document.getElementById('conectiva-texto');
        
        if (input) input.value = '';
        if (conectiva) conectiva.textContent = '...';
        
        const opciones = document.querySelectorAll('.minuto-btn');
        opciones.forEach(btn => {
            btn.classList.remove('seleccionado');
        });
        
        if (input) input.focus();
    }
    
    iniciarTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        
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
            timerElement.style.color = '#e53e3e';
            timerElement.style.fontSize = '1.8em';
        } else if (this.tiempoRestante <= 5) {
            timerElement.style.color = '#dd6b20';
            timerElement.style.fontSize = '1.6em';
        } else {
            timerElement.style.color = '#38a169';
            timerElement.style.fontSize = '1.5em';
        }
    }
    
    seleccionarOpcion(tipo, elemento) {
        document.querySelectorAll('.minuto-btn').forEach(btn => {
            btn.classList.remove('seleccionado');
        });
        
        elemento.classList.add('seleccionado');
        this.opcionSeleccionada = tipo;
        
        const conectiva = document.getElementById('conectiva-texto');
        if (conectiva) {
            conectiva.textContent = tipo;
        }
    }
    
    validarRespuesta(horaUsuario, tipoUsuario) {
        const esCompleta = horaUsuario >= 1 && horaUsuario <= 12 && tipoUsuario !== null;
        const esCorrecto = esCompleta && horaUsuario === this.horaCorrecta && tipoUsuario === this.tipoRespuestaCorrecta;
        
        return { esCompleta, esCorrecto };
    }
    
    verificarRespuesta() {
        if (this.preguntaRespondida) return;
        
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        
        this.preguntaRespondida = true;
        
        const horaUsuario = parseInt(document.getElementById('hora-input').value);
        const respuestaCompleta = this.validarRespuesta(horaUsuario, this.opcionSeleccionada);
        
        if (!respuestaCompleta.esCompleta) {
            this.incorrectas++;
            this.mostrarFeedback('❌ Por favor completa la hora y selecciona una opción', false);
        } else if (respuestaCompleta.esCorrecto) {
            this.correctas++;
            this.mostrarFeedback('✅ ¡Correcto!', true);
        } else {
            this.incorrectas++;
            this.mostrarFeedback(`❌ Incorrecto. La respuesta era: Las ${this.horaCorrecta} ${this.tipoRespuestaCorrecta}`, false);
        }
        
        this.guardarEstado();
        
        setTimeout(() => {
            this.avanzarPregunta();
        }, 2000);
    }
    
    avanzarPregunta() {
        this.preguntaActual++;
        
        if (this.preguntaActual >= this.totalPreguntas) {
            this.finalizarPractica();
        } else {
            this.actualizarProgreso();
            document.getElementById('numero-pregunta').textContent = this.preguntaActual + 1;
            this.cargarPregunta();
        }
    }
    
    actualizarProgreso() {
        const progreso = (this.preguntaActual / this.totalPreguntas) * 100;
        const barra = document.getElementById('progreso-barra');
        if (barra) {
            barra.style.width = `${progreso}%`;
        }
    }
    
    mostrarFeedback(mensaje, esCorrecto) {
        const feedback = document.getElementById('feedback');
        if (!feedback) return;
        
        feedback.textContent = mensaje;
        feedback.className = `feedback ${esCorrecto ? 'correcto' : 'incorrecto'}`;
        feedback.style.display = 'block';
    }
    
    finalizarPractica() {
        this.limpiarEstado();
        
        document.getElementById('practica').style.display = 'none';
        document.getElementById('resultados').style.display = 'block';
        
        document.getElementById('correctas-final').textContent = this.correctas;
        document.getElementById('incorrectas-final').textContent = this.incorrectas;
        
        const porcentaje = Math.round((this.correctas / this.totalPreguntas) * 100);
        document.getElementById('porcentaje-final').textContent = `${porcentaje}%`;
        
        // Mensaje motivacional
        const mensajeEl = document.getElementById('mensaje-motivacional');
        if (mensajeEl) {
            if (porcentaje >= 90) {
                mensajeEl.textContent = "🌟 ¡Excelente! Ya eres un experto leyendo el reloj";
                mensajeEl.style.color = '#276749';
            } else if (porcentaje >= 70) {
                mensajeEl.textContent = "📈 ¡Muy bien! Sigue practicando para mejorar";
                mensajeEl.style.color = '#2c5282';
            } else if (porcentaje >= 50) {
                mensajeEl.textContent = "💪 Vas por buen camino, ¡sigue así!";
                mensajeEl.style.color = '#b7791f';
            } else {
                mensajeEl.textContent = "🕐 No te rindas, con práctica dominarás el reloj";
                mensajeEl.style.color = '#9b2c2c';
            }
        }
    }
    
    reiniciarPractica() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        
        this.limpiarEstado();
        
        this.preguntaActual = 0;
        this.correctas = 0;
        this.incorrectas = 0;
        this.preguntaRespondida = false;
        this.opcionSeleccionada = null;
        
        document.getElementById('practica').style.display = 'none';
        document.getElementById('resultados').style.display = 'none';
        document.getElementById('inicio').style.display = 'block';
        
        this.mostrarMensaje('Práctica reiniciada', '#f56565');
    }
    
    timeOut() {
        if (!this.preguntaRespondida) {
            this.preguntaRespondida = true;
            
            const horaUsuario = parseInt(document.getElementById('hora-input').value);
            const respuestaCompleta = this.validarRespuesta(horaUsuario, this.opcionSeleccionada);
            
            if (respuestaCompleta.esCompleta && respuestaCompleta.esCorrecto) {
                this.correctas++;
                this.mostrarFeedback('⏰ ¡Tiempo agotado pero tu respuesta es correcta!', true);
            } else {
                this.incorrectas++;
                this.mostrarFeedback(`⏰ Tiempo agotado. La respuesta correcta era: Las ${this.horaCorrecta} ${this.tipoRespuestaCorrecta}`, false);
            }
            
            this.guardarEstado();
            
            setTimeout(() => {
                this.avanzarPregunta();
            }, 3000);
        }
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