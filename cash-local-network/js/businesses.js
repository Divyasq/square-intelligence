// Sample business data
const businesses = [
    {
        id: 1,
        name: "Mama Rosa's Italian Kitchen",
        category: "restaurant",
        description: "Authentic Italian cuisine with family recipes passed down for generations.",
        address: "123 Main Street, Downtown",
        phone: "(555) 123-4567",
        email: "info@mamarosas.com",
        website: "www.mamarosas.com",
        hours: "Mon-Thu: 11am-9pm, Fri-Sat: 11am-10pm, Sun: 12pm-8pm",
        rating: 4.8,
        reviews: 127,
        services: ["Dine-in", "Takeout", "Delivery", "Catering"],
        specialties: ["Homemade Pasta", "Wood-fired Pizza", "Tiramisu"],
        priceRange: "$$",
        acceptsCash: true,
        acceptingFunding: true,
        fundingGoal: "$25,000",
        fundingPurpose: "Kitchen expansion and new wood-fired oven",
        supportedCauses: [
            {
                name: "Education",
                icon: "🎓",
                monthlyContribution: 8,
                description: "Supporting local school meal programs and culinary scholarships"
            },
            {
                name: "Emergency",
                icon: "🚨",
                monthlyContribution: 5,
                description: "Emergency meal assistance for families in need"
            }
        ]
    },
    {
        id: 2,
        name: "Green Thumb Garden Center",
        category: "retail",
        description: "Your neighborhood source for plants, gardening supplies, and expert advice.",
        address: "456 Oak Avenue, Midtown",
        phone: "(555) 234-5678",
        email: "hello@greenthumb.com",
        website: "www.greenthumbgarden.com",
        hours: "Mon-Sat: 8am-6pm, Sun: 10am-5pm",
        rating: 4.6,
        reviews: 89,
        services: ["Plant Care Consultation", "Landscaping", "Delivery", "Workshops"],
        specialties: ["Native Plants", "Organic Fertilizers", "Garden Design"],
        priceRange: "$",
        acceptsCash: true,
        acceptingFunding: false,
        supportedCauses: [
            {
                name: "Environmental",
                icon: "🌱",
                monthlyContribution: 10,
                description: "Sustainable gardening practices and native plant conservation"
            },
            {
                name: "Education",
                icon: "🎓",
                monthlyContribution: 5,
                description: "Free gardening workshops for schools and community groups"
            }
        ]
    },
    {
        id: 3,
        name: "Fix-It Frank's Repair Shop",
        category: "service",
        description: "Professional repair services for electronics, appliances, and small engines.",
        address: "789 Elm Street, Westside",
        phone: "(555) 345-6789",
        email: "frank@fixitfranks.com",
        website: "www.fixitfranks.com",
        hours: "Tue-Fri: 9am-6pm, Sat: 9am-4pm, Closed Sun-Mon",
        rating: 4.9,
        reviews: 156,
        services: ["Electronics Repair", "Appliance Service", "Small Engine Repair", "Diagnostics"],
        specialties: ["iPhone/iPad Repair", "Laptop Service", "Lawn Mower Repair"],
        priceRange: "$$",
        acceptsCash: true,
        acceptingFunding: true,
        fundingGoal: "$15,000",
        fundingPurpose: "New diagnostic equipment and shop expansion",
        supportedCauses: [
            {
                name: "Environmental",
                icon: "🌱",
                monthlyContribution: 12,
                description: "Electronics recycling and sustainable repair practices"
            },
            {
                name: "Education",
                icon: "🎓",
                monthlyContribution: 6,
                description: "Teaching repair skills to local youth and vocational programs"
            }
        ]
    },
    {
        id: 4,
        name: "Sunrise Yoga Studio",
        category: "health",
        description: "Peaceful yoga studio offering classes for all levels in a welcoming environment.",
        address: "321 Pine Street, Eastside",
        phone: "(555) 456-7890",
        email: "namaste@sunriseyoga.com",
        website: "www.sunriseyogastudio.com",
        hours: "Mon-Fri: 6am-9pm, Sat-Sun: 8am-6pm",
        rating: 4.7,
        reviews: 203,
        services: ["Group Classes", "Private Sessions", "Workshops", "Teacher Training"],
        specialties: ["Hatha Yoga", "Vinyasa Flow", "Meditation", "Prenatal Yoga"],
        priceRange: "$$",
        acceptsCash: true,
        acceptingFunding: false
    },
    {
        id: 5,
        name: "The Book Nook",
        category: "retail",
        description: "Cozy independent bookstore with carefully curated selection and reading events.",
        address: "654 Maple Drive, Historic District",
        phone: "(555) 567-8901",
        email: "books@booknook.com",
        website: "www.booknookstore.com",
        hours: "Mon-Sat: 10am-8pm, Sun: 11am-6pm",
        rating: 4.5,
        reviews: 92,
        services: ["Book Orders", "Reading Groups", "Author Events", "Gift Wrapping"],
        specialties: ["Local Authors", "Rare Books", "Children's Section", "Coffee Corner"],
        priceRange: "$",
        acceptsCash: true,
        acceptingFunding: true,
        fundingGoal: "$8,500",
        fundingPurpose: "Expand children's section and add community reading space",
        supportedCauses: [
            {
                name: "Education",
                icon: "🎓",
                monthlyContribution: 15,
                description: "Literacy programs and free books for underprivileged children"
            },
            {
                name: "Charity",
                icon: "🤝",
                monthlyContribution: 7,
                description: "Supporting local homeless shelter with reading materials"
            }
        ]
    },
    {
        id: 6,
        name: "Bella's Beauty Salon",
        category: "service",
        description: "Full-service beauty salon offering hair, nails, and skincare treatments.",
        address: "987 Cedar Lane, Northside",
        phone: "(555) 678-9012",
        email: "bella@bellasbeauty.com",
        website: "www.bellasbeautysalon.com",
        hours: "Tue-Sat: 9am-7pm, Closed Sun-Mon",
        rating: 4.4,
        reviews: 178,
        services: ["Hair Styling", "Coloring", "Manicures", "Pedicures", "Facials"],
        specialties: ["Bridal Packages", "Color Correction", "Extensions", "Eyebrow Threading"],
        priceRange: "$$",
        acceptsCash: true,
        acceptingFunding: false
    },
    {
        id: 7,
        name: "Corner Deli & Market",
        category: "restaurant",
        description: "Neighborhood deli serving fresh sandwiches, salads, and local groceries.",
        address: "147 Broadway, Central",
        phone: "(555) 789-0123",
        email: "orders@cornerdelimarket.com",
        website: "www.cornerdelimarket.com",
        hours: "Mon-Fri: 7am-7pm, Sat: 8am-6pm, Sun: 9am-5pm",
        rating: 4.3,
        reviews: 145,
        services: ["Deli Counter", "Catering", "Grocery Items", "Coffee Bar"],
        specialties: ["Pastrami Sandwich", "Fresh Salads", "Local Produce", "Artisan Breads"],
        priceRange: "$",
        acceptsCash: true,
        acceptingFunding: false
    },
    {
        id: 8,
        name: "Mindful Massage Therapy",
        category: "health",
        description: "Therapeutic massage services focused on healing and relaxation.",
        address: "258 Willow Street, Southside",
        phone: "(555) 890-1234",
        email: "relax@mindfulmt.com",
        website: "www.mindfulmt.com",
        hours: "Mon-Fri: 10am-8pm, Sat: 9am-5pm, Sun: 12pm-6pm",
        rating: 4.8,
        reviews: 134,
        services: ["Swedish Massage", "Deep Tissue", "Hot Stone", "Prenatal Massage"],
        specialties: ["Sports Massage", "Aromatherapy", "Couples Massage", "Reflexology"],
        priceRange: "$$$",
        acceptsCash: true,
        acceptingFunding: false
    }
];

// Function to get business by ID
function getBusinessById(id) {
    return businesses.find(business => business.id === parseInt(id));
}

// Function to filter businesses by category
function filterBusinessesByCategory(category) {
    if (category === 'all') {
        return businesses;
    }
    return businesses.filter(business => business.category === category);
}

// Function to search businesses
function searchBusinesses(query) {
    const searchTerm = query.toLowerCase();
    return businesses.filter(business => 
        business.name.toLowerCase().includes(searchTerm) ||
        business.description.toLowerCase().includes(searchTerm) ||
        business.category.toLowerCase().includes(searchTerm)
    );
}
