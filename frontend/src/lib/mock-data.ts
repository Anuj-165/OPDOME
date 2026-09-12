import type {
  KpiData,
  Signal,
  Insight,
  Investigation,
  SystemService,
} from '@/types';

export const kpis: KpiData[] = [
  {
    id: 'revenue',
    label: 'Revenue',
    value: '₹24.8L',
    change: '18.2%',
    direction: 'down',
    context: 'vs previous period',
    sparkline: [32, 30, 31, 28, 27, 25, 26, 24, 23, 24, 22, 21],
  },
  {
    id: 'productivity',
    label: 'Productivity',
    value: '81%',
    change: '11.4%',
    direction: 'down',
    context: 'vs previous period',
    sparkline: [92, 90, 89, 88, 87, 85, 84, 83, 82, 82, 81, 81],
  },
  {
    id: 'delivery',
    label: 'Delivery',
    value: '87.3%',
    change: '23.1%',
    direction: 'down',
    context: 'On-time delivery',
    sparkline: [96, 95, 94, 93, 91, 90, 89, 88, 88, 87, 87, 87],
  },
  {
    id: 'customer-health',
    label: 'Customer Health',
    value: '74',
    change: '7.2%',
    direction: 'down',
    context: 'Customer health score',
    sparkline: [82, 81, 80, 79, 78, 77, 77, 76, 75, 75, 74, 74],
  },
];

export const criticalSignals: Signal[] = [
  {
    id: 'rev-decline',
    title: 'Revenue decline detected',
    description: 'Revenue is down 18% over the last 14 days.',
    category: 'critical',
    severity: 'critical',
    signals: [
      'Repeat purchases ↓27%',
      'Delivery complaints ↑41%',
      'North region delays ↑63%',
    ],
    ctaLabel: 'Investigate',
    ctaAction: '/investigations',
  },
  {
    id: 'warehouse-b',
    title: 'Warehouse B bottleneck',
    description: 'Processing time is 52% above baseline.',
    category: 'critical',
    severity: 'critical',
    impact: '37 delayed orders',
    ctaLabel: 'Investigate',
    ctaAction: '/investigations',
  },
  {
    id: 'customer-risk',
    title: 'Customer risk detected',
    description: '23 high-value customers have unresolved complaints.',
    category: 'critical',
    severity: 'high',
    ctaLabel: 'View customers',
    ctaAction: '/data-hub',
  },
];

export const emergingSignals: Signal[] = [
  {
    id: 'inventory-482',
    title: 'Inventory risk emerging',
    description: 'Product #482 may fall below safety stock within 6 days.',
    category: 'emerging',
    severity: 'medium',
    ctaLabel: 'Review',
    ctaAction: '/insights',
  },
  {
    id: 'staffing-gap',
    title: 'Staffing gap in North region',
    description: 'Shift coverage at 68% for upcoming weekend.',
    category: 'emerging',
    severity: 'medium',
    ctaLabel: 'Review',
    ctaAction: '/workload',
  },
];

export const opportunitySignals: Signal[] = [
  {
    id: 'bulk-discount',
    title: 'Bulk order opportunity',
    description: '3 enterprise customers showing repeat bulk inquiry patterns.',
    category: 'opportunity',
    severity: 'low',
    ctaLabel: 'Explore',
    ctaAction: '/insights',
  },
];

export const insights: Insight[] = [
  {
    id: 'rev-north',
    title: 'Revenue decline is concentrated in North region',
    confidence: 87,
    ctaLabel: 'View investigation',
    ctaAction: '/investigations',
  },
  {
    id: 'delivery-connection',
    title:
      'Delivery delays and repeat purchase decline appear strongly connected.',
    confidence: 84,
    ctaLabel: 'View investigation',
    ctaAction: '/investigations',
  },
  {
    id: 'inventory-risk',
    title: 'Inventory risk emerging — Product #482 may fall below safety stock within 6 days.',
    confidence: 81,
    ctaLabel: 'Review',
    ctaAction: '/insights',
  },
];

export const investigations: Investigation[] = [
  {
    id: 'inv-1',
    title: 'Revenue decline',
    status: 'investigating',
    severity: 'critical',
    startedAgo: '12 min ago',
    owner: 'OPDOME AI',
  },
  {
    id: 'inv-2',
    title: 'Warehouse B bottleneck',
    status: 'root_cause_found',
    severity: 'critical',
    startedAgo: '27 min ago',
    owner: 'Alex Morgan',
  },
  {
    id: 'inv-3',
    title: 'Customer churn risk',
    status: 'awaiting_review',
    severity: 'medium',
    startedAgo: '1h ago',
    owner: 'OPDOME AI',
  },
];

export const systemServices: SystemService[] = [
  { name: 'Analytics Engine', status: 'operational' },
  { name: 'Investigation Engine', status: 'operational' },
  { name: 'Action Engine', status: 'operational' },
];

export const systemActivity = {
  eventsAnalyzed: '18,492',
  dataSources: 6,
  signalsDetected: 47,
  investigations: 8,
  actionsAwaiting: 5,
};

export const potentialImpact = [
  {
    id: 'processing',
    value: '31%',
    label: 'Potential reduction in processing time',
  },
  {
    id: 'delayed-orders',
    value: '42%',
    label: 'Potential reduction in delayed orders',
  },
  {
    id: 'workload',
    value: '26%',
    label: 'Potential workload rebalance',
  },
];

