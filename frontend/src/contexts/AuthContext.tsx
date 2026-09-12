import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type UserRole = 'owner' | 'admin' | 'manager' | 'analyst' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationId: string;
}

export interface Organization {
  id: string;
  name: string;
  industry: string;
  plan: 'starter' | 'growth' | 'enterprise';
  members: number;
  onboardingComplete: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'invited';
  lastActive: string;
}

interface AuthContextValue {
  user: User | null;
  organization: Organization | null;
  team: TeamMember[];
  isAuthenticated: boolean;
  isOnboardingComplete: boolean;
  login: (email: string, password: string) => void;
  signup: (data: SignupData) => void;
  logout: () => void;
  completeOnboarding: (orgData: Partial<Organization>) => void;
  switchOrganization: (orgId: string) => void;
  inviteMember: (name: string, email: string, role: UserRole) => void;
  updateRole: (memberId: string, role: UserRole) => void;
  enterDemo: () => void;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  company: string;
  companySize: string;
  industry: string;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = 'opdome-auth';

const demoOrg: Organization = {
  id: 'org-demo',
  name: 'Northstar Commerce',
  industry: 'E-commerce',
  plan: 'growth',
  members: 143,
  onboardingComplete: true,
};

const demoUser: User = {
  id: 'user-demo',
  name: 'Anuj Purohit',
  email: 'anuj@northstar.com',
  role: 'admin',
  organizationId: 'org-demo',
};

const demoTeam: TeamMember[] = [
  { id: 'tm-1', name: 'Anuj Purohit', email: 'anuj@northstar.com', role: 'admin', status: 'active', lastActive: 'Now' },
  { id: 'tm-2', name: 'Alex Morgan', email: 'alex@northstar.com', role: 'manager', status: 'active', lastActive: '5 min ago' },
  { id: 'tm-3', name: 'Priya Sharma', email: 'priya@northstar.com', role: 'analyst', status: 'active', lastActive: '1 hr ago' },
  { id: 'tm-4', name: 'Rahul Kumar', email: 'rahul@northstar.com', role: 'viewer', status: 'active', lastActive: '3 hrs ago' },
];

function loadState(): { user: User | null; organization: Organization | null; team: TeamMember[] } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        user: parsed.user ?? null,
        organization: parsed.organization ?? null,
        team: parsed.team ?? [],
      };
    }
  } catch {
    // ignore
  }
  return { user: null, organization: null, team: [] };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const login = (email: string, _password: string) => {
    setState({
      user: { ...demoUser, email },
      organization: demoOrg,
      team: demoTeam,
    });
  };

  const signup = (data: SignupData) => {
    const newOrg: Organization = {
      id: `org-${Date.now()}`,
      name: data.company,
      industry: data.industry,
      plan: 'starter',
      members: 1,
      onboardingComplete: false,
    };
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: 'owner',
      organizationId: newOrg.id,
    };
    setState({
      user: newUser,
      organization: newOrg,
      team: [{ id: `tm-${Date.now()}`, name: data.name, email: data.email, role: 'owner', status: 'active', lastActive: 'Now' }],
    });
  };

  const logout = () => {
    setState({ user: null, organization: null, team: [] });
  };

  const completeOnboarding = (orgData: Partial<Organization>) => {
    setState((prev) => ({
      ...prev,
      organization: prev.organization ? { ...prev.organization, ...orgData, onboardingComplete: true } : null,
    }));
  };

  const switchOrganization = (_orgId: string) => {
    setState((prev) => ({
      ...prev,
      organization: demoOrg,
      user: prev.user ? { ...prev.user, organizationId: demoOrg.id } : null,
      team: demoTeam,
    }));
  };

  const inviteMember = (name: string, email: string, role: UserRole) => {
    setState((prev) => ({
      ...prev,
      team: [...prev.team, { id: `tm-${Date.now()}`, name, email, role, status: 'invited', lastActive: '—' }],
    }));
  };

  const updateRole = (memberId: string, role: UserRole) => {
    setState((prev) => ({
      ...prev,
      team: prev.team.map((m) => (m.id === memberId ? { ...m, role } : m)),
    }));
  };

  const enterDemo = () => {
    setState({ user: demoUser, organization: demoOrg, team: demoTeam });
  };

  const value: AuthContextValue = {
    user: state.user,
    organization: state.organization,
    team: state.team,
    isAuthenticated: !!state.user,
    isOnboardingComplete: state.organization?.onboardingComplete ?? false,
    login,
    signup,
    logout,
    completeOnboarding,
    switchOrganization,
    inviteMember,
    updateRole,
    enterDemo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
