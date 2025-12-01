import json

# Your requested metrics and dimensions
requested_analysis = {
    "metric": "Gross Sales",
    "dimensions": [
        "Order Name",
        "Order ID", 
        "Device",
        "Device Nick name",
        "Channel",
        "Section", 
        "Employee",
        "Location",
        "Customer",
        "Customer Type (New, Returning, Loyalty..)",
        "Order Created",
        "Order Completed/Fulfilled",
        "Customer visit frequency"
    ]
}

# Square schema analysis
def analyze_square_schema_capabilities():
    
    print("🔍 SQUARE SCHEMA ANALYSIS - CAPABILITY CHECK")
    print("=" * 60)
    
    print(f"\n📊 REQUESTED METRIC: {requested_analysis['metric']}")
    print("=" * 40)
    
    # Check for Gross Sales metric
    gross_sales_options = [
        {
            "cube": "Orders",
            "measure": "top_line_product_sales", 
            "description": "Gross Sales - top-line product sales without counting refunds, discounts, comps, tips, tax, fees, or gift card sales",
            "availability": "✅ AVAILABLE",
            "notes": "This is exactly 'Gross Sales' as requested"
        },
        {
            "cube": "Orders", 
            "measure": "item_sales_amount",
            "description": "Total item sales including modifiers. Excludes returns, refunds, discounts, comps, taxes, tips, or gift card sales",
            "availability": "✅ AVAILABLE",
            "notes": "Alternative gross sales metric"
        },
        {
            "cube": "ItemTransactions",
            "measure": "item_gross_sales", 
            "description": "Gross sales amount (sales are positive, returns are negative)",
            "availability": "✅ AVAILABLE",
            "notes": "Item-level gross sales"
        }
    ]
    
    for option in gross_sales_options:
        print(f"  {option['availability']} {option['cube']}.{option['measure']}")
        print(f"     📝 {option['description']}")
        print(f"     💡 {option['notes']}\n")
    
    print("\n📋 REQUESTED DIMENSIONS ANALYSIS")
    print("=" * 40)
    
    # Analyze each requested dimension
    dimension_analysis = [
        {
            "requested": "Order Name",
            "square_equivalent": "❌ NOT AVAILABLE",
            "notes": "Square schema doesn't have 'Order Name' - orders are identified by Order ID only",
            "alternative": "Could use Order ID as identifier"
        },
        {
            "requested": "Order ID", 
            "square_equivalent": "✅ Orders.order_id",
            "notes": "Exact match available",
            "alternative": "Perfect match"
        },
        {
            "requested": "Device",
            "square_equivalent": "✅ PaymentAndRefunds.device_id", 
            "notes": "Available in PaymentAndRefunds cube",
            "alternative": "Links to payment processing device"
        },
        {
            "requested": "Device Nick name",
            "square_equivalent": "✅ PaymentAndRefunds.device_nickname",
            "notes": "Device's given name when created on Dashboard", 
            "alternative": "Exactly what you requested"
        },
        {
            "requested": "Channel",
            "square_equivalent": "✅ Orders.sales_channel_id + Channel.channel_name",
            "notes": "Sales channel information available",
            "alternative": "Can get channel name via Channel cube"
        },
        {
            "requested": "Section",
            "square_equivalent": "❌ NOT AVAILABLE", 
            "notes": "No 'Section' concept in Square schema",
            "alternative": "Could use Location or Category as grouping"
        },
        {
            "requested": "Employee",
            "square_equivalent": "✅ Orders.team_member_collected + PaymentAndRefunds.team_member_id",
            "notes": "Team member who collected payment available",
            "alternative": "Employee information available"
        },
        {
            "requested": "Location",
            "square_equivalent": "✅ Orders.location_id + Location.location_name", 
            "notes": "Full location information available",
            "alternative": "Complete location details"
        },
        {
            "requested": "Customer",
            "square_equivalent": "✅ Orders.customer_id",
            "notes": "Customer ID available in orders",
            "alternative": "Customer identification available"
        },
        {
            "requested": "Customer Type (New, Returning, Loyalty..)",
            "square_equivalent": "✅ CustomerSnapshots.customers_first_purchase_at_merchant + had_loyalty_at_purchase",
            "notes": "New vs returning customer data + loyalty status available",
            "alternative": "Comprehensive customer segmentation available"
        },
        {
            "requested": "Order Created",
            "square_equivalent": "✅ Orders.created_at",
            "notes": "Timestamp when order was created",
            "alternative": "Exact match"
        },
        {
            "requested": "Order Completed/Fulfilled", 
            "square_equivalent": "✅ Orders.sale_timestamp + Orders.state",
            "notes": "Sale timestamp (when payment received) + order state (COMPLETED, OPEN, etc.)",
            "alternative": "Order completion tracking available"
        },
        {
            "requested": "Customer visit frequency",
            "square_equivalent": "⚠️ PARTIALLY AVAILABLE",
            "notes": "Would need to calculate from CustomerSnapshots data - not pre-calculated",
            "alternative": "Can derive from customer transaction history"
        }
    ]
    
    available_count = 0
    partial_count = 0
    not_available_count = 0
    
    for dim in dimension_analysis:
        if "✅" in dim["square_equivalent"]:
            available_count += 1
            status_icon = "✅"
        elif "⚠️" in dim["square_equivalent"]:
            partial_count += 1
            status_icon = "⚠️"
        else:
            not_available_count += 1
            status_icon = "❌"
            
        print(f"{status_icon} {dim['requested']}")
        print(f"   🔗 Square: {dim['square_equivalent']}")
        print(f"   📝 {dim['notes']}")
        print(f"   💡 {dim['alternative']}\n")
    
    print("\n📊 SUMMARY ANALYSIS")
    print("=" * 40)
    print(f"✅ Fully Available: {available_count}/13 dimensions ({available_count/13*100:.1f}%)")
    print(f"⚠️ Partially Available: {partial_count}/13 dimensions") 
    print(f"❌ Not Available: {not_available_count}/13 dimensions")
    
    print(f"\n🎯 FEASIBILITY ASSESSMENT")
    print("=" * 40)
    
    if available_count >= 10:
        feasibility = "🟢 HIGH FEASIBILITY"
        recommendation = "Your analysis is highly feasible with Square's schema"
    elif available_count >= 7:
        feasibility = "🟡 MODERATE FEASIBILITY" 
        recommendation = "Most of your analysis is feasible with some modifications"
    else:
        feasibility = "🔴 LOW FEASIBILITY"
        recommendation = "Significant modifications needed for your analysis"
        
    print(f"{feasibility}")
    print(f"💡 {recommendation}")
    
    print(f"\n🔧 RECOMMENDED QUERY APPROACH")
    print("=" * 40)
    print("To get your requested analysis, you would need to:")
    print("1. Start with Orders cube for gross sales (top_line_product_sales)")
    print("2. Join with CustomerSnapshots for customer type classification")  
    print("3. Join with PaymentAndRefunds for device information")
    print("4. Join with Location cube for location names")
    print("5. Join with Channel cube for channel names")
    print("6. Calculate customer visit frequency from historical data")
    
    print(f"\n⚠️ LIMITATIONS & WORKAROUNDS")
    print("=" * 40)
    print("❌ Order Name: Use Order ID instead")
    print("❌ Section: Use Location or create custom grouping")
    print("⚠️ Customer Visit Frequency: Calculate from transaction history")
    
    print(f"\n✅ SAMPLE QUERY STRUCTURE")
    print("=" * 40)
    sample_query = """
    SELECT 
        Orders.order_id,
        Orders.top_line_product_sales AS gross_sales,
        PaymentAndRefunds.device_nickname,
        Channel.channel_name,
        Location.location_name,
        Orders.team_member_collected AS employee,
        Orders.customer_id,
        CustomerSnapshots.customers_first_purchase_at_merchant AS is_new_customer,
        CustomerSnapshots.had_loyalty_at_purchase AS has_loyalty,
        Orders.created_at AS order_created,
        Orders.sale_timestamp AS order_completed
    FROM Orders
    LEFT JOIN CustomerSnapshots ON Orders.order_id = CustomerSnapshots.id
    LEFT JOIN PaymentAndRefunds ON Orders.order_id = PaymentAndRefunds.order_id  
    LEFT JOIN Location ON Orders.location_id = Location.location_id
    LEFT JOIN Channel ON Orders.sales_channel_id = Channel.channel_id
    """
    print(sample_query)

if __name__ == "__main__":
    analyze_square_schema_capabilities()
