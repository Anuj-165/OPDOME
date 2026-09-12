export type TrendDirection = 'up' | 'down' | 'flat';

export type Severity = 'critical' | 'high' | 'medium' | 'low';

export type InvestigationStatus =
  | 'investigating'
  | 'root_cause_found'
  | 'awaiting_review'
  | 'resolved';

export type SignalCategory = 'critical' | 'emerging' | 'opportunity';

export type ActionPriority = 'critical' | 'high' | 'medium' | 'low';

export type ActionStatus =
  | 'awaiting_approval'
  | 'scheduled'
  | 'in_progress'
  | 'completed'
  | 'failed';

export interface KpiData {
  id: string;
  label: string;
  value: string;
  change: string;
  direction: TrendDirection;
  context: string;
  sparkline: number[];
}

export interface Signal {
  id: string;
  title: string;
  description: string;
  category: SignalCategory;
  severity: Severity;
  signals?: string[];
  impact?: string;
  ctaLabel: string;
  ctaAction: string;
}

export interface Insight {
  id: string;
  title: string;
  confidence: number;
  ctaLabel: string;
  ctaAction: string;
}

export interface Investigation {
  id: string;
  title: string;
  status: InvestigationStatus;
  severity: Severity;
  startedAgo: string;
  owner: string;
  impact?: string;
  signalCount?: number;
  sourceCount?: number;
  confidence?: number;
}

export interface TimelineNode {
  id: string;
  label: string;
  metric: string;
  currentValue: string;
  baseline: string;
  change: string;
  relatedEvents: string[];
  dataSource: string;
  confidence: number;
  isRootCause?: boolean;
}

export interface AiReasoningSection {
  title: string;
  items: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
  data?: { label: string; value: string }[];
}

export interface ActionItem {
  id: string;
  number: number;
  title: string;
  priority: ActionPriority;
  expectedImpact: string;
  reason: string;
  effort: string;
  owner: string;
  affectedCustomers?: number;
  riskNote?: string;
}

export interface ActionTableRow {
  id: string;
  title: string;
  source: string;
  owner: string;
  priority: ActionPriority;
  status: ActionStatus;
  expectedImpact: string;
}

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  pending: number;
  highPriority: number;
  capacity: number;
  status: 'available' | 'balanced' | 'overloaded';
}

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  group: string;
}

export interface SystemService {
  name: string;
  status: 'operational' | 'degraded' | 'down';
}
