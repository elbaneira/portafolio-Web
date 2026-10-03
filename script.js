// ====================================================
// 1. EFECTO MÁQUINA DE ESCRIBIR PARA DANTE
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

// ====================================================
// 2. FUNCIONES AUXILIARES Y NAVEGACIÓN GLOBAL
// ====================================================
function imprimirLineaTerminal(htmlContent) {
  const terminalOutput = document.getElementById('terminal-output');
  if (!terminalOutput) return;

  const p = document.createElement('div');
  p.className = 'term-line';
  p.innerHTML = htmlContent;
  terminalOutput.appendChild(p);

  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

window.desplazarASeccion = function(idElemento) {
  const elemento = document.getElementById(idElemento);
  if (elemento) {
    elemento.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    console.warn(`No se encontró el elemento con id: ${idElemento}`);
  }
};

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
    imprimirLineaTerminal(`
      <span style="color: #22c55e; font-weight: bold;">📋 [COPIADO]:</span> La dirección <b>${correo}</b> se copió al portapapeles.
    `);
    hablarDante("¡Correo copiado! Ya lo tienes listo en tu portapapeles.");
  } catch (err) {
    imprimirLineaTerminal(`
      <span class="term-accent">📧 Correo de Elba:</span> <b>${correo}</b>
    `);
    hablarDante("Aquí tienes la dirección de correo de Elba.");
  }

  document.body.removeChild(temp);
};

// ====================================================
// 3. FUNCIÓN GLOBAL DE EJECUCIÓN (COMPATIBLE CON PC Y MÓVIL)
// ====================================================
window.ejecutarComando = function(cmd) {
  // Validar que sea un texto no vacío
  if (!cmd || typeof cmd !== 'string') return;

  const terminalOutput = document.getElementById('terminal-output');
  const terminalInput = document.getElementById('terminal-input');

  // Imprimir línea en la consola
  if (terminalOutput) {
    const linea = document.createElement('div');
    linea.className = 'term-line';
    linea.innerHTML = `<span class="prompt">elba@tech:~$</span> ${cmd}`;
    terminalOutput.appendChild(linea);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  // Limpiar el campo de texto
  if (terminalInput) {
    terminalInput.value = '';
  }

  // Procesar la lógica
  window.procesarComandoLogica(cmd);
};
function procesarEntrada() {
  const terminalInput = document.getElementById('terminal-input');
  if (!terminalInput) return;

  const command = terminalInput.value.trim();
  if (command !== '') {
    window.ejecutarComando(command);
  }
}

// ====================================================
// 4. LÓGICA PRINCIPAL DE PROCESAMIENTO DE COMANDOS
// ====================================================
function procesarComandoLogica(cmd) {
  const cmdLimpio = cmd.trim().toLowerCase();
  const terminalOutput = document.getElementById('terminal-output');

  // --- A. LÓGICA DE JUICIO ---
  if (cmdLimpio.startsWith('juicio')) {
    const partes = cmd.trim().split(/\s+/);
    const nota = partes[1];
    const comentario = partes.slice(2).join(' ') || 'Sin comentario';

    if (!nota || !['1', '2', '3'].includes(nota)) {
      imprimirLineaTerminal(`
        <span class="term-accent">⚖️ [TRIBUNAL DE LA COMEDIA - EMITE TU JUICIO]:</span><br>
        Escribe el comando con el número y tu comentario opcional en un solo paso:<br><br>
        🔥 <span class="term-cmd clickable-cmd" onclick="window.ejecutarComando('juicio 1')">juicio 1 [mensaje]</span> : Infierno (Bugs / Oportunidad de mejora)<br>
        🌀 <span class="term-cmd clickable-cmd" onclick="window.ejecutarComando('juicio 2')">juicio 2 [mensaje]</span> : Purgatorio (En proceso de optimización)<br>
        ✨ <span class="term-cmd clickable-cmd" onclick="window.ejecutarComando('juicio 3')">juicio 3 [mensaje]</span> : Paraíso (¡Excelente! Listo para colaborar)<br><br>
        <span style="color: #9ca3af;">Ejemplo: <b>juicio 3 Excelente trabajo con la terminal</b></span>
      `);
      hablarDante("Dime, viajero... ¿en cuál de los tres reinos situarás este código?");
      return;
    }

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

    const registro = { reino, comentario: `"${comentario}"`, fecha: new Date().toLocaleDateString() };
    localStorage.setItem('dante_veredicto', JSON.stringify(registro));

    imprimirLineaTerminal(`
      ${estiloHtml} Sentencia grabada en la consola.<br>
      • <span class="term-cmd">Reino:</span> ${reino}<br>
      • <span class="term-cmd">Comentario:</span> "${comentario}"<br>
      <span style="color: #22c55e;">> [ESTADO]: Veredicto guardado con éxito.</span>
    `);
    hablarDante(mensajeDante);
    return;
  }

  // --- B. PROYECTOS POR NÚMERO O NOMBRE ---
  if (cmdLimpio === '1' || cmdLimpio.includes('sgmo') || cmdLimpio.includes('mano de obra')) {
    imprimirLineaTerminal(`
      <span class="term-accent">📂 [PROYECTO 1]: SGMO - Gestión de Mano de Obra</span><br>
      • <span class="term-cmd">Tecnologías:</span> Python (POO), Lógica Algorítmica.<br>
      • <span class="term-cmd">Propósito:</span> Clasificación y distribución de mano de obra por obra.<br>
      • <span class="term-cmd">Demostración:</span> <a href="#card-sgmo" onclick="window.desplazarASeccion('card-sgmo'); return false;" style="color: #60a5fa; text-decoration: underline;">▶ Ver tarjeta en pantalla</a><br>
      <span style="color: #22c55e;">> Enfocando tarjeta SGMO...</span>
    `);
    hablarDante("Te guío al módulo de SGMO: control y separación de mano de obra.");
    window.desplazarASeccion('card-sgmo');

  } else if (cmdLimpio === '2' || cmdLimpio.includes('django') || cmdLimpio.includes('certimanager')) {
    imprimirLineaTerminal(`
      <span class="term-accent">📂 [PROYECTO 2]: Django Web App</span><br>
      • <span class="term-cmd">Tecnologías:</span> Python, Django ORM, PostgreSQL, Bootstrap.<br>
      • <span class="term-cmd">Propósito:</span> Sistema de gestión de certificados e historial.<br>
      • <span class="term-cmd">Demostración:</span> <a href="#card-django" onclick="window.desplazarASeccion('card-django'); return false;" style="color: #60a5fa; text-decoration: underline;">▶ Ver tarjeta en pantalla</a><br>
      <span style="color: #22c55e;">> Enfocando tarjeta CertiManager...</span>
    `);
    hablarDante("Django Web App al descubierto: arquitectura backend en Django.");
    window.desplazarASeccion('card-django');

  } else if (cmdLimpio === '3' || cmdLimpio.includes('alke') || cmdLimpio.includes('wallet')) {
    imprimirLineaTerminal(`
      <span class="term-accent">📂 [PROYECTO 3]: Alke Wallet</span><br>
      • <span class="term-cmd">Tecnologías:</span> JavaScript, jQuery, HTML5, CSS3, Bootstrap.<br>
      • <span class="term-cmd">Propósito:</span> Billetera digital e interfaz interactiva.<br>
      • <span class="term-cmd">Demostración:</span> <a href="#card-alke" onclick="window.desplazarASeccion('card-alke'); return false;" style="color: #60a5fa; text-decoration: underline;">▶ Ver tarjeta en pantalla</a><br>
      <span style="color: #22c55e;">> Enfocando tarjeta Alke Wallet...</span>
    `);
    hablarDante("Alke Wallet en inspección: experiencia de usuario e interfaz dinámicas.");
    window.desplazarASeccion('card-alke');

  } else if (cmdLimpio === '4' || cmdLimpio.includes('clientes') || cmdLimpio.includes('poo')) {
    imprimirLineaTerminal(`
      <span class="term-accent">📂 [PROYECTO 4]: Gestión de Clientes</span><br>
      • <span class="term-cmd">Enfoque:</span> Programación Orientada a Objetos.<br>
      • <span class="term-cmd">Demostración:</span> <a href="#card-clientes" onclick="window.desplazarASeccion('card-clientes'); return false;" style="color: #60a5fa; text-decoration: underline;">▶ Ver tarjeta en pantalla</a><br>
      <span style="color: #22c55e;">> Enfocando tarjeta de Gestión de Clientes...</span>
    `);
    hablarDante("Módulo de Gestión de Clientes: lógica sólida en Python.");
    window.desplazarASeccion('card-clientes');

  } else if (cmdLimpio === '5' || cmdLimpio.includes('power bi') || cmdLimpio.includes('dashboards')) {
    imprimirLineaTerminal(`
      <span class="term-accent">📂 [PROYECTO 5]: Dashboards en Power BI</span><br>
      • <span class="term-cmd">Enfoque:</span> Modelamiento de datos y métricas clave.<br>
      • <span class="term-cmd">Demostración:</span> <a href="#card-powerbi" onclick="window.desplazarASeccion('card-powerbi'); return false;" style="color: #60a5fa; text-decoration: underline;">▶ Ver tarjeta en pantalla</a><br>
      <span style="color: #22c55e;">> Enfocando área de Business Intelligence...</span>
    `);
    hablarDante("Business Intelligence en acción: datos clave para decisiones.");
    window.desplazarASeccion('card-powerbi');

  } else if (cmdLimpio === 'e1' || cmdLimpio.includes('terra') || cmdLimpio.includes('alfajor')) {
    imprimirLineaTerminal(`
      <span class="term-accent">⚡ [EXPRESS 1]: Terra Alfajor (POS & Pedidos)</span><br>
      • <span class="term-cmd">Enfoque:</span> Automatización comercial y cálculo de pedidos.<br>
      • <span class="term-cmd">Demostración:</span> <a href="#card-e1" onclick="window.desplazarASeccion('card-e1'); return false;" style="color: #60a5fa; text-decoration: underline;">▶ Ver tarjeta en pantalla</a><br>
      <span style="color: #22c55e;">> Enfocando tarjeta Terra Alfajor...</span>
    `);
    hablarDante("Solución Express Terra Alfajor: control para optimizar pedidos.");
    window.desplazarASeccion('card-e1');

  } else if (cmdLimpio === 'e2' || cmdLimpio.includes('fiestas') || cmdLimpio.includes('anticuchos')) {
    imprimirLineaTerminal(`
      <span class="term-accent">⚡ [EXPRESS 2]: Fiestas Dieciocheras</span><br>
      • <span class="term-cmd">Enfoque:</span> Logística, cálculo de insumos y armado modular.<br>
      • <span class="term-cmd">Video:</span> <a href="https://youtu.be/p6C7HDa6u8U" target="_blank" style="color: #60a5fa; text-decoration: underline;">▶ Ver demo en YouTube (1 min)</a><br>
      • <span class="term-cmd">Código:</span> <a href="https://github.com/elbaneira" target="_blank" style="color: #60a5fa; text-decoration: underline;">GitHub Repository</a><br>
      • <span class="term-cmd">Pantalla:</span> <a href="#card-e2" onclick="window.desplazarASeccion('card-e2'); return false;" style="color: #60a5fa; text-decoration: underline;">Enfocar tarjeta del proyecto</a>
    `);
    hablarDante("Solución Express Fiestas Dieciocheras: revisa la logística o el video demo.");
    window.desplazarASeccion('card-e2');

  // --- C. SWITCH GENERAL DE COMANDOS (HELP, CAT, LS, ETC.) ---
  } else {
    switch (cmdLimpio) {
      case 'help':
        imprimirLineaTerminal(`
          <div class="term-response">
            <p class="term-accent" style="margin-bottom: 8px; font-weight: bold;">💡 Comandos disponibles (haz clic en cualquiera para ejecutar):</p>
            <ul style="list-style: none; padding-left: 0; margin: 0;">
              <li style="margin-bottom: 6px;">
                <span class="term-cmd clickable-cmd" onclick="window.ejecutarComando('cat sobre_mi.py')">📄 cat sobre_mi.py</span>
                <span style="color: #94a3b8;"> : Perfil profesional de Elba.</span>
              </li>
              <li style="margin-bottom: 6px;">
                <span class="term-cmd clickable-cmd" onclick="window.ejecutarComando('ls proyectos/')">📁 ls proyectos/</span>
                <span style="color: #94a3b8;"> : Lista de desarrollos y soluciones.</span>
              </li>
              <li style="margin-bottom: 6px;">
                <span class="term-cmd clickable-cmd" onclick="window.ejecutarComando('python3 auditoria.py')">🔍 python3 auditoria.py</span>
                <span style="color: #94a3b8;"> : Calidad de datos y lógica backend.</span>
              </li>
              <li style="margin-bottom: 6px;">
                <span class="term-cmd clickable-cmd" onclick="window.ejecutarComando('juicio')">⚖️ juicio</span>
                <span style="color: #94a3b8;"> : Tribunal de la Comedia (evalúa este portafolio).</span>
              </li>
              <li style="margin-bottom: 6px;">
                <span class="term-cmd clickable-cmd" onclick="window.ejecutarComando('contacto')">✉ contacto</span>
                <span style="color: #94a3b8;"> : Canales de comunicación directa.</span>
              </li>
              <li style="margin-bottom: 6px;">
                <span class="term-cmd clickable-cmd" onclick="window.ejecutarComando('clear')">🧹 clear</span>
                <span style="color: #94a3b8;"> : Limpia la pantalla.</span>
              </li>
            </ul>
          </div>
        `);
        hablarDante("Selecciona cualquier opción o escribe un comando abajo.");
        break;

      case 'cat sobre_mi.py':
        imprimirLineaTerminal(`
          <span class="term-accent"># Perfil de Elba Neira</span><br>
          • <b>Especialidad:</b> Python, Django, PostgreSQL & Análisis de Datos SQL, Power BI.<br>
          • <b>Enfoque:</b> Optimización de procesos administrativos con código backend.<br>
          📌 <span class="term-cmd clickable-cmd" onclick="window.desplazarASeccion('sobre-mi')">Ir a sección 'Sobre mí' ➔</span>
        `);
        hablarDante("Elba transforma el caos en orden, uniendo la gestión con Python.");
        break;

      case 'ls proyectos/':
        imprimirLineaTerminal(`
          <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; margin: 0.5rem 0;">
            <div style="flex: 1; min-width: 200px;">
              <span class="term-accent" style="font-weight: bold; color: #f59e0b;">📂 PROYECTOS DESTACADOS</span><br>
              • <span class="term-cmd clickable-cmd" onclick="window.ejecutarComando('1')">[1] SGMO</span> (Mano de Obra)<br>
              • <span class="term-cmd clickable-cmd" onclick="window.ejecutarComando('2')">[2] CertiManager</span> (Django Web)<br>
              • <span class="term-cmd clickable-cmd" onclick="window.ejecutarComando('3')">[3] Alke Wallet</span> (Billetera Digital)<br>
              • <span class="term-cmd clickable-cmd" onclick="window.ejecutarComando('4')">[4] Gestión Clientes</span> (Python POO)<br>
              • <span class="term-cmd clickable-cmd" onclick="window.ejecutarComando('5')">[5] Power BI</span> (Dashboards)
            </div>
            <div style="flex: 1; min-width: 200px;">
              <span class="term-accent" style="font-weight: bold; color: #3b82f6;">⚡ SOLUCIONES EXPRESS</span><br>
              • <span class="term-cmd clickable-cmd" onclick="window.ejecutarComando('E1')">[E1] Terra Alfajor</span> (POS & Pedidos)<br>
              • <span class="term-cmd clickable-cmd" onclick="window.ejecutarComando('E2')">[E2] Fiestas Dieciocheras</span> (Logística)
            </div>
          </div>
          <div style="margin-top: 0.75rem; border-top: 1px dashed rgba(255,255,255,0.2); padding-top: 0.5rem;">
            🚀 Escribe o toca <span class="term-cmd clickable-cmd" onclick="window.ejecutarComando('futuro')">'futuro'</span> para ver los próximos desarrollos.
          </div>
        `);
        hablarDante("Haz clic en cualquier opción para explorarla en detalle.");
        break;

      case 'futuro':
      case 'radar':
      case 'proximos':
        imprimirLineaTerminal(`
          <span class="term-accent">🚀 [PRÓXIMOS DESAFÍOS / EN EL RADAR]:</span><br>
          • <span class="term-cmd">🏢 App para Condominios:</span> Administración de espacios y gastos comunes.<br>
          • <span class="term-cmd">🥖 Inventario para Panaderías:</span> Control de mermas y recetas.<br>
          • <span class="term-cmd">🤝 Redes Comunitarias:</span> Plataforma modular para juntas de vecinos.<br>
          <span style="color: #22c55e;">> [ESTADO]: Diseñando arquitecturas y modelos de datos en Python.</span>
        `);
        hablarDante("Siempre detectando problemas reales para transformarlos en código.");
        break;

      case 'python3 auditoria.py':
        imprimirLineaTerminal(`
          <span class="term-accent">[EJECUTANDO AUDITORÍA DE DATOS...]</span><br>
          > Verificando lógica backend... OK<br>
          > Validando consistencia de datos... OK<br>
          <span style="color: #22c55e;">> Diagnóstico: Código optimizado y listo para producción.</span>
        `);
        hablarDante("Auditoría aprobada. Sistema 100% operativo sin errores.");
        break;

      case 'contacto':
        imprimirLineaTerminal(`
          <span class="term-accent">📬 [CONTACTO DIRECTO CON ELBA]:</span><br>
          • <span class="term-cmd">Email:</span> <a href="mailto:elbatech7@gmail.com" style="color: #60a5fa; text-decoration: underline;">elbatech7@gmail.com</a> <a href="#" onclick="window.copiarCorreoDirecto(event);" style="color: #38bdf8; text-decoration: none; font-size: 0.85em;">[copiar]</a><br>
          • <span class="term-cmd">LinkedIn:</span> <a href="https://www.linkedin.com/in/elba-neira-tech" target="_blank" style="color: #60a5fa; text-decoration: underline;">linkedin.com/in/elba-neira-tech</a><br>
          • <span class="term-cmd">GitHub:</span> <a href="https://github.com/elbaneira" target="_blank" style="color: #60a5fa; text-decoration: underline;">github.com/elbaneira</a>
        `);
        hablarDante("Aquí tienes las vías de contacto. Puedes tocar el correo para copiarlo.");
        break;

      case 'clear':
        if (terminalOutput) {
          terminalOutput.innerHTML = `
            <div class="term-line"><span class="term-accent">🤖 [DANTE]:</span> Consola limpia. Escribe o toca <span class="term-cmd clickable-cmd" onclick="window.ejecutarComando('help')">'help'</span> para continuar.</div>
          `;
        }
        hablarDante("Pergamino limpio. Listo para una nueva consulta.");
        break;

      case 'exit':
      case 'salir':
        imprimirLineaTerminal(`
          <span class="term-accent">🤖 [DANTE]:</span> Diagnóstico final: Portafolio inspeccionado con éxito.<br>
          <span style="color: #9ca3af;">Recuerda que no todo en la vida es código. Sal a respirar aire puro, camina un poco y los botones de contacto están listos.</span>
        `);
        hablarDante("¡Misión cumplida! Nos vemos en el mundo real.");
        break;

      default:
        imprimirLineaTerminal(`
          <span style="color: #ef4444;">Comando no reconocido: '${cmdLimpio}'</span><br>
          Escribe o toca <span class="term-cmd clickable-cmd" onclick="window.ejecutarComando('help')">'help'</span>, un número del <span class="term-cmd clickable-cmd" onclick="window.ejecutarComando('1')">1</span> al <span class="term-cmd clickable-cmd" onclick="window.ejecutarComando('5')">5</span>, o <span class="term-cmd clickable-cmd" onclick="window.ejecutarComando('futuro')">'futuro'</span>.
        `);
        hablarDante("Comando no reconocido. Prueba escribiendo o tocando 'help'.");
        break;
    }
  }
}

// ====================================================
// 5. INICIALIZACIÓN DE EVENTOS (DOM CONTENT LOADED)
// ====================================================
document.addEventListener('DOMContentLoaded', () => {
  hablarDante("¡Hola! Soy Dante, tu guía en el entorno de Elba. Escribe 'help' para iniciar el recorrido.");

  const terminalInput = document.getElementById('terminal-input');
  const submitBtn = document.getElementById('terminal-submit-btn');

  if (terminalInput) {
    terminalInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        procesarEntrada();
      }
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', function () {
      procesarEntrada();
    });
  }
});
