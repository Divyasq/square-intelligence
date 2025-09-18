// Funding data for businesses seeking investment
const fundingData = {
    1: { // Mama Rosa's Italian Kitchen
        currentFunding: 18750,
        goalAmount: 25000,
        backers: 47,
        daysLeft: 23,
        monthlyGrowth: [
            { month: "Jan", revenue: 12500, customers: 320 },
            { month: "Feb", revenue: 15200, customers: 385 },
            { month: "Mar", revenue: 18900, customers: 450 },
            { month: "Apr", revenue: 22100, customers: 520 },
            { month: "May", revenue: 26800, customers: 615 },
            { month: "Jun", revenue: 31200, customers: 720 }
        ],
        supporters: [
            {
                name: "Sarah Chen",
                type: "Community Member",
                amount: 500,
                message: "Love supporting local Italian food! Can't wait for the new pizza oven.",
                avatar: "SC"
            },
            {
                name: "Green Thumb Garden Center",
                type: "Local Business",
                amount: 1000,
                message: "Proud to support our neighborhood restaurants. We supply their fresh herbs!",
                avatar: "GT"
            },
            {
                name: "Mike Rodriguez",
                type: "Regular Customer",
                amount: 250,
                message: "Been eating here for 5 years. Excited to see them grow!",
                avatar: "MR"
            },
            {
                name: "Downtown Business Alliance",
                type: "Business Association",
                amount: 2500,
                message: "Investing in the future of our downtown district.",
                avatar: "DBA"
            },
            {
                name: "Lisa Park",
                type: "Food Blogger",
                amount: 150,
                message: "Mama Rosa's deserves all the success. Their tiramisu is legendary!",
                avatar: "LP"
            },
            {
                name: "Fix-It Frank's Repair Shop",
                type: "Local Business",
                amount: 300,
                message: "Supporting fellow small business owners in our community!",
                avatar: "FF"
            }
        ]
    },
    3: { // Fix-It Frank's Repair Shop
        currentFunding: 11200,
        goalAmount: 15000,
        backers: 32,
        daysLeft: 18,
        monthlyGrowth: [
            { month: "Jan", revenue: 8500, customers: 45 },
            { month: "Feb", revenue: 9200, customers: 52 },
            { month: "Mar", revenue: 10800, customers: 61 },
            { month: "Apr", revenue: 12500, customers: 68 },
            { month: "May", revenue: 14200, customers: 78 },
            { month: "Jun", revenue: 16800, customers: 89 }
        ],
        supporters: [
            {
                name: "Tech Startup Hub",
                type: "Business Community",
                amount: 2000,
                message: "Frank has saved our equipment countless times. Investing in reliability!",
                avatar: "TSH"
            },
            {
                name: "Maria Santos",
                type: "Homeowner",
                amount: 200,
                message: "Frank fixed my washing machine when others said it was hopeless. True craftsman!",
                avatar: "MS"
            },
            {
                name: "Bella's Beauty Salon",
                type: "Local Business",
                amount: 400,
                message: "Frank maintains all our salon equipment. Supporting skilled trades!",
                avatar: "BB"
            },
            {
                name: "David Kim",
                type: "Small Business Owner",
                amount: 300,
                message: "Quality repair work is rare these days. Frank is a neighborhood treasure.",
                avatar: "DK"
            },
            {
                name: "Community Tool Library",
                type: "Non-Profit",
                amount: 500,
                message: "Frank volunteers to teach repair workshops. Investing in community skills!",
                avatar: "CTL"
            }
        ]
    },
    5: { // The Book Nook
        currentFunding: 6400,
        goalAmount: 8500,
        backers: 28,
        daysLeft: 31,
        monthlyGrowth: [
            { month: "Jan", revenue: 4200, customers: 180 },
            { month: "Feb", revenue: 4800, customers: 205 },
            { month: "Mar", revenue: 5500, customers: 235 },
            { month: "Apr", revenue: 6200, customers: 268 },
            { month: "May", revenue: 7100, customers: 295 },
            { month: "Jun", revenue: 8200, customers: 340 }
        ],
        supporters: [
            {
                name: "Teachers Union Local 401",
                type: "Professional Group",
                amount: 1200,
                message: "Supporting literacy and learning in our community. Books change lives!",
                avatar: "TU"
            },
            {
                name: "Emma Thompson",
                type: "Parent",
                amount: 150,
                message: "My kids love story time here. Expanding the children's section is perfect!",
                avatar: "ET"
            },
            {
                name: "Sunrise Yoga Studio",
                type: "Local Business",
                amount: 250,
                message: "Books and mindfulness go hand in hand. Supporting our literary neighbors!",
                avatar: "SY"
            },
            {
                name: "Robert Chen",
                type: "Author",
                amount: 300,
                message: "Independent bookstores are the heart of literary communities.",
                avatar: "RC"
            },
            {
                name: "PTA Riverside Elementary",
                type: "Parent Group",
                amount: 400,
                message: "Investing in spaces where children can discover the joy of reading.",
                avatar: "PTA"
            },
            {
                name: "Corner Deli & Market",
                type: "Local Business",
                amount: 100,
                message: "Books and coffee - perfect combination! Supporting our book-loving neighbors.",
                avatar: "CD"
            }
        ]
    }
};

// Function to get funding data by business ID
function getFundingData(businessId) {
    return fundingData[businessId] || null;
}

// Function to calculate funding progress percentage
function calculateProgress(current, goal) {
    return Math.min((current / goal) * 100, 100);
}

// Function to calculate monthly growth rate
function calculateGrowthRate(data) {
    if (data.length < 2) return 0;
    const latest = data[data.length - 1];
    const previous = data[data.length - 2];
    return ((latest.revenue - previous.revenue) / previous.revenue * 100).toFixed(1);
}

// Function to calculate customer growth rate
function calculateCustomerGrowth(data) {
    if (data.length < 2) return 0;
    const latest = data[data.length - 1];
    const previous = data[data.length - 2];
    return ((latest.customers - previous.customers) / previous.customers * 100).toFixed(1);
}
