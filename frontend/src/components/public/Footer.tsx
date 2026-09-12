import { Link } from 'react-router-dom';
import { Logo } from '@/components/layout/Logo';

export function Footer() {
  const sections = [
    {
      title: 'Product',
      links: [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Investigations', path: '/investigations' },
        { label: 'Analytics', path: '/analytics' },
        { label: 'Actions', path: '/actions' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', path: '/about' },
        { label: 'Pricing', path: '/pricing' },
        { label: 'Contact', path: '/about' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', path: '/about' },
        { label: 'Security', path: '/about' },
        { label: 'FAQ', path: '/pricing' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', path: '/about' },
        { label: 'Terms', path: '/about' },
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <Logo size={28} />
              <span className="text-base font-semibold tracking-tight text-foreground">OPDOME</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              AI Business Operations Autopilot
            </p>
            <p className="mt-2 max-w-xs text-xs text-muted-foreground/70">
              Detect. Investigate. Act. Learn.
            </p>
          </div>

          {/* Link sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            © 2026 OPDOME. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
