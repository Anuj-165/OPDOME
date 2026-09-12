import { useState } from 'react';
import { cn } from '@/lib/utils';
import { StatusBadge } from '@/components/common/StatusBadge';
import { recommendedActions } from '@/lib/investigation-data';
import type { ActionItem } from '@/types';
import { Check, X, Pencil, Zap, ShieldCheck, Loader } from 'lucide-react';

interface ActionPlanProps {
  open: boolean;
  onClose: () => void;
}

export function ActionPlan({ open, onClose }: ActionPlanProps) {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(recommendedActions.map((a) => a.id))
  );
  const [phase, setPhase] = useState<'plan' | 'confirm' | 'executing' | 'done'>('plan');

  if (!open) return null;

  const selectedCount = selected.size;

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleApprove() {
    setPhase('executing');
    setTimeout(() => setPhase('done'), 2500);
  }

  const executionSteps = [
    { label: 'Approved', icon: Check },
    { label: 'Creating tasks', icon: Check },
    { label: 'Reassigning work', icon: Check },
    { label: 'Updating priorities', icon: Check },
    { label: 'Monitoring impact', icon: Loader },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[5vh] px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-border bg-popover shadow-2xl animate-fade-in">
        {phase === 'plan' && (
          <>
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between border-b border-border bg-popover px-5 py-4">
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  Recommended Action Plan
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {selectedCount} of {recommendedActions.length} actions selected
                </p>
              </div>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Actions */}
            <div className="space-y-3 p-5">
              {recommendedActions.map((action) => (
                <ActionRow
                  key={action.id}
                  action={action}
                  selected={selected.has(action.id)}
                  onToggle={() => toggle(action.id)}
                />
              ))}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 flex items-center justify-between border-t border-border bg-popover px-5 py-3">
              <span className="text-xs text-muted-foreground">
                {selectedCount} actions selected
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Reject
                </button>
                <button
                  className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Pencil className="mr-1 inline h-3 w-3" />
                  Edit
                </button>
                <button
                  onClick={() => setPhase('confirm')}
                  disabled={selectedCount === 0}
                  className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40"
                >
                  <Zap className="h-3 w-3" />
                  Approve & Execute
                </button>
              </div>
            </div>
          </>
        )}

        {phase === 'confirm' && (
          <div className="p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  Approve actions?
                </h2>
                <p className="text-xs text-muted-foreground">
                  Review the expected impact before executing.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg border border-border bg-background/50 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  You are about to execute
                </p>
                <p className="mt-1 text-2xl font-bold text-foreground tabular-nums">
                  {selectedCount} actions
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border bg-background/50 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Expected impact
                  </p>
                  <p className="mt-1 text-lg font-bold text-primary tabular-nums">
                    Processing time −31%
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-background/50 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Risk level
                  </p>
                  <p className="mt-1 text-lg font-bold text-success">Low</p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                onClick={() => setPhase('plan')}
                className="rounded-lg border border-border px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Zap className="h-3.5 w-3.5" />
                Approve & Execute
              </button>
            </div>
          </div>
        )}

        {phase === 'executing' && (
          <div className="p-8">
            <div className="space-y-4">
              {executionSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                    <step.icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{step.label}</p>
                  </div>
                  <Check className="h-4 w-4 text-primary" />
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Loader className="h-3.5 w-3.5 animate-spin text-primary" />
              Executing actions...
            </div>
          </div>
        )}

        {phase === 'done' && (
          <div className="p-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Check className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              Actions executed successfully
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              OPDOME is monitoring the outcome.
            </p>
            <button
              onClick={onClose}
              className="mt-5 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ActionRow({
  action,
  selected,
  onToggle,
}: {
  action: ActionItem;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        'rounded-lg border p-4 transition-colors',
        selected
          ? 'border-primary/20 bg-primary/5'
          : 'border-border bg-background/50'
      )}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={onToggle}
          className={cn(
            'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors',
            selected
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border hover:border-primary/50'
          )}
        >
          {selected && <Check className="h-3 w-3" />}
        </button>

        <div className="flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Action {String(action.number).padStart(2, '0')}
            </span>
            <StatusBadge variant={action.priority} />
          </div>

          <h4 className="text-sm font-medium text-foreground">{action.title}</h4>

          <div className="mt-2 grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Expected Impact
              </p>
              <p className="mt-0.5 text-xs font-medium text-primary">
                {action.expectedImpact}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Owner
              </p>
              <p className="mt-0.5 text-xs text-foreground">{action.owner}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Effort
              </p>
              <p className="mt-0.5 text-xs text-foreground">{action.effort}</p>
            </div>
            {action.affectedCustomers !== undefined && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Affected Customers
                </p>
                <p className="mt-0.5 text-xs text-foreground tabular-nums">
                  {action.affectedCustomers}
                </p>
              </div>
            )}
            {action.riskNote && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Risk
                </p>
                <p className="mt-0.5 text-xs text-warning">{action.riskNote}</p>
              </div>
            )}
          </div>

          <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
            {action.reason}
          </p>
        </div>
      </div>
    </div>
  );
}
