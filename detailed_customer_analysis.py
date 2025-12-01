#!/usr/bin/env python3
"""
Detailed Customer Segment Analysis with Item-Level Breakdown
Creates table view and CSV export for Excel analysis
"""

import csv
from collections import defaultdict

def load_csv(filename):
    """Load CSV file and return as list of dictionaries"""
    data = []
    with open(filename, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            data.append(row)
    return data

def main():
    print("=== DETAILED CUSTOMER SEGMENT ANALYSIS WITH ITEM BREAKDOWN ===")
    print()
    
    # Load data
    customers = load_csv('dim_customer.csv')
    items = load_csv('dim_item.csv')
    categories = load_csv('dim_category.csv')
    transactions = load_csv('fact_sales_transaction.csv')
    
    # Create lookup dictionaries
    customer_lookup = {int(c['customer_sk']): c for c in customers}
    item_lookup = {int(i['item_sk']): i for i in items}
    category_lookup = {int(c['category_sk']): c for c in categories}
    
    # Detailed analysis data structure
    detailed_data = []
    segment_totals = defaultdict(lambda: {'gross_sales': 0.0, 'customers': set()})
    category_totals = defaultdict(float)
    total_sales = 0.0
    all_customers = set()
    
    # Process each transaction
    for txn in transactions:
        if not txn['customer_sk'] or txn['customer_sk'] == '':
            continue
            
        customer_sk = int(txn['customer_sk'])
        item_sk = int(txn['item_sk'])
        gross_sales = float(txn['gross_sales_amount'])
        
        # Get customer info
        customer = customer_lookup.get(customer_sk)
        if not customer:
            continue
        
        # Get item and category info
        item = item_lookup.get(item_sk)
        if not item:
            continue
        category_sk = int(item['category_sk'])
        category = category_lookup.get(category_sk)
        if not category:
            continue
        
        # Create detailed record
        record = {
            'customer_segment': customer['customer_segment'],
            'customer_name': customer['full_name'],
            'category_name': category['category_name'],
            'item_name': item['item_name'],
            'item_type': item['item_type'],
            'gross_sales': gross_sales,
            'unit_price': float(item['current_price']),
            'profit_margin': float(item['profit_margin_percent']),
            'transaction_id': txn['transaction_id']
        }
        detailed_data.append(record)
        
        # Update totals
        segment_totals[customer['customer_segment']]['gross_sales'] += gross_sales
        segment_totals[customer['customer_segment']]['customers'].add(customer_sk)
        category_totals[category['category_name']] += gross_sales
        total_sales += gross_sales
        all_customers.add(customer_sk)
    
    total_customers = len(all_customers)
    
    # Create summary table
    summary_data = defaultdict(lambda: {
        'gross_sales': 0.0,
        'transaction_count': 0,
        'customers': set(),
        'items': defaultdict(int),
        'avg_margin': []
    })
    
    for record in detailed_data:
        key = (record['customer_segment'], record['category_name'])
        summary_data[key]['gross_sales'] += record['gross_sales']
        summary_data[key]['transaction_count'] += 1
        summary_data[key]['customers'].add(record['customer_name'])
        summary_data[key]['items'][record['item_name']] += 1
        summary_data[key]['avg_margin'].append(record['profit_margin'])
    
    print("TABLE VIEW: CUSTOMER SEGMENTS BY CATEGORY WITH ITEM DETAILS")
    print("=" * 120)
    print(f"{'Segment':<12} {'Category':<15} {'Gross Sales':<12} {'Sales %':<8} {'Customers':<4} {'Cust %':<7} {'Txns':<5} {'Avg Margin':<11} {'Top Items'}")
    print("-" * 120)
    
    # Sort by gross sales descending
    sorted_summary = sorted(summary_data.items(), key=lambda x: x[1]['gross_sales'], reverse=True)
    
    export_data = []
    
    for (segment, category), data in sorted_summary:
        sales_pct = (data['gross_sales'] / total_sales * 100) if total_sales > 0 else 0
        cust_pct = (len(data['customers']) / total_customers * 100) if total_customers > 0 else 0
        avg_margin = sum(data['avg_margin']) / len(data['avg_margin']) if data['avg_margin'] else 0
        
        # Get top 3 items
        top_items = sorted(data['items'].items(), key=lambda x: x[1], reverse=True)[:3]
        top_items_str = ", ".join([f"{item}({count})" for item, count in top_items])
        
        print(f"{segment:<12} {category:<15} ${data['gross_sales']:<11.2f} {sales_pct:<7.1f}% "
              f"{len(data['customers']):<4} {cust_pct:<6.1f}% {data['transaction_count']:<5} "
              f"{avg_margin:<10.1f}% {top_items_str}")
        
        # Add to export data
        export_data.append({
            'Customer_Segment': segment,
            'Category': category,
            'Gross_Sales': f"{data['gross_sales']:.2f}",
            'Sales_Percentage': f"{sales_pct:.1f}%",
            'Customer_Count': len(data['customers']),
            'Customer_Percentage': f"{cust_pct:.1f}%",
            'Transaction_Count': data['transaction_count'],
            'Average_Margin': f"{avg_margin:.1f}%",
            'Top_Items': top_items_str
        })
    
    print()
    print("CUSTOMER SEGMENT PERFORMANCE SUMMARY:")
    print("=" * 80)
    print(f"{'Segment':<12} {'Gross Sales':<12} {'Sales %':<8} {'Customers':<10} {'Cust %':<8} {'Avg/Customer':<12} {'Performance'}")
    print("-" * 80)
    
    segment_export = []
    sorted_segments = sorted(segment_totals.items(), key=lambda x: x[1]['gross_sales'], reverse=True)
    
    for segment, data in sorted_segments:
        sales_pct = (data['gross_sales'] / total_sales * 100) if total_sales > 0 else 0
        cust_pct = (len(data['customers']) / total_customers * 100) if total_customers > 0 else 0
        avg_per_customer = data['gross_sales'] / len(data['customers']) if len(data['customers']) > 0 else 0
        
        # Performance indicator
        if sales_pct > cust_pct * 1.2:
            performance = "High Value"
        elif sales_pct > cust_pct * 0.8:
            performance = "Balanced"
        else:
            performance = "Low Value"
        
        print(f"{segment:<12} ${data['gross_sales']:<11.2f} {sales_pct:<7.1f}% "
              f"{len(data['customers']):<9} {cust_pct:<7.1f}% ${avg_per_customer:<11.2f} {performance}")
        
        segment_export.append({
            'Customer_Segment': segment,
            'Gross_Sales': f"{data['gross_sales']:.2f}",
            'Sales_Percentage': f"{sales_pct:.1f}%",
            'Customer_Count': len(data['customers']),
            'Customer_Percentage': f"{cust_pct:.1f}%",
            'Average_Per_Customer': f"{avg_per_customer:.2f}",
            'Performance_Rating': performance
        })
    
    print()
    print("KEY BUSINESS INSIGHTS:")
    print("=" * 50)
    
    # VIP Analysis
    vip_data = segment_totals.get('VIP', {'gross_sales': 0, 'customers': set()})
    vip_sales_pct = (vip_data['gross_sales'] / total_sales * 100) if total_sales > 0 else 0
    vip_cust_pct = (len(vip_data['customers']) / total_customers * 100) if total_customers > 0 else 0
    
    print(f"• VIP Segment: {vip_cust_pct:.1f}% of customers generate {vip_sales_pct:.1f}% of revenue")
    
    # Regular customer analysis
    regular_data = segment_totals.get('Regular', {'gross_sales': 0, 'customers': set()})
    regular_sales_pct = (regular_data['gross_sales'] / total_sales * 100) if total_sales > 0 else 0
    regular_cust_pct = (len(regular_data['customers']) / total_customers * 100) if total_customers > 0 else 0
    
    print(f"• Regular Segment: {regular_cust_pct:.1f}% of customers generate {regular_sales_pct:.1f}% of revenue")
    
    # Top category
    top_category = max(category_totals.items(), key=lambda x: x[1])
    top_cat_pct = (top_category[1] / total_sales * 100) if total_sales > 0 else 0
    print(f"• Top Category: {top_category[0]} generates {top_cat_pct:.1f}% of total revenue")
    
    print(f"• Total Revenue: ${total_sales:.2f} across {total_customers} customers")
    
    # Export to CSV for Excel analysis
    print()
    print("EXPORTING DATA TO CSV FILES...")
    
    # Export detailed breakdown
    with open('customer_segment_category_analysis.csv', 'w', newline='') as file:
        if export_data:
            writer = csv.DictWriter(file, fieldnames=export_data[0].keys())
            writer.writeheader()
            writer.writerows(export_data)
    
    # Export segment summary
    with open('customer_segment_summary.csv', 'w', newline='') as file:
        if segment_export:
            writer = csv.DictWriter(file, fieldnames=segment_export[0].keys())
            writer.writeheader()
            writer.writerows(segment_export)
    
    # Export detailed transaction data
    with open('customer_transaction_details.csv', 'w', newline='') as file:
        if detailed_data:
            writer = csv.DictWriter(file, fieldnames=detailed_data[0].keys())
            writer.writeheader()
            writer.writerows(detailed_data)
    
    print("✓ customer_segment_category_analysis.csv - Summary by segment & category")
    print("✓ customer_segment_summary.csv - Segment performance summary")  
    print("✓ customer_transaction_details.csv - Detailed transaction data")
    print()
    print("Files ready for import into Excel, Power BI, or Tableau!")

if __name__ == "__main__":
    main()
