class PracticaTablas extends PracticaBase {
    constructor(tabla) {
        super({
            tiempoPorPregunta: 10,
            totalPreguntas: 20,
            nombre: `tablas_${tabla}`
        });
        
        this.tabla = tabla;
        this.multiplicadorAnterior = null;
        this.respuestaCorrecta = null;
        
        // Cargar multiplicador anterior del estado
        this.cargarMultiplicadorAnterior();
    }
    
    cargarMultiplicadorAnterior() {
        const estado = sessionStorage.getItem(this.nombre);
        if (estado) {
            try {
                const data = JSON.parse(estado);
                this.multiplicadorAnterior = data.multiplicadorAnterior || null;
                this.preguntaActual = data.preguntaActual || 0;
                this.correctas = data.correctas || 0;
                this.incorrectas = data.incorrectas || 0;
            } catch (e) {
                console.error('Error cargando estado:', e);
            }
        }
    }
    
    guardarEstado() {
        const estado = {
            preguntaActual: this.preguntaActual,
            correctas: this.correctas,
            incorrectas: this.incorrectas,
            multiplicadorAnterior: this.multiplicadorAnterior
        };
        sessionStorage.setItem(this.nombre, JSON.stringify(estado));
    }
    
    async empezarPractica() {
        const selector = document.getElementById('selector-tablas');
        const inicio = document.getElementById('inicio');
        const practica = document.getElementById('practica');
        
        if (selector) selector.style.display = 'none';
        if (inicio) inicio.style.display = 'none';
        if (practica) practica.style.display = 'block';
        
        if (this.preguntaActual === 0) {
            this.actualizarProgreso();
        } else {
            this.actualizarProgreso();
            document.getElementById('numero-pregunta').textContent = this.preguntaActual + 1;
        }
        
        await this.cargarPregunta();
    }
    
    async cargarPregunta() {
        try {
            if (this.timer) clearInterval(this.timer);
            
            let url = `/tablas/api/pregunta/${this.tabla}`;
            if (this.multiplicadorAnterior !== null) {
                url += `?anterior=${this.multiplicadorAnterior}`;
            }
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            
            const data = await response.json();
            
            const preguntaTexto = document.getElementById('pregunta-texto');
            if (preguntaTexto) {
                preguntaTexto.textContent = `${data.pregunta} = `;
            }
            
            this.respuestaCorrecta = data.respuesta_correcta;
            this.multiplicadorAnterior = data.multiplicador;
            this.preguntaRespondida = false;
            
            const input = document.getElementById('respuesta-input');
            if (input) {
                input.value = '';
                input.focus();
            }
            
            const feedback = document.getElementById('feedback');
            if (feedback) feedback.style.display = 'none';
            
            this.actualizarProgreso();
            this.guardarEstado();
            this.iniciarTimer();
            
        } catch (error) {
            console.error('Error al cargar pregunta:', error);
            const preguntaTexto = document.getElementById('pregunta-texto');
            if (preguntaTexto) {
                preguntaTexto.textContent = 'Error al cargar. Reintentando...';
            }
            setTimeout(() => this.cargarPregunta(), 2000);
        }
    }
    
    verificarRespuesta() {
        if (this.preguntaRespondida) return;
        
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        
        this.preguntaRespondida = true;
        
        const input = document.getElementById('respuesta-input');
        if (!input) return;
        
        const respuesta = input.value.trim();
        
        if (respuesta === '') {
            this.incorrectas++;
            this.mostrarFeedback('❌ No escribiste una respuesta', false);
        } else {
            const numRespuesta = parseInt(respuesta);
            if (isNaN(numRespuesta)) {
                this.incorrectas++;
                this.mostrarFeedback('❌ Escribe solo números', false);
            } else if (numRespuesta === this.respuestaCorrecta) {
                this.correctas++;
                this.mostrarFeedback('✅ ¡Correcto!', true);
            } else {
                this.incorrectas++;
                this.mostrarFeedback(`❌ Incorrecto. Era ${this.respuestaCorrecta}`, false);
            }
        }
        
        this.guardarEstado();
        
        setTimeout(() => this.avanzarPregunta(), 1500);
    }
    
    avanzarPregunta() {
        this.preguntaActual++;
        
        if (this.preguntaActual >= this.totalPreguntas) {
            this.finalizarPractica();
        } else {
            this.cargarPregunta();
        }
    }
    
    siguientePregunta() {
        this.verificarRespuesta();
    }
    
    reiniciarPractica() {
        if (this.timer) clearInterval(this.timer);
        
        this.limpiarEstado();
        
        this.preguntaActual = 0;
        this.correctas = 0;
        this.incorrectas = 0;
        this.multiplicadorAnterior = null;
        this.respuestaCorrecta = null;
        
        const practica = document.getElementById('practica');
        const resultados = document.getElementById('resultados');
        const inicio = document.getElementById('inicio');
        
        if (practica) practica.style.display = 'none';
        if (resultados) resultados.style.display = 'none';
        if (inicio) inicio.style.display = 'flex';
        
        this.mostrarMensaje('Práctica reiniciada', '#f56565');
    }
    
    timeOut() {
        if (!this.preguntaRespondida) {
            this.preguntaRespondida = true;
            
            const input = document.getElementById('respuesta-input');
            const respuesta = input ? input.value.trim() : '';
            
            if (respuesta !== '') {
                const numRespuesta = parseInt(respuesta);
                if (!isNaN(numRespuesta) && numRespuesta === this.respuestaCorrecta) {
                    this.correctas++;
                    this.mostrarFeedback('⏰ ¡Respuesta correcta justo a tiempo!', true);
                } else {
                    this.incorrectas++;
                    this.mostrarFeedback(`⏰ Tiempo agotado. Era ${this.respuestaCorrecta}`, false);
                }
            } else {
                this.incorrectas++;
                this.mostrarFeedback('⏰ Tiempo agotado', false);
            }
            
            this.guardarEstado();
            
            setTimeout(() => this.avanzarPregunta(), 2000);
        }
    }
}