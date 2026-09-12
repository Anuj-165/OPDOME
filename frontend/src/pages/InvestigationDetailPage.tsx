import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/button';
import {
  InvestigationTimeline,
  NodeDetailPanel,
} from '@/components/investigations/InvestigationTimeline';
import { AiReasoningPanel } from '@/components/investigations/AiReasoningPanel';
import { InvestigationChat } from '@/components/investigations/InvestigationChat';
import { ActionPlan } from '@/components/investigations/ActionPlan';
import { timelineNodes } from '@/lib/investigation-data';
import type { TimelineNode } from '@/types';
import { ArrowLeft, Zap, TrendingDown, Target } from 'lucide-react';

export function InvestigationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedNode, setSelectedNode] = useState<TimelineNode | null>(null);
  const [actionPlanOpen, setActionPlanOpen] = useState(false);

  return (
    <div className="mx-auto max-w-[1600px] space-y-5 p-4 lg:p-6">
      {/* Back link */}
      <button
        onClick={() => navigate('/investigations')}
        className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Investigations
      </button>

      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Revenue decline — North Region
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <StatusBadge variant="root_cause_found" />
            <span className="flex items-center gap-1 rounded-md border border-destructive/20 bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
              <TrendingDown className="h-3 w-3" />
              Impact: −18%
            </span>
            <span className="flex items-center gap-1 rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              <Target className="h-3 w-3" />
              Confidence: 87%
            </span>
          </div>
        </div>

        <Button
          size="sm"
          onClick={() => setActionPlanOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Zap className="mr-1.5 h-3.5 w-3.5" />
          Create Action Plan
        </Button>
      </div>

      {/* Main grid: timeline + reasoning + chat */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Left: timeline + node detail */}
        <div className="space-y-5 lg:col-span-2">
          <InvestigationTimeline
            onNodeSelect={setSelectedNode}
            selectedNodeId={selectedNode?.id ?? null}
          />
          {selectedNode && <NodeDetailPanel node={selectedNode} />}
        </div>

        {/* Right: AI reasoning + chat */}
        <div className="space-y-5">
          <AiReasoningPanel />
          <InvestigationChat />
        </div>
      </div>

      <ActionPlan open={actionPlanOpen} onClose={() => setActionPlanOpen(false)} />
    </div>
  );
}
