#!/usr/bin/env python3
"""
Square OLAP Cube Data Validation Script
Validates relationships and data integrity across CSV files
"""

import pandas as pd
import numpy as np
from pathlib import Path

def load_csv_files():
    """Load all CSV files into pandas DataFrames"""
    files = {
        'dim_date': 'dim_date.csv',
        'dim_time': 'dim_time.csv', 
        'dim_location': 'dim_location.csv',
        'dim_employee': 'dim_employee.csv',
        'dim_customer': 'dim_customer.csv',
        'dim_category': 'dim_category.csv',
        'dim_item': 'dim_item.csv',
        'dim_payment_method': 'dim_payment_method.csv',
        'fact_sales_transaction': 'fact_sales_transaction.csv',
        'fact_item_sales': 'fact_item_sales.csv',
        'fact_labor_cost': 'fact_labor_cost.csv',
        'bridge_transaction_modifier': 'bridge_transaction_modifier.csv'
    }
    
    data = {}
    for name, filename in files.items():
        try:
            data[name] = pd.read_csv(filename)
            print(f"✓ Loaded {filename}: {len(data[name])} records")
        except FileNotFoundError:
            print(f"✗ File not found: {filename}")
            return None
    
    return data

def validate_referential_integrity(data):
    """Validate foreign key relationships"""
    print("\n=== Referential Integrity Validation ===")
    
    issues = []
    
    # Check fact_sales_transaction relationships
    fact_sales = data['fact_sales_transaction']
    
    # Date dimension
    orphaned_dates = fact_sales[~fact_sales['date_sk'].isin(data['dim_date']['date_sk'])]
    if len(orphaned_dates) > 0:
        issues.append(f"Orphaned date_sk in fact_sales_transaction: {len(orphaned_dates)} records")
    else:
        print("✓ All date_sk values have valid references")
    
    # Time dimension
    orphaned_times = fact_sales[~fact_sales['time_sk'].isin(data['dim_time']['time_sk'])]
    if len(orphaned_times) > 0:
        issues.append(f"Orphaned time_sk in fact_sales_transaction: {len(orphaned_times)} records")
    else:
        print("✓ All time_sk values have valid references")
    
    # Location dimension
    orphaned_locations = fact_sales[~fact_sales['location_sk'].isin(data['dim_location']['location_sk'])]
    if len(orphaned_locations) > 0:
        issues.append(f"Orphaned location_sk in fact_sales_transaction: {len(orphaned_locations)} records")
    else:
        print("✓ All location_sk values have valid references")
    
    # Employee dimension
    orphaned_employees = fact_sales[~fact_sales['employee_sk'].isin(data['dim_employee']['employee_sk'])]
    if len(orphaned_employees) > 0:
        issues.append(f"Orphaned employee_sk in fact_sales_transaction: {len(orphaned_employees)} records")
    else:
        print("✓ All employee_sk values have valid references")
    
    # Customer dimension (allowing nulls)
    non_null_customers = fact_sales[fact_sales['customer_sk'].notna()]
    orphaned_customers = non_null_customers[~non_null_customers['customer_sk'].isin(data['dim_customer']['customer_sk'])]
    if len(orphaned_customers) > 0:
        issues.append(f"Orphaned customer_sk in fact_sales_transaction: {len(orphaned_customers)} records")
    else:
        print("✓ All customer_sk values have valid references")
    
    # Item dimension
    orphaned_items = fact_sales[~fact_sales['item_sk'].isin(data['dim_item']['item_sk'])]
    if len(orphaned_items) > 0:
        issues.append(f"Orphaned item_sk in fact_sales_transaction: {len(orphaned_items)} records")
    else:
        print("✓ All item_sk values have valid references")
    
    # Payment method dimension
    orphaned_payments = fact_sales[~fact_sales['payment_method_sk'].isin(data['dim_payment_method']['payment_method_sk'])]
    if len(orphaned_payments) > 0:
        issues.append(f"Orphaned payment_method_sk in fact_sales_transaction: {len(orphaned_payments)} records")
    else:
        print("✓ All payment_method_sk values have valid references")
    
    return issues

def validate_business_rules(data):
    """Validate business logic and calculations"""
    print("\n=== Business Rules Validation ===")
    
    issues = []
    fact_sales = data['fact_sales_transaction']
    
    # Check for negative amounts (except refunds)
    negative_sales = fact_sales[(fact_sales['net_sales_amount'] < 0) & (fact_sales['is_refund'] == False)]
    if len(negative_sales) > 0:
        issues.append(f"Negative sales amounts for non-refunds: {len(negative_sales)} records")
    else:
        print("✓ No invalid negative sales amounts")
    
    # Check quantity consistency
    zero_quantity = fact_sales[fact_sales['item_quantity'] <= 0]
    if len(zero_quantity) > 0:
        issues.append(f"Zero or negative quantities: {len(zero_quantity)} records")
    else:
        print("✓ All quantities are positive")
    
    # Check extended price calculation
    price_mismatch = fact_sales[
        abs(fact_sales['extended_price'] - (fact_sales['unit_price'] * fact_sales['item_quantity'])) > 0.01
    ]
    if len(price_mismatch) > 0:
        issues.append(f"Extended price calculation errors: {len(price_mismatch)} records")
    else:
        print("✓ Extended price calculations are correct")
    
    # Check tax calculations (approximate)
    expected_tax = fact_sales['net_sales_amount'] * 0.0875  # 8.75% tax rate
    tax_variance = abs(fact_sales['tax_amount'] - expected_tax)
    high_variance = tax_variance > 0.10  # Allow 10 cent variance
    if high_variance.sum() > 0:
        issues.append(f"Tax calculation variances: {high_variance.sum()} records")
    else:
        print("✓ Tax calculations are within acceptable range")
    
    return issues

def validate_modifier_relationships(data):
    """Validate modifier bridge table relationships"""
    print("\n=== Modifier Relationship Validation ===")
    
    issues = []
    bridge = data['bridge_transaction_modifier']
    fact_sales = data['fact_sales_transaction']
    dim_item = data['dim_item']
    
    # Check transaction references
    orphaned_transactions = bridge[~bridge['transaction_sk'].isin(fact_sales['transaction_sk'])]
    if len(orphaned_transactions) > 0:
        issues.append(f"Orphaned transaction_sk in bridge table: {len(orphaned_transactions)} records")
    else:
        print("✓ All bridge transaction references are valid")
    
    # Check modifier references
    orphaned_modifiers = bridge[~bridge['modifier_sk'].isin(dim_item['item_sk'])]
    if len(orphaned_modifiers) > 0:
        issues.append(f"Orphaned modifier_sk in bridge table: {len(orphaned_modifiers)} records")
    else:
        print("✓ All bridge modifier references are valid")
    
    # Check that modifier_sk references are actually modifiers
    modifier_items = dim_item[dim_item['item_type'] == 'MODIFIER']['item_sk']
    non_modifier_refs = bridge[~bridge['modifier_sk'].isin(modifier_items)]
    if len(non_modifier_refs) > 0:
        issues.append(f"Non-modifier items referenced as modifiers: {len(non_modifier_refs)} records")
    else:
        print("✓ All modifier references point to actual modifier items")
    
    return issues

def generate_sample_analytics(data):
    """Generate sample analytics to demonstrate cube capabilities"""
    print("\n=== Sample Analytics ===")
    
    fact_sales = data['fact_sales_transaction']
    dim_item = data['dim_item']
    dim_location = data['dim_location']
    dim_customer = data['dim_customer']
    bridge = data['bridge_transaction_modifier']
    
    # Top selling items
    item_sales = fact_sales.groupby('item_sk').agg({
        'net_sales_amount': 'sum',
        'item_quantity': 'sum',
        'transaction_sk': 'count'
    }).round(2)
    
    top_items = item_sales.nlargest(5, 'net_sales_amount')
    print("\nTop 5 Items by Revenue:")
    for item_sk, row in top_items.iterrows():
        item_name = dim_item[dim_item['item_sk'] == item_sk]['item_name'].iloc[0]
        print(f"  {item_name}: ${row['net_sales_amount']} ({row['item_quantity']} units)")
    
    # Sales by location
    location_sales = fact_sales.groupby('location_sk')['net_sales_amount'].sum().round(2)
    print("\nSales by Location:")
    for location_sk, sales in location_sales.items():
        location_name = dim_location[dim_location['location_sk'] == location_sk]['location_name'].iloc[0]
        print(f"  {location_name}: ${sales}")
    
    # Customer segment analysis
    customer_sales = fact_sales.merge(dim_customer, on='customer_sk', how='left')
    segment_analysis = customer_sales.groupby('customer_segment').agg({
        'net_sales_amount': ['sum', 'mean', 'count']
    }).round(2)
    
    print("\nCustomer Segment Analysis:")
    for segment in segment_analysis.index:
        if pd.notna(segment):
            total_sales = segment_analysis.loc[segment, ('net_sales_amount', 'sum')]
            avg_transaction = segment_analysis.loc[segment, ('net_sales_amount', 'mean')]
            transaction_count = segment_analysis.loc[segment, ('net_sales_amount', 'count')]
            print(f"  {segment}: ${total_sales} total, ${avg_transaction} avg, {transaction_count} transactions")
    
    # Modifier attachment rates
    transactions_with_modifiers = bridge['transaction_sk'].nunique()
    total_transactions = fact_sales['transaction_sk'].nunique()
    attachment_rate = (transactions_with_modifiers / total_transactions * 100)
    print(f"\nModifier Attachment Rate: {attachment_rate:.1f}%")
    
    # Most popular modifiers
    modifier_popularity = bridge.groupby('modifier_sk').agg({
        'transaction_sk': 'count',
        'modifier_amount': 'sum'
    }).round(2)
    
    top_modifiers = modifier_popularity.nlargest(3, 'transaction_sk')
    print("\nTop 3 Modifiers by Usage:")
    for modifier_sk, row in top_modifiers.iterrows():
        modifier_name = dim_item[dim_item['item_sk'] == modifier_sk]['item_name'].iloc[0]
        usage_count = row['transaction_sk']
        total_revenue = row['modifier_amount']
        print(f"  {modifier_name}: {usage_count} uses, ${total_revenue} revenue")

def main():
    """Main validation function"""
    print("Square OLAP Cube Data Validation")
    print("=" * 40)
    
    # Load data
    data = load_csv_files()
    if data is None:
        print("Failed to load data files. Exiting.")
        return
    
    # Run validations
    all_issues = []
    
    all_issues.extend(validate_referential_integrity(data))
    all_issues.extend(validate_business_rules(data))
    all_issues.extend(validate_modifier_relationships(data))
    
    # Summary
    print("\n=== Validation Summary ===")
    if all_issues:
        print(f"⚠️  Found {len(all_issues)} issues:")
        for issue in all_issues:
            print(f"  - {issue}")
    else:
        print("✅ All validations passed successfully!")
    
    # Generate sample analytics
    generate_sample_analytics(data)
    
    print("\n=== Validation Complete ===")
    print("Data is ready for OLAP cube implementation.")

if __name__ == "__main__":
    main()
