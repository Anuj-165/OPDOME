import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { ChevronDown, User, Settings, Users, CreditCard, Plug, LogOut } from 'lucide-react';

export function UserMenu({ collapsed }: { collapsed: boolean }) {
  const { user, organization, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const initials = user?.name?.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() ?? 'U';

  if (collapsed) {
    return (
      <div className="flex justify-center">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary/10 text-xs font-semibold text-primary ring-1 ring-primary/20">
          {initials}
        </div>
      </div>
    );
  }

  const menuItems = [
    { label: 'Profile', icon: User, action: () => navigate('/settings') },
    { label: 'Company Settings', icon: Settings, action: () => navigate('/settings/company') },
    { label: 'Team', icon: Users, action: () => navigate('/settings/team') },
    { label: 'Billing', icon: CreditCard, action: () => navigate('/settings/billing') },
    { label: 'Integrations', icon: Plug, action: () => navigate('/integrations') },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2.5 rounded-lg px-1 py-1 transition-colors hover:bg-muted/30"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary/10 text-xs font-semibold text-primary ring-1 ring-primary/20">
          {initials}
        </div>
        <div className="min-w-0 flex-1 text-left">
          <p className="truncate text-xs font-medium text-foreground">{user?.name ?? 'User'}</p>
          <p className="truncate text-[11px] capitalize text-muted-foreground">{user?.role ?? 'member'}</p>
        </div>
        <ChevronDown className={cn('h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute bottom-full left-0 right-0 z-50 mb-1 rounded-lg border border-border bg-popover shadow-xl animate-fade-in">
          <div className="border-b border-border px-3 py-2">
            <p className="text-xs font-medium text-foreground">{user?.name}</p>
            <p className="text-[10px] text-muted-foreground">{organization?.name}</p>
          </div>
          <div className="p-1.5">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => { item.action(); setOpen(false); }}
                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </button>
            ))}
          </div>
          <div className="border-t border-border p-1.5">
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-destructive transition-colors hover:text-destructive/80"
            >
              <LogOut className="h-3.5 w-3.5" />
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
