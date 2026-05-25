/* ==========================================================================
   SecticSolar - Modern Premium Application Script
   Handles glassmorphic navbar effects, mobile toggles, and interactive forms
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initContactForm();
  initMobileNav();
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
