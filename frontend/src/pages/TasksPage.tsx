import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { teamMembers } from '@/lib/investigation-data';
import type { TeamMember } from '@/types';
import { ArrowRight, AlertTriangle, CheckCircle2, Users } from 'lucide-react';

const statusConfig: Record<
  TeamMember['status'],
  { label: string; color: string; icon: typeof AlertTriangle }
> = {
  available: {
    label: 'Available',
    color: 'text-success border-success/20 bg-success/10',
    icon: CheckCircle2,
  },
  balanced: {
    label: 'Balanced',
    color: 'text-blue-400 border-blue-500/20 bg-blue-500/10',
    icon: CheckCircle2,
  },
  overloaded: {
    label: 'Overloaded',
    color: 'text-destructive border-destructive/20 bg-destructive/10',
    icon: AlertTriangle,
  },
};

function CapacityBar({ capacity }: { capacity: number }) {
  const color =
    capacity > 100
      ? 'bg-destructive'
      : capacity > 85
        ? 'bg-warning'
        : 'bg-primary';

  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <div
        className={cn('h-full rounded-full transition-all', color)}
        style={{ width: `${Math.min(capacity, 100)}%` }}
      />
    </div>
  );
}

export function TasksPage() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-5 p-4 lg:p-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Task Workload
        </h2>
        <p className="text-sm text-muted-foreground">
          Team workload distribution and capacity management.
        </p>
      </div>

      {/* Team cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {teamMembers.map((member) => {
          const config = statusConfig[member.status];
          const StatusIcon = config.icon;

          return (
            <div
              key={member.id}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary/10 text-sm font-semibold text-primary ring-1 ring-primary/20">
                    {member.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {member.name}
                    </p>
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-medium',
                        config.color
                      )}
                    >
                      <StatusIcon className="h-2.5 w-2.5" />
                      {config.label}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Pending</span>
                  <span className="text-sm font-semibold text-foreground tabular-nums">
                    {member.pending}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">High priority</span>
                  <span className="text-sm font-semibold text-foreground tabular-nums">
                    {member.highPriority}
                  </span>
                </div>
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Capacity</span>
                    <span
                      className={cn(
                        'text-sm font-semibold tabular-nums',
                        member.capacity > 100
                          ? 'text-destructive'
                          : 'text-foreground'
                      )}
                    >
                      {member.capacity}%
                    </span>
                  </div>
                  <CapacityBar capacity={member.capacity} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* OPDOME recommendation */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
            <Users className="h-3.5 w-3.5 text-primary" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">
            OPDOME Recommendation
          </h3>
        </div>
        <p className="mb-4 text-sm text-foreground">
          Reassign 4 tasks from{' '}
          <span className="font-semibold text-destructive">Priya</span>{' '}
          <ArrowRight className="inline h-3.5 w-3.5 text-muted-foreground" />{' '}
          <span className="font-semibold text-success">Rahul</span>.
        </p>
        <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
          Priya is at 112% capacity with 27 pending tasks. Rahul is at 51%
          capacity with 8 pending tasks. Reassigning 4 high-priority tasks would
          bring Priya to 96% and Rahul to 78%, optimizing team throughput.
        </p>
        <Button
          size="sm"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Review Recommendation
          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Productivity visualization */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-4 text-sm font-semibold text-foreground">
          Productivity Impact
        </h3>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Before OPDOME */}
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Before OPDOME
            </p>
            <div className="space-y-2.5">
              {[
                { label: 'Manual analysis', value: '6.5 hrs/week' },
                { label: 'Task coordination', value: '4.2 hrs/week' },
                { label: 'Issue investigation', value: '5.1 hrs/week' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-lg border border-border bg-background/50 px-3 py-2.5"
                >
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <span className="text-xs font-semibold text-foreground tabular-nums">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* With OPDOME */}
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              With OPDOME
            </p>
            <div className="space-y-2.5">
              {[
                'Automated monitoring',
                'AI-assisted investigation',
                'AI-prioritized actions',
                'Human approval',
                'Outcome measurement',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Time saved */}
        <div className="mt-5 flex flex-col items-center justify-between gap-3 rounded-lg border border-border bg-background/50 p-4 sm:flex-row">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Estimated manager time saved
            </p>
            <p className="mt-1 text-3xl font-bold text-primary tabular-nums">
              9.4 hrs/week
            </p>
          </div>
          <span className="rounded-md border border-border bg-muted px-2 py-1 text-[10px] text-muted-foreground">
            Illustrative demo estimate
          </span>
        </div>
      </div>
    </div>
  );
}
