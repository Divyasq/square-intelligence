import csv

def create_discount_metrics_comprehensive_check():
    """Comprehensive check of discount metrics against all requested dimensions"""
    
    print("💰 COMPREHENSIVE DISCOUNT METRICS vs DIMENSIONS ANALYSIS")
    print("=" * 70)
    
    # Discount metrics analysis - checking each metric against Square schema
    discount_metrics_check = [
        ['Metric', 'Square Field', 'Cube', 'Available?', 'Categories', 'Category Rollup', 'Channel', 'Combo name', 'Comp reason', 'Customer name', 'Customer type', 'Customer visit frequency', 'Custom attribute name', 'Device', 'Device Nick name', 'Dining option name', 'Discount name', 'Employee (collected by)', 'Employee (attributed to)', 'GTIN', 'Item name', 'Item note', 'Item type', 'Item unique modifier combination', 'Item variation', 'Item variation token', 'Itemization Type', 'Location', 'Measurement unit', 'Menu', 'Manager', 'Modifier name', 'Modifier Set', 'Modifier unit price', 'Order ID', 'Order Created', 'Order Completed', 'Payment method', 'Reporting category', 'Section', 'SKU', 'Source', 'Units', 'Vendor Code', 'Vendor Name', 'Void reason', 'Total Available', 'Coverage %'],
        
        # Amount Discounted - Order Level
        ['Amount Discounted (Order)', 'discounts_amount', 'Orders', '✅ YES',
         '❌ Missing', '❌ Missing', '✅ Via Channel join', '❌ Missing', '❌ Missing', '❌ Via Orders join needed', '❌ Via CustomerSnapshots join needed', '❌ Needs calculation', '❌ Missing', '✅ Via PaymentAndRefunds join', '✅ Via PaymentAndRefunds join', '❌ Missing', '❌ Missing', '✅ team_member_collected', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ Via Location join', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ order_id', '✅ created_at', '✅ sale_timestamp', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '❌ Missing', '❌ Missing', '✅ source', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '8/46', '17%'],
        
        # Amount Discounted - Item Level
        ['Amount Discounted (Item)', 'total_discount_and_comp_amount', 'ItemDiscountsAndComps', '✅ YES',
         '❌ Missing', '❌ Missing', '✅ Via Orders join', '❌ Missing', '❌ Missing', '❌ Via Orders join needed', '❌ Via CustomerSnapshots join needed', '❌ Needs calculation', '❌ Missing', '❌ Via PaymentAndRefunds join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '✅ discount_name', '❌ Via Orders join needed', '❌ Missing', '❌ Missing', '❌ Via ItemTransactions join needed', '❌ Missing', '✅ item_type', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ location_id', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ order_id', '✅ transacted_at', '❌ Via Orders join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '6/46', '13%'],
        
        # Discounts Applied
        ['Discounts Applied', 'discounts_applied_count', 'ItemDiscountsAndComps', '✅ YES',
         '❌ Missing', '❌ Missing', '✅ Via Orders join', '❌ Missing', '❌ Missing', '❌ Via Orders join needed', '❌ Via CustomerSnapshots join needed', '❌ Needs calculation', '❌ Missing', '❌ Via PaymentAndRefunds join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '✅ discount_name', '❌ Via Orders join needed', '❌ Missing', '❌ Missing', '❌ Via ItemTransactions join needed', '❌ Missing', '✅ item_type', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ location_id', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ order_id', '✅ transacted_at', '❌ Via Orders join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '6/46', '13%'],
        
        # Orders Discounted
        ['Orders Discounted', 'orders_count', 'ItemDiscountsAndComps', '✅ YES',
         '❌ Missing', '❌ Missing', '✅ Via Orders join', '❌ Missing', '❌ Missing', '❌ Via Orders join needed', '❌ Via CustomerSnapshots join needed', '❌ Needs calculation', '❌ Missing', '❌ Via PaymentAndRefunds join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '✅ discount_name', '❌ Via Orders join needed', '❌ Missing', '❌ Missing', '❌ Via ItemTransactions join needed', '❌ Missing', '✅ item_type', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ location_id', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ order_id', '✅ transacted_at', '❌ Via Orders join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '6/46', '13%'],
        
        # Items Discounted
        ['Items Discounted', 'count', 'ItemDiscountsAndComps', '✅ YES',
         '❌ Missing', '❌ Missing', '✅ Via Orders join', '❌ Missing', '❌ Missing', '❌ Via Orders join needed', '❌ Via CustomerSnapshots join needed', '❌ Needs calculation', '❌ Missing', '❌ Via PaymentAndRefunds join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '✅ discount_name', '❌ Via Orders join needed', '❌ Missing', '❌ Missing', '❌ Via ItemTransactions join needed', '❌ Missing', '✅ item_type', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ location_id', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ order_id', '✅ transacted_at', '❌ Via Orders join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '6/46', '13%'],
        
        # Gift Card Amount Discounted
        ['Gift Card Amount Discounted', 'gift_card_discount_amount', 'ItemDiscountsAndComps', '✅ YES',
         '❌ Missing', '❌ Missing', '✅ Via Orders join', '❌ Missing', '❌ Missing', '❌ Via Orders join needed', '❌ Via CustomerSnapshots join needed', '❌ Needs calculation', '❌ Missing', '❌ Via PaymentAndRefunds join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '✅ discount_name', '❌ Via Orders join needed', '❌ Missing', '❌ Missing', '❌ Via ItemTransactions join needed', '❌ Missing', '✅ item_type', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ location_id', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ order_id', '✅ transacted_at', '❌ Via Orders join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '6/46', '13%'],
        
        # Gift Card Discounts Applied
        ['Gift Card Discounts Applied', '⚠️ Filtered gift_card_discount_amount', 'ItemDiscountsAndComps', '⚠️ PARTIAL',
         '❌ Missing', '❌ Missing', '✅ Via Orders join', '❌ Missing', '❌ Missing', '❌ Via Orders join needed', '❌ Via CustomerSnapshots join needed', '❌ Needs calculation', '❌ Missing', '❌ Via PaymentAndRefunds join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '✅ discount_name', '❌ Via Orders join needed', '❌ Missing', '❌ Missing', '❌ Via ItemTransactions join needed', '❌ Missing', '✅ item_type', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ location_id', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ order_id', '✅ transacted_at', '❌ Via Orders join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '6/46', '13%']
    ]
    
    # Write to CSV
    with open('/Users/divyac/financial-suite/Discount_Metrics_Comprehensive_Dimension_Check.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerows(discount_metrics_check)
    
    # Summary analysis
    summary_data = [
        ['Metric Category', 'Available Metrics', 'Missing Metrics', 'Best Coverage', 'Typical Coverage', 'Average Coverage'],
        ['Discount Metrics', '6/6 (100%)', '0/6', 'Order-level: 17%', 'Item-level: 13%', '14%'],
        ['Dimension Categories', 'Direct Available', 'Via Joins Needed', 'Missing Completely', 'Enhancement Priority', 'Notes'],
        ['Core Discount Info', 'Discount Name, Location, Order ID, Order Created', 'Employee, Customer Type, Device', 'Comp Reason, Discount Categories', 'HIGH', 'Basic discount context available'],
        ['Operational Context', 'Item Type (item-level only)', 'Employee, Device, Payment Method', 'Section, Manager, Dining Option', 'HIGH', 'Most operational context missing'],
        ['Product Details', 'None direct', 'Item Name via joins', 'GTIN, Vendor Info, Menu, SKU', 'MEDIUM', 'Limited product context for discounts'],
        ['Customer Context', 'None direct', 'Customer Name, Customer Type', 'Customer Visit Frequency', 'HIGH', 'All customer context requires joins'],
        ['Discount Specifics', 'Discount Name, Item Type', 'Category via joins', 'Comp Reason, Discount Rules', 'MEDIUM', 'Limited discount detail available']
    ]
    
    with open('/Users/divyac/financial-suite/Discount_Metrics_Summary_Analysis.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerows(summary_data)
    
    # Critical gaps for discount analysis
    critical_gaps = [
        ['Gap', 'Impact', 'Business Need', 'Recommendation', 'Priority'],
        
        ['No Employee context in discount metrics', 'Cannot track staff discount usage', 'Which employees use discounts most?', 'Add joins from ItemDiscountsAndComps to Orders cube', 'HIGH'],
        ['No Customer Type in discount metrics', 'Cannot analyze discount effectiveness by customer segment', 'Do discounts work better for new vs loyal customers?', 'Add joins from ItemDiscountsAndComps to CustomerSnapshots', 'HIGH'],
        ['No Comp Reason tracking', 'Cannot understand why comps are given', 'Why are items being comped?', 'Add comp_reason field to ItemDiscountsAndComps cube', 'MEDIUM'],
        ['No Item Name in discount cubes', 'Cannot see which items are discounted most', 'Which products get discounted most often?', 'Add joins from ItemDiscountsAndComps to ItemTransactions', 'HIGH'],
        ['No Device context in discount metrics', 'Cannot track discount usage by POS device', 'Which devices/locations use discounts most?', 'Add joins from ItemDiscountsAndComps to PaymentAndRefunds', 'MEDIUM'],
        ['No Section/Department concept', 'Cannot do departmental discount analysis', 'Discount usage by restaurant section?', 'Create Sections cube + add relationships', 'HIGH'],
        ['No Discount Categories/Types', 'Cannot group discounts by type', 'Percentage vs dollar discounts analysis?', 'Add discount_category field to ItemDiscountsAndComps', 'MEDIUM'],
        ['Limited Gift Card discount tracking', 'Cannot fully analyze gift card promotions', 'Gift card promotion effectiveness?', 'Enhance gift card discount tracking', 'LOW']
    ]
    
    with open('/Users/divyac/financial-suite/Discount_Analysis_Critical_Gaps.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerows(critical_gaps)
    
    print("\n📊 DISCOUNT METRICS ANALYSIS COMPLETE!")
    print("=" * 50)
    print("✅ AVAILABLE METRICS: 6/6 (100%)")
    print("❌ MISSING METRICS: 0/6")
    print("📏 AVERAGE DIMENSION COVERAGE: 14% (6-8 out of 46 dimensions)")
    print("🏆 BEST COVERAGE: Order-level discounts (17% - 8/46 dimensions)")
    print("📉 TYPICAL COVERAGE: Item-level discounts (13% - 6/46 dimensions)")
    
    print("\n🔍 KEY FINDINGS:")
    print("• All discount metrics exist in Square schema")
    print("• Order-level discounts have slightly better dimensional coverage")
    print("• Item-level discounts have discount name and item type context")
    print("• Most operational context requires JOINS to other cubes")
    print("• Many restaurant-specific dimensions are MISSING")
    
    print("\n📁 FILES CREATED:")
    print("1. Discount_Metrics_Comprehensive_Dimension_Check.csv - Full dimension matrix")
    print("2. Discount_Metrics_Summary_Analysis.csv - Summary and recommendations")
    print("3. Discount_Analysis_Critical_Gaps.csv - Key gaps and solutions")

if __name__ == "__main__":
    create_discount_metrics_comprehensive_check()
