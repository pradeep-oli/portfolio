(function() {
    // EmailJS configuration
    emailjs.init("AqwMg11DfdSqXuUt5");

    const contactForm = document.getElementById('contactForm');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Change button state to loading
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Prepare the email parameters
        const templateParams = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            to_email: 'pradeepofficial63@gmail.com'
        };

        // Send the email using EmailJS
        emailjs.send('service_4v69tsl', 'template_beodf6r', templateParams)
            .then(function(response) {
                // Show success message
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
            }, function(error) {
                // Show error message
                showNotification('Failed to send message. Please try again.', 'error');
                console.error('EmailJS error:', error);
            })
            .finally(function() {
                // Reset button state
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            });
    });

    // Notification function
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            ${message}
        `;
        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
})();
