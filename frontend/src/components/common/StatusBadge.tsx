import { cn } from '@/lib/utils';
import type { Severity, InvestigationStatus } from '@/types';

interface StatusBadgeProps {
  variant: Severity | InvestigationStatus | 'operational' | 'online';
  children?: React.ReactNode;
  className?: string;
}

const styles: Record<string, string> = {
  critical: 'bg-destructive/10 text-destructive border-destructive/20',
  high: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  low: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  investigating: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  root_cause_found: 'bg-primary/10 text-primary border-primary/20',
  awaiting_review: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  resolved: 'bg-success/10 text-success border-success/20',
  operational: 'bg-success/10 text-success border-success/20',
  online: 'bg-primary/10 text-primary border-primary/20',
};

const labels: Record<string, string> = {
  investigating: 'Investigating',
  root_cause_found: 'Root cause found',
  awaiting_review: 'Awaiting review',
  resolved: 'Resolved',
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
  operational: 'Operational',
  online: 'Online',
};

export function StatusBadge({ variant, children, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium',
        styles[variant] ?? styles.medium,
        className
      )}
    >
      {variant === 'operational' || variant === 'online' ? (
        <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse-dot" />
      ) : null}
      {children ?? labels[variant]}
    </span>
  );
}
