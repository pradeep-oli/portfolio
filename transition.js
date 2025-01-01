function createTransitionOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'page-transition';
    overlay.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(overlay);
    
    // Force a reflow to ensure the transition works
    overlay.offsetHeight;
    
    return overlay;
}

function handlePageTransition(url) {
    const overlay = createTransitionOverlay();
    
    setTimeout(() => {
        window.location.href = url;
    }, 500);
}

// Add transition to all internal links
document.addEventListener('DOMContentLoaded', () => {
    // Handle all internal navigation links
    const internalLinks = document.querySelectorAll('a[href^="index.html"], .nav-links a');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            
            // Show transition overlay
            const overlay = document.querySelector('.page-transition');
            if (!overlay) {
                createTransitionOverlay();
            }
            const existingOverlay = document.querySelector('.page-transition');
            existingOverlay.style.display = 'flex';
            existingOverlay.classList.remove('fade-out');
            
            // Wait for animation
            setTimeout(() => {
                // Navigate to the target page
                window.location.href = target;
            }, 500);
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            // Page was loaded from cache (back/forward navigation)
            const overlay = document.querySelector('.page-transition');
            overlay.style.display = 'none';
            overlay.classList.add('fade-out');
        }
    });

    // Hide transition overlay when page is fully loaded
    window.addEventListener('load', () => {
        const overlay = document.querySelector('.page-transition');
        if (overlay) {
            overlay.classList.add('fade-out');
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 500);
        }
    });
});

// Loading Animation
document.addEventListener('DOMContentLoaded', () => {
    const loadingLine = document.querySelector('.loading-line');
    const logoLink = document.querySelector('.nav-content .logo');

    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Logo clicked'); // Debug log
            
            // Start loading animation
            loadingLine.classList.add('active');
            
            // Reload after animation
            setTimeout(() => {
                window.location.href = logoLink.href;
            }, 1500);
        });
    }
});

// Show loading on initial page load
document.addEventListener('DOMContentLoaded', () => {
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        projectsGrid.classList.add('loading');
        setTimeout(() => {
            projectsGrid.classList.remove('loading');
        }, 1000);
    }
});
