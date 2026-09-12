import { useNavigate } from 'react-router-dom';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { revenueChartData, deliveryPerformanceData, customerHealthData } from '@/lib/app-data';
import { Lightbulb, ArrowRight } from 'lucide-react';

const tooltipStyle = {
  backgroundColor: 'hsl(220 14% 6%)',
  border: '1px solid hsl(220 10% 14%)',
  borderRadius: '8px',
  fontSize: '11px',
  color: 'hsl(0 0% 98%)',
};

export function AnalyticsPage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-[1600px] space-y-5 p-4 lg:p-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Business Analytics</h2>
        <p className="text-sm text-muted-foreground">Understand the numbers behind your operations.</p>
      </div>

      {/* Revenue trend */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Revenue Trend</h3>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-primary" /> Current
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-muted-foreground" /> Previous
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-warning" /> Forecast
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={revenueChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 10% 14%)" />
            <XAxis dataKey="day" stroke="hsl(220 8% 55%)" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(220 8% 55%)" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="current" stroke="hsl(152 51% 44%)" strokeWidth={2} dot={false} connectNulls={false} />
            <Line type="monotone" dataKey="previous" stroke="hsl(220 8% 55%)" strokeWidth={1.5} dot={false} strokeDasharray="4 4" connectNulls={false} />
            <Line type="monotone" dataKey="forecast" stroke="hsl(28 90% 52%)" strokeWidth={1.5} dot={false} strokeDasharray="2 4" connectNulls={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* AI insight */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Lightbulb className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">OPDOME Detected</p>
            <p className="mt-1 text-sm text-foreground">
              North region delivery performance has deviated significantly from its 30-day baseline.
            </p>
            <div className="mt-2 flex items-center gap-3">
              <span className="text-xs text-muted-foreground">Confidence: <span className="font-medium text-foreground">91%</span></span>
              <button
                onClick={() => navigate('/investigations/inv-1')}
                className="flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
              >
                Investigate
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Order processing */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Order Processing</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Current</p>
              <p className="mt-1 text-xl font-bold text-foreground tabular-nums">7.4 hrs</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Baseline</p>
              <p className="mt-1 text-xl font-bold text-muted-foreground tabular-nums">4.8 hrs</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Variance</p>
              <p className="mt-1 text-xl font-bold text-destructive tabular-nums">+54%</p>
            </div>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-destructive" style={{ width: '54%' }} />
          </div>
        </div>

        {/* Delivery performance */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Delivery Performance</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={deliveryPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 10% 14%)" />
              <XAxis dataKey="region" stroke="hsl(220 8% 55%)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(220 8% 55%)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'hsl(220 12% 11%)' }} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="onTime" name="On-time" fill="hsl(152 51% 44%)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="late" name="Late" fill="hsl(0 72% 51%)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Customer health */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-4 text-sm font-semibold text-foreground">Customer Health</h3>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {customerHealthData.map((item) => {
            const isNegative = item.value > item.baseline;
            return (
              <div key={item.metric} className="rounded-lg border border-border bg-background/50 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{item.metric}</p>
                <p className={`mt-1 text-xl font-bold tabular-nums ${isNegative ? 'text-destructive' : 'text-foreground'}`}>
                  {item.value}{item.metric === 'Retention' || item.metric === 'Repeat Purchases' ? '%' : item.metric === 'Complaints' ? '%' : ''}
                </p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">Baseline: {item.baseline}{item.metric === 'Retention' || item.metric === 'Repeat Purchases' ? '%' : item.metric === 'Complaints' ? '%' : ''}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
