import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { HealthHero } from '@/components/dashboard/HealthHero';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { SignalsSection } from '@/components/dashboard/SignalsSection';
import { InsightsPanel } from '@/components/dashboard/InsightsPanel';
import { InvestigationsTable } from '@/components/dashboard/InvestigationsTable';
import { ImpactSection } from '@/components/dashboard/ImpactSection';
import { ActivityFooter } from '@/components/dashboard/ActivityFooter';
import { kpis } from '@/lib/mock-data';
import { Search, Clock } from 'lucide-react';

export function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-[1600px] space-y-5 p-4 lg:p-6">
      {/* Page header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Command Center
          </h2>
          <p className="text-sm text-muted-foreground">Your business at a glance.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
            <Clock className="h-3 w-3" />
            Last updated: 2 min ago
          </div>
          <Button
            size="sm"
            onClick={() => navigate('/investigations')}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Search className="mr-1.5 h-3.5 w-3.5" />
            Investigate Business
          </Button>
        </div>
      </div>

      {/* Health hero */}
      <HealthHero />

      {/* KPI grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.id} data={kpi} />
        ))}
      </div>

      {/* Signals + Insights */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SignalsSection />
        </div>
        <div>
          <InsightsPanel />
        </div>
      </div>

      {/* Active investigations */}
      <InvestigationsTable />

      {/* Potential impact */}
      <ImpactSection />

      {/* Activity footer */}
      <ActivityFooter />
    </div>
  );
}
