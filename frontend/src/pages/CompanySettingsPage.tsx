import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Building2 } from 'lucide-react';

export function CompanySettingsPage() {
  const { organization } = useAuth();
  const [form, setForm] = useState({
    name: organization?.name ?? '',
    industry: organization?.industry ?? '',
    size: '',
    region: '',
    model: '',
  });

  return (
    <div className="mx-auto max-w-[800px] space-y-5 p-4 lg:p-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Company Settings</h2>
        <p className="text-sm text-muted-foreground">Manage your organization profile.</p>
      </div>

      {/* Organization hierarchy */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-4 text-sm font-semibold text-foreground">Organization Hierarchy</h3>
        <div className="flex flex-col gap-2">
          {[
            { level: 'Organization', value: organization?.name ?? 'My Company' },
            { level: 'Owner', value: 'You' },
            { level: 'Admins', value: 'Full access' },
            { level: 'Managers', value: 'Operations + actions' },
            { level: 'Analysts', value: 'Analytics + investigations' },
            { level: 'Viewers', value: 'Read-only' },
          ].map((item, i) => (
            <div key={item.level} className="flex items-center gap-2">
              <div className="flex items-center gap-2" style={{ marginLeft: i * 16 }}>
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-xs font-medium text-foreground">{item.level}</span>
              </div>
              <span className="text-xs text-muted-foreground">— {item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Company form */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
            <Building2 className="h-3.5 w-3.5 text-primary" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">Company Profile</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="settings-input" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Industry</label>
            <select value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} className="settings-input">
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
            <select value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} className="settings-input">
              <option value="">Select...</option>
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="200+">200+</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Primary region</label>
            <input value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} placeholder="North" className="settings-input" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Business model</label>
            <select value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} className="settings-input">
              <option value="">Select...</option>
              <option value="B2B">B2B</option>
              <option value="B2C">B2C</option>
              <option value="D2C">D2C</option>
              <option value="Marketplace">Marketplace</option>
            </select>
          </div>
        </div>
        <button className="mt-4 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          Save Changes
        </button>
      </div>
    </div>
  );
}
