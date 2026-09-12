import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sparkline } from '@/components/common/Sparkline';
import type { KpiData } from '@/types';

interface KpiCardProps {
  data: KpiData;
}

export function KpiCard({ data }: KpiCardProps) {
  const isDown = data.direction === 'down';
  const sparkColor = isDown ? 'hsl(var(--destructive))' : 'hsl(var(--primary))';

  return (
    <div className="group rounded-xl border border-border bg-card p-4 transition-colors hover:border-border/80 hover:bg-card/80">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {data.label}
          </p>
          <p className="mt-1.5 text-2xl font-bold tracking-tight text-foreground tabular-nums">
            {data.value}
          </p>
        </div>
        <div
          className={cn(
            'flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium',
            isDown
              ? 'bg-destructive/10 text-destructive'
              : 'bg-primary/10 text-primary'
          )}
        >
          {isDown ? (
            <ArrowDownRight className="h-3 w-3" />
          ) : (
            <ArrowUpRight className="h-3 w-3" />
          )}
          {data.change}
        </div>
      </div>
      <div className="mt-3 h-8">
        <Sparkline data={data.sparkline} color={sparkColor} height={32} />
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">{data.context}</p>
    </div>
  );
}
