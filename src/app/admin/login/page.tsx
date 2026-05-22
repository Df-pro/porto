'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import AdminLoginForm from '@/components/admin/AdminLoginForm';

// Inner component that uses useSearchParams (requires Suspense boundary)
function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/admin/dashboard';
  const [checking, setChecking] = useState(true);

  // Check if already logged in
  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        if (data.isAdmin) {
          router.replace(redirectPath);
        } else {
          setChecking(false);
        }
      })
      .catch(() => setChecking(false));
  }, [router, redirectPath]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="text-accent-green font-mono animate-pulse text-sm">
          {'>'} CHECKING SESSION...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4 relative overflow-hidden">
      {/* Background grid effect */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,136,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Terminal window */}
        <div className="bg-bg-secondary border border-accent-green/20 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,255,136,0.05)]">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-bg-tertiary border-b border-accent-green/10">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="ml-2 font-mono text-xs text-text-secondary tracking-wide">
              root@portfolio:~# auth_admin
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-6">
            {/* ASCII Art */}
            <pre className="text-accent-green text-[8px] sm:text-[10px] font-mono mb-6 leading-tight opacity-60 text-center">
{`
 █████╗ ██████╗ ███╗   ███╗██╗███╗   ██╗
██╔══██╗██╔══██╗████╗ ████║██║████╗  ██║
███████║██║  ██║██╔████╔██║██║██╔██╗ ██║
██╔══██║██║  ██║██║╚██╔╝██║██║██║╚██╗██║
██║  ██║██████╔╝██║ ╚═╝ ██║██║██║ ╚████║
╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝
`}
            </pre>

            <div className="text-center mb-6">
              <h1 className="font-display text-lg font-bold text-text-primary tracking-wider mb-2">
                ADMIN ACCESS
              </h1>
              <p className="font-mono text-xs text-text-muted">
                Sign in with your Ethereum wallet to access the command center.
              </p>
            </div>

            <AdminLoginForm redirectPath={redirectPath} />
          </div>
        </div>

        {/* Security notice */}
        <p className="text-center font-mono text-[10px] text-text-muted mt-4 px-4">
          🔐 This terminal requires cryptographic wallet authentication (SIWE).
          Only the owner wallet can access the admin dashboard.
        </p>
      </motion.div>
    </div>
  );
}

// Wrapper with Suspense boundary — required for useSearchParams in Next.js 14
export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-bg-primary">
          <div className="text-accent-green font-mono animate-pulse text-sm">
            {'>'} INITIALIZING...
          </div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
