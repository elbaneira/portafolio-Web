document.addEventListener('DOMContentLoaded', () => {
  const avatarText = document.getElementById('avatar-text');
  let typingTimeout;

  const projectStories = {
    'Terra Alfajor (Concana)': '🚀 ¡Este es un POS real! Elba resolvió la lógica de pedidos en tiempo real para cocina, cierre diario y despliegue continuo en PythonAnywhere.',
    'SGMO': '📊 Proyecto enfocado en control de costos de mano de obra para construcción. ¡Maneja lógica de contratos, asistencias e informes automatizados!',
    'Django Web App': '📋 Plataforma para la gestión estructurada de proyectos y tareas con autenticación y flujo de estados en Django.',
    'Alke Wallet': '💳 Modelo de base de datos relacional en MySQL para controlar transacciones financieras, usuarios y monedas con alta integridad.',
    'Gestión de Clientes': '🧩 Aplicación construida 100% bajo Programación Orientada a Objetos en Python para gestión dinámica de CRUD.',
    'Power BI Dashboards': '📈 Análisis visual de datos operacionales para convertir registros planos en indicadores estratégicos de decisión.',
    '18 Septiembre / Ramada': '⚡ Solución Express para un puesto de eventos: registró pedidos y calculó insumos críticos al instante.',
    'Comunidad': '🏠 Próximo proyecto: Sistema SaaS enfocado en resolver la administración y convivencia en condominios.'
  };

  function typeWriter(text, i = 0) {
    if (i === 0) avatarText.textContent = '';
    if (i < text.length) {
      avatarText.textContent += text.charAt(i);
      typingTimeout = setTimeout(() => typeWriter(text, i + 1), 20);
    }
  }

  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const titleElement = card.querySelector('h3');
      if (titleElement) {
        const title = titleElement.textContent.trim();
        if (projectStories[title]) {
          clearTimeout(typingTimeout);
          typeWriter(projectStories[title]);
        }
      }
    });

    card.addEventListener('mouseleave', () => {
      clearTimeout(typingTimeout);
      typeWriter('👋 ¡Hola! Pasa el cursor sobre cualquier proyecto para contarte los detalles técnicos de cada uno.');
    });
  });
});