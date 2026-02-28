class PracticaSumaResta extends PracticaBase {
    constructor(operacion) {
        super({
            tiempoPorPregunta: 25,
            totalPreguntas: 20,
            nombre: `sumaResta_${operacion}`
        });
        
        this.operacion = operacion;
        this.respuestaCorrecta = null;
        this.digitosResultado = 0;
        
        // Cargar datos guardados
        this.cargarEstadoAdicional();
    }
    
    cargarEstadoAdicional() {
        const estado = sessionStorage.getItem(this.nombre);
        if (estado) {
            try {
                const data = JSON.parse(estado);
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
            incorrectas: this.incorrectas
        };
        sessionStorage.setItem(this.nombre, JSON.stringify(estado));
    }
    
    async empezarPractica() {
        const selector = document.getElementById('selector-operacion');
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
            
            const response = await fetch(`/suma-resta/api/pregunta/${this.operacion}`);
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            
            const data = await response.json();
            
            this.respuestaCorrecta = data.respuesta_correcta;
            this.digitosResultado = data.digitos_resultado;
            this.preguntaRespondida = false;
            
            this.mostrarOperacion(data);
            this.crearInputsRespuesta();
            
            const feedback = document.getElementById('feedback');
            if (feedback) feedback.style.display = 'none';
            
            this.actualizarProgreso();
            this.guardarEstado();
            this.iniciarTimer();
            
        } catch (error) {
            console.error('Error al cargar pregunta:', error);
            setTimeout(() => this.cargarPregunta(), 2000);
        }
    }
    
    mostrarOperacion(data) {
        const display = document.getElementById('operacion-display');
        if (!display) return;
        
        const signo = data.operacion === '+' ? '+' : '−';
        
        display.innerHTML = `
            <div class="operacion-fila">
                <div class="signo-display"></div>
                <div class="numero-display">${data.num1}</div>
            </div>
            <div class="operacion-fila">
                <div class="signo-display">${signo}</div>
                <div class="numero-display">${data.num2}</div>
            </div>
            <div class="linea-division"></div>
        `;
    }
    
    crearInputsRespuesta() {
        const container = document.getElementById('inputs-container');
        if (!container) return;
        
        container.innerHTML = '';
        container.style.gridTemplateColumns = `repeat(${this.digitosResultado}, 60px)`;
        
        for (let i = 0; i < this.digitosResultado; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'input-digito-sr';
            input.maxLength = 1;
            input.setAttribute('data-position', i);
            input.setAttribute('inputmode', 'numeric');
            input.setAttribute('pattern', '[0-9]');
            
            // Escribir de derecha a izquierda
            input.addEventListener('input', (e) => {
                const valor = e.target.value;
                if (valor && /^\d$/.test(valor) && i > 0) {
                    const prevInput = container.children[i - 1];
                    if (prevInput) {
                        prevInput.focus();
                    }
                }
            });
            
            // Manejar teclas especiales
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && !e.target.value && i < this.digitosResultado - 1) {
                    const nextInput = container.children[i + 1];
                    if (nextInput) {
                        nextInput.focus();
                    }
                } else if (e.key === 'ArrowLeft' && i > 0) {
                    const prevInput = container.children[i - 1];
                    if (prevInput) prevInput.focus();
                } else if (e.key === 'ArrowRight' && i < this.digitosResultado - 1) {
                    const nextInput = container.children[i + 1];
                    if (nextInput) nextInput.focus();
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    this.verificarRespuesta();
                }
            });
            
            // Solo permitir números
            input.addEventListener('keypress', (e) => {
                if (!/^\d$/.test(e.key) && e.key !== 'Enter' && e.key !== 'Backspace' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                    e.preventDefault();
                }
            });
            
            container.appendChild(input);
        }
        
        // Focus al input más a la derecha
        if (container.children[this.digitosResultado - 1]) {
            container.children[this.digitosResultado - 1].focus();
        }
    }
    
    obtenerRespuestaUsuario() {
        const inputs = document.querySelectorAll('.input-digito-sr');
        let respuesta = '';
        let hayVacios = false;
        
        // Leer de derecha a izquierda para formar el número
        for (let i = inputs.length - 1; i >= 0; i--) {
            const valor = inputs[i].value.trim();
            if (valor === '') {
                hayVacios = true;
            }
            respuesta = valor + respuesta; // Construir el número correctamente
        }
        
        if (hayVacios || respuesta === '') {
            return null;
        }
        
        return parseInt(respuesta);
    }
    
    verificarRespuesta() {
        if (this.preguntaRespondida) return;
        
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        
        this.preguntaRespondida = true;
        
        const respuestaUsuario = this.obtenerRespuestaUsuario();
        
        if (respuestaUsuario === null) {
            this.incorrectas++;
            this.mostrarFeedback('❌ Completa todos los dígitos', false);
        } else if (respuestaUsuario === this.respuestaCorrecta) {
            this.correctas++;
            this.mostrarFeedback('✅ ¡Correcto!', true);
        } else {
            this.incorrectas++;
            this.mostrarFeedback(`❌ Incorrecto. Era ${this.respuestaCorrecta}`, false);
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
    
    reiniciarPractica() {
        if (this.timer) clearInterval(this.timer);
        
        this.limpiarEstado();
        
        this.preguntaActual = 0;
        this.correctas = 0;
        this.incorrectas = 0;
        this.respuestaCorrecta = null;
        
        const practica = document.getElementById('practica');
        const resultados = document.getElementById('resultados');
        const inicio = document.getElementById('inicio');
        
        if (practica) practica.style.display = 'none';
        if (resultados) resultados.style.display = 'none';
        if (inicio) inicio.style.display = 'block';
        
        this.mostrarMensaje('Práctica reiniciada', '#f56565');
    }
    
    timeOut() {
        if (!this.preguntaRespondida) {
            this.preguntaRespondida = true;
            
            const respuestaUsuario = this.obtenerRespuestaUsuario();
            
            if (respuestaUsuario !== null && respuestaUsuario === this.respuestaCorrecta) {
                this.correctas++;
                this.mostrarFeedback('⏰ ¡Respuesta correcta justo a tiempo!', true);
            } else {
                this.incorrectas++;
                this.mostrarFeedback(`⏰ Tiempo agotado. Era ${this.respuestaCorrecta}`, false);
            }
            
            this.guardarEstado();
            
            setTimeout(() => this.avanzarPregunta(), 2000);
        }
    }
}