import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { CommandPalette } from './CommandPalette';
import { GlobalAiAssistant } from './GlobalAiAssistant';

const pageMeta: Record<string, { title: string; subtitle?: string }> = {
  '/dashboard': { title: 'Command Center', subtitle: 'Your business at a glance.' },
  '/investigations': { title: 'Investigations', subtitle: 'AI-driven root cause analysis.' },
  '/investigations/': { title: 'Investigation', subtitle: 'Root cause analysis.' },
  '/insights': { title: 'Opportunities', subtitle: 'Where OPDOME sees room for improvement.' },
  '/analytics': { title: 'Business Analytics', subtitle: 'Understand the numbers behind your operations.' },
  '/actions': { title: 'Actions', subtitle: 'Turn intelligence into controlled execution.' },
  '/tasks': { title: 'Task Workload', subtitle: 'Team workload distribution.' },
  '/workload': { title: 'Workload', subtitle: 'Team workload distribution.' },
  '/data-hub': { title: 'Data Hub', subtitle: 'The operational data powering OPDOME intelligence.' },
  '/integrations': { title: 'Integrations', subtitle: 'Connect OPDOME to the tools your business uses.' },
  '/system': { title: 'OPDOME System', subtitle: 'Real-time system health and activity.' },
  '/settings': { title: 'Settings', subtitle: 'Configure OPDOME for your organization.' },
  '/settings/team': { title: 'Team', subtitle: 'Manage team members and roles.' },
  '/settings/billing': { title: 'Billing', subtitle: 'Manage your subscription and usage.' },
  '/settings/company': { title: 'Company', subtitle: 'Manage your organization profile.' },
};

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const location = useLocation();

  const meta = pageMeta[location.pathname] ?? { title: 'OPDOME', subtitle: '' };

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar
          title={meta.title}
          subtitle={meta.subtitle}
          onMobileMenuClick={() => setMobileOpen(true)}
          onCommandPaletteOpen={() => setPaletteOpen(true)}
        />

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <GlobalAiAssistant />

      {/* Demo mode indicator */}
      <div className="pointer-events-none fixed bottom-5 left-5 z-40">
        <span className="flex items-center gap-1.5 rounded-md border border-border bg-card/80 px-2 py-1 text-[10px] font-medium text-muted-foreground backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-warning animate-pulse-dot" />
          DEMO MODE · Northstar Commerce
        </span>
      </div>
    </div>
  );
}
