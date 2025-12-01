# Square Reporting Data Warehouse - Comprehensive Cube Schema Design

## Executive Summary

This document outlines a comprehensive star/snowflake schema design for Square's reporting data warehouse, supporting complex analytical queries across multiple business domains including sales, payments, inventory, labor, and customer analytics.

## Data Architecture Overview

### Schema Type: Hybrid Star/Snowflake Schema
- **Core Facts**: Star schema for performance
- **Complex Dimensions**: Snowflake schema for normalization where needed
- **Conformed Dimensions**: Shared across multiple fact tables
- **Bridge Tables**: For many-to-many relationships

## Fact Tables

### 1. Sales Transaction Fact (F_SALES_TRANSACTION)
**Grain**: One row per transaction line item

```sql
CREATE TABLE F_SALES_TRANSACTION (
    -- Surrogate Keys
    transaction_sk BIGINT PRIMARY KEY,
    date_sk INT NOT NULL,
    time_sk INT NOT NULL,
    location_sk INT NOT NULL,
    employee_sk INT NOT NULL,
    customer_sk INT,
    item_sk INT,
    payment_method_sk INT,
    device_sk INT,
    
    -- Natural Keys
    transaction_id VARCHAR(50) NOT NULL,
    line_item_id VARCHAR(50),
    
    -- Measures - Sales Metrics
    gross_sales_amount DECIMAL(15,2) DEFAULT 0,
    net_sales_amount DECIMAL(15,2) DEFAULT 0,
    item_quantity INT DEFAULT 0,
    unit_price DECIMAL(10,2) DEFAULT 0,
    extended_price DECIMAL(15,2) DEFAULT 0,
    
    -- Measures - Discounts & Adjustments
    discount_amount DECIMAL(15,2) DEFAULT 0,
    comp_amount DECIMAL(15,2) DEFAULT 0,
    modifier_amount DECIMAL(15,2) DEFAULT 0,
    service_charge_amount DECIMAL(15,2) DEFAULT 0,
    
    -- Measures - Taxes & Fees
    tax_amount DECIMAL(15,2) DEFAULT 0,
    tip_amount DECIMAL(15,2) DEFAULT 0,
    processing_fee_amount DECIMAL(15,2) DEFAULT 0,
    
    -- Measures - Returns & Voids
    return_amount DECIMAL(15,2) DEFAULT 0,
    void_amount DECIMAL(15,2) DEFAULT 0,
    
    -- Flags & Status
    is_refund BOOLEAN DEFAULT FALSE,
    is_void BOOLEAN DEFAULT FALSE,
    is_comp BOOLEAN DEFAULT FALSE,
    transaction_status VARCHAR(20),
    
    -- Audit Fields
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Payment Fact (F_PAYMENT)
**Grain**: One row per payment method per transaction

```sql
CREATE TABLE F_PAYMENT (
    -- Surrogate Keys
    payment_sk BIGINT PRIMARY KEY,
    transaction_sk BIGINT NOT NULL,
    date_sk INT NOT NULL,
    time_sk INT NOT NULL,
    location_sk INT NOT NULL,
    payment_method_sk INT NOT NULL,
    customer_sk INT,
    
    -- Natural Keys
    payment_id VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(50) NOT NULL,
    
    -- Measures
    payment_amount DECIMAL(15,2) NOT NULL,
    processing_fee DECIMAL(15,2) DEFAULT 0,
    net_payment_amount DECIMAL(15,2) NOT NULL,
    tip_amount DECIMAL(15,2) DEFAULT 0,
    
    -- Payment Details
    card_brand VARCHAR(20),
    last_four_digits VARCHAR(4),
    authorization_code VARCHAR(20),
    
    -- Flags
    is_refund BOOLEAN DEFAULT FALSE,
    is_partial_payment BOOLEAN DEFAULT FALSE,
    
    -- Foreign Keys
    FOREIGN KEY (transaction_sk) REFERENCES F_SALES_TRANSACTION(transaction_sk)
);
```

### 3. Item Sales Fact (F_ITEM_SALES)
**Grain**: One row per item per transaction

```sql
CREATE TABLE F_ITEM_SALES (
    -- Surrogate Keys
    item_sales_sk BIGINT PRIMARY KEY,
    transaction_sk BIGINT NOT NULL,
    date_sk INT NOT NULL,
    time_sk INT NOT NULL,
    location_sk INT NOT NULL,
    item_sk INT NOT NULL,
    category_sk INT NOT NULL,
    employee_sk INT NOT NULL,
    
    -- Natural Keys
    transaction_id VARCHAR(50) NOT NULL,
    item_id VARCHAR(50) NOT NULL,
    
    -- Measures - Quantity & Pricing
    quantity_sold INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    extended_price DECIMAL(15,2) NOT NULL,
    cost_per_unit DECIMAL(10,2),
    total_cost DECIMAL(15,2),
    
    -- Measures - Modifiers
    modifier_count INT DEFAULT 0,
    modifier_amount DECIMAL(15,2) DEFAULT 0,
    
    -- Measures - Discounts
    item_discount_amount DECIMAL(15,2) DEFAULT 0,
    item_comp_amount DECIMAL(15,2) DEFAULT 0,
    
    -- Measures - Profit Analysis
    gross_profit DECIMAL(15,2),
    profit_margin_percent DECIMAL(5,2),
    
    -- Flags
    is_returned BOOLEAN DEFAULT FALSE,
    is_voided BOOLEAN DEFAULT FALSE,
    is_comped BOOLEAN DEFAULT FALSE
);
```

### 4. Labor Cost Fact (F_LABOR_COST)
**Grain**: One row per employee per shift per day

```sql
CREATE TABLE F_LABOR_COST (
    -- Surrogate Keys
    labor_cost_sk BIGINT PRIMARY KEY,
    date_sk INT NOT NULL,
    employee_sk INT NOT NULL,
    location_sk INT NOT NULL,
    shift_sk INT,
    
    -- Natural Keys
    employee_id VARCHAR(50) NOT NULL,
    shift_id VARCHAR(50),
    
    -- Measures - Time
    hours_worked DECIMAL(5,2) NOT NULL,
    regular_hours DECIMAL(5,2) DEFAULT 0,
    overtime_hours DECIMAL(5,2) DEFAULT 0,
    break_hours DECIMAL(5,2) DEFAULT 0,
    
    -- Measures - Cost
    hourly_rate DECIMAL(8,2) NOT NULL,
    regular_pay DECIMAL(10,2) DEFAULT 0,
    overtime_pay DECIMAL(10,2) DEFAULT 0,
    total_labor_cost DECIMAL(10,2) NOT NULL,
    
    -- Measures - Benefits & Taxes
    benefits_cost DECIMAL(10,2) DEFAULT 0,
    payroll_tax_cost DECIMAL(10,2) DEFAULT 0,
    total_loaded_cost DECIMAL(10,2) NOT NULL,
    
    -- Shift Details
    clock_in_time TIMESTAMP,
    clock_out_time TIMESTAMP,
    scheduled_start_time TIMESTAMP,
    scheduled_end_time TIMESTAMP
);
```

### 5. Gift Card Fact (F_GIFT_CARD)
**Grain**: One row per gift card transaction

```sql
CREATE TABLE F_GIFT_CARD (
    -- Surrogate Keys
    gift_card_sk BIGINT PRIMARY KEY,
    date_sk INT NOT NULL,
    time_sk INT NOT NULL,
    location_sk INT NOT NULL,
    customer_sk INT,
    employee_sk INT NOT NULL,
    
    -- Natural Keys
    gift_card_id VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(50),
    
    -- Measures
    card_value DECIMAL(10,2) NOT NULL,
    amount_used DECIMAL(10,2) DEFAULT 0,
    remaining_balance DECIMAL(10,2) NOT NULL,
    
    -- Transaction Type
    transaction_type VARCHAR(20) NOT NULL, -- ISSUED, REDEEMED, REFUNDED
    
    -- Status
    card_status VARCHAR(20) NOT NULL, -- ACTIVE, EXPIRED, CANCELLED
    expiration_date DATE
);
```

### 6. KDS Operations Fact (F_KDS_OPERATIONS)
**Grain**: One row per kitchen display system operation

```sql
CREATE TABLE F_KDS_OPERATIONS (
    -- Surrogate Keys
    kds_operation_sk BIGINT PRIMARY KEY,
    date_sk INT NOT NULL,
    time_sk INT NOT NULL,
    location_sk INT NOT NULL,
    item_sk INT NOT NULL,
    employee_sk INT,
    
    -- Natural Keys
    order_id VARCHAR(50) NOT NULL,
    item_id VARCHAR(50) NOT NULL,
    kds_station_id VARCHAR(50),
    
    -- Measures - Timing
    order_received_time TIMESTAMP NOT NULL,
    prep_start_time TIMESTAMP,
    prep_complete_time TIMESTAMP,
    served_time TIMESTAMP,
    
    -- Calculated Measures
    prep_time_minutes INT,
    total_fulfillment_time_minutes INT,
    wait_time_minutes INT,
    
    -- Status & Flags
    order_status VARCHAR(20), -- RECEIVED, PREPARING, READY, SERVED
    is_rush_order BOOLEAN DEFAULT FALSE,
    is_delayed BOOLEAN DEFAULT FALSE,
    
    -- Quality Metrics
    customer_satisfaction_score INT, -- 1-5 scale
    order_accuracy BOOLEAN DEFAULT TRUE
);
```

## Dimension Tables

### 1. Date Dimension (D_DATE)
```sql
CREATE TABLE D_DATE (
    date_sk INT PRIMARY KEY,
    date_value DATE NOT NULL UNIQUE,
    year_number INT NOT NULL,
    quarter_number INT NOT NULL,
    month_number INT NOT NULL,
    week_number INT NOT NULL,
    day_of_year INT NOT NULL,
    day_of_month INT NOT NULL,
    day_of_week INT NOT NULL,
    day_name VARCHAR(10) NOT NULL,
    month_name VARCHAR(10) NOT NULL,
    quarter_name VARCHAR(10) NOT NULL,
    is_weekend BOOLEAN NOT NULL,
    is_holiday BOOLEAN DEFAULT FALSE,
    holiday_name VARCHAR(50),
    fiscal_year INT,
    fiscal_quarter INT,
    fiscal_month INT,
    business_day_flag BOOLEAN DEFAULT TRUE
);
```

### 2. Time Dimension (D_TIME)
```sql
CREATE TABLE D_TIME (
    time_sk INT PRIMARY KEY,
    time_value TIME NOT NULL,
    hour_24 INT NOT NULL,
    hour_12 INT NOT NULL,
    minute_number INT NOT NULL,
    second_number INT NOT NULL,
    am_pm VARCHAR(2) NOT NULL,
    time_period VARCHAR(20), -- BREAKFAST, LUNCH, DINNER, LATE_NIGHT
    is_peak_hour BOOLEAN DEFAULT FALSE,
    is_business_hours BOOLEAN DEFAULT TRUE
);
```

### 3. Location Dimension (D_LOCATION)
```sql
CREATE TABLE D_LOCATION (
    location_sk INT PRIMARY KEY,
    location_id VARCHAR(50) NOT NULL UNIQUE,
    location_name VARCHAR(100) NOT NULL,
    location_type VARCHAR(20), -- RESTAURANT, RETAIL, FOOD_TRUCK
    address_line1 VARCHAR(100),
    address_line2 VARCHAR(100),
    city VARCHAR(50),
    state VARCHAR(50),
    postal_code VARCHAR(20),
    country VARCHAR(50),
    phone_number VARCHAR(20),
    email VARCHAR(100),
    manager_name VARCHAR(100),
    square_footage INT,
    seating_capacity INT,
    drive_thru_flag BOOLEAN DEFAULT FALSE,
    delivery_enabled BOOLEAN DEFAULT FALSE,
    pickup_enabled BOOLEAN DEFAULT TRUE,
    timezone VARCHAR(50),
    opening_time TIME,
    closing_time TIME,
    is_active BOOLEAN DEFAULT TRUE,
    created_date DATE,
    last_modified_date DATE
);
```

### 4. Employee Dimension (D_EMPLOYEE)
```sql
CREATE TABLE D_EMPLOYEE (
    employee_sk INT PRIMARY KEY,
    employee_id VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone_number VARCHAR(20),
    job_title VARCHAR(50),
    department VARCHAR(50),
    hire_date DATE,
    termination_date DATE,
    employment_status VARCHAR(20), -- ACTIVE, TERMINATED, SUSPENDED
    hourly_rate DECIMAL(8,2),
    salary_amount DECIMAL(10,2),
    pay_type VARCHAR(20), -- HOURLY, SALARY
    location_sk INT,
    manager_employee_sk INT,
    permission_level VARCHAR(20), -- ADMIN, MANAGER, EMPLOYEE
    can_process_refunds BOOLEAN DEFAULT FALSE,
    can_apply_discounts BOOLEAN DEFAULT FALSE,
    can_void_transactions BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (location_sk) REFERENCES D_LOCATION(location_sk)
);
```

### 5. Customer Dimension (D_CUSTOMER)
```sql
CREATE TABLE D_CUSTOMER (
    customer_sk INT PRIMARY KEY,
    customer_id VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    full_name VARCHAR(100),
    email VARCHAR(100),
    phone_number VARCHAR(20),
    date_of_birth DATE,
    gender VARCHAR(10),
    address_line1 VARCHAR(100),
    address_line2 VARCHAR(100),
    city VARCHAR(50),
    state VARCHAR(50),
    postal_code VARCHAR(20),
    country VARCHAR(50),
    customer_segment VARCHAR(20), -- VIP, REGULAR, NEW, INACTIVE
    loyalty_tier VARCHAR(20),
    loyalty_points INT DEFAULT 0,
    total_lifetime_value DECIMAL(15,2) DEFAULT 0,
    total_visits INT DEFAULT 0,
    first_visit_date DATE,
    last_visit_date DATE,
    average_order_value DECIMAL(10,2),
    preferred_location_sk INT,
    marketing_opt_in BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_date DATE,
    last_modified_date DATE,
    FOREIGN KEY (preferred_location_sk) REFERENCES D_LOCATION(location_sk)
);
```

### 6. Item Dimension (D_ITEM)
```sql
CREATE TABLE D_ITEM (
    item_sk INT PRIMARY KEY,
    item_id VARCHAR(50) NOT NULL UNIQUE,
    item_name VARCHAR(100) NOT NULL,
    item_description TEXT,
    item_type VARCHAR(20), -- PRODUCT, SERVICE, MODIFIER, DISCOUNT
    category_sk INT NOT NULL,
    subcategory VARCHAR(50),
    brand VARCHAR(50),
    sku VARCHAR(50),
    barcode VARCHAR(50),
    unit_of_measure VARCHAR(20),
    current_price DECIMAL(10,2),
    cost_per_unit DECIMAL(10,2),
    profit_margin_percent DECIMAL(5,2),
    is_taxable BOOLEAN DEFAULT TRUE,
    tax_rate DECIMAL(5,4),
    is_discountable BOOLEAN DEFAULT TRUE,
    is_modifiable BOOLEAN DEFAULT TRUE,
    preparation_time_minutes INT,
    calories INT,
    allergen_info TEXT,
    dietary_flags VARCHAR(100), -- VEGAN, GLUTEN_FREE, etc.
    is_active BOOLEAN DEFAULT TRUE,
    created_date DATE,
    last_modified_date DATE,
    FOREIGN KEY (category_sk) REFERENCES D_CATEGORY(category_sk)
);
```

### 7. Category Dimension (D_CATEGORY) - Snowflake
```sql
CREATE TABLE D_CATEGORY (
    category_sk INT PRIMARY KEY,
    category_id VARCHAR(50) NOT NULL UNIQUE,
    category_name VARCHAR(100) NOT NULL,
    category_description TEXT,
    parent_category_sk INT,
    category_level INT NOT NULL,
    category_path VARCHAR(500),
    display_order INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_date DATE,
    FOREIGN KEY (parent_category_sk) REFERENCES D_CATEGORY(category_sk)
);
```

### 8. Payment Method Dimension (D_PAYMENT_METHOD)
```sql
CREATE TABLE D_PAYMENT_METHOD (
    payment_method_sk INT PRIMARY KEY,
    payment_method_id VARCHAR(50) NOT NULL UNIQUE,
    payment_method_name VARCHAR(50) NOT NULL,
    payment_type VARCHAR(20), -- CARD, CASH, GIFT_CARD, DIGITAL_WALLET
    card_brand VARCHAR(20), -- VISA, MASTERCARD, AMEX, etc.
    processing_fee_rate DECIMAL(5,4),
    is_contactless BOOLEAN DEFAULT FALSE,
    is_online_capable BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE
);
```

### 9. Device Dimension (D_DEVICE)
```sql
CREATE TABLE D_DEVICE (
    device_sk INT PRIMARY KEY,
    device_id VARCHAR(50) NOT NULL UNIQUE,
    device_name VARCHAR(100) NOT NULL,
    device_type VARCHAR(20), -- POS, MOBILE, ONLINE, KIOSK
    device_model VARCHAR(50),
    serial_number VARCHAR(50),
    location_sk INT NOT NULL,
    ip_address VARCHAR(15),
    mac_address VARCHAR(17),
    operating_system VARCHAR(50),
    app_version VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    last_sync_time TIMESTAMP,
    FOREIGN KEY (location_sk) REFERENCES D_LOCATION(location_sk)
);
```

## Bridge Tables (Many-to-Many Relationships)

### 1. Transaction Modifier Bridge (B_TRANSACTION_MODIFIER)
```sql
CREATE TABLE B_TRANSACTION_MODIFIER (
    transaction_sk BIGINT NOT NULL,
    modifier_sk INT NOT NULL,
    modifier_quantity INT DEFAULT 1,
    modifier_amount DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (transaction_sk, modifier_sk),
    FOREIGN KEY (transaction_sk) REFERENCES F_SALES_TRANSACTION(transaction_sk),
    FOREIGN KEY (modifier_sk) REFERENCES D_ITEM(item_sk)
);
```

### 2. Item Category Bridge (B_ITEM_CATEGORY)
```sql
CREATE TABLE B_ITEM_CATEGORY (
    item_sk INT NOT NULL,
    category_sk INT NOT NULL,
    is_primary_category BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (item_sk, category_sk),
    FOREIGN KEY (item_sk) REFERENCES D_ITEM(item_sk),
    FOREIGN KEY (category_sk) REFERENCES D_CATEGORY(category_sk)
);
```

## Calculated Measures and KPIs

### Sales Performance Measures
```sql
-- Gross Sales
SUM(gross_sales_amount)

-- Net Sales (after discounts, comps, returns)
SUM(net_sales_amount) - SUM(discount_amount) - SUM(comp_amount) - SUM(return_amount)

-- Average Transaction Value
SUM(net_sales_amount) / COUNT(DISTINCT transaction_id)

-- Items per Transaction
SUM(item_quantity) / COUNT(DISTINCT transaction_id)

-- Sales Growth Rate
(Current_Period_Sales - Previous_Period_Sales) / Previous_Period_Sales * 100
```

### Profitability Measures
```sql
-- Gross Profit
SUM(net_sales_amount) - SUM(total_cost)

-- Gross Profit Margin
(SUM(net_sales_amount) - SUM(total_cost)) / SUM(net_sales_amount) * 100

-- Labor Cost Percentage
SUM(total_labor_cost) / SUM(net_sales_amount) * 100

-- Food Cost Percentage
SUM(total_cost) / SUM(net_sales_amount) * 100
```

### Operational Efficiency Measures
```sql
-- Average Prep Time
AVG(prep_time_minutes)

-- Order Accuracy Rate
SUM(CASE WHEN order_accuracy = TRUE THEN 1 ELSE 0 END) / COUNT(*) * 100

-- Customer Satisfaction Score
AVG(customer_satisfaction_score)

-- Peak Hour Performance
Sales during peak hours / Total sales * 100
```

### Customer Analytics Measures
```sql
-- Customer Lifetime Value
SUM(net_sales_amount) / COUNT(DISTINCT customer_sk)

-- Customer Retention Rate
Returning_Customers / Total_Customers * 100

-- Average Visit Frequency
COUNT(DISTINCT transaction_id) / COUNT(DISTINCT customer_sk)

-- New vs Returning Customer Ratio
New_Customers / Returning_Customers
```

## Indexing Strategy

### Primary Indexes
```sql
-- Fact Tables
CREATE INDEX idx_sales_date_location ON F_SALES_TRANSACTION(date_sk, location_sk);
CREATE INDEX idx_sales_item_date ON F_SALES_TRANSACTION(item_sk, date_sk);
CREATE INDEX idx_payment_date_method ON F_PAYMENT(date_sk, payment_method_sk);
CREATE INDEX idx_item_sales_date_item ON F_ITEM_SALES(date_sk, item_sk);
CREATE INDEX idx_labor_date_employee ON F_LABOR_COST(date_sk, employee_sk);

-- Dimension Tables
CREATE INDEX idx_customer_email ON D_CUSTOMER(email);
CREATE INDEX idx_employee_location ON D_EMPLOYEE(location_sk);
CREATE INDEX idx_item_category ON D_ITEM(category_sk);
CREATE INDEX idx_category_parent ON D_CATEGORY(parent_category_sk);
```

### Composite Indexes for Common Query Patterns
```sql
CREATE INDEX idx_sales_analysis ON F_SALES_TRANSACTION(date_sk, location_sk, item_sk, employee_sk);
CREATE INDEX idx_payment_analysis ON F_PAYMENT(date_sk, location_sk, payment_method_sk);
CREATE INDEX idx_customer_analysis ON F_SALES_TRANSACTION(customer_sk, date_sk, location_sk);
```

## ETL Considerations

### Data Quality Rules
1. **Referential Integrity**: All foreign keys must reference valid dimension records
2. **Data Completeness**: Critical fields (amounts, dates, IDs) cannot be null
3. **Data Consistency**: Transaction totals must reconcile across fact tables
4. **Data Accuracy**: Negative amounts only allowed for refunds/voids

### Slowly Changing Dimensions (SCD)
- **Type 1 (Overwrite)**: Employee contact information, item prices
- **Type 2 (Historical)**: Customer addresses, employee job titles, item categories
- **Type 3 (Previous Value)**: Item pricing with previous_price column

### Data Refresh Strategy
- **Real-time**: Transaction data, payment data
- **Hourly**: KDS operations, labor tracking
- **Daily**: Customer metrics, inventory levels
- **Weekly**: Profit calculations, cost analysis

## Query Optimization Patterns

### Common Query Templates
```sql
-- Sales by Location and Time Period
SELECT 
    l.location_name,
    d.month_name,
    SUM(f.net_sales_amount) as total_sales,
    COUNT(DISTINCT f.transaction_id) as transaction_count
FROM F_SALES_TRANSACTION f
JOIN D_LOCATION l ON f.location_sk = l.location_sk
JOIN D_DATE d ON f.date_sk = d.date_sk
WHERE d.date_value BETWEEN '2025-01-01' AND '2025-12-31'
GROUP BY l.location_name, d.month_name
ORDER BY total_sales DESC;

-- Top Performing Items by Category
SELECT 
    c.category_name,
    i.item_name,
    SUM(f.quantity_sold) as total_quantity,
    SUM(f.extended_price) as total_revenue,
    AVG(f.profit_margin_percent) as avg_margin
FROM F_ITEM_SALES f
JOIN D_ITEM i ON f.item_sk = i.item_sk
JOIN D_CATEGORY c ON f.category_sk = c.category_sk
JOIN D_DATE d ON f.date_sk = d.date_sk
WHERE d.date_value >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY c.category_name, i.item_name
ORDER BY total_revenue DESC;

-- Labor Efficiency Analysis
SELECT 
    e.full_name,
    l.location_name,
    SUM(lc.hours_worked) as total_hours,
    SUM(lc.total_labor_cost) as total_cost,
    SUM(st.net_sales_amount) as sales_generated,
    SUM(st.net_sales_amount) / SUM(lc.total_labor_cost) as sales_per_dollar_cost
FROM F_LABOR_COST lc
JOIN D_EMPLOYEE e ON lc.employee_sk = e.employee_sk
JOIN D_LOCATION l ON lc.location_sk = l.location_sk
LEFT JOIN F_SALES_TRANSACTION st ON lc.employee_sk = st.employee_sk 
    AND lc.date_sk = st.date_sk
WHERE lc.date_sk >= (SELECT date_sk FROM D_DATE WHERE date_value = CURRENT_DATE - 7)
GROUP BY e.full_name, l.location_name
ORDER BY sales_per_dollar_cost DESC;
```

## Data Governance and Security

### Access Control
- **Role-Based Access**: Different views for managers, analysts, executives
- **Row-Level Security**: Location-based data access restrictions
- **Column-Level Security**: Sensitive customer data protection
- **Audit Logging**: Track all data access and modifications

### Data Retention Policies
- **Transaction Data**: 7 years for compliance
- **Customer Data**: Until customer requests deletion
- **Employee Data**: 3 years after termination
- **Operational Data**: 2 years for performance analysis

### Compliance Considerations
- **PCI DSS**: Payment card data protection
- **GDPR**: Customer data privacy rights
- **SOX**: Financial data accuracy and controls
- **Local Regulations**: State and local tax reporting requirements

## Performance Monitoring

### Key Performance Indicators
1. **Query Response Time**: < 5 seconds for standard reports
2. **Data Freshness**: < 15 minutes for real-time data
3. **System Availability**: 99.9% uptime
4. **Data Quality Score**: > 98% accuracy

### Monitoring Queries
```sql
-- Data Quality Check
SELECT 
    'Sales Transaction' as table_name,
    COUNT(*) as total_records,
    COUNT(CASE WHEN net_sales_amount IS NULL THEN 1 END) as null_amounts,
    COUNT(CASE WHEN date_sk IS NULL THEN 1 END) as null_dates,
    MIN(date_sk) as earliest_date,
    MAX(date_sk) as latest_date
FROM F_SALES_TRANSACTION
WHERE date_sk >= (SELECT date_sk FROM D_DATE WHERE date_value = CURRENT_DATE - 1);

-- Performance Monitoring
SELECT 
    query_text,
    avg_execution_time_ms,
    execution_count,
    last_execution_time
FROM query_performance_log
WHERE last_execution_time >= CURRENT_TIMESTAMP - INTERVAL '1 hour'
ORDER BY avg_execution_time_ms DESC;
```

## Conclusion

This comprehensive cube schema design provides a robust foundation for Square's reporting and analytics needs. The hybrid star/snowflake approach balances query performance with data normalization, while the extensive dimension hierarchy supports complex analytical queries across all business domains.

The schema supports:
- **Multi-dimensional Analysis**: Sales, profitability, operational efficiency
- **Complex Relationships**: Many-to-many through bridge tables
- **Historical Tracking**: Slowly changing dimensions
- **Real-time Reporting**: Optimized for frequent updates
- **Scalability**: Designed for high-volume transaction processing
- **Compliance**: Built-in data governance and security features

Regular monitoring and optimization of this schema will ensure continued performance as data volumes grow and business requirements evolve.
