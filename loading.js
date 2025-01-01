// Loading Line Animation
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const loadingLine = document.querySelector('.loading-line');
    const logo = document.querySelector('.nav-content .logo');
    const emailCard = document.querySelector('.contact-card:first-child'); // Updated selector
    const backButton = document.querySelector('.back-button');

    // Function to handle loading animation
    function startLoading(e, targetUrl) {
        e.preventDefault();
        console.log('Loading animation started'); // Debug log
        
        // Show loading line
        loadingLine.classList.add('active');
        
        // Wait for animation then navigate
        setTimeout(() => {
            if (targetUrl) {
                window.location.href = targetUrl;
            } else {
                // Get current page
                const currentPage = window.location.pathname;
                
                // If on contact page, go to home. Otherwise just refresh
                if (currentPage.includes('contact.html')) {
                    window.location.href = 'index.html';
                } else {
                    window.location.reload();
                }
            }
        }, 1500);
    }

    // Add click event to logo
    if (logo) {
        logo.addEventListener('click', (e) => startLoading(e));
    }

    // Add click event to email card
    if (emailCard) {
        emailCard.addEventListener('click', (e) => startLoading(e, 'contact.html'));
    }

    // Add click event to back button on contact page
    if (backButton) {
        backButton.addEventListener('click', (e) => startLoading(e, 'index.html'));
    }

    // Handle browser back button
    window.addEventListener('popstate', function(e) {
        if (window.location.pathname.includes('contact.html')) {
            e.preventDefault();
            startLoading(e, 'index.html');
        }
    });
});
