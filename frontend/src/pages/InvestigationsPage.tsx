import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { InvestigationCard } from '@/components/investigations/InvestigationCard';
import { investigationList } from '@/lib/investigation-data';
import type { InvestigationStatus, Severity } from '@/types';
import { Search, Filter } from 'lucide-react';

type FilterKey = 'all' | InvestigationStatus | Severity;

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'critical', label: 'Critical' },
  { key: 'investigating', label: 'Investigating' },
  { key: 'root_cause_found', label: 'Root Cause Found' },
  { key: 'awaiting_review', label: 'Awaiting Approval' },
  { key: 'resolved', label: 'Resolved' },
];

export function InvestigationsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return investigationList.filter((inv) => {
      const matchesFilter =
        activeFilter === 'all' ||
        inv.status === (activeFilter as InvestigationStatus) ||
        inv.severity === (activeFilter as Severity);
      const matchesSearch =
        search === '' ||
        inv.title.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, search]);

  return (
    <div className="mx-auto max-w-[1600px] space-y-5 p-4 lg:p-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Investigations
        </h2>
        <p className="text-sm text-muted-foreground">
          Understand what's changing inside your business.
        </p>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <Filter className="mr-1 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={cn(
                'shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                activeFilter === filter.key
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search investigations..."
            className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary/30 focus:outline-none"
          />
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? 'investigation' : 'investigations'} found
      </p>

      {/* Investigation cards */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-border bg-card py-16 text-center">
          <p className="text-sm text-muted-foreground">No investigations match your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {filtered.map((inv) => (
            <InvestigationCard key={inv.id} investigation={inv} />
          ))}
        </div>
      )}
    </div>
  );
}
