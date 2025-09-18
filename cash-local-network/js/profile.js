// JavaScript for the profile page
document.addEventListener('DOMContentLoaded', function() {
    const profileDashboard = document.getElementById('profileDashboard');
    const backBtn = document.getElementById('backBtn');

    // Back button functionality
    backBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    // Load and display profile
    renderProfileDashboard();

    function renderProfileDashboard() {
        const totalBtc = getTotalBtcEarned();
        const totalUsd = getTotalUsdValue();
        const activeDiscounts = getActiveDiscounts();

        profileDashboard.innerHTML = `
            <!-- Profile Hero -->
            <div class="profile-hero">
                <div class="profile-avatar">${userProfile.avatar}</div>
                <h2 class="profile-name">${userProfile.name}</h2>
                <p class="profile-title">${userProfile.title} • Member since ${userProfile.joinDate}</p>
            </div>

            <!-- Profile Stats -->
            <div class="profile-stats">
                <div class="stat-card">
                    <div class="stat-icon btc-icon">₿</div>
                    <div class="stat-number">${formatBtc(totalBtc)}</div>
                    <div class="stat-label">BTC Earned</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon discount-icon">🎫</div>
                    <div class="stat-number">${activeDiscounts.length}</div>
                    <div class="stat-label">Active Discounts</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon support-icon">💰</div>
                    <div class="stat-number">$${userProfile.totalSupported.toLocaleString()}</div>
                    <div class="stat-label">Total Supported</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon causes-icon">🤝</div>
                    <div class="stat-number">${userProfile.causesSupported}</div>
                    <div class="stat-label">Causes Supported</div>
                </div>
            </div>

            <!-- BTC Rewards Section -->
            <div class="rewards-section">
                <div class="section-header">
                    <div class="section-icon btc-rewards">₿</div>
                    <div>
                        <h3 class="section-title">Bitcoin Rewards</h3>
                        <p class="section-subtitle">Earned for supporting community causes</p>
                    </div>
                </div>

                <div class="btc-wallet">
                    <div class="btc-balance">₿ ${formatBtc(userProfile.btcEarned)}</div>
                    <div class="btc-usd">≈ $${userProfile.btcUsdValue.toFixed(2)} USD</div>
                    <div class="btc-address">${userProfile.btcAddress}</div>
                </div>

                <div class="rewards-grid">
                    ${btcRewards.map(reward => `
                        <div class="reward-item btc-reward">
                            <div class="reward-business-icon">${reward.businessIcon}</div>
                            <div class="reward-content">
                                <div class="reward-header">
                                    <span class="reward-business">${reward.businessName}</span>
                                    <span class="reward-amount btc-amount">₿ ${formatBtc(reward.amount)}</span>
                                </div>
                                <div class="reward-description">${reward.description}</div>
                                <div class="reward-date">Earned on ${formatDate(reward.date)}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Discount Rewards Section -->
            <div class="rewards-section">
                <div class="section-header">
                    <div class="section-icon discount-rewards">🎫</div>
                    <div>
                        <h3 class="section-title">Business Discounts</h3>
                        <p class="section-subtitle">Exclusive offers from supported businesses</p>
                    </div>
                </div>

                <div class="rewards-grid">
                    ${discountRewards.map(reward => `
                        <div class="reward-item discount-reward">
                            <div class="reward-business-icon">${reward.businessIcon}</div>
                            <div class="reward-content">
                                <div class="reward-header">
                                    <span class="reward-business">${reward.businessName}</span>
                                    <span class="reward-amount discount-amount">${reward.discount}</span>
                                </div>
                                <div class="reward-description">${reward.description}</div>
                                <div class="reward-date">
                                    ${reward.used ? 
                                        `Used on ${formatDate(reward.date)}` : 
                                        `Valid until ${formatDate(reward.validUntil)}`
                                    }
                                    ${reward.used ? ' • <span style="color: #636e72;">Used</span>' : ' • <span style="color: #00d4aa; font-weight: bold;">Active</span>'}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Supported Businesses Section -->
            <div class="supported-businesses">
                <div class="section-header">
                    <div class="section-icon support-icon" style="background: linear-gradient(135deg, #00d4aa, #00b894);">🏪</div>
                    <div>
                        <h3 class="section-title">Supported Businesses</h3>
                        <p class="section-subtitle">Your community impact and rewards earned</p>
                    </div>
                </div>

                <div class="business-support-grid">
                    ${supportedBusinesses.map(business => `
                        <div class="support-card">
                            <div class="support-header">
                                <div class="support-business-icon">${business.businessIcon}</div>
                                <div class="support-info">
                                    <h4>${business.businessName}</h4>
                                    <div class="support-category">${business.category}</div>
                                </div>
                            </div>
                            
                            <div class="support-details">
                                <div class="support-amount">$${business.totalSupported} ${business.supportType === 'funding' ? 'funded' : 'spent'}</div>
                                
                                ${business.causesSupported.length > 0 ? `
                                    <div class="support-causes">
                                        ${business.causesSupported.map(cause => `
                                            <span class="support-cause">${cause}</span>
                                        `).join('')}
                                    </div>
                                ` : ''}
                                
                                <div class="support-rewards">
                                    ${business.rewards.btc > 0 ? `
                                        <span class="reward-badge btc-badge">₿ ${formatBtc(business.rewards.btc)}</span>
                                    ` : ''}
                                    ${business.rewards.discounts.map(discount => `
                                        <span class="reward-badge discount-badge">${discount}</span>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Impact Summary -->
            <div class="rewards-section">
                <div class="section-header">
                    <div class="section-icon" style="background: linear-gradient(135deg, #74b9ff, #0984e3);">🌟</div>
                    <div>
                        <h3 class="section-title">Community Impact</h3>
                        <p class="section-subtitle">Your contribution to local causes and businesses</p>
                    </div>
                </div>

                <div style="text-align: center; padding: 2rem; background: #f8f9fa; border-radius: 12px;">
                    <h4 style="color: #2d3436; margin-bottom: 1rem;">🎉 Thank you for being a community champion!</h4>
                    <p style="color: #636e72; margin-bottom: 1.5rem;">
                        Your support has helped ${userProfile.businessesSupported} local businesses grow and contributed to ${userProfile.causesSupported} important community causes.
                    </p>
                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <div style="background: #00d4aa; color: white; padding: 0.75rem 1.5rem; border-radius: 25px; font-weight: bold;">
                            🏪 ${userProfile.businessesSupported} Businesses Supported
                        </div>
                        <div style="background: #74b9ff; color: white; padding: 0.75rem 1.5rem; border-radius: 25px; font-weight: bold;">
                            🤝 ${userProfile.causesSupported} Causes Helped
                        </div>
                        <div style="background: #f7931e; color: white; padding: 0.75rem 1.5rem; border-radius: 25px; font-weight: bold;">
                            ₿ ${formatBtc(totalBtc)} BTC Earned
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
});
