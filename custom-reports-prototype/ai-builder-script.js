// AI Report Builder JavaScript

// Global state
let currentStep = 'template';
let selectedTemplate = null;
let reportData = {
    title: '',
    template: null,
    dataSources: [],
    widgets: [],
    filters: [],
    joins: []
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeDragAndDrop();
    setupEventListeners();
    showStep('template');
});

// Step Navigation
function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.step-container').forEach(container => {
        container.classList.remove('active');
    });
    
    // Show current step
    const stepContainer = document.getElementById(step + 'Step');
    if (stepContainer) {
        stepContainer.classList.add('active');
        currentStep = step;
    }
}

function skipToBuilder() {
    selectedTemplate = 'custom';
    showStep('builder');
}

// Template Selection
function selectTemplate(templateId) {
    selectedTemplate = templateId;
    reportData.template = templateId;
    
    // Show loading
    showLoading('Loading template...');
    
    // Simulate loading time
    setTimeout(() => {
        hideLoading();
        
        // Pre-populate based on template
        if (templateId !== 'custom') {
            prePopulateTemplate(templateId);
        }
        
        showStep('builder');
    }, 1500);
}

function prePopulateTemplate(templateId) {
    const titleInput = document.querySelector('.title-input');
    
    switch (templateId) {
        case 'sales-forecast':
            titleInput.value = 'Sales Forecasting Dashboard';
            addPrebuiltWidget('sales-forecast', 'Sales Forecast Chart');
            addPrebuiltWidget('metric', 'Total Revenue');
            addPrebuiltWidget('chart', 'Monthly Trends');
            break;
            
        case 'customer-insights':
            titleInput.value = 'Customer Behavior Analytics';
            addPrebuiltWidget('pie', 'Customer Segments');
            addPrebuiltWidget('table', 'Customer List');
            addPrebuiltWidget('metric', 'Customer Lifetime Value');
            break;
            
        case 'inventory-optimization':
            titleInput.value = 'Inventory Optimization Report';
            addPrebuiltWidget('demand-forecast', 'Demand Forecast');
            addPrebuiltWidget('gauge', 'Stock Levels');
            addPrebuiltWidget('bar', 'Reorder Analysis');
            break;
            
        case 'sales-performance':
            titleInput.value = 'Sales Performance Report';
            addPrebuiltWidget('metric', 'Total Sales');
            addPrebuiltWidget('chart', 'Sales Trend');
            addPrebuiltWidget('bar', 'Sales by Category');
            break;
            
        case 'financial-overview':
            titleInput.value = 'Financial Overview Dashboard';
            addPrebuiltWidget('metric', 'Revenue');
            addPrebuiltWidget('metric', 'Expenses');
            addPrebuiltWidget('chart', 'Profit & Loss');
            break;
            
        case 'labor-analytics':
            titleInput.value = 'Labor Analytics Report';
            addPrebuiltWidget('labor-forecast', 'Labor Forecast');
            addPrebuiltWidget('metric', 'Labor Cost');
            addPrebuiltWidget('bar', 'Productivity Metrics');
            break;
    }
}

function addPrebuiltWidget(type, title) {
    const canvas = document.getElementById('reportCanvas');
    const dropZone = canvas.querySelector('.drop-zone');
    
    // Remove drop zone message if it exists
    if (dropZone) {
        dropZone.style.display = 'none';
    }
    
    // Create widget element
    const widget = createWidgetElement(type, title);
    canvas.appendChild(widget);
}

// Tab Management
function showTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.sidebar-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[onclick="showTab('${tabName}')"]`).classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName + 'Tab').classList.add('active');
    
    // Update field list if data tab is selected
    if (tabName === 'data') {
        updateFieldList();
    }
}

function showPropertiesTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.panel-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[onclick="showPropertiesTab('${tabName}')"]`).classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.properties-panel .tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName + 'Tab').classList.add('active');
}

function updateFieldList() {
    const fieldList = document.getElementById('fieldList');
    const selectedSources = reportData.dataSources;
    
    if (selectedSources.length === 0) {
        fieldList.innerHTML = '<p style="color: #64748b; font-size: 0.875rem;">Select data sources to see available fields</p>';
        return;
    }
    
    // Mock field data
    const fields = {
        orders: ['Order ID', 'Customer ID', 'Order Date', 'Total Amount', 'Status', 'Items Count'],
        items: ['Item ID', 'Name', 'Category', 'Price', 'Stock Quantity', 'Supplier'],
        customers: ['Customer ID', 'Name', 'Email', 'Registration Date', 'Total Orders'],
        payments: ['Payment ID', 'Order ID', 'Amount', 'Method', 'Status', 'Date'],
        employees: ['Employee ID', 'Name', 'Department', 'Salary', 'Hire Date', 'Performance Score']
    };
    
    let fieldHTML = '';
    selectedSources.forEach(source => {
        if (fields[source]) {
            fields[source].forEach(field => {
                fieldHTML += `<div class="field-item" draggable="true" data-field="${source}.${field}">${field}</div>`;
            });
        }
    });
    
    fieldList.innerHTML = fieldHTML;
}

// Drag and Drop
function initializeDragAndDrop() {
    const canvas = document.getElementById('reportCanvas');
    
    // Canvas drop events
    canvas.addEventListener('dragover', handleDragOver);
    canvas.addEventListener('drop', handleDrop);
    canvas.addEventListener('dragleave', handleDragLeave);
    
    // Make existing draggable items work
    setupDraggableItems();
}

function setupDraggableItems() {
    // Data sources
    document.querySelectorAll('.data-source').forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
    });
    
    // Widgets
    document.querySelectorAll('.widget-item').forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
    });
    
    // Filters
    document.querySelectorAll('.filter-item').forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
    });
}

function handleDragStart(e) {
    const type = e.target.dataset.source || e.target.dataset.widget || e.target.dataset.filter;
    const category = e.target.dataset.source ? 'source' : 
                    e.target.dataset.widget ? 'widget' : 'filter';
    
    e.dataTransfer.setData('text/plain', JSON.stringify({
        type: type,
        category: category,
        text: e.target.textContent.trim()
    }));
}

function handleDragOver(e) {
    e.preventDefault();
    const dropZone = e.currentTarget.querySelector('.drop-zone');
    if (dropZone) {
        dropZone.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    const dropZone = e.currentTarget.querySelector('.drop-zone');
    if (dropZone && !e.currentTarget.contains(e.relatedTarget)) {
        dropZone.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    const dropZone = e.currentTarget.querySelector('.drop-zone');
    if (dropZone) {
        dropZone.classList.remove('drag-over');
    }
    
    try {
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        addComponentToCanvas(data);
    } catch (error) {
        console.error('Error parsing drop data:', error);
    }
}

function addComponentToCanvas(data) {
    const canvas = document.getElementById('reportCanvas');
    const dropZone = canvas.querySelector('.drop-zone');
    
    // Hide drop zone if it exists
    if (dropZone) {
        dropZone.style.display = 'none';
    }
    
    let element;
    
    switch (data.category) {
        case 'source':
            element = createDataSourceElement(data);
            reportData.dataSources.push(data.type);
            updateFieldList();
            break;
        case 'widget':
            element = createWidgetElement(data.type, data.text);
            reportData.widgets.push(data);
            break;
        case 'filter':
            element = createFilterElement(data);
            reportData.filters.push(data);
            break;
    }
    
    if (element) {
        canvas.appendChild(element);
        
        // Trigger AI suggestions based on what was added
        triggerAISuggestions(data);
    }
}

function createDataSourceElement(data) {
    const element = document.createElement('div');
    element.className = 'canvas-component data-source-component';
    element.innerHTML = `
        <div class="component-header">
            <i class="fas fa-database"></i>
            <span>${data.text}</span>
            <button class="remove-btn" onclick="removeComponent(this)">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="component-content">
            <p>Data source connected successfully</p>
        </div>
    `;
    return element;
}

function createWidgetElement(type, title) {
    const element = document.createElement('div');
    element.className = 'canvas-component widget-component';
    element.dataset.widgetType = type;
    
    const icons = {
        'metric': 'fa-tachometer-alt',
        'chart': 'fa-chart-line',
        'bar': 'fa-chart-bar',
        'pie': 'fa-chart-pie',
        'table': 'fa-table',
        'gauge': 'fa-gauge-high',
        'sales-forecast': 'fa-crystal-ball',
        'demand-forecast': 'fa-chart-area',
        'customer-forecast': 'fa-user-clock',
        'labor-forecast': 'fa-users-gear'
    };
    
    const icon = icons[type] || 'fa-chart-bar';
    const isforecast = type.includes('forecast');
    
    element.innerHTML = `
        <div class="component-header ${isforecast ? 'forecast' : ''}">
            <i class="fas ${icon}"></i>
            <span>${title}</span>
            <button class="remove-btn" onclick="removeComponent(this)">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="component-content">
            ${createWidgetPreview(type)}
        </div>
    `;
    
    // Make widget clickable for properties
    element.addEventListener('click', () => selectComponent(element));
    
    return element;
}

function createWidgetPreview(type) {
    switch (type) {
        case 'metric':
            return `
                <div class="metric-preview">
                    <div class="metric-value">$125,430</div>
                    <div class="metric-change">+12.5% vs last month</div>
                </div>
            `;
        case 'sales-forecast':
            return `
                <div class="forecast-preview">
                    <div class="forecast-chart">📈</div>
                    <div class="forecast-info">
                        <div>Next Month Prediction: $142,000</div>
                        <div class="confidence">Confidence: 92%</div>
                    </div>
                </div>
            `;
        case 'table':
            return `
                <div class="table-preview">
                    <div class="table-row header">
                        <span>Name</span><span>Value</span><span>Change</span>
                    </div>
                    <div class="table-row">
                        <span>Item A</span><span>$1,234</span><span>+5%</span>
                    </div>
                    <div class="table-row">
                        <span>Item B</span><span>$987</span><span>-2%</span>
                    </div>
                </div>
            `;
        default:
            return `
                <div class="chart-preview">
                    <div class="chart-placeholder">
                        <i class="fas fa-chart-${type === 'bar' ? 'bar' : type === 'pie' ? 'pie' : 'line'}"></i>
                        <p>Chart will render here</p>
                    </div>
                </div>
            `;
    }
}

function createFilterElement(data) {
    const element = document.createElement('div');
    element.className = 'canvas-component filter-component';
    element.innerHTML = `
        <div class="component-header">
            <i class="fas fa-filter"></i>
            <span>${data.text} Filter</span>
            <button class="remove-btn" onclick="removeComponent(this)">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="component-content">
            <div class="filter-controls">
                <select class="filter-select">
                    <option>Select ${data.text.toLowerCase()}...</option>
                </select>
            </div>
        </div>
    `;
    return element;
}

function removeComponent(button) {
    const component = button.closest('.canvas-component');
    component.remove();
    
    // Check if canvas is empty
    const canvas = document.getElementById('reportCanvas');
    const components = canvas.querySelectorAll('.canvas-component');
    if (components.length === 0) {
        const dropZone = canvas.querySelector('.drop-zone');
        if (dropZone) {
            dropZone.style.display = 'flex';
        }
    }
}

function selectComponent(component) {
    // Remove previous selection
    document.querySelectorAll('.canvas-component').forEach(c => {
        c.classList.remove('selected');
    });
    
    // Select current component
    component.classList.add('selected');
    
    // Show properties
    showComponentProperties(component);
}

function showComponentProperties(component) {
    const propertiesContent = document.querySelector('#propertiesTab .properties-content');
    const widgetType = component.dataset.widgetType;
    const componentType = component.classList.contains('data-source-component') ? 'data-source' : 
                         component.classList.contains('widget-component') ? 'widget' :
                         component.classList.contains('filter-component') ? 'filter' : null;
    
    if (componentType === 'widget' && widgetType) {
        propertiesContent.innerHTML = `
            <div class="property-section">
                <h4><i class="fas fa-cog"></i> Widget Properties</h4>
                <div class="property-group">
                    <label>Title</label>
                    <input type="text" value="${component.querySelector('span').textContent}" onchange="updateWidgetTitle(this)">
                </div>
                <div class="property-group">
                    <label>Data Object</label>
                    <select onchange="updateWidgetDataSource(this)">
                        <option value="">Select data object...</option>
                        <option value="orders" selected>Orders (50 metrics)</option>
                        <option value="items">Items (32 metrics)</option>
                        <option value="customers">Customers (28 metrics)</option>
                        <option value="payments">Payments (45 metrics)</option>
                        <option value="employees">Employees (22 metrics)</option>
                    </select>
                </div>
                <div class="property-group">
                    <label>Primary Metric</label>
                    <select onchange="updateWidgetMetric(this)">
                        <option value="">Select metric...</option>
                        <option value="total_amount" selected>Total Amount</option>
                        <option value="order_count">Order Count</option>
                        <option value="avg_order_value">Average Order Value</option>
                        <option value="customer_count">Unique Customers</option>
                        <option value="items_sold">Items Sold</option>
                    </select>
                </div>
                <div class="property-group">
                    <label>Aggregation</label>
                    <select onchange="updateWidgetAggregation(this)">
                        <option value="sum" selected>Sum</option>
                        <option value="count">Count</option>
                        <option value="avg">Average</option>
                        <option value="max">Maximum</option>
                        <option value="min">Minimum</option>
                    </select>
                </div>
                <div class="property-group">
                    <label>Time Period</label>
                    <select onchange="updateWidgetTimePeriod(this)">
                        <option value="last_30_days" selected>Last 30 Days</option>
                        <option value="last_7_days">Last 7 Days</option>
                        <option value="last_90_days">Last 90 Days</option>
                        <option value="this_month">This Month</option>
                        <option value="this_year">This Year</option>
                        <option value="custom">Custom Range</option>
                    </select>
                </div>
                ${widgetType.includes('chart') || widgetType === 'bar' || widgetType === 'pie' ? `
                <div class="property-group">
                    <label>Group By</label>
                    <select onchange="updateWidgetGroupBy(this)">
                        <option value="">No grouping</option>
                        <option value="date" selected>Date</option>
                        <option value="category">Category</option>
                        <option value="location">Location</option>
                        <option value="customer_segment">Customer Segment</option>
                    </select>
                </div>
                ` : ''}
                ${widgetType.includes('forecast') ? `
                <div class="property-group">
                    <label>Forecast Period</label>
                    <select onchange="updateForecastPeriod(this)">
                        <option value="30_days" selected>Next 30 Days</option>
                        <option value="60_days">Next 60 Days</option>
                        <option value="90_days">Next 90 Days</option>
                        <option value="6_months">Next 6 Months</option>
                        <option value="1_year">Next Year</option>
                    </select>
                </div>
                <div class="property-group">
                    <label>Confidence Level</label>
                    <select onchange="updateConfidenceLevel(this)">
                        <option value="80">80%</option>
                        <option value="90">90%</option>
                        <option value="95" selected>95%</option>
                        <option value="99">99%</option>
                    </select>
                </div>
                ` : ''}
            </div>
            <div class="property-section">
                <h4><i class="fas fa-paint-brush"></i> Appearance</h4>
                <div class="property-group">
                    <label>Color Theme</label>
                    <select onchange="updateWidgetTheme(this)">
                        <option value="blue" selected>Blue</option>
                        <option value="green">Green</option>
                        <option value="purple">Purple</option>
                        <option value="orange">Orange</option>
                        <option value="red">Red</option>
                    </select>
                </div>
                <div class="property-group">
                    <label>Show Legend</label>
                    <label class="checkbox-label">
                        <input type="checkbox" checked onchange="updateShowLegend(this)">
                        <span class="checkmark"></span>
                        Display legend
                    </label>
                </div>
                <div class="property-group">
                    <label>Animation</label>
                    <label class="checkbox-label">
                        <input type="checkbox" checked onchange="updateAnimation(this)">
                        <span class="checkmark"></span>
                        Enable animations
                    </label>
                </div>
            </div>
        `;
    } else if (componentType === 'data-source') {
        propertiesContent.innerHTML = `
            <div class="property-section">
                <h4><i class="fas fa-database"></i> Data Object Properties</h4>
                <div class="property-group">
                    <label>Object Name</label>
                    <input type="text" value="${component.querySelector('span').textContent}" readonly>
                </div>
                <div class="property-group">
                    <label>Available Metrics</label>
                    <div class="metrics-list">
                        <div class="metric-item">Order ID <span class="metric-type">Identifier</span></div>
                        <div class="metric-item">Customer ID <span class="metric-type">Identifier</span></div>
                        <div class="metric-item">Order Date <span class="metric-type">Date</span></div>
                        <div class="metric-item">Total Amount <span class="metric-type">Currency</span></div>
                        <div class="metric-item">Status <span class="metric-type">Category</span></div>
                        <div class="metric-item">Items Count <span class="metric-type">Number</span></div>
                        <div class="metric-item">Payment Method <span class="metric-type">Category</span></div>
                        <div class="metric-item">Discount Amount <span class="metric-type">Currency</span></div>
                        <div class="metric-item">Tax Amount <span class="metric-type">Currency</span></div>
                        <div class="metric-item">Shipping Cost <span class="metric-type">Currency</span></div>
                    </div>
                </div>
                <div class="property-group">
                    <label>Filters Applied</label>
                    <div class="applied-filters">
                        <div class="filter-tag">Date Range: Last 30 days <button onclick="removeFilter(this)">×</button></div>
                        <div class="filter-tag">Status: Completed <button onclick="removeFilter(this)">×</button></div>
                    </div>
                    <button class="btn btn-sm btn-outline" onclick="addDataFilter()">
                        <i class="fas fa-plus"></i> Add Filter
                    </button>
                </div>
            </div>
        `;
    } else if (componentType === 'filter') {
        propertiesContent.innerHTML = `
            <div class="property-section">
                <h4><i class="fas fa-filter"></i> Filter Properties</h4>
                <div class="property-group">
                    <label>Filter Type</label>
                    <select onchange="updateFilterType(this)">
                        <option value="date">Date Range</option>
                        <option value="category">Category</option>
                        <option value="location">Location</option>
                        <option value="status">Status</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>
                <div class="property-group">
                    <label>Filter Values</label>
                    <div class="filter-values">
                        <input type="text" placeholder="Enter filter values..." onchange="updateFilterValues(this)">
                        <button class="btn btn-sm" onclick="addFilterValue()">Add</button>
                    </div>
                </div>
                <div class="property-group">
                    <label>Default Selection</label>
                    <select onchange="updateDefaultSelection(this)">
                        <option value="all">All values</option>
                        <option value="recent">Most recent</option>
                        <option value="popular">Most popular</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>
            </div>
        `;
    } else {
        // Show default message when nothing is selected
        propertiesContent.innerHTML = `
            <div class="no-selection">
                <i class="fas fa-mouse-pointer"></i>
                <p>Select a component to edit its properties</p>
                <div class="help-text">
                    <p><strong>Tip:</strong> Click on any widget, data object, or filter in your report to see its configuration options here.</p>
                </div>
            </div>
        `;
    }
}

// AI Assistant Functions
function toggleAIAssistant() {
    showPropertiesTab('ai');
}

function applySuggestion(suggestionType) {
    showLoading('Applying AI suggestion...');
    
    setTimeout(() => {
        hideLoading();
        
        switch (suggestionType) {
            case 'returning-customers-top-items':
                addReturningCustomersAnalysis();
                break;
            case 'customer-lifetime-value':
                addCustomerLifetimeValueAnalysis();
                break;
            case 'payment-method-trends':
                addPaymentMethodTrends();
                break;
            case 'item-performance-by-location':
                addItemPerformanceByLocation();
                break;
            // Legacy support
            case 'join-orders-customers':
                addJoinSuggestion();
                break;
            case 'add-revenue-kpi':
                addPrebuiltWidget('metric', 'Total Revenue');
                break;
            case 'forecast-sales':
                addPrebuiltWidget('sales-forecast', 'Sales Forecast');
                break;
        }
        
        showNotification('AI suggestion applied successfully!');
    }, 1000);
}

function addReturningCustomersAnalysis() {
    // Add required data objects
    if (!reportData.dataSources.includes('customers')) {
        reportData.dataSources.push('customers');
        addComponentToCanvas({ category: 'source', type: 'customers', text: 'Customers' });
    }
    if (!reportData.dataSources.includes('items')) {
        reportData.dataSources.push('items');
        addComponentToCanvas({ category: 'source', type: 'items', text: 'Items' });
    }
    
    // Add analysis widgets
    addPrebuiltWidget('table', 'Returning Customers\' Top Items');
    addPrebuiltWidget('bar', 'Popular Items by Customer Segment');
    addPrebuiltWidget('metric', 'Repeat Customer Rate');
}

function addCustomerLifetimeValueAnalysis() {
    // Add required data objects
    if (!reportData.dataSources.includes('customers')) {
        reportData.dataSources.push('customers');
        addComponentToCanvas({ category: 'source', type: 'customers', text: 'Customers' });
    }
    if (!reportData.dataSources.includes('orders')) {
        reportData.dataSources.push('orders');
        addComponentToCanvas({ category: 'source', type: 'orders', text: 'Orders' });
    }
    
    // Add CLV analysis widgets
    addPrebuiltWidget('metric', 'Average Customer Lifetime Value');
    addPrebuiltWidget('pie', 'Customer Value Segments');
    addPrebuiltWidget('chart', 'CLV Trend Over Time');
    addPrebuiltWidget('table', 'High-Value Customer List');
}

function addPaymentMethodTrends() {
    // Add required data objects
    if (!reportData.dataSources.includes('payments')) {
        reportData.dataSources.push('payments');
        addComponentToCanvas({ category: 'source', type: 'payments', text: 'Payments' });
    }
    if (!reportData.dataSources.includes('customers')) {
        reportData.dataSources.push('customers');
        addComponentToCanvas({ category: 'source', type: 'customers', text: 'Customers' });
    }
    
    // Add payment analysis widgets
    addPrebuiltWidget('pie', 'Payment Method Distribution');
    addPrebuiltWidget('chart', 'Payment Trends Over Time');
    addPrebuiltWidget('bar', 'Payment Methods by Customer Segment');
    addPrebuiltWidget('table', 'Payment Method Performance');
}

function addItemPerformanceByLocation() {
    // Add required data objects
    if (!reportData.dataSources.includes('items')) {
        reportData.dataSources.push('items');
        addComponentToCanvas({ category: 'source', type: 'items', text: 'Items' });
    }
    if (!reportData.dataSources.includes('orders')) {
        reportData.dataSources.push('orders');
        addComponentToCanvas({ category: 'source', type: 'orders', text: 'Orders' });
    }
    
    // Add location-based analysis widgets
    addPrebuiltWidget('bar', 'Top Items by Location');
    addPrebuiltWidget('table', 'Location Performance Matrix');
    addPrebuiltWidget('chart', 'Regional Sales Trends');
    addPrebuiltWidget('metric', 'Best Performing Location');
}

function addJoinSuggestion() {
    // Add both data sources if not already present
    if (!reportData.dataSources.includes('orders')) {
        reportData.dataSources.push('orders');
        addComponentToCanvas({ category: 'source', type: 'orders', text: 'Orders' });
    }
    if (!reportData.dataSources.includes('customers')) {
        reportData.dataSources.push('customers');
        addComponentToCanvas({ category: 'source', type: 'customers', text: 'Customers' });
    }
    
    // Add a joined table widget
    addPrebuiltWidget('table', 'Orders with Customer Info');
}

function sendAIMessage() {
    const input = document.getElementById('aiInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Clear input
    input.value = '';
    
    // Show loading
    showLoading('AI is processing your request...');
    
    // Simulate AI response
    setTimeout(() => {
        hideLoading();
        processAIMessage(message);
    }, 2000);
}

function processAIMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('revenue') || lowerMessage.includes('sales')) {
        addPrebuiltWidget('metric', 'Revenue Analysis');
        showNotification('Added revenue analysis widget based on your request!');
    } else if (lowerMessage.includes('forecast') || lowerMessage.includes('predict')) {
        addPrebuiltWidget('sales-forecast', 'Sales Forecast');
        showNotification('Added sales forecasting widget!');
    } else if (lowerMessage.includes('customer')) {
        addPrebuiltWidget('pie', 'Customer Segments');
        showNotification('Added customer analysis widget!');
    } else {
        showNotification('AI suggestion: Try adding a chart widget to visualize your data!');
    }
}

function triggerAISuggestions(data) {
    // Update AI suggestions based on what was added
    const suggestions = document.querySelector('.ai-suggestions');
    
    if (data.category === 'source' && data.type === 'orders') {
        // Add customer join suggestion
        const suggestion = document.createElement('div');
        suggestion.className = 'suggestion-card';
        suggestion.onclick = () => applySuggestion('join-orders-customers');
        suggestion.innerHTML = `
            <i class="fas fa-link"></i>
            <div class="suggestion-content">
                <h4>Join with Customers</h4>
                <p>Add customer information to your orders data</p>
            </div>
        `;
        suggestions.appendChild(suggestion);
    }
}

// Data Insights
function showDataInsights() {
    showLoading('AI is analyzing your data...');
    
    setTimeout(() => {
        hideLoading();
        document.getElementById('dataInsightsModal').classList.add('active');
    }, 2000);
}

function addInsightToReport(insightType) {
    closeModal('dataInsightsModal');
    
    switch (insightType) {
        case 'revenue-trend':
            addPrebuiltWidget('chart', 'Revenue Growth Trend');
            break;
        case 'customer-pattern':
            addPrebuiltWidget('bar', 'Peak Hours Analysis');
            break;
        case 'inventory-alert':
            addPrebuiltWidget('table', 'Low Stock Items');
            break;
        case 'sales-forecast':
            addPrebuiltWidget('sales-forecast', 'AI Sales Forecast');
            break;
    }
    
    showNotification('Insight added to your report!');
}

// Utility Functions
function showLoading(message) {
    const overlay = document.getElementById('loadingOverlay');
    const text = overlay.querySelector('h3');
    text.textContent = message;
    overlay.classList.add('active');
}

function hideLoading() {
    document.getElementById('loadingOverlay').classList.remove('active');
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Hide and remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Report Actions
function goBack() {
    if (currentStep === 'builder') {
        showStep('template');
    } else {
        // Navigate back to reports list
        window.history.back();
    }
}

function saveDraft() {
    showLoading('Saving draft...');
    
    setTimeout(() => {
        hideLoading();
        showNotification('Draft saved successfully!');
    }, 1000);
}

function createReport() {
    showLoading('Creating report...');
    
    setTimeout(() => {
        hideLoading();
        showNotification('Report created successfully!');
        
        // Simulate navigation to report view
        setTimeout(() => {
            window.location.href = 'transition-demo.html';
        }, 1500);
    }, 2000);
}

function previewReport() {
    showLoading('Generating preview...');
    
    setTimeout(() => {
        hideLoading();
        showNotification('Preview generated! Opening in new tab...');
        
        // Simulate opening preview
        setTimeout(() => {
            window.open('#', '_blank');
        }, 500);
    }, 1500);
}

function saveReport() {
    saveDraft();
}

function addCustomFilter() {
    const filterData = {
        category: 'filter',
        type: 'custom',
        text: 'Custom Filter'
    };
    addComponentToCanvas(filterData);
}

// Event Listeners
function setupEventListeners() {
    // Enter key in AI input
    document.getElementById('aiInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendAIMessage();
        }
    });
    
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
}

// Add notification styles
const notificationStyles = `
<style>
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 1001;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.notification.show {
    transform: translateX(0);
}

.canvas-component {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    transition: all 0.2s;
}

.canvas-component.selected {
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
}

.component-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #f1f5f9;
    font-weight: 500;
}

.component-header.forecast {
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    color: white;
}

.component-header i {
    color: #6366f1;
}

.component-header.forecast i {
    color: white;
}

.remove-btn {
    margin-left: auto;
    background: none;
    border: none;
    color: #64748b;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 0.25rem;
    transition: all 0.2s;
}

.remove-btn:hover {
    background: #f1f5f9;
    color: #ef4444;
}

.component-content {
    padding: 1rem;
}

.metric-preview {
    text-align: center;
}

.metric-value {
    font-size: 2rem;
    font-weight: 700;
    color: #059669;
    margin-bottom: 0.5rem;
}

.metric-change {
    color: #10b981;
    font-size: 0.875rem;
}

.forecast-preview {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.forecast-chart {
    font-size: 2rem;
}

.forecast-info {
    flex: 1;
}

.confidence {
    color: #059669;
    font-size: 0.875rem;
    font-weight: 500;
}

.table-preview {
    font-size: 0.875rem;
}

.table-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid #f1f5f9;
}

.table-row.header {
    font-weight: 600;
    color: #374151;
}

.chart-preview {
    text-align: center;
    padding: 2rem;
    color: #64748b;
}

.chart-placeholder i {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    display: block;
}

.filter-controls {
    display: flex;
    gap: 0.5rem;
}

.filter-select {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    outline: none;
}

.filter-select:focus {
    border-color: #6366f1;
}

.property-section h4 {
    margin-bottom: 1rem;
    color: #374151;
}

.property-group {
    margin-bottom: 1rem;
}

.property-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #374151;
    font-size: 0.875rem;
}

.property-group input,
.property-group select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    outline: none;
    font-size: 0.875rem;
}

.property-group input:focus,
.property-group select:focus {
    border-color: #6366f1;
}

.metrics-list {
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    padding: 0.5rem;
}

.metric-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    border-bottom: 1px solid #f1f5f9;
    font-size: 0.875rem;
}

.metric-item:last-child {
    border-bottom: none;
}

.metric-type {
    background: #f1f5f9;
    color: #64748b;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 500;
}

.applied-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
}

.filter-tag {
    background: #eff6ff;
    color: #1d4ed8;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.filter-tag button {
    background: none;
    border: none;
    color: #1d4ed8;
    cursor: pointer;
    font-weight: bold;
    padding: 0;
    margin-left: 0.25rem;
}

.filter-tag button:hover {
    color: #ef4444;
}

.filter-values {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.filter-values input {
    flex: 1;
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}

.checkbox-label input[type="checkbox"] {
    width: auto;
    margin: 0;
}

.checkmark {
    font-size: 0.875rem;
    color: #64748b;
}

.no-selection {
    text-align: center;
    padding: 2rem;
    color: #64748b;
}

.no-selection i {
    font-size: 2rem;
    margin-bottom: 1rem;
    display: block;
    color: #cbd5e1;
}

.help-text {
    margin-top: 1rem;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 0.375rem;
    border-left: 3px solid #6366f1;
}

.help-text p {
    margin: 0;
    font-size: 0.875rem;
    color: #475569;
}

.btn.btn-sm {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
    border-radius: 0.375rem;
}

.btn.btn-outline {
    background: transparent;
    border: 1px solid #e2e8f0;
    color: #64748b;
}

.btn.btn-outline:hover {
    background: #f8fafc;
    border-color: #6366f1;
    color: #6366f1;
}
</style>
`;

// Add styles to document
document.head.insertAdjacentHTML('beforeend', notificationStyles);
