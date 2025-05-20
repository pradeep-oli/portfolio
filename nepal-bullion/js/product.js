// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize product page functionality
    initProductPage();
});

function initProductPage() {
    // Initialize tabs
    initTabs();
    
    // Initialize toggle buttons
    initToggle();
    
    // Initialize gold purchase form
    initGoldPurchaseForm();
    
    // Initialize payment modal
    initPaymentModal();
}

// Tabs functionality
function initTabs() {
    const tabButtons = document.querySelectorAll('.option-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab content
            const tabId = this.dataset.tab + '-tab';
            tabContents.forEach(content => {
                if (content.id === tabId) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });
}

// Toggle functionality
function initToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const toggleContents = document.querySelectorAll('.toggle-content');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding toggle content
            const toggleId = this.dataset.toggle + '-toggle';
            toggleContents.forEach(content => {
                if (content.id === toggleId) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
            
            // Update calculations
            updateCalculations();
        });
    });
}

// Gold purchase form functionality
function initGoldPurchaseForm() {
    // Get elements
    const goldPrice = 112500; // Price per 10g in Rs.
    const pricePerGram = goldPrice / 10;
    
    const amountInput = document.getElementById('amount');
    const amountSlider = document.getElementById('amountSlider');
    const weightInput = document.getElementById('weight');
    const weightSlider = document.getElementById('weightSlider');
    
    const amountToGramsElement = document.getElementById('amountToGrams');
    const gramsToAmountElement = document.getElementById('gramsToAmount');
    
    // Summary elements
    const summaryPriceElement = document.getElementById('summary-price');
    const summaryQuantityElement = document.getElementById('summary-quantity');
    const summaryFeeElement = document.getElementById('summary-fee');
    const summaryTotalElement = document.getElementById('summary-total');
    
    // Update display elements with initial values
    updateDisplay();
    
    // Event listeners for amount input and slider
    if (amountInput && amountSlider) {
        amountInput.addEventListener('input', function() {
            // Update slider
            amountSlider.value = this.value;
            
            // Update calculations
            updateCalculations();
        });
        
        amountSlider.addEventListener('input', function() {
            // Update input
            amountInput.value = this.value;
            
            // Update calculations
            updateCalculations();
        });
    }
    
    // Event listeners for weight input and slider
    if (weightInput && weightSlider) {
        weightInput.addEventListener('input', function() {
            // Update slider
            weightSlider.value = this.value;
            
            // Update calculations
            updateCalculations();
        });
        
        weightSlider.addEventListener('input', function() {
            // Update input
            weightInput.value = this.value;
            
            // Update calculations
            updateCalculations();
        });
    }
    
    // Form submission
    const buyGoldForm = document.getElementById('buyGoldForm');
    if (buyGoldForm) {
        buyGoldForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Open payment modal
            openPaymentModal();
        });
    }
    
    // Function to update calculations
    function updateCalculations() {
        // Get active toggle
        const activeToggle = document.querySelector('.toggle-btn.active');
        
        if (activeToggle) {
            const toggleType = activeToggle.dataset.toggle;
            
            if (toggleType === 'amount') {
                // Calculate grams from amount
                const amount = parseFloat(amountInput.value) || 0;
                const grams = amount / pricePerGram;
                
                // Update display
                if (amountToGramsElement) {
                    amountToGramsElement.textContent = grams.toFixed(3);
                }
                
                // Update summary
                if (summaryQuantityElement) {
                    summaryQuantityElement.textContent = grams.toFixed(3);
                }
                
                // Calculate fee and total
                const fee = 10; // Fixed fee for demo
                const total = amount + fee;
                
                // Update summary
                if (summaryFeeElement) {
                    summaryFeeElement.textContent = fee.toLocaleString();
                }
                
                if (summaryTotalElement) {
                    summaryTotalElement.textContent = total.toLocaleString();
                }
            } else if (toggleType === 'weight') {
                // Calculate amount from grams
                const grams = parseFloat(weightInput.value) || 0;
                const amount = grams * pricePerGram;
                
                // Update display
                if (gramsToAmountElement) {
                    gramsToAmountElement.textContent = amount.toLocaleString();
                }
                
                // Update summary
                if (summaryQuantityElement) {
                    summaryQuantityElement.textContent = grams.toFixed(3);
                }
                
                // Calculate fee and total
                const fee = 10; // Fixed fee for demo
                const total = amount + fee;
                
                // Update summary
                if (summaryFeeElement) {
                    summaryFeeElement.textContent = fee.toLocaleString();
                }
                
                if (summaryTotalElement) {
                    summaryTotalElement.textContent = total.toLocaleString();
                }
            }
        }
    }
    
    // Function to update display
    function updateDisplay() {
        // Update price display
        if (summaryPriceElement) {
            summaryPriceElement.textContent = goldPrice.toLocaleString();
        }
        
        // Update initial calculations
        updateCalculations();
    }
}

// Payment modal functionality
function initPaymentModal() {
    const modal = document.getElementById('paymentModal');
    const closeBtn = document.querySelector('.close-modal');
    const cancelBtn = document.getElementById('cancelPayment');
    const proceedBtn = document.getElementById('proceedPayment');
    
    // Modal elements
    const modalQuantityElement = document.getElementById('modal-quantity');
    const modalAmountElement = document.getElementById('modal-amount');
    const modalFeeElement = document.getElementById('modal-fee');
    const modalTotalElement = document.getElementById('modal-total');
    
    // Close modal function
    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
        }
    }
    
    // Close button event
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Cancel button event
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }
    
    // Proceed button event
    if (proceedBtn) {
        proceedBtn.addEventListener('click', function() {
            // In a real app, this would redirect to the payment gateway
            // For demo purposes, redirect to login page
            window.location.href = 'login.html';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Function to open payment modal
function openPaymentModal() {
    const modal = document.getElementById('paymentModal');
    
    if (modal) {
        // Get summary values
        const quantity = document.getElementById('summary-quantity').textContent;
        const amount = document.getElementById('amount')?.value || document.getElementById('gramsToAmount').textContent.replace(/,/g, '');
        const fee = document.getElementById('summary-fee').textContent;
        const total = document.getElementById('summary-total').textContent;
        
        // Update modal values
        document.getElementById('modal-quantity').textContent = quantity;
        document.getElementById('modal-amount').textContent = parseFloat(amount).toLocaleString();
        document.getElementById('modal-fee').textContent = fee;
        document.getElementById('modal-total').textContent = total;
        
        // Show modal
        modal.style.display = 'block';
    }
}

