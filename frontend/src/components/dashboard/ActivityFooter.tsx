import { systemActivity } from '@/lib/mock-data';
import { Activity, Database, Zap, Search, Clock } from 'lucide-react';

export function ActivityFooter() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card px-5 py-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Activity className="h-3.5 w-3.5 text-primary" />
        <span>
          OPDOME analyzed{' '}
          <span className="font-medium text-foreground tabular-nums">
            {systemActivity.eventsAnalyzed}
          </span>{' '}
          operational events today.
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Database className="h-3 w-3" />
          Data sources: <span className="font-medium text-foreground">{systemActivity.dataSources}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Zap className="h-3 w-3" />
          Signals detected: <span className="font-medium text-foreground">{systemActivity.signalsDetected}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Search className="h-3 w-3" />
          Investigations: <span className="font-medium text-foreground">{systemActivity.investigations}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3 w-3" />
          Actions awaiting approval: <span className="font-medium text-foreground">{systemActivity.actionsAwaiting}</span>
        </span>
      </div>
    </div>
  );
}
