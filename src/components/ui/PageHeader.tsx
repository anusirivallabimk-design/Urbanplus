import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

type PageHeaderProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
  action?: ReactNode;
};

export default function PageHeader({ title, description, icon: Icon, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-start gap-4">
        {Icon && (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-gold/10 text-gold shadow-gold">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div>
          <p className="up-kicker">UrbanPulse · Mysuru</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-cream sm:text-4xl">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-cream-muted">{description}</p>
        </div>
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  );
}
