import { NavLink } from 'react-router-dom';
import { Activity, X } from 'lucide-react';
import { navConfig, navSections } from '@/config/navigation';

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[300px] flex-col border-r border-white/10 bg-[#0a0916]/92 text-cream shadow-glow backdrop-blur-2xl transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
              <span className="font-display text-sm font-bold text-gold">UP</span>
            </div>
            <div className="leading-tight">
              <p className="font-display text-xs font-semibold tracking-[0.2em] text-cream">URBANPULSE</p>
              <p className="text-[10px] uppercase tracking-[0.22em] text-gold-light/70">Command</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-cream-muted transition hover:bg-white/5 hover:text-cream"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-4">
          {navSections.map((section) => (
            <div key={section}>
              <p className="up-nav-section">{section}</p>
              <ul className="space-y-0.5">
                {navConfig
                  .filter((item) => item.section === section)
                  .map(({ to, label, icon: Icon, assigned }) => (
                    <li key={to}>
                      <NavLink
                        to={to}
                        end={to === '/'}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `up-nav-link ${
                            isActive
                              ? 'border border-gold/25 bg-gold/10 text-gold-light'
                              : 'border border-transparent text-cream/70 hover:bg-white/5 hover:text-cream'
                          }`
                        }
                      >
                        <Icon className="h-[18px] w-[18px] shrink-0" />
                        <span className="truncate">{label}</span>
                        {assigned && (
                          <span className="ml-auto rounded-full bg-gold/15 px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] text-gold-light">
                            Live
                          </span>
                        )}
                      </NavLink>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="shrink-0 border-t border-white/10 px-6 py-4">
          <div className="flex items-center gap-2 text-xs text-cream-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5" />
              Twin operational
            </span>
          </div>
          <p className="mt-2 text-[11px] text-cream-muted/60">Mysuru · Heritage city OS</p>
        </div>
      </aside>
    </>
  );
}
