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
  hablarDante("¡Hola! Soy Dante, tu guía en el entorno de Elba. Escribe 'help' para iniciar el recorrido.");
});

// ====================================================
// LÓGICA DE LA CONSOLA INTERACTIVA
// ====================================================
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

if (terminalInput) {
  terminalInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      const command = this.value.trim().toLowerCase();
      ejecutarComando(command);
      this.value = ''; // Limpiar el input
    }
  });
}

// Auxiliar para imprimir líneas en la terminal
function imprimirLineaTerminal(htmlContent) {
  if (!terminalOutput) return;
  const p = document.createElement('div');
  p.className = 'term-line';
  p.innerHTML = htmlContent;
  terminalOutput.appendChild(p);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Función para desplazarse suavemente al centro de la tarjeta
function desplazarASeccion(idElemento) {
  const elemento = document.getElementById(idElemento);
  if (elemento) {
    elemento.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    console.warn(`No se encontró el elemento con id: ${idElemento}`);
  }
}

// Función principal de la terminal
function ejecutarComando(cmd) {
  const cmdLimpio = cmd.trim().toLowerCase();

  // 1. PROYECTOS DESTACADOS (1 al 5)
  if (cmdLimpio === '1' || cmdLimpio.includes('sgmo') || cmdLimpio.includes('mano de obra')) {
    imprimirLineaTerminal(`
<span class="term-accent">📂 [PROYECTO 1]: SGMO - Gestión de Mano de Obra</span>
• <span class="term-cmd">Tecnologías:</span> Python (POO), Lógica Algorítmica.
• <span class="term-cmd">Propósito:</span> Clasificación y distribución de mano de obra por obra.
• <span class="term-cmd">Demostración:</span> <a href="#card-sgmo" onclick="desplazarASeccion('card-sgmo'); return false;" style="color: #60a5fa; text-decoration: underline;">▶ Ver tarjeta en pantalla</a>
<span style="color: #22c55e;">> Enfocando tarjeta SGMO...</span>
    `);
    hablarDante("Te guío al módulo de SGMO: control y separación de mano de obra calificada y no calificada por obra.");
    desplazarASeccion('card-sgmo');

  } else if (cmdLimpio === '2' || cmdLimpio.includes('django') || cmdLimpio.includes('web app')) {
    imprimirLineaTerminal(`
<span class="term-accent">📂 [PROYECTO 2]: Django Web App</span>
• <span class="term-cmd">Tecnologías:</span> Python, Django ORM, PostgreSQL, Bootstrap.
• <span class="term-cmd">Propósito:</span> Sistema de gestión e historial de  gestión de Proyectos y Tareas.
• <span class="term-cmd">Demostración:</span> <a href="#card-django" onclick="desplazarASeccion('card-django'); return false;" style="color: #60a5fa; text-decoration: underline;">▶ Ver tarjeta en pantalla</a>
<span style="color: #22c55e;">> Enfocando tarjeta Django Web App...</span>
    `);
    hablarDante("Django Web App al descubierto: arquitectura backend en Django y consultas ORM eficientes.");
    desplazarASeccion('card-django');

  } else if (cmdLimpio === '3' || cmdLimpio.includes('alke') || cmdLimpio.includes('wallet')) {
    imprimirLineaTerminal(`
<span class="term-accent">📂 [PROYECTO 3]: Alke Wallet</span>
• <span class="term-cmd">Tecnologías:</span> JavaScript, jQuery, HTML5, CSS3, Bootstrap.
• <span class="term-cmd">Propósito:</span> Billetera digital e interfaz interactiva para transacciones.
• <span class="term-cmd">Demostración:</span> <a href="#card-alke" onclick="desplazarASeccion('card-alke'); return false;" style="color: #60a5fa; text-decoration: underline;">▶ Ver tarjeta en pantalla</a>
<span style="color: #22c55e;">> Enfocando tarjeta Alke Wallet...</span>
    `);
    hablarDante("Alke Wallet en inspección: experiencia de usuario ágil y JavaScript dinámico.");
    desplazarASeccion('card-alke');

  // PROYECTO 4
  } else if (cmdLimpio === '4' || cmdLimpio.includes('clientes') || cmdLimpio.includes('poo')) {
    imprimirLineaTerminal(`
<span class="term-accent">📂 [PROYECTO 4]: Sistema de Gestión de Clientes</span>
• <span class="term-cmd">Enfoque:</span> Programación Orientada a Objetos y persistencia de datos.
• <span class="term-cmd">Demostración:</span> <a href="#card-4" onclick="desplazarASeccion('card-4'); return false;" style="color: #60a5fa; text-decoration: underline;">▶ Ver tarjeta en pantalla</a>
<span style="color: #22c55e;">> Enfocando tarjeta de Gestión de Clientes...</span>
    `);
    hablarDante("Módulo de Gestión de Clientes: lógica sólida con POO en Python.");
    desplazarASeccion('card-clientes');

  // PROYECTO 5
  } else if (cmdLimpio === '5' || cmdLimpio.includes('power bi') || cmdLimpio.includes('dashboards')) {
    imprimirLineaTerminal(`
<span class="term-accent">📂 [PROYECTO 5]: Dashboards en Power BI</span>
• <span class="term-cmd">Enfoque:</span> Modelamiento de datos y métricas clave para toma de decisiones.
• <span class="term-cmd">Demostración:</span> <a href="#card-5" onclick="desplazarASeccion('card-5'); return false;" style="color: #60a5fa; text-decoration: underline;">▶ Ver tarjeta en pantalla</a>
<span style="color: #22c55e;">> Enfocando área de Business Intelligence...</span>
    `);
    hablarDante("Business Intelligence en acción: de los datos crudos a decisiones estratégicas.");
    desplazarASeccion('card-power bi');
  // 2. SOLUCIONES EXPRESS (E1 y E2)
  } else if (cmdLimpio === 'e1' || cmdLimpio.includes('terra') || cmdLimpio.includes('alfajor')) {
    imprimirLineaTerminal(`
<span class="term-accent">⚡ [EXPRESS 1]: Terra Alfajor (POS & Pedidos)</span>
• <span class="term-cmd">Enfoque:</span> Automatización comercial y cálculo de pedidos para repostería.
• <span class="term-cmd">Demostración:</span> <a href="#card-e1" onclick="desplazarASeccion('card-e1'); return false;" style="color: #60a5fa; text-decoration: underline;">▶ Ver tarjeta en pantalla</a>
<span style="color: #22c55e;">> Enfocando tarjeta Terra Alfajor...</span>
    `);
    hablarDante("Solución Express Terra Alfajor: control rápido para optimizar pedidos y ventas.");
    desplazarASeccion('card-e1');

  } else if (cmdLimpio === 'e2' || cmdLimpio.includes('fiestas') || cmdLimpio.includes('logistica')) {
    imprimirLineaTerminal(`
<span class="term-accent">⚡ [EXPRESS 2]: Fiestas Dieciocheras (Logística & Cajas)</span>
• <span class="term-cmd">Enfoque:</span> Presupuesto, insumos y armado modular de cajas típicas chilenas.
• <span class="term-cmd">Demostración:</span> <a href="#card-e2" onclick="desplazarASeccion('card-e2'); return false;" style="color: #60a5fa; text-decoration: underline;">▶ Ver tarjeta en pantalla</a>
<span style="color: #22c55e;">> Enfocando tarjeta Fiestas Dieciocheras...</span>
    `);
    hablarDante("Solución Express Fiestas Dieciocheras: logística y costeo exacto para eventos.");
    desplazarASeccion('card-e2');

  // 3. COMANDOS GENERALES Y CONTACTO
  } else if (cmdLimpio === 'contacto' || cmdLimpio === 'email' || cmdLimpio === 'mail') {
    imprimirLineaTerminal(`
<span class="term-accent">📬 [CONTACTO DIRECTO]:</span>
• <span class="term-cmd">LinkedIn:</span> <a href="https://www.linkedin.com/in/elba-neira-tech" target="_blank" style="color: #60a5fa; text-decoration: underline;">linkedin.com/in/elba-neira-tech</a>
• <span class="term-cmd">Ubicación:</span> Penco / Concepción, Región del Biobío.
<span style="color: #22c55e;">> Canales abiertos para coordinar entrevistas o consultas.</span>
    `);
    hablarDante("Canales de comunicación abiertos. ¡Estaré atenta a cualquier mensaje!");

  } else {
    switch (cmdLimpio) {
      case 'help':
        imprimirLineaTerminal(`
<span class="term-accent">Comandos disponibles:</span>
  • <span class="term-cmd">cat sobre_mi.py</span>     : Perfil profesional de Elba.
  • <span class="term-cmd">ls proyectos/</span>       : Lista de desarrollos y soluciones.
  • <span class="term-cmd">python3 auditoria.py</span> : Calidad de datos y lógica backend.
  • <span class="term-cmd">contacto</span>            : Enlaces de contacto directo.
  • <span class="term-cmd">clear</span>               : Limpia la terminal.
        `);
        hablarDante("Te muestro el mapa para navegar la página. Elige tu rumbo.");
        break;

      case 'cat sobre_mi.py':
        imprimirLineaTerminal(`
<span class="term-accent"># Perfil de Elba Neira</span>
• Especialidad: Python, Django, PostgreSQL & Análisis de Datos SQL, Power BI.
• Enfoque: Optimización de procesos administrativos con código backend.
        `);
        hablarDante("Elba transforma el caos en orden, uniendo la gestión con Python.");
        break;

      case 'ls proyectos/':
        imprimirLineaTerminal(`
<div style="display: flex; flex-wrap: wrap; gap: 1.5rem; margin: 0.5rem 0;">
  <div style="flex: 1; min-width: 220px;">
    <span class="term-accent" style="font-weight: bold; color: #f59e0b;">📂 PROYECTOS DESTACADOS</span><br>
    [1] <span class="term-cmd">SGMO</span> (Mano de Obra)<br>
    [2] <span class="term-cmd">Django Web App</span> (Dajango Web)<br>
    [3] <span class="term-cmd">Alke Wallet</span> (Billetera Digital)<br>
    [4] <span class="term-cmd">Gestión Clientes</span> (Python POO)<br>
    [5] <span class="term-cmd">Power BI</span> (Dashboards)
  </div>
  <div style="flex: 1; min-width: 220px;">
    <span class="term-accent" style="font-weight: bold; color: #3b82f6;">⚡ SOLUCIONES EXPRESS</span><br>
    [E1] <span class="term-cmd">Terra Alfajor</span> (POS & Pedidos)<br>
    [E2] <span class="term-cmd">Fiestas Dieciocheras</span> (Logística)
  </div>
</div>
<div style="margin-top: 0.75rem; border-top: 1px dashed rgba(255,255,255,0.2); padding-top: 0.5rem;">
  <span style="color: #ec4899; font-weight: bold;">🚀 EN EL RADAR:</span> Escribe <span class="term-cmd">'futuro'</span> para ver los próximos desarrollos en camino.
</div>
        `);
        hablarDante("Elige una opción para explorar en detalle o mira lo que viene a futuro.");
        break;

      case 'python3 auditoria.py':
        imprimirLineaTerminal(`
<span class="term-accent">[EJECUTANDO AUDITORÍA DE DATOS...]</span>
> Verificando lógica backend... OK
> Validando consistencia de datos... OK
<span style="color: #22c55e;">> Diagnóstico: Código optimizado y listo para producción.</span>
        `);
        hablarDante("Auditoría aprobada. Sistema 100% operativo sin errores.");
        break;

      case 'clear':
        if (typeof terminalOutput !== 'undefined' && terminalOutput) {
          terminalOutput.innerHTML = `
            <p class="term-line"><span class="term-accent">🤖 [DANTE]:</span> Consola limpia. Escribe <span class="term-cmd">'help'</span> para continuar.</p>
          `;
        }
        hablarDante("Pergamino limpio. Listo para una nueva consulta.");
        break;

      default:
        imprimirLineaTerminal(`
<span style="color: #ef4444;">Comando no reconocido: '${cmdLimpio}'</span><br>
Escribe <span class="term-cmd">'help'</span>, un número (<span class="term-cmd">1</span> al <span class="term-cmd">5</span>), <span class="term-cmd">E1</span> / <span class="term-cmd">E2</span>, o <span class="term-cmd">'futuro'</span>.
        `);
        hablarDante("Comando no reconocido. Prueba escribiendo help o 'futuro'.");
        break;
    }
  }
}



