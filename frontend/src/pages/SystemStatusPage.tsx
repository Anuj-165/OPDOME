import { cn } from '@/lib/utils';
import { systemServicesFull, systemTimeline } from '@/lib/app-data';
import { Activity, Zap, Search, Target, Database, Check } from 'lucide-react';

const icons: Record<string, typeof Activity> = {
  'Data Pipeline': Database,
  'Analytics Engine': Activity,
  'AI Investigation Engine': Search,
  'Action Engine': Zap,
  Database: Database,
};

const timelineIcons = {
  detection: Activity,
  investigation: Search,
  root_cause: Target,
  action: Zap,
};

const timelineStyles: Record<string, string> = {
  detection: 'text-warning bg-warning/10',
  investigation: 'text-blue-400 bg-blue-500/10',
  root_cause: 'text-primary bg-primary/10',
  action: 'text-primary bg-primary/10',
};

export function SystemStatusPage() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-5 p-4 lg:p-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">OPDOME System</h2>
        <p className="text-sm text-muted-foreground">Real-time system health and activity.</p>
      </div>

      {/* System services */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {systemServicesFull.map((service) => {
          const Icon = icons[service.name] ?? Activity;
          return (
            <div key={service.name} className="rounded-xl border border-border bg-card p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10">
                    <Icon className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{service.name}</h3>
                    <p className="text-[10px] text-muted-foreground">{service.detail}</p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-medium text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
                  Operational
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity timeline */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-4 text-sm font-semibold text-foreground">System Activity</h3>
        <div className="space-y-0">
          {systemTimeline.map((entry, i) => {
            const Icon = timelineIcons[entry.type];
            const isLast = i === systemTimeline.length - 1;
            return (
              <div key={i}>
                <div className="flex items-start gap-3">
                  <div className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-lg', timelineStyles[entry.type])}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground tabular-nums">{entry.time}</span>
                      <span className="text-xs text-foreground">{entry.event}</span>
                    </div>
                  </div>
                </div>
                {!isLast && <div className="ml-3.5 h-6 w-px bg-border" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div className="flex items-center gap-2 rounded-xl border border-success/20 bg-success/5 px-5 py-3">
        <Check className="h-4 w-4 text-success" />
        <span className="text-xs text-foreground">All systems operational. OPDOME is continuously monitoring your business.</span>
      </div>
    </div>
  );
}
