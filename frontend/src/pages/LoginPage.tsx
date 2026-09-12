import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AuthLayout } from '@/components/auth/AuthLayout';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, enterDemo } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || 'anuj@northstar.com', password);
    navigate('/dashboard');
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to your OPDOME workspace."
      leftMessage="Understand your operations. Act with confidence."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Work email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full rounded-lg border border-border bg-card py-2.5 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/30 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-lg border border-border bg-card py-2.5 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/30 focus:outline-none"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="accent-primary"
            />
            Remember me
          </label>
          <button type="button" className="text-xs text-primary hover:text-primary/80">
            Forgot password?
          </button>
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Log in
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">OR</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <button
          type="button"
          onClick={() => { login(email || 'anuj@northstar.com', password); navigate('/dashboard'); }}
          className="w-full rounded-lg border border-border bg-card py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-card/80"
        >
          Continue with Google
        </button>

        <button
          type="button"
          onClick={() => { enterDemo(); navigate('/dashboard'); }}
          className="w-full rounded-lg border border-primary/20 bg-primary/5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
        >
          Explore Demo Workspace
        </button>

        <p className="text-center text-xs text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-primary hover:text-primary/80">
            Create workspace
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
