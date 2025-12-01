#!/usr/bin/env python3
"""
Final Summary Table - Customer Segment Analysis
Shows exactly what items drive the customer segment performance
"""

def create_final_summary():
    print("=" * 120)
    print("SQUARE OLAP CUBE - FINAL CUSTOMER SEGMENT ANALYSIS")
    print("Question: What customer segments drive revenue and from what items?")
    print("=" * 120)
    print()
    
    # The corrected insight from our actual data
    print("🔍 KEY INSIGHT CORRECTION:")
    print("   Original claim: VIP customers (26.7% of base) generate 35% of revenue")
    print("   ACTUAL DATA:    VIP customers (26.7% of base) generate 19.4% of revenue")
    print("   FINDING:        VIP segment is UNDERPERFORMING expectations")
    print()
    
    print("📊 CUSTOMER SEGMENT PERFORMANCE TABLE")
    print("=" * 120)
    print(f"{'Segment':<12} {'% of':<6} {'% of':<6} {'Gross':<10} {'Avg per':<10} {'Performance':<12} {'Top Category':<15} {'Key Items'}")
    print(f"{'':<12} {'Base':<6} {'Revenue':<6} {'Sales':<10} {'Customer':<10} {'vs Expected':<12} {'(% of segment)':<15} {'Driving Revenue'}")
    print("-" * 120)
    
    # Data from our analysis
    segments = [
        {
            'name': 'Regular',
            'pct_base': 53.3,
            'pct_revenue': 44.1,
            'gross_sales': 65.10,
            'avg_customer': 8.14,
            'performance': 'Underperform',
            'top_category': 'Espresso (23.3%)',
            'key_items': 'Latte, Cappuccino, Americano'
        },
        {
            'name': 'VIP',
            'pct_base': 26.7,
            'pct_revenue': 19.4,
            'gross_sales': 28.70,
            'avg_customer': 7.17,
            'performance': 'Underperform',
            'top_category': 'Espresso (59.4%)',
            'key_items': 'Cappuccino, Mocha, Caesar Salad'
        },
        {
            'name': 'New',
            'pct_base': 13.3,
            'pct_revenue': 19.6,
            'gross_sales': 28.90,
            'avg_customer': 14.45,
            'performance': 'Excellent',
            'top_category': 'Ice Cream (44.8%)',
            'key_items': 'Vanilla Ice Cream, Mocha, Frappuccino'
        },
        {
            'name': 'Inactive',
            'pct_base': 6.7,
            'pct_revenue': 16.9,
            'gross_sales': 24.90,
            'avg_customer': 24.90,
            'performance': 'Excellent',
            'top_category': 'Coffee Beans (64.1%)',
            'key_items': 'Coffee Beans 1lb, Club Sandwich'
        }
    ]
    
    for segment in segments:
        perf_icon = "⭐" if segment['performance'] == 'Excellent' else "⚠️"
        print(f"{segment['name']:<12} {segment['pct_base']:<5.1f}% {segment['pct_revenue']:<5.1f}% "
              f"${segment['gross_sales']:<9.2f} ${segment['avg_customer']:<9.2f} "
              f"{perf_icon} {segment['performance']:<10} {segment['top_category']:<15} {segment['key_items']}")
    
    print()
    print("📈 CATEGORY PERFORMANCE BY CUSTOMER SEGMENT")
    print("=" * 100)
    print(f"{'Category':<15} {'Total':<8} {'VIP':<8} {'Regular':<8} {'New':<8} {'Inactive':<8} {'Top Segment'}")
    print(f"{'':<15} {'Revenue':<8} {'Share':<8} {'Share':<8} {'Share':<8} {'Share':<8} {'(% of category)'}")
    print("-" * 100)
    
    categories = [
        {'name': 'Espresso', 'total': 42.20, 'vip': 40.4, 'regular': 35.9, 'new': 23.7, 'inactive': 0.0, 'top': 'VIP (40.4%)'},
        {'name': 'Sandwiches', 'total': 17.90, 'vip': 0.0, 'regular': 50.0, 'new': 0.0, 'inactive': 50.0, 'top': 'Regular/Inactive (50% each)'},
        {'name': 'Cold Drinks', 'total': 17.20, 'vip': 0.0, 'regular': 65.4, 'new': 34.6, 'inactive': 0.0, 'top': 'Regular (65.4%)'},
        {'name': 'Coffee Beans', 'total': 15.95, 'vip': 0.0, 'regular': 0.0, 'new': 0.0, 'inactive': 100.0, 'top': 'Inactive (100%)'},
        {'name': 'Ice Cream', 'total': 12.95, 'vip': 0.0, 'regular': 0.0, 'new': 100.0, 'inactive': 0.0, 'top': 'New (100%)'},
        {'name': 'Pastries', 'total': 11.70, 'vip': 33.8, 'regular': 66.2, 'new': 0.0, 'inactive': 0.0, 'top': 'Regular (66.2%)'},
        {'name': 'Salads', 'total': 11.45, 'vip': 34.5, 'regular': 65.5, 'new': 0.0, 'inactive': 0.0, 'top': 'Regular (65.5%)'},
        {'name': 'Brewed Coffee', 'total': 10.75, 'vip': 34.9, 'regular': 65.1, 'new': 0.0, 'inactive': 0.0, 'top': 'Regular (65.1%)'}
    ]
    
    for cat in categories:
        print(f"{cat['name']:<15} ${cat['total']:<7.2f} {cat['vip']:<7.1f}% {cat['regular']:<7.1f}% "
              f"{cat['new']:<7.1f}% {cat['inactive']:<7.1f}% {cat['top']}")
    
    print()
    print("💡 KEY BUSINESS INSIGHTS & RECOMMENDATIONS")
    print("=" * 80)
    print("1. VIP SEGMENT ISSUE:")
    print("   • VIP customers spending LESS per person ($7.17) than New customers ($14.45)")
    print("   • VIP preference: Espresso products (59% of their spending)")
    print("   • Recommendation: Targeted upselling on high-margin items to VIPs")
    print()
    print("2. HIGH-PERFORMING SEGMENTS:")
    print("   • New customers: 13.3% of base → 19.6% of revenue (47% over-index)")
    print("   • Inactive customers: 6.7% of base → 16.9% of revenue (152% over-index)")
    print("   • These segments show strong per-customer value")
    print()
    print("3. CATEGORY OPPORTUNITIES:")
    print("   • Espresso: Strongest category ($42.20 total) - focus on VIP upselling")
    print("   • Coffee Beans: High-value items ($15.95 avg) - target all segments")
    print("   • Ice Cream: New customer favorite - use for customer acquisition")
    print()
    print("4. STRATEGIC RECOMMENDATIONS:")
    print("   • VIP Re-engagement: Develop premium espresso offerings and loyalty rewards")
    print("   • New Customer Retention: Convert high-value new customers to regular/VIP")
    print("   • Regular Customer Upselling: Largest segment (53.3%) with room for growth")
    print("   • Cross-selling: Promote high-margin categories across all segments")
    
    print()
    print("=" * 120)
    print("SUMMARY: Total Revenue $147.60 from 15 customers across 4 segments")
    print("Key Finding: VIP segment underperforming - opportunity for targeted growth")
    print("=" * 120)

if __name__ == "__main__":
    create_final_summary()
