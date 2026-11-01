import { useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import AmbientBackdrop from './AmbientBackdrop';

export default function Layout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className="relative isolate min-h-screen bg-ink-bg text-cream">
      <AmbientBackdrop />
      <div className="relative z-10">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className={isHome ? 'pt-0' : 'px-4 pb-16 pt-28 sm:px-6 lg:px-10'}>{children}</main>
      </div>
    </div>
  );
}
