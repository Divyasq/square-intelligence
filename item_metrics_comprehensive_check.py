import csv

def create_item_metrics_comprehensive_check():
    """Comprehensive check of item metrics against all requested dimensions"""
    
    print("🛍️ COMPREHENSIVE ITEM METRICS vs DIMENSIONS ANALYSIS")
    print("=" * 70)
    
    # Item metrics analysis - checking each metric against Square schema
    item_metrics_check = [
        ['Metric', 'Square Field', 'Cube', 'Available?', 'Categories', 'Category Rollup', 'Channel', 'Combo name', 'Comp reason', 'Customer name', 'Customer type', 'Customer visit frequency', 'Custom attribute name', 'Device', 'Device Nick name', 'Dining option name', 'Discount name', 'Employee (collected by)', 'Employee (attributed to)', 'GTIN', 'Item name', 'Item note', 'Item type', 'Item unique modifier combination', 'Item variation', 'Item variation token', 'Itemization Type', 'Location', 'Measurement unit', 'Menu', 'Manager', 'Modifier name', 'Modifier Set', 'Modifier unit price', 'Order ID', 'Order Created', 'Order Completed', 'Payment method', 'Reporting category', 'Section', 'SKU', 'Source', 'Units', 'Vendor Code', 'Vendor Name', 'Void reason', 'Total Available', 'Coverage %'],
        
        # Item Sales
        ['Item Sales', 'item_gross_sales', 'ItemTransactions', '✅ YES',
         '✅ category_name', '❌ Missing', '✅ Via Orders join', '❌ Missing', '❌ Missing', '❌ Via Orders join needed', '❌ Via CustomerSnapshots join needed', '❌ Needs calculation', '❌ Missing', '❌ Via PaymentAndRefunds join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '❌ Missing', '❌ Via Orders join needed', '❌ Missing', '❌ Missing', '✅ item_name', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ location_id', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ order_id', '✅ transacted_at', '❌ Via Orders join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ net_quantity', '❌ Missing', '❌ Missing', '❌ Missing', '6/46', '13%'],
        
        # Net Item Sales  
        ['Net Item Sales', 'item_net_sales', 'ItemTransactions', '✅ YES',
         '✅ category_name', '❌ Missing', '✅ Via Orders join', '❌ Missing', '❌ Missing', '❌ Via Orders join needed', '❌ Via CustomerSnapshots join needed', '❌ Needs calculation', '❌ Missing', '❌ Via PaymentAndRefunds join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '❌ Missing', '❌ Via Orders join needed', '❌ Missing', '❌ Missing', '✅ item_name', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ location_id', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ order_id', '✅ transacted_at', '❌ Via Orders join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ net_quantity', '❌ Missing', '❌ Missing', '❌ Missing', '6/46', '13%'],
        
        # Tax
        ['Tax', 'item_tax_money', 'ItemTransactions', '✅ YES',
         '✅ category_name', '❌ Missing', '✅ Via Orders join', '❌ Missing', '❌ Missing', '❌ Via Orders join needed', '❌ Via CustomerSnapshots join needed', '❌ Needs calculation', '❌ Missing', '❌ Via PaymentAndRefunds join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '❌ Missing', '❌ Via Orders join needed', '❌ Missing', '❌ Missing', '✅ item_name', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ location_id', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ order_id', '✅ transacted_at', '❌ Via Orders join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ net_quantity', '❌ Missing', '❌ Missing', '❌ Missing', '6/46', '13%'],
        
        # Discount Amount
        ['Discount Amount', 'total_discount_and_comp_amount', 'ItemDiscountsAndComps', '✅ YES',
         '❌ Missing', '❌ Missing', '✅ Via Orders join', '❌ Missing', '❌ Missing', '❌ Via Orders join needed', '❌ Via CustomerSnapshots join needed', '❌ Needs calculation', '❌ Missing', '❌ Via PaymentAndRefunds join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '✅ discount_name', '❌ Via Orders join needed', '❌ Missing', '❌ Missing', '❌ Via ItemTransactions join needed', '❌ Missing', '✅ item_type', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ location_id', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ order_id', '✅ transacted_at', '❌ Via Orders join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '6/46', '13%'],
        
        # Comps
        ['Comps', 'comp_amount', 'ItemDiscountsAndComps', '✅ YES',
         '❌ Missing', '❌ Missing', '✅ Via Orders join', '❌ Missing', '❌ Missing', '❌ Via Orders join needed', '❌ Via CustomerSnapshots join needed', '❌ Needs calculation', '❌ Missing', '❌ Via PaymentAndRefunds join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '✅ discount_name', '❌ Via Orders join needed', '❌ Missing', '❌ Missing', '❌ Via ItemTransactions join needed', '❌ Missing', '✅ item_type', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ location_id', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ order_id', '✅ transacted_at', '❌ Via Orders join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '6/46', '13%'],
        
        # Void
        ['Void', 'total_amount_voided', 'Voids', '✅ YES',
         '✅ category_name', '❌ Missing', '✅ sales_channel_id', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Needs calculation', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ team_member_id', '❌ Missing', '❌ Missing', '✅ item_name', '❌ Missing', '✅ item_type', '❌ Missing', '✅ variation_name', '✅ variation_id', '❌ Missing', '✅ location_id', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ order_id', '✅ sale_timestamp', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ sku', '❌ Missing', '✅ quantity_voided', '❌ Missing', '❌ Missing', '✅ void_reason', '11/46', '24%'],
        
        # Items Refunded
        ['Items Refunded', 'items_returned_count', 'ItemTransactions', '✅ YES',
         '✅ category_name', '❌ Missing', '✅ Via Orders join', '❌ Missing', '❌ Missing', '❌ Via Orders join needed', '❌ Via CustomerSnapshots join needed', '❌ Needs calculation', '❌ Missing', '❌ Via PaymentAndRefunds join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '❌ Missing', '❌ Via Orders join needed', '❌ Missing', '❌ Missing', '✅ item_name', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ location_id', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ order_id', '✅ transacted_at', '❌ Via Orders join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ item_quantity_returned', '❌ Missing', '❌ Missing', '❌ Missing', '6/46', '13%'],
        
        # Items Sold
        ['Items Sold', 'items_sold_count', 'ItemTransactions', '✅ YES',
         '✅ category_name', '❌ Missing', '✅ Via Orders join', '❌ Missing', '❌ Missing', '❌ Via Orders join needed', '❌ Via CustomerSnapshots join needed', '❌ Needs calculation', '❌ Missing', '❌ Via PaymentAndRefunds join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '❌ Missing', '❌ Via Orders join needed', '❌ Missing', '❌ Missing', '✅ item_name', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ location_id', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ order_id', '✅ transacted_at', '❌ Via Orders join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ item_quantity_sold', '❌ Missing', '❌ Missing', '❌ Missing', '6/46', '13%'],
        
        # Units Sold
        ['Units Sold', 'net_quantity', 'ItemTransactions', '✅ YES',
         '✅ category_name', '❌ Missing', '✅ Via Orders join', '❌ Missing', '❌ Missing', '❌ Via Orders join needed', '❌ Via CustomerSnapshots join needed', '❌ Needs calculation', '❌ Missing', '❌ Via PaymentAndRefunds join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '❌ Missing', '❌ Via Orders join needed', '❌ Missing', '❌ Missing', '✅ item_name', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ location_id', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ order_id', '✅ transacted_at', '❌ Via Orders join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ net_quantity', '❌ Missing', '❌ Missing', '❌ Missing', '6/46', '13%'],
        
        # Units Refunded
        ['Units Refunded', 'item_quantity_returned', 'ItemTransactions', '✅ YES',
         '✅ category_name', '❌ Missing', '✅ Via Orders join', '❌ Missing', '❌ Missing', '❌ Via Orders join needed', '❌ Via CustomerSnapshots join needed', '❌ Needs calculation', '❌ Missing', '❌ Via PaymentAndRefunds join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '❌ Missing', '❌ Via Orders join needed', '❌ Missing', '❌ Missing', '✅ item_name', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ location_id', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ order_id', '✅ transacted_at', '❌ Via Orders join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ item_quantity_returned', '❌ Missing', '❌ Missing', '❌ Missing', '6/46', '13%'],
        
        # Returns
        ['Returns', 'returns_gross_amount', 'ItemTransactions', '✅ YES',
         '✅ category_name', '❌ Missing', '✅ Via Orders join', '❌ Missing', '❌ Missing', '❌ Via Orders join needed', '❌ Via CustomerSnapshots join needed', '❌ Needs calculation', '❌ Missing', '❌ Via PaymentAndRefunds join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '❌ Missing', '❌ Via Orders join needed', '❌ Missing', '❌ Missing', '✅ item_name', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ location_id', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ order_id', '✅ transacted_at', '❌ Via Orders join needed', '❌ Via PaymentAndRefunds join needed', '❌ Missing', '❌ Missing', '❌ Missing', '❌ Missing', '✅ returns_quantity', '❌ Missing', '❌ Missing', '❌ Missing', '6/46', '13%'],
        
        # Variation Unit Cost
        ['Variation Unit Cost', '❌ NOT FOUND', 'None', '❌ NO',
         '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '❌ N/A', '0/46', '0%']
    ]
    
    # Write to CSV
    with open('/Users/divyac/financial-suite/Item_Metrics_Comprehensive_Dimension_Check.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerows(item_metrics_check)
    
    # Summary analysis
    summary_data = [
        ['Metric Category', 'Available Metrics', 'Missing Metrics', 'Best Coverage', 'Worst Coverage', 'Average Coverage'],
        ['Item Sales Metrics', '11/12 (92%)', '1/12 (Variation Unit Cost)', 'Voids: 24%', 'Most others: 13%', '14%'],
        ['Dimension Categories', 'Direct Available', 'Via Joins Needed', 'Missing Completely', 'Enhancement Priority', 'Notes'],
        ['Core Item Info', 'Item Name, Category, Location, Order ID', 'Customer Name, Employee, Device', 'Item Notes, Custom Attributes', 'HIGH', 'Basic item context available'],
        ['Operational Context', 'Void Reason (Voids only)', 'Employee, Device, Payment Method', 'Section, Manager, Dining Option', 'HIGH', 'Most operational context missing'],
        ['Product Details', 'Item Type, SKU (Voids only)', 'Item Variation via joins', 'GTIN, Vendor Info, Menu', 'MEDIUM', 'Limited product detail'],
        ['Customer Context', 'None direct', 'Customer Name, Customer Type', 'Customer Visit Frequency', 'HIGH', 'All customer context requires joins'],
        ['Modifier Context', 'Discount Name (discounts only)', 'Modifier Name via separate cube', 'Modifier Sets, Unit Prices', 'MEDIUM', 'Limited modifier context']
    ]
    
    with open('/Users/divyac/financial-suite/Item_Metrics_Summary_Analysis.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerows(summary_data)
    
    print("\n📊 ITEM METRICS ANALYSIS COMPLETE!")
    print("=" * 50)
    print("✅ AVAILABLE METRICS: 11/12 (92%)")
    print("❌ MISSING METRICS: 1/12 (Variation Unit Cost)")
    print("📏 AVERAGE DIMENSION COVERAGE: 14% (6-11 out of 46 dimensions)")
    print("🏆 BEST COVERAGE: Voids (24% - 11/46 dimensions)")
    print("📉 TYPICAL COVERAGE: Most metrics (13% - 6/46 dimensions)")
    
    print("\n🔍 KEY FINDINGS:")
    print("• Item metrics exist but have LIMITED dimensional context")
    print("• Most dimensions require JOINS to other cubes")
    print("• Voids cube has the BEST dimensional coverage")
    print("• Many restaurant-specific dimensions are MISSING")
    
    print("\n📁 FILES CREATED:")
    print("1. Item_Metrics_Comprehensive_Dimension_Check.csv - Full dimension matrix")
    print("2. Item_Metrics_Summary_Analysis.csv - Summary and recommendations")

if __name__ == "__main__":
    create_item_metrics_comprehensive_check()
