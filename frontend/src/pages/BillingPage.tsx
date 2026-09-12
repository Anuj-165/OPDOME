import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { CreditCard, Users, Database, Search, Zap, ArrowUpRight } from 'lucide-react';

export function BillingPage() {
  const { organization } = useAuth();

  const usage = [
    { label: 'Team seats', icon: Users, used: 4, limit: 10, unit: '' },
    { label: 'Data sources', icon: Database, used: 6, limit: 10, unit: '' },
    { label: 'AI investigations', icon: Search, used: 8, limit: 50, unit: '' },
    { label: 'Automation runs', icon: Zap, used: 23, limit: 100, unit: '' },
  ];

  return (
    <div className="mx-auto max-w-[800px] space-y-5 p-4 lg:p-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Billing</h2>
        <p className="text-sm text-muted-foreground">Manage your subscription and usage.</p>
      </div>

      {/* Current plan */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">Current Plan</p>
            <p className="mt-1 text-2xl font-bold capitalize text-foreground">{organization?.plan ?? 'Starter'}</p>
            <p className="mt-1 text-xs text-muted-foreground">Billing cycle: Monthly · Next billing date: Coming soon</p>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            <ArrowUpRight className="h-3.5 w-3.5" />
            Upgrade Plan
          </button>
        </div>
      </div>

      {/* Usage */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-4 text-sm font-semibold text-foreground">Usage</h3>
        <div className="space-y-4">
          {usage.map((item) => {
            const pct = Math.round((item.used / item.limit) * 100);
            return (
              <div key={item.label}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs text-muted-foreground">
                    <item.icon className="h-3.5 w-3.5" />
                    {item.label}
                  </span>
                  <span className="text-xs font-medium text-foreground tabular-nums">
                    {item.used} / {item.limit}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn('h-full rounded-full', pct > 80 ? 'bg-warning' : 'bg-primary')}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Manage billing */}
      <div className="flex items-center justify-between rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Manage payment methods and invoices</span>
        </div>
        <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
          Manage Billing
        </button>
      </div>

      <p className="text-center text-[10px] text-muted-foreground/60">
        Payment integration coming soon. No charges will be made.
      </p>
    </div>
  );
}
