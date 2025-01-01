// Navigation Links with Loading Line
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu and Navigation
    const menuBtn = document.querySelector('.menu-btn');
    const closeBtn = document.querySelector('.close-btn');
    const navLinks = document.querySelector('.nav-links');

    // Open menu
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.add('active');
        });
    }

    // Close menu
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    }

    // Add loading line animation for contact page nav links
    if (window.location.pathname.includes('contact.html')) {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href').includes('index.html')) {
                    e.preventDefault();
                    const loadingLine = document.querySelector('.loading-line');
                    loadingLine.classList.add('active');
                    
                    setTimeout(() => {
                        window.location.href = this.getAttribute('href');
                    }, 1000);
                }
            });
        });
    }

    // Logo click handler to scroll to home
    document.querySelector('.logo').addEventListener('click', (e) => {
        if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Ensure smooth scroll to home section after page loads
    window.addEventListener('load', () => {
        if (window.location.hash === '#home') {
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
        }
    });
});

// Simple smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Contact Form
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    emailjs.init("AqwMg11DfdSqXuUt5");

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        let messageTimeout;

        function showMessage(type, text) {
            // Clear any existing timeouts
            if (messageTimeout) {
                clearTimeout(messageTimeout);
            }

            // Remove any existing messages
            document.querySelectorAll('.success-message, .error-message').forEach(msg => msg.remove());

            // Create and show new message
            const message = document.createElement('div');
            message.className = type === 'success' ? 'success-message' : 'error-message';
            const icon = type === 'success' ? 'check-circle' : 'exclamation-circle';
            message.innerHTML = `<i class="fas fa-${icon}"></i> ${text}`;
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            contactForm.insertBefore(message, submitBtn);

            // Set timeout to remove message
            messageTimeout = setTimeout(() => {
                message.remove();
            }, 5000);
        }

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Remove any existing messages
            document.querySelectorAll('.success-message, .error-message').forEach(msg => msg.remove());

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Get form data
            const formData = {
                name: contactForm.querySelector('#name').value,
                email: contactForm.querySelector('#email').value,
                subject: contactForm.querySelector('#subject').value,
                message: contactForm.querySelector('#message').value
            };

            try {
                // Send email using EmailJS
                await emailjs.send(
                    'service_v2wfvts',
                    'template_beodf6r',
                    {
                        from_name: formData.name,
                        from_email: formData.email,
                        subject: formData.subject,
                        message: formData.message
                    }
                );

                // Reset form and button first
                contactForm.reset();
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                submitBtn.disabled = false;

                // Show success message
                showMessage('success', 'Message sent successfully!');
            } catch (error) {
                console.error('Failed to send message:', error);
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                submitBtn.disabled = false;
                showMessage('error', 'Failed to send message. Please try again.');
            }
        });
    }
});

// Loading line animation
function showLoadingLine(duration = 1500) {
    const loadingLine = document.querySelector('.loading-line');
    loadingLine.style.width = '0%';
    loadingLine.style.display = 'block';
    
    let width = 0;
    const increment = 100 / (duration / 20); // Calculate increment based on duration
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingLine.style.display = 'none';
            }, 300);
        } else {
            width += increment;
            loadingLine.style.width = width + '%';
        }
    }, 20);
}

// Add click event for CV download
document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.querySelector('a[href*="drive.google.com"]');
    if (downloadButton) {
        downloadButton.addEventListener('click', (e) => {
            showLoadingLine(5000); // 5 seconds for CV download
        });
    }
});

// Scroll to top on page load/refresh
window.addEventListener('load', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
