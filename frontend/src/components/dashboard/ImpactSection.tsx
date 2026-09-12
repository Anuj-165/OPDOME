import { potentialImpact } from '@/lib/mock-data';
import { Sparkles } from 'lucide-react';

export function ImpactSection() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-1 flex items-center gap-2">
        <h3 className="text-sm font-semibold text-foreground">Potential Impact</h3>
        <span className="flex items-center gap-1 rounded-md border border-primary/20 bg-primary/5 px-1.5 py-0.5 text-[10px] text-primary">
          <Sparkles className="h-2.5 w-2.5" />
          AI-estimated
        </span>
      </div>
      <p className="mb-4 text-[11px] text-muted-foreground">
        AI-estimated impact based on current investigations. Not guaranteed results.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {potentialImpact.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-border bg-background/50 p-4"
          >
            <p className="text-3xl font-bold tracking-tight text-primary tabular-nums">
              {item.value}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
