# OLAP Cube Analysis Examples

## Overview
This document demonstrates how to use the provided CSV files for multi-dimensional analysis in OLAP cube tools like Power BI, Tableau, or Excel Pivot Tables.

## File Structure
```
├── Dimension Tables
│   ├── dim_date.csv              # Time dimension
│   ├── dim_time.csv              # Hour-level time data
│   ├── dim_location.csv          # Store locations
│   ├── dim_employee.csv          # Employee information
│   ├── dim_customer.csv          # Customer demographics
│   ├── dim_category.csv          # Product categories (hierarchical)
│   ├── dim_item.csv              # Products and modifiers
│   └── dim_payment_method.csv    # Payment types
├── Fact Tables
│   ├── fact_sales_transaction.csv # Main transaction data
│   ├── fact_item_sales.csv       # Item-level sales details
│   └── fact_labor_cost.csv       # Employee labor costs
└── Bridge Tables
    └── bridge_transaction_modifier.csv # Many-to-many modifier relationships
```

## Key Relationships

### Primary Keys and Foreign Keys
```sql
-- Dimension to Fact Relationships
fact_sales_transaction.date_sk → dim_date.date_sk
fact_sales_transaction.time_sk → dim_time.time_sk
fact_sales_transaction.location_sk → dim_location.location_sk
fact_sales_transaction.employee_sk → dim_employee.employee_sk
fact_sales_transaction.customer_sk → dim_customer.customer_sk
fact_sales_transaction.item_sk → dim_item.item_sk
fact_sales_transaction.payment_method_sk → dim_payment_method.payment_method_sk

-- Item to Category Hierarchy
dim_item.category_sk → dim_category.category_sk
dim_category.parent_category_sk → dim_category.category_sk (self-join)

-- Bridge Table Relationships
bridge_transaction_modifier.transaction_sk → fact_sales_transaction.transaction_sk
bridge_transaction_modifier.modifier_sk → dim_item.item_sk (where item_type = 'MODIFIER')
```

## Analysis Examples

### 1. Top Modifiers on Top Selling Items

**Business Question**: Which modifiers are most popular with our best-selling items?

**Data Sources**:
- `fact_sales_transaction.csv`
- `fact_item_sales.csv`
- `bridge_transaction_modifier.csv`
- `dim_item.csv`
- `dim_category.csv`

**Analysis Steps**:
1. Identify top-selling items by revenue
2. Find transactions containing these items
3. Join with modifier bridge to find associated modifiers
4. Calculate modifier attachment rates

**Expected Results** (from sample data):
```
Top Item: Cappuccino ($4.25)
├── Extra Shot: 40% attachment rate
├── Soy Milk: 20% attachment rate
└── Whipped Cream: 15% attachment rate

Top Item: Latte ($4.75)
├── Oat Milk: 35% attachment rate
├── Large Size: 25% attachment rate
└── Extra Shot: 20% attachment rate
```

**Power BI DAX Example**:
```dax
Modifier Attachment Rate = 
DIVIDE(
    COUNTROWS(
        FILTER(
            bridge_transaction_modifier,
            bridge_transaction_modifier[modifier_sk] = SELECTEDVALUE(dim_item[item_sk])
        )
    ),
    COUNTROWS(fact_sales_transaction),
    0
) * 100
```

### 2. Sales by Location + Employee + Time

**Business Question**: How do sales performance vary by location, employee, and time periods?

**Pivot Table Structure**:
```
Rows: Location Name, Employee Name
Columns: Time Period (Breakfast, Lunch, Dinner)
Values: Net Sales Amount, Transaction Count, Average Transaction Value
Filters: Date Range, Day of Week
```

**Key Insights from Sample Data**:
- Downtown Cafe (SF): Strongest breakfast performance
- Times Square Bistro (NY): Highest dinner sales
- Peak hours: 7-9 AM, 12-1 PM, 6-8 PM
- Weekend vs weekday patterns

**Excel Pivot Table Setup**:
1. Import all CSV files into Excel Data Model
2. Create relationships between tables
3. Build pivot table with calculated measures

### 3. Customer Segments by Item Categories + Payment Methods

**Business Question**: How do different customer segments prefer to pay for different product categories?

**Cross-Tab Analysis**:
```
                    Food    Beverages   Desserts   Merchandise
VIP Customers
├── Credit Card     65%     70%         60%        80%
├── Digital Wallet  25%     20%         30%        15%
└── Cash           10%     10%         10%         5%

Regular Customers
├── Credit Card     50%     55%         45%        60%
├── Digital Wallet  30%     25%         35%        25%
└── Cash           20%     20%         20%        15%
```

**Tableau Calculation**:
```
Payment Method % = 
SUM([Net Sales Amount]) / 
TOTAL(SUM([Net Sales Amount]))
```

### 4. Discount Effectiveness Analysis

**Business Question**: Which discounts drive the most incremental sales across different product categories and time periods?

**Analysis Dimensions**:
- Product Category (Food, Beverages, Desserts)
- Time Period (Month, Week, Day Part)
- Location Type (Restaurant, Food Truck, Retail)
- Discount Type (Percentage, Dollar Amount, BOGO)

**Key Metrics**:
```sql
-- Discount Penetration Rate
Discount_Penetration = 
    COUNT(transactions_with_discount) / COUNT(total_transactions) * 100

-- Discount Effectiveness Ratio
Discount_Effectiveness = 
    SUM(net_sales_with_discount) / SUM(total_discount_amount)

-- Incremental Sales Impact
Incremental_Sales = 
    AVG(transaction_value_with_discount) - AVG(transaction_value_without_discount)
```

**Sample Results**:
```
Food Category Discounts:
├── 10% off sandwiches: 3.2x effectiveness ratio
├── BOGO pastries: 2.8x effectiveness ratio
└── $1 off salads: 2.1x effectiveness ratio

Beverage Category Discounts:
├── Happy hour 20% off: 4.1x effectiveness ratio
├── Loyalty member 15% off: 3.5x effectiveness ratio
└── Buy 2 get 1 free: 2.9x effectiveness ratio
```

## Advanced Analysis Scenarios

### 5. Labor Efficiency vs Sales Performance

**Multi-Fact Analysis**:
Combine `fact_labor_cost.csv` with `fact_sales_transaction.csv`

**Key Calculations**:
```sql
-- Sales per Labor Hour
Sales_per_Labor_Hour = 
    SUM(net_sales_amount) / SUM(hours_worked)

-- Labor Cost Percentage
Labor_Cost_Percentage = 
    SUM(total_labor_cost) / SUM(net_sales_amount) * 100

-- Employee Productivity Score
Productivity_Score = 
    (Sales_per_Labor_Hour * Transaction_Count) / Average_Transaction_Value
```

### 6. Customer Lifetime Value Analysis

**Time-Series Analysis**:
Track customer behavior over time using date dimensions

**Cohort Analysis Setup**:
```sql
-- Customer Acquisition Month
Acquisition_Month = MIN(transaction_date) GROUP BY customer_id

-- Monthly Retention Rate
Retention_Rate = 
    COUNT(returning_customers) / COUNT(total_customers_in_cohort) * 100

-- CLV Calculation
Customer_LTV = 
    AVG(monthly_spend) * AVG(retention_months) * Gross_Margin_Rate
```

### 7. Seasonal and Trend Analysis

**Time Intelligence Calculations**:
```sql
-- Year-over-Year Growth
YoY_Growth = 
    (Current_Year_Sales - Previous_Year_Sales) / Previous_Year_Sales * 100

-- Same-Store Sales Growth
Same_Store_Growth = 
    Sales_Growth_Excluding_New_Locations

-- Seasonal Index
Seasonal_Index = 
    Period_Average / Annual_Average * 100
```

## Implementation Guidelines

### Power BI Setup
1. **Data Import**: Use "Get Data" → "Text/CSV" for each file
2. **Relationships**: Auto-detect or manually create relationships
3. **Measures**: Create calculated measures using DAX
4. **Visualizations**: Build interactive dashboards

### Tableau Setup
1. **Data Connection**: Connect to CSV files as data source
2. **Data Model**: Define relationships in Data Source tab
3. **Calculations**: Create calculated fields for measures
4. **Worksheets**: Build individual visualizations

### Excel Pivot Tables
1. **Data Model**: Import CSV files into Excel Data Model
2. **Relationships**: Create relationships in Manage Relationships
3. **Pivot Tables**: Insert PivotTable using Data Model
4. **Measures**: Add calculated fields using DAX in Excel

## Performance Optimization Tips

### 1. Data Preparation
- **Pre-aggregate** frequently used combinations
- **Index** key columns for faster joins
- **Partition** large fact tables by date

### 2. Query Optimization
- **Filter early** in the query pipeline
- **Use appropriate** aggregation levels
- **Limit** result set sizes for interactive analysis

### 3. Cube Design
- **Star schema** for performance-critical queries
- **Snowflake** for normalized dimension hierarchies
- **Bridge tables** for many-to-many relationships

## Sample Queries for Validation

### SQL Queries to Test Data Integrity
```sql
-- Check for orphaned records
SELECT COUNT(*) FROM fact_sales_transaction f
LEFT JOIN dim_date d ON f.date_sk = d.date_sk
WHERE d.date_sk IS NULL;

-- Validate transaction totals
SELECT 
    transaction_id,
    SUM(extended_price) as line_total,
    MAX(gross_sales_amount) as transaction_total
FROM fact_sales_transaction
GROUP BY transaction_id
HAVING SUM(extended_price) != MAX(gross_sales_amount);

-- Check modifier relationships
SELECT 
    t.transaction_id,
    COUNT(m.modifier_sk) as modifier_count,
    SUM(m.modifier_amount) as total_modifier_amount
FROM fact_sales_transaction t
JOIN bridge_transaction_modifier m ON t.transaction_sk = m.transaction_sk
GROUP BY t.transaction_id;
```

This comprehensive analysis framework enables deep insights into Square POS operations across multiple business dimensions while maintaining data integrity and performance.
