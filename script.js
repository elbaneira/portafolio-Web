    // ====================================================
    // EFECTO MÁQUINA DE ESCRIBIR PARA DANTE
    // ====================================================
    let timerEscribir;

    function hablarDante(texto) {
      const bubbleText = document.getElementById('avatar-text');
      if (!bubbleText) return;

      clearInterval(timerEscribir);
      bubbleText.innerHTML = '';
      let index = 0;

      timerEscribir = setInterval(() => {
        if (index < texto.length) {
          bubbleText.innerHTML += texto.charAt(index);
          index++;
        } else {
          clearInterval(timerEscribir);
        }
      }, 25);
    }

    // Saludo inicial al cargar
    document.addEventListener('DOMContentLoaded', () => {
      hablarDante("¡Hola! Soy Dante, tu guía en el entorno de Elba. Escribe 'help' o haz clic en los comandos para iniciar el recorrido.");
    });

    // ====================================================
    // LÓGICA DE LA CONSOLA INTERACTIVA
    // ====================================================

    // Auxiliar para imprimir líneas en la terminal
    window.imprimirLineaTerminal = function(htmlContent) {
      const terminalOutput = document.getElementById('terminal-output');
      if (!terminalOutput) return;
      const p = document.createElement('div');
      p.className = 'term-line';
      p.innerHTML = htmlContent;
      terminalOutput.appendChild(p);
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    };

    // Función para desplazarse suavemente al centro de la tarjeta
    window.desplazarASeccion = function(idElemento) {
      const elemento = document.getElementById(idElemento);
      if (elemento) {
        elemento.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        console.warn(`No se encontró el elemento con id: ${idElemento}`);
      }
    };

    // Escuchador del Input Teclado (Enter)
    document.addEventListener('DOMContentLoaded', () => {
      const terminalInput = document.getElementById('terminal-input');
      if (terminalInput) {
        terminalInput.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') {
            const command = this.value.trim();
            if (command) {
              window.ejecutarComando(command, true);
            }
            this.value = ''; // Limpiar el input
          }
        });
      }
    });

    // FUNCIÓN PRINCIPAL DE LA TERMINAL
    window.ejecutarComando = function(cmd, desdeTeclado = false) {
      const cmdLimpio = cmd.trim().toLowerCase();
      if (!cmdLimpio) return;

      // Si se ejecutó por clic (y no por teclado), imprimir el comando en la consola
      if (!desdeTeclado) {
        window.imprimirLineaTerminal(`<span class="term-prompt">elba@tech:~$</span> ${cmdLimpio}`);
      }

      // 1. BLOQUE ÚNICO PARA JUICIO / VEREDICTO / EVALUAR
      if (cmdLimpio.startsWith('juicio') || cmdLimpio.startsWith('veredicto') || cmdLimpio.startsWith('evaluar')) {
        const partes = cmdLimpio.split(' ');
        const nota = partes[1]; // Captura '1', '2' o '3'
        const comentario = partes.slice(2).join(' ') || 'Sin comentario escrito.';

        // CASO A: Escribió sólo "juicio" o un número no válido
        if (!nota || !['1', '2', '3'].includes(nota)) {
          const guardado = localStorage.getItem('dante_veredicto');
          let mensajePrevio = '';
          
          if (guardado) {
            const v = JSON.parse(guardado);
            mensajePrevio = `<div style="margin-bottom: 0.5rem; color: #22c55e;">📜 <b>TU VEREDICTO ANTERIOR:</b> ${v.reino} (${v.fecha}) - ${v.comentario}</div>`;
          }

          window.imprimirLineaTerminal(`
    ${mensajePrevio}<span class="term-accent">⚖️️ [TRIBUNAL DE LA COMEDIA - EMITE TU JUICIO]:</span><br>
    Escribe o haz clic en la sentencia con tu comentario opcional:<br><br>
      🔥 <span class="term-cmd" onclick="window.ejecutarComando('juicio 1')">juicio 1</span> : Infierno (Bugs / Oportunidad de mejora)<br>
      🌀 <span class="term-cmd" onclick="window.ejecutarComando('juicio 2')">juicio 2</span> : Purgatorio (En proceso de optimización)<br>
      ✨ <span class="term-cmd" onclick="window.ejecutarComando('juicio 3')">juicio 3</span> : Paraíso (¡Excelente! Listo para colaborar)<br><br>
    <span style="color: #9ca3af;">Ejemplos: <b>juicio 1</b> o <b>juicio 3 Excelente trabajo con la terminal</b></span>
    <div class="terminal-back-btn" onclick="window.ejecutarComando('help')">← Volver</div>
          `);
          hablarDante("Dime, viajero... ¿en cuál de los tres reinos situarás este código?");
          return;
        }

        // CASO B: Escribió "juicio 1", "juicio 2" o "juicio 3"
        let reino = '';
        let mensajeDante = '';
        let estiloHtml = '';

        if (nota === '1') {
          reino = '🔥 INFIERNO';
          estiloHtml = '<span style="color: #ef4444; font-weight: bold;">🔥 [INFIERNO]:</span>';
          mensajeDante = 'Abandonad toda esperanza... si no corregimos este bug. ¡Tomamos nota inmediata!';
        } else if (nota === '2') {
          reino = '🌀 PURGATORIO';
          estiloHtml = '<span style="color: #f59e0b; font-weight: bold;">🌀 [PURGATORIO]:</span>';
          mensajeDante = 'Ascendiendo por la montaña de la optimización. ¡Cada línea nos acerca a la perfección!';
        } else if (nota === '3') {
          reino = '✨ PARAÍSO';
          estiloHtml = '<span style="color: #38bdf8; font-weight: bold;">✨ [PARAÍSO]:</span>';
          mensajeDante = 'E quindi uscimmo a riveder le stelle... ¡Nos vemos entre las estrellas del desarrollo!';
        }

        // Guardar veredicto en localStorage
        const registro = { reino, comentario: `"${comentario}"`, fecha: new Date().toLocaleDateString() };
        localStorage.setItem('dante_veredicto', JSON.stringify(registro));

        window.imprimirLineaTerminal(`
    ${estiloHtml} Sentencia grabada en la consola.<br>
    • <span class="term-cmd">Reino:</span> ${reino}<br>
    • <span class="term-cmd">Comentario:</span> "${comentario}"<br>
    <span style="color: #22c55e;">> [ESTADO]: Veredicto guardado con éxito.</span>
    <div class="terminal-back-btn" onclick="window.ejecutarComando('help')">← Volver</div>
        `);
        hablarDante(mensajeDante);
        return;
      }

      // 2. PROYECTOS DESTACADOS (1 al 5)
      if (cmdLimpio === '1' || cmdLimpio.includes('sgmo') || cmdLimpio.includes('mano de obra')) {
        window.imprimirLineaTerminal(`
    <span class="term-accent">📂 [PROYECTO 1]: SGMO - Gestión de Mano de Obra</span><br>
    • <span class="term-cmd">Tecnologías:</span> Python (POO), Lógica Algorítmica.<br>
    • <span class="term-cmd">Propósito:</span> Clasificación y distribución de mano de obra por obra.<br>
    • <span class="term-cmd">Demostración:</span> <a href="#card-sgmo" onclick="window.desplazarASeccion('card-sgmo'); return false;" style="color: #60a5fa; text-decoration: underline;">▶ Ver tarjeta en pantalla</a><br>
    <span style="color: #22c55e;">> Enfocando tarjeta SGMO...</span>
    <div class="terminal-back-btn" onclick="window.ejecutarComando('ls proyectos/')">← Volver a Proyectos</div>
        `);
        hablarDante("Te guío al módulo de SGMO: control y separación de mano de obra calificada y no calificada por obra.");
        window.desplazarASeccion('card-sgmo');

      } else if (cmdLimpio === '2' || cmdLimpio.includes('django') || cmdLimpio.includes('web app')) {
        window.imprimirLineaTerminal(`
    <span class="term-accent">📂 [PROYECTO 2]: Django Web App</span><br>
    • <span class="term-cmd">Tecnologías:</span> Python, Django ORM, PostgreSQL, Bootstrap.<br>
    • <span class="term-cmd">Propósito:</span> Sistema de gestión e historial de gestión de Proyectos y Tareas.<br>
    • <span class="term-cmd">Demostración:</span> <a href="#card-django" onclick="window.desplazarASeccion('card-django'); return false;" style="color: #60a5fa; text-decoration: underline;">▶ Ver tarjeta en pantalla</a><br>
    <span style="color: #22c55e;">> Enfocando tarjeta Django Web App...</span>
    <div class="terminal-back-btn" onclick="window.ejecutarComando('ls proyectos/')">← Volver a Proyectos</div>
        `);
        hablarDante("Django Web App al descubierto: arquitectura backend en Django y consultas ORM eficientes.");
        window.desplazarASeccion('card-django');

      } else if (cmdLimpio === '3' || cmdLimpio.includes('alke') || cmdLimpio.includes('wallet')) {
        window.imprimirLineaTerminal(`
    <span class="term-accent">📂 [PROYECTO 3]: Alke Wallet</span><br>
    • <span class="term-cmd">Tecnologías:</span> JavaScript, jQuery, HTML5, CSS3, Bootstrap.<br>
    • <span class="term-cmd">Propósito:</span> Billetera digital e interfaz interactiva para transacciones.<br>
    • <span class="term-cmd">Demostración:</span> <a href="#card-alke" onclick="window.desplazarASeccion('card-alke'); return false;" style="color: #60a5fa; text-decoration: underline;">▶ Ver tarjeta en pantalla</a><br>
    <span style="color: #22c55e;">> Enfocando tarjeta Alke Wallet...</span>
    <div class="terminal-back-btn" onclick="window.ejecutarComando('ls proyectos/')">← Volver a Proyectos</div>
        `);
        hablarDante("Alke Wallet en inspección: experiencia de usuario ágil y JavaScript dinámico.");
        window.desplazarASeccion('card-alke');

      } else if (cmdLimpio === '4' || cmdLimpio.includes('clientes') || cmdLimpio.includes('poo')) {
        window.imprimirLineaTerminal(`
    <span class="term-accent">📂 [PROYECTO 4]: Sistema de Gestión de Clientes</span><br>
    • <span class="term-cmd">Enfoque:</span> Programación Orientada a Objetos y persistencia de datos.<br>
    • <span class="term-cmd">Demostración:</span> <a href="#card-clientes" onclick="window.desplazarASeccion('card-clientes'); return false;" style="color: #60a5fa; text-decoration: underline;">▶ Ver tarjeta en pantalla</a><br>
    <span style="color: #22c55e;">> Enfocando tarjeta de Gestión de Clientes...</span>
    <div class="terminal-back-btn" onclick="window.ejecutarComando('ls proyectos/')">← Volver a Proyectos</div>
        `);
        hablarDante("Módulo de Gestión de Clientes: lógica sólida con POO en Python.");
        window.desplazarASeccion('card-clientes');

      } else if (cmdLimpio === '5' || cmdLimpio.includes('power bi') || cmdLimpio.includes('dashboards')) {
        window.imprimirLineaTerminal(`
    <span class="term-accent">📂 [PROYECTO 5]: Dashboards en Power BI</span><br>
    • <span class="term-cmd">Enfoque:</span> Modelamiento de datos y métricas clave para toma de decisiones.<br>
    • <span class="term-cmd">Demostración:</span> <a href="#card-power bi" onclick="window.desplazarASeccion('card-power bi'); return false;" style="color: #60a5fa; text-decoration: underline;">▶ Ver tarjeta en pantalla</a><br>
    <span style="color: #22c55e;">> Enfocando área de Business Intelligence...</span>
    <div class="terminal-back-btn" onclick="window.ejecutarComando('ls proyectos/')">← Volver a Proyectos</div>
        `);
        hablarDante("Business Intelligence en acción: de los datos crudos a decisiones estratégicas.");
        window.desplazarASeccion('card-power bi');

      // 3. SOLUCIONES EXPRESS (E1 y E2)
      } else if (cmdLimpio === 'e1' || cmdLimpio.includes('terra') || cmdLimpio.includes('alfajor')) {
        window.imprimirLineaTerminal(`
    <span class="term-accent">⚡ [EXPRESS 1]: Terra Alfajor (POS & Pedidos)</span><br>
    • <span class="term-cmd">Enfoque:</span> Automatización comercial y cálculo de pedidos para repostería.<br>
    • <span class="term-cmd">Demostración:</span> <a href="#card-e1" onclick="window.desplazarASeccion('card-e1'); return false;" style="color: #60a5fa; text-decoration: underline;">▶ Ver tarjeta en pantalla</a><br>
    <span style="color: #22c55e;">> Enfocando tarjeta Terra Alfajor...</span>
    <div class="terminal-back-btn" onclick="window.ejecutarComando('ls proyectos/')">← Volver a Proyectos</div>
        `);
        hablarDante("Solución Express Terra Alfajor: control rápido para optimizar pedidos y ventas.");
        window.desplazarASeccion('card-e1');

      } else if (cmdLimpio === 'e2' || cmdLimpio.includes('fiestas') || cmdLimpio.includes('anticuchos') || cmdLimpio.includes('logistica')) {
        window.imprimirLineaTerminal(`
    <span class="term-accent">⚡ [EXPRESS 2]: Fiestas Dieciocheras (Logística, Anticuchos & Cajas)</span><br>
    • <span class="term-cmd">Enfoque:</span> Presupuesto, insumos, cálculo de pedidos y armado modular.<br>
    • <span class="term-cmd">Demostración en Video:</span> <a href="https://youtu.be/p6C7HDa6u8U" target="_blank" style="color: #60a5fa; text-decoration: underline;">▶ Ver demo en YouTube (1 min)</a><br>
    • <span class="term-cmd">Código fuente:</span> <a href="https://github.com/elbaneira" target="_blank" style="color: #60a5fa; text-decoration: underline;">GitHub Repository</a><br>
    • <span class="term-cmd">Vista en pantalla:</span> <a href="#card-e2" onclick="window.desplazarASeccion('card-e2'); return false;" style="color: #60a5fa; text-decoration: underline;">Enfocar tarjeta del proyecto</a><br>
    <span style="color: #22c55e;">> Cargando demostración y detalles de logística...</span>
    <div class="terminal-back-btn" onclick="window.ejecutarComando('ls proyectos/')">← Volver a Proyectos</div>
        `);
        hablarDante("Solución Express Fiestas Dieciocheras: mira el video de demostración rápida o revisa el repositorio en GitHub.");
        window.desplazarASeccion('card-e2');

      // 4. RESTO DE COMANDOS GENERALES
      } else {
        switch (cmdLimpio) {
          case 'help':
            window.imprimirLineaTerminal(`
    <span class="term-accent">Comandos disponibles (haz clic en cualquiera):</span><br>
      • <span class="term-cmd" onclick="window.ejecutarComando('cat sobre_mi.py')">cat sobre_mi.py</span>     : Perfil profesional de Elba.<br>
      • <span class="term-cmd" onclick="window.ejecutarComando('ls proyectos/')">ls proyectos/</span>       : Lista de desarrollos y soluciones.<br>
      • <span class="term-cmd" onclick="window.ejecutarComando('futuro')">futuro / radar</span>      : Próximos desarrollos en camino.<br>
      • <span class="term-cmd" onclick="window.ejecutarComando('juicio')">juicio / veredicto</span>  : Emite tu sentencia (Infierno, Purgatorio, Paraíso).<br>
      • <span class="term-cmd" onclick="window.ejecutarComando('python3 auditoria.py')">python3 auditoria.py</span> : Calidad de datos y lógica backend.<br>
      • <span class="term-cmd" onclick="window.ejecutarComando('contacto')">contacto</span>            : Enlaces de contacto directo.<br>
      • <span class="term-cmd" onclick="window.ejecutarComando('exit')">exit / salir</span>        : Mensaje final de cierre.<br>
      • <span class="term-cmd" onclick="window.ejecutarComando('clear')">clear</span>               : Limpia la terminal.
            `);
            hablarDante("Te muestro el mapa para navegar la página. Haz clic en un comando o escribe en la consola.");
            break;

          case 'cat sobre_mi.py':
            window.imprimirLineaTerminal(`
    <span class="term-accent"># Perfil de Elba Neira</span><br>
    • Especialidad: Python, Django, PostgreSQL & Análisis de Datos SQL, Power BI.<br>
    • Enfoque: Optimización de procesos administrativos con código backend.
    <div class="terminal-back-btn" onclick="window.ejecutarComando('help')">← Volver</div>
            `);
            hablarDante("Elba transforma el caos en orden, uniendo la gestión con Python.");
            break;

          case 'ls proyectos/':
            window.imprimirLineaTerminal(`
    <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; margin: 0.5rem 0;">
      <div style="flex: 1; min-width: 220px;">
        <span class="term-accent" style="font-weight: bold; color: #f59e0b;">📂 PROYECTOS DESTACADOS</span><br>
        [1] <span class="term-cmd" onclick="window.ejecutarComando('1')">SGMO</span> (Mano de Obra)<br>
        [2] <span class="term-cmd" onclick="window.ejecutarComando('2')">Django Web App</span> (Django Web)<br>
        [3] <span class="term-cmd" onclick="window.ejecutarComando('3')">Alke Wallet</span> (Billetera Digital)<br>
        [4] <span class="term-cmd" onclick="window.ejecutarComando('4')">Gestión Clientes</span> (Python POO)<br>
        [5] <span class="term-cmd" onclick="window.ejecutarComando('5')">Power BI</span> (Dashboards)
      </div>
      <div style="flex: 1; min-width: 220px;">
        <span class="term-accent" style="font-weight: bold; color: #3b82f6;">⚡ SOLUCIONES EXPRESS</span><br>
        [E1] <span class="term-cmd" onclick="window.ejecutarComando('e1')">Terra Alfajor</span> (POS & Pedidos)<br>
        [E2] <span class="term-cmd" onclick="window.ejecutarComando('e2')">Fiestas Dieciocheras</span> (Logística)
      </div>
    </div>
    <div style="margin-top: 0.75rem; border-top: 1px dashed rgba(255,255,255,0.2); padding-top: 0.5rem;">
      <span style="color: #ec4899; font-weight: bold;">🚀 EN EL RADAR:</span> Haz clic en <span class="term-cmd" onclick="window.ejecutarComando('futuro')">'futuro'</span> para ver los próximos desarrollos.
    </div>
    <div class="terminal-back-btn" onclick="window.ejecutarComando('help')">← Volver al menú</div>
            `);
            hablarDante("Haz clic en cualquiera de las opciones para ir directamente a la tarjeta o ver más información.");
            break;

          case 'futuro':
          case 'radar':
          case 'proximos':
            window.imprimirLineaTerminal(`
    <span class="term-accent">🚀 [PRÓXIMOS DESAFÍOS / EN EL RADAR]:</span><br>
    • <span class="term-cmd">🏢 App para Condominios:</span> Administración de espacios, comunicación interna y gastos comunes.<br>
    • <span class="term-cmd">🥖 Inventario para Panaderías:</span> Control de mermas, insumos y cálculo automático de recetas.<br>
    • <span class="term-cmd">🤝 Redes Comunitarias:</span> Plataforma modular para organización de juntas de vecinos y agrupaciones.<br><br>
    <span style="color: #22c55e;">> [ESTADO]: Diseñando arquitecturas y modelos de datos en Python.</span>
    <div class="terminal-back-btn" onclick="window.ejecutarComando('help')">← Volver</div>
            `);
            hablarDante("La mente de Elba no descansa: siempre detectando problemas reales para transformarlos en código.");
            break;

          case 'python3 auditoria.py':
            window.imprimirLineaTerminal(`
    <span class="term-accent">[EJECUTANDO AUDITORÍA DE DATOS...]</span><br>
    > Verificando lógica backend... OK<br>
    > Validando consistencia de datos... OK<br>
    <span style="color: #22c55e;">> Diagnóstico: Código optimizado y listo para producción.</span>
    <div class="terminal-back-btn" onclick="window.ejecutarComando('help')">← Volver</div>
            `);
            hablarDante("Auditoría aprobada. Sistema 100% operativo sin errores.");
            break;

          case 'exit':
          case 'salir':
            window.imprimirLineaTerminal(`
    <span class="term-accent">🤖 [DANTE]:</span> Diagnóstico final: Portafolio inspeccionado con éxito.<br>
    <span style="color: #9ca3af;">Recuerda que no todo en la vida es Python, SQL y terminales. Sal a respirar aire puro, camina un poco y, si quieres contratar a Elba, los botones de contacto están arriba.</span>
    <div class="terminal-back-btn" onclick="window.ejecutarComando('help')">← Volver</div>
            `);
            hablarDante("¡Misión cumplida! Nos vemos en el mundo real.");
            break;

          case 'contacto':
            window.imprimirLineaTerminal(`
    <span class="term-accent">📬 [CONTACTO DIRECTO CON ELBA]:</span><br>
      • <span class="term-cmd">Email:</span> <a href="mailto:elbatech7@gmail.com" style="color: #60a5fa; text-decoration: underline;">elbatech7@gmail.com</a> <a href="#" onclick="window.copiarCorreoDirecto(event);" style="color: #38bdf8; text-decoration: none; font-size: 0.85em;">[copiar]</a><br>
      • <span class="term-cmd">LinkedIn:</span> <a href="https://www.linkedin.com/in/elba-neira-tech" target="_blank" style="color: #60a5fa; text-decoration: underline;">linkedin.com/in/elba-neira-tech</a><br>
      • <span class="term-cmd">GitHub:</span> <a href="https://github.com/elbaneira" target="_blank" style="color: #60a5fa; text-decoration: underline;">github.com/elbaneira</a>
    <div class="terminal-back-btn" onclick="window.ejecutarComando('help')">← Volver</div>
            `);
            hablarDante("Aquí tienes las vías de contacto. Puedes hacer clic en el correo o usar [copiar].");
            break;

          case 'clear':
            const terminalOutput = document.getElementById('terminal-output');
            if (terminalOutput) {
              terminalOutput.innerHTML = `
                <p class="term-line"><span class="term-accent">🤖 [DANTE]:</span> Consola limpia. Escribe <span class="term-cmd" onclick="window.ejecutarComando('help')">'help'</span> para continuar.</p>
              `;
            }
            hablarDante("Pergamino limpio. Listo para una nueva consulta.");
            break;

          default:
            window.imprimirLineaTerminal(`
    <span style="color: #ef4444;">Comando no reconocido: '${cmdLimpio}'</span><br>
    Escribe o haz clic en <span class="term-cmd" onclick="window.ejecutarComando('help')">'help'</span>, un número (<span class="term-cmd" onclick="window.ejecutarComando('1')">1</span> al <span class="term-cmd" onclick="window.ejecutarComando('5')">5</span>), <span class="term-cmd" onclick="window.ejecutarComando('e1')">E1</span> / <span class="term-cmd" onclick="window.ejecutarComando('e2')">E2</span>, o <span class="term-cmd" onclick="window.ejecutarComando('futuro')">'futuro'</span>.
    <div class="terminal-back-btn" onclick="window.ejecutarComando('help')">← Volver</div>
            `);
            hablarDante("Comando no reconocido. Prueba escribiendo help o haciendo clic en 'futuro'.");
            break;
        }
      }
    };

    // ==========================================
    // FUNCIÓN INDEPENDIENTE PARA COPIAR EL CORREO
    // ==========================================
    window.copiarCorreoDirecto = function(e) {
      if (e) e.preventDefault();
      
      const correo = 'elbatech7@gmail.com';

      const temp = document.createElement('textarea');
      temp.value = correo;
      temp.style.position = 'fixed';
      temp.style.opacity = '0';
      document.body.appendChild(temp);
      temp.select();
      temp.setSelectionRange(0, 99999);

      try {
        document.execCommand('copy');
        window.imprimirLineaTerminal(`
    <span style="color: #22c55e; font-weight: bold;">📋 [COPIADO]:</span> La dirección <b>${correo}</b> se copió al portapapeles.
        `);
        hablarDante("¡Correo copiado! Ya lo tienes listo en tu portapapeles.");
      } catch (err) {
        window.imprimirLineaTerminal(`
    <span class="term-accent">📧 Correo de Elba:</span> <b>${correo}</b>
        `);
        hablarDante("Aquí tienes la dirección de correo de Elba.");
      }

      document.body.removeChild(temp);
    };