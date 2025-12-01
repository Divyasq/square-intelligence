#!/usr/bin/env python3
"""
Create Excel-style table view for Customer Segment Analysis
Focus on the insight: VIP customers (26.7% of base) generate 19.4% of revenue
"""

import csv
from collections import defaultdict

def create_excel_table():
    print("=" * 100)
    print("SQUARE REPORTING CUBE - CUSTOMER SEGMENT ANALYSIS TABLE")
    print("Insight: VIP customers represent 26.7% of customer base but generate only 19.4% of revenue")
    print("=" * 100)
    print()
    
    # Load and process data (same as before)
    customers = []
    with open('dim_customer.csv', 'r') as file:
        customers = list(csv.DictReader(file))
    
    items = []
    with open('dim_item.csv', 'r') as file:
        items = list(csv.DictReader(file))
    
    categories = []
    with open('dim_category.csv', 'r') as file:
        categories = list(csv.DictReader(file))
    
    transactions = []
    with open('fact_sales_transaction.csv', 'r') as file:
        transactions = list(csv.DictReader(file))
    
    # Create lookups
    customer_lookup = {int(c['customer_sk']): c for c in customers}
    item_lookup = {int(i['item_sk']): i for i in items}
    category_lookup = {int(c['category_sk']): c for c in categories}
    
    # Process data
    analysis_data = []
    totals = {'sales': 0, 'customers': set()}
    
    for txn in transactions:
        if not txn['customer_sk']:
            continue
            
        customer_sk = int(txn['customer_sk'])
        item_sk = int(txn['item_sk'])
        sales = float(txn['gross_sales_amount'])
        
        customer = customer_lookup.get(customer_sk)
        item = item_lookup.get(item_sk)
        if not customer or not item:
            continue
            
        category = category_lookup.get(int(item['category_sk']))
        if not category:
            continue
        
        analysis_data.append({
            'customer_segment': customer['customer_segment'],
            'customer_name': customer['full_name'],
            'category': category['category_name'],
            'item_name': item['item_name'],
            'item_type': item['item_type'],
            'gross_sales': sales,
            'unit_price': float(item['current_price']),
            'margin': float(item['profit_margin_percent'])
        })
        
        totals['sales'] += sales
        totals['customers'].add(customer_sk)
    
    # Group by Customer Segment and Category
    segment_category = defaultdict(lambda: {
        'gross_sales': 0,
        'customers': set(),
        'transactions': 0,
        'items': defaultdict(float),
        'margins': []
    })
    
    segment_totals = defaultdict(lambda: {
        'gross_sales': 0,
        'customers': set()
    })
    
    for record in analysis_data:
        key = (record['customer_segment'], record['category'])
        segment_category[key]['gross_sales'] += record['gross_sales']
        segment_category[key]['customers'].add(record['customer_name'])
        segment_category[key]['transactions'] += 1
        segment_category[key]['items'][record['item_name']] += record['gross_sales']
        segment_category[key]['margins'].append(record['margin'])
        
        segment_totals[record['customer_segment']]['gross_sales'] += record['gross_sales']
        segment_totals[record['customer_segment']]['customers'].add(record['customer_name'])
    
    total_sales = totals['sales']
    total_customers = len(totals['customers'])
    
    print("TABLE 1: CUSTOMER SEGMENT × CATEGORY BREAKDOWN")
    print("=" * 120)
    print(f"{'Customer':<12} {'Category':<15} {'Gross':<10} {'Sales':<6} {'Unique':<6} {'Cust':<5} {'Trans':<5} {'Avg':<6} {'Top Items (Revenue)':<35}")
    print(f"{'Segment':<12} {'Name':<15} {'Sales':<10} {'%':<6} {'Custs':<6} {'%':<5} {'Count':<5} {'Margin':<6} {'':<35}")
    print("-" * 120)
    
    # Sort by gross sales descending
    sorted_data = sorted(segment_category.items(), key=lambda x: x[1]['gross_sales'], reverse=True)
    
    for (segment, category), data in sorted_data:
        sales_pct = (data['gross_sales'] / total_sales * 100)
        cust_pct = (len(data['customers']) / total_customers * 100)
        avg_margin = sum(data['margins']) / len(data['margins']) if data['margins'] else 0
        
        # Top 2 items by revenue in this segment-category
        top_items = sorted(data['items'].items(), key=lambda x: x[1], reverse=True)[:2]
        items_str = ", ".join([f"{item} (${rev:.2f})" for item, rev in top_items])
        
        print(f"{segment:<12} {category:<15} ${data['gross_sales']:<9.2f} {sales_pct:<5.1f}% {len(data['customers']):<6} "
              f"{cust_pct:<4.1f}% {data['transactions']:<5} {avg_margin:<5.1f}% {items_str:<35}")
    
    print()
    print("TABLE 2: CUSTOMER SEGMENT PERFORMANCE SUMMARY")
    print("=" * 85)
    print(f"{'Customer':<12} {'Gross Sales':<12} {'Sales %':<8} {'Customer':<8} {'Cust %':<7} {'Avg per':<10} {'Performance':<12}")
    print(f"{'Segment':<12} {'Amount':<12} {'of Total':<8} {'Count':<8} {'of Base':<7} {'Customer':<10} {'Rating':<12}")
    print("-" * 85)
    
    sorted_segments = sorted(segment_totals.items(), key=lambda x: x[1]['gross_sales'], reverse=True)
    
    for segment, data in sorted_segments:
        sales_pct = (data['gross_sales'] / total_sales * 100)
        cust_pct = (len(data['customers']) / total_customers * 100)
        avg_per_customer = data['gross_sales'] / len(data['customers'])
        
        # Performance rating based on sales % vs customer %
        if sales_pct > cust_pct * 1.3:
            rating = "⭐ Excellent"
        elif sales_pct > cust_pct * 1.1:
            rating = "✓ Good"
        elif sales_pct > cust_pct * 0.9:
            rating = "→ Average"
        else:
            rating = "⚠ Underperform"
        
        print(f"{segment:<12} ${data['gross_sales']:<11.2f} {sales_pct:<7.1f}% {len(data['customers']):<8} "
              f"{cust_pct:<6.1f}% ${avg_per_customer:<9.2f} {rating:<12}")
    
    print()
    print("TABLE 3: KEY INSIGHTS & RECOMMENDATIONS")
    print("=" * 80)
    
    # VIP Analysis
    vip_data = segment_totals.get('VIP', {'gross_sales': 0, 'customers': set()})
    vip_sales_pct = (vip_data['gross_sales'] / total_sales * 100)
    vip_cust_pct = (len(vip_data['customers']) / total_customers * 100)
    
    print(f"📊 VIP CUSTOMER ANALYSIS:")
    print(f"   • Customer Base: {len(vip_data['customers'])} customers ({vip_cust_pct:.1f}% of total)")
    print(f"   • Revenue Share: ${vip_data['gross_sales']:.2f} ({vip_sales_pct:.1f}% of total)")
    print(f"   • Performance: UNDERPERFORMING (should generate ~{vip_cust_pct*1.5:.1f}% of revenue)")
    print(f"   • Avg Spend: ${vip_data['gross_sales']/len(vip_data['customers']):.2f} per VIP customer")
    print()
    
    # Find VIP's favorite categories
    vip_categories = defaultdict(float)
    for (segment, category), data in segment_category.items():
        if segment == 'VIP':
            vip_categories[category] = data['gross_sales']
    
    print(f"🎯 VIP CUSTOMER PREFERENCES:")
    vip_sorted = sorted(vip_categories.items(), key=lambda x: x[1], reverse=True)
    for i, (category, sales) in enumerate(vip_sorted, 1):
        pct_of_vip = (sales / vip_data['gross_sales'] * 100) if vip_data['gross_sales'] > 0 else 0
        print(f"   {i}. {category}: ${sales:.2f} ({pct_of_vip:.1f}% of VIP spending)")
    
    print()
    print(f"💡 BUSINESS RECOMMENDATIONS:")
    print(f"   • VIP Engagement: Increase VIP customer value through targeted promotions")
    print(f"   • Category Focus: Espresso products are top revenue driver (28.6% of total)")
    print(f"   • New Customer: High value per customer (${segment_totals['New']['gross_sales']/len(segment_totals['New']['customers']):.2f} avg)")
    print(f"   • Regular Customers: Largest segment (53.3%) - opportunity for upselling")
    
    print()
    print("=" * 100)
    print(f"SUMMARY: ${total_sales:.2f} total revenue from {total_customers} customers")
    print(f"Key Finding: VIP segment underperforming relative to customer count")
    print("=" * 100)

if __name__ == "__main__":
    create_excel_table()
