import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { dataSources, ordersData } from '@/lib/app-data';
import type { OrderRow } from '@/lib/app-data';
import { Search, ArrowLeft, Upload, FileSpreadsheet, FileJson, FileText, Check, X, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';

const statusStyles: Record<string, string> = {
  Delivered: 'text-success',
  Processing: 'text-blue-400',
  Delayed: 'text-destructive',
  Cancelled: 'text-muted-foreground',
};

const priorityStyles: Record<string, string> = {
  Critical: 'text-destructive',
  High: 'text-orange-400',
  Medium: 'text-yellow-400',
  Low: 'text-muted-foreground',
};

export function DataHubPage() {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [importOpen, setImportOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState(0);
  const pageSize = 8;

  const filteredOrders = useMemo(() => {
    return ordersData.filter((o) => {
      const matchesSearch =
        search === '' ||
        o.orderId.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalPages = Math.ceil(filteredOrders.length / pageSize);
  const pageData = filteredOrders.slice(page * pageSize, (page + 1) * pageSize);

  if (selectedSource) {
    return (
      <div className="mx-auto max-w-[1600px] space-y-5 p-4 lg:p-6">
        <button
          onClick={() => setSelectedSource(null)}
          className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Data Hub
        </button>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground capitalize">
              {selectedSource} Dataset
            </h2>
            <p className="text-sm text-muted-foreground">
              {dataSources.find((s) => s.id === selectedSource)?.records} records
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-1.5">
            {['all', 'Delivered', 'Processing', 'Delayed', 'Cancelled'].map((f) => (
              <button
                key={f}
                onClick={() => { setStatusFilter(f); setPage(0); }}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                  statusFilter === f
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {f === 'all' ? 'All' : f}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              placeholder="Search orders..."
              className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary/30 focus:outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {['Order ID', 'Customer', 'Region', 'Value', 'Status', 'Processing Time', 'Delivery', 'Priority'].map((col) => (
                    <th key={col} className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      <span className="flex items-center gap-1">
                        {col}
                        <ArrowUpDown className="h-2.5 w-2.5 opacity-40" />
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageData.map((row: OrderRow) => (
                  <tr key={row.id} className="border-b border-border/50 transition-colors last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-2.5 text-xs font-medium text-foreground">{row.orderId}</td>
                    <td className="px-4 py-2.5 text-xs text-foreground">{row.customer}</td>
                    <td className="px-4 py-2.5 text-xs text-muted-foreground">{row.region}</td>
                    <td className="px-4 py-2.5 text-xs font-medium text-foreground tabular-nums">{row.value}</td>
                    <td className="px-4 py-2.5 text-xs font-medium">
                      <span className={statusStyles[row.status]}>{row.status}</span>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-muted-foreground tabular-nums">{row.processingTime}</td>
                    <td className="px-4 py-2.5 text-xs text-muted-foreground">{row.deliveryStatus}</td>
                    <td className="px-4 py-2.5 text-xs font-medium">
                      <span className={priorityStyles[row.priority]}>{row.priority}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-border px-4 py-3">
            <span className="text-xs text-muted-foreground">
              Page {page + 1} of {totalPages} · {filteredOrders.length} records
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                className="rounded-md border border-border p-1.5 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                disabled={page >= totalPages - 1}
                className="rounded-md border border-border p-1.5 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-5 p-4 lg:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Data Hub</h2>
          <p className="text-sm text-muted-foreground">The operational data powering OPDOME intelligence.</p>
        </div>
        <button
          onClick={() => setImportOpen(true)}
          className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Upload className="h-3.5 w-3.5" />
          Import Data
        </button>
      </div>

      {/* Source cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dataSources.map((source) => (
          <div
            key={source.id}
            onClick={() => setSelectedSource(source.id)}
            className="group cursor-pointer rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">{source.name}</h3>
              <span className="flex items-center gap-1.5 text-[10px] font-medium text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
                Connected
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground tabular-nums">{source.records}</p>
              <p className="text-[11px] text-muted-foreground">records</p>
            </div>
            <div className="mt-3 border-t border-border pt-2">
              <p className="text-[11px] text-muted-foreground">Last synced: {source.lastSynced}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Import modal */}
      {importOpen && <ImportModal onClose={() => setImportOpen(false)} />}
    </div>
  );
}

function ImportModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<'upload' | 'preview' | 'done'>('upload');
  const [fileType, setFileType] = useState<'csv' | 'excel' | 'json' | null>(null);

  const fileTypes = [
    { key: 'csv' as const, label: 'CSV', icon: FileText },
    { key: 'excel' as const, label: 'Excel', icon: FileSpreadsheet },
    { key: 'json' as const, label: 'JSON', icon: FileJson },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-xl border border-border bg-popover shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-base font-semibold text-foreground">Import Data</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5">
          {step === 'upload' && (
            <>
              <p className="mb-4 text-xs text-muted-foreground">Select a file format to import.</p>
              <div className="grid grid-cols-3 gap-3">
                {fileTypes.map((ft) => (
                  <button
                    key={ft.key}
                    onClick={() => setFileType(ft.key)}
                    className={cn(
                      'flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors',
                      fileType === ft.key
                        ? 'border-primary/30 bg-primary/5'
                        : 'border-border hover:border-border/60'
                    )}
                  >
                    <ft.icon className="h-6 w-6 text-muted-foreground" />
                    <span className="text-xs font-medium text-foreground">{ft.label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-center rounded-lg border border-dashed border-border py-8">
                <div className="text-center">
                  <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
                  <p className="mt-2 text-xs text-muted-foreground">
                    {fileType ? `Drop your ${fileType.toUpperCase()} file here` : 'Select a format first'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setStep('preview')}
                disabled={!fileType}
                className="mt-4 w-full rounded-lg bg-primary py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40"
              >
                Continue
              </button>
            </>
          )}

          {step === 'preview' && (
            <>
              <p className="mb-4 text-xs text-muted-foreground">Data preview for {fileType?.toUpperCase()} import.</p>
              <div className="space-y-3">
                {[
                  { label: 'Records detected', value: '2,847' },
                  { label: 'Columns detected', value: '12' },
                  { label: 'Missing values', value: '23 (0.8%)' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-lg border border-border bg-background/50 px-3 py-2.5">
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                    <span className="text-xs font-semibold text-foreground tabular-nums">{item.value}</span>
                  </div>
                ))}
                <div className="rounded-lg border border-border bg-background/50 px-3 py-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Data quality score</span>
                    <span className="text-sm font-bold text-primary tabular-nums">92%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: '92%' }} />
                  </div>
                </div>
              </div>
              <button
                onClick={() => setStep('done')}
                className="mt-4 w-full rounded-lg bg-primary py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Connect Dataset
              </button>
            </>
          )}

          {step === 'done' && (
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Check className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground">Dataset connected</h3>
              <p className="mt-1 text-sm text-muted-foreground">OPDOME is now analyzing your data.</p>
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
    </div>
  );
}
