# Square OLAP Cube Definition

## Cube Schema Overview

### Cube Name: Square_Sales_Analytics
**Description**: Multi-dimensional analytical cube for Square POS sales, payment, and operational data

## Dimensions

### 1. Time Dimension Hierarchy
```
Time
├── Year (2024, 2025)
├── Quarter (Q1, Q2, Q3, Q4)
├── Month (January, February, ...)
├── Week (Week 1, Week 2, ...)
└── Day (Monday, Tuesday, ...)
    └── Hour (0-23)
        └── Time Period (Breakfast, Lunch, Dinner, Late Night)
```

### 2. Location Dimension Hierarchy
```
Location
├── Region (North, South, East, West)
├── State (CA, NY, TX, FL)
├── City (San Francisco, New York, Austin)
└── Store (Store_001, Store_002, ...)
    └── Department (Kitchen, Counter, Drive-Thru)
```

### 3. Product Dimension Hierarchy
```
Product
├── Category (Food, Beverages, Desserts, Merchandise)
├── Subcategory (Hot Drinks, Cold Drinks, Sandwiches)
└── Item (Cappuccino, Latte, Club Sandwich)
    └── Modifier (Extra Shot, Soy Milk, No Onions)
```

### 4. Customer Dimension Hierarchy
```
Customer
├── Segment (VIP, Regular, New, Inactive)
├── Loyalty Tier (Platinum, Gold, Silver, Bronze)
└── Individual Customer
    └── Demographics (Age Group, Gender)
```

### 5. Employee Dimension Hierarchy
```
Employee
├── Department (Management, Kitchen, Service, Cashier)
├── Job Title (Manager, Barista, Cook, Cashier)
└── Individual Employee
    └── Performance Tier (Top, Average, Developing)
```

### 6. Payment Dimension Hierarchy
```
Payment
├── Payment Type (Card, Cash, Digital, Gift Card)
├── Card Brand (Visa, MasterCard, Amex, Discover)
└── Processing Method (Chip, Contactless, Swipe, Manual)
```

## Measures

### Core Sales Measures
- **Gross Sales Amount**: SUM(gross_sales_amount)
- **Net Sales Amount**: SUM(net_sales_amount)
- **Transaction Count**: COUNT(DISTINCT transaction_id)
- **Item Quantity**: SUM(item_quantity)
- **Average Transaction Value**: Net Sales / Transaction Count

### Profitability Measures
- **Total Cost**: SUM(total_cost)
- **Gross Profit**: Net Sales - Total Cost
- **Gross Profit Margin %**: (Gross Profit / Net Sales) * 100
- **Labor Cost**: SUM(total_labor_cost)
- **Labor Cost %**: (Labor Cost / Net Sales) * 100

### Discount & Adjustment Measures
- **Total Discounts**: SUM(discount_amount)
- **Total Comps**: SUM(comp_amount)
- **Total Modifiers**: SUM(modifier_amount)
- **Discount Rate %**: (Total Discounts / Gross Sales) * 100

### Operational Measures
- **Average Prep Time**: AVG(prep_time_minutes)
- **Order Accuracy %**: (Accurate Orders / Total Orders) * 100
- **Customer Satisfaction**: AVG(customer_satisfaction_score)
- **Peak Hour Sales %**: (Peak Hour Sales / Total Sales) * 100

### Customer Measures
- **Customer Count**: COUNT(DISTINCT customer_id)
- **New Customer Count**: COUNT(DISTINCT new_customer_id)
- **Customer Retention %**: (Returning Customers / Total Customers) * 100
- **Average Visit Frequency**: Transactions / Unique Customers

## Calculated Members

### Time Intelligence
- **Previous Period Sales**: Sales for comparable previous period
- **Sales Growth %**: ((Current Sales - Previous Sales) / Previous Sales) * 100
- **Year-to-Date Sales**: Cumulative sales from year start
- **Same Period Last Year**: Sales for same period in previous year

### Ranking Measures
- **Top 10 Items by Revenue**: TOPCOUNT(Items, 10, Net Sales)
- **Top 5 Locations by Profit**: TOPCOUNT(Locations, 5, Gross Profit)
- **Bottom 10% Performers**: BOTTOMCOUNT(Employees, 10%, Sales per Hour)

### Ratio Measures
- **Sales per Square Foot**: Net Sales / Store Square Footage
- **Sales per Employee Hour**: Net Sales / Total Hours Worked
- **Items per Transaction**: Total Items / Transaction Count
- **Modifier Attachment Rate**: (Transactions with Modifiers / Total Transactions) * 100

## Key Performance Indicators (KPIs)

### Financial KPIs
- **Daily Sales Target Achievement**: (Actual Sales / Target Sales) * 100
- **Profit Margin Target**: Target 25% gross profit margin
- **Labor Cost Target**: Target < 30% of sales
- **Food Cost Target**: Target < 35% of sales

### Operational KPIs
- **Average Order Fulfillment Time**: Target < 5 minutes
- **Order Accuracy Rate**: Target > 95%
- **Customer Satisfaction Score**: Target > 4.0/5.0
- **Employee Productivity**: Sales per labor hour

### Customer KPIs
- **Customer Retention Rate**: Target > 70%
- **Average Customer Lifetime Value**: Target $500+
- **New Customer Acquisition Rate**: Monthly growth target
- **Loyalty Program Participation**: Target > 60%

## MDX Query Examples

### 1. Top Modifiers on Top Selling Items
```mdx
SELECT 
  NON EMPTY {[Measures].[Net Sales Amount], [Measures].[Item Quantity], [Measures].[Modifier Attachment Rate]} ON COLUMNS,
  NON EMPTY TOPCOUNT(
    [Product].[Item].[Item].MEMBERS * [Product].[Modifier].[Modifier].MEMBERS,
    10,
    [Measures].[Net Sales Amount]
  ) ON ROWS
FROM [Square_Sales_Analytics]
WHERE [Time].[Month].[December 2024]
```

### 2. Sales by Location + Employee + Time
```mdx
SELECT 
  NON EMPTY {[Measures].[Net Sales Amount], [Measures].[Transaction Count], [Measures].[Labor Cost]} ON COLUMNS,
  NON EMPTY CROSSJOIN(
    [Location].[Store].[Store].MEMBERS,
    CROSSJOIN(
      [Employee].[Employee].[Employee].MEMBERS,
      [Time].[Day].[Day].MEMBERS
    )
  ) ON ROWS
FROM [Square_Sales_Analytics]
WHERE [Time].[Month].[December 2024]
```

### 3. Customer Segments by Item Categories + Payment Methods
```mdx
SELECT 
  NON EMPTY {[Measures].[Net Sales Amount], [Measures].[Customer Count], [Measures].[Average Transaction Value]} ON COLUMNS,
  NON EMPTY CROSSJOIN(
    [Customer].[Segment].[Segment].MEMBERS,
    CROSSJOIN(
      [Product].[Category].[Category].MEMBERS,
      [Payment].[Payment Type].[Payment Type].MEMBERS
    )
  ) ON ROWS
FROM [Square_Sales_Analytics]
WHERE [Time].[Quarter].[Q4 2024]
```

### 4. Discount Effectiveness Analysis
```mdx
WITH 
  MEMBER [Measures].[Discount Effectiveness] AS 
    [Measures].[Net Sales Amount] / [Measures].[Total Discounts]
SELECT 
  NON EMPTY {
    [Measures].[Total Discounts], 
    [Measures].[Net Sales Amount], 
    [Measures].[Discount Effectiveness],
    [Measures].[Transaction Count]
  } ON COLUMNS,
  NON EMPTY CROSSJOIN(
    [Product].[Category].[Category].MEMBERS,
    CROSSJOIN(
      [Time].[Month].[Month].MEMBERS,
      [Location].[Store].[Store].MEMBERS
    )
  ) ON ROWS
FROM [Square_Sales_Analytics]
WHERE [Time].[Year].[2024]
```

## Slice and Dice Examples

### 1. Drill Down Analysis
- **Start**: Total Sales by Quarter
- **Drill Down**: Quarter → Month → Week → Day → Hour
- **Cross-Dimension**: Add Location and Product Category at each level

### 2. Pivot Analysis
- **Rows**: Product Categories
- **Columns**: Time Periods (Months)
- **Values**: Net Sales, Quantity, Profit Margin
- **Filter**: Specific Location or Employee

### 3. Comparative Analysis
- **Compare**: Current Year vs Previous Year
- **Dimensions**: Location, Product Category, Customer Segment
- **Measures**: Sales Growth %, Customer Count Change, Profit Margin Change

### 4. What-If Scenarios
- **Scenario 1**: Increase prices by 5% - impact on sales volume
- **Scenario 2**: Reduce labor hours by 10% - impact on service quality
- **Scenario 3**: Expand loyalty program - impact on customer retention

## Aggregation Strategy

### Pre-Calculated Aggregations
1. **Daily Sales by Location**: Daily rollup for fast reporting
2. **Monthly Product Performance**: Monthly item-level aggregations
3. **Weekly Labor Analysis**: Employee productivity metrics
4. **Quarterly Customer Metrics**: Customer lifetime value calculations

### Dynamic Aggregations
1. **Real-time Transaction Totals**: Live sales dashboards
2. **Hourly Performance Metrics**: Peak hour analysis
3. **Custom Date Range Analysis**: Ad-hoc reporting
4. **Multi-dimensional Comparisons**: Cross-tab analysis

## Data Refresh Schedule

### Real-Time (< 1 minute)
- Transaction data
- Payment processing
- Inventory levels
- KDS operations

### Near Real-Time (5-15 minutes)
- Sales aggregations
- Customer metrics
- Employee performance
- Location summaries

### Batch Processing (Hourly/Daily)
- Profit calculations
- Customer lifetime value
- Comparative analysis
- Historical trending

## Security and Access Control

### Role-Based Access
- **Executive**: All dimensions and measures
- **Regional Manager**: Specific regions only
- **Store Manager**: Single location access
- **Analyst**: Read-only access to aggregated data

### Data Masking
- **Customer PII**: Masked for non-authorized users
- **Employee Wages**: Restricted to HR and management
- **Financial Details**: Aggregated view for operational staff

This OLAP cube definition provides a comprehensive framework for multi-dimensional analysis of Square POS data, supporting complex business intelligence requirements while maintaining performance and security.
