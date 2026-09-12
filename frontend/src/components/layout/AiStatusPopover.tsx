import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { systemServices } from '@/lib/mock-data';
import { Check } from 'lucide-react';

export function AiStatusPopover() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-border bg-card/50 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-card"
      >
        <span className="h-2 w-2 rounded-full bg-primary animate-pulse-dot" />
        <span className="hidden sm:inline">OPDOME AI ONLINE</span>
        <span className="sm:hidden">AI</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-border bg-popover p-3 shadow-xl animate-fade-in">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-semibold text-foreground">System Status</p>
            <span className="text-[10px] text-muted-foreground">All systems operational</span>
          </div>
          <div className="space-y-1">
            {systemServices.map((service) => (
              <div
                key={service.name}
                className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-muted/50"
              >
                <span className="text-xs text-foreground">{service.name}</span>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  <span className="text-[11px] text-muted-foreground capitalize">
                    {service.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-1.5 border-t border-border pt-2">
            <Check className="h-3 w-3 text-success" />
            <span className="text-[10px] text-muted-foreground">
              All engines responding normally
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
