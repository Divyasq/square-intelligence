// JavaScript for the business detail page
document.addEventListener('DOMContentLoaded', function() {
    const businessDetail = document.getElementById('businessDetail');
    const backBtn = document.getElementById('backBtn');

    // Get business ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const businessId = urlParams.get('id');

    // Back button functionality
    backBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    // Load and display business details
    if (businessId) {
        const business = getBusinessById(businessId);
        if (business) {
            renderBusinessDetail(business);
            document.title = `${business.name} - Cash Local Network`;
        } else {
            businessDetail.innerHTML = '<p>Business not found.</p>';
        }
    } else {
        businessDetail.innerHTML = '<p>No business selected.</p>';
    }

    // Function to render business detail
    function renderBusinessDetail(business) {
        const stars = '★'.repeat(Math.floor(business.rating)) + 
                     (business.rating % 1 >= 0.5 ? '☆' : '') + 
                     '☆'.repeat(5 - Math.ceil(business.rating));

        businessDetail.innerHTML = `
            <div class="business-header">
                <h2>${business.name}</h2>
                <span class="business-category">${business.category.charAt(0).toUpperCase() + business.category.slice(1)}</span>
                <div class="business-rating">
                    <span class="stars">${stars}</span>
                    <span class="rating-text">${business.rating} out of 5 stars (${business.reviews} reviews)</span>
                </div>
                <p style="margin-top: 1rem; font-size: 1.1rem; color: #636e72;">${business.description}</p>
            </div>

            <div class="contact-info">
                <h4 style="margin-bottom: 1rem; color: #00d4aa;">Contact Information</h4>
                <div class="contact-item">
                    <div class="contact-icon">📍</div>
                    <div>
                        <strong>Address</strong><br>
                        ${business.address}
                    </div>
                </div>
                <div class="contact-item">
                    <div class="contact-icon">📞</div>
                    <div>
                        <strong>Phone</strong><br>
                        <a href="tel:${business.phone}" style="color: #00d4aa; text-decoration: none;">${business.phone}</a>
                    </div>
                </div>
                <div class="contact-item">
                    <div class="contact-icon">✉️</div>
                    <div>
                        <strong>Email</strong><br>
                        <a href="mailto:${business.email}" style="color: #00d4aa; text-decoration: none;">${business.email}</a>
                    </div>
                </div>
                <div class="contact-item">
                    <div class="contact-icon">🌐</div>
                    <div>
                        <strong>Website</strong><br>
                        <a href="http://${business.website}" target="_blank" style="color: #00d4aa; text-decoration: none;">${business.website}</a>
                    </div>
                </div>
            </div>

            ${business.acceptingFunding ? `
            <div class="funding-info" onclick="openFundingPage(${business.id})" style="cursor: pointer; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                <div class="funding-header">
                    <h4>🚀 Seeking Community Funding</h4>
                </div>
                <div class="funding-details">
                    <div class="funding-goal">Goal: ${business.fundingGoal}</div>
                    <div class="funding-purpose">${business.fundingPurpose}</div>
                    <div style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.9;">
                        💡 Click to view funding details and community supporters
                    </div>
                </div>
            </div>
            ` : ''}

            <div class="business-info">
                <div class="info-section">
                    <h4>Hours of Operation</h4>
                    <p>${business.hours}</p>
                </div>
                
                <div class="info-section">
                    <h4>Services Offered</h4>
                    <ul>
                        ${business.services.map(service => `<li>${service}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="info-section">
                    <h4>Specialties</h4>
                    <ul>
                        ${business.specialties.map(specialty => `<li>${specialty}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="info-section">
                    <h4>Payment & Pricing</h4>
                    <p><strong>Price Range:</strong> ${business.priceRange}</p>
                    <p><strong>Cash Payments:</strong> ${business.acceptsCash ? '✅ Accepted' : '❌ Not Accepted'}</p>
                    ${business.acceptsCash ? '<p style="color: #00d4aa; font-weight: bold;">💵 This business accepts cash payments!</p>' : ''}
                </div>
            </div>

            ${business.supportedCauses ? `
            <div class="causes-info">
                <div class="causes-header">
                    <h4 style="color: #74b9ff; margin: 0;">🤝 Community Causes We Support</h4>
                </div>
                <p style="color: #636e72; margin-bottom: 1rem;">
                    ${business.name} believes in giving back to the community. Here's how we contribute monthly:
                </p>
                <div class="causes-list">
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
                <div style="margin-top: 1rem; padding: 1rem; background: rgba(116, 185, 255, 0.1); border-radius: 8px; text-align: center;">
                    <p style="color: #74b9ff; font-weight: bold; margin: 0;">
                        💡 When you support ${business.name}, you're also supporting these important community causes!
                    </p>
                </div>
            </div>
            ` : ''}

            <div style="text-align: center; margin-top: 2rem; padding: 2rem; background: #f8f9fa; border-radius: 10px;">
                <h4 style="color: #00d4aa; margin-bottom: 1rem;">Ready to Visit?</h4>
                <p style="margin-bottom: 1rem;">Support your local community by visiting ${business.name} today!</p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <a href="tel:${business.phone}" style="background: #00d4aa; color: white; padding: 0.75rem 1.5rem; border-radius: 25px; text-decoration: none; font-weight: bold;">📞 Call Now</a>
                    <a href="http://${business.website}" target="_blank" style="background: #636e72; color: white; padding: 0.75rem 1.5rem; border-radius: 25px; text-decoration: none; font-weight: bold;">🌐 Visit Website</a>
                </div>
            </div>
        `;
    }
});

// Function to open funding page
function openFundingPage(businessId) {
    window.location.href = `funding.html?id=${businessId}`;
}
