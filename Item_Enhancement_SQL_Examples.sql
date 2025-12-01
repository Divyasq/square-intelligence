
-- ITEM METRICS ENHANCEMENT SQL EXAMPLES

-- 1. Enhanced ItemTransactions with your requested dimensions
CREATE VIEW ItemTransactions_Enhanced AS
SELECT 
    it.*,
    o.team_member_collected as employee_id,
    o.team_member_name as employee_name,  -- After Orders enhancement
    o.order_name,                         -- After Orders enhancement  
    o.section_id,                         -- After Orders enhancement
    o.section_name,                       -- After Orders enhancement
    o.sale_timestamp as order_completed,
    cs.customers_first_purchase_at_merchant as is_new_customer,
    cs.had_loyalty_at_purchase as has_loyalty,
    cs.customer_visit_frequency,          -- After CustomerSnapshots enhancement
    pr.device_id,
    pr.device_nickname,
    pr.device_type                        -- After PaymentAndRefunds enhancement
FROM ItemTransactions it
LEFT JOIN Orders o ON it.order_id = o.order_id
LEFT JOIN CustomerSnapshots cs ON it.order_id = cs.id  
LEFT JOIN PaymentAndRefunds pr ON it.order_id = pr.order_id;

-- 2. Item Performance by Employee Query (after enhancements)
SELECT 
    employee_name,
    item_name,
    category_name,
    SUM(item_gross_sales) as total_sales,
    SUM(net_quantity) as total_quantity,
    COUNT(DISTINCT order_id) as orders_count,
    AVG(item_gross_sales) as avg_sale_amount
FROM ItemTransactions_Enhanced 
WHERE transacted_at >= '2024-01-01'
GROUP BY employee_name, item_name, category_name
ORDER BY total_sales DESC;

-- 3. Customer Segment Item Preferences (after enhancements)  
SELECT 
    CASE 
        WHEN is_new_customer = true THEN 'New Customer'
        WHEN has_loyalty = true THEN 'Loyalty Member'  
        ELSE 'Regular Customer'
    END as customer_segment,
    item_name,
    category_name,
    SUM(item_gross_sales) as segment_sales,
    SUM(net_quantity) as segment_quantity,
    COUNT(DISTINCT order_id) as segment_orders
FROM ItemTransactions_Enhanced
WHERE transacted_at >= '2024-01-01'
GROUP BY customer_segment, item_name, category_name
ORDER BY customer_segment, segment_sales DESC;

-- 4. Device Performance by Product (after enhancements)
SELECT 
    device_nickname,
    device_type,
    item_name,
    SUM(item_gross_sales) as device_item_sales,
    SUM(net_quantity) as device_item_quantity,
    AVG(item_gross_sales) as avg_item_sale
FROM ItemTransactions_Enhanced
WHERE transacted_at >= '2024-01-01'
    AND device_nickname IS NOT NULL
GROUP BY device_nickname, device_type, item_name
ORDER BY device_item_sales DESC;
