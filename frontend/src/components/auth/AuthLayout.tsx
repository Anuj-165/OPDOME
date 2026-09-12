import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/layout/Logo';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  leftMessage: string;
}

export function AuthLayout({ children, title, subtitle, leftMessage }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side */}
      <div className="hidden flex-col justify-between border-r border-border bg-card/30 p-8 lg:flex lg:w-1/2">
        <Link to="/" className="flex items-center gap-2">
          <Logo size={28} />
          <span className="text-base font-semibold tracking-tight text-foreground">OPDOME</span>
        </Link>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            {leftMessage}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            AI Business Operations Autopilot
          </p>
        </div>
        <p className="text-xs text-muted-foreground/60">© 2026 OPDOME. All rights reserved.</p>
      </div>

      {/* Right side */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-6 lg:hidden">
            <Link to="/" className="flex items-center gap-2">
              <Logo size={28} />
              <span className="text-base font-semibold tracking-tight text-foreground">OPDOME</span>
            </Link>
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
