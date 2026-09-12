import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { StatusBadge } from '@/components/common/StatusBadge';
import {
  criticalSignals,
  emergingSignals,
  opportunitySignals,
} from '@/lib/mock-data';
import type { Signal, SignalCategory } from '@/types';
import { ArrowRight, Clock } from 'lucide-react';

const tabs: { key: SignalCategory; label: string; count: number }[] = [
  { key: 'critical', label: 'Critical', count: criticalSignals.length },
  { key: 'emerging', label: 'Emerging', count: emergingSignals.length },
  { key: 'opportunity', label: 'Opportunities', count: opportunitySignals.length },
];

const signalMap: Record<SignalCategory, Signal[]> = {
  critical: criticalSignals,
  emerging: emergingSignals,
  opportunity: opportunitySignals,
};

function SignalCard({ signal }: { signal: Signal }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-border/60">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <StatusBadge variant={signal.severity} />
          </div>
          <h4 className="text-sm font-semibold text-foreground">{signal.title}</h4>
          <p className="mt-1 text-xs text-muted-foreground">{signal.description}</p>
        </div>
      </div>

      {signal.signals && (
        <div className="mt-3 space-y-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Potential signals
          </p>
          {signal.signals.map((s, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-1 w-1 rounded-full bg-muted-foreground" />
              {s}
            </div>
          ))}
        </div>
      )}

      {signal.impact && (
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>Impact: <span className="text-foreground font-medium">{signal.impact}</span></span>
        </div>
      )}

      <button
        onClick={() => navigate(signal.ctaAction)}
        className="mt-3 flex items-center gap-1.5 text-xs font-medium text-primary transition-colors hover:text-primary/80"
      >
        {signal.ctaLabel}
        <ArrowRight className="h-3 w-3" />
      </button>
    </div>
  );
}

export function SignalsSection() {
  const [activeTab, setActiveTab] = useState<SignalCategory>('critical');
  const signals = signalMap[activeTab];

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Operational Signals</h3>
        <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-0.5">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
                activeTab === tab.key
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {tab.label}
              <span
                className={cn(
                  'rounded px-1 py-0.5 text-[10px]',
                  activeTab === tab.key ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                )}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {signals.map((signal) => (
          <SignalCard key={signal.id} signal={signal} />
        ))}
      </div>
    </div>
  );
}
