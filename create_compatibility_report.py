import csv
from datetime import datetime

def create_detailed_compatibility_report():
    """Create a detailed compatibility report comparing your requirements with Square schema"""
    
    # Your requirements analysis
    compatibility_data = [
        ['Your Requirement', 'Square Schema Equivalent', 'Availability Status', 'Cube Location', 'Field Name', 'Data Type', 'Notes & Limitations', 'Workaround/Alternative'],
        
        # Metric
        ['Gross Sales', 'top_line_product_sales', '✅ AVAILABLE', 'Orders', 'top_line_product_sales', 'Currency', 'Exact match - gross sales without discounts/returns/fees', 'Perfect match'],
        
        # Dimensions
        ['Order Name', 'N/A', '❌ NOT AVAILABLE', 'N/A', 'N/A', 'N/A', 'Square does not have order names, only IDs', 'Use Order ID as identifier'],
        ['Order ID', 'order_id', '✅ AVAILABLE', 'Orders', 'order_id', 'String', 'Unique identifier for each order', 'Perfect match'],
        ['Device', 'device_id', '✅ AVAILABLE', 'PaymentAndRefunds', 'device_id', 'String', 'Square-issued ID of the device', 'Available through payment data'],
        ['Device Nick name', 'device_nickname', '✅ AVAILABLE', 'PaymentAndRefunds', 'device_nickname', 'String', 'Device name set by seller on Dashboard', 'Exactly what you requested'],
        ['Channel', 'channel_name', '✅ AVAILABLE', 'Channel', 'channel_name', 'String', 'Display name of sales channel', 'Join with Channel cube via sales_channel_id'],
        ['Section', 'N/A', '❌ NOT AVAILABLE', 'N/A', 'N/A', 'N/A', 'No section concept in Square', 'Use Location or create custom grouping'],
        ['Employee', 'team_member_collected', '✅ AVAILABLE', 'Orders', 'team_member_collected', 'String', 'Team member who collected payment', 'Available in Orders cube'],
        ['Location', 'location_name', '✅ AVAILABLE', 'Location', 'location_name', 'String', 'Display name of location', 'Join with Location cube via location_id'],
        ['Customer', 'customer_id', '✅ AVAILABLE', 'Orders', 'customer_id', 'String', 'Customer associated with order', 'Customer ID available'],
        ['Customer Type (New/Returning/Loyalty)', 'customers_first_purchase_at_merchant + had_loyalty_at_purchase', '✅ AVAILABLE', 'CustomerSnapshots', 'Multiple fields', 'Boolean', 'New vs returning + loyalty status', 'Comprehensive customer segmentation'],
        ['Order Created', 'created_at', '✅ AVAILABLE', 'Orders', 'created_at', 'Time', 'Timestamp when order was created', 'Exact match'],
        ['Order Completed/Fulfilled', 'sale_timestamp + state', '✅ AVAILABLE', 'Orders', 'sale_timestamp, state', 'Time + String', 'When payment received + order status', 'Completion tracking available'],
        ['Customer visit frequency', 'Calculated field', '⚠️ PARTIALLY AVAILABLE', 'CustomerSnapshots', 'Derived', 'Number', 'Must calculate from transaction history', 'Calculate from customer order count over time']
    ]
    
    # Write compatibility report
    with open('/Users/divyac/financial-suite/Square_Compatibility_Report.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerows(compatibility_data)
    
    # Create implementation guide
    implementation_guide = [
        ['Step', 'Action', 'Cube(s) Involved', 'Fields Needed', 'Join Condition', 'Notes'],
        ['1', 'Get base order data with gross sales', 'Orders', 'order_id, top_line_product_sales, created_at, sale_timestamp, customer_id, location_id, sales_channel_id, team_member_collected, state', 'N/A (Primary cube)', 'This is your main data source'],
        ['2', 'Add customer segmentation', 'CustomerSnapshots', 'customers_first_purchase_at_merchant, had_loyalty_at_purchase', 'Orders.order_id = CustomerSnapshots.id', 'Get new/returning/loyalty status'],
        ['3', 'Add device information', 'PaymentAndRefunds', 'device_id, device_nickname', 'Orders.order_id = PaymentAndRefunds.order_id', 'Device details from payment processing'],
        ['4', 'Add location names', 'Location', 'location_name', 'Orders.location_id = Location.location_id', 'Get readable location names'],
        ['5', 'Add channel names', 'Channel', 'channel_name', 'Orders.sales_channel_id = Channel.channel_id', 'Get readable channel names'],
        ['6', 'Calculate customer visit frequency', 'CustomerSnapshots + Orders', 'Count of orders per customer', 'Group by customer_id', 'Requires aggregation query']
    ]
    
    with open('/Users/divyac/financial-suite/Square_Implementation_Guide.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerows(implementation_guide)
    
    # Create sample queries
    sample_queries = [
        ['Query Purpose', 'Query Type', 'SQL Example', 'Expected Output'],
        ['Basic Gross Sales by Order', 'Simple Select', 'SELECT order_id, top_line_product_sales AS gross_sales, created_at FROM Orders WHERE created_at >= "2024-01-01"', 'Order ID, Gross Sales Amount, Order Date'],
        ['Gross Sales with Customer Type', 'Join Query', 'SELECT o.order_id, o.top_line_product_sales, cs.customers_first_purchase_at_merchant FROM Orders o LEFT JOIN CustomerSnapshots cs ON o.order_id = cs.id', 'Order details with new/returning customer flag'],
        ['Complete Analysis Query', 'Multi-Join', 'SELECT o.order_id, o.top_line_product_sales, pr.device_nickname, c.channel_name, l.location_name, o.team_member_collected, cs.customers_first_purchase_at_merchant FROM Orders o LEFT JOIN CustomerSnapshots cs ON o.order_id = cs.id LEFT JOIN PaymentAndRefunds pr ON o.order_id = pr.order_id LEFT JOIN Location l ON o.location_id = l.location_id LEFT JOIN Channel c ON o.sales_channel_id = c.channel_id', 'All requested dimensions with gross sales'],
        ['Customer Visit Frequency', 'Aggregation', 'SELECT customer_id, COUNT(*) as visit_frequency FROM Orders WHERE customer_id IS NOT NULL GROUP BY customer_id', 'Customer ID with visit count']
    ]
    
    with open('/Users/divyac/financial-suite/Square_Sample_Queries.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerows(sample_queries)
    
    # Create final summary
    summary_stats = [
        ['Metric', 'Value', 'Details'],
        ['Overall Feasibility', '🟢 HIGH (76.9%)', '10 out of 13 dimensions fully available'],
        ['Gross Sales Metric', '✅ PERFECT MATCH', 'Orders.top_line_product_sales is exactly what you need'],
        ['Fully Available Dimensions', '10', 'Order ID, Device, Device Nickname, Channel, Employee, Location, Customer, Customer Type, Order Created, Order Completed'],
        ['Partially Available', '1', 'Customer visit frequency (can be calculated)'],
        ['Not Available', '2', 'Order Name, Section'],
        ['Primary Cubes Needed', '5', 'Orders, CustomerSnapshots, PaymentAndRefunds, Location, Channel'],
        ['Join Complexity', 'Medium', '4-5 table joins required for complete analysis'],
        ['Real-time Capability', '✅ YES', 'OrdersLive cube available for real-time data'],
        ['Recommended Approach', 'Multi-cube join', 'Start with Orders cube and join others as needed']
    ]
    
    with open('/Users/divyac/financial-suite/Square_Analysis_Summary.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerows(summary_stats)
    
    print("📊 COMPATIBILITY ANALYSIS COMPLETE!")
    print("=" * 50)
    print("Files created:")
    print("1. Square_Compatibility_Report.csv - Detailed field mapping")
    print("2. Square_Implementation_Guide.csv - Step-by-step implementation")  
    print("3. Square_Sample_Queries.csv - Example SQL queries")
    print("4. Square_Analysis_Summary.csv - Executive summary")
    
    print(f"\n🎯 BOTTOM LINE:")
    print("✅ Your analysis IS FEASIBLE with Square's schema!")
    print("✅ 76.9% of your dimensions are directly available")
    print("✅ Gross Sales metric is a perfect match")
    print("⚠️ 2 dimensions need workarounds (Order Name, Section)")
    print("⚠️ 1 dimension needs calculation (Customer visit frequency)")

if __name__ == "__main__":
    create_detailed_compatibility_report()
