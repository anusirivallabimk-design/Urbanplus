import { Construction } from 'lucide-react';
import PageHeader from './PageHeader';

type PlaceholderProps = {
  title: string;
  description: string;
  owner?: string;
};

export default function PlaceholderPage({ title, description, owner }: PlaceholderProps) {
  return (
    <div className="mx-auto max-w-7xl space-y-8 animate-fade-in">
      <PageHeader title={title} description={description} icon={Construction} />
      <div className="up-card flex flex-col items-center justify-center gap-5 py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/25 bg-gold/10 text-gold">
          <Construction className="h-7 w-7" />
        </div>
        <div>
          <p className="font-display text-2xl text-cream">Module in development</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-cream-muted">
            This desk is reserved in the shared UrbanPulse platform and will come online as the
            remaining city systems are integrated.
          </p>
          {owner && (
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-light/75">
              Owner · {owner}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
