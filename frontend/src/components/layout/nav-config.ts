import {
  LayoutDashboard,
  Search,
  Lightbulb,
  BarChart3,
  Zap,
  CheckSquare,
  Gauge,
  Database,
  Plug,
  Settings,
  Server,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavEntry {
  label: string;
  path: string;
  icon: LucideIcon;
}

export interface NavGroup {
  title: string;
  items: NavEntry[];
}

export const navGroups: NavGroup[] = [
  {
    title: 'Command Center',
    items: [{ label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard }],
  },
  {
    title: 'Intelligence',
    items: [
      { label: 'Investigations', path: '/investigations', icon: Search },
      { label: 'Insights', path: '/insights', icon: Lightbulb },
      { label: 'Analytics', path: '/analytics', icon: BarChart3 },
    ],
  },
  {
    title: 'Operations',
    items: [
      { label: 'Actions', path: '/actions', icon: Zap },
      { label: 'Tasks', path: '/tasks', icon: CheckSquare },
      { label: 'Workload', path: '/workload', icon: Gauge },
    ],
  },
  {
    title: 'Data',
    items: [{ label: 'Data Hub', path: '/data-hub', icon: Database }],
  },
  {
    title: 'System',
    items: [
      { label: 'Integrations', path: '/integrations', icon: Plug },
      { label: 'System', path: '/system', icon: Server },
      { label: 'Settings', path: '/settings', icon: Settings },
    ],
  },
];
