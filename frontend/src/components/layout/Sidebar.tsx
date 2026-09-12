import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { navGroups } from './nav-config';
import { Logo } from './Logo';
import { CompanySwitcher } from './CompanySwitcher';
import { UserMenu } from './UserMenu';
import { ChevronLeft, X } from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-border bg-card transition-all duration-200 lg:relative lg:z-30',
          collapsed ? 'w-[60px]' : 'w-[240px]',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo header */}
        <div className="flex h-14 items-center justify-between border-b border-border px-3">
          <div className="flex items-center gap-2 overflow-hidden">
            <Logo size={26} />
            {!collapsed && (
              <span className="text-[15px] font-semibold tracking-tight text-foreground">
                OPDOME
              </span>
            )}
          </div>
          <button
            onClick={onMobileClose}
            className="text-muted-foreground hover:text-foreground lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Company switcher */}
        <CompanySwitcher collapsed={collapsed} />

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3">
          {navGroups.map((group) => (
            <div key={group.title} className="mb-4">
              {!collapsed && (
                <p className="mb-1.5 px-4 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                  {group.title}
                </p>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onMobileClose}
                    className={({ isActive }) =>
                      cn(
                        'group relative flex items-center gap-2.5 px-3 py-1.5 text-[13px] font-medium transition-colors',
                        collapsed && 'justify-center px-0',
                        isActive
                          ? 'text-primary'
                          : 'text-muted-foreground hover:text-foreground'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={cn(
                            'absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-primary transition-opacity',
                            isActive ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                        <item.icon
                          className={cn(
                            'h-4 w-4 shrink-0',
                            isActive && 'text-primary'
                          )}
                        />
                        {!collapsed && <span>{item.label}</span>}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* User menu */}
        <div className="border-t border-border p-2">
          <UserMenu collapsed={collapsed} />
          {!collapsed && (
            <div className="mt-2 flex items-center gap-1.5 px-1">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
              <span className="text-[11px] text-muted-foreground">AI Online</span>
            </div>
          )}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={onToggle}
          className="hidden border-t border-border py-2 text-muted-foreground hover:text-foreground lg:flex lg:items-center lg:justify-center"
        >
          <ChevronLeft
            className={cn(
              'h-4 w-4 transition-transform',
              collapsed && 'rotate-180'
            )}
          />
        </button>
      </aside>
    </>
  );
}
