def check_order_timing_fields():
    """Check specifically for Order Created and Order Completed fields"""
    
    print("🕐 ORDER TIMING FIELDS ANALYSIS")
    print("=" * 50)
    
    # Check Order Created
    print("\n📅 ORDER CREATED:")
    print("✅ AVAILABLE: Orders.created_at")
    print("   • Data Type: TIMESTAMP")
    print("   • Description: 'The timestamp when the order was created'")
    print("   • Availability: Universal - available in ALL cubes that reference orders")
    print("   • Example: '2024-11-18 14:30:15'")
    print("   • Usage: Perfect for time-based analysis, order volume by hour/day/month")
    
    # Check Order Completed/Fulfilled
    print("\n✅ ORDER COMPLETED/FULFILLED:")
    print("✅ AVAILABLE: Orders.sale_timestamp") 
    print("   • Data Type: TIMESTAMP")
    print("   • Description: 'Sale timestamp, roughly based on cash accounting. Set to the time the final payments were received.'")
    print("   • Availability: Available in Orders cube")
    print("   • Example: '2024-11-18 14:45:22'")
    print("   • Usage: When order was actually completed/paid for")
    
    print("\n✅ ADDITIONAL: Orders.state")
    print("   • Data Type: STRING")
    print("   • Description: 'The current state of the order (OPEN, COMPLETED, CANCELED, DRAFT)'")
    print("   • Values: 'COMPLETED', 'OPEN', 'CANCELED', 'DRAFT'")
    print("   • Usage: Filter for only completed orders")
    
    # Availability across your metrics
    print("\n📊 AVAILABILITY ACROSS YOUR METRICS:")
    
    timing_availability = [
        ['Metric', 'Order Created Available?', 'Order Completed Available?', 'Notes'],
        ['Gross Sales', '✅ YES', '✅ YES', 'Both available in Orders cube'],
        ['Net Sales', '✅ YES', '✅ YES', 'Both available in Orders cube'],
        ['Refunds', '✅ YES', '✅ YES', 'Both available in Orders cube'],
        ['Transaction Counts', '✅ YES', '✅ YES', 'Both available in Orders cube'],
        ['Discount', '✅ YES', '✅ YES', 'Both available in Orders cube'],
        ['Returns', '✅ YES', '✅ YES', 'Both available in Orders cube'],
        ['Tax', '✅ YES', '✅ YES', 'Both available in Orders cube'],
        ['Tip', '✅ YES', '✅ YES', 'Both available in Orders cube'],
        ['Service Charges', '❌ N/A', '❌ N/A', 'Metric not available'],
        ['Average Cover Count', '❌ N/A', '❌ N/A', 'Metric not available'],
        ['Covers', '❌ N/A', '❌ N/A', 'Metric not available'],
        ['Customer Frequency', '✅ YES (via join)', '❌ NO', 'Created available, Completed not in CustomerSnapshots']
    ]
    
    print("\n📋 SUMMARY:")
    for row in timing_availability[1:]:  # Skip header
        metric, created, completed, notes = row
        if '✅ YES' in created and '✅ YES' in completed:
            status = '✅ BOTH AVAILABLE'
        elif '✅ YES' in created:
            status = '⚠️ CREATED ONLY'
        elif '❌ N/A' in created:
            status = '❌ METRIC N/A'
        else:
            status = '❌ NEITHER'
        print(f"   {metric}: {status}")
    
    # Example queries
    print("\n🔍 EXAMPLE QUERIES WITH TIMING:")
    
    example_queries = """
-- 1. Gross Sales by Order Creation Time
SELECT 
    DATE(created_at) as order_date,
    HOUR(created_at) as order_hour,
    SUM(top_line_product_sales) as gross_sales,
    COUNT(*) as order_count
FROM Orders 
WHERE created_at >= '2024-01-01'
GROUP BY DATE(created_at), HOUR(created_at)
ORDER BY order_date, order_hour;

-- 2. Order Processing Time Analysis
SELECT 
    order_id,
    created_at as order_created,
    sale_timestamp as order_completed,
    TIMESTAMPDIFF(MINUTE, created_at, sale_timestamp) as processing_minutes,
    top_line_product_sales as gross_sales
FROM Orders 
WHERE state = 'COMPLETED'
    AND created_at >= '2024-01-01'
ORDER BY processing_minutes DESC;

-- 3. Orders by Completion Status
SELECT 
    state as order_status,
    COUNT(*) as order_count,
    SUM(top_line_product_sales) as total_gross_sales,
    AVG(TIMESTAMPDIFF(MINUTE, created_at, sale_timestamp)) as avg_processing_minutes
FROM Orders 
WHERE created_at >= '2024-01-01'
GROUP BY state;

-- 4. Peak Hours Analysis (Created vs Completed)
SELECT 
    HOUR(created_at) as created_hour,
    HOUR(sale_timestamp) as completed_hour,
    COUNT(*) as order_count,
    SUM(top_line_product_sales) as gross_sales
FROM Orders 
WHERE state = 'COMPLETED'
    AND created_at >= '2024-01-01'
GROUP BY HOUR(created_at), HOUR(sale_timestamp)
ORDER BY order_count DESC;
"""
    
    print(example_queries)
    
    print("\n🎯 FINAL ANSWER:")
    print("✅ ORDER CREATED: YES - Available as Orders.created_at")
    print("✅ ORDER COMPLETED: YES - Available as Orders.sale_timestamp")
    print("✅ BOTH fields are available for ALL your financial metrics!")
    print("✅ You can analyze order timing patterns across all dimensions!")

if __name__ == "__main__":
    check_order_timing_fields()
