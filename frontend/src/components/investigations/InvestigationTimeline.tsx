import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { TimelineNode } from '@/types';
import { timelineNodes } from '@/lib/investigation-data';
import { ChevronDown, Target } from 'lucide-react';

interface InvestigationTimelineProps {
  onNodeSelect: (node: TimelineNode) => void;
  selectedNodeId: string | null;
}

export function InvestigationTimeline({
  onNodeSelect,
  selectedNodeId,
}: InvestigationTimelineProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-2">
        <h3 className="text-sm font-semibold text-foreground">Investigation Timeline</h3>
      </div>

      <div className="space-y-0">
        {timelineNodes.map((node, index) => {
          const isSelected = selectedNodeId === node.id;
          const isHovered = hoveredId === node.id;
          const isLast = index === timelineNodes.length - 1;

          return (
            <div key={node.id}>
              <button
                onClick={() => onNodeSelect(node)}
                onMouseEnter={() => setHoveredId(node.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={cn(
                  'group flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors',
                  node.isRootCause
                    ? 'border-primary/30 bg-primary/5'
                    : isSelected || isHovered
                      ? 'border-border bg-muted/50'
                      : 'border-transparent hover:bg-muted/30'
                )}
              >
                {/* Node indicator */}
                <div
                  className={cn(
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-[10px] font-semibold',
                    node.isRootCause
                      ? 'border-primary/30 bg-primary/10 text-primary'
                      : isSelected
                        ? 'border-primary/30 bg-primary/10 text-primary'
                        : 'border-border bg-background text-muted-foreground'
                  )}
                >
                  {node.isRootCause ? (
                    <Target className="h-3.5 w-3.5" />
                  ) : (
                    index + 1
                  )}
                </div>

                {/* Label */}
                <div className="flex-1">
                  <p
                    className={cn(
                      'text-xs font-medium',
                      node.isRootCause ? 'text-primary' : 'text-foreground'
                    )}
                  >
                    {node.label}
                  </p>
                </div>

                {/* Confidence */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground tabular-nums">
                    {node.confidence}%
                  </span>
                  <ChevronDown className="h-3 w-3 text-muted-foreground" />
                </div>
              </button>

              {/* Connecting line */}
              {!isLast && (
                <div className="flex justify-center py-0.5">
                  <div className="h-5 w-px bg-border" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function NodeDetailPanel({ node }: { node: TimelineNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 animate-fade-in">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">{node.metric}</h3>
        {node.isRootCause && (
          <span className="flex items-center gap-1 rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
            <Target className="h-2.5 w-2.5" />
            Root Cause
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Current Value
          </p>
          <p className="mt-1 text-sm font-semibold text-foreground tabular-nums">
            {node.currentValue}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Baseline
          </p>
          <p className="mt-1 text-sm font-semibold text-muted-foreground tabular-nums">
            {node.baseline}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Change
          </p>
          <p
            className={cn(
              'mt-1 text-sm font-semibold tabular-nums',
              node.change.startsWith('−') || node.change.startsWith('-')
                ? 'text-destructive'
                : node.change.startsWith('+')
                  ? 'text-warning'
                  : 'text-foreground'
            )}
          >
            {node.change}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Confidence
          </p>
          <p className="mt-1 text-sm font-semibold text-primary tabular-nums">
            {node.confidence}%
          </p>
        </div>
      </div>

      <div className="mt-4 border-t border-border pt-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Related Events
        </p>
        <div className="mt-1.5 space-y-1">
          {node.relatedEvents.map((event, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-1 w-1 rounded-full bg-muted-foreground" />
              {event}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 border-t border-border pt-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Data Source
        </p>
        <p className="mt-1 text-xs text-foreground">{node.dataSource}</p>
      </div>
    </div>
  );
}
