/* ==========================================================================
   SecticSolar - Modern Premium Application Script
   Handles glassmorphic navbar effects, mobile toggles, and interactive forms
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initContactForm();
  initMobileNav();
  initProductSlider();
  initScrollReveal();
  initDetailPage();
});

/**
 * Handle glassmorphism navbar background on scroll
 */
function initNavbarScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * Handle contact form submission and render premium toast feedback
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    if (!nameInput || !emailInput || !messageInput) return;

    // Validations
    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
      showToast('Error', 'Por favor complete todos los campos obligatorios.', 'pi-exclamation-triangle');
      return;
    }
    
    // Change button state to submitting
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="pi pi-spin pi-spinner mr-2"></i>Enviando...';
    
    // Simulate API request to backend
    setTimeout(() => {
      // Reset button
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      
      // Show success toast
      showToast(
        'Mensaje Enviado',
        `Gracias ${nameInput.value.trim()}, nos pondremos en contacto contigo pronto.`,
        'pi-check-circle'
      );
      
      // Reset form
      form.reset();
    }, 1800);
  });
}

/**
 * Handle Mobile hamburger nav toggle menu
 */
function initMobileNav() {
  const toggle = document.getElementById('navToggleBtn');
  const navUl = document.querySelector('nav ul');
  
  if (toggle && navUl) {
    toggle.addEventListener('click', () => {
      navUl.classList.toggle('mobile-active');
    });
  }
}

/**
 * Displays an ultra-premium toast notification on the screen
 */
function showToast(title, message, iconClass = 'pi-check-circle') {
  // Check if toast already exists
  let toast = document.querySelector('.toast-notification');
  
  if (!toast) {
    // Create toast markup
    toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
      <i class="pi ${iconClass}"></i>
      <div class="toast-text">
        <h4>${title}</h4>
        <p>${message}</p>
      </div>
    `;
    document.body.appendChild(toast);
  } else {
    // Update existing toast content
    const icon = toast.querySelector('i');
    const h4 = toast.querySelector('h4');
    const p = toast.querySelector('p');
    
    if (icon) {
      icon.className = `pi ${iconClass}`;
    }
    if (h4) h4.innerText = title;
    if (p) p.innerText = message;
  }
  
  // Trigger animations
  setTimeout(() => {
    toast.classList.add('active');
  }, 10);
  
  // Hide toast after 4.5 seconds
  setTimeout(() => {
    toast.classList.remove('active');
  }, 4500);
}

/**
 * Handle interactive product slider / showcase carousel for ConjuntoOS modules
 */
function initProductSlider() {
  const tabs = document.querySelectorAll('.slider-tab');
  const slides = document.querySelectorAll('.slider-slide');
  const descriptions = document.querySelectorAll('.desc-card');
  const prevBtn = document.getElementById('btnPrevSlide');
  const nextBtn = document.getElementById('btnNextSlide');
  const laptopWrapper = document.getElementById('laptopSliderWrapper');
  
  if (!tabs.length || !slides.length) return;
  
  let currentSlide = 0;
  let autoplayInterval = null;
  const autoplayDelay = 6000; // 6 seconds per slide
  
  // Function to show a specific slide
  function showSlide(index) {
    // Wrap around index
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    
    currentSlide = index;
    
    // Update tabs active state
    tabs.forEach(tab => {
      if (parseInt(tab.dataset.slide) === currentSlide) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    
    // Update slides active state
    slides.forEach(slide => {
      if (parseInt(slide.dataset.slide) === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
    
    // Update descriptions active state
    descriptions.forEach(desc => {
      if (parseInt(desc.dataset.slide) === currentSlide) {
        desc.classList.add('active');
      } else {
        desc.classList.remove('active');
      }
    });
  }
  
  // Tab click events
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      showSlide(parseInt(tab.dataset.slide));
      resetAutoplay();
    });
  });
  
  // Nav buttons click events
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentSlide - 1);
      resetAutoplay();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showSlide(currentSlide + 1);
      resetAutoplay();
    });
  }
  
  // Autoplay function
  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, autoplayDelay);
  }
  
  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }
  
  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }
  
  // Start autoplay immediately
  startAutoplay();
  
  // Pause autoplay on mouse hover over mockup or descriptions to let user read
  if (laptopWrapper) {
    laptopWrapper.addEventListener('mouseenter', stopAutoplay);
    laptopWrapper.addEventListener('mouseleave', startAutoplay);
  }
  
  const descContainer = document.querySelector('.showcase-descriptions');
  if (descContainer) {
    descContainer.addEventListener('mouseenter', stopAutoplay);
    descContainer.addEventListener('mouseleave', startAutoplay);
  }
}

/**
 * Simple Scroll Reveal animation using IntersectionObserver
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  if (!revealElements.length) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of the element is visible
  };
  
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target); // Stop observing once revealed
      }
    });
  }, observerOptions);
  
  revealElements.forEach(el => {
    observer.observe(el);
  });
}

/* ==========================================================================
   Ecosistema ConjuntoOS - Base de Datos Detallada para Módulos (modulo-detalle.html)
   ========================================================================== */

const MODULE_DETAILS_DB = {
  moduleCenso: {
    title: 'Censo & Red Familiar Inteligente',
    badge: 'Habitabilidad & Control',
    lead: 'Mapea de forma dinámica quién habita en tu copropiedad. Una base de datos relacional robusta que conecta a propietarios, arrendatarios, codeudores, vehículos y mascotas para una gestión blindada.',
    imgDesktop: 'assets/conjunto_os_censo.png',
    imgMobile: 'assets/conjunto_os_censo_mobile.png',
    step1Title: '1. Registro del Residente',
    step1Desc: 'La administración registra cada unidad y asocia a los habitantes. Se pueden tomar fotos al instante utilizando la webcam de portería o cargar archivos locales.',
    step2Title: '2. Vinculación y Parentesco',
    step2Desc: 'El sistema agrupa visualmente a los familiares de cada vivienda, definiendo roles claros de habitabilidad (propietario, inquilino principal, menor de edad, etc.).',
    step3Title: '3. Depuración Automática',
    step3Desc: 'Al registrarse la finalización de un contrato de arrendamiento, el censo de esa unidad se depura automáticamente, previniendo fallas de seguridad o suplantación.',
    videoThumbnail: 'assets/conjunto_os_censo.png',
    videoActions: [
      { time: 0, text: 'Iniciando módulo de Censo...' },
      { time: 3, text: 'Buscando apartamento 402...' },
      { time: 6, text: 'Cargando red familiar de Juan Pérez...' },
      { time: 10, text: 'Activando cámara web de portería para captura...' },
      { time: 15, text: 'Foto tomada correctamente. Guardando en servidor...' },
      { time: 20, text: 'Sincronizando estado en la app móvil del copropietario...' },
      { time: 26, text: 'Censo actualizado de forma segura en PostgreSQL base.' },
      { time: 32, text: 'Generando reporte demográfico en PDF...' },
      { time: 38, text: 'Módulo de Censo listo. Conexión WebSocket OK.' }
    ],
    comparison: [
      { process: 'Control de Habitantes', manual: '<span class="comp-bad"><i class="pi pi-times-circle"></i> Censos desactualizados</span> Registros en hojas de Excel propensos a quedar obsoletos al cambiar inquilinos.', conjuntoOS: '<span class="comp-good"><i class="pi pi-check-circle"></i> Sincronización en Caliente</span> Depuración automatizada al cambiar contratos y almacenamiento estructurado.' },
      { process: 'Registro Fotográfico', manual: '<span class="comp-bad"><i class="pi pi-times-circle"></i> Minutas de papel</span> La portería no conoce la cara del residente; riesgo de intrusiones operativas.', conjuntoOS: '<span class="comp-good"><i class="pi pi-check-circle"></i> Captura vía Webcam</span> Fotos de perfil de cada habitante y mascota visibles al vigilante en un clic.' },
      { process: 'Trazabilidad Histórica', manual: '<span class="comp-bad"><i class="pi pi-times-circle"></i> Pérdida de histórico</span> Borrados permanentes de registros que impiden auditorías de años anteriores.', conjuntoOS: '<span class="comp-good"><i class="pi pi-check-circle"></i> Logs Inalterables</span> Preservación legal del censo anterior de acuerdo con la ley de protección de datos.' }
    ],
    faqs: [
      { q: '¿Los datos históricos se borran cuando un inquilino se muda?', a: 'No. El software realiza un borrado lógico en caliente, lo que significa que el residente actual es el único activo para ingresar y votar, pero el historial completo de quién habitó anteriormente la unidad se conserva de forma segura en la base de datos para auditorías de la administración.' },
      { q: '¿Es obligatorio tomar la foto por webcam?', a: 'No, es opcional. El sistema permite al administrador o al vigilante tomar la foto en vivo por la cámara web para agilizar el proceso en portería, o bien, el residente puede adjuntar su foto directamente desde su app móvil para la respectiva validación.' },
      { q: '¿Cómo se protege esta información sensible?', a: 'ConjuntoOS cumple estrictamente con las leyes de protección de datos (Habeas Data). Toda la información personal de censo está encriptada y solo el administrador de la copropiedad tiene acceso a las fichas completas. El personal de vigilancia solo ve la información estrictamente necesaria para autorizar ingresos.' }
    ]
  },
  moduleAsambleas: {
    title: 'Asambleas & Quórum Real-Time',
    badge: 'Sockets Activos & Legalidad',
    lead: 'Digitalice por completo sus asambleas ordinarias y extraordinarias. Conexión activa mediante WebSockets para monitorear el quórum legal y registrar decisiones al instante.',
    imgDesktop: 'assets/conjunto_os_asambleas.png',
    imgMobile: 'assets/conjunto_os_asambleas_votacion.png',
    step1Title: '1. Registro e Ingreso Legal',
    step1Desc: 'Al ingresar a la asamblea, los residentes registran su presencia desde su móvil. Se computan automáticamente poderes de representación.',
    step2Title: '2. Monitoreo de Asistencia',
    step2Desc: 'El sistema calcula en tiempo real el porcentaje de quórum legal utilizando el coeficiente exacto de cada unidad residencial conectado vía Sockets.',
    step3Title: '3. Generación de Actas',
    step3Desc: 'Al cerrar la sesión, el sistema compila la asistencia, deliberaciones y votaciones en un acta preliminar oficial en formato PDF descargable.',
    videoThumbnail: 'assets/conjunto_os_asambleas.png',
    videoActions: [
      { time: 0, text: 'Iniciando Asamblea Ordinaria 2026...' },
      { time: 3, text: 'Monitoreando quórum legal inicial...' },
      { time: 6, text: 'Quórum actual: 52.4% (Asamblea constituida legalmente).' },
      { time: 12, text: 'WebSocket activo conectando a 124 dispositivos simultáneos...' },
      { time: 18, text: 'Usuario Apto 204 registra representación con poder digital...' },
      { time: 24, text: 'Recalculando quórum por coeficiente: 58.7% de copropiedad.' },
      { time: 30, text: 'Abriendo debate de aprobación presupuestaria...' },
      { time: 35, text: 'Registrando actas preliminares en caliente en la base de datos...' },
      { time: 38, text: 'Acta generada. Sesión de quórum guardada con éxito.' }
    ],
    comparison: [
      { process: 'Conteo de Asistencia', manual: '<span class="comp-bad"><i class="pi pi-times-circle"></i> Filas interminables</span> Firmas manuales en hojas de papel al ingreso que retrasan el inicio por horas.', conjuntoOS: '<span class="comp-good"><i class="pi pi-check-circle"></i> Auto-registro Digital</span> Check-in inmediato por código QR o app móvil que calcula asistencia al instante.' },
      { process: 'Cálculo de Quórum', manual: '<span class="comp-bad"><i class="pi pi-times-circle"></i> Calculadora manual</span> El administrador suma coeficientes manualmente en papel; propenso a disputas.', conjuntoOS: '<span class="comp-good"><i class="pi pi-check-circle"></i> Sockets en Tiempo Real</span> Sumatoria algorítmica de coeficientes en pantalla gigante activa segundo a segundo.' },
      { process: 'Redacción de Actas', manual: '<span class="comp-bad"><i class="pi pi-times-circle"></i> Semanas de demora</span> El secretario tarda días en transcribir notas y redactar el acta oficial de la sesión.', conjuntoOS: '<span class="comp-good"><i class="pi pi-check-circle"></i> Acta PDF Automatizada</span> Generación del borrador oficial del acta inmediatamente al cerrar la asamblea.' }
    ],
    faqs: [
      { q: '¿Qué validez legal tienen las asambleas y votos digitales?', a: 'Tienen total validez legal de acuerdo con la Ley 675 de 2001 de Propiedad Horizontal en Colombia y la legislación de comercio electrónico. El sistema genera firmas digitales, marcas de tiempo auditables y logs de WebSockets inalterables que sirven como prueba jurídica del quórum constituido y las decisiones aprobadas.' },
      { q: '¿Cómo vota un residente que no pudo asistir pero envió un poder?', a: 'El administrador registra previamente el poder digital en el sistema asociando el coeficiente del propietario ausente al residente delegado. Cuando el delegado ejerce su voto, el software suma automáticamente los coeficientes delegados bajo su perfil de manera transparente.' },
      { q: '¿Qué pasa si un usuario pierde su conexión de internet durante la asamblea?', a: 'ConjuntoOS cuenta con reconexión automática de sockets. Si el dispositivo se desconecta temporalmente, mantendrá su estado previo y, al recuperar la señal en segundos, volverá a integrarse al quórum activo sin alterar los resultados de las votaciones en curso.' }
    ]
  },
  moduleVotaciones: {
    title: 'Votaciones & Urnas Digitales',
    badge: 'Democracia & Agilidad',
    lead: 'Agilice la toma de decisiones sin asambleas extenuantes. Abra urnas seguras y reciba votos validados por coeficiente desde los smartphones de sus copropietarios.',
    imgDesktop: 'assets/conjunto_os_asambleas.png',
    imgMobile: 'assets/conjunto_os_asambleas_votacion.png',
    step1Title: '1. Apertura de la Urna',
    step1Desc: 'El administrador redacta la pregunta, define las opciones de voto (SÍ, NO, Abstención) y abre la urna digital con un clic.',
    step2Title: '2. Votación del Copropietario',
    step2Desc: 'Los residentes reciben una notificación push en su celular. Ingresan a la urna encriptada y marcan su decisión de forma confidencial.',
    step3Title: '3. Escrutinio en Vivo',
    step3Desc: 'El sistema procesa y proyecta los resultados instantáneamente en gráficos interactivos de barras y tortas ponderando los coeficientes.',
    videoThumbnail: 'assets/conjunto_os_asambleas.png',
    videoActions: [
      { time: 0, text: 'Abriendo Urna Digital: "Aprobación Presupuesto 2026"...' },
      { time: 3, text: 'Enviando notificaciones push a 250 residentes...' },
      { time: 7, text: 'Urna activa. Recibiendo votos vía WebSocket...' },
      { time: 12, text: 'Votos procesados: 45 (Coeficiente acumulado: 18.2%)...' },
      { time: 18, text: 'Votos procesados: 120 (Coeficiente acumulado: 48.9%)...' },
      { time: 24, text: 'Escrutinio en caliente: SÍ (78%), NO (15%), Abstención (7%)...' },
      { time: 30, text: 'Cierre automático de la urna por la administración...' },
      { time: 34, text: 'Resultados sellados criptográficamente. Exportando informe...' },
      { time: 38, text: 'Urna cerrada con éxito. Decisión legalmente constituida.' }
    ],
    comparison: [
      { process: 'Escrutinio de Votos', manual: '<span class="comp-bad"><i class="pi pi-times-circle"></i> Conteo a mano lenta</span> Papelitos depositados en cajas y contados manualmente por una comisión de escrutinio.', conjuntoOS: '<span class="comp-good"><i class="pi pi-check-circle"></i> Gráficos Interactivos</span> Resultados procesados al instante con porcentajes numéricos y gráficos visuales.' },
      { process: 'Participación Democrática', manual: '<span class="comp-bad"><i class="pi pi-times-circle"></i> Ausentismo elevado</span> Falta de quórum por copropietarios que no pueden asistir físicamente.', conjuntoOS: '<span class="comp-good"><i class="pi pi-check-circle"></i> Votación Remota Móvil</span> Copropietarios participan activamente desde cualquier lugar del mundo desde su celular.' },
      { process: 'Seguridad del Voto', manual: '<span class="comp-bad"><i class="pi pi-times-circle"></i> Riesgo de doble voto</span> Pérdida de control sobre quién votó; firmas falsas en representaciones.', conjuntoOS: '<span class="comp-good"><i class="pi pi-check-circle"></i> Criptografía & Logs</span> Blindaje inalterable que impide duplicar votos y asocia cada voto al coeficiente de propiedad.' }
    ],
    faqs: [
      { q: '¿Los votos de los residentes son anónimos?', a: 'Depende de la configuración de la votación. Para asambleas ordinarias, la Ley de Propiedad Horizontal exige que el voto esté asociado al coeficiente para validar el quórum y la votación nominal. En casos específicos de decisiones internas de convivencia, el administrador puede activar la opción de "Votación Secreta", garantizando el anonimato absoluto de las decisiones individuales.' },
      { q: '¿Cómo se evitan fraudes en las urnas digitales?', a: 'Cada usuario cuenta con credenciales encriptadas únicas asignadas en el censo oficial de ConjuntoOS. El sistema valida la dirección IP, el token de autenticación del dispositivo y restringe el acceso de modo que solo el propietario o su delegado registrado legalmente puedan votar una única vez.' },
      { q: '¿El sistema permite múltiples preguntas simultáneas?', a: 'Sí. El administrador puede preparar múltiples urnas digitales antes de iniciar una sesión y abrirlas de forma secuencial o simultánea según el desarrollo del orden del día.' }
    ]
  },
  modulePorteria: {
    title: 'Portería & Control de Accesos',
    badge: 'Seguridad Física & Bitácora',
    lead: 'Reemplace los viejos libros de minuta por una bitácora digital inalterable en la nube. Trazabilidad completa de correspondencia, visitantes y vehículos.',
    imgDesktop: 'assets/conjunto_os_porteria.png',
    imgMobile: 'assets/conjunto_os_porteria_correspondencia.png',
    step1Title: '1. Registro al Ingreso',
    step1Desc: 'El vigilante digita la cédula o placa del visitante. El sistema valida si el residente autorizó previamente el ingreso desde su app.',
    step2Title: '2. Foto y Alerta Inmediata',
    step2Desc: 'Se captura la foto del visitante y de sus documentos vía webcam. Automáticamente se envía una alerta push de ingreso al celular del residente.',
    step3Title: '3. Bitácora en la Nube',
    step3Desc: 'El registro queda sellado en la nube. Facilitando auditorías en segundos ante cualquier pérdida, daño o reclamación de seguridad.',
    videoThumbnail: 'assets/conjunto_os_porteria.png',
    videoActions: [
      { time: 0, text: 'Iniciando panel operativo de Portería...' },
      { time: 3, text: 'Registrando visitante: Carlos Gómez (CC: 79.123.456)...' },
      { time: 7, text: 'Buscando apartamento de destino: Apto 302...' },
      { time: 11, text: 'Validando pre-autorización de copropietario: AUTORIZADO.' },
      { time: 16, text: 'Capturando foto de ingreso mediante cámara 01...' },
      { time: 20, text: 'Enviando notificación automática de ingreso a residente...' },
      { time: 25, text: 'Registrando paquete de mensajería (Servientrega)...' },
      { time: 30, text: 'Alerta push de mensajería enviada al apartamento 302...' },
      { time: 38, text: 'Bitácora guardada en servidor. Portería en línea.' }
    ],
    comparison: [
      { process: 'Registro de Visitantes', manual: '<span class="comp-bad"><i class="pi pi-times-circle"></i> Minutas de papel</span> Escritura a mano ilegible, hojas rotas, sin fotos y lento para registrar.', conjuntoOS: '<span class="comp-good"><i class="pi pi-check-circle"></i> Trazabilidad Digital</span> Registro rápido en computador o tablet con foto en vivo y validación inmediata.' },
      { process: 'Paquetes y Correspondencia', manual: '<span class="comp-bad"><i class="pi pi-times-circle"></i> Tableros de tiza</span> Anuncios en la entrada que los residentes no ven; paquetes olvidados por semanas.', conjuntoOS: '<span class="comp-good"><i class="pi pi-check-circle"></i> Notificación Push</span> Alerta automática e instantánea al celular del residente al recibir encomiendas.' },
      { process: 'Control Vehicular', manual: '<span class="comp-bad"><i class="pi pi-times-circle"></i> Sin control de parqueo</span> Parqueo de visitantes invadido por residentes sin control de tiempos.', conjuntoOS: '<span class="comp-good"><i class="pi pi-check-circle"></i> Tarifación y Placas</span> Trazabilidad de placas y control automático de asignación de celdas.' }
    ],
    faqs: [
      { q: '¿Qué pasa si el vigilante no tiene internet temporalmente?', a: 'ConjuntoOS cuenta con caché de almacenamiento local. El vigilante puede continuar registrando ingresos básicos fuera de línea y, en cuanto la conexión retorne, los datos se sincronizan automáticamente con el servidor en la nube sin pérdida de información.' },
      { q: '¿Los residentes pueden registrar visitas con antelación?', a: 'Sí. A través de la aplicación del residente, los copropietarios pueden registrar visitas programadas (familiares, domiciliarios, servicios técnicos). Al llegar a la portería, el sistema alerta al vigilante que el acceso ya está pre-autorizado, agilizando el ingreso.' },
      { q: '¿Se integra con lectoras de códigos de barra para cédulas?', a: 'Sí. El software es compatible con escáneres de códigos de barras USB estándar que permiten leer la cédula de ciudadanía colombiana al instante para evitar digitación manual por parte del vigilante.' }
    ]
  },
  moduleFinanzas: {
    title: 'Finanzas & Cartera Morosa',
    badge: 'Cobranza & Transparencia',
    lead: 'Automatice la facturación de expensas comunes. Mantenga a los residentes informados sobre sus cuentas y reduzca la mora mediante recordatorios dinámicos.',
    imgDesktop: 'assets/conjunto_os_finanzas.png',
    imgMobile: 'assets/conjunto_os_finanzas_recibo.png',
    step1Title: '1. Facturación Mensual',
    step1Desc: 'El sistema genera automáticamente el cobro de la cuota de administración ordinaria al iniciar el mes conforme a la ley.',
    step2Title: '2. Visualización en la App',
    step2Desc: 'El residente ingresa a su perfil móvil, visualiza su estado de cuenta en un semáforo interactivo ("Al Día" verde, "En Mora" rojo).',
    step3Title: '3. Recordatorios y Cobros',
    step3Desc: 'El sistema envía notificaciones push preventivas de pago y listados automáticos de cartera al administrador.',
    videoThumbnail: 'assets/conjunto_os_finanzas.png',
    videoActions: [
      { time: 0, text: 'Abriendo módulo de Finanzas...' },
      { time: 3, text: 'Procesando facturación mensual masiva para 150 unidades...' },
      { time: 8, text: 'Facturas generadas en base de datos. Cargando saldos...' },
      { time: 14, text: 'Apartamento 101 marcado como "En Mora" (Deuda: $350.000 COP)...' },
      { time: 20, text: 'Enviando recordatorio de pago automático al Apto 101...' },
      { time: 25, text: 'Usuario Apto 302 realiza reporte de pago digital...' },
      { time: 30, text: 'Conciliando depósito en base de datos. Pago aprobado!' },
      { time: 34, text: 'Generando recibo de pago digital sellado en PDF...' },
      { time: 38, text: 'Recaudo mensual actualizado. Reporte financiero listo.' }
    ],
    comparison: [
      { process: 'Entrega de Estados de Cuenta', manual: '<span class="comp-bad"><i class="pi pi-times-circle"></i> Papel bajo la puerta</span> Facturas impresas que se pierden o dañan; falta de comunicación.', conjuntoOS: '<span class="comp-good"><i class="pi pi-check-circle"></i> Cuenta Digital Móvil</span> Visualización del estado de cuenta en vivo 24/7 en el perfil del copropietario.' },
      { process: 'Cobro de Morosos', manual: '<span class="comp-bad"><i class="pi pi-times-circle"></i> Llamadas molestas</span> Cobranza manual incómoda y listas públicas en carteleras propensas a demandas.', conjuntoOS: '<span class="comp-good"><i class="pi pi-check-circle"></i> Semáforo y Alertas push</span> Notificaciones preventivas amigables y discretas directas al smartphone.' },
      { process: 'Control de Recaudo', manual: '<span class="comp-bad"><i class="pi pi-times-circle"></i> Conciliación lenta</span> El administrador revisa extractos bancarios uno por uno para validar pagos.', conjuntoOS: '<span class="comp-good"><i class="pi pi-check-circle"></i> Reporte de Pago Digital</span> El residente sube la foto del comprobante para aprobación rápida en panel.' }
    ],
    faqs: [
      { q: '¿El software realiza la conciliación bancaria automáticamente?', a: 'Sí. Los residentes reportan sus consignaciones o transferencias subiendo la foto del comprobante desde la app. El administrador visualiza este reporte en su consola y, al confirmarlo, el sistema actualiza el estado de cuenta y genera el recibo digital de manera automática.' },
      { q: '¿Se pueden cobrar intereses de mora automatizados?', a: 'Sí. El software permite configurar el porcentaje de interés moratorio legal establecido por la asamblea y el día de corte. A partir de esa fecha, el sistema añade el cobro de intereses a las cuentas morosas de manera automática.' },
      { q: '¿Se pueden descargar los reportes en formato Excel?', a: 'Sí. Toda la información de cartera morosa, estados de cuenta históricos y cobros mensuales se puede exportar en un clic a formato Excel (CSV) para su integración con otros software contables.' }
    ]
  },
  modulePermisos: {
    title: 'Matriz de Permisos Efectivos',
    badge: 'Ciberseguridad & Habeas Data',
    lead: 'Protección absoluta de la información residencial. Configure con precisión quirúrgica qué puede ver y modificar cada usuario en el sistema.',
    imgDesktop: 'assets/conjunto_os_dashboard.png',
    imgMobile: 'assets/conjunto_os_censo_mobile.png',
    step1Title: '1. Selección de Rol',
    step1Desc: 'El administrador ingresa al panel de seguridad de ConjuntoOS y selecciona el perfil que desea auditar (vigilante, copropietario, consejo).',
    step2Title: '2. Asignación Granular',
    step2Desc: 'Se activan o desactivan permisos de lectura, creación o edición por cada pestaña o módulo mediante interruptores visuales rápidos.',
    step3Title: '3. Auditoría de Seguridad',
    step3Desc: 'El sistema registra y audita de forma inalterable las marcas de tiempo y acciones realizadas por cada usuario en base de datos.',
    videoThumbnail: 'assets/conjunto_os_dashboard.png',
    videoActions: [
      { time: 0, text: 'Iniciando Matriz de Seguridad y Permisos...' },
      { time: 3, text: 'Buscando perfiles de usuario: Rol "Vigilante Portería"...' },
      { time: 7, text: 'Permiso "Ver Teléfonos de Residentes" modificado a: NINGUNO.' },
      { time: 13, text: 'Permiso "Ver Estados Financieros" modificado a: NINGUNO.' },
      { time: 20, text: 'Garantizando estricto cumplimiento de Habeas Data...' },
      { time: 26, text: 'Marcando accesos autorizados para Rol "Administración": FULL ACCESS.' },
      { time: 32, text: 'Sincronizando directivas de seguridad en la nube...' },
      { time: 36, text: 'Generando registro de auditoría del cambio de permisos...' },
      { time: 38, text: 'Matriz de seguridad sellada. Directivas activas.' }
    ],
    comparison: [
      { process: 'Privacidad de Datos', manual: '<span class="comp-bad"><i class="pi pi-times-circle"></i> Datos expuestos</span> Datos personales impresos en portería al alcance de cualquier visitante.', conjuntoOS: '<span class="comp-good"><i class="pi pi-check-circle"></i> Habeas Data Blindado</span> Restricción estricta de datos sensibles: vigilantes no ven teléfonos ni correos.' },
      { process: 'Asignación de Roles', manual: '<span class="comp-bad"><i class="pi pi-times-circle"></i> Claves compartidas</span> Todos ingresan con la misma contraseña genérica de administrador.', conjuntoOS: '<span class="comp-good"><i class="pi pi-check-circle"></i> Cuentas Individuales</span> Credenciales encriptadas independientes con alcances específicos por usuario.' },
      { process: 'Auditoría de Cambios', manual: '<span class="comp-bad"><i class="pi pi-times-circle"></i> Sin trazabilidad</span> Imposible saber quién modificó o borró un registro en el sistema.', conjuntoOS: '<span class="comp-good"><i class="pi pi-check-circle"></i> Logs de Actividad</span> Registro permanente e inalterable en base de datos de cada acción del personal.' }
    ],
    faqs: [
      { q: '¿Por qué el personal de portería no debe ver los números telefónicos?', a: 'Para cumplir rigurosamente con la Ley de Protección de Datos Personales (Habeas Data). Los vigilantes no requieren conocer el teléfono personal del residente para comunicarse; el sistema les permite realizar una intercomunicación digital interna a la aplicación del residente sin revelar números de celular, previniendo mal manejo de información o acoso.' },
      { q: '¿El administrador puede delegar tareas a miembros del consejo?', a: 'Sí. El administrador puede crear un rol de "Consejo de Administración" y otorgarle permisos de "Sólo Lectura" para que puedan revisar las finanzas, censo o correspondencia sin alterar ningún dato.' },
      { q: '¿El sistema bloquea accesos sospechosos?', a: 'Sí. ConjuntoOS cuenta con detección de accesos inusuales. Si un usuario intenta ingresar desde un país diferente o falla su clave repetidamente, el sistema bloquea temporalmente el perfil y notifica al administrador de inmediato.' }
    ]
  }
};

/**
 * Handles the popup modal detailing module operations for Ecosistema ConjuntoOS (servicios.html)
 */
function initDetailPage() {
  const container = document.querySelector('.detail-container');
  if (!container) return; // Only execute on modulo-detalle.html page
  
  // Get Module ID from URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const moduleId = urlParams.get('id');
  
  // Redirect to servicios.html if no valid ID is passed
  if (!moduleId || !MODULE_DETAILS_DB[moduleId]) {
    window.location.href = 'servicios.html';
    return;
  }
  
  const data = MODULE_DETAILS_DB[moduleId];
  
  // Populate Title, Badge, Description Lead
  document.getElementById('pageTitle').innerText = `${data.title} | ConjuntoOS`;
  document.getElementById('moduleTitle').innerHTML = data.title.replace('&', '<span>&</span>');
  document.getElementById('moduleBadge').innerHTML = `<i class="pi pi-verified"></i> ${data.badge}`;
  document.getElementById('moduleLead').innerText = data.lead;
  
  // Populate Gallery Images
  document.getElementById('imgDesktop').src = data.imgDesktop;
  document.getElementById('imgMobile').src = data.imgMobile;
  
  // Populate Steps Cards
  document.getElementById('step1Title').innerText = data.step1Title;
  document.getElementById('step2Title').innerText = data.step2Title;
  document.getElementById('step3Title').innerText = data.step3Title;
  document.getElementById('step1Desc').innerText = data.step1Desc;
  document.getElementById('step2Desc').innerText = data.step2Desc;
  document.getElementById('step3Desc').innerText = data.step3Desc;
  
  // Populate Comparison Table Body
  const compBody = document.getElementById('comparisonTableBody');
  if (compBody) {
    compBody.innerHTML = ''; // Clear template content
    data.comparison.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${row.process}</strong></td>
        <td>${row.manual}</td>
        <td>${row.conjuntoOS}</td>
      `;
      compBody.appendChild(tr);
    });
  }
  
  // Populate FAQs Accordion
  const faqAccordion = document.getElementById('faqAccordion');
  if (faqAccordion) {
    faqAccordion.innerHTML = ''; // Clear template content
    data.faqs.forEach(faq => {
      const details = document.createElement('details');
      details.innerHTML = `
        <summary>${faq.q}</summary>
        <div class="faq-answer">${faq.a}</div>
      `;
      faqAccordion.appendChild(details);
    });
  }
  
  // Populate Video Player Video Thumbnail
  const thumbnail = document.getElementById('videoThumbnail');
  if (thumbnail) {
    thumbnail.src = data.videoThumbnail;
  }
  
  // Initialize Video Player Simulator
  initVideoPlayer(data.videoActions);
}

/**
 * Handles the fully customized simulated interactive Video Player walkthrough
 */
function initVideoPlayer(actions) {
  const container = document.getElementById('videoContainer');
  if (!container || !actions || !actions.length) return;
  
  const playPauseBtn = document.getElementById('btnPlayPause');
  const playCenterBtn = document.getElementById('videoPlayCenterBtn');
  const overlay = document.getElementById('videoOverlay');
  const progressBar = document.getElementById('progressBarFill');
  const actionLog = document.getElementById('videoActionLog');
  const actionText = document.getElementById('videoActionText');
  const timeText = document.getElementById('videoTime');
  const spinner = document.getElementById('videoSpinner');
  
  let isPlaying = false;
  let currentTime = 0;
  const duration = 45; // 45 seconds total duration
  let videoInterval = null;
  
  // Toggle Play / Pause state
  function togglePlay() {
    if (isPlaying) {
      pauseVideo();
    } else {
      playVideo();
    }
  }
  
  // Start/Play Video simulation
  function playVideo() {
    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="pi pi-pause"></i>';
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    
    // Simulate initial WebSocket loading spinner on start
    if (currentTime === 0) {
      spinner.classList.add('active');
      actionLog.classList.remove('active');
      setTimeout(() => {
        spinner.classList.remove('active');
        if (isPlaying) actionLog.classList.add('active');
      }, 2500);
    } else {
      actionLog.classList.add('active');
    }
    
    videoInterval = setInterval(() => {
      currentTime++;
      
      // Update progress bar
      const progressPercent = (currentTime / duration) * 100;
      progressBar.style.width = `${progressPercent}%`;
      
      // Update video time text
      const min = Math.floor(currentTime / 60);
      const sec = currentTime % 60;
      const secStr = sec < 10 ? `0${sec}` : sec;
      timeText.innerText = `${min}:${secStr} / 0:45`;
      
      // Update textual action logs matching simulated timeline
      const currentAction = actions.find(action => action.time === currentTime);
      if (currentAction) {
        actionText.innerHTML = `<i class="pi pi-arrow-right-circle text-amber-500 mr-2"></i> ${currentAction.text}`;
        
        // Brief log highlighting animation effect
        actionLog.classList.remove('highlight');
        setTimeout(() => {
          actionLog.classList.add('highlight');
        }, 10);
      }
      
      // Handle end of video
      if (currentTime >= duration) {
        resetVideo();
      }
    }, 1000);
  }
  
  // Pause Video simulation
  function pauseVideo() {
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="pi pi-play"></i>';
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'auto';
    spinner.classList.remove('active');
    actionLog.classList.remove('active');
    
    if (videoInterval) {
      clearInterval(videoInterval);
      videoInterval = null;
    }
  }
  
  // Reset Video back to start
  function resetVideo() {
    pauseVideo();
    currentTime = 0;
    progressBar.style.width = '0%';
    timeText.innerText = '0:00 / 0:45';
    actionText.innerHTML = '<i class="pi pi-info-circle text-amber-500 mr-2"></i> Iniciando demostración guiada...';
  }
  
  // Attach listeners
  playPauseBtn.addEventListener('click', togglePlay);
  playCenterBtn.addEventListener('click', togglePlay);
  
  // Support clicking on overlay directly to toggle
  overlay.addEventListener('click', togglePlay);
}
