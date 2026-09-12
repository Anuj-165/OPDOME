import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { ChevronDown, Check, Settings, UserPlus, ArrowLeftRight } from 'lucide-react';

export function CompanySwitcher({ collapsed }: { collapsed: boolean }) {
  const { organization, switchOrganization } = useAuth();
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

  if (collapsed) return null;

  return (
    <div ref={ref} className="relative px-3 pb-1">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-lg border border-border bg-background/50 px-2.5 py-1.5 transition-colors hover:bg-muted/30"
      >
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-[10px] font-semibold text-primary">
            {organization?.name?.charAt(0) ?? 'N'}
          </div>
          <span className="truncate text-xs font-medium text-foreground">
            {organization?.name ?? 'Workspace'}
          </span>
        </div>
        <ChevronDown className={cn('h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute left-3 right-3 top-full z-50 mt-1 rounded-lg border border-border bg-popover shadow-xl animate-fade-in">
          <div className="p-1.5">
            <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Current workspace</p>
            <div className="flex items-center justify-between rounded-md px-2 py-1.5">
              <span className="text-xs font-medium text-foreground">{organization?.name}</span>
              <Check className="h-3 w-3 text-primary" />
            </div>
          </div>
          <div className="border-t border-border p-1.5">
            <button
              onClick={() => { navigate('/settings/company'); setOpen(false); }}
              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <Settings className="h-3.5 w-3.5" />
              Workspace settings
            </button>
            <button
              onClick={() => { navigate('/settings/team'); setOpen(false); }}
              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <UserPlus className="h-3.5 w-3.5" />
              Invite team
            </button>
            <button
              onClick={() => { switchOrganization('org-demo'); setOpen(false); }}
              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeftRight className="h-3.5 w-3.5" />
              Switch workspace
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
