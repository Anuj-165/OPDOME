import { useState } from 'react';
import { cn } from '@/lib/utils';
import { demoCompany } from '@/lib/app-data';
import { Building2, Brain, ShieldCheck, Bell } from 'lucide-react';

export function SettingsPage() {
  const [orgName, setOrgName] = useState(demoCompany.name);
  const [industry, setIndustry] = useState(demoCompany.industry);
  const [teamSize, setTeamSize] = useState(demoCompany.team);
  const [timezone, setTimezone] = useState('IST (UTC+5:30)');
  const [sensitivity, setSensitivity] = useState(70);
  const [alertThreshold, setAlertThreshold] = useState(15);
  const [confidenceThreshold, setConfidenceThreshold] = useState(75);
  const [approvals, setApprovals] = useState({
    reassignment: true,
    customerComm: true,
    inventory: true,
    financial: true,
  });
  const [notifications, setNotifications] = useState({
    email: true,
    inApp: true,
    critical: true,
    dailySummary: false,
  });

  return (
    <div className="mx-auto max-w-[800px] space-y-5 p-4 lg:p-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground">Configure OPDOME for your organization.</p>
      </div>

      {/* Organization */}
      <SettingsSection icon={Building2} title="Organization">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Company name">
            <input value={orgName} onChange={(e) => setOrgName(e.target.value)} className="settings-input" />
          </Field>
          <Field label="Industry">
            <input value={industry} onChange={(e) => setIndustry(e.target.value)} className="settings-input" />
          </Field>
          <Field label="Team size">
            <input value={teamSize} onChange={(e) => setTeamSize(e.target.value)} className="settings-input" />
          </Field>
          <Field label="Timezone">
            <input value={timezone} onChange={(e) => setTimezone(e.target.value)} className="settings-input" />
          </Field>
        </div>
      </SettingsSection>

      {/* AI Preferences */}
      <SettingsSection icon={Brain} title="AI Preferences">
        <div className="space-y-4">
          <SliderField label="Investigation sensitivity" value={sensitivity} onChange={setSensitivity} suffix="%" />
          <SliderField label="Alert threshold" value={alertThreshold} onChange={setAlertThreshold} suffix="%" />
          <SliderField label="AI confidence threshold" value={confidenceThreshold} onChange={setConfidenceThreshold} suffix="%" />
        </div>
      </SettingsSection>

      {/* Approval Rules */}
      <SettingsSection icon={ShieldCheck} title="Approval Rules">
        <p className="mb-3 text-xs text-muted-foreground">Require approval for:</p>
        <div className="space-y-2">
          <ToggleRow label="Employee reassignment" checked={approvals.reassignment} onChange={(v) => setApprovals({ ...approvals, reassignment: v })} />
          <ToggleRow label="Customer communication" checked={approvals.customerComm} onChange={(v) => setApprovals({ ...approvals, customerComm: v })} />
          <ToggleRow label="Inventory changes" checked={approvals.inventory} onChange={(v) => setApprovals({ ...approvals, inventory: v })} />
          <ToggleRow label="Financial actions" checked={approvals.financial} onChange={(v) => setApprovals({ ...approvals, financial: v })} />
        </div>
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection icon={Bell} title="Notifications">
        <div className="space-y-2">
          <ToggleRow label="Email notifications" checked={notifications.email} onChange={(v) => setNotifications({ ...notifications, email: v })} />
          <ToggleRow label="In-app notifications" checked={notifications.inApp} onChange={(v) => setNotifications({ ...notifications, inApp: v })} />
          <ToggleRow label="Critical alerts" checked={notifications.critical} onChange={(v) => setNotifications({ ...notifications, critical: v })} />
          <ToggleRow label="Daily summary" checked={notifications.dailySummary} onChange={(v) => setNotifications({ ...notifications, dailySummary: v })} />
        </div>
      </SettingsSection>

      <button className="rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90">
        Save Changes
      </button>
    </div>
  );
}

function SettingsSection({ icon: Icon, title, children }: { icon: typeof Building2; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-3.5 w-3.5 text-primary" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}

function SliderField({ label, value, onChange, suffix }: { label: string; value: number; onChange: (v: number) => void; suffix: string }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs text-foreground">{label}</span>
        <span className="text-xs font-medium text-primary tabular-nums">{value}{suffix}</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-primary"
      />
    </div>
  );
}

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-background/50 px-3 py-2.5">
      <span className="text-xs text-foreground">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={cn(
          'relative h-5 w-9 rounded-full transition-colors',
          checked ? 'bg-primary' : 'bg-muted'
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 h-4 w-4 rounded-full bg-foreground transition-transform',
            checked ? 'translate-x-4' : 'translate-x-0.5'
          )}
        />
      </button>
    </div>
  );
}
