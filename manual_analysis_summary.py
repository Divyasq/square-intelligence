import csv

def create_manual_analysis_summary():
    """Create a clear summary of the manual metric-dimension analysis"""
    
    print("📊 MANUAL METRIC-DIMENSION ANALYSIS RESULTS")
    print("=" * 60)
    
    # Summary results
    results_summary = [
        ['Metric', 'Available in Square?', 'Dimensions Available', 'Dimensions Missing', 'Coverage Score', 'Status'],
        
        ['Gross Sales', '✅ YES (top_line_product_sales)', '10/13', 'Order Name, Section, Visit Frequency', '77%', '🟢 EXCELLENT'],
        ['Net Sales', '✅ YES (net_sales)', '10/13', 'Order Name, Section, Visit Frequency', '77%', '🟢 EXCELLENT'],
        ['Refunds', '✅ YES (refunds_by_amount_amount)', '10/13', 'Order Name, Section, Visit Frequency', '77%', '🟢 EXCELLENT'],
        ['Transaction Counts', '✅ YES (count)', '10/13', 'Order Name, Section, Visit Frequency', '77%', '🟢 EXCELLENT'],
        ['Discount', '✅ YES (discounts_amount)', '10/13', 'Order Name, Section, Visit Frequency', '77%', '🟢 EXCELLENT'],
        ['Returns', '✅ YES (itemized_returns)', '10/13', 'Order Name, Section, Visit Frequency', '77%', '🟢 EXCELLENT'],
        ['Service Charges', '❌ NO', '0/13', 'ALL DIMENSIONS', '0%', '🔴 NOT AVAILABLE'],
        ['Tax', '✅ YES (sales_tax_amount)', '10/13', 'Order Name, Section, Visit Frequency', '77%', '🟢 EXCELLENT'],
        ['Tip', '✅ YES (tips_amount)', '10/13', 'Order Name, Section, Visit Frequency', '77%', '🟢 EXCELLENT'],
        ['Average Cover Count', '❌ NO', '0/13', 'ALL DIMENSIONS', '0%', '🔴 NOT AVAILABLE'],
        ['Covers', '❌ NO', '0/13', 'ALL DIMENSIONS', '0%', '🔴 NOT AVAILABLE'],
        ['Customer Frequency', '⚠️ PARTIAL', '4/13', 'Order Name, Device, Device Nickname, Channel, Section, Employee, Location, Order Completed, Visit Frequency', '31%', '🟡 LIMITED']
    ]
    
    # Dimension availability across metrics
    dimension_availability = [
        ['Dimension', 'Available Metrics Count', 'Missing Metrics Count', 'Availability %', 'Status'],
        
        ['Order Name', '0/9', '9/9', '0%', '❌ MISSING - Needs to be added'],
        ['Order ID', '9/9', '0/9', '100%', '✅ UNIVERSAL - Available everywhere'],
        ['Device', '8/9', '1/9', '89%', '✅ EXCELLENT - Via joins to PaymentAndRefunds'],
        ['Device Nickname', '8/9', '1/9', '89%', '✅ EXCELLENT - Via joins to PaymentAndRefunds'],
        ['Channel', '8/9', '1/9', '89%', '✅ EXCELLENT - Via joins to Channel cube'],
        ['Section', '0/9', '9/9', '0%', '❌ MISSING - Needs to be added'],
        ['Employee', '8/9', '1/9', '89%', '✅ EXCELLENT - Available in Orders cube'],
        ['Location', '8/9', '1/9', '89%', '✅ EXCELLENT - Via joins to Location cube'],
        ['Customer', '9/9', '0/9', '100%', '✅ UNIVERSAL - Available everywhere'],
        ['Customer Type', '8/9', '1/9', '89%', '✅ EXCELLENT - Via joins to CustomerSnapshots'],
        ['Order Created', '9/9', '0/9', '100%', '✅ UNIVERSAL - Available everywhere'],
        ['Order Completed', '8/9', '1/9', '89%', '✅ EXCELLENT - Available as sale_timestamp'],
        ['Customer Visit Frequency', '0/9', '9/9', '0%', '⚠️ NEEDS CALCULATION - Can be derived']
    ]
    
    # Critical gaps and recommendations
    critical_gaps = [
        ['Gap Type', 'Description', 'Impact', 'Recommendation', 'Priority', 'Effort'],
        
        ['Missing Metrics', 'Service Charges, Average Cover Count, Covers not available', 'Cannot analyze service charges or cover-based metrics', 'Add these metrics to Orders cube or create new cube', 'MEDIUM', 'HIGH'],
        ['Missing Order Names', 'No human-readable order names', 'Reports show IDs instead of names', 'Add order_name field to Orders cube', 'HIGH', 'MEDIUM'],
        ['Missing Sections', 'No section/department concept', 'Cannot do departmental analysis', 'Create Sections cube + add relationships', 'HIGH', 'HIGH'],
        ['Customer Frequency Limited', 'Customer metrics have limited dimensional support', 'Customer analysis lacks operational context', 'Enhance CustomerSnapshots with more joins', 'MEDIUM', 'MEDIUM'],
        ['Visit Frequency Calculation', 'Customer visit frequency not pre-calculated', 'Must calculate on-demand, slower queries', 'Pre-calculate and store visit frequency', 'MEDIUM', 'MEDIUM']
    ]
    
    # Write files
    with open('/Users/divyac/financial-suite/Manual_Analysis_Results_Summary.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerows(results_summary)
    
    with open('/Users/divyac/financial-suite/Dimension_Availability_Analysis.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerows(dimension_availability)
    
    with open('/Users/divyac/financial-suite/Critical_Gaps_And_Recommendations.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerows(critical_gaps)
    
    # Print summary to console
    print("\n📋 METRIC AVAILABILITY SUMMARY:")
    print("✅ AVAILABLE WITH EXCELLENT COVERAGE (8/12 metrics):")
    print("   • Gross Sales, Net Sales, Refunds, Transaction Counts")
    print("   • Discount, Returns, Tax, Tip")
    print("   • Coverage: 10/13 dimensions each (77%)")
    
    print("\n❌ NOT AVAILABLE (3/12 metrics):")
    print("   • Service Charges - Not in Square schema")
    print("   • Average Cover Count - No cover concept")
    print("   • Covers - No cover concept")
    
    print("\n⚠️ PARTIALLY AVAILABLE (1/12 metrics):")
    print("   • Customer Frequency - Limited to 4/13 dimensions")
    
    print("\n📊 DIMENSION AVAILABILITY:")
    print("✅ UNIVERSAL (100%): Order ID, Customer, Order Created")
    print("✅ EXCELLENT (89%): Device, Device Nickname, Channel, Employee, Location, Customer Type, Order Completed")
    print("❌ MISSING (0%): Order Name, Section, Customer Visit Frequency")
    
    print("\n🎯 BOTTOM LINE:")
    print("• 8/12 requested metrics are AVAILABLE with excellent dimensional coverage")
    print("• 3/12 metrics are NOT AVAILABLE in Square schema")
    print("• 10/13 dimensions are available for most metrics")
    print("• Only Order Name and Section are universally missing")
    
    print("\n📁 FILES CREATED:")
    print("1. manual_metric_dimension_check.csv - Detailed dimension-by-dimension check")
    print("2. Manual_Analysis_Results_Summary.csv - Summary of all metrics")
    print("3. Dimension_Availability_Analysis.csv - Dimension availability across metrics")
    print("4. Critical_Gaps_And_Recommendations.csv - Key gaps and solutions")

if __name__ == "__main__":
    create_manual_analysis_summary()
