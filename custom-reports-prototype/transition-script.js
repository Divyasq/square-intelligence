document.addEventListener('DOMContentLoaded', function() {
    const versionBtns = document.querySelectorAll('.version-btn');
    const appContainer = document.getElementById('appContainer');
    const v1Content = document.getElementById('v1Content');
    const v2Content = document.getElementById('v2Content');
    const subNav = document.getElementById('subNav');
    
    let currentVersion = 'v1';
    let isTransitioning = false;

    // Version information
    const versionInfo = {
        v1: {
            title: 'Version 1: Template-Based Approach',
            description: 'Start with predefined report templates as sub-navigation items to build confidence in data accuracy.',
            features: [
                'Custom Item Report',
                'Custom Order Report', 
                'Custom Payments Report'
            ]
        },
        transition: {
            title: 'Migration in Progress',
            description: 'Automatically migrating template reports to the new table-based builder while maintaining all functionality.',
            features: [
                'Preserving report configurations',
                'Maintaining usage statistics',
                'Seamless user experience'
            ]
        },
        v2: {
            title: 'Version 2: Table-Based Management',
            description: 'Centralized table view for managing all reports with advanced filtering and organization.',
            features: [
                'Centralized report management',
                'Advanced search and filtering',
                'Report status tracking',
                'Bulk operations support'
            ]
        }
    };

    // Initialize
    // Info card removed - no longer needed

    // Version button handlers
    versionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (isTransitioning) return;
            
            const targetVersion = this.dataset.version;
            if (targetVersion === currentVersion) return;

            // Update active button
            versionBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            if (targetVersion === 'transition') {
                startTransition();
            } else {
                switchToVersion(targetVersion);
            }
        });
    });

    // updateInfoCard function removed - no longer needed

    function switchToVersion(version) {
        currentVersion = version;
        // Info card update removed - no longer needed

        if (version === 'v1') {
            showV1();
        } else if (version === 'v2') {
            showV2();
        }
    }

    function showV1() {
        v1Content.classList.remove('hidden');
        v2Content.classList.add('hidden');
        
        // Show sub-navigation
        subNav.classList.remove('collapsed');
        
        // Reset any transition classes
        appContainer.classList.remove('transitioning');
    }

    function showV2() {
        v1Content.classList.add('hidden');
        v2Content.classList.remove('hidden');
        
        // Hide sub-navigation
        subNav.classList.add('collapsed');
        
        // Reset any transition classes
        appContainer.classList.remove('transitioning');
    }

    function startTransition() {
        if (isTransitioning) return;
        
        isTransitioning = true;
        // Info card update removed - no longer needed
        
        // Add transition class to enable animations
        appContainer.classList.add('transitioning');
        
        // Step 1: Fade out sub-nav items (0.6s)
        const subNavItems = document.querySelectorAll('.sub-nav-item');
        subNavItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateX(-100px)';
                item.style.opacity = '0';
            }, index * 100);
        });

        // Step 2: Collapse sub-nav (after 0.8s)
        setTimeout(() => {
            subNav.classList.add('collapsed');
        }, 800);

        // Step 3: Switch to V2 content (after 1.2s)
        setTimeout(() => {
            v1Content.classList.add('hidden');
            v2Content.classList.remove('hidden');
        }, 1200);

        // Step 4: Animate migrated reports (after 1.6s)
        setTimeout(() => {
            const migratedReports = document.querySelectorAll('.migrated-report');
            migratedReports.forEach((report, index) => {
                report.style.opacity = '0';
                report.style.transform = 'translateX(50px)';
                
                setTimeout(() => {
                    report.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    report.style.opacity = '1';
                    report.style.transform = 'translateX(0)';
                    
                    // Add a subtle highlight effect
                    report.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';
                    setTimeout(() => {
                        report.style.boxShadow = 'none';
                    }, 1000);
                }, index * 200);
            });
        }, 1600);

        // Step 5: Show migration notice (after 2.2s)
        setTimeout(() => {
            const migrationNotice = document.querySelector('.migration-notice');
            migrationNotice.style.opacity = '0';
            migrationNotice.style.transform = 'translateY(-20px)';
            migrationNotice.style.transition = 'all 0.4s ease';
            
            setTimeout(() => {
                migrationNotice.style.opacity = '1';
                migrationNotice.style.transform = 'translateY(0)';
            }, 100);
        }, 2200);

        // Step 6: Complete transition (after 3s)
        setTimeout(() => {
            appContainer.classList.remove('transitioning');
            currentVersion = 'v2';
            isTransitioning = false;
            
            // Reset sub-nav items for future transitions
            subNavItems.forEach(item => {
                item.style.transform = '';
                item.style.opacity = '';
                item.style.transition = '';
            });
        }, 3000);
    }

    // Sub-navigation interactions for V1
    const subNavItems = document.querySelectorAll('.sub-nav-item');
    subNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const reportType = this.dataset.report;
            showReportView(reportType);
        });
    });

    // Settings navigation interactions
    const settingsNavItems = document.querySelectorAll('.sub-nav-item[data-setting]');
    settingsNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const settingType = this.dataset.setting;
            showSettingsView(settingType);
        });
    });

    // Template card interactions for V1
    const templateCards = document.querySelectorAll('.template-card');
    templateCards.forEach(card => {
        card.addEventListener('click', function() {
            const template = this.dataset.template;
            showReportView(template);
        });
    });

    function showReportView(reportType) {
        if (reportType === 'item') {
            showItemSalesView();
        } else if (reportType === 'order') {
            showOrderReportView();
        } else if (reportType === 'payments') {
            showPaymentsReportView();
        } else if (reportType === 'employee') {
            showEmployeeReportView();
        } else if (reportType === 'accounting') {
            showAccountingSettingsView();
        } else {
            alert(`Opening ${reportType} report builder...\n\nThis would launch the template-based report creation flow.`);
        }
    }

    function showItemSalesView() {
        // Hide the main custom reports view
        v1Content.style.display = 'none';
        
        // Create and show the item sales view
        const itemSalesView = createItemSalesView();
        const mainContent = document.querySelector('.main-content');
        mainContent.appendChild(itemSalesView);
    }

    function createItemSalesView() {
        const itemSalesHTML = `
            <div class="content-version" id="itemSalesContent">
                <header class="content-header">
                    <div class="header-left">
                        <div class="breadcrumb">
                            <a href="#" class="back-link" onclick="returnToCustomReports()">
                                <i class="fas fa-arrow-left"></i>
                            </a>
                            <h1>Item Sales</h1>
                        </div>
                    </div>
                    <div class="header-right">
                        <button class="btn btn-secondary">
                            <i class="fas fa-download"></i>
                        </button>
                        <button class="btn btn-secondary">
                            <i class="fas fa-share-alt"></i>
                        </button>
                    </div>
                </header>

                <div class="content-body">
                    <!-- Filters and Controls -->
                    <div class="report-controls">
                        <div class="date-range">
                            <label>Last month</label>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="location-filter">
                            <label>Location: All</label>
                            <span class="filter-detail">Group sales by Item name & 2 others</span>
                        </div>
                        <div class="additional-filters">
                            <span class="filter-detail">Metrics: Gross Sales & 5 others</span>
                            <button class="filter-btn">Filter by</button>
                        </div>
                    </div>

                    <!-- Chart Section -->
                    <div class="chart-section">
                        <div class="chart-container">
                            <canvas id="itemSalesChart" width="800" height="300"></canvas>
                        </div>
                    </div>

                    <!-- Data Table -->
                    <div class="data-table-section">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Item Variation</th>
                                    <th>Discount</th>
                                    <th>Gross Sales</th>
                                    <th>Gross Sales Returns</th>
                                    <th>Net Sales</th>
                                    <th>Sales Tax</th>
                                    <th>Discount Amount</th>
                                    <th>Sales Refunded</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Grilled Chicken Salad</td>
                                    <td>Regular</td>
                                    <td>$15.00</td>
                                    <td>$15.00</td>
                                    <td>$0.00</td>
                                    <td>$15.00</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>2</td>
                                </tr>
                                <tr>
                                    <td>Chicken Sandwich</td>
                                    <td>Regular</td>
                                    <td>$20.00</td>
                                    <td>$20.00</td>
                                    <td>$0.00</td>
                                    <td>$20.00</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>2</td>
                                </tr>
                                <tr>
                                    <td>Combo Meal Deal</td>
                                    <td>Regular</td>
                                    <td>$30.00</td>
                                    <td>$30.00</td>
                                    <td>$0.00</td>
                                    <td>$30.00</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td>Waldorf Salad</td>
                                    <td>Regular</td>
                                    <td>$3,000.00</td>
                                    <td>$0.00</td>
                                    <td>$3,000.00</td>
                                    <td>$400.00</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>3</td>
                                </tr>
                                <tr class="highlighted-row">
                                    <td>SIP OF ICE TEA</td>
                                    <td>Regular</td>
                                    <td>$4,500.00</td>
                                    <td>$0.00</td>
                                    <td>$4,500.00</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>Cinnamon Roll</td>
                                    <td>Regular</td>
                                    <td>$4.00</td>
                                    <td>$0.00</td>
                                    <td>$4.00</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>0</td>
                                </tr>
                                <tr>
                                    <td>Turkey Sandwich</td>
                                    <td>Regular</td>
                                    <td>$9.00</td>
                                    <td>$0.00</td>
                                    <td>$9.00</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>0</td>
                                </tr>
                                <tr>
                                    <td>Turkey Club</td>
                                    <td>Regular</td>
                                    <td>$13.16</td>
                                    <td>$0.00</td>
                                    <td>$13.16</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>0</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

        const itemSalesDiv = document.createElement('div');
        itemSalesDiv.innerHTML = itemSalesHTML;
        
        // Initialize the chart after the element is added to DOM
        setTimeout(() => {
            initializeItemSalesChart();
            initializeScheduleButton();
        }, 100);
        
        return itemSalesDiv.firstElementChild;
    }

    function initializeItemSalesChart() {
        const canvas = document.getElementById('itemSalesChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Chart data (simplified bar chart)
        const data = [
            { name: 'GRILLED CHIC', value: 80, color: '#667eea' },
            { name: 'SANDWICH', value: 45, color: '#667eea' },
            { name: 'SIP OF ICE TEA', value: 25, color: '#667eea' },
            { name: 'COMBO MEAL', value: 15, color: '#667eea' },
            { name: 'CINNAMON ROLL', value: 10, color: '#667eea' },
            { name: 'TURKEY CLUB', value: 8, color: '#667eea' },
            { name: 'WALDORF SALAD', value: 5, color: '#667eea' }
        ];
        
        const maxValue = Math.max(...data.map(d => d.value));
        const chartHeight = 200;
        const chartWidth = 600;
        const barWidth = 60;
        const spacing = 20;
        const startX = 50;
        const startY = 50;
        
        // Draw bars
        data.forEach((item, index) => {
            const barHeight = (item.value / maxValue) * chartHeight;
            const x = startX + index * (barWidth + spacing);
            const y = startY + chartHeight - barHeight;
            
            // Draw bar
            ctx.fillStyle = item.color;
            ctx.fillRect(x, y, barWidth, barHeight);
            
            // Draw value on top
            ctx.fillStyle = '#333';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(item.value.toString(), x + barWidth/2, y - 5);
            
            // Draw label at bottom
            ctx.save();
            ctx.translate(x + barWidth/2, startY + chartHeight + 15);
            ctx.rotate(-Math.PI/4);
            ctx.textAlign = 'right';
            ctx.fillText(item.name, 0, 0);
            ctx.restore();
        });
        
        // Draw axes
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX, startY + chartHeight);
        ctx.lineTo(startX + chartWidth, startY + chartHeight);
        ctx.stroke();
    }

    function showOrderReportView() {
        // Hide the main custom reports view
        v1Content.style.display = 'none';
        
        // Create and show the order report view
        const orderReportView = createOrderReportView();
        const mainContent = document.querySelector('.main-content');
        mainContent.appendChild(orderReportView);
    }

    function createOrderReportView() {
        const orderReportHTML = `
            <div class="content-version" id="orderReportContent">
                <header class="content-header">
                    <div class="header-left">
                        <div class="breadcrumb">
                            <a href="#" class="back-link" onclick="returnToCustomReports()">
                                <i class="fas fa-arrow-left"></i>
                            </a>
                            <h1>Order Report</h1>
                        </div>
                    </div>
                    <div class="header-right">
                        <button class="btn btn-secondary">
                            <i class="fas fa-download"></i>
                        </button>
                        <button class="btn btn-secondary">
                            <i class="fas fa-share-alt"></i>
                        </button>
                    </div>
                </header>

                <div class="content-body">
                    <!-- Filters and Controls -->
                    <div class="report-controls">
                        <div class="date-range">
                            <label>Last month</label>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="location-filter">
                            <label>Location: All</label>
                            <span class="filter-detail">Group by Order Name & 8 others</span>
                        </div>
                        <div class="additional-filters">
                            <span class="filter-detail">Metrics: Gross Sales & 15 others</span>
                            <button class="filter-btn">Filter by</button>
                        </div>
                    </div>

                    <!-- Chart Section -->
                    <div class="chart-section">
                        <div class="chart-container">
                            <canvas id="orderReportChart" width="800" height="300"></canvas>
                        </div>
                    </div>

                    <!-- Data Table -->
                    <div class="data-table-section">
                        <table class="data-table expandable-table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Order Name</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Gross Sales</th>
                                    <th>Items</th>
                                    <th>Service Charges</th>
                                    <th>Returns</th>
                                    <th>Discounts</th>
                                    <th>Net Sales</th>
                                    <th>Taxes</th>
                                    <th>Tips</th>
                                    <th>Channel</th>
                                    <th>Device</th>
                                    <th>Staff Name</th>
                                    <th>Total Collected</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="order-row" data-order-id="ord-001">
                                    <td class="expand-btn">
                                        <i class="fas fa-chevron-right"></i>
                                    </td>
                                    <td><strong>Order #12345</strong></td>
                                    <td>2025-01-20</td>
                                    <td>14:30 PST</td>
                                    <td>$45.50</td>
                                    <td>3</td>
                                    <td>$2.50</td>
                                    <td>$0.00</td>
                                    <td>$5.00</td>
                                    <td>$40.50</td>
                                    <td>$3.25</td>
                                    <td>$8.00</td>
                                    <td>Online</td>
                                    <td>iPad Pro</td>
                                    <td>John Smith</td>
                                    <td>$51.75</td>
                                </tr>
                                <tr class="order-row" data-order-id="ord-002">
                                    <td class="expand-btn">
                                        <i class="fas fa-chevron-right"></i>
                                    </td>
                                    <td><strong>Order #12346</strong></td>
                                    <td>2025-01-20</td>
                                    <td>15:45 PST</td>
                                    <td>$32.75</td>
                                    <td>2</td>
                                    <td>$1.75</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>$32.75</td>
                                    <td>$2.62</td>
                                    <td>$5.00</td>
                                    <td>In-Store</td>
                                    <td>Terminal A1</td>
                                    <td>Jane Doe</td>
                                    <td>$40.37</td>
                                </tr>
                                <tr class="order-row" data-order-id="ord-003">
                                    <td class="expand-btn">
                                        <i class="fas fa-chevron-right"></i>
                                    </td>
                                    <td><strong>Order #12347</strong></td>
                                    <td>2025-01-20</td>
                                    <td>16:20 PST</td>
                                    <td>$67.25</td>
                                    <td>4</td>
                                    <td>$3.25</td>
                                    <td>$0.00</td>
                                    <td>$10.00</td>
                                    <td>$57.25</td>
                                    <td>$4.58</td>
                                    <td>$12.00</td>
                                    <td>Delivery</td>
                                    <td>Mobile App</td>
                                    <td>Mike Johnson</td>
                                    <td>$73.83</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

        const orderReportDiv = document.createElement('div');
        orderReportDiv.innerHTML = orderReportHTML;
        
        // Initialize the chart after the element is added to DOM
        setTimeout(() => {
            initializeOrderReportChart();
            initializeExpandableRows();
            initializeScheduleButton();
        }, 100);
        
        return orderReportDiv.firstElementChild;
    }

    function initializeOrderReportChart() {
        const canvas = document.getElementById('orderReportChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Chart data for orders
        const data = [
            { name: 'ORDER #12345', value: 45.50, color: '#667eea' },
            { name: 'ORDER #12346', value: 32.75, color: '#667eea' },
            { name: 'ORDER #12347', value: 67.25, color: '#667eea' },
            { name: 'ORDER #12348', value: 28.50, color: '#667eea' },
            { name: 'ORDER #12349', value: 55.75, color: '#667eea' }
        ];
        
        const maxValue = Math.max(...data.map(d => d.value));
        const chartHeight = 200;
        const chartWidth = 600;
        const barWidth = 80;
        const spacing = 20;
        const startX = 50;
        const startY = 50;
        
        // Draw bars
        data.forEach((item, index) => {
            const barHeight = (item.value / maxValue) * chartHeight;
            const x = startX + index * (barWidth + spacing);
            const y = startY + chartHeight - barHeight;
            
            // Draw bar
            ctx.fillStyle = item.color;
            ctx.fillRect(x, y, barWidth, barHeight);
            
            // Draw value on top
            ctx.fillStyle = '#333';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('$' + item.value.toString(), x + barWidth/2, y - 5);
            
            // Draw label at bottom
            ctx.save();
            ctx.translate(x + barWidth/2, startY + chartHeight + 15);
            ctx.rotate(-Math.PI/4);
            ctx.textAlign = 'right';
            ctx.fillText(item.name, 0, 0);
            ctx.restore();
        });
        
        // Draw axes
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX, startY + chartHeight);
        ctx.lineTo(startX + chartWidth, startY + chartHeight);
        ctx.stroke();
    }

    function initializeExpandableRows() {
        const orderRows = document.querySelectorAll('.order-row');
        orderRows.forEach(row => {
            const expandBtn = row.querySelector('.expand-btn');
            expandBtn.addEventListener('click', function() {
                toggleOrderExpansion(row);
            });
        });
    }

    function toggleOrderExpansion(orderRow) {
        const orderId = orderRow.dataset.orderId;
        const expandIcon = orderRow.querySelector('.expand-btn i');
        const existingExpansion = document.getElementById(`expansion-${orderId}`);
        
        if (existingExpansion) {
            // Collapse
            existingExpansion.remove();
            expandIcon.className = 'fas fa-chevron-right';
        } else {
            // Expand
            expandIcon.className = 'fas fa-chevron-down';
            const expansionRow = createOrderExpansion(orderId);
            orderRow.insertAdjacentElement('afterend', expansionRow);
        }
    }

    function createOrderExpansion(orderId) {
        const expansionRow = document.createElement('tr');
        expansionRow.id = `expansion-${orderId}`;
        expansionRow.className = 'expansion-row';
        
        const expansionCell = document.createElement('td');
        expansionCell.colSpan = 16;
        expansionCell.className = 'expansion-content';
        
        expansionCell.innerHTML = `
            <div class="expansion-container">
                <div class="expansion-tabs">
                    <button class="tab-btn active" data-tab="items">Items</button>
                    <button class="tab-btn" data-tab="payments">Payments</button>
                    <button class="tab-btn" data-tab="customers">Customers</button>
                </div>
                
                <div class="tab-content" id="items-${orderId}">
                    <table class="nested-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Item Name</th>
                                <th>Itemization Type</th>
                                <th>SKU</th>
                                <th>Category</th>
                                <th>Gross Sales</th>
                                <th>Net Sales</th>
                                <th>Tax</th>
                                <th>Discount Amount</th>
                                <th>Items Sold</th>
                                <th>Qty</th>
                                <th>Unit Price</th>
                                <th>Variation</th>
                                <th>Modifier</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="item-row" data-item-id="item-001">
                                <td class="expand-btn-small">
                                    <i class="fas fa-chevron-right"></i>
                                </td>
                                <td>Grilled Chicken Salad</td>
                                <td>Food Item</td>
                                <td>GCS-001</td>
                                <td>Salads</td>
                                <td>$15.50</td>
                                <td>$14.25</td>
                                <td>$1.25</td>
                                <td>$0.00</td>
                                <td>1</td>
                                <td>1</td>
                                <td>$15.50</td>
                                <td>Regular</td>
                                <td>Extra Dressing</td>
                            </tr>
                            <tr class="item-row" data-item-id="item-002">
                                <td class="expand-btn-small">
                                    <i class="fas fa-chevron-right"></i>
                                </td>
                                <td>Iced Tea</td>
                                <td>Beverage</td>
                                <td>ICT-001</td>
                                <td>Beverages</td>
                                <td>$3.50</td>
                                <td>$3.25</td>
                                <td>$0.25</td>
                                <td>$0.00</td>
                                <td>1</td>
                                <td>1</td>
                                <td>$3.50</td>
                                <td>Large</td>
                                <td>-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="tab-content hidden" id="payments-${orderId}">
                    <table class="nested-table">
                        <thead>
                            <tr>
                                <th>Payment ID</th>
                                <th>Payment Status</th>
                                <th>Amount</th>
                                <th>Card Brand</th>
                                <th>Card Entry Method</th>
                                <th>Cash</th>
                                <th>Gift Card</th>
                                <th>Other Tender</th>
                                <th>Fees</th>
                                <th>Net Total</th>
                                <th>Transaction ID</th>
                                <th>Device Name</th>
                                <th>Processing Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>PAY-12345-001</td>
                                <td><span class="status-badge success">Completed</span></td>
                                <td>$43.75</td>
                                <td>Visa</td>
                                <td>Chip</td>
                                <td>$0.00</td>
                                <td>$0.00</td>
                                <td>$0.00</td>
                                <td>$1.25</td>
                                <td>$42.50</td>
                                <td>TXN-789123</td>
                                <td>iPad Pro</td>
                                <td>14:30:15 PST</td>
                            </tr>
                            <tr>
                                <td>PAY-12345-002</td>
                                <td><span class="status-badge success">Completed</span></td>
                                <td>$8.00</td>
                                <td>-</td>
                                <td>-</td>
                                <td>$8.00</td>
                                <td>$0.00</td>
                                <td>$0.00</td>
                                <td>$0.00</td>
                                <td>$8.00</td>
                                <td>TXN-789124</td>
                                <td>iPad Pro</td>
                                <td>14:30:45 PST</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="tab-content hidden" id="customers-${orderId}">
                    <div class="customer-info-section">
                        <div class="customer-profile">
                            <div class="customer-header">
                                <div class="customer-avatar">
                                    <i class="fas fa-user-circle"></i>
                                </div>
                                <div class="customer-basic-info">
                                    <h3>Sarah Johnson</h3>
                                    <p class="customer-id">Customer ID: CUST-789456</p>
                                    <div class="customer-badges">
                                        <span class="customer-badge vip">VIP Member</span>
                                        <span class="customer-badge loyalty">Gold Tier</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="customer-details-grid">
                                <div class="detail-section">
                                    <h4><i class="fas fa-envelope"></i> Contact Information</h4>
                                    <div class="detail-grid">
                                        <div><strong>Email:</strong> sarah.johnson@email.com</div>
                                        <div><strong>Phone:</strong> +1 (555) 123-4567</div>
                                        <div><strong>Preferred Contact:</strong> Email</div>
                                        <div><strong>Marketing Opt-in:</strong> Yes</div>
                                    </div>
                                </div>
                                
                                <div class="detail-section">
                                    <h4><i class="fas fa-map-marker-alt"></i> Address Information</h4>
                                    <div class="detail-grid">
                                        <div><strong>Street:</strong> 123 Main Street</div>
                                        <div><strong>City:</strong> San Francisco</div>
                                        <div><strong>State:</strong> CA</div>
                                        <div><strong>ZIP Code:</strong> 94102</div>
                                        <div><strong>Country:</strong> United States</div>
                                        <div><strong>Delivery Zone:</strong> Downtown</div>
                                    </div>
                                </div>
                                
                                <div class="detail-section">
                                    <h4><i class="fas fa-chart-line"></i> Customer Analytics</h4>
                                    <div class="detail-grid">
                                        <div><strong>Total Orders:</strong> 47</div>
                                        <div><strong>Lifetime Value:</strong> $1,247.50</div>
                                        <div><strong>Average Order:</strong> $26.54</div>
                                        <div><strong>Last Visit:</strong> 2025-01-18</div>
                                        <div><strong>Visit Frequency:</strong> 2.3 times/month</div>
                                        <div><strong>Favorite Items:</strong> Grilled Chicken Salad</div>
                                    </div>
                                </div>
                                
                                <div class="detail-section">
                                    <h4><i class="fas fa-gift"></i> Loyalty & Rewards</h4>
                                    <div class="detail-grid">
                                        <div><strong>Loyalty Points:</strong> 2,450 pts</div>
                                        <div><strong>Points Redeemed:</strong> 1,200 pts</div>
                                        <div><strong>Member Since:</strong> March 2023</div>
                                        <div><strong>Tier Status:</strong> Gold (Next: Platinum)</div>
                                        <div><strong>Referrals Made:</strong> 3</div>
                                        <div><strong>Birthday:</strong> July 15th</div>
                                    </div>
                                </div>
                                
                                <div class="detail-section">
                                    <h4><i class="fas fa-credit-card"></i> Payment Preferences</h4>
                                    <div class="detail-grid">
                                        <div><strong>Preferred Payment:</strong> Visa ending 4567</div>
                                        <div><strong>Payment Methods:</strong> 2 cards saved</div>
                                        <div><strong>Auto-tip:</strong> 18%</div>
                                        <div><strong>Split Bills:</strong> Enabled</div>
                                        <div><strong>Receipt Preference:</strong> Email</div>
                                        <div><strong>Billing Address:</strong> Same as delivery</div>
                                    </div>
                                </div>
                                
                                <div class="detail-section">
                                    <h4><i class="fas fa-utensils"></i> Dining Preferences</h4>
                                    <div class="detail-grid">
                                        <div><strong>Dietary Restrictions:</strong> Gluten-free</div>
                                        <div><strong>Allergies:</strong> Nuts</div>
                                        <div><strong>Preferred Channel:</strong> Mobile App</div>
                                        <div><strong>Delivery Instructions:</strong> Leave at door</div>
                                        <div><strong>Favorite Location:</strong> Downtown Store</div>
                                        <div><strong>Preferred Time:</strong> Lunch (12-2 PM)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="customer-order-history">
                            <h4><i class="fas fa-history"></i> Recent Order History</h4>
                            <table class="nested-table">
                                <thead>
                                    <tr>
                                        <th>Order Date</th>
                                        <th>Order #</th>
                                        <th>Items</th>
                                        <th>Total</th>
                                        <th>Channel</th>
                                        <th>Status</th>
                                        <th>Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>2025-01-20</td>
                                        <td>#12345</td>
                                        <td>Grilled Chicken Salad, Iced Tea</td>
                                        <td>$51.75</td>
                                        <td>Online</td>
                                        <td><span class="status-badge success">Completed</span></td>
                                        <td>⭐⭐⭐⭐⭐</td>
                                    </tr>
                                    <tr>
                                        <td>2025-01-18</td>
                                        <td>#12298</td>
                                        <td>Turkey Club, Coffee</td>
                                        <td>$18.50</td>
                                        <td>In-Store</td>
                                        <td><span class="status-badge success">Completed</span></td>
                                        <td>⭐⭐⭐⭐</td>
                                    </tr>
                                    <tr>
                                        <td>2025-01-15</td>
                                        <td>#12156</td>
                                        <td>Waldorf Salad, Smoothie</td>
                                        <td>$24.75</td>
                                        <td>Mobile App</td>
                                        <td><span class="status-badge success">Completed</span></td>
                                        <td>⭐⭐⭐⭐⭐</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        expansionRow.appendChild(expansionCell);
        
        // Add tab functionality
        setTimeout(() => {
            const tabBtns = expansionCell.querySelectorAll('.tab-btn');
            const tabContents = expansionCell.querySelectorAll('.tab-content');
            
            tabBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const targetTab = this.dataset.tab;
                    
                    // Update active tab
                    tabBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Show/hide content
                    tabContents.forEach(content => {
                        if (content.id.includes(targetTab)) {
                            content.classList.remove('hidden');
                        } else {
                            content.classList.add('hidden');
                        }
                    });
                });
            });
            
            // Add item expansion functionality
            const itemRows = expansionCell.querySelectorAll('.item-row');
            itemRows.forEach(itemRow => {
                const expandBtn = itemRow.querySelector('.expand-btn-small');
                expandBtn.addEventListener('click', function() {
                    toggleItemExpansion(itemRow);
                });
            });
        }, 100);
        
        return expansionRow;
    }

    function toggleItemExpansion(itemRow) {
        const itemId = itemRow.dataset.itemId;
        const expandIcon = itemRow.querySelector('.expand-btn-small i');
        const existingExpansion = document.getElementById(`item-expansion-${itemId}`);
        
        if (existingExpansion) {
            // Collapse
            existingExpansion.remove();
            expandIcon.className = 'fas fa-chevron-right';
        } else {
            // Expand
            expandIcon.className = 'fas fa-chevron-down';
            const itemExpansionRow = createItemExpansion(itemId);
            itemRow.insertAdjacentElement('afterend', itemExpansionRow);
        }
    }

    function createItemExpansion(itemId) {
        const expansionRow = document.createElement('tr');
        expansionRow.id = `item-expansion-${itemId}`;
        expansionRow.className = 'item-expansion-row';
        
        const expansionCell = document.createElement('td');
        expansionCell.colSpan = 14;
        expansionCell.className = 'item-expansion-content';
        
        expansionCell.innerHTML = `
            <div class="item-details">
                <div class="detail-section">
                    <h4>Item Details</h4>
                    <div class="detail-grid">
                        <div><strong>GTIN:</strong> 1234567890123</div>
                        <div><strong>Location:</strong> Main Kitchen</div>
                        <div><strong>Menu Category:</strong> Salads & Healthy</div>
                        <div><strong>Reporting Category:</strong> Food</div>
                        <div><strong>Category Rollup:</strong> Main Dishes</div>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4>Financial Details</h4>
                    <div class="detail-grid">
                        <div><strong>Gross Sales:</strong> $15.50</div>
                        <div><strong>Net Sales:</strong> $14.25</div>
                        <div><strong>Tax:</strong> $1.25</div>
                        <div><strong>Discount Name:</strong> -</div>
                        <div><strong>Comps:</strong> $0.00</div>
                        <div><strong>Void:</strong> $0.00</div>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4>Quantity & Pricing</h4>
                    <div class="detail-grid">
                        <div><strong>Items Refunded:</strong> 0</div>
                        <div><strong>Items Sold:</strong> 1</div>
                        <div><strong>Unit:</strong> Each</div>
                        <div><strong>Units Refunded:</strong> 0</div>
                        <div><strong>Units Sold:</strong> 1</div>
                        <div><strong>Refunds:</strong> $0.00</div>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4>Modifiers & Variations</h4>
                    <div class="detail-grid">
                        <div><strong>Variation Name:</strong> Regular</div>
                        <div><strong>Variation Unit Cost:</strong> $8.50</div>
                        <div><strong>Variation Vendor:</strong> Fresh Foods Co.</div>
                        <div><strong>Vendor Code:</strong> FF-001</div>
                        <div><strong>Modifier Set:</strong> Dressing Options</div>
                        <div><strong>Modifier Name:</strong> Extra Dressing</div>
                    </div>
                </div>
            </div>
        `;
        
        expansionRow.appendChild(expansionCell);
        return expansionRow;
    }

    function showPaymentsReportView() {
        // Hide the main custom reports view
        v1Content.style.display = 'none';
        
        // Create and show the payments report view
        const paymentsReportView = createPaymentsReportView();
        const mainContent = document.querySelector('.main-content');
        mainContent.appendChild(paymentsReportView);
    }

    function createPaymentsReportView() {
        const paymentsReportHTML = `
            <div class="content-version" id="paymentsReportContent">
                <header class="content-header">
                    <div class="header-left">
                        <div class="breadcrumb">
                            <a href="#" class="back-link" onclick="returnToCustomReports()">
                                <i class="fas fa-arrow-left"></i>
                            </a>
                            <h1>Payments Report</h1>
                        </div>
                    </div>
                    <div class="header-right">
                        <button class="btn btn-secondary">
                            <i class="fas fa-download"></i>
                        </button>
                        <button class="btn btn-secondary">
                            <i class="fas fa-share-alt"></i>
                        </button>
                    </div>
                </header>

                <div class="content-body">
                    <!-- Filters and Controls -->
                    <div class="report-controls">
                        <div class="date-range">
                            <label>Last month</label>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="location-filter">
                            <label>Location: All</label>
                            <span class="filter-detail">Group by Payment ID & 6 others</span>
                        </div>
                        <div class="additional-filters">
                            <span class="filter-detail">Metrics: Payment Amount & 12 others</span>
                            <button class="filter-btn">Filter by</button>
                        </div>
                    </div>

                    <!-- Chart Section -->
                    <div class="chart-section">
                        <div class="chart-container">
                            <canvas id="paymentsReportChart" width="800" height="300"></canvas>
                        </div>
                    </div>

                    <!-- Data Table -->
                    <div class="data-table-section">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Payment ID</th>
                                    <th>Payment Status</th>
                                    <th>Amount</th>
                                    <th>Card Brand</th>
                                    <th>Card Entry Method</th>
                                    <th>Cash</th>
                                    <th>Gift Card</th>
                                    <th>Other Tender</th>
                                    <th>Fees</th>
                                    <th>Net Total</th>
                                    <th>Transaction ID</th>
                                    <th>Device Name</th>
                                    <th>Payment Created</th>
                                    <th>Payment Completed</th>
                                    <th>Transfer Status</th>
                                    <th>Scheduled Transfer</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>PAY-12345-001</strong></td>
                                    <td><span class="status-badge success">Completed</span></td>
                                    <td>$43.75</td>
                                    <td>Visa</td>
                                    <td>Chip</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>$1.25</td>
                                    <td>$42.50</td>
                                    <td>TXN-789123</td>
                                    <td>iPad Pro</td>
                                    <td>14:30:10 PST</td>
                                    <td>14:30:15 PST</td>
                                    <td><span class="transfer-badge scheduled">Scheduled</span></td>
                                    <td>Jan 22, 2025</td>
                                </tr>
                                <tr>
                                    <td><strong>PAY-12345-002</strong></td>
                                    <td><span class="status-badge success">Completed</span></td>
                                    <td>$8.00</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>$8.00</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>$8.00</td>
                                    <td>TXN-789124</td>
                                    <td>iPad Pro</td>
                                    <td>14:30:40 PST</td>
                                    <td>14:30:45 PST</td>
                                    <td><span class="transfer-badge pending">Manual Deposit</span></td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td><strong>PAY-12346-001</strong></td>
                                    <td><span class="status-badge success">Completed</span></td>
                                    <td>$32.75</td>
                                    <td>Mastercard</td>
                                    <td>Contactless</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>$0.95</td>
                                    <td>$31.80</td>
                                    <td>TXN-789200</td>
                                    <td>Terminal A1</td>
                                    <td>15:45:20 PST</td>
                                    <td>15:45:22 PST</td>
                                    <td><span class="transfer-badge transferred">Transferred</span></td>
                                    <td>Jan 21, 2025</td>
                                </tr>
                                <tr>
                                    <td><strong>PAY-12346-002</strong></td>
                                    <td><span class="status-badge success">Completed</span></td>
                                    <td>$5.00</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>$5.00</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>$5.00</td>
                                    <td>TXN-789201</td>
                                    <td>Terminal A1</td>
                                    <td>15:45:50 PST</td>
                                    <td>15:45:50 PST</td>
                                    <td><span class="transfer-badge pending">Manual Deposit</span></td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td><strong>PAY-12347-001</strong></td>
                                    <td><span class="status-badge success">Completed</span></td>
                                    <td>$55.25</td>
                                    <td>American Express</td>
                                    <td>Chip</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>$1.85</td>
                                    <td>$53.40</td>
                                    <td>TXN-789300</td>
                                    <td>Mobile App</td>
                                    <td>16:20:05 PST</td>
                                    <td>16:20:08 PST</td>
                                    <td><span class="transfer-badge scheduled">Scheduled</span></td>
                                    <td>Jan 22, 2025</td>
                                </tr>
                                <tr>
                                    <td><strong>PAY-12347-002</strong></td>
                                    <td><span class="status-badge success">Completed</span></td>
                                    <td>$12.00</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>$12.00</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>$12.00</td>
                                    <td>TXN-789301</td>
                                    <td>Mobile App</td>
                                    <td>16:20:30 PST</td>
                                    <td>16:20:30 PST</td>
                                    <td><span class="transfer-badge pending">Manual Deposit</span></td>
                                    <td>-</td>
                                </tr>
                                <tr class="highlighted-row">
                                    <td><strong>PAY-12348-001</strong></td>
                                    <td><span class="status-badge failed">Failed</span></td>
                                    <td>$28.50</td>
                                    <td>Visa</td>
                                    <td>Swipe</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>TXN-789400</td>
                                    <td>Terminal B2</td>
                                    <td>17:15:10 PST</td>
                                    <td>-</td>
                                    <td><span class="transfer-badge failed">Failed</span></td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td><strong>PAY-12349-001</strong></td>
                                    <td><span class="status-badge processing">Processing</span></td>
                                    <td>$67.80</td>
                                    <td>Discover</td>
                                    <td>Contactless</td>
                                    <td>$0.00</td>
                                    <td>$15.00</td>
                                    <td>$0.00</td>
                                    <td>$2.05</td>
                                    <td>$65.75</td>
                                    <td>TXN-789500</td>
                                    <td>iPad Mini</td>
                                    <td>18:45:20 PST</td>
                                    <td>-</td>
                                    <td><span class="transfer-badge processing">Processing</span></td>
                                    <td>Jan 22, 2025</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

        const paymentsReportDiv = document.createElement('div');
        paymentsReportDiv.innerHTML = paymentsReportHTML;
        
        // Initialize the chart after the element is added to DOM
        setTimeout(() => {
            initializePaymentsReportChart();
            initializeScheduleButton();
        }, 100);
        
        return paymentsReportDiv.firstElementChild;
    }

    function initializePaymentsReportChart() {
        const canvas = document.getElementById('paymentsReportChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Chart data for payments by method
        const data = [
            { name: 'CARD PAYMENTS', value: 199.75, color: '#667eea' },
            { name: 'CASH PAYMENTS', value: 25.00, color: '#10b981' },
            { name: 'GIFT CARDS', value: 15.00, color: '#f59e0b' },
            { name: 'FAILED/PROCESSING', value: 96.30, color: '#ef4444' }
        ];
        
        const maxValue = Math.max(...data.map(d => d.value));
        const chartHeight = 200;
        const chartWidth = 600;
        const barWidth = 120;
        const spacing = 30;
        const startX = 50;
        const startY = 50;
        
        // Draw bars
        data.forEach((item, index) => {
            const barHeight = (item.value / maxValue) * chartHeight;
            const x = startX + index * (barWidth + spacing);
            const y = startY + chartHeight - barHeight;
            
            // Draw bar
            ctx.fillStyle = item.color;
            ctx.fillRect(x, y, barWidth, barHeight);
            
            // Draw value on top
            ctx.fillStyle = '#333';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('$' + item.value.toString(), x + barWidth/2, y - 5);
            
            // Draw label at bottom
            ctx.save();
            ctx.translate(x + barWidth/2, startY + chartHeight + 15);
            ctx.rotate(-Math.PI/6);
            ctx.textAlign = 'right';
            ctx.fillText(item.name, 0, 0);
            ctx.restore();
        });
        
        // Draw axes
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX, startY + chartHeight);
        ctx.lineTo(startX + chartWidth, startY + chartHeight);
        ctx.stroke();
    }

    function showEmployeeReportView() {
        // Hide the main custom reports view
        v1Content.style.display = 'none';
        
        // Create and show the employee report view
        const employeeReportView = createEmployeeReportView();
        const mainContent = document.querySelector('.main-content');
        mainContent.appendChild(employeeReportView);
    }

    function createEmployeeReportView() {
        const employeeReportHTML = `
            <div class="content-version" id="employeeReportContent">
                <header class="content-header">
                    <div class="header-left">
                        <div class="breadcrumb">
                            <a href="#" class="back-link" onclick="returnToCustomReports()">
                                <i class="fas fa-arrow-left"></i>
                            </a>
                            <h1>Employee Report</h1>
                        </div>
                    </div>
                    <div class="header-right">
                        <button class="btn btn-secondary">
                            <i class="fas fa-download"></i>
                        </button>
                        <button class="btn btn-secondary">
                            <i class="fas fa-share-alt"></i>
                        </button>
                    </div>
                </header>

                <div class="content-body">
                    <!-- Filters and Controls -->
                    <div class="report-controls">
                        <div class="date-range">
                            <label>Last month</label>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="location-filter">
                            <label>Location: All</label>
                            <span class="filter-detail">Group by Employee Name & 3 others</span>
                        </div>
                        <div class="additional-filters">
                            <span class="filter-detail">Metrics: Gross Sales & 9 others</span>
                            <button class="filter-btn">Filter by</button>
                        </div>
                    </div>

                    <!-- Metric Widgets -->
                    <div class="metric-widgets">
                        <div class="widget-row">
                            <div class="metric-widget" data-metric="labor-cost">
                                <div class="widget-header">
                                    <h4><i class="fas fa-dollar-sign"></i> Labor Cost</h4>
                                    <div class="widget-value">$12,450</div>
                                </div>
                                <div class="widget-breakdown">
                                    <div class="breakdown-item">
                                        <span>Regular: $8,200</span>
                                        <span>Overtime: $3,250</span>
                                        <span>Double Time: $1,000</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="metric-widget" data-metric="labor-percentage">
                                <div class="widget-header">
                                    <h4><i class="fas fa-percentage"></i> Labor % of Net Sales</h4>
                                    <div class="widget-value">28.5%</div>
                                </div>
                                <div class="widget-chart">
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: 28.5%"></div>
                                    </div>
                                    <span class="target-line">Target: 25%</span>
                                </div>
                            </div>
                            
                            <div class="metric-widget" data-metric="net-sales">
                                <div class="widget-header">
                                    <h4><i class="fas fa-chart-line"></i> Net Sales</h4>
                                    <div class="widget-value">$43,680</div>
                                </div>
                                <div class="widget-trend">
                                    <span class="trend-up"><i class="fas fa-arrow-up"></i> +12.3%</span>
                                    <span class="trend-period">vs last month</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Chart Section -->
                    <div class="chart-section">
                        <div class="chart-container">
                            <canvas id="employeeReportChart" width="800" height="300"></canvas>
                        </div>
                    </div>

                    <!-- Data Table -->
                    <div class="data-table-section">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Gross Sales</th>
                                    <th>Tips</th>
                                    <th>Automatic Gratuity</th>
                                    <th>Net Sales</th>
                                    <th>Avg. Net Sales</th>
                                    <th>Sales</th>
                                    <th>Paid Hours</th>
                                    <th>Sales/Hour</th>
                                    <th>Commission</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Sarah Johnson</strong></td>
                                    <td>$8,450.00</td>
                                    <td>$1,250.00</td>
                                    <td>$180.00</td>
                                    <td>$7,800.00</td>
                                    <td>$325.00</td>
                                    <td>142</td>
                                    <td>160.0</td>
                                    <td>$48.75</td>
                                    <td>$421.25</td>
                                </tr>
                                <tr>
                                    <td><strong>Mike Rodriguez</strong></td>
                                    <td>$7,250.00</td>
                                    <td>$980.00</td>
                                    <td>$145.00</td>
                                    <td>$6,690.00</td>
                                    <td>$278.75</td>
                                    <td>118</td>
                                    <td>152.0</td>
                                    <td>$44.01</td>
                                    <td>$362.50</td>
                                </tr>
                                <tr>
                                    <td><strong>Emily Chen</strong></td>
                                    <td>$9,180.00</td>
                                    <td>$1,420.00</td>
                                    <td>$220.00</td>
                                    <td>$8,480.00</td>
                                    <td>$353.33</td>
                                    <td>156</td>
                                    <td>168.0</td>
                                    <td>$50.48</td>
                                    <td>$459.00</td>
                                </tr>
                                <tr class="highlighted-row">
                                    <td><strong>David Kim</strong></td>
                                    <td>$6,890.00</td>
                                    <td>$850.00</td>
                                    <td>$125.00</td>
                                    <td>$6,365.00</td>
                                    <td>$265.21</td>
                                    <td>98</td>
                                    <td>144.0</td>
                                    <td>$44.24</td>
                                    <td>$344.50</td>
                                </tr>
                                <tr>
                                    <td><strong>Lisa Thompson</strong></td>
                                    <td>$5,420.00</td>
                                    <td>$680.00</td>
                                    <td>$95.00</td>
                                    <td>$5,005.00</td>
                                    <td>$208.54</td>
                                    <td>82</td>
                                    <td>120.0</td>
                                    <td>$41.71</td>
                                    <td>$271.00</td>
                                </tr>
                                <tr>
                                    <td><strong>James Wilson</strong></td>
                                    <td>$4,890.00</td>
                                    <td>$590.00</td>
                                    <td>$85.00</td>
                                    <td>$4,515.00</td>
                                    <td>$188.13</td>
                                    <td>76</td>
                                    <td>112.0</td>
                                    <td>$40.31</td>
                                    <td>$244.50</td>
                                </tr>
                                <tr>
                                    <td><strong>Maria Garcia</strong></td>
                                    <td>$3,680.00</td>
                                    <td>$450.00</td>
                                    <td>$65.00</td>
                                    <td>$3,395.00</td>
                                    <td>$141.46</td>
                                    <td>58</td>
                                    <td>88.0</td>
                                    <td>$38.58</td>
                                    <td>$184.00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

        const employeeReportDiv = document.createElement('div');
        employeeReportDiv.innerHTML = employeeReportHTML;
        
        // Initialize the chart and widgets after the element is added to DOM
        setTimeout(() => {
            initializeEmployeeReportChart();
            initializeMetricWidgets();
            initializeScheduleButton();
        }, 100);
        
        return employeeReportDiv.firstElementChild;
    }

    function initializeEmployeeReportChart() {
        const canvas = document.getElementById('employeeReportChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Chart data for employee sales performance
        const data = [
            { name: 'EMILY C.', value: 9180, color: '#10b981' },
            { name: 'SARAH J.', value: 8450, color: '#667eea' },
            { name: 'MIKE R.', value: 7250, color: '#667eea' },
            { name: 'DAVID K.', value: 6890, color: '#f59e0b' },
            { name: 'LISA T.', value: 5420, color: '#667eea' },
            { name: 'JAMES W.', value: 4890, color: '#667eea' },
            { name: 'MARIA G.', value: 3680, color: '#ef4444' }
        ];
        
        const maxValue = Math.max(...data.map(d => d.value));
        const chartHeight = 200;
        const chartWidth = 700;
        const barWidth = 80;
        const spacing = 20;
        const startX = 50;
        const startY = 50;
        
        // Draw bars
        data.forEach((item, index) => {
            const barHeight = (item.value / maxValue) * chartHeight;
            const x = startX + index * (barWidth + spacing);
            const y = startY + chartHeight - barHeight;
            
            // Draw bar
            ctx.fillStyle = item.color;
            ctx.fillRect(x, y, barWidth, barHeight);
            
            // Draw value on top
            ctx.fillStyle = '#333';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('$' + (item.value / 1000).toFixed(1) + 'K', x + barWidth/2, y - 5);
            
            // Draw label at bottom
            ctx.save();
            ctx.translate(x + barWidth/2, startY + chartHeight + 15);
            ctx.textAlign = 'center';
            ctx.fillText(item.name, 0, 0);
            ctx.restore();
        });
        
        // Draw axes
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX, startY + chartHeight);
        ctx.lineTo(startX + chartWidth, startY + chartHeight);
        ctx.stroke();
    }

    function initializeMetricWidgets() {
        const widgets = document.querySelectorAll('.metric-widget');
        widgets.forEach(widget => {
            widget.addEventListener('click', function() {
                const metric = this.dataset.metric;
                toggleWidgetExpansion(this, metric);
            });
        });
    }

    function toggleWidgetExpansion(widget, metric) {
        const isExpanded = widget.classList.contains('expanded');
        
        // Collapse all widgets first
        document.querySelectorAll('.metric-widget').forEach(w => {
            w.classList.remove('expanded');
        });
        
        if (!isExpanded) {
            widget.classList.add('expanded');
            showMetricDetails(widget, metric);
        }
    }

    function showMetricDetails(widget, metric) {
        let detailsHTML = '';
        
        switch(metric) {
            case 'labor-cost':
                detailsHTML = `
                    <div class="widget-details">
                        <div class="detail-row">
                            <span>Regular Labor Cost:</span>
                            <span>$8,200.00</span>
                        </div>
                        <div class="detail-row">
                            <span>Overtime Labor Cost:</span>
                            <span>$3,250.00</span>
                        </div>
                        <div class="detail-row">
                            <span>Double Time Labor Cost:</span>
                            <span>$1,000.00</span>
                        </div>
                        <div class="detail-row total">
                            <span>Total Labor Cost:</span>
                            <span>$12,450.00</span>
                        </div>
                    </div>
                `;
                break;
            case 'labor-percentage':
                detailsHTML = `
                    <div class="widget-details">
                        <div class="detail-row">
                            <span>Net Sales:</span>
                            <span>$43,680.00</span>
                        </div>
                        <div class="detail-row">
                            <span>Total Labor Cost:</span>
                            <span>$12,450.00</span>
                        </div>
                        <div class="detail-row">
                            <span>Labor Percentage:</span>
                            <span>28.5%</span>
                        </div>
                        <div class="detail-row target">
                            <span>Target Percentage:</span>
                            <span>25.0%</span>
                        </div>
                        <div class="detail-row variance">
                            <span>Variance:</span>
                            <span class="over-target">+3.5%</span>
                        </div>
                    </div>
                `;
                break;
            case 'net-sales':
                detailsHTML = `
                    <div class="widget-details">
                        <div class="detail-row">
                            <span>Current Period:</span>
                            <span>$43,680.00</span>
                        </div>
                        <div class="detail-row">
                            <span>Previous Period:</span>
                            <span>$38,920.00</span>
                        </div>
                        <div class="detail-row">
                            <span>Growth:</span>
                            <span class="positive">+$4,760.00</span>
                        </div>
                        <div class="detail-row">
                            <span>Growth Rate:</span>
                            <span class="positive">+12.3%</span>
                        </div>
                    </div>
                `;
                break;
        }
        
        // Remove existing details
        const existingDetails = widget.querySelector('.widget-details');
        if (existingDetails) {
            existingDetails.remove();
        }
        
        // Add new details
        widget.insertAdjacentHTML('beforeend', detailsHTML);
    }

    // Schedule Modal Functions
    function createScheduleModalContent() {
        return `
            <div class="modal-header">
                <h2><i class="fas fa-clock"></i> Schedule Report Export</h2>
                <button class="modal-close" onclick="closeScheduleModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="modal-body">
                <form class="schedule-form" id="scheduleForm">
                    <div class="form-section">
                        <h3>Export Settings</h3>
                        <div class="form-group">
                            <label for="exportFormat">Export Format</label>
                            <select id="exportFormat" name="exportFormat" required>
                                <option value="csv">CSV</option>
                                <option value="excel">Excel (.xlsx)</option>
                                <option value="pdf">PDF</option>
                                <option value="json">JSON</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="includeCharts">Include Charts</label>
                            <div class="checkbox-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="includeCharts" name="includeCharts" checked>
                                    <span class="checkmark"></span>
                                    Include visual charts in export
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h3>Schedule Frequency</h3>
                        <div class="form-group">
                            <label for="frequency">Frequency</label>
                            <select id="frequency" name="frequency" required onchange="updateFrequencyOptions()">
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly" selected>Monthly</option>
                                <option value="quarterly">Quarterly</option>
                                <option value="custom">Custom (Cron Expression)</option>
                            </select>
                        </div>
                        
                        <div class="frequency-options" id="frequencyOptions">
                            <div class="form-group">
                                <label for="monthlyDay">Day of Month</label>
                                <select id="monthlyDay" name="monthlyDay">
                                    <option value="1" selected>1st</option>
                                    <option value="15">15th</option>
                                    <option value="last">Last day</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="scheduleTime">Time</label>
                            <input type="time" id="scheduleTime" name="scheduleTime" value="09:00" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="timezone">Timezone</label>
                            <select id="timezone" name="timezone">
                                <option value="America/Los_Angeles" selected>Pacific Time (PT)</option>
                                <option value="America/Denver">Mountain Time (MT)</option>
                                <option value="America/Chicago">Central Time (CT)</option>
                                <option value="America/New_York">Eastern Time (ET)</option>
                                <option value="UTC">UTC</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h3>Delivery Options</h3>
                        <div class="form-group">
                            <label for="deliveryMethod">Delivery Method</label>
                            <select id="deliveryMethod" name="deliveryMethod" required onchange="updateDeliveryOptions()">
                                <option value="email" selected>Email</option>
                                <option value="sftp">SFTP</option>
                                <option value="s3">Amazon S3</option>
                                <option value="webhook">Webhook</option>
                            </select>
                        </div>
                        
                        <div class="delivery-options" id="deliveryOptions">
                            <div class="form-group">
                                <label for="emailRecipients">Email Recipients</label>
                                <textarea id="emailRecipients" name="emailRecipients" placeholder="Enter email addresses separated by commas" rows="3">john.doe@company.com, jane.smith@company.com</textarea>
                            </div>
                            
                            <div class="form-group">
                                <label for="emailSubject">Email Subject</label>
                                <input type="text" id="emailSubject" name="emailSubject" value="Scheduled Report: Order Report" placeholder="Email subject line">
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h3>Schedule Details</h3>
                        <div class="form-group">
                            <label for="scheduleName">Schedule Name</label>
                            <input type="text" id="scheduleName" name="scheduleName" value="Monthly Order Report Export" placeholder="Give this schedule a name" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="startDate">Start Date</label>
                            <input type="date" id="startDate" name="startDate" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="endDate">End Date (Optional)</label>
                            <input type="date" id="endDate" name="endDate">
                        </div>
                        
                        <div class="form-group">
                            <div class="checkbox-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="isActive" name="isActive" checked>
                                    <span class="checkmark"></span>
                                    Active (schedule will run automatically)
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
                
                <div class="schedule-preview" id="schedulePreview">
                    <h4><i class="fas fa-calendar-alt"></i> Schedule Preview</h4>
                    <div class="preview-content">
                        <p><strong>Next Run:</strong> <span id="nextRunTime">January 1, 2025 at 9:00 AM PT</span></p>
                        <p><strong>Frequency:</strong> <span id="previewFrequency">Monthly on the 1st</span></p>
                        <p><strong>Format:</strong> <span id="previewFormat">CSV</span></p>
                        <p><strong>Recipients:</strong> <span id="previewRecipients">2 email addresses</span></p>
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="closeScheduleModal()">
                    Cancel
                </button>
                <button type="button" class="btn btn-primary" onclick="saveSchedule()">
                    <i class="fas fa-save"></i>
                    Create Schedule
                </button>
            </div>
        `;
    }
    
    function initializeScheduleButton() {
        const scheduleBtn = document.querySelector('.schedule-btn');
        if (scheduleBtn) {
            scheduleBtn.addEventListener('click', function() {
                openScheduleModal();
            });
        }
    }
    
    function openScheduleModal() {
        const modal = document.getElementById('scheduleModal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Set default start date to tomorrow
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            document.getElementById('startDate').value = tomorrow.toISOString().split('T')[0];
            
            updateSchedulePreview();
        }
    }
    
    window.closeScheduleModal = function() {
        const modal = document.getElementById('scheduleModal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }
    
    window.updateFrequencyOptions = function() {
        const frequency = document.getElementById('frequency').value;
        const optionsContainer = document.getElementById('frequencyOptions');
        
        let optionsHTML = '';
        
        switch(frequency) {
            case 'daily':
                optionsHTML = '<p class="frequency-note">Report will be exported every day at the specified time.</p>';
                break;
            case 'weekly':
                optionsHTML = `
                    <div class="form-group">
                        <label for="weeklyDay">Day of Week</label>
                        <select id="weeklyDay" name="weeklyDay">
                            <option value="1" selected>Monday</option>
                            <option value="2">Tuesday</option>
                            <option value="3">Wednesday</option>
                            <option value="4">Thursday</option>
                            <option value="5">Friday</option>
                            <option value="6">Saturday</option>
                            <option value="0">Sunday</option>
                        </select>
                    </div>
                `;
                break;
            case 'monthly':
                optionsHTML = `
                    <div class="form-group">
                        <label for="monthlyDay">Day of Month</label>
                        <select id="monthlyDay" name="monthlyDay">
                            <option value="1" selected>1st</option>
                            <option value="15">15th</option>
                            <option value="last">Last day</option>
                        </select>
                    </div>
                `;
                break;
            case 'quarterly':
                optionsHTML = `
                    <div class="form-group">
                        <label for="quarterlyMonth">Month of Quarter</label>
                        <select id="quarterlyMonth" name="quarterlyMonth">
                            <option value="first" selected>First month</option>
                            <option value="second">Second month</option>
                            <option value="third">Third month</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="quarterlyDay">Day of Month</label>
                        <select id="quarterlyDay" name="quarterlyDay">
                            <option value="1" selected>1st</option>
                            <option value="15">15th</option>
                            <option value="last">Last day</option>
                        </select>
                    </div>
                `;
                break;
            case 'custom':
                optionsHTML = `
                    <div class="form-group">
                        <label for="cronExpression">Cron Expression</label>
                        <input type="text" id="cronExpression" name="cronExpression" placeholder="0 9 1 * *" title="Format: minute hour day month weekday">
                        <small class="form-help">Format: minute hour day month weekday (e.g., "0 9 1 * *" for 9 AM on the 1st of every month)</small>
                    </div>
                `;
                break;
        }
        
        optionsContainer.innerHTML = optionsHTML;
        updateSchedulePreview();
    }
    
    window.updateDeliveryOptions = function() {
        const method = document.getElementById('deliveryMethod').value;
        const optionsContainer = document.getElementById('deliveryOptions');
        
        let optionsHTML = '';
        
        switch(method) {
            case 'email':
                optionsHTML = `
                    <div class="form-group">
                        <label for="emailRecipients">Email Recipients</label>
                        <textarea id="emailRecipients" name="emailRecipients" placeholder="Enter email addresses separated by commas" rows="3">john.doe@company.com, jane.smith@company.com</textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="emailSubject">Email Subject</label>
                        <input type="text" id="emailSubject" name="emailSubject" value="Scheduled Report: Order Report" placeholder="Email subject line">
                    </div>
                `;
                break;
            case 'sftp':
                optionsHTML = `
                    <div class="form-group">
                        <label for="sftpHost">SFTP Host</label>
                        <input type="text" id="sftpHost" name="sftpHost" placeholder="ftp.company.com" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="sftpPath">Remote Path</label>
                        <input type="text" id="sftpPath" name="sftpPath" placeholder="/reports/" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="sftpUsername">Username</label>
                        <input type="text" id="sftpUsername" name="sftpUsername" placeholder="username" required>
                    </div>
                `;
                break;
            case 's3':
                optionsHTML = `
                    <div class="form-group">
                        <label for="s3Bucket">S3 Bucket</label>
                        <input type="text" id="s3Bucket" name="s3Bucket" placeholder="my-reports-bucket" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="s3Path">S3 Path</label>
                        <input type="text" id="s3Path" name="s3Path" placeholder="reports/orders/" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="s3Region">AWS Region</label>
                        <select id="s3Region" name="s3Region" required>
                            <option value="us-east-1">US East (N. Virginia)</option>
                            <option value="us-west-2" selected>US West (Oregon)</option>
                            <option value="eu-west-1">Europe (Ireland)</option>
                            <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
                        </select>
                    </div>
                `;
                break;
            case 'webhook':
                optionsHTML = `
                    <div class="form-group">
                        <label for="webhookUrl">Webhook URL</label>
                        <input type="url" id="webhookUrl" name="webhookUrl" placeholder="https://api.company.com/reports" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="webhookMethod">HTTP Method</label>
                        <select id="webhookMethod" name="webhookMethod">
                            <option value="POST" selected>POST</option>
                            <option value="PUT">PUT</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="webhookHeaders">Custom Headers (JSON)</label>
                        <textarea id="webhookHeaders" name="webhookHeaders" placeholder='{"Authorization": "Bearer token", "Content-Type": "application/json"}' rows="3"></textarea>
                    </div>
                `;
                break;
        }
        
        optionsContainer.innerHTML = optionsHTML;
        updateSchedulePreview();
    }
    
    function updateSchedulePreview() {
        // Update preview based on current form values
        const frequency = document.getElementById('frequency')?.value || 'monthly';
        const format = document.getElementById('exportFormat')?.value || 'csv';
        const time = document.getElementById('scheduleTime')?.value || '09:00';
        const timezone = document.getElementById('timezone')?.value || 'America/Los_Angeles';
        
        // Update preview elements if they exist
        const previewFrequency = document.getElementById('previewFrequency');
        const previewFormat = document.getElementById('previewFormat');
        const nextRunTime = document.getElementById('nextRunTime');
        const previewRecipients = document.getElementById('previewRecipients');
        
        if (previewFrequency) {
            let frequencyText = frequency;
            if (frequency === 'monthly') {
                const day = document.getElementById('monthlyDay')?.value || '1';
                frequencyText = `Monthly on the ${day === 'last' ? 'last day' : day === '1' ? '1st' : day + 'th'}`;
            } else if (frequency === 'weekly') {
                const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                const day = document.getElementById('weeklyDay')?.value || '1';
                frequencyText = `Weekly on ${dayNames[day]}`;
            }
            previewFrequency.textContent = frequencyText;
        }
        
        if (previewFormat) {
            previewFormat.textContent = format.toUpperCase();
        }
        
        if (nextRunTime) {
            // Calculate next run time (simplified)
            const now = new Date();
            const nextRun = new Date(now);
            nextRun.setDate(now.getDate() + 1);
            const [hours, minutes] = time.split(':');
            nextRun.setHours(parseInt(hours), parseInt(minutes), 0, 0);
            
            const timeZoneNames = {
                'America/Los_Angeles': 'PT',
                'America/Denver': 'MT', 
                'America/Chicago': 'CT',
                'America/New_York': 'ET',
                'UTC': 'UTC'
            };
            
            nextRunTime.textContent = `${nextRun.toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
            })} at ${nextRun.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit' 
            })} ${timeZoneNames[timezone] || 'PT'}`;
        }
        
        if (previewRecipients) {
            const recipients = document.getElementById('emailRecipients')?.value || '';
            const count = recipients.split(',').filter(email => email.trim()).length;
            previewRecipients.textContent = `${count} email address${count !== 1 ? 'es' : ''}`;
        }
    }
    
    window.saveSchedule = function() {
        const form = document.getElementById('scheduleForm');
        const formData = new FormData(form);
        
        // Validate form
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        // Collect form data
        const scheduleData = {
            name: formData.get('scheduleName'),
            frequency: formData.get('frequency'),
            time: formData.get('scheduleTime'),
            timezone: formData.get('timezone'),
            format: formData.get('exportFormat'),
            includeCharts: formData.get('includeCharts') === 'on',
            deliveryMethod: formData.get('deliveryMethod'),
            startDate: formData.get('startDate'),
            endDate: formData.get('endDate'),
            isActive: formData.get('isActive') === 'on'
        };
        
        // Add delivery-specific options
        if (scheduleData.deliveryMethod === 'email') {
            scheduleData.emailRecipients = formData.get('emailRecipients');
            scheduleData.emailSubject = formData.get('emailSubject');
        }
        
        // Simulate saving
        console.log('Saving schedule:', scheduleData);
        
        // Show success message
        alert(`Schedule "${scheduleData.name}" has been created successfully!\n\nNext export: ${document.getElementById('nextRunTime').textContent}`);
        
        // Close modal
        closeScheduleModal();
    }

    // Settings Functions
    function showSettingsView(settingType) {
        if (settingType === 'accounting') {
            showAccountingSettingsView();
        }
    }

    function showAccountingSettingsView() {
        // Hide the main custom reports view
        v1Content.style.display = 'none';
        v2Content.classList.add('hidden');
        
        // Create and show the accounting settings view
        const accountingSettingsView = createAccountingSettingsView();
        const mainContent = document.querySelector('.main-content');
        mainContent.appendChild(accountingSettingsView);
    }

    function createAccountingSettingsView() {
        const accountingSettingsHTML = `
            <div class="content-version" id="accountingSettingsContent">
                <header class="content-header">
                    <div class="header-left">
                        <div class="breadcrumb">
                            <a href="#" class="back-link" onclick="returnToCustomReports()">
                                <i class="fas fa-arrow-left"></i>
                            </a>
                            <h1>Accounting Settings</h1>
                        </div>
                        <p>Configure how revenue is recognized and reported in your financial reports</p>
                    </div>
                    <div class="header-right">
                        <button class="btn btn-primary" onclick="saveAccountingSettings()">
                            <i class="fas fa-save"></i>
                            Save Settings
                        </button>
                    </div>
                </header>

                <div class="content-body">
                    <div class="settings-container">
                        <!-- Revenue Recognition Section -->
                        <div class="settings-section">
                            <div class="section-header">
                                <div class="section-icon">
                                    <i class="fas fa-chart-line"></i>
                                </div>
                                <div class="section-info">
                                    <h2>Revenue Recognition</h2>
                                    <p>Choose when revenue should be recognized for reporting purposes</p>
                                </div>
                            </div>

                            <div class="settings-content">
                                <div class="revenue-options">
                                    <div class="option-card active" data-option="payment">
                                        <div class="option-header">
                                            <div class="option-radio">
                                                <input type="radio" id="paymentComplete" name="revenueRecognition" value="payment" checked>
                                                <label for="paymentComplete"></label>
                                            </div>
                                            <div class="option-info">
                                                <h3>Payment Complete Date</h3>
                                                <p class="option-subtitle">Cash Basis Accounting</p>
                                            </div>
                                        </div>
                                        <div class="option-description">
                                            <p>Revenue is recognized when payment is successfully processed and completed. This follows cash basis accounting principles.</p>
                                            <div class="option-details">
                                                <div class="detail-item">
                                                    <i class="fas fa-check-circle"></i>
                                                    <span>Simple and straightforward</span>
                                                </div>
                                                <div class="detail-item">
                                                    <i class="fas fa-check-circle"></i>
                                                    <span>Matches actual cash flow</span>
                                                </div>
                                                <div class="detail-item">
                                                    <i class="fas fa-check-circle"></i>
                                                    <span>Good for service businesses</span>
                                                </div>
                                            </div>
                                            <div class="example-box">
                                                <h4><i class="fas fa-lightbulb"></i> Example</h4>
                                                <p>A customer orders a meal on January 15th and pays immediately. Revenue is recognized on January 15th when the payment completes.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="option-card" data-option="fulfillment">
                                        <div class="option-header">
                                            <div class="option-radio">
                                                <input type="radio" id="fulfillmentDate" name="revenueRecognition" value="fulfillment">
                                                <label for="fulfillmentDate"></label>
                                            </div>
                                            <div class="option-info">
                                                <h3>Service Date / Fulfillment Date</h3>
                                                <p class="option-subtitle">Accrual Basis Accounting</p>
                                            </div>
                                        </div>
                                        <div class="option-description">
                                            <p>Revenue is recognized when the service is delivered or goods are fulfilled, regardless of when payment is received. This follows accrual accounting principles.</p>
                                            <div class="option-details">
                                                <div class="detail-item">
                                                    <i class="fas fa-check-circle"></i>
                                                    <span>Matches revenue to service delivery</span>
                                                </div>
                                                <div class="detail-item">
                                                    <i class="fas fa-check-circle"></i>
                                                    <span>Better for subscription businesses</span>
                                                </div>
                                                <div class="detail-item">
                                                    <i class="fas fa-check-circle"></i>
                                                    <span>GAAP compliant for larger businesses</span>
                                                </div>
                                            </div>
                                            <div class="example-box">
                                                <h4><i class="fas fa-lightbulb"></i> Example</h4>
                                                <p>A customer pre-orders a catering service for January 30th and pays on January 15th. Revenue is recognized on January 30th when the service is delivered.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Impact Summary -->
                                <div class="impact-summary">
                                    <h3><i class="fas fa-info-circle"></i> Impact on Reports</h3>
                                    <div class="impact-grid">
                                        <div class="impact-item">
                                            <h4>Sales Reports</h4>
                                            <p>Revenue will be grouped and filtered based on your selected recognition method</p>
                                        </div>
                                        <div class="impact-item">
                                            <h4>Financial Reports</h4>
                                            <p>All financial metrics will reflect revenue timing according to your choice</p>
                                        </div>
                                        <div class="impact-item">
                                            <h4>Tax Reporting</h4>
                                            <p>Ensure this setting aligns with your tax reporting requirements</p>
                                        </div>
                                        <div class="impact-item">
                                            <h4>Historical Data</h4>
                                            <p>Changing this setting will affect how historical data is displayed going forward</p>
                                        </div>
                                    </div>
                                </div>
                                <!-- Additional Settings -->
                                <div class="additional-settings">
                                    <h3>Additional Options</h3>
                                    <div class="setting-row">
                                        <div class="setting-info">
                                            <h4>Apply to Historical Data</h4>
                                            <p>Retroactively apply this setting to all historical transactions</p>
                                        </div>
                                        <div class="setting-control">
                                            <label class="toggle-switch">
                                                <input type="checkbox" id="applyHistorical" checked>
                                                <span class="toggle-slider"></span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div class="setting-row">
                                        <div class="setting-info">
                                            <h4>Show Revenue Recognition Method in Reports</h4>
                                            <p>Display which recognition method was used in report headers</p>
                                        </div>
                                        <div class="setting-control">
                                            <label class="toggle-switch">
                                                <input type="checkbox" id="showMethod" checked>
                                                <span class="toggle-slider"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        const accountingSettingsDiv = document.createElement('div');
        accountingSettingsDiv.innerHTML = accountingSettingsHTML;
        
        // Initialize the settings functionality
        setTimeout(() => {
            initializeAccountingSettings();
        }, 100);
        
        return accountingSettingsDiv.firstElementChild;
    }
    function initializeAccountingSettings() {
        // Handle option card selection
        const optionCards = document.querySelectorAll('.option-card');
        const radioInputs = document.querySelectorAll('input[name="revenueRecognition"]');
        
        optionCards.forEach(card => {
            card.addEventListener('click', function() {
                const option = this.dataset.option;
                const radioInput = this.querySelector('input[type="radio"]');
                
                // Remove active class from all cards
                optionCards.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked card
                this.classList.add('active');
                
                // Check the radio button
                radioInput.checked = true;
                
                // Update any dependent UI elements
                updateRevenueRecognitionPreview(option);
            });
        });
        
        // Handle radio button changes
        radioInputs.forEach(radio => {
            radio.addEventListener('change', function() {
                const option = this.value;
                const card = this.closest('.option-card');
                
                // Remove active class from all cards
                optionCards.forEach(c => c.classList.remove('active'));
                
                // Add active class to selected card
                card.classList.add('active');
                
                updateRevenueRecognitionPreview(option);
            });
        });
    }
    
    function updateRevenueRecognitionPreview(option) {
        // This function could update preview elements or show additional information
        console.log('Revenue recognition method changed to:', option);
    }
    
    window.saveAccountingSettings = function() {
        const selectedMethod = document.querySelector('input[name="revenueRecognition"]:checked').value;
        const applyHistorical = document.getElementById('applyHistorical').checked;
        const showMethod = document.getElementById('showMethod').checked;
        
        const settings = {
            revenueRecognition: selectedMethod,
            applyToHistorical: applyHistorical,
            showMethodInReports: showMethod
        };
        
        console.log('Saving accounting settings:', settings);
        
        // Simulate saving
        const methodName = selectedMethod === 'payment' ? 'Payment Complete Date' : 'Service Date / Fulfillment Date';
        alert(`Accounting settings saved successfully!\n\nRevenue Recognition Method: ${methodName}\nApply to Historical Data: ${applyHistorical ? 'Yes' : 'No'}\nShow Method in Reports: ${showMethod ? 'Yes' : 'No'}`);
    }
    // Global function to return to custom reports
    window.returnToCustomReports = function() {
        // Remove all individual report views
        const reportViews = [
            'itemSalesContent',
            'orderReportContent', 
            'paymentsReportContent',
            'employeeReportContent',
            'accountingSettingsContent'
        ];
        
        reportViews.forEach(viewId => {
            const element = document.getElementById(viewId);
            if (element) {
                element.remove();
            }
        });
        
        // Show the appropriate main content based on current version
        if (currentVersion === 'v1') {
            v1Content.style.display = 'block';
            v2Content.classList.add('hidden');
        } else if (currentVersion === 'v2') {
            v2Content.classList.remove('hidden');
            v1Content.style.display = 'none';
        }
    }

    // Table interactions for V2
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const icon = this.querySelector('i');
            const reportRow = this.closest('tr');
            const reportName = reportRow.querySelector('.report-name').textContent.trim();
            
            if (icon.classList.contains('fa-eye')) {
                alert(`Viewing report: ${reportName}`);
            } else if (icon.classList.contains('fa-edit')) {
                alert(`Editing report: ${reportName}`);
            } else if (icon.classList.contains('fa-copy')) {
                alert(`Copying template: ${reportName}`);
            } else if (icon.classList.contains('fa-ellipsis-h')) {
                alert(`More options for: ${reportName}`);
            }
        });
    });

    // Create Report button functionality for V2
    const createReportBtn = document.querySelector('.header-right .btn-primary');
    if (createReportBtn) {
        createReportBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Navigate to the AI Report Builder
            window.location.href = 'ai-report-builder.html';
        });
    }

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const tableRows = document.querySelectorAll('.reports-table tbody tr');
            
            tableRows.forEach(row => {
                const reportName = row.querySelector('.report-name').textContent.toLowerCase();
                const reportDescription = row.querySelector('.report-description').textContent.toLowerCase();
                
                if (reportName.includes(searchTerm) || reportDescription.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    // Filter functionality
    const filterSelect = document.querySelector('.filter-dropdown select');
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            const filterValue = this.value.toLowerCase();
            const tableRows = document.querySelectorAll('.reports-table tbody tr');
            
            tableRows.forEach(row => {
                if (filterValue === 'all status') {
                    row.style.display = '';
                } else {
                    const typeBadge = row.querySelector('.type-badge');
                    const statusBadge = row.querySelector('.status-badge');
                    
                    const type = typeBadge ? typeBadge.textContent.toLowerCase() : '';
                    const status = statusBadge ? statusBadge.textContent.toLowerCase() : '';
                    
                    if (type === filterValue || status === filterValue) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                }
            });
        });
    }

    // Add some interactive effects
    const reportRows = document.querySelectorAll('.reports-table tbody tr');
    reportRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            if (!this.classList.contains('migrated-report')) {
                this.style.transform = 'translateX(2px)';
            }
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    document.querySelector('[data-version="v1"]').click();
                    break;
                case '2':
                    e.preventDefault();
                    document.querySelector('[data-version="v2"]').click();
                    break;
                case 't':
                    e.preventDefault();
                    document.querySelector('[data-version="transition"]').click();
                    break;
            }
        }
    });
});
