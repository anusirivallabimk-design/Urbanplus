import { NavLink } from 'react-router-dom';
import { Menu, Bell } from 'lucide-react';

type TopbarProps = {
  onMenuClick: () => void;
};

const primaryLinks = [
  { to: '/map', label: 'City Map' },
  { to: '/report-issue', label: 'Report Issue' },
  { to: '/admin/issues', label: 'Admin' },
];

export default function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-30 px-3 pt-3 sm:px-5">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-[#0c0a18]/70 px-4 shadow-glow backdrop-blur-xl sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-xl p-2 text-cream-muted transition hover:bg-white/5 hover:text-cream lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <NavLink to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/35 bg-gold/10 shadow-gold">
              <span className="font-display text-sm font-bold text-gold">UP</span>
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[13px] font-semibold tracking-[0.22em] text-cream">
                URBANPULSE
              </span>
              <span className="block text-[10px] uppercase tracking-[0.28em] text-gold-light/75">
                Mysuru Twin
              </span>
            </span>
          </NavLink>
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          {primaryLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
                  isActive
                    ? 'bg-gold/15 text-gold-light'
                    : 'text-cream/70 hover:bg-white/5 hover:text-cream'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/70 transition hover:bg-white/5 hover:text-cream"
          >
            Platform
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-cream-muted sm:inline-flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            Live
          </span>
          <button
            type="button"
            className="relative rounded-xl p-2 text-cream-muted transition hover:bg-white/5 hover:text-cream"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-gold" />
          </button>
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-xs font-semibold text-gold-light">
            M3
          </div>
        </div>
      </div>
    </header>
  );
}
