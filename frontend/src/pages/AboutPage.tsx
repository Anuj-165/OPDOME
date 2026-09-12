import { useNavigate } from 'react-router-dom';
import { ArrowRight, Brain, ShieldCheck, TrendingUp, RefreshCw, Search, Target, Zap, BarChart3 } from 'lucide-react';

export function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-background pt-24">
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center lg:px-6">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          We believe businesses don't need more dashboards.
        </h1>
        <h2 className="mt-2 text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
          They need systems that understand what is happening.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground">
          Modern businesses generate enormous amounts of operational data, but turning that data
          into timely decisions still requires people to manually monitor dashboards, investigate
          problems, coordinate teams and track outcomes.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-base text-foreground">
          OPDOME is being built to close that gap.
        </p>
      </section>

      {/* Mission */}
      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            From business data to measurable action.
          </h2>
          <div className="mt-10 flex flex-col items-center gap-2">
            {[
              { label: 'DATA', icon: BarChart3 },
              { label: 'INTELLIGENCE', icon: Search },
              { label: 'DECISION', icon: Target },
              { label: 'ACTION', icon: Zap },
              { label: 'OUTCOME', icon: TrendingUp },
            ].map((step, i, arr) => (
              <div key={step.label} className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/5">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="mt-2 text-xs font-semibold tracking-wider text-muted-foreground">{step.label}</span>
                {i < arr.length - 1 && <div className="my-1 h-4 w-px bg-border" />}
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-xl text-sm text-muted-foreground">
            Build an AI operations layer that helps businesses understand their operations and
            continuously improve them.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight text-foreground">
            Product Philosophy
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Search, title: 'Explainable', desc: 'Every important recommendation should have reasoning behind it.' },
              { icon: ShieldCheck, title: 'Human-controlled', desc: 'AI assists decisions. Authorized humans remain in control.' },
              { icon: TrendingUp, title: 'Outcome-driven', desc: 'Insights matter only when they lead to measurable improvements.' },
              { icon: RefreshCw, title: 'Continuously learning', desc: 'The system compares actions with outcomes and improves future recommendations.' },
            ].map((principle) => (
              <div key={principle.title} className="rounded-xl border border-border bg-card/50 p-5">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <principle.icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{principle.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{principle.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">Roadmap</h2>
          <div className="mt-10 flex flex-col items-center gap-2">
            {[
              { label: 'Analyst', desc: 'Detects problems and surfaces insights.', icon: Search },
              { label: 'Copilot', desc: 'Investigates problems and recommends actions.', icon: Brain },
              { label: 'Autopilot', desc: 'Executes approved workflows and continuously measures outcomes.', icon: Zap },
            ].map((step, i, arr) => (
              <div key={step.label} className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/5">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="mt-2 text-sm font-semibold text-foreground">{step.label}</span>
                <span className="mt-0.5 text-xs text-muted-foreground">{step.desc}</span>
                {i < arr.length - 1 && <div className="my-1 h-4 w-px bg-border" />}
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-xl text-xs text-muted-foreground">
            OPDOME starts with e-commerce and retail operations, with the long-term goal of becoming
            a domain-agnostic AI operations layer.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Start understanding your operations.
          </h2>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => navigate('/signup')}
              className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
