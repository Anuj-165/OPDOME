import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className, size = 28 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={cn('shrink-0', className)}
    >
      <rect width="32" height="32" rx="7" fill="hsl(var(--primary))" fillOpacity={0.12} />
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="6.5"
        stroke="hsl(var(--primary))"
        strokeOpacity={0.3}
      />
      {/* Geometric dome mark */}
      <path
        d="M16 6 L24 14 L24 24 L8 24 L8 14 Z"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M16 6 L16 24 M8 14 L24 14"
        stroke="hsl(var(--primary))"
        strokeWidth="1"
        strokeOpacity={0.5}
      />
      <circle cx="16" cy="18" r="2.5" fill="hsl(var(--primary))" />
    </svg>
  );
}
