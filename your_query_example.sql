-- YOUR REQUESTED ANALYSIS: Gross Sales with All Available Dimensions
-- This query gets as close as possible to your requirements using Square's schema

SELECT 
    -- Core identifiers
    o.order_id,                                    -- ✅ Order ID (exact match)
    -- NOTE: Order Name not available in Square schema
    
    -- Financial metrics  
    o.top_line_product_sales AS gross_sales,       -- ✅ Gross Sales (perfect match)
    
    -- Device information
    pr.device_id,                                  -- ✅ Device 
    pr.device_nickname,                            -- ✅ Device Nickname (exact match)
    
    -- Channel information
    c.channel_name AS channel,                     -- ✅ Channel (via join)
    c.channel_category,                            -- Additional: Channel category (IN-STORE, ONLINE, etc.)
    -- NOTE: Section not available in Square schema
    
    -- Staff information
    o.team_member_collected AS employee,           -- ✅ Employee (team member who collected payment)
    
    -- Location information  
    l.location_name AS location,                   -- ✅ Location (via join)
    
    -- Customer information
    o.customer_id AS customer,                     -- ✅ Customer ID
    
    -- Customer segmentation
    CASE 
        WHEN cs.customers_first_purchase_at_merchant = true THEN 'New'
        WHEN cs.customers_first_purchase_at_merchant = false THEN 'Returning' 
        ELSE 'Unknown'
    END AS customer_type_new_returning,            -- ✅ New/Returning classification
    
    CASE 
        WHEN cs.had_loyalty_at_purchase = true THEN 'Loyalty Member'
        ELSE 'Non-Loyalty'
    END AS customer_loyalty_status,                -- ✅ Loyalty status
    
    -- Order timing
    o.created_at AS order_created,                 -- ✅ Order Created (exact match)
    o.sale_timestamp AS order_completed,           -- ✅ Order Completed (when payment received)
    o.state AS order_status,                       -- Additional: Order status (COMPLETED, OPEN, etc.)
    
    -- Customer visit frequency (calculated)
    customer_visits.visit_frequency                -- ⚠️ Customer visit frequency (via subquery)

FROM Orders o

-- Join for customer segmentation
LEFT JOIN CustomerSnapshots cs ON o.order_id = cs.id

-- Join for device information  
LEFT JOIN PaymentAndRefunds pr ON o.order_id = pr.order_id

-- Join for location details
LEFT JOIN Location l ON o.location_id = l.location_id

-- Join for channel details
LEFT JOIN Channel c ON o.sales_channel_id = c.channel_id

-- Subquery for customer visit frequency
LEFT JOIN (
    SELECT 
        customer_id,
        COUNT(*) as visit_frequency,
        ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY created_at DESC) as rn
    FROM Orders 
    WHERE customer_id IS NOT NULL
    GROUP BY customer_id
) customer_visits ON o.customer_id = customer_visits.customer_id AND customer_visits.rn = 1

WHERE 
    o.created_at >= '2024-01-01'  -- Filter for date range as needed
    AND o.state IN ('COMPLETED', 'OPEN')  -- Only include valid orders

ORDER BY o.created_at DESC;

-- ALTERNATIVE SIMPLER QUERY (without customer visit frequency calculation)
/*
SELECT 
    o.order_id,
    o.top_line_product_sales AS gross_sales,
    pr.device_nickname,
    c.channel_name,
    l.location_name, 
    o.team_member_collected AS employee,
    o.customer_id,
    cs.customers_first_purchase_at_merchant AS is_new_customer,
    cs.had_loyalty_at_purchase AS has_loyalty,
    o.created_at AS order_created,
    o.sale_timestamp AS order_completed
FROM Orders o
LEFT JOIN CustomerSnapshots cs ON o.order_id = cs.id  
LEFT JOIN PaymentAndRefunds pr ON o.order_id = pr.order_id
LEFT JOIN Location l ON o.location_id = l.location_id
LEFT JOIN Channel c ON o.sales_channel_id = c.channel_id
WHERE o.created_at >= '2024-01-01'
ORDER BY o.created_at DESC;
*/
