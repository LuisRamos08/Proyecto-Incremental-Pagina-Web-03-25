document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('menu-toggle');
  const menuList = document.getElementById('menu-list');
  const backdrop = document.getElementById('menu-backdrop');
  if (!toggleBtn || !menuList) return;

  const mq = window.matchMedia('(max-width: 768px)');

  function syncBackdrop(open) {
    if (!backdrop) return;
    if (open) {
      backdrop.classList.add('active');
      backdrop.removeAttribute('hidden');
    } else {
      backdrop.classList.remove('active');
      backdrop.setAttribute('hidden', '');
    }
  }

  function closeMenu() {
    menuList.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
    syncBackdrop(false);
  }

  toggleBtn.addEventListener('click', () => {
    const isOpen = menuList.classList.toggle('active');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('no-scroll', isOpen);
    syncBackdrop(isOpen);
  });

  // Cerrar al hacer click en un enlace (comportamiento típico en móvil)
  menuList.addEventListener('click', (e) => {
    const target = e.target;
    if (target instanceof Element && target.closest('a') && mq.matches) {
      closeMenu();
    }
  });

  // Cerrar con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Cerrar al tocar/clickear fuera (backdrop)
  backdrop?.addEventListener('click', closeMenu);

  // Si se cambia el tamaño de la ventana a desktop, asegúrate de resetear estado
  mq.addEventListener('change', () => {
    if (!mq.matches) {
      // En escritorio, aseguramos que el menú esté oculto y botón "cerrado"
      menuList.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
      syncBackdrop(false);
    }
  });
});
