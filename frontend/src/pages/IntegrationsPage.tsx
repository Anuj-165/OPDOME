import { cn } from '@/lib/utils';
import { integrations } from '@/lib/app-data';
import type { IntegrationItem } from '@/lib/app-data';
import { Check, Plus, Clock } from 'lucide-react';

const statusConfig: Record<string, { label: string; style: string; icon: typeof Check }> = {
  connected: { label: 'Connected', style: 'text-success border-success/20 bg-success/10', icon: Check },
  available: { label: 'Available', style: 'text-primary border-primary/20 bg-primary/10', icon: Plus },
  coming_soon: { label: 'Coming Soon', style: 'text-muted-foreground border-border bg-muted/30', icon: Clock },
};

export function IntegrationsPage() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-5 p-4 lg:p-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Integrations</h2>
        <p className="text-sm text-muted-foreground">Connect OPDOME to the tools your business already uses.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map((item: IntegrationItem) => {
          const config = statusConfig[item.status];
          const StatusIcon = config.icon;
          return (
            <div key={item.id} className="rounded-xl border border-border bg-card p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background/50 text-sm font-semibold text-foreground">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{item.name}</h3>
                    <p className="text-[10px] text-muted-foreground">{item.category}</p>
                  </div>
                </div>
                <span className={cn('inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-medium', config.style)}>
                  <StatusIcon className="h-2.5 w-2.5" />
                  {config.label}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">{item.description}</p>
              {item.status === 'available' && (
                <button className="mt-3 flex items-center gap-1.5 text-xs font-medium text-primary transition-colors hover:text-primary/80">
                  <Plus className="h-3 w-3" />
                  Connect
                </button>
              )}
              {item.status === 'connected' && (
                <button className="mt-3 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
                  Configure
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
