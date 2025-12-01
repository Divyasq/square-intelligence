import csv
import json

# Create CSV files that can be easily imported into Excel
def create_schema_csv():
    
    # Cubes Overview Data
    cubes_data = [
        ['Cube Name', 'Title', 'Description', 'Is Visible', 'Is Public', 'Measures Count', 'Dimensions Count', 'Segments Count', 'Category'],
        ['Catalog', 'Catalog', 'Catalog object information, used for data about specific items, modifiers, discounts, categories, etc.', 'TRUE', 'TRUE', '1', '9', '4', 'Business Configuration'],
        ['Channel', 'Channel', 'Sales channel details. A sales channel represents where an order originated (IN-STORE, ONLINE, INVOICE, OTHER).', 'TRUE', 'TRUE', '1', '8', '2', 'Business Configuration'],
        ['CustomerSnapshots', 'Customer Snapshots', 'Contains information about the customer at the time of each order, like if it was their first purchase or if they were loyalty members.', 'TRUE', 'TRUE', '9', '7', '0', 'Customer & Operations'],
        ['Fees', 'Fees', 'Fees data for Payments and Refunds. Likely to see this in something like Fees report.', 'TRUE', 'TRUE', '2', '16', '0', 'Core Transaction Data'],
        ['ItemDiscountsAndComps', 'Item Discounts and Comps', 'Represents discounts and comps applied to line items. Sold items have positive amounts, returned have negative amounts.', 'TRUE', 'TRUE', '16', '12', '6', 'Item-Level Data'],
        ['ItemTransactions', 'Item Transactions', 'Transaction data for line items, including sales and returns. Sold items have positive amounts, returned item have negative amounts.', 'TRUE', 'TRUE', '22', '10', '2', 'Item-Level Data'],
        ['Location', 'Location', 'Location (unit) information including location name, timezone, and status. This cube contains the latest state of each location.', 'TRUE', 'TRUE', '1', '5', '0', 'Business Configuration'],
        ['ModifiersTransacted', 'Modifiers Transacted', 'Transaction data for modifiers, including sales and returns. Sold items have positive amounts, returned item have negative amounts.', 'TRUE', 'TRUE', '12', '14', '2', 'Item-Level Data'],
        ['Orders', 'Orders', 'Top level Order data (sales and returns), like top line product sales, net sales, etc. that you would see in something like a Sales Summary report.', 'TRUE', 'TRUE', '16', '18', '0', 'Core Transaction Data'],
        ['OrdersLive', 'Orders Live', 'Real-time order data from OpenSearch. By default, this cube returns all orders, including draft, closed, failed, canceled, fraud, and no sale orders.', 'TRUE', 'TRUE', '16', '16', '1', 'Core Transaction Data'],
        ['PaymentAndRefunds', 'Payment and Refunds', 'Top level Payments and Refunds data, including itemized payment amounts and tip amounts. Likely to see this in something like Payment Methods report.', 'TRUE', 'TRUE', '5', '28', '2', 'Core Transaction Data'],
        ['Voids', 'Voids', 'Void transactions representing canceled or voided line items in orders. Tracks void operations with attribution, reasons, and item-level details.', 'TRUE', 'TRUE', '4', '20', '0', 'Customer & Operations']
    ]
    
    # Key Measures Data
    measures_data = [
        ['Cube Name', 'Measure Name', 'Title', 'Description', 'Type', 'Aggregation Type', 'Format', 'Business Purpose'],
        ['Orders', 'Orders.count', 'Orders Count', 'Total number of orders', 'number', 'count', '', 'Track order volume'],
        ['Orders', 'Orders.top_line_product_sales', 'Top Line Product Sales', 'Gross Sales - top-line product sales without counting refunds, discounts, comps, tips, tax, fees, or gift card sales', 'number', 'sum', 'currency', 'Revenue measurement'],
        ['Orders', 'Orders.net_sales', 'Net Sales', 'Top line sales after discounts and itemized returns', 'number', 'sum', 'currency', 'True revenue after adjustments'],
        ['Orders', 'Orders.total_collected_amount', 'Total Collected Amount', 'Total amount collected from the customer. Includes modifiers, discounts, tips, tax, gift card sales, returns, refunds, and cash rounding', 'number', 'sum', 'currency', 'Actual cash collected'],
        ['PaymentAndRefunds', 'PaymentAndRefunds.total_amount', 'Total Amount', 'The total amount for the payment, including amount and tip, or the amount of money refunded', 'number', 'sum', 'currency', 'Payment processing tracking'],
        ['ItemTransactions', 'ItemTransactions.item_gross_sales', 'Item Gross Sales', 'Gross sales amount (sales are positive, returns are negative)', 'number', 'sum', 'currency', 'Item-level revenue'],
        ['ItemTransactions', 'ItemTransactions.net_quantity', 'Net Quantity', 'Net quantity (sales are positive, returns are negative)', 'number', 'sum', '', 'Item volume tracking'],
        ['CustomerSnapshots', 'CustomerSnapshots.customers_first_purchase_at_merchant_count', 'New Customers Count', 'Count of new customers (first order with merchant)', 'number', 'sum', '', 'Customer acquisition'],
        ['Fees', 'Fees.amount_money', 'Fee Amount', 'The fee amount. Displayed as a negative value to represent costs incurred by the seller', 'number', 'sum', 'currency', 'Cost tracking'],
        ['Voids', 'Voids.total_amount_voided', 'Total Amount Voided', 'Total amount of voided line items', 'number', 'sum', 'currency', 'Loss tracking']
    ]
    
    # Key Dimensions Data  
    dimensions_data = [
        ['Cube Name', 'Dimension Name', 'Title', 'Description', 'Type', 'Primary Key', 'Business Use Case'],
        ['Orders', 'Orders.merchant_id', 'Merchant Id', 'The current merchant token for the order', 'string', 'FALSE', 'Multi-tenant filtering'],
        ['Orders', 'Orders.location_id', 'Location Id', 'The seller location that this order is associated with', 'string', 'FALSE', 'Location-based analysis'],
        ['Orders', 'Orders.sales_channel_id', 'Sales Channel Id', 'The sales channel associated with the order', 'string', 'FALSE', 'Channel performance analysis'],
        ['Orders', 'Orders.created_at', 'Created At', 'The timestamp when the order was created', 'time', 'FALSE', 'Time-based analysis'],
        ['Orders', 'Orders.customer_id', 'Customer Id', 'The customer associated with the order', 'string', 'FALSE', 'Customer analysis'],
        ['ItemTransactions', 'ItemTransactions.item_name', 'Item Name', 'Name of the item', 'string', 'FALSE', 'Product performance'],
        ['ItemTransactions', 'ItemTransactions.category_name', 'Category Name', 'Name of the category of the item', 'string', 'FALSE', 'Category analysis'],
        ['PaymentAndRefunds', 'PaymentAndRefunds.payment_method', 'Payment Method', 'The method of payment', 'string', 'FALSE', 'Payment method analysis'],
        ['Channel', 'Channel.channel_category', 'Channel Category', 'High-level channel category (IN-STORE, ONLINE, INVOICE, OTHER)', 'string', 'FALSE', 'Sales channel grouping'],
        ['Location', 'Location.location_name', 'Location Name', 'Display name/nickname of the location', 'string', 'FALSE', 'Location identification']
    ]
    
    # Business Use Cases
    use_cases_data = [
        ['Use Case Category', 'Use Case', 'Primary Cubes', 'Key Measures', 'Key Dimensions', 'Description'],
        ['Sales Performance', 'Daily Sales Summary', 'Orders', 'net_sales, total_collected_amount, count', 'created_at, location_id', 'Track daily sales performance across locations'],
        ['Product Analysis', 'Top Selling Items', 'ItemTransactions', 'item_gross_sales, net_quantity', 'item_name, category_name', 'Identify best performing products'],
        ['Customer Insights', 'New vs Returning Customers', 'CustomerSnapshots', 'customers_first_purchase_at_merchant_count, new_customer_percentage_at_merchant', 'order_created_at', 'Analyze customer acquisition and retention'],
        ['Payment Analysis', 'Payment Method Performance', 'PaymentAndRefunds', 'total_amount, count', 'payment_method, payment_card_brand', 'Understand payment preferences'],
        ['Channel Performance', 'Sales by Channel', 'Orders, Channel', 'net_sales, count', 'sales_channel_id, channel_category', 'Compare performance across sales channels'],
        ['Financial Reconciliation', 'Fee Analysis', 'Fees', 'amount_money', 'fee_type, fee_category', 'Track processing costs'],
        ['Inventory Management', 'Product Movement', 'ItemTransactions, ModifiersTransacted', 'net_quantity, count', 'item_name, transacted_at', 'Monitor inventory flow'],
        ['Operational Efficiency', 'Void Analysis', 'Voids', 'total_amount_voided, count', 'void_reason, team_member_id', 'Identify operational issues']
    ]
    
    # Write CSV files
    with open('/Users/divyac/financial-suite/Square_Schema_Cubes.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerows(cubes_data)
    
    with open('/Users/divyac/financial-suite/Square_Schema_Measures.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerows(measures_data)
    
    with open('/Users/divyac/financial-suite/Square_Schema_Dimensions.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerows(dimensions_data)
        
    with open('/Users/divyac/financial-suite/Square_Schema_Use_Cases.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerows(use_cases_data)
    
    print("CSV files created successfully!")
    print("Files created:")
    print("- Square_Schema_Cubes.csv")
    print("- Square_Schema_Measures.csv") 
    print("- Square_Schema_Dimensions.csv")
    print("- Square_Schema_Use_Cases.csv")

if __name__ == "__main__":
    create_schema_csv()
