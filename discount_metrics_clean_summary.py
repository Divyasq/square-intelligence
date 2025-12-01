import csv

def create_clean_discount_summary():
    """Create a clean, readable summary of discount metrics vs dimensions"""
    
    print("💰 DISCOUNT METRICS vs DIMENSIONS - CLEAN SUMMARY")
    print("=" * 60)
    
    # Clean summary table
    clean_summary = [
        ['Discount Metric', 'Available in Square?', 'Key Dimensions Available', 'Key Dimensions Missing', 'Coverage', 'Status'],
        
        ['Amount Discounted (Order)', '✅ discounts_amount (Orders)', 'Order ID, Employee, Location, Order Created, Order Completed, Channel, Device, Source', 'Customer Type, Section, Discount Name, Item context', '8/46 (17%)', '🟠 MODERATE'],
        ['Amount Discounted (Item)', '✅ total_discount_and_comp_amount', 'Discount Name, Item Type, Location, Order ID, Order Created', 'Employee, Customer Type, Device, Item Name, Section', '6/46 (13%)', '🟡 LIMITED'],
        ['Discounts Applied', '✅ discounts_applied_count', 'Discount Name, Item Type, Location, Order ID, Order Created', 'Employee, Customer Type, Device, Item Name, Section', '6/46 (13%)', '🟡 LIMITED'],
        ['Orders Discounted', '✅ orders_count', 'Discount Name, Item Type, Location, Order ID, Order Created', 'Employee, Customer Type, Device, Item Name, Section', '6/46 (13%)', '🟡 LIMITED'],
        ['Items Discounted', '✅ count', 'Discount Name, Item Type, Location, Order ID, Order Created', 'Employee, Customer Type, Device, Item Name, Section', '6/46 (13%)', '🟡 LIMITED'],
        ['Gift Card Amount Discounted', '✅ gift_card_discount_amount', 'Discount Name, Item Type, Location, Order ID, Order Created', 'Employee, Customer Type, Device, Item Name, Section', '6/46 (13%)', '🟡 LIMITED'],
        ['Gift Card Discounts Applied', '⚠️ Filtered gift_card_discount_amount', 'Discount Name, Item Type, Location, Order ID, Order Created', 'Employee, Customer Type, Device, Item Name, Section', '6/46 (13%)', '🟡 LIMITED']
    ]
    
    # Dimension availability breakdown
    dimension_breakdown = [
        ['Dimension Category', 'Available Dimensions', 'Missing Dimensions', 'Enhancement Needed'],
        
        ['✅ DIRECTLY AVAILABLE', 'Discount Name (item-level), Item Type, Location, Order ID, Order Created', 'Most operational context', 'None - these work now'],
        ['⚠️ VIA JOINS NEEDED', 'Employee, Customer Type, Device, Channel, Order Completed, Item Name, Category', 'Requires joins to Orders/CustomerSnapshots/PaymentAndRefunds/ItemTransactions', 'Add joins to discount cubes'],
        ['❌ COMPLETELY MISSING', 'Section, Comp Reason, Customer Name, Item Notes, GTIN, Vendor Info, Menu, Manager', 'Not in Square schema', 'Add new fields/cubes'],
        ['🔴 RESTAURANT-SPECIFIC', 'Combo Name, Dining Option, Reporting Category, Measurement Unit', 'Restaurant concepts not in Square', 'Add restaurant-specific fields']
    ]
    
    # Discount-specific analysis
    discount_specific_analysis = [
        ['Analysis Type', 'Current Capability', 'Missing Capability', 'Business Impact', 'Enhancement Priority'],
        
        ['Discount Usage by Employee', 'Cannot track directly', 'Employee who applied discount', 'Cannot identify staff discount patterns', 'HIGH'],
        ['Discount Effectiveness by Customer Type', 'Cannot track directly', 'Customer segment analysis', 'Cannot optimize discounts for customer types', 'HIGH'],
        ['Item-specific Discount Analysis', 'Limited - only item type', 'Specific item names, categories', 'Cannot see which products get discounted most', 'HIGH'],
        ['Comp Reason Tracking', 'Not available', 'Why comps are given', 'Cannot understand comp patterns', 'MEDIUM'],
        ['Discount Performance by Location Section', 'Location only', 'Section/department within location', 'Cannot optimize discounts by restaurant area', 'MEDIUM'],
        ['Gift Card Promotion Analysis', 'Basic amount tracking', 'Detailed gift card promotion metrics', 'Limited gift card marketing insights', 'LOW']
    ]
    
    # Critical enhancement recommendations
    enhancement_recommendations = [
        ['Enhancement', 'Metrics Improved', 'Business Value', 'Technical Complexity', 'Priority', 'Timeline'],
        
        ['Add Employee context to discount cubes', 'All discount metrics', 'Track staff discount usage patterns', 'Medium', 'HIGH', '3-4 weeks'],
        ['Add Customer Type to discount analysis', 'All discount metrics', 'Discount effectiveness by customer segment', 'Medium', 'HIGH', '3-4 weeks'],
        ['Add Item Name context to discount cubes', 'Item-level discount metrics', 'See which products get discounted most', 'Medium', 'HIGH', '2-3 weeks'],
        ['Add Comp Reason field', 'Comp-related metrics', 'Understand why comps are given', 'Low', 'MEDIUM', '1-2 weeks'],
        ['Add Section/Department concept', 'All discount metrics', 'Departmental discount analysis', 'High', 'MEDIUM', '6-8 weeks'],
        ['Add Discount Categories/Types', 'All discount metrics', 'Group discounts by type (%, $, etc.)', 'Medium', 'MEDIUM', '2-3 weeks']
    ]
    
    # Write files
    with open('/Users/divyac/financial-suite/Discount_Metrics_Clean_Summary.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerows(clean_summary)
    
    with open('/Users/divyac/financial-suite/Discount_Dimensions_Breakdown.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerows(dimension_breakdown)
    
    with open('/Users/divyac/financial-suite/Discount_Specific_Analysis.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerows(discount_specific_analysis)
    
    with open('/Users/divyac/financial-suite/Discount_Enhancement_Recommendations.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerows(enhancement_recommendations)
    
    print("\n📊 DISCOUNT METRICS AVAILABILITY:")
    print("✅ AVAILABLE: 6/6 metrics (100%)")
    print("❌ MISSING: 0/6 metrics")
    
    print("\n📏 DIMENSION COVERAGE:")
    print("🟠 BEST: Order-level discounts (17% coverage - 8/46 dimensions)")
    print("🟡 TYPICAL: Item-level discounts (13% coverage - 6/46 dimensions)")
    print("📊 AVERAGE: 14% coverage across all discount metrics")
    
    print("\n🔍 KEY AVAILABLE DIMENSIONS:")
    print("✅ Discount Name (item-level), Location, Order ID, Order Created")
    print("⚠️ Employee, Customer Type, Device (via joins)")
    print("❌ Section, Comp Reason, Item Names (missing)")
    
    print("\n🚨 CRITICAL GAPS:")
    print("1. No employee context → Can't track staff discount usage")
    print("2. No customer type → Can't analyze discount effectiveness by segment") 
    print("3. No item names → Can't see which products get discounted most")
    print("4. No comp reasons → Can't understand why comps are given")
    
    print("\n💡 KEY INSIGHTS:")
    print("• ALL discount metrics exist in Square schema")
    print("• Order-level discounts have better dimensional coverage than item-level")
    print("• Discount Name is available for item-level analysis")
    print("• Most operational context requires JOINS to other cubes")
    
    print("\n🎯 BOTTOM LINE:")
    print("• Discount metrics are available but have LIMITED operational context")
    print("• Need JOINS to other cubes for employee/customer/item info")
    print("• Item-level discounts have discount names but missing item details")
    print("• Discount analysis is possible but requires enhancement for full insight")
    
    print("\n📁 FILES CREATED:")
    print("1. Discount_Metrics_Clean_Summary.csv")
    print("2. Discount_Dimensions_Breakdown.csv") 
    print("3. Discount_Specific_Analysis.csv")
    print("4. Discount_Enhancement_Recommendations.csv")

if __name__ == "__main__":
    create_clean_discount_summary()
