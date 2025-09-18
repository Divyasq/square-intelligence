// Main JavaScript for the business listing page
document.addEventListener('DOMContentLoaded', function() {
    const businessGrid = document.getElementById('businessGrid');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const filterButtons = document.querySelectorAll('.filter-btn');

    let currentBusinesses = businesses;

    // Function to render business cards
    function renderBusinesses(businessesToRender) {
        businessGrid.innerHTML = '';
        
        if (businessesToRender.length === 0) {
            businessGrid.innerHTML = '<p class="no-results">No businesses found matching your criteria.</p>';
            return;
        }

        businessesToRender.forEach(business => {
            const businessCard = createBusinessCard(business);
            businessGrid.appendChild(businessCard);
        });
    }

    // Function to create a business card element
    function createBusinessCard(business) {
        const card = document.createElement('div');
        card.className = 'business-card';
        card.onclick = () => openBusinessDetail(business.id);

        const stars = '★'.repeat(Math.floor(business.rating)) + 
                     (business.rating % 1 >= 0.5 ? '☆' : '') + 
                     '☆'.repeat(5 - Math.ceil(business.rating));

        const causesHtml = business.supportedCauses ? `
            <div class="causes-section">
                <div style="font-size: 0.8rem; color: #636e72; margin-bottom: 0.5rem;">🤝 Supporting Community Causes:</div>
                <div class="causes-grid">
                    ${business.supportedCauses.map(cause => `
                        <div class="cause-badge">
                            <span class="cause-icon">${cause.icon}</span>
                            <span>${cause.name}</span>
                            <span class="cause-percentage">${cause.monthlyContribution}%</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : '';

        card.innerHTML = `
            <h3>${business.name}${business.acceptingFunding ? '<span class="funding-badge">Seeking Funding</span>' : ''}</h3>
            <span class="business-category">${business.category.charAt(0).toUpperCase() + business.category.slice(1)}</span>
            <p>${business.description}</p>
            <p><strong>📍</strong> ${business.address}</p>
            <p><strong>📞</strong> ${business.phone}</p>
            <p><strong>💰</strong> ${business.priceRange} • ${business.acceptsCash ? '💵 Cash Accepted' : '💳 Card Only'}</p>
            ${causesHtml}
            <div class="business-rating">
                <span class="stars">${stars}</span>
                <span class="rating-text">${business.rating} (${business.reviews} reviews)</span>
            </div>
        `;

        return card;
    }

    // Function to open business detail page
    function openBusinessDetail(businessId) {
        window.location.href = `business.html?id=${businessId}`;
    }

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            currentBusinesses = filterBusinessesByCategory(category);
            renderBusinesses(currentBusinesses);
        });
    });

    // Search functionality
    function performSearch() {
        const query = searchInput.value.trim();
        if (query === '') {
            currentBusinesses = businesses;
        } else {
            currentBusinesses = searchBusinesses(query);
        }
        renderBusinesses(currentBusinesses);
        
        // Reset filter buttons to 'All'
        filterButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector('[data-category="all"]').classList.add('active');
    }

    searchBtn.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Clear search when input is empty
    searchInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            currentBusinesses = businesses;
            renderBusinesses(currentBusinesses);
        }
    });

    // Initial render
    renderBusinesses(businesses);
});

// Add some CSS for no results message
const style = document.createElement('style');
style.textContent = `
    .no-results {
        text-align: center;
        color: #636e72;
        font-size: 1.2rem;
        padding: 2rem;
        grid-column: 1 / -1;
    }
`;
document.head.appendChild(style);
