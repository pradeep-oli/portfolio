// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard functionality
    initDashboard();
});

function initDashboard() {
    // Initialize sidebar toggle
    initSidebar();
    
    // Initialize notifications dropdown
    initNotifications();
    
    // Initialize user profile dropdown
    initUserProfile();
    
    // Initialize KYC alert close
    initAlertClose();
    
    // Initialize portfolio chart
    initPortfolioChart();
    
    // Initialize rate charts
    initRateCharts();
    
    // Initialize logout functionality
    initLogout();
}

// Sidebar toggle functionality
function initSidebar() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (sidebar && sidebar.classList.contains('active') && !sidebar.contains(e.target) && e.target !== menuToggle) {
            sidebar.classList.remove('active');
        }
    });
    
    // Handle responsive behavior
    function handleResize() {
        if (window.innerWidth <= 992) {
            sidebar.classList.remove('collapsed');
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
}

// Notifications dropdown functionality
function initNotifications() {
    const notificationBtn = document.querySelector('.notification-btn');
    const notifications = document.querySelector('.notifications');
    
    if (notificationBtn && notifications) {
        notificationBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            notifications.classList.toggle('active');
            
            // Close user profile dropdown if open
            const userProfile = document.querySelector('.user-profile');
            if (userProfile && userProfile.classList.contains('active')) {
                userProfile.classList.remove('active');
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!notifications.contains(e.target)) {
                notifications.classList.remove('active');
            }
        });
    }
}

// User profile dropdown functionality
function initUserProfile() {
    const profileBtn = document.querySelector('.profile-btn');
    const userProfile = document.querySelector('.user-profile');
    
    if (profileBtn && userProfile) {
        profileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userProfile.classList.toggle('active');
            
            // Close notifications dropdown if open
            const notifications = document.querySelector('.notifications');
            if (notifications && notifications.classList.contains('active')) {
                notifications.classList.remove('active');
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!userProfile.contains(e.target)) {
                userProfile.classList.remove('active');
            }
        });
    }
}

// KYC alert close functionality
function initAlertClose() {
    const alertCloseBtn = document.querySelector('.alert-close');
    const kycAlert = document.querySelector('.kyc-alert');
    
    if (alertCloseBtn && kycAlert) {
        alertCloseBtn.addEventListener('click', function() {
            kycAlert.style.display = 'none';
        });
    }
}

// Portfolio chart functionality
function initPortfolioChart() {
    const ctx = document.getElementById('portfolioChart');
    
    if (ctx) {
        // Sample data for portfolio performance
        const weekData = {
            labels: ['May 14', 'May 15', 'May 16', 'May 17', 'May 18', 'May 19', 'May 20'],
            datasets: [{
                label: 'Portfolio Value (Rs.)',
                data: [9500, 9800, 9750, 10200, 10500, 10400, 10605],
                borderColor: '#d4af37',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        };
        
        const monthData = {
            labels: ['Apr 20', 'Apr 25', 'Apr 30', 'May 5', 'May 10', 'May 15', 'May 20'],
            datasets: [{
                label: 'Portfolio Value (Rs.)',
                data: [8000, 8500, 9000, 9200, 9800, 10200, 10605],
                borderColor: '#d4af37',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        };
        
        const yearData = {
            labels: ['Jun 2023', 'Aug 2023', 'Oct 2023', 'Dec 2023', 'Feb 2024', 'Apr 2024', 'May 2024'],
            datasets: [{
                label: 'Portfolio Value (Rs.)',
                data: [5000, 6200, 7500, 8300, 9100, 10000, 10605],
                borderColor: '#d4af37',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        };
        
        const allData = {
            labels: ['2022', '2023', '2024'],
            datasets: [{
                label: 'Portfolio Value (Rs.)',
                data: [3000, 7500, 10605],
                borderColor: '#d4af37',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        };
        
        // Create chart
        const portfolioChart = new Chart(ctx, {
            type: 'line',
            data: weekData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += 'Rs. ' + context.parsed.y.toLocaleString();
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            callback: function(value) {
                                return 'Rs. ' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
        
        // Chart filter functionality
        const chartFilters = document.querySelectorAll('.chart-filter');
        
        if (chartFilters) {
            chartFilters.forEach(filter => {
                filter.addEventListener('click', function() {
                    // Remove active class from all filters
                    chartFilters.forEach(f => f.classList.remove('active'));
                    
                    // Add active class to clicked filter
                    this.classList.add('active');
                    
                    // Update chart data based on filter
                    const period = this.dataset.period;
                    
                    if (period === 'week') {
                        portfolioChart.data = weekData;
                    } else if (period === 'month') {
                        portfolioChart.data = monthData;
                    } else if (period === 'year') {
                        portfolioChart.data = yearData;
                    } else if (period === 'all') {
                        portfolioChart.data = allData;
                    }
                    
                    portfolioChart.update();
                });
            });
        }
    }
}

// Rate charts functionality
function initRateCharts() {
    const goldCtx = document.getElementById('goldChart');
    const silverCtx = document.getElementById('silverChart');
    
    if (goldCtx) {
        // Sample data for gold rate history
        const goldData = {
            labels: ['May 14', 'May 15', 'May 16', 'May 17', 'May 18', 'May 19', 'May 20'],
            datasets: [{
                data: [110000, 110500, 111000, 110800, 111200, 111500, 112500],
                borderColor: '#d4af37',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        };
        
        // Create gold chart
        const goldChart = new Chart(goldCtx, {
            type: 'line',
            data: goldData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false
                    }
                },
                elements: {
                    point: {
                        radius: 0
                    }
                }
            }
        });
    }
    
    if (silverCtx) {
        // Sample data for silver rate history
        const silverData = {
            labels: ['May 14', 'May 15', 'May 16', 'May 17', 'May 18', 'May 19', 'May 20'],
            datasets: [{
                data: [1500, 1480, 1470, 1460, 1455, 1452, 1450],
                borderColor: '#c0c0c0',
                backgroundColor: 'rgba(192, 192, 192, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        };
        
        // Create silver chart
        const silverChart = new Chart(silverCtx, {
            type: 'line',
            data: silverData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false
                    }
                },
                elements: {
                    point: {
                        radius: 0
                    }
                }
            }
        });
    }
}

// Logout functionality
function initLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    const logoutBtnDropdown = document.getElementById('logoutBtnDropdown');
    
    function logout() {
        // Clear user session
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        
        // Redirect to login page
        window.location.href = 'login.html';
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    if (logoutBtnDropdown) {
        logoutBtnDropdown.addEventListener('click', logout);
    }
}

