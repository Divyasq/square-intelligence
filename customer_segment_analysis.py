#!/usr/bin/env python3
"""
Customer Segment Analysis for Square OLAP Cube
Analyzes customer segments by category and gross sales with percentages
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
    print("=== CUSTOMER SEGMENTS BY CATEGORY - GROSS SALES ANALYSIS ===")
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
    
    # Process transactions
    segment_category_data = defaultdict(lambda: {
        'gross_sales': 0.0,
        'transaction_count': 0,
        'customers': set(),
        'items': []
    })
    
    segment_totals = defaultdict(lambda: {
        'gross_sales': 0.0,
        'customers': set()
    })
    
    total_sales = 0.0
    all_customers = set()
    
    for txn in transactions:
        if not txn['customer_sk'] or txn['customer_sk'] == '':
            continue
            
        customer_sk = int(txn['customer_sk'])
        item_sk = int(txn['item_sk'])
        gross_sales = float(txn['gross_sales_amount'])
        
        # Get customer segment
        customer = customer_lookup.get(customer_sk)
        if not customer:
            continue
        segment = customer['customer_segment']
        
        # Get category
        item = item_lookup.get(item_sk)
        if not item:
            continue
        category_sk = int(item['category_sk'])
        category = category_lookup.get(category_sk)
        if not category:
            continue
        category_name = category['category_name']
        
        # Update segment-category data
        key = (segment, category_name)
        segment_category_data[key]['gross_sales'] += gross_sales
        segment_category_data[key]['transaction_count'] += 1
        segment_category_data[key]['customers'].add(customer_sk)
        segment_category_data[key]['items'].append(item['item_name'])
        
        # Update segment totals
        segment_totals[segment]['gross_sales'] += gross_sales
        segment_totals[segment]['customers'].add(customer_sk)
        
        # Update overall totals
        total_sales += gross_sales
        all_customers.add(customer_sk)
    
    total_customers = len(all_customers)
    
    print("DETAILED BREAKDOWN BY CUSTOMER SEGMENT & CATEGORY:")
    print("=" * 90)
    print(f"{'Customer Segment':<15} {'Category':<15} {'Gross Sales':<12} {'Sales %':<8} {'Customers':<10} {'Cust %':<8} {'Txns':<6} {'Top Items'}")
    print("-" * 90)
    
    # Sort by gross sales descending
    sorted_data = sorted(segment_category_data.items(), 
                        key=lambda x: x[1]['gross_sales'], 
                        reverse=True)
    
    for (segment, category), data in sorted_data:
        sales_pct = (data['gross_sales'] / total_sales * 100) if total_sales > 0 else 0
        cust_pct = (len(data['customers']) / total_customers * 100) if total_customers > 0 else 0
        
        # Get top items for this segment-category
        item_counts = defaultdict(int)
        for item in data['items']:
            item_counts[item] += 1
        top_items = sorted(item_counts.items(), key=lambda x: x[1], reverse=True)[:2]
        top_items_str = ", ".join([f"{item} ({count})" for item, count in top_items])
        
        print(f"{segment:<15} {category:<15} ${data['gross_sales']:<11.2f} {sales_pct:<7.1f}% "
              f"{len(data['customers']):<9} {cust_pct:<7.1f}% {data['transaction_count']:<6} {top_items_str}")
    
    print()
    print("CUSTOMER SEGMENT TOTALS:")
    print("=" * 70)
    print(f"{'Segment':<15} {'Gross Sales':<12} {'Sales %':<8} {'Customers':<10} {'Customer %':<10} {'Avg per Customer'}")
    print("-" * 70)
    
    # Sort segments by sales
    sorted_segments = sorted(segment_totals.items(), 
                           key=lambda x: x[1]['gross_sales'], 
                           reverse=True)
    
    for segment, data in sorted_segments:
        sales_pct = (data['gross_sales'] / total_sales * 100) if total_sales > 0 else 0
        cust_pct = (len(data['customers']) / total_customers * 100) if total_customers > 0 else 0
        avg_per_customer = data['gross_sales'] / len(data['customers']) if len(data['customers']) > 0 else 0
        
        print(f"{segment:<15} ${data['gross_sales']:<11.2f} {sales_pct:<7.1f}% "
              f"{len(data['customers']):<9} {cust_pct:<9.1f}% ${avg_per_customer:<11.2f}")
    
    print()
    print("KEY INSIGHTS:")
    print("=" * 50)
    
    # Find VIP performance
    vip_data = segment_totals.get('VIP', {'gross_sales': 0, 'customers': set()})
    vip_sales_pct = (vip_data['gross_sales'] / total_sales * 100) if total_sales > 0 else 0
    vip_cust_pct = (len(vip_data['customers']) / total_customers * 100) if total_customers > 0 else 0
    
    print(f"• VIP customers represent {vip_cust_pct:.1f}% of customer base")
    print(f"• VIP customers generate {vip_sales_pct:.1f}% of total revenue")
    print(f"• Total Sales: ${total_sales:.2f}")
    print(f"• Total Customers: {total_customers}")
    
    # Category performance
    print()
    print("TOP CATEGORIES BY REVENUE:")
    category_sales = defaultdict(float)
    for (segment, category), data in segment_category_data.items():
        category_sales[category] += data['gross_sales']
    
    sorted_categories = sorted(category_sales.items(), key=lambda x: x[1], reverse=True)
    for i, (category, sales) in enumerate(sorted_categories[:5], 1):
        pct = (sales / total_sales * 100) if total_sales > 0 else 0
        print(f"{i}. {category}: ${sales:.2f} ({pct:.1f}%)")

if __name__ == "__main__":
    main()
