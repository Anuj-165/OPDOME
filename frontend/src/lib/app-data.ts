export interface DataSource {
  id: string;
  name: string;
  status: 'connected' | 'disconnected' | 'syncing';
  records: string;
  lastSynced: string;
  icon: string;
}

export const dataSources: DataSource[] = [
  { id: 'sales', name: 'Sales', status: 'connected', records: '24,821', lastSynced: '2 min ago', icon: 'TrendingUp' },
  { id: 'orders', name: 'Orders', status: 'connected', records: '48,293', lastSynced: '1 min ago', icon: 'Package' },
  { id: 'customers', name: 'Customers', status: 'connected', records: '18,492', lastSynced: '3 min ago', icon: 'Users' },
  { id: 'employees', name: 'Employees', status: 'connected', records: '143', lastSynced: '5 min ago', icon: 'UserCog' },
  { id: 'inventory', name: 'Inventory', status: 'connected', records: '3,821 SKUs', lastSynced: '4 min ago', icon: 'Boxes' },
  { id: 'complaints', name: 'Complaints', status: 'connected', records: '7,284', lastSynced: '2 min ago', icon: 'MessageSquare' },
];

export interface OrderRow {
  id: string;
  orderId: string;
  customer: string;
  region: string;
  value: string;
  status: 'Delivered' | 'Processing' | 'Delayed' | 'Cancelled';
  processingTime: string;
  deliveryStatus: string;
  priority: 'High' | 'Medium' | 'Low' | 'Critical';
}

export const ordersData: OrderRow[] = [
  { id: 'o1', orderId: 'ORD-48293', customer: 'Northstar Retail', region: 'North', value: '₹84,200', status: 'Delayed', processingTime: '6.2 hrs', deliveryStatus: '2 days late', priority: 'Critical' },
  { id: 'o2', orderId: 'ORD-48294', customer: 'Metro Distributors', region: 'North', value: '₹1,24,500', status: 'Processing', processingTime: '4.8 hrs', deliveryStatus: 'In transit', priority: 'High' },
  { id: 'o3', orderId: 'ORD-48295', customer: 'Apex Trading Co.', region: 'South', value: '₹42,800', status: 'Delivered', processingTime: '2.1 hrs', deliveryStatus: 'On time', priority: 'Medium' },
  { id: 'o4', orderId: 'ORD-48296', customer: 'Summit Enterprises', region: 'East', value: '₹67,300', status: 'Delivered', processingTime: '2.8 hrs', deliveryStatus: 'On time', priority: 'Low' },
  { id: 'o5', orderId: 'ORD-48297', customer: 'Pinnacle Goods', region: 'North', value: '₹95,600', status: 'Delayed', processingTime: '5.4 hrs', deliveryStatus: '1 day late', priority: 'High' },
  { id: 'o6', orderId: 'ORD-48298', customer: 'Crown Retailers', region: 'West', value: '₹38,900', status: 'Processing', processingTime: '3.2 hrs', deliveryStatus: 'In transit', priority: 'Medium' },
  { id: 'o7', orderId: 'ORD-48299', customer: 'Vertex Supplies', region: 'North', value: '₹1,56,200', status: 'Delayed', processingTime: '7.1 hrs', deliveryStatus: '3 days late', priority: 'Critical' },
  { id: 'o8', orderId: 'ORD-48300', customer: 'Orbit Commerce', region: 'South', value: '₹52,400', status: 'Delivered', processingTime: '2.4 hrs', deliveryStatus: 'On time', priority: 'Low' },
  { id: 'o9', orderId: 'ORD-48301', customer: 'Stellar Wholesale', region: 'East', value: '₹78,100', status: 'Processing', processingTime: '3.8 hrs', deliveryStatus: 'In transit', priority: 'Medium' },
  { id: 'o10', orderId: 'ORD-48302', customer: 'Quantum Retail', region: 'North', value: '₹1,12,700', status: 'Delayed', processingTime: '5.9 hrs', deliveryStatus: '2 days late', priority: 'High' },
  { id: 'o11', orderId: 'ORD-48303', customer: 'Horizon Trading', region: 'West', value: '₹44,300', status: 'Delivered', processingTime: '1.9 hrs', deliveryStatus: 'On time', priority: 'Low' },
  { id: 'o12', orderId: 'ORD-48304', customer: 'Apex Trading Co.', region: 'South', value: '₹91,800', status: 'Delivered', processingTime: '2.6 hrs', deliveryStatus: 'On time', priority: 'Medium' },
];

export interface IntegrationItem {
  id: string;
  name: string;
  status: 'connected' | 'available' | 'coming_soon';
  category: string;
  description: string;
}

export const integrations: IntegrationItem[] = [
  { id: 'int-1', name: 'Shopify', status: 'connected', category: 'E-commerce', description: 'Sync orders, products, and customer data from your Shopify store.' },
  { id: 'int-2', name: 'WooCommerce', status: 'available', category: 'E-commerce', description: 'Connect your WooCommerce store for order and inventory sync.' },
  { id: 'int-3', name: 'Salesforce', status: 'available', category: 'CRM', description: 'Sync customer relationships and sales pipeline data.' },
  { id: 'int-4', name: 'HubSpot', status: 'available', category: 'CRM', description: 'Connect HubSpot for customer data and marketing insights.' },
  { id: 'int-5', name: 'Slack', status: 'connected', category: 'Communication', description: 'Receive OPDOME alerts and approve actions directly in Slack.' },
  { id: 'int-6', name: 'Google Sheets', status: 'available', category: 'Data', description: 'Import data from Google Sheets for quick analysis.' },
  { id: 'int-7', name: 'PostgreSQL', status: 'connected', category: 'Database', description: 'Direct database connection for real-time operational data.' },
  { id: 'int-8', name: 'REST API', status: 'available', category: 'Developer', description: 'Custom REST API integration for any system.' },
  { id: 'int-9', name: 'Zoho Inventory', status: 'coming_soon', category: 'Inventory', description: 'Sync inventory levels and stock movements.' },
  { id: 'int-10', name: 'QuickBooks', status: 'coming_soon', category: 'Finance', description: 'Connect financial data for revenue analysis.' },
];

export interface SystemTimelineEntry {
  time: string;
  event: string;
  type: 'detection' | 'investigation' | 'root_cause' | 'action';
}

export const systemTimeline: SystemTimelineEntry[] = [
  { time: '12:42', event: 'Anomaly detected — Revenue decline', type: 'detection' },
  { time: '12:44', event: 'Investigation started', type: 'investigation' },
  { time: '12:47', event: 'Root cause identified — Warehouse B', type: 'root_cause' },
  { time: '12:49', event: 'Action plan generated — 4 actions', type: 'action' },
];

export const systemServicesFull = [
  { name: 'Data Pipeline', status: 'operational' as const, detail: 'All 6 sources syncing' },
  { name: 'Analytics Engine', status: 'operational' as const, detail: 'Processing 18,492 events/day' },
  { name: 'AI Investigation Engine', status: 'operational' as const, detail: '8 active investigations' },
  { name: 'Action Engine', status: 'operational' as const, detail: '5 actions awaiting approval' },
  { name: 'Database', status: 'operational' as const, detail: 'Response time 12ms' },
];

export const revenueChartData = [
  { day: 'W1', current: 30.3, previous: 31.1, forecast: null },
  { day: 'W2', current: 29.8, previous: 30.9, forecast: null },
  { day: 'W3', current: 28.5, previous: 30.7, forecast: null },
  { day: 'W4', current: 27.2, previous: 30.5, forecast: null },
  { day: 'W5', current: 26.8, previous: 30.3, forecast: null },
  { day: 'W6', current: 25.9, previous: 30.1, forecast: null },
  { day: 'W7', current: 24.8, previous: 29.9, forecast: null },
  { day: 'W8', current: null, previous: null, forecast: 24.2 },
  { day: 'W9', current: null, previous: null, forecast: 23.8 },
];

export const deliveryPerformanceData = [
  { region: 'North', onTime: 72, late: 28 },
  { region: 'South', onTime: 91, late: 9 },
  { region: 'East', onTime: 88, late: 12 },
  { region: 'West', onTime: 85, late: 15 },
];

export const customerHealthData = [
  { metric: 'Retention', value: 81, baseline: 89 },
  { metric: 'Complaints', value: 8.2, baseline: 5.8 },
  { metric: 'Repeat Purchases', value: 43, baseline: 59 },
  { metric: 'Customer Risk', value: 26, baseline: 12 },
];

export const opportunityCards = [
  {
    id: 'opp-1',
    title: 'Reduce warehouse processing time',
    potential: '18–31%',
    potentialLabel: 'Potential improvement',
    evidence: 'Warehouse B bottleneck',
    ctaLabel: 'View investigation',
    ctaAction: '/investigations/inv-1',
  },
  {
    id: 'opp-2',
    title: 'Recover high-value customers',
    potential: '23 customers',
    potentialLabel: 'Affected',
    evidence: '₹4.8L revenue exposure',
    ctaLabel: 'View customers',
    ctaAction: '/data-hub',
  },
  {
    id: 'opp-3',
    title: 'Rebalance team workload',
    potential: '26%',
    potentialLabel: 'Potential improvement',
    evidence: 'Priya at 112% capacity',
    ctaLabel: 'Review workload',
    ctaAction: '/tasks',
  },
];

export const globalAiSuggestions = [
  'Why did revenue fall this week?',
  'What is our biggest operational risk?',
  'Which team is overloaded?',
  'What should I prioritize today?',
];

export const globalAiResponses: Record<string, { text: string; data: { label: string; value: string }[]; action: { label: string; link: string } }> = {
  'Why did revenue fall this week?': {
    text: 'Revenue fell 18% over the last 14 days, primarily in the North region. The root cause is a processing bottleneck at Warehouse B — processing time is 52% above baseline, causing 37 delayed orders, which cascaded into a 41% spike in delivery complaints and a 27% drop in repeat purchases.',
    data: [
      { label: 'Revenue decline', value: '−18%' },
      { label: 'Root cause', value: 'Warehouse B' },
      { label: 'Confidence', value: '87%' },
    ],
    action: { label: 'View investigation', link: '/investigations/inv-1' },
  },
  'What is our biggest operational risk?': {
    text: 'The biggest operational risk is the Warehouse B bottleneck. If left unaddressed, revenue is projected to decline an additional 8-12% over the next 14 days, and 23 high-value customers are at churn risk. Inventory item #482 will also stock out in 6 days.',
    data: [
      { label: 'Risk level', value: 'Critical' },
      { label: 'At-risk customers', value: '23' },
      { label: 'Stockout risk', value: '6 days' },
    ],
    action: { label: 'View investigation', link: '/investigations/inv-1' },
  },
  'Which team is overloaded?': {
    text: 'Priya is at 112% capacity with 27 pending tasks and 8 high-priority items. Rahul is at 51% capacity with only 8 pending tasks. I recommend reassigning 4 tasks from Priya to Rahul to balance the workload.',
    data: [
      { label: 'Priya capacity', value: '112%' },
      { label: 'Rahul capacity', value: '51%' },
      { label: 'Suggested reassignment', value: '4 tasks' },
    ],
    action: { label: 'Review workload', link: '/tasks' },
  },
  'What should I prioritize today?': {
    text: 'I recommend approving the 4-action plan for the revenue decline investigation: (1) Reallocate staff to Warehouse B, (2) Prioritize 37 delayed orders, (3) Create customer recovery tasks for 23 customers, (4) Flag inventory #482 for procurement. Expected impact: processing time −31%, delayed orders −42%.',
    data: [
      { label: 'Actions pending', value: '4' },
      { label: 'Processing time', value: '−31%' },
      { label: 'Delayed orders', value: '−42%' },
    ],
    action: { label: 'View action plan', link: '/investigations/inv-1' },
  },
};

export const demoCompany = {
  name: 'Northstar Commerce',
  industry: 'E-commerce',
  team: '143 employees',
  orders: '48,293',
  customers: '18,492',
  products: '3,821',
};
