import { cn } from '@/lib/utils';
import { aiReasoning } from '@/lib/investigation-data';
import { Brain, Quote } from 'lucide-react';

export function AiReasoningPanel() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
          <Brain className="h-3.5 w-3.5 text-primary" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">OPDOME Analysis</h3>
      </div>

      <div className="space-y-4">
        {aiReasoning.map((section, index) => (
          <div key={index}>
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {section.title}
            </p>
            <div className="space-y-1">
              {section.items.map((item, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex items-start gap-2 rounded-lg border border-border bg-background/50 px-3 py-2',
                    section.title === 'Root Cause' && 'border-primary/20 bg-primary/5'
                  )}
                >
                  <span
                    className={cn(
                      'mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full',
                      section.title === 'Root Cause' ? 'bg-primary' : 'bg-muted-foreground'
                    )}
                  />
                  <span
                    className={cn(
                      'text-xs',
                      section.title === 'Root Cause'
                        ? 'text-primary font-medium'
                        : 'text-foreground'
                    )}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Confidence */}
        <div className="flex items-center justify-between rounded-lg border border-border bg-background/50 px-3 py-2.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Confidence
          </span>
          <span className="text-sm font-bold text-primary tabular-nums">87%</span>
        </div>
      </div>

      {/* Why this matters */}
      <div className="mt-4 border-t border-border pt-4">
        <div className="flex items-start gap-2 rounded-lg bg-muted/30 p-3">
          <Quote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
          <p className="text-xs leading-relaxed text-muted-foreground">
            OPDOME connected signals across revenue, customer, delivery and
            warehouse data instead of analyzing each metric independently.
          </p>
        </div>
      </div>
    </div>
  );
}
