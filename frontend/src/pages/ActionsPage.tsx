import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { StatusBadge } from '@/components/common/StatusBadge';
import { actionsTableData } from '@/lib/investigation-data';
import type { ActionStatus, ActionPriority } from '@/types';
import { Check, X, Pencil, UserPlus, Search as SearchIcon } from 'lucide-react';

type TabKey = 'all' | ActionStatus;

const tabs: { key: TabKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'awaiting_approval', label: 'Awaiting Approval' },
  { key: 'scheduled', label: 'Scheduled' },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'completed', label: 'Completed' },
  { key: 'failed', label: 'Failed' },
];

const statusVariantMap: Record<ActionStatus, 'investigating' | 'root_cause_found' | 'awaiting_review' | 'resolved'> = {
  awaiting_approval: 'awaiting_review',
  scheduled: 'investigating',
  in_progress: 'investigating',
  completed: 'resolved',
  failed: 'critical' as never,
};

const statusLabelMap: Record<ActionStatus, string> = {
  awaiting_approval: 'Awaiting Approval',
  scheduled: 'Scheduled',
  in_progress: 'In Progress',
  completed: 'Completed',
  failed: 'Failed',
};

const failedStyle = 'bg-destructive/10 text-destructive border-destructive/20';

export function ActionsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('all');

  const filtered = useMemo(() => {
    if (activeTab === 'all') return actionsTableData;
    return actionsTableData.filter((a) => a.status === activeTab);
  }, [activeTab]);

  return (
    <div className="mx-auto max-w-[1600px] space-y-5 p-4 lg:p-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Actions</h2>
        <p className="text-sm text-muted-foreground">
          Turn operational intelligence into controlled execution.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
              activeTab === tab.key
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Action
                </th>
                <th className="hidden px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">
                  Source
                </th>
                <th className="hidden px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground lg:table-cell">
                  Owner
                </th>
                <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Priority
                </th>
                <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="hidden px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground xl:table-cell">
                  Expected Impact
                </th>
                <th className="px-4 py-2.5"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((action) => (
                <tr
                  key={action.id}
                  className="group border-b border-border/50 transition-colors last:border-0 hover:bg-muted/30"
                >
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium text-foreground">{action.title}</span>
                  </td>
                  <td className="hidden px-4 py-3 text-xs text-muted-foreground md:table-cell">
                    {action.source}
                  </td>
                  <td className="hidden px-4 py-3 text-xs text-muted-foreground lg:table-cell">
                    {action.owner}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge variant={action.priority as ActionPriority} />
                  </td>
                  <td className="px-4 py-3">
                    {action.status === 'failed' ? (
                      <span className={cn('inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium', failedStyle)}>
                        {statusLabelMap[action.status]}
                      </span>
                    ) : (
                      <StatusBadge variant={statusVariantMap[action.status]} />
                    )}
                  </td>
                  <td className="hidden px-4 py-3 text-xs text-primary xl:table-cell">
                    {action.expectedImpact}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      {action.status === 'awaiting_approval' && (
                        <>
                          <button className="rounded-md p-1.5 text-primary hover:bg-primary/10" title="Approve">
                            <Check className="h-3.5 w-3.5" />
                          </button>
                          <button className="rounded-md p-1.5 text-destructive hover:bg-destructive/10" title="Reject">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </>
                      )}
                      <button className="rounded-md p-1.5 text-muted-foreground hover:bg-muted" title="Edit">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button className="rounded-md p-1.5 text-muted-foreground hover:bg-muted" title="Assign">
                        <UserPlus className="h-3.5 w-3.5" />
                      </button>
                      <button className="rounded-md p-1.5 text-muted-foreground hover:bg-muted" title="View investigation">
                        <SearchIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
