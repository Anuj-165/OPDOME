import { Search, Bell, Menu } from 'lucide-react';
import { AiStatusPopover } from './AiStatusPopover';

interface TopbarProps {
  title: string;
  subtitle?: string;
  onMobileMenuClick: () => void;
  onCommandPaletteOpen: () => void;
}

export function Topbar({
  title,
  subtitle,
  onMobileMenuClick,
  onCommandPaletteOpen,
}: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md lg:px-6">
      {/* Left: mobile menu + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuClick}
          className="text-muted-foreground hover:text-foreground lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-[15px] font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          {subtitle && (
            <p className="hidden text-xs text-muted-foreground sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right: search, notifications, AI status, avatar */}
      <div className="flex items-center gap-2">
        <button
          onClick={onCommandPaletteOpen}
          className="group flex items-center gap-2 rounded-lg border border-border bg-card/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="hidden md:inline">Search</span>
          <kbd className="hidden rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground md:inline-block">
            ⌘K
          </kbd>
        </button>

        <button className="relative rounded-lg border border-border bg-card/50 p-2 text-muted-foreground transition-colors hover:bg-card hover:text-foreground">
          <Bell className="h-3.5 w-3.5" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
        </button>

        <AiStatusPopover />

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary/10 text-xs font-semibold text-primary ring-1 ring-primary/20">
          AM
        </div>
      </div>
    </header>
  );
}
