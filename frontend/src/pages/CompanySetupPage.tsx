import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, type UserRole } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/layout/Logo';
import { demoCompany } from '@/lib/app-data';
import { Check, ChevronRight, Plus, X, Database, FileText, Code, Sheet, Sparkles } from 'lucide-react';

const steps = ['Company', 'Data', 'Team', 'Preferences', 'Complete'];

export function CompanySetupPage() {
  const navigate = useNavigate();
  const { completeOnboarding, user, organization, inviteMember } = useAuth();
  const [step, setStep] = useState(0);

  // Step 1: Company
  const [company, setCompany] = useState({
    name: organization?.name ?? '',
    industry: organization?.industry ?? '',
    size: '',
    region: '',
    model: '',
  });

  // Step 2: Data
  const [dataChoice, setDataChoice] = useState<string>('demo');

  // Step 3: Team
  const [members, setMembers] = useState<{ name: string; email: string; role: UserRole }[]>([]);

  // Step 4: Preferences
  const [prefs, setPrefs] = useState({
    sensitivity: 70,
    alertThreshold: 15,
    confidence: 75,
    requireApproval: true,
  notifications: true,
  });

  function next() {
    if (step < 4) setStep(step + 1);
  }
  function prev() {
    if (step > 0) setStep(step - 1);
  }

  function finish() {
    members.forEach((m) => inviteMember(m.name, m.email, m.role));
    completeOnboarding({
      name: company.name || organization?.name || 'My Company',
      industry: company.industry || organization?.industry || 'E-commerce',
    });
    navigate('/dashboard');
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Logo size={26} />
            <span className="text-sm font-semibold tracking-tight text-foreground">OPDOME</span>
          </div>
          <span className="text-xs text-muted-foreground">
            Welcome, {user?.name?.split(' ')[0] ?? 'there'}
          </span>
        </div>
      </div>

      {/* Stepper */}
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="flex items-center justify-between">
          {steps.map((label, i) => (
            <div key={label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium transition-colors',
                    i < step
                      ? 'border-primary bg-primary text-primary-foreground'
                      : i === step
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-muted-foreground'
                  )}
                >
                  {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </div>
                <span className={cn('mt-1.5 text-[10px] font-medium', i <= step ? 'text-foreground' : 'text-muted-foreground')}>
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={cn('mx-2 h-px flex-1', i < step ? 'bg-primary' : 'bg-border')} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="mt-8">
          {step === 0 && <CompanyStep company={company} setCompany={setCompany} />}
          {step === 1 && <DataStep dataChoice={dataChoice} setDataChoice={setDataChoice} />}
          {step === 2 && <TeamStep members={members} setMembers={setMembers} />}
          {step === 3 && <PreferencesStep prefs={prefs} setPrefs={setPrefs} />}
          {step === 4 && <CompleteStep company={company} dataChoice={dataChoice} members={members} />}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          {step > 0 && (
            <button
              onClick={prev}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Back
            </button>
          )}
          {step < 4 ? (
            <button
              onClick={next}
              className="ml-auto flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={finish}
              className="ml-auto flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Enter OPDOME
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function CompanyStep({ company, setCompany }: { company: any; setCompany: (c: any) => void }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Company</h2>
      <p className="text-sm text-muted-foreground">Tell us about your organization.</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company name</label>
          <input value={company.name} onChange={(e) => setCompany({ ...company, name: e.target.value })} placeholder="Acme Inc." className="auth-input" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Industry</label>
          <select value={company.industry} onChange={(e) => setCompany({ ...company, industry: e.target.value })} className="auth-input">
            <option value="">Select...</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Retail">Retail</option>
            <option value="SaaS">SaaS</option>
            <option value="Services">Services</option>
            <option value="Logistics">Logistics</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company size</label>
          <select value={company.size} onChange={(e) => setCompany({ ...company, size: e.target.value })} className="auth-input">
            <option value="">Select...</option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="200+">200+</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Primary operating region</label>
          <input value={company.region} onChange={(e) => setCompany({ ...company, region: e.target.value })} placeholder="North" className="auth-input" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Main business model</label>
          <select value={company.model} onChange={(e) => setCompany({ ...company, model: e.target.value })} className="auth-input">
            <option value="">Select...</option>
            <option value="B2B">B2B</option>
            <option value="B2C">B2C</option>
            <option value="D2C">D2C</option>
            <option value="Marketplace">Marketplace</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function DataStep({ dataChoice, setDataChoice }: { dataChoice: string; setDataChoice: (v: string) => void }) {
  const options = [
    { key: 'csv', label: 'CSV / Excel', icon: FileText, desc: 'Upload spreadsheets' },
    { key: 'database', label: 'Database', icon: Database, desc: 'Connect PostgreSQL, MySQL' },
    { key: 'api', label: 'API', icon: Code, desc: 'Custom REST API' },
    { key: 'sheets', label: 'Google Sheets', icon: Sheet, desc: 'Import from Sheets' },
    { key: 'demo', label: 'Demo Dataset', icon: Sparkles, desc: 'Northstar Commerce demo' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Data</h2>
      <p className="text-sm text-muted-foreground">Where does your operational data live?</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setDataChoice(opt.key)}
            className={cn(
              'flex items-center gap-3 rounded-lg border p-4 text-left transition-colors',
              dataChoice === opt.key
                ? 'border-primary/30 bg-primary/5'
                : 'border-border hover:border-border/60'
            )}
          >
            <opt.icon className={cn('h-5 w-5', dataChoice === opt.key ? 'text-primary' : 'text-muted-foreground')} />
            <div>
              <p className="text-sm font-medium text-foreground">{opt.label}</p>
              <p className="text-xs text-muted-foreground">{opt.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {dataChoice === 'demo' && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 animate-fade-in">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Northstar Commerce Demo</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div><span className="text-xs text-muted-foreground">Employees</span><p className="text-sm font-semibold text-foreground">{demoCompany.team}</p></div>
            <div><span className="text-xs text-muted-foreground">Orders</span><p className="text-sm font-semibold text-foreground">{demoCompany.orders}</p></div>
            <div><span className="text-xs text-muted-foreground">Customers</span><p className="text-sm font-semibold text-foreground">{demoCompany.customers}</p></div>
            <div><span className="text-xs text-muted-foreground">Products</span><p className="text-sm font-semibold text-foreground">{demoCompany.products}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}

function TeamStep({ members, setMembers }: { members: any[]; setMembers: (m: any[]) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('viewer');

  function addMember() {
    if (!name.trim() || !email.trim()) return;
    setMembers([...members, { name, email, role }]);
    setName('');
    setEmail('');
    setRole('viewer');
  }

  function removeMember(i: number) {
    setMembers(members.filter((_, idx) => idx !== i));
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Team</h2>
      <p className="text-sm text-muted-foreground">Set up your operations team.</p>

      <div className="grid grid-cols-12 gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="auth-input col-span-4" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="auth-input col-span-4" />
        <select value={role} onChange={(e) => setRole(e.target.value as UserRole)} className="auth-input col-span-3">
          <option value="owner">Owner</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="analyst">Analyst</option>
          <option value="viewer">Viewer</option>
        </select>
        <button onClick={addMember} className="col-span-1 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground">
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {members.length > 0 && (
        <div className="space-y-2">
          {members.map((m, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-card/50 px-3 py-2">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {m.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">{m.name}</p>
                  <p className="text-[10px] text-muted-foreground">{m.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-md border border-border px-2 py-0.5 text-[10px] font-medium capitalize text-muted-foreground">{m.role}</span>
                <button onClick={() => removeMember(i)} className="text-muted-foreground hover:text-destructive">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        You can also{' '}
        <button className="font-medium text-primary hover:text-primary/80">Skip for now</button>
      </p>
    </div>
  );
}

function PreferencesStep({ prefs, setPrefs }: { prefs: any; setPrefs: (p: any) => void }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Preferences</h2>
      <p className="text-sm text-muted-foreground">Configure AI and notification preferences.</p>

      <div className="space-y-4">
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs text-foreground">Investigation sensitivity</span>
            <span className="text-xs font-medium text-primary tabular-nums">{prefs.sensitivity}%</span>
          </div>
          <input type="range" min={0} max={100} value={prefs.sensitivity} onChange={(e) => setPrefs({ ...prefs, sensitivity: Number(e.target.value) })} className="w-full accent-primary" />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs text-foreground">Alert threshold</span>
            <span className="text-xs font-medium text-primary tabular-nums">{prefs.alertThreshold}%</span>
          </div>
          <input type="range" min={0} max={100} value={prefs.alertThreshold} onChange={(e) => setPrefs({ ...prefs, alertThreshold: Number(e.target.value) })} className="w-full accent-primary" />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs text-foreground">AI confidence threshold</span>
            <span className="text-xs font-medium text-primary tabular-nums">{prefs.confidence}%</span>
          </div>
          <input type="range" min={0} max={100} value={prefs.confidence} onChange={(e) => setPrefs({ ...prefs, confidence: Number(e.target.value) })} className="w-full accent-primary" />
        </div>
        <div className="flex items-center justify-between rounded-lg border border-border bg-card/50 px-3 py-2.5">
          <span className="text-xs text-foreground">Require approval for actions</span>
          <button onClick={() => setPrefs({ ...prefs, requireApproval: !prefs.requireApproval })} className={cn('relative h-5 w-9 rounded-full transition-colors', prefs.requireApproval ? 'bg-primary' : 'bg-muted')}>
            <span className={cn('absolute top-0.5 h-4 w-4 rounded-full bg-foreground transition-transform', prefs.requireApproval ? 'translate-x-4' : 'translate-x-0.5')} />
          </button>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-border bg-card/50 px-3 py-2.5">
          <span className="text-xs text-foreground">Email notifications</span>
          <button onClick={() => setPrefs({ ...prefs, notifications: !prefs.notifications })} className={cn('relative h-5 w-9 rounded-full transition-colors', prefs.notifications ? 'bg-primary' : 'bg-muted')}>
            <span className={cn('absolute top-0.5 h-4 w-4 rounded-full bg-foreground transition-transform', prefs.notifications ? 'translate-x-4' : 'translate-x-0.5')} />
          </button>
        </div>
      </div>
    </div>
  );
}

function CompleteStep({ company, dataChoice, members }: { company: any; dataChoice: string; members: any[] }) {
  return (
    <div className="space-y-4 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
        <Check className="h-7 w-7 text-primary" />
      </div>
      <h2 className="text-lg font-semibold text-foreground">Setup Complete</h2>
      <p className="text-sm text-muted-foreground">Your OPDOME workspace is ready.</p>

      <div className="mx-auto max-w-sm space-y-2 rounded-xl border border-border bg-card/50 p-4 text-left">
        <div className="flex justify-between"><span className="text-xs text-muted-foreground">Company</span><span className="text-xs font-medium text-foreground">{company.name || 'My Company'}</span></div>
        <div className="flex justify-between"><span className="text-xs text-muted-foreground">Data source</span><span className="text-xs font-medium text-foreground capitalize">{dataChoice === 'demo' ? 'Northstar Commerce Demo' : dataChoice}</span></div>
        <div className="flex justify-between"><span className="text-xs text-muted-foreground">Team members</span><span className="text-xs font-medium text-foreground">{members.length + 1} (including you)</span></div>
      </div>
      <p className="text-xs text-muted-foreground">You are the Organization Owner with full access.</p>
    </div>
  );
}
