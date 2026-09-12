import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AuthLayout } from '@/components/auth/AuthLayout';

export function SignupPage() {
  const navigate = useNavigate();
  const { signup, enterDemo } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    companySize: '',
    industry: '',
    useCase: '',
    agree: false,
  });

  const set = (key: keyof typeof form, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup({
      name: form.name || 'New User',
      email: form.email || 'user@company.com',
      password: form.password,
      company: form.company || 'My Company',
      companySize: form.companySize || '1-10',
      industry: form.industry || 'E-commerce',
    });
    navigate('/company/setup');
  };

  return (
    <AuthLayout
      title="Create your OPDOME workspace"
      subtitle="Set up your company's operations intelligence workspace."
      leftMessage="Start with visibility. Grow into intelligent operations."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name</label>
            <input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="John Doe" className="auth-input" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Work Email</label>
            <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@company.com" className="auth-input" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
            <input type="password" value={form.password} onChange={(e) => set('password', e.target.value)} placeholder="••••••••" className="auth-input" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Confirm</label>
            <input type="password" value={form.confirmPassword} onChange={(e) => set('confirmPassword', e.target.value)} placeholder="••••••••" className="auth-input" />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company Name</label>
          <input value={form.company} onChange={(e) => set('company', e.target.value)} placeholder="Acme Inc." className="auth-input" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company Size</label>
            <select value={form.companySize} onChange={(e) => set('companySize', e.target.value)} className="auth-input">
              <option value="">Select...</option>
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="200+">200+</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Industry</label>
            <select value={form.industry} onChange={(e) => set('industry', e.target.value)} className="auth-input">
              <option value="">Select...</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Retail">Retail</option>
              <option value="SaaS">SaaS</option>
              <option value="Services">Services</option>
              <option value="Logistics">Logistics</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Use Case</label>
          <input value={form.useCase} onChange={(e) => set('useCase', e.target.value)} placeholder="What do you want to monitor?" className="auth-input" />
        </div>
        <label className="flex items-start gap-2 text-xs text-muted-foreground">
          <input type="checkbox" checked={form.agree} onChange={(e) => set('agree', e.target.checked)} className="mt-0.5 accent-primary" />
          I agree to the Terms of Service and Privacy Policy.
        </label>
        <button
          type="submit"
          className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Create Workspace
        </button>

        <button
          type="button"
          onClick={() => { enterDemo(); navigate('/dashboard'); }}
          className="w-full rounded-lg border border-primary/20 bg-primary/5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
        >
          Explore Demo Workspace
        </button>

        <p className="text-center text-xs text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary hover:text-primary/80">
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
