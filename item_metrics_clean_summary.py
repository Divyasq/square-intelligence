import csv

def create_clean_item_summary():
    """Create a clean, readable summary of item metrics vs dimensions"""
    
    print("🛍️ ITEM METRICS vs DIMENSIONS - CLEAN SUMMARY")
    print("=" * 60)
    
    # Clean summary table
    clean_summary = [
        ['Item Metric', 'Available in Square?', 'Key Dimensions Available', 'Key Dimensions Missing', 'Coverage', 'Status'],
        
        ['Item Sales', '✅ item_gross_sales', 'Item Name, Category, Location, Order ID, Order Created, Units', 'Employee, Customer Type, Device, Section, Payment Method', '6/46 (13%)', '🟡 LIMITED'],
        ['Net Item Sales', '✅ item_net_sales', 'Item Name, Category, Location, Order ID, Order Created, Units', 'Employee, Customer Type, Device, Section, Payment Method', '6/46 (13%)', '🟡 LIMITED'],
        ['Tax', '✅ item_tax_money', 'Item Name, Category, Location, Order ID, Order Created, Units', 'Employee, Customer Type, Device, Section, Payment Method', '6/46 (13%)', '🟡 LIMITED'],
        ['Discount Amount', '✅ total_discount_and_comp_amount', 'Discount Name, Item Type, Location, Order ID, Order Created', 'Item Name, Employee, Customer Type, Device, Section', '6/46 (13%)', '🟡 LIMITED'],
        ['Comps', '✅ comp_amount', 'Discount Name, Item Type, Location, Order ID, Order Created', 'Item Name, Employee, Customer Type, Device, Section', '6/46 (13%)', '🟡 LIMITED'],
        ['Void', '✅ total_amount_voided', 'Item Name, Category, Employee, Location, Void Reason, SKU, Item Variation', 'Customer Type, Device, Section, Payment Method', '11/46 (24%)', '🟠 MODERATE'],
        ['Items Refunded', '✅ items_returned_count', 'Item Name, Category, Location, Order ID, Order Created, Units', 'Employee, Customer Type, Device, Section, Payment Method', '6/46 (13%)', '🟡 LIMITED'],
        ['Items Sold', '✅ items_sold_count', 'Item Name, Category, Location, Order ID, Order Created, Units', 'Employee, Customer Type, Device, Section, Payment Method', '6/46 (13%)', '🟡 LIMITED'],
        ['Units Sold', '✅ net_quantity', 'Item Name, Category, Location, Order ID, Order Created, Units', 'Employee, Customer Type, Device, Section, Payment Method', '6/46 (13%)', '🟡 LIMITED'],
        ['Units Refunded', '✅ item_quantity_returned', 'Item Name, Category, Location, Order ID, Order Created, Units', 'Employee, Customer Type, Device, Section, Payment Method', '6/46 (13%)', '🟡 LIMITED'],
        ['Returns', '✅ returns_gross_amount', 'Item Name, Category, Location, Order ID, Order Created, Units', 'Employee, Customer Type, Device, Section, Payment Method', '6/46 (13%)', '🟡 LIMITED'],
        ['Variation Unit Cost', '❌ NOT AVAILABLE', 'None', 'All dimensions', '0/46 (0%)', '🔴 MISSING']
    ]
    
    # Dimension availability summary
    dimension_summary = [
        ['Dimension Category', 'Available Dimensions', 'Missing Dimensions', 'Enhancement Needed'],
        
        ['✅ DIRECTLY AVAILABLE', 'Item Name, Category Name, Location, Order ID, Order Created', 'Most others', 'None - these work now'],
        ['⚠️ VIA JOINS NEEDED', 'Employee, Customer Type, Device, Device Nickname, Channel, Order Completed, Payment Method', 'Requires joins to Orders/CustomerSnapshots/PaymentAndRefunds', 'Add joins to item cubes'],
        ['❌ COMPLETELY MISSING', 'Section, Customer Name, Item Notes, GTIN, Vendor Info, Menu, Manager, Dining Options, Custom Attributes', 'Not in Square schema', 'Add new fields/cubes'],
        ['🔴 RESTAURANT-SPECIFIC', 'Combo Name, Dining Option, Menu, Manager, Reporting Category', 'Restaurant concepts not in Square', 'Add restaurant-specific fields']
    ]
    
    # Critical gaps for item analysis
    critical_gaps = [
        ['Gap', 'Impact', 'Business Need', 'Recommendation', 'Priority'],
        
        ['No Employee context in item metrics', 'Cannot track staff performance by item', 'Which employees sell which items best?', 'Add joins from ItemTransactions to Orders cube', 'HIGH'],
        ['No Customer Type in item metrics', 'Cannot analyze item preferences by customer segment', 'What do new vs loyal customers buy?', 'Add joins from ItemTransactions to CustomerSnapshots', 'HIGH'],
        ['No Device context in item metrics', 'Cannot track device performance by product', 'Which POS devices work best for specific items?', 'Add joins from ItemTransactions to PaymentAndRefunds', 'MEDIUM'],
        ['No Section/Department concept', 'Cannot do departmental item analysis', 'Item performance by restaurant section?', 'Create Sections cube + add relationships', 'HIGH'],
        ['Missing Variation Unit Cost', 'Cannot calculate item profitability', 'What\'s the profit margin on each item?', 'Add cost tracking to Catalog or ItemTransactions', 'MEDIUM'],
        ['No Item Notes/Custom Attributes', 'Cannot categorize items flexibly', 'Custom item groupings for analysis?', 'Add custom fields to Catalog cube', 'LOW'],
        ['No Vendor/Supplier info', 'Cannot track supplier performance', 'Which suppliers provide best-selling items?', 'Add vendor fields to Catalog cube', 'LOW']
    ]
    
    # Write files
    with open('/Users/divyac/financial-suite/Item_Metrics_Clean_Summary.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerows(clean_summary)
    
    with open('/Users/divyac/financial-suite/Item_Dimensions_Summary.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerows(dimension_summary)
    
    with open('/Users/divyac/financial-suite/Item_Analysis_Critical_Gaps.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerows(critical_gaps)
    
    print("\n📊 ITEM METRICS AVAILABILITY:")
    print("✅ AVAILABLE: 11/12 metrics (92%)")
    print("❌ MISSING: 1/12 metrics (Variation Unit Cost)")
    
    print("\n📏 DIMENSION COVERAGE:")
    print("🟠 BEST: Voids (24% coverage - 11/46 dimensions)")
    print("🟡 TYPICAL: Most metrics (13% coverage - 6/46 dimensions)")
    print("🔴 WORST: Variation Unit Cost (0% - metric doesn't exist)")
    
    print("\n🔍 KEY AVAILABLE DIMENSIONS:")
    print("✅ Item Name, Category, Location, Order ID, Order Created")
    print("⚠️ Employee, Customer Type, Device (via joins)")
    print("❌ Section, Item Notes, Vendor Info, Menu (missing)")
    
    print("\n🚨 CRITICAL GAPS:")
    print("1. No employee context → Can't track staff item performance")
    print("2. No customer type → Can't analyze item preferences by segment") 
    print("3. No section concept → Can't do departmental analysis")
    print("4. No cost data → Can't calculate profitability")
    
    print("\n🎯 BOTTOM LINE:")
    print("• Item metrics exist but have LIMITED operational context")
    print("• Need JOINS to other cubes for employee/customer/device info")
    print("• Many restaurant-specific dimensions are MISSING")
    print("• Item analysis is possible but requires significant enhancement")
    
    print("\n📁 FILES CREATED:")
    print("1. Item_Metrics_Clean_Summary.csv")
    print("2. Item_Dimensions_Summary.csv") 
    print("3. Item_Analysis_Critical_gaps.csv")

if __name__ == "__main__":
    create_clean_item_summary()
