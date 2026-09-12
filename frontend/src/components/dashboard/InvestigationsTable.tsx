import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { StatusBadge } from '@/components/common/StatusBadge';
import { investigations } from '@/lib/mock-data';
import type { Investigation } from '@/types';
import { ArrowRight } from 'lucide-react';

const severityVariant: Record<string, 'critical' | 'high' | 'medium' | 'low'> = {
  critical: 'critical',
  high: 'high',
  medium: 'medium',
  low: 'low',
};

const statusVariant: Record<string, 'investigating' | 'root_cause_found' | 'awaiting_review' | 'resolved'> = {
  investigating: 'investigating',
  root_cause_found: 'root_cause_found',
  awaiting_review: 'awaiting_review',
  resolved: 'resolved',
};

function OwnerBadge({ owner }: { owner: string }) {
  const isAI = owner === 'OPDOME AI';
  return (
    <div className="flex items-center gap-1.5">
      <div
        className={cn(
          'flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-semibold',
          isAI
            ? 'bg-primary/15 text-primary ring-1 ring-primary/20'
            : 'bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/20'
        )}
      >
        {isAI ? 'AI' : 'AM'}
      </div>
      <span className="text-xs text-muted-foreground">{owner}</span>
    </div>
  );
}

export function InvestigationsTable() {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold text-foreground">Active Investigations</h3>
        <button
          onClick={() => navigate('/investigations')}
          className="text-[11px] font-medium text-primary transition-colors hover:text-primary/80"
        >
          View all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Investigation
              </th>
              <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Status
              </th>
              <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Severity
              </th>
              <th className="hidden px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">
                Started
              </th>
              <th className="hidden px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground lg:table-cell">
                Owner
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {investigations.map((inv: Investigation) => (
              <tr
                key={inv.id}
                className="group border-b border-border/50 transition-colors last:border-0 hover:bg-muted/30"
              >
                <td className="px-4 py-2.5">
                  <span className="text-xs font-medium text-foreground">{inv.title}</span>
                </td>
                <td className="px-4 py-2.5">
                  <StatusBadge variant={statusVariant[inv.status]} />
                </td>
                <td className="px-4 py-2.5">
                  <StatusBadge variant={severityVariant[inv.severity]} />
                </td>
                <td className="hidden px-4 py-2.5 text-xs text-muted-foreground md:table-cell">
                  {inv.startedAgo}
                </td>
                <td className="hidden px-4 py-2.5 lg:table-cell">
                  <OwnerBadge owner={inv.owner} />
                </td>
                <td className="px-4 py-2.5 text-right">
                  <ArrowRight className="ml-auto h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
