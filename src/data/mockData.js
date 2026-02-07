export const revenueData = [
    { month: 'Jan', revenue: 3735000, target: 3320000, churn: 1.2, activeUsers: 8200 },
    { month: 'Feb', revenue: 4316000, target: 3735000, churn: 1.1, activeUsers: 8500 },
    { month: 'Mar', revenue: 3984000, target: 4150000, churn: 1.5, activeUsers: 8100 },
    { month: 'Apr', revenue: 5063000, target: 4565000, churn: 0.9, activeUsers: 9200 },
    { month: 'May', revenue: 5561000, target: 4980000, churn: 0.8, activeUsers: 9800 },
    { month: 'Jun', revenue: 6225000, target: 5395000, churn: 1.0, activeUsers: 10500 },
    { month: 'Jul', revenue: 5976000, target: 5810000, churn: 1.3, activeUsers: 10100 },
    { month: 'Aug', revenue: 6972000, target: 6225000, churn: 0.7, activeUsers: 11200 },
    { month: 'Sep', revenue: 7387000, target: 6640000, churn: 0.6, activeUsers: 11800 },
    { month: 'Oct', revenue: 7885000, target: 7055000, churn: 0.8, activeUsers: 12400 },
    { month: 'Nov', revenue: 8466000, target: 7470000, churn: 0.5, activeUsers: 13100 },
    { month: 'Dec', revenue: 9545000, target: 7885000, churn: 0.4, activeUsers: 14200 },
];

export const userSegments = [
    { name: 'Enterprise', value: 45, color: '#a855f7', growth: '+12%' },
    { name: 'Mid-Market', value: 30, color: '#d8b4fe', growth: '+8%' },
    { name: 'Public Sector', value: 15, color: '#8b5cf6', growth: '+25%' },
    { name: 'Startup', value: 10, color: '#f472b6', growth: '-5%' },
];

export const geographicData = [
    { region: 'United States', users: 8500, growth: 12, revenue: '$4.3M', health: 92 },
    { region: 'United Kingdom', users: 3200, growth: 18, revenue: '£3.1M', health: 95 },
    { region: 'India (APAC Hub)', users: 5800, growth: 28, revenue: '₹42.5 Cr', health: 98 },
    { region: 'Germany (EU)', users: 2200, growth: 8, revenue: '€2.1M', health: 84 },
    { region: 'Singapore', users: 1500, growth: 15, revenue: '$1.4M', health: 89 },
];

export const customerList = [
    { id: 1, name: 'Tata Insights', industry: 'Conglomerate', ltv: 9993200, status: 'Healthy', risk: 5, lastActive: '2 hours ago', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=TI' },
    { id: 2, name: 'Reliance Digital', industry: 'Retail/Tech', ltv: 8150600, status: 'At Risk', risk: 85, lastActive: '1 day ago', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=RD' },
    { id: 3, name: 'HDFC FinScope', industry: 'Banking', ltv: 6225000, status: 'Healthy', risk: 12, lastActive: '5 mins ago', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=HF' },
    { id: 4, name: 'Swiggy Logistics', industry: 'Food-Tech', ltv: 5187500, status: 'Concern', risk: 48, lastActive: '6 hours ago', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=SL' },
    { id: 5, name: 'Infosys Labs', industry: 'IT Services', ltv: 4498600, status: 'Healthy', risk: 8, lastActive: '3 days ago', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=IL' },
    { id: 6, name: 'Airtel Network', industry: 'Telecom', ltv: 4058700, status: 'Healthy', risk: 15, lastActive: '12 mins ago', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AN' },
    { id: 7, name: 'Mahindra Auto', industry: 'Automotive', ltv: 2664300, status: 'At Risk', risk: 92, lastActive: '1 week ago', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MA' },
    { id: 8, name: 'Zomato Core', industry: 'E-commerce', ltv: 2448500, status: 'Healthy', risk: 10, lastActive: '4 hours ago', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=ZC' },
];

export const cohortData = [
    { name: 'Jan 2024', size: '1,240', r: [98, 85, 72, 65, 58, 55] },
    { name: 'Feb 2024', size: '1,150', r: [97, 78, 65, 60, 52, null] },
    { name: 'Mar 2024', size: '1,420', r: [99, 94, 82, 75, null, null] },
    { name: 'Apr 2024', size: '1,580', r: [98, 82, 75, null, null, null] },
    { name: 'May 2024', size: '1,890', r: [100, 92, null, null, null, null] },
    { name: 'Jun 2024', size: '2,100', r: [100, null, null, null, null, null] },
];

export const profileData = {
    name: 'Ananya Sharma',
    role: 'Head of Global Data Strategy',
    email: 'ananya.s@nexus-insight.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya',
    company: 'Nexus Insight Inc.',
    notifications: [
        { id: 1, text: 'India (APAC Hub) quarterly targets exceeded', time: '2h ago', type: 'success' },
        { id: 2, text: 'Critical Risk: Reliance Digital account churn', time: '5h ago', type: 'warning' },
        { id: 3, text: 'Global Data Sync established', time: '1d ago', type: 'info' },
    ]
};
