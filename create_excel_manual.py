import csv
from datetime import datetime

def create_excel_compatible_csv():
    """Create a comprehensive CSV that can be easily imported into Excel"""
    
    # Main schema overview with all cubes
    all_data = []
    
    # Header row
    all_data.append([
        'Cube Name', 'Title', 'Description', 'Category', 'Is Visible', 'Is Public',
        'Measures Count', 'Dimensions Count', 'Segments Count', 'Key Business Purpose',
        'Primary Use Cases', 'Connected To'
    ])
    
    # All cube data
    cube_details = [
        {
            'name': 'Catalog',
            'title': 'Catalog',
            'description': 'Catalog object information, used for data about specific items, modifiers, discounts, categories, etc.',
            'category': 'Business Configuration',
            'visible': True,
            'public': True,
            'measures': 1,
            'dimensions': 9,
            'segments': 4,
            'purpose': 'Product catalog management and item configuration',
            'use_cases': 'Item setup, category management, discount configuration',
            'connected': 'ItemTransactions, ModifiersTransacted'
        },
        {
            'name': 'Channel',
            'title': 'Channel', 
            'description': 'Sales channel details. A sales channel represents where an order originated (IN-STORE, ONLINE, INVOICE, OTHER).',
            'category': 'Business Configuration',
            'visible': True,
            'public': True,
            'measures': 1,
            'dimensions': 8,
            'segments': 2,
            'purpose': 'Sales channel tracking and performance analysis',
            'use_cases': 'Channel performance, omnichannel analysis',
            'connected': 'Orders, PaymentAndRefunds'
        },
        {
            'name': 'CustomerSnapshots',
            'title': 'Customer Snapshots',
            'description': 'Contains information about the customer at the time of each order, like if it was their first purchase or if they were loyalty members.',
            'category': 'Customer & Operations',
            'visible': True,
            'public': True,
            'measures': 9,
            'dimensions': 7,
            'segments': 0,
            'purpose': 'Customer behavior analysis and segmentation',
            'use_cases': 'New vs returning customers, loyalty analysis, customer lifetime value',
            'connected': 'Orders'
        },
        {
            'name': 'Fees',
            'title': 'Fees',
            'description': 'Fees data for Payments and Refunds. Processing fees and transaction costs.',
            'category': 'Core Transaction Data',
            'visible': True,
            'public': True,
            'measures': 2,
            'dimensions': 16,
            'segments': 0,
            'purpose': 'Cost tracking and financial reconciliation',
            'use_cases': 'Fee analysis, cost optimization, financial reporting',
            'connected': 'PaymentAndRefunds'
        },
        {
            'name': 'ItemDiscountsAndComps',
            'title': 'Item Discounts and Comps',
            'description': 'Represents discounts and comps applied to line items. Sold items have positive amounts, returned have negative amounts.',
            'category': 'Item-Level Data',
            'visible': True,
            'public': True,
            'measures': 16,
            'dimensions': 12,
            'segments': 6,
            'purpose': 'Discount effectiveness and promotional analysis',
            'use_cases': 'Promotion performance, discount impact analysis, comp tracking',
            'connected': 'ItemTransactions, Orders'
        },
        {
            'name': 'ItemTransactions',
            'title': 'Item Transactions',
            'description': 'Transaction data for line items, including sales and returns. Sold items have positive amounts, returned item have negative amounts.',
            'category': 'Item-Level Data',
            'visible': True,
            'public': True,
            'measures': 22,
            'dimensions': 10,
            'segments': 2,
            'purpose': 'Product performance and inventory analysis',
            'use_cases': 'Top selling items, product performance, inventory management',
            'connected': 'Orders, Catalog'
        },
        {
            'name': 'Location',
            'title': 'Location',
            'description': 'Location (unit) information including location name, timezone, and status.',
            'category': 'Business Configuration',
            'visible': True,
            'public': True,
            'measures': 1,
            'dimensions': 5,
            'segments': 0,
            'purpose': 'Multi-location business management',
            'use_cases': 'Location performance comparison, operational management',
            'connected': 'Orders, PaymentAndRefunds, ItemTransactions'
        },
        {
            'name': 'ModifiersTransacted',
            'title': 'Modifiers Transacted',
            'description': 'Transaction data for modifiers, including sales and returns. Sold items have positive amounts, returned item have negative amounts.',
            'category': 'Item-Level Data',
            'visible': True,
            'public': True,
            'measures': 12,
            'dimensions': 14,
            'segments': 2,
            'purpose': 'Add-on and customization analysis',
            'use_cases': 'Modifier popularity, upselling analysis, customization trends',
            'connected': 'ItemTransactions, Catalog'
        },
        {
            'name': 'Orders',
            'title': 'Orders',
            'description': 'Top level Order data (sales and returns), like top line product sales, net sales, etc. that you would see in something like a Sales Summary report.',
            'category': 'Core Transaction Data',
            'visible': True,
            'public': True,
            'measures': 16,
            'dimensions': 18,
            'segments': 0,
            'purpose': 'Primary sales performance tracking',
            'use_cases': 'Sales summary, revenue analysis, business performance dashboard',
            'connected': 'All other cubes'
        },
        {
            'name': 'OrdersLive',
            'title': 'Orders Live',
            'description': 'Real-time order data from OpenSearch. By default, this cube returns all orders, including draft, closed, failed, canceled, fraud, and no sale orders.',
            'category': 'Core Transaction Data',
            'visible': True,
            'public': True,
            'measures': 16,
            'dimensions': 16,
            'segments': 1,
            'purpose': 'Real-time business monitoring',
            'use_cases': 'Live dashboards, real-time alerts, operational monitoring',
            'connected': 'Orders (real-time version)'
        },
        {
            'name': 'PaymentAndRefunds',
            'title': 'Payment and Refunds',
            'description': 'Top level Payments and Refunds data, including itemized payment amounts and tip amounts.',
            'category': 'Core Transaction Data',
            'visible': True,
            'public': True,
            'measures': 5,
            'dimensions': 28,
            'segments': 2,
            'purpose': 'Payment processing and method analysis',
            'use_cases': 'Payment method performance, refund analysis, tip tracking',
            'connected': 'Orders, Fees'
        },
        {
            'name': 'Voids',
            'title': 'Voids',
            'description': 'Void transactions representing canceled or voided line items in orders. Tracks void operations with attribution, reasons, and item-level details.',
            'category': 'Customer & Operations',
            'visible': True,
            'public': True,
            'measures': 4,
            'dimensions': 20,
            'segments': 0,
            'purpose': 'Operational efficiency and loss tracking',
            'use_cases': 'Void analysis, staff performance, operational improvements',
            'connected': 'Orders, ItemTransactions'
        }
    ]
    
    # Add all cube data to the main array
    for cube in cube_details:
        all_data.append([
            cube['name'],
            cube['title'],
            cube['description'],
            cube['category'],
            'TRUE' if cube['visible'] else 'FALSE',
            'TRUE' if cube['public'] else 'FALSE',
            cube['measures'],
            cube['dimensions'],
            cube['segments'],
            cube['purpose'],
            cube['use_cases'],
            cube['connected']
        ])
    
    # Write main file
    with open('/Users/divyac/financial-suite/Square_Schema_Complete.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerows(all_data)
    
    # Create summary statistics
    summary_data = [
        ['Metric', 'Value', 'Description'],
        ['Total Cubes', str(len(cube_details)), 'Total number of data cubes in the schema'],
        ['Total Measures', str(sum(cube['measures'] for cube in cube_details)), 'Total aggregatable metrics across all cubes'],
        ['Total Dimensions', str(sum(cube['dimensions'] for cube in cube_details)), 'Total attributes for filtering and grouping'],
        ['Total Segments', str(sum(cube['segments'] for cube in cube_details)), 'Total pre-defined filters across all cubes'],
        ['Core Transaction Cubes', '4', 'Orders, OrdersLive, PaymentAndRefunds, Fees'],
        ['Item-Level Cubes', '3', 'ItemTransactions, ItemDiscountsAndComps, ModifiersTransacted'],
        ['Configuration Cubes', '3', 'Catalog, Location, Channel'],
        ['Operations Cubes', '2', 'CustomerSnapshots, Voids'],
        ['', '', ''],
        ['Key Business Metrics Available', '', ''],
        ['Revenue Tracking', 'YES', 'Net sales, gross sales, total collected'],
        ['Customer Analytics', 'YES', 'New vs returning, loyalty analysis'],
        ['Product Performance', 'YES', 'Item sales, category analysis, modifier tracking'],
        ['Payment Analysis', 'YES', 'Payment methods, fees, refunds'],
        ['Operational Metrics', 'YES', 'Voids, discounts, channel performance'],
        ['Real-time Data', 'YES', 'OrdersLive cube for real-time monitoring']
    ]
    
    with open('/Users/divyac/financial-suite/Square_Schema_Summary.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerows(summary_data)
    
    # Create key measures reference
    key_measures = [
        ['Cube', 'Measure Name', 'Business Purpose', 'Format', 'Aggregation'],
        ['Orders', 'net_sales', 'Primary revenue metric after adjustments', 'Currency', 'Sum'],
        ['Orders', 'total_collected_amount', 'Actual cash collected from customers', 'Currency', 'Sum'],
        ['Orders', 'count', 'Number of orders/transactions', 'Number', 'Count'],
        ['ItemTransactions', 'item_gross_sales', 'Product-level revenue', 'Currency', 'Sum'],
        ['ItemTransactions', 'net_quantity', 'Items sold (net of returns)', 'Number', 'Sum'],
        ['PaymentAndRefunds', 'total_amount', 'Payment processing amounts', 'Currency', 'Sum'],
        ['CustomerSnapshots', 'customers_first_purchase_at_merchant_count', 'New customer acquisition', 'Number', 'Sum'],
        ['CustomerSnapshots', 'new_customer_percentage_at_merchant', 'Customer acquisition rate', 'Percentage', 'Average'],
        ['Fees', 'amount_money', 'Processing costs', 'Currency', 'Sum'],
        ['ItemDiscountsAndComps', 'total_discount_and_comp_amount', 'Promotional impact', 'Currency', 'Sum'],
        ['Voids', 'total_amount_voided', 'Operational losses', 'Currency', 'Sum']
    ]
    
    with open('/Users/divyac/financial-suite/Square_Schema_Key_Measures.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerows(key_measures)
    
    print("Comprehensive CSV files created successfully!")
    print("\nFiles created:")
    print("1. Square_Schema_Complete.csv - Full cube overview")
    print("2. Square_Schema_Summary.csv - Summary statistics")
    print("3. Square_Schema_Key_Measures.csv - Important metrics reference")
    print("\nThese CSV files can be easily imported into Excel for analysis.")

if __name__ == "__main__":
    create_excel_compatible_csv()
