'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FolderKanban,
  Mail,
  Link2,
  LogOut,
  Menu,
  X,
  Shield,
} from 'lucide-react';

const menuItems = [
  {
    name: 'Overview',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Projects',
    href: '/admin/dashboard/projects',
    icon: FolderKanban,
  },
  {
    name: 'Messages',
    href: '/admin/dashboard/messages',
    icon: Mail,
  },
  {
    name: 'Blockchain',
    href: '/admin/dashboard/blockchain',
    icon: Link2,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [session, setSession] = useState<{ address: string | null; isAdmin: boolean }>({
    address: null,
    isAdmin: false,
  });

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then(setSession)
      .catch(() => {});
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') return pathname === href;
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <>
      {/* Header */}
      <div className="p-4 border-b border-accent-green/10">
        <Link href="/" className="flex items-center gap-2 mb-3">
          <Shield className="w-5 h-5 text-accent-green" />
          <span className="font-display text-sm font-bold text-accent-green tracking-wider">
            COMMAND CENTER
          </span>
        </Link>
        <div className="font-mono text-[10px] text-text-muted">
          <span className="text-accent-green">root</span>
          <span className="text-text-muted">@portfolio:~#</span>
        </div>
        {session.address && (
          <div className="font-mono text-[10px] text-text-muted mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
            <span className="text-accent-cyan">
              {session.address.slice(0, 6)}...{session.address.slice(-4)}
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md font-mono text-sm transition-all duration-200 group ${
                active
                  ? 'bg-accent-green/10 text-accent-green border-l-2 border-accent-green'
                  : 'text-text-secondary hover:text-accent-green hover:bg-accent-green/5'
              }`}
            >
              <Icon className={`w-4 h-4 ${active ? 'text-accent-green' : 'text-text-muted group-hover:text-accent-green'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-accent-green/10">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-md font-mono text-xs text-text-muted hover:text-text-secondary transition-colors mb-1"
        >
          ← Back to Site
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-md font-mono text-xs text-accent-red/70 hover:text-accent-red hover:bg-accent-red/5 transition-all w-full text-left"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-[110] md:hidden p-2 bg-bg-secondary border border-accent-green/20 rounded-lg"
        aria-label="Toggle admin sidebar"
      >
        {isMobileOpen ? (
          <X className="w-5 h-5 text-accent-green" />
        ) : (
          <Menu className="w-5 h-5 text-accent-green" />
        )}
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col fixed top-0 left-0 h-screen bg-bg-secondary border-r border-accent-green/10 z-[90]">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[100] md:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 left-0 h-screen w-64 bg-bg-secondary border-r border-accent-green/10 z-[105] flex flex-col md:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
