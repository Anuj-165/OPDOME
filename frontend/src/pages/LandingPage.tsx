import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  ArrowRight,
  TrendingDown,
  Users,
  AlertTriangle,
  Truck,
  Warehouse,
  Check,
  Zap,
  Search,
  Target,
  ShieldCheck,
  BarChart3,
  Database,
  Activity,
  Play,
  ChevronDown,
} from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();
  const { enterDemo } = useAuth();

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-6">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
            <span className="text-xs font-medium text-muted-foreground">AI Business Operations Autopilot</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Your dashboard tells you <span className="text-muted-foreground">WHAT happened.</span>
          </h1>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-primary sm:text-5xl lg:text-6xl">
            OPDOME tells you WHY.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            OPDOME continuously detects operational problems, investigates their root causes,
            recommends the next best actions, and helps your team execute them.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => navigate('/signup')}
              className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                enterDemo();
                navigate('/dashboard');
              }}
              className="flex items-center gap-2 rounded-lg border border-border bg-card/50 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-card"
            >
              <Play className="h-4 w-4" />
              Explore Demo
            </button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            AI recommends. Humans remain in control.
          </p>
        </div>

        {/* Hero product visual */}
        <div className="mx-auto mt-16 max-w-3xl px-4 lg:px-6">
          <HeroProductVisual />
        </div>
      </section>

      {/* Problem section */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Businesses have data. Finding the problem is still manual.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Traditional */}
            <div className="rounded-xl border border-border bg-card/50 p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Traditional Workflow</p>
              <div className="space-y-2">
                {['Data', 'Dashboard', 'Manual investigation', 'Meetings', 'Decision', 'Action'].map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md border border-border text-[10px] font-medium text-muted-foreground">{i + 1}</span>
                    <span className="text-sm text-muted-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* OPDOME */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-primary">OPDOME</p>
              <div className="space-y-2">
                {['Data', 'Detect', 'Investigate', 'Recommend', 'Approve', 'Act', 'Measure'].map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-[10px] font-medium text-primary">{i + 1}</span>
                    <span className="text-sm text-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            OPDOME turns operational data into an intelligent decision and action loop.
          </p>
        </div>
      </section>

      {/* Three core capabilities */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <FeatureCard
              number="01"
              title="Detect"
              icon={Activity}
              description="Find anomalies, bottlenecks, risks and opportunities before they become expensive problems."
              items={['Revenue anomalies', 'Delivery delays', 'Workload imbalance', 'Inventory risks', 'Customer churn signals']}
            />
            <FeatureCard
              number="02"
              title="Investigate"
              icon={Search}
              description="Trace connected operational signals to understand what is actually causing the problem."
            />
            <FeatureCard
              number="03"
              title="Act"
              icon={Zap}
              description="Turn insights into recommended actions, approvals and measurable outcomes."
              items={['Recommendation', 'Human approval', 'Execution', 'Measurement']}
            />
          </div>
        </div>
      </section>

      {/* Differentiation */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Don't just show the problem. Investigate it.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card/50 p-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Traditional Dashboard</p>
              <div className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-destructive" />
                <span className="text-2xl font-bold text-foreground">Revenue ↓18%</span>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Shows the metric. Doesn't explain why.</p>
            </div>
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">OPDOME</p>
              <div className="space-y-2">
                {[
                  { icon: TrendingDown, label: 'Revenue ↓18%' },
                  { icon: Users, label: 'Repeat customers ↓27%' },
                  { icon: AlertTriangle, label: 'Delivery complaints ↑41%' },
                  { icon: Truck, label: 'North region delays ↑63%' },
                  { icon: Warehouse, label: 'Warehouse B processing ↑52%' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t border-border pt-3">
                <p className="text-xs font-semibold text-primary">Root Cause: Warehouse B processing bottleneck</p>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {['WHAT', 'WHY', 'SO WHAT', 'NOW WHAT', 'DID IT WORK?'].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className="rounded-md border border-border bg-card/50 px-3 py-1.5 text-xs font-medium text-muted-foreground">{step}</span>
                {i < 4 && <ArrowRight className="h-3 w-3 text-muted-foreground/50" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            How it works
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[
              { num: '01', label: 'Connect Data', icon: Database },
              { num: '02', label: 'Detect Signals', icon: Activity },
              { num: '03', label: 'Investigate', icon: Search },
              { num: '04', label: 'Recommend', icon: Target },
              { num: '05', label: 'Approve & Act', icon: ShieldCheck },
              { num: '06', label: 'Measure', icon: BarChart3 },
            ].map((step) => (
              <div key={step.num} className="rounded-xl border border-border bg-card/50 p-4 text-center">
                <step.icon className="mx-auto h-6 w-6 text-primary" />
                <p className="mt-2 text-[10px] font-semibold text-muted-foreground">{step.num}</p>
                <p className="text-xs font-medium text-foreground">{step.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {['Sales', 'Orders', 'Customers', 'Employees', 'Inventory', 'Delivery', 'Tasks', 'Expenses'].map((src) => (
              <span key={src} className="rounded-md border border-border bg-card/30 px-2.5 py-1 text-xs text-muted-foreground">{src}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Human control */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            AI can recommend. Your team decides.
          </h2>
          <div className="mx-auto mt-10 max-w-md rounded-xl border border-border bg-card p-6 text-left">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="text-xs font-semibold text-foreground">AI Recommendation</span>
            </div>
            <p className="text-sm text-muted-foreground">
              "Reallocate 2 employees to Warehouse B for the next 7 days."
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-border bg-background/50 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Processing time</p>
                <p className="mt-0.5 text-lg font-bold text-primary tabular-nums">−31%</p>
              </div>
              <div className="rounded-lg border border-border bg-background/50 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Delayed orders</p>
                <p className="mt-0.5 text-lg font-bold text-primary tabular-nums">−42%</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 rounded-lg bg-primary py-2 text-xs font-medium text-primary-foreground">Approve & Execute</button>
              <button className="rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground">Edit</button>
              <button className="rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground">Reject</button>
            </div>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Every operational action remains visible, explainable and controllable.
          </p>
        </div>
      </section>

      {/* Productivity */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Turn hours of operational work into minutes.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card/50 p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Before</p>
              <div className="space-y-2">
                {['Monitor manually', 'Investigate manually', 'Prioritize manually', 'Coordinate manually'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-primary">With OPDOME</p>
              <div className="space-y-2">
                {['Continuous monitoring', 'AI-assisted investigation', 'AI-assisted prioritization', 'Automated coordination'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="h-3.5 w-3.5 text-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-4xl font-bold text-primary tabular-nums">9.4 hrs/week</p>
            <p className="mt-1 text-sm text-muted-foreground">Potential manager time saved</p>
            <p className="mt-1 text-xs text-muted-foreground/60">Illustrative demo estimate</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Start with visibility. Grow into intelligent operations.
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => navigate('/signup')}
              className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => navigate('/pricing')}
              className="rounded-lg border border-border bg-card/50 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-card"
            >
              View Pricing
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function HeroProductVisual() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-2xl">
      {/* KPI row */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Revenue</p>
          <p className="mt-1 text-2xl font-bold text-foreground tabular-nums">₹24.8L</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-md border border-destructive/20 bg-destructive/10 px-2 py-1">
          <TrendingDown className="h-3 w-3 text-destructive" />
          <span className="text-xs font-medium text-destructive">↓ 18.2%</span>
        </div>
      </div>

      {/* Investigation trail */}
      <div className="mt-4 space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">AI Investigation</p>
        {[
          { icon: TrendingDown, label: 'Revenue decline', color: 'text-destructive' },
          { icon: Users, label: 'Repeat customers ↓27%', color: 'text-muted-foreground' },
          { icon: AlertTriangle, label: 'Delivery complaints ↑41%', color: 'text-muted-foreground' },
          { icon: Truck, label: 'North region delays ↑63%', color: 'text-muted-foreground' },
          { icon: Warehouse, label: 'Warehouse B processing ↑52%', color: 'text-primary' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`flex h-6 w-6 items-center justify-center rounded-md border border-border bg-background/50`}>
              <item.icon className={`h-3 w-3 ${item.color}`} />
            </div>
            <span className="text-xs text-foreground">{item.label}</span>
            {i < 4 && <div className="ml-auto h-3 w-px bg-border" />}
          </div>
        ))}
      </div>

      {/* AI summary */}
      <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-3">
        <div className="flex items-start gap-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10">
            <Search className="h-3 w-3 text-primary" />
          </div>
          <p className="text-xs leading-relaxed text-foreground">
            Warehouse B processing delays are strongly associated with increased delivery delays
            and declining repeat purchases.
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  number,
  title,
  icon: Icon,
  description,
  items,
}: {
  number: string;
  title: string;
  icon: typeof Activity;
  description: string;
  items?: string[];
}) {
  return (
    <div className="rounded-xl border border-border bg-card/50 p-6 transition-colors hover:border-primary/30">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{number}</span>
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      {items && (
        <div className="mt-4 space-y-1.5">
          {items.map((item) => (
            <div key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="h-3 w-3 text-primary" />
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
