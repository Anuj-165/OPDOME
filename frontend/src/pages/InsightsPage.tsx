import { useNavigate } from 'react-router-dom';
import { opportunityCards } from '@/lib/app-data';
import { ArrowRight, Lightbulb, TrendingUp, Users, Scale } from 'lucide-react';

const icons = [TrendingUp, Users, Scale];

export function InsightsPage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-[1600px] space-y-5 p-4 lg:p-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Opportunities</h2>
        <p className="text-sm text-muted-foreground">Where OPDOME sees room for improvement.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {opportunityCards.map((opp, i) => {
          const Icon = icons[i] ?? Lightbulb;
          return (
            <div key={opp.id} className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{opp.title}</h3>
              <div className="mt-3 space-y-2">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{opp.potentialLabel}</p>
                  <p className="mt-0.5 text-xl font-bold text-primary tabular-nums">{opp.potential}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Evidence</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{opp.evidence}</p>
                </div>
              </div>
              <button
                onClick={() => navigate(opp.ctaAction)}
                className="mt-4 flex items-center gap-1.5 text-xs font-medium text-primary transition-colors hover:text-primary/80"
              >
                {opp.ctaLabel}
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
