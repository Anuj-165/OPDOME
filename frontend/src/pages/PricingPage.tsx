import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Check, ChevronDown } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    description: 'For small teams beginning to automate operations.',
    price: 'Free',
    cta: 'Start Free',
    features: [
      'Business dashboard',
      'Core KPI monitoring',
      'Basic anomaly detection',
      'Data Hub',
      'Basic insights',
      'Team access',
    ],
    highlighted: false,
  },
  {
    name: 'Growth',
    description: 'For businesses that need AI-assisted operations.',
    price: 'Coming soon',
    cta: 'Start Growth',
    features: [
      'Everything in Starter',
      'AI investigations',
      'Root-cause analysis',
      'AI recommendations',
      'Action plans',
      'Workload intelligence',
      'Advanced analytics',
      'Team productivity insights',
      'Approval workflows',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    description: 'For organizations with complex operations.',
    price: 'Custom',
    cta: 'Talk to Sales',
    features: [
      'Everything in Growth',
      'Advanced automation',
      'Custom workflows',
      'Advanced permissions',
      'Enterprise integrations',
      'Governance controls',
      'Dedicated support',
      'Custom deployment options',
    ],
    highlighted: false,
  },
];

const faqs = [
  {
    q: 'What data can OPDOME connect to?',
    a: 'OPDOME connects to sales, orders, customers, employees, inventory, delivery, tasks, and expense data. You can import via CSV/Excel, connect a database, use our REST API, or start with the demo dataset.',
  },
  {
    q: 'Can we start with synthetic/demo data?',
    a: 'Yes. OPDOME includes a fully functional demo workspace with Northstar Commerce, a fictional e-commerce company. You can explore the entire product without connecting any real data.',
  },
  {
    q: 'Does OPDOME execute actions automatically?',
    a: 'OPDOME follows a human-in-the-loop model. AI recommends actions and authorized users approve execution. Every operational action remains visible, explainable, and controllable.',
  },
  {
    q: 'Can multiple employees use one company account?',
    a: 'Yes. OPDOME supports team-based access with roles including Owner, Admin, Manager, Analyst, and Viewer. Each role has appropriate permissions.',
  },
  {
    q: 'Can we upgrade our plan later?',
    a: 'Yes. You can upgrade from Starter to Growth or Enterprise at any time. Your data and configuration carry over seamlessly.',
  },
  {
    q: 'Is OPDOME suitable for small businesses?',
    a: 'Yes. The Starter plan is designed for small teams. As your operations grow, OPDOME grows with you through the Growth and Enterprise plans.',
  },
];

export function PricingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-background pt-24">
      {/* Header */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center lg:px-6">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Pricing that scales with your operations.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
          Start with visibility. Grow into intelligent operations.
        </p>
      </section>

      {/* Tiers */}
      <section className="mx-auto max-w-6xl px-4 pb-16 lg:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                'relative rounded-xl border p-6',
                tier.highlighted
                  ? 'border-primary/30 bg-primary/5'
                  : 'border-border bg-card/50'
              )}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                    Most Popular
                  </span>
                </div>
              )}
              <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{tier.description}</p>
              <p className="mt-4 text-3xl font-bold text-foreground">{tier.price}</p>
              <button
                onClick={() => navigate('/signup')}
                className={cn(
                  'mt-4 w-full rounded-lg py-2.5 text-sm font-medium transition-colors',
                  tier.highlighted
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'border border-border text-foreground hover:bg-card'
                )}
              >
                {tier.cta}
              </button>
              <div className="mt-6 space-y-2">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-2xl px-4 lg:px-6">
          <h2 className="mb-8 text-center text-2xl font-semibold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border border-border bg-card/50">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-sm font-medium text-foreground">{q}</span>
        <ChevronDown className={cn('h-4 w-4 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="px-4 pb-3 text-xs leading-relaxed text-muted-foreground animate-fade-in">
          {a}
        </div>
      )}
    </div>
  );
}
