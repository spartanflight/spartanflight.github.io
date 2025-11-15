// Load header and footer into pages
(function() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        // Determine base path based on current location
        function getBasePath() {
            const path = window.location.pathname;
            if (path.includes('/projects/')) {
                return '../';
            }
            return '';
        }

        const basePath = getBasePath();

        // Load header
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            fetch(basePath + 'header.html')
                .then(response => {
                    if (!response.ok) throw new Error('Failed to load header');
                    return response.text();
                })
                .then(data => {
                    headerPlaceholder.outerHTML = data;
                    initMobileMenu();
                })
                .catch(err => {
                    console.error('Error loading header:', err);
                    // Fallback: show error message
                    headerPlaceholder.innerHTML = '<p style="padding: 1rem; color: red;">Error loading header. Please refresh the page.</p>';
                });
        }

        // Load footer
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            fetch(basePath + 'footer.html')
                .then(response => {
                    if (!response.ok) throw new Error('Failed to load footer');
                    return response.text();
                })
                .then(data => {
                    footerPlaceholder.outerHTML = data;
                })
                .catch(err => {
                    console.error('Error loading footer:', err);
                    // Fallback: show error message
                    footerPlaceholder.innerHTML = '<p style="padding: 1rem; color: red;">Error loading footer. Please refresh the page.</p>';
                });
        }
    }

    // Initialize mobile menu functionality
    function initMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');

        if (mobileMenuToggle && mobileMenu) {
            // Remove any existing listeners by cloning
            const newToggle = mobileMenuToggle.cloneNode(true);
            mobileMenuToggle.parentNode.replaceChild(newToggle, mobileMenuToggle);
            
            const newMenu = mobileMenu.cloneNode(true);
            mobileMenu.parentNode.replaceChild(newMenu, mobileMenu);

            const toggle = document.getElementById('mobileMenuToggle');
            const menu = document.getElementById('mobileMenu');

            toggle.addEventListener('click', function(e) {
                e.stopPropagation();
                toggle.classList.toggle('active');
                menu.classList.toggle('active');
            });

            // Close mobile menu when clicking a link
            const mobileMenuLinks = menu.querySelectorAll('a');
            mobileMenuLinks.forEach(link => {
                link.addEventListener('click', function() {
                    toggle.classList.remove('active');
                    menu.classList.remove('active');
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', function(event) {
                const isClickInside = menu.contains(event.target) || 
                                     toggle.contains(event.target);
                if (!isClickInside && menu.classList.contains('active')) {
                    toggle.classList.remove('active');
                    menu.classList.remove('active');
                }
            });
        }
    }
})();

