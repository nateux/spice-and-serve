document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Functionality
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeButton = document.querySelector('.mobile-menu-close');

  // Toggle mobile menu
  function toggleMenu() {
    const isOpen = mobileMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
  }

  // Close menu function
  function closeMenu() {
    mobileMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  // Event listeners for menu
  if (menuToggle && mobileMenu && closeButton) {
    menuToggle.addEventListener('click', toggleMenu);
    closeButton.addEventListener('click', closeMenu);

    // Close when clicking on nav links
    document.querySelectorAll('.mobile-nav a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close when clicking outside
    document.addEventListener('click', function(e) {
      if (mobileMenu.classList.contains('active') &&
          !mobileMenu.contains(e.target) &&
          !menuToggle.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  // Auto-Expanding Search Box 
  const searchInput = document.querySelector('.chat-input');

  function adjustSearchHeight() {
    if (searchInput) {
      // Reset height to get correct scrollHeight
      searchInput.style.height = 'auto';
      // Set new height based on content
      searchInput.style.height = searchInput.scrollHeight + 'px';
      
      // Adjust container height if needed
      const container = searchInput.closest('.chat-container');
      if (container) {
        container.style.minHeight = 'auto';
        container.style.minHeight = (searchInput.scrollHeight + 80) + 'px';
      }
    }
  }

  // Initialize and set up event listener
  if (searchInput) {
    adjustSearchHeight();
    
    searchInput.addEventListener('input', adjustSearchHeight);
    
    window.addEventListener('resize', adjustSearchHeight);
  }
});