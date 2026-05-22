'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MatrixRain from '@/components/ui/MatrixRain';

export default function LayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Admin pages have their own layout — don't show main Navbar/Footer/MatrixRain
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <MatrixRain />
      <Navbar />
      <main className="relative z-[1]">{children}</main>
      <Footer />
    </>
  );
}
