// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize authentication functionality
    initAuth();
});

function initAuth() {
    // Toggle password visibility
    initPasswordToggle();
    
    // Initialize login form
    initLoginForm();
    
    // Initialize registration forms
    initRegistrationForms();
    
    // Initialize file uploads for KYC
    initFileUploads();
}

// Toggle password visibility
function initPasswordToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle input type
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

// Login form functionality
function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember')?.checked || false;
            
            // Validate form
            if (!email || !password) {
                showAlert('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            if (!validateEmail(email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate login API call
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Logging in...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // In a real app, this would be an API call to your backend
                // For demo purposes, we'll just simulate a successful login
                
                // Store user session (in a real app, this would be a JWT token)
                if (remember) {
                    localStorage.setItem('user', JSON.stringify({ email }));
                } else {
                    sessionStorage.setItem('user', JSON.stringify({ email }));
                }
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
                
                // Reset button state (this won't execute due to redirect)
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Registration forms functionality
function initRegistrationForms() {
    // Step 1: Account Information
    const registerStep1 = document.getElementById('registerStep1');
    const registerStep2 = document.getElementById('registerStep2');
    const registerStep3 = document.getElementById('registerStep3');
    
    if (registerStep1) {
        registerStep1.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terms = document.getElementById('terms').checked;
            
            // Validate form
            if (!email || !phone || !password || !confirmPassword) {
                showAlert('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            if (!validateEmail(email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }
            
            // Phone validation for Nepal
            if (!validateNepalPhone(phone)) {
                showAlert('Please enter a valid Nepali phone number', 'error');
                return;
            }
            
            // Password validation
            if (!validatePassword(password)) {
                showAlert('Password must be at least 8 characters with at least one uppercase letter, one number, and one special character', 'error');
                return;
            }
            
            // Confirm password
            if (password !== confirmPassword) {
                showAlert('Passwords do not match', 'error');
                return;
            }
            
            // Terms agreement
            if (!terms) {
                showAlert('You must agree to the Terms of Service and Privacy Policy', 'error');
                return;
            }
            
            // Store form data (in a real app, this would be in a state management system)
            sessionStorage.setItem('registerStep1', JSON.stringify({
                email,
                phone,
                password
            }));
            
            // Move to next step
            goToStep(2);
        });
    }
    
    // Step 2: Personal Information
    if (registerStep2) {
        registerStep2.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const fullName = document.getElementById('fullName').value;
            const dob = document.getElementById('dob').value;
            const gender = document.getElementById('gender').value;
            const address = document.getElementById('address').value;
            const city = document.getElementById('city').value;
            const province = document.getElementById('province').value;
            
            // Validate form
            if (!fullName || !dob || !gender || !address || !city || !province) {
                showAlert('Please fill in all fields', 'error');
                return;
            }
            
            // Age validation (must be at least 18 years old)
            const birthDate = new Date(dob);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            if (age < 18) {
                showAlert('You must be at least 18 years old to register', 'error');
                return;
            }
            
            // Store form data
            sessionStorage.setItem('registerStep2', JSON.stringify({
                fullName,
                dob,
                gender,
                address,
                city,
                province
            }));
            
            // Move to next step
            goToStep(3);
        });
        
        // Back button
        const backBtn = registerStep2.querySelector('.btn-back');
        if (backBtn) {
            backBtn.addEventListener('click', function() {
                goToStep(1);
            });
        }
    }
    
    // Step 3: KYC Verification
    if (registerStep3) {
        registerStep3.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const idType = document.getElementById('idType').value;
            const idNumber = document.getElementById('idNumber').value;
            
            // Validate form
            if (!idType || !idNumber) {
                showAlert('Please fill in all fields', 'error');
                return;
            }
            
            // Check if files are uploaded
            const idFront = document.getElementById('idFront').files[0];
            const idBack = document.getElementById('idBack').files[0];
            const selfie = document.getElementById('selfie').files[0];
            
            if (!idFront || !idBack || !selfie) {
                showAlert('Please upload all required documents', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = registerStep3.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // In a real app, this would be an API call to your backend
                // For demo purposes, we'll just simulate a successful registration
                
                // Show success message
                showAlert('Registration successful! Your KYC verification is being processed. You will receive an email once your account is verified.', 'success');
                
                // Clear stored form data
                sessionStorage.removeItem('registerStep1');
                sessionStorage.removeItem('registerStep2');
                
                // Redirect to login page after 3 seconds
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 3000);
                
                // Reset button state (this won't execute due to redirect)
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
        
        // Back button
        const backBtn = registerStep3.querySelector('.btn-back');
        if (backBtn) {
            backBtn.addEventListener('click', function() {
                goToStep(2);
            });
        }
    }
}

// File upload functionality for KYC
function initFileUploads() {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const file = this.files[0];
            const previewId = this.id + 'Preview';
            const preview = document.getElementById(previewId);
            
            if (preview) {
                if (file) {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        preview.innerHTML = `<img src="${e.target.result}" alt="Document Preview">`;
                    };
                    
                    reader.readAsDataURL(file);
                } else {
                    preview.innerHTML = '';
                }
            }
        });
    });
}

// Helper function to go to a specific registration step
function goToStep(step) {
    // Update progress indicators
    const progressSteps = document.querySelectorAll('.progress-step');
    progressSteps.forEach(stepEl => {
        const stepNum = parseInt(stepEl.dataset.step);
        
        if (stepNum < step) {
            stepEl.classList.add('completed');
            stepEl.classList.remove('active');
        } else if (stepNum === step) {
            stepEl.classList.add('active');
            stepEl.classList.remove('completed');
        } else {
            stepEl.classList.remove('active', 'completed');
        }
    });
    
    // Update progress lines
    const progressLines = document.querySelectorAll('.progress-line');
    progressLines.forEach((line, index) => {
        if (index < step - 1) {
            line.classList.add('completed');
        } else {
            line.classList.remove('completed');
        }
    });
    
    // Show the current step form
    const forms = document.querySelectorAll('.registration-step');
    forms.forEach(form => {
        const formStep = parseInt(form.dataset.step);
        
        if (formStep === step) {
            form.classList.add('active');
        } else {
            form.classList.remove('active');
        }
    });
    
    // Scroll to top of form
    window.scrollTo({
        top: document.querySelector('.auth-card').offsetTop - 100,
        behavior: 'smooth'
    });
}

// Validation functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateNepalPhone(phone) {
    // Nepal phone numbers typically start with 98 or 97 and are 10 digits long
    const re = /^(98|97)\d{8}$/;
    return re.test(phone);
}

function validatePassword(password) {
    // At least 8 characters, one uppercase, one number, one special character
    const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
}

// Alert function
function showAlert(message, type) {
    // Remove any existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${type}`;
    alertDiv.textContent = message;
    
    // Add to DOM
    const authHeader = document.querySelector('.auth-header');
    authHeader.insertAdjacentElement('afterend', alertDiv);
    
    // Remove after 5 seconds for success, 3 seconds for error
    setTimeout(() => {
        alertDiv.remove();
    }, type === 'success' ? 5000 : 3000);
}

