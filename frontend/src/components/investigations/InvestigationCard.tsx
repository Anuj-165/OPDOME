import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { StatusBadge } from '@/components/common/StatusBadge';
import type { Investigation } from '@/types';
import { ArrowRight } from 'lucide-react';

interface InvestigationCardProps {
  investigation: Investigation;
}

export function InvestigationCard({ investigation }: InvestigationCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/investigations/${investigation.id}`)}
      className="group cursor-pointer rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-foreground">
          {investigation.title}
        </h3>
        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <StatusBadge variant={investigation.severity} />
        <StatusBadge variant={investigation.status} />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {investigation.impact && (
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Impact
            </p>
            <p className="mt-0.5 text-xs font-medium text-foreground">
              {investigation.impact}
            </p>
          </div>
        )}
        {investigation.signalCount !== undefined && (
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Signals
            </p>
            <p className="mt-0.5 text-xs font-medium text-foreground">
              {investigation.signalCount} signals
            </p>
          </div>
        )}
        {investigation.sourceCount !== undefined && (
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Sources
            </p>
            <p className="mt-0.5 text-xs font-medium text-foreground">
              {investigation.sourceCount} data sources
            </p>
          </div>
        )}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Time
          </p>
          <p className="mt-0.5 text-xs font-medium text-foreground">
            {investigation.startedAgo}
          </p>
        </div>
      </div>

      <div className="mt-4 border-t border-border pt-3">
        <span className="flex items-center gap-1.5 text-xs font-medium text-primary transition-colors group-hover:text-primary/80">
          Open Investigation
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </div>
  );
}
