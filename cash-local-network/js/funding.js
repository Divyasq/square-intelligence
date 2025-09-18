// JavaScript for the funding/investor relations page
document.addEventListener('DOMContentLoaded', function() {
    const fundingDashboard = document.getElementById('fundingDashboard');
    const backBtn = document.getElementById('backBtn');

    // Get business ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const businessId = urlParams.get('id');

    // Back button functionality
    backBtn.addEventListener('click', function() {
        window.location.href = `business.html?id=${businessId}`;
    });

    // Load and display funding information
    if (businessId) {
        const business = getBusinessById(businessId);
        const funding = getFundingData(businessId);
        
        if (business && funding && business.acceptingFunding) {
            renderFundingDashboard(business, funding);
            document.title = `${business.name} - Community Funding`;
        } else {
            fundingDashboard.innerHTML = '<p>Funding information not available for this business.</p>';
        }
    } else {
        fundingDashboard.innerHTML = '<p>No business selected.</p>';
    }

    // Function to render the complete funding dashboard
    function renderFundingDashboard(business, funding) {
        const progress = calculateProgress(funding.currentFunding, funding.goalAmount);
        const revenueGrowth = calculateGrowthRate(funding.monthlyGrowth);
        const customerGrowth = calculateCustomerGrowth(funding.monthlyGrowth);
        const latestMonth = funding.monthlyGrowth[funding.monthlyGrowth.length - 1];

        fundingDashboard.innerHTML = `
            <!-- Hero Section -->
            <div class="funding-hero">
                <div class="hero-content">
                    <h2 class="business-name">${business.name}</h2>
                    <p class="funding-tagline">${business.fundingPurpose}</p>
                </div>
            </div>

            <!-- Key Stats -->
            <div class="funding-stats">
                <div class="stat-card">
                    <div class="stat-number">$${funding.currentFunding.toLocaleString()}</div>
                    <div class="stat-label">Raised So Far</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${funding.backers}</div>
                    <div class="stat-label">Community Backers</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${funding.daysLeft}</div>
                    <div class="stat-label">Days Remaining</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${progress.toFixed(0)}%</div>
                    <div class="stat-label">Goal Reached</div>
                </div>
            </div>

            <!-- Funding Progress -->
            <div class="progress-section">
                <div class="progress-header">
                    <h3>🎯 Funding Progress</h3>
                    <span style="font-weight: bold; color: #667eea;">$${funding.currentFunding.toLocaleString()} / $${funding.goalAmount.toLocaleString()}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
                <div class="progress-details">
                    <span>${progress.toFixed(1)}% funded</span>
                    <span>$${(funding.goalAmount - funding.currentFunding).toLocaleString()} remaining</span>
                </div>
            </div>

            <!-- Monthly Growth Metrics -->
            <div class="growth-metrics">
                <h3>📈 Business Growth Metrics</h3>
                <div class="metrics-grid">
                    <div class="metric-card">
                        <div class="metric-value">$${latestMonth.revenue.toLocaleString()}</div>
                        <div class="metric-label">Monthly Revenue</div>
                        <div class="metric-trend trend-up">↗ +${revenueGrowth}% MoM</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">${latestMonth.customers}</div>
                        <div class="metric-label">Monthly Customers</div>
                        <div class="metric-trend trend-up">↗ +${customerGrowth}% MoM</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">${business.rating}</div>
                        <div class="metric-label">Customer Rating</div>
                        <div class="metric-trend trend-up">↗ ${business.reviews} reviews</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">${calculateAverageTicket(latestMonth)}%</div>
                        <div class="metric-label">Customer Retention</div>
                        <div class="metric-trend trend-up">↗ Growing loyalty</div>
                    </div>
                </div>
            </div>

            <!-- Social Impact Section -->
            ${business.supportedCauses ? `
            <div class="community-supporters">
                <h3>💫 Social Impact Through Your Investment</h3>
                <p style="color: #636e72; margin-bottom: 1rem;">
                    When you invest in ${business.name}, you're not just supporting a business - you're contributing to these important community causes:
                </p>
                <div class="causes-list" style="margin-bottom: 2rem;">
                    ${business.supportedCauses.map(cause => `
                        <div class="cause-item">
                            <div class="cause-item-icon">${cause.icon}</div>
                            <div class="cause-item-content">
                                <div class="cause-item-header">
                                    <span class="cause-item-name">${cause.name}</span>
                                    <span class="cause-item-contribution">${cause.monthlyContribution}% of monthly revenue</span>
                                </div>
                                <div class="cause-item-description">${cause.description}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}

            <!-- Community Supporters -->
            <div class="community-supporters">
                <h3>🤝 Community Supporters</h3>
                <p style="color: #636e72; margin-bottom: 1rem;">
                    See who's already invested in ${business.name}'s success and join our growing community of local supporters.
                </p>
                <div class="supporters-grid">
                    ${funding.supporters.map(supporter => `
                        <div class="supporter-card">
                            <div class="supporter-header">
                                <div class="supporter-avatar">${supporter.avatar}</div>
                                <div class="supporter-info">
                                    <h4>${supporter.name}</h4>
                                    <div class="supporter-type">${supporter.type}</div>
                                </div>
                            </div>
                            <div class="support-amount">$${supporter.amount}</div>
                            <div class="support-message">"${supporter.message}"</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Call to Action -->
            <div class="support-cta">
                <div class="cta-content">
                    <h3 class="cta-title">💫 Join Our Community of Supporters</h3>
                    <p class="cta-description">
                        Help ${business.name} reach their goal and strengthen our local economy. 
                        Every contribution makes a difference in building a thriving neighborhood.
                    </p>
                    <div class="cta-buttons">
                        <a href="#" class="cta-btn primary" onclick="showSupportModal()">💰 Support This Business</a>
                        <a href="#" class="cta-btn secondary" onclick="shareProject()">📢 Share with Friends</a>
                    </div>
                </div>
            </div>
        `;

        // Animate progress bar after rendering
        setTimeout(() => {
            const progressFill = document.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.width = '0%';
                setTimeout(() => {
                    progressFill.style.width = `${progress}%`;
                }, 100);
            }
        }, 500);
    }

    // Helper function to calculate average ticket (mock calculation)
    function calculateAverageTicket(monthData) {
        return Math.round((monthData.revenue / monthData.customers) * 0.1 + 85);
    }
});

// Payment Modal Variables
let selectedPaymentMethod = null;
let selectedAmount = null;
let currentBusiness = null;

// Support modal functionality
function showSupportModal() {
    const urlParams = new URLSearchParams(window.location.search);
    const businessId = urlParams.get('id');
    currentBusiness = getBusinessById(businessId);
    
    if (currentBusiness) {
        // Update cash pool with business data
        document.getElementById('cashpoolBusinessName').textContent = `${currentBusiness.name} Support Pool`;
        const funding = getFundingData(businessId);
        if (funding) {
            document.getElementById('cashpoolAmount').textContent = `$${funding.currentFunding.toLocaleString()}`;
            document.getElementById('cashpoolGoal').textContent = `of ${currentBusiness.fundingGoal} goal`;
        }
    }
    
    // Show modal
    const modal = document.getElementById('paymentModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Initialize payment modal when page loads
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Payment modal event listeners
    const modal = document.getElementById('paymentModal');
    const closeModal = document.getElementById('closeModal');
    const paymentMethods = document.querySelectorAll('.payment-method');
    const amountOptions = document.querySelectorAll('.amount-option');
    const customAmountInput = document.querySelector('.custom-amount input');
    const processPaymentBtn = document.getElementById('processPayment');

    // Close modal
    closeModal.addEventListener('click', closePaymentModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closePaymentModal();
        }
    });

    // Payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            // Remove selected class from all methods
            paymentMethods.forEach(m => m.classList.remove('selected'));
            
            // Add selected class to clicked method
            this.classList.add('selected');
            selectedPaymentMethod = this.dataset.method;
            
            // Hide all method-specific interfaces
            document.getElementById('cashpoolInterface').classList.remove('active');
            document.getElementById('creditCardForm').classList.remove('active');
            
            // Show specific interface based on selection
            if (selectedPaymentMethod === 'cashpool') {
                document.getElementById('cashpoolInterface').classList.add('active');
            } else if (selectedPaymentMethod === 'creditcard') {
                document.getElementById('creditCardForm').classList.add('active');
                showAmountSelection();
            } else if (selectedPaymentMethod === 'cashapp') {
                showAmountSelection();
            }
            
            updatePaymentButton();
        });
    });

    // Amount selection
    amountOptions.forEach(option => {
        option.addEventListener('click', function() {
            amountOptions.forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            
            if (this.classList.contains('custom-option')) {
                customAmountInput.focus();
                selectedAmount = null;
            } else {
                selectedAmount = parseInt(this.dataset.amount);
                customAmountInput.value = '';
            }
            
            updatePaymentButton();
        });
    });

    // Custom amount input
    customAmountInput.addEventListener('input', function() {
        const value = parseInt(this.value);
        if (value && value > 0) {
            selectedAmount = value;
            amountOptions.forEach(o => o.classList.remove('selected'));
            document.querySelector('.custom-option').classList.add('selected');
        } else {
            selectedAmount = null;
        }
        updatePaymentButton();
    });

    // Process payment
    processPaymentBtn.addEventListener('click', processPayment);
});

// Helper functions for payment modal
function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Reset selections
    selectedPaymentMethod = null;
    selectedAmount = null;
    
    // Reset UI
    document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
    document.querySelectorAll('.amount-option').forEach(o => o.classList.remove('selected'));
    document.getElementById('amountSelection').classList.remove('active');
    document.getElementById('cashpoolInterface').classList.remove('active');
    document.getElementById('creditCardForm').classList.remove('active');
    document.querySelector('.custom-amount input').value = '';
    
    updatePaymentButton();
}

function showAmountSelection() {
    document.getElementById('amountSelection').classList.add('active');
}

function updatePaymentButton() {
    const btn = document.getElementById('processPayment');
    
    if (selectedPaymentMethod === 'cashpool') {
        // For cash pool, we don't need amount selection here
        btn.disabled = false;
        btn.textContent = 'Join Cash Pool';
    } else if (selectedPaymentMethod && selectedAmount) {
        btn.disabled = false;
        btn.textContent = `Pay $${selectedAmount}`;
    } else {
        btn.disabled = true;
        btn.textContent = 'Complete Payment';
    }
}

function processPayment() {
    if (!selectedPaymentMethod) return;
    
    const businessName = currentBusiness ? currentBusiness.name : 'this business';
    
    if (selectedPaymentMethod === 'cashapp') {
        // Simulate Cash App payment
        alert(`🚀 Redirecting to Cash App to complete your $${selectedAmount} contribution to ${businessName}!\n\nThis would normally open the Cash App with pre-filled payment details.`);
        
    } else if (selectedPaymentMethod === 'cashpool') {
        // Simulate Cash Pool joining
        alert(`👥 You've joined the Cash Pool for ${businessName}!\n\nYou'll be notified when the pool reaches its goal and your contribution will be processed automatically.`);
        
    } else if (selectedPaymentMethod === 'creditcard') {
        // Simulate credit card processing
        alert(`💳 Processing your $${selectedAmount} payment to ${businessName}...\n\nPayment successful! Thank you for supporting local business and community causes.`);
    }
    
    // Close modal after processing
    setTimeout(() => {
        closePaymentModal();
        
        // Show success message
        showPaymentSuccess();
    }, 1000);
}

function showPaymentSuccess() {
    // Create a temporary success message
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00d4aa, #00b894);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 8px 25px rgba(0, 212, 170, 0.3);
        z-index: 1001;
        font-weight: bold;
        animation: slideIn 0.3s ease;
    `;
    successDiv.innerHTML = `
        ✅ Payment Successful!<br>
        <small>Thank you for supporting local business!</small>
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(successDiv);
    
    // Remove after 4 seconds
    setTimeout(() => {
        successDiv.remove();
        style.remove();
    }, 4000);
}

// Share functionality
function shareProject() {
    const urlParams = new URLSearchParams(window.location.search);
    const businessId = urlParams.get('id');
    const business = getBusinessById(businessId);
    
    if (navigator.share && business) {
        navigator.share({
            title: `Support ${business.name}`,
            text: `Help ${business.name} reach their funding goal! ${business.fundingPurpose}`,
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const shareText = `Check out ${business.name}'s funding campaign: ${window.location.href}`;
        navigator.clipboard.writeText(shareText).then(() => {
            alert('📋 Link copied to clipboard! Share it with your friends and family.');
        });
    }
}
