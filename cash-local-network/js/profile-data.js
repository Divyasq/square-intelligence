// User Profile Data
const userProfile = {
    name: "SZA",
    avatar: "SZA",
    title: "Community Supporter",
    joinDate: "March 2024",
    totalSupported: 8750,
    btcEarned: 0.00234567,
    btcUsdValue: 156.78,
    discountsEarned: 12,
    businessesSupported: 6,
    causesSupported: 8,
    btcAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    // Tax Information
    taxBracket: 24, // 24% federal tax bracket
    totalCharitableDonations: 590, // Total qualifying charitable donations
    estimatedTaxSavings: 141.60, // 24% of charitable donations
    taxYear: 2024
};

// BTC Rewards History
const btcRewards = [
    {
        businessId: 1,
        businessName: "Mama Rosa's Italian Kitchen",
        businessIcon: "MR",
        amount: 0.00089234,
        usdValue: 59.67,
        cause: "Education Support",
        description: "Earned for supporting school meal programs",
        date: "2024-09-15",
        type: "cause_support"
    },
    {
        businessId: 3,
        businessName: "Fix-It Frank's Repair Shop",
        businessIcon: "FF",
        amount: 0.00067891,
        usdValue: 45.32,
        cause: "Environmental Impact",
        description: "Earned for supporting electronics recycling",
        date: "2024-09-10",
        type: "cause_support"
    },
    {
        businessId: 5,
        businessName: "The Book Nook",
        businessIcon: "BN",
        amount: 0.00056789,
        usdValue: 37.89,
        cause: "Literacy Programs",
        description: "Earned for supporting children's literacy",
        date: "2024-09-05",
        type: "cause_support"
    },
    {
        businessId: 1,
        businessName: "Mama Rosa's Italian Kitchen",
        businessIcon: "MR",
        amount: 0.00020653,
        usdValue: 13.90,
        cause: "Business Growth",
        description: "Earned for funding contribution milestone",
        date: "2024-08-28",
        type: "funding_milestone"
    }
];

// Discount Rewards History
const discountRewards = [
    {
        businessId: 1,
        businessName: "Mama Rosa's Italian Kitchen",
        businessIcon: "MR",
        discount: "15%",
        description: "Off your next meal for supporting our kitchen expansion",
        validUntil: "2024-10-15",
        date: "2024-09-15",
        used: false
    },
    {
        businessId: 2,
        businessName: "Green Thumb Garden Center",
        businessIcon: "GT",
        discount: "$10",
        description: "Off plants and gardening supplies",
        validUntil: "2024-10-01",
        date: "2024-09-12",
        used: true
    },
    {
        businessId: 3,
        businessName: "Fix-It Frank's Repair Shop",
        businessIcon: "FF",
        discount: "20%",
        description: "Off repair services for funding support",
        validUntil: "2024-11-10",
        date: "2024-09-10",
        used: false
    },
    {
        businessId: 5,
        businessName: "The Book Nook",
        businessIcon: "BN",
        discount: "Buy 2 Get 1 Free",
        description: "On all children's books",
        validUntil: "2024-10-05",
        date: "2024-09-05",
        used: false
    },
    {
        businessId: 4,
        businessName: "Sunrise Yoga Studio",
        businessIcon: "SY",
        discount: "Free Class",
        description: "Complimentary yoga session",
        validUntil: "2024-09-30",
        date: "2024-08-20",
        used: true
    }
];

// Supported Businesses Summary
const supportedBusinesses = [
    {
        businessId: 1,
        businessName: "Mama Rosa's Italian Kitchen",
        businessIcon: "MR",
        category: "Restaurant",
        totalSupported: 275,
        supportType: "funding",
        causesSupported: ["Education", "Emergency"],
        rewards: {
            btc: 0.00109887,
            discounts: ["15% off meals"]
        },
        lastSupport: "2024-09-15"
    },
    {
        businessId: 3,
        businessName: "Fix-It Frank's Repair Shop",
        businessIcon: "FF",
        category: "Service",
        totalSupported: 150,
        supportType: "funding",
        causesSupported: ["Environmental", "Education"],
        rewards: {
            btc: 0.00067891,
            discounts: ["20% off repairs"]
        },
        lastSupport: "2024-09-10"
    },
    {
        businessId: 5,
        businessName: "The Book Nook",
        businessIcon: "BN",
        category: "Retail",
        totalSupported: 100,
        supportType: "funding",
        causesSupported: ["Education", "Charity"],
        rewards: {
            btc: 0.00056789,
            discounts: ["Buy 2 Get 1 Free"]
        },
        lastSupport: "2024-09-05"
    },
    {
        businessId: 2,
        businessName: "Green Thumb Garden Center",
        businessIcon: "GT",
        category: "Retail",
        totalSupported: 85,
        supportType: "purchase",
        causesSupported: ["Environmental", "Education"],
        rewards: {
            btc: 0,
            discounts: ["$10 off supplies"]
        },
        lastSupport: "2024-09-12"
    },
    {
        businessId: 4,
        businessName: "Sunrise Yoga Studio",
        businessIcon: "SY",
        category: "Health",
        totalSupported: 60,
        supportType: "purchase",
        causesSupported: [],
        rewards: {
            btc: 0,
            discounts: ["Free class"]
        },
        lastSupport: "2024-08-20"
    },
    {
        businessId: 6,
        businessName: "Bella's Beauty Salon",
        businessIcon: "BB",
        category: "Service",
        totalSupported: 120,
        supportType: "purchase",
        causesSupported: [],
        rewards: {
            btc: 0,
            discounts: ["10% off services"]
        },
        lastSupport: "2024-08-15"
    }
];

// Helper functions
function getBtcRewardsByBusiness(businessId) {
    return btcRewards.filter(reward => reward.businessId === businessId);
}

function getDiscountRewardsByBusiness(businessId) {
    return discountRewards.filter(reward => reward.businessId === businessId);
}

function getActiveDiscounts() {
    const today = new Date();
    return discountRewards.filter(reward => {
        const validUntil = new Date(reward.validUntil);
        return !reward.used && validUntil > today;
    });
}

function getTotalBtcEarned() {
    return btcRewards.reduce((total, reward) => total + reward.amount, 0);
}

function getTotalUsdValue() {
    return btcRewards.reduce((total, reward) => total + reward.usdValue, 0);
}

function formatBtc(amount) {
    return amount.toFixed(8);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// Tax Deductible Donations Data
const taxDeductibleDonations = [
    {
        businessId: 1,
        businessName: "Mama Rosa's Italian Kitchen",
        businessIcon: "MR",
        donationAmount: 150,
        cause: "Education Fund (501c3)",
        organizationName: "Local Schools Foundation",
        taxId: "12-3456789",
        date: "2024-09-15",
        taxSavings: 36, // 24% tax bracket
        receiptNumber: "EDU-2024-0915-001"
    },
    {
        businessId: 3,
        businessName: "Fix-It Frank's Repair Shop",
        businessIcon: "FF",
        donationAmount: 120,
        cause: "Environmental Conservation (501c3)",
        organizationName: "Green Future Initiative",
        taxId: "98-7654321",
        date: "2024-09-10",
        taxSavings: 28.80,
        receiptNumber: "ENV-2024-0910-003"
    },
    {
        businessId: 5,
        businessName: "The Book Nook",
        businessIcon: "BN",
        donationAmount: 100,
        cause: "Literacy Programs (501c3)",
        organizationName: "Reading for All Foundation",
        taxId: "45-6789012",
        date: "2024-09-05",
        taxSavings: 24,
        receiptNumber: "LIT-2024-0905-007"
    },
    {
        businessId: 1,
        businessName: "Mama Rosa's Italian Kitchen",
        businessIcon: "MR",
        donationAmount: 75,
        cause: "Emergency Relief Fund (501c3)",
        organizationName: "Community Crisis Center",
        taxId: "67-8901234",
        date: "2024-08-28",
        taxSavings: 18,
        receiptNumber: "EMR-2024-0828-012"
    },
    {
        businessId: 2,
        businessName: "Green Thumb Garden Center",
        businessIcon: "GT",
        donationAmount: 85,
        cause: "Environmental Education (501c3)",
        organizationName: "Nature Learning Center",
        taxId: "23-4567890",
        date: "2024-08-15",
        taxSavings: 20.40,
        receiptNumber: "NAT-2024-0815-005"
    },
    {
        businessId: 5,
        businessName: "The Book Nook",
        businessIcon: "BN",
        donationAmount: 60,
        cause: "Homeless Shelter Support (501c3)",
        organizationName: "Safe Haven Shelter",
        taxId: "34-5678901",
        date: "2024-07-20",
        taxSavings: 14.40,
        receiptNumber: "SHE-2024-0720-009"
    }
];

// Tax calculation functions
function calculateTaxSavings(donationAmount, taxBracket) {
    return (donationAmount * taxBracket / 100);
}

function getTotalTaxDeductions() {
    return taxDeductibleDonations.reduce((total, donation) => total + donation.donationAmount, 0);
}

function getTotalTaxSavings() {
    return taxDeductibleDonations.reduce((total, donation) => total + donation.taxSavings, 0);
}

function getQualifiedOrganizations() {
    const orgs = [...new Set(taxDeductibleDonations.map(d => d.organizationName))];
    return orgs;
}
