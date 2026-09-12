import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lightbulb } from 'lucide-react';
import { insights } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export function InsightsPanel() {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
          <Lightbulb className="h-3.5 w-3.5 text-primary" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">OPDOME Insights</h3>
      </div>

      <div className="space-y-2.5">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="group rounded-lg border border-border bg-background/50 p-3 transition-colors hover:border-primary/20"
          >
            <p className="text-xs leading-relaxed text-foreground">
              {insight.title}
            </p>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-muted-foreground">Confidence</span>
                <div className="flex items-center gap-1">
                  <div className="h-1 w-12 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        'h-full rounded-full',
                        insight.confidence >= 85
                          ? 'bg-primary'
                          : insight.confidence >= 75
                            ? 'bg-yellow-500'
                            : 'bg-orange-500'
                      )}
                      style={{ width: `${insight.confidence}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-medium text-foreground tabular-nums">
                    {insight.confidence}%
                  </span>
                </div>
              </div>
              <button
                onClick={() => navigate(insight.ctaAction)}
                className="flex items-center gap-1 text-[11px] font-medium text-primary transition-colors hover:text-primary/80"
              >
                {insight.ctaLabel}
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
