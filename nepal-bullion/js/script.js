// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initNavigation();
    
    // Initialize FAQ accordions
    initFAQ();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize live price updates
    initLivePrices();
});

// Navigation functionality
function initNavigation() {
    const menuBtn = document.querySelector('.menu-btn');
    const closeBtn = document.querySelector('.close-btn');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.createElement('div');
    navOverlay.classList.add('nav-overlay');
    document.body.appendChild(navOverlay);
    
    // Open mobile menu
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            navLinks.classList.add('active');
            navOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close mobile menu
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }
    
    // Close menu when clicking overlay
    navOverlay.addEventListener('click', closeMenu);
    
    // Close menu when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Close menu function
    function closeMenu() {
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Sticky navigation
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// FAQ accordion functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Validate form
            if (!name || !email || !phone || !message) {
                showAlert('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }
            
            // Phone validation for Nepal
            const phoneRegex = /^(98|97)\d{8}$/;
            if (!phoneRegex.test(phone)) {
                showAlert('Please enter a valid Nepali phone number', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showAlert('Your message has been sent successfully!', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Alert function
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert ${type}`;
        alertDiv.textContent = message;
        
        // Add to DOM
        const contactSection = document.getElementById('contact');
        contactSection.insertBefore(alertDiv, contactSection.firstChild);
        
        // Remove after 3 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }
}

// Live price updates
function initLivePrices() {
    // In a real application, this would fetch from an API
    // For demo purposes, we'll simulate price updates
    
    const goldPriceElement = document.getElementById('gold-price');
    const silverPriceElement = document.getElementById('silver-price');
    const lastUpdatedElement = document.getElementById('last-updated');
    
    if (goldPriceElement && silverPriceElement) {
        // Initial prices
        let goldPrice = 112500;
        let silverPrice = 1450;
        
        // Update prices every 30 seconds
        setInterval(() => {
            // Simulate price fluctuations (±0.5%)
            const goldChange = (Math.random() - 0.5) * 0.01;
            const silverChange = (Math.random() - 0.5) * 0.01;
            
            goldPrice = Math.round(goldPrice * (1 + goldChange));
            silverPrice = Math.round(silverPrice * (1 + silverChange));
            
            // Update DOM
            goldPriceElement.textContent = goldPrice.toLocaleString();
            silverPriceElement.textContent = silverPrice.toLocaleString();
            
            // Update timestamp
            const now = new Date();
            const options = { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            lastUpdatedElement.textContent = now.toLocaleDateString('en-US', options) + ' NPT';
            
            // Update price change indicators
            const goldChangeElement = goldPriceElement.closest('.price-card').querySelector('.price-change');
            const silverChangeElement = silverPriceElement.closest('.price-card').querySelector('.price-change');
            
            if (goldChange > 0) {
                goldChangeElement.innerHTML = `<i class="fas fa-arrow-up"></i> ${(goldChange * 100).toFixed(2)}%`;
                goldChangeElement.className = 'price-change up';
            } else {
                goldChangeElement.innerHTML = `<i class="fas fa-arrow-down"></i> ${(Math.abs(goldChange) * 100).toFixed(2)}%`;
                goldChangeElement.className = 'price-change down';
            }
            
            if (silverChange > 0) {
                silverChangeElement.innerHTML = `<i class="fas fa-arrow-up"></i> ${(silverChange * 100).toFixed(2)}%`;
                silverChangeElement.className = 'price-change up';
            } else {
                silverChangeElement.innerHTML = `<i class="fas fa-arrow-down"></i> ${(Math.abs(silverChange) * 100).toFixed(2)}%`;
                silverChangeElement.className = 'price-change down';
            }
        }, 30000);
    }
}

