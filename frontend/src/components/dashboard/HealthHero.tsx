import { ArrowUpRight, AlertTriangle } from 'lucide-react';

export function HealthHero() {
  const score = 72;
  const radius = 80;
  const circumference = Math.PI * radius; // semicircle
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6 lg:flex-row lg:items-center lg:justify-between">
      {/* Left: text */}
      <div className="flex-1">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Business Health
          </span>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="text-5xl font-bold tracking-tight text-foreground tabular-nums">
            {score}
          </span>
          <span className="text-lg font-medium text-muted-foreground">
            / 100
          </span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-yellow-500/20 bg-yellow-500/10 px-2 py-0.5 text-xs font-medium text-yellow-400">
            <AlertTriangle className="h-3 w-3" />
            Needs Attention
          </span>
        </div>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          3 critical operational issues require attention.
        </p>
        <div className="mt-4 flex items-center gap-1.5 text-xs text-success">
          <ArrowUpRight className="h-3.5 w-3.5" />
          <span className="font-medium">4 pts from last week</span>
        </div>
      </div>

      {/* Right: semicircular gauge */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <svg
            width="200"
            height="110"
            viewBox="0 0 200 110"
            className="overflow-visible"
          >
            <defs>
              <linearGradient id="health-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(var(--destructive))" />
                <stop offset="50%" stopColor="hsl(var(--warning))" />
                <stop offset="100%" stopColor="hsl(var(--primary))" />
              </linearGradient>
            </defs>
            {/* Background arc */}
            <path
              d={`M 20 100 A ${radius} ${radius} 0 0 1 180 100`}
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Score arc */}
            <path
              d={`M 20 100 A ${radius} ${radius} 0 0 1 180 100`}
              fill="none"
              stroke="url(#health-grad)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
            <span className="text-2xl font-bold text-foreground tabular-nums">
              {score}
            </span>
            <span className="text-[10px] text-muted-foreground">HEALTH SCORE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
