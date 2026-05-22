'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full"
      >
        <div className="bg-bg-secondary/50 border border-accent-red/20 rounded-lg overflow-hidden">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-bg-tertiary border-b border-accent-red/10">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="ml-2 font-mono text-xs text-text-secondary">
              error_handler.sh
            </span>
          </div>

          {/* Terminal Body */}
          <div className="p-6 space-y-3 font-mono text-sm">
            <p className="text-accent-red">
              {'>'} ERROR 404: page_not_found
            </p>
            <p className="text-text-secondary">
              {'>'} SCANNING SYSTEM...
            </p>
            <p className="text-text-secondary">
              {'>'} The requested file does not exist in this directory.
            </p>

            <div className="pt-2 border-t border-accent-red/10 space-y-1">
              <p className="text-text-muted text-xs">
                {'>'} Try the following commands:
              </p>
              <div className="flex flex-col gap-1.5 pl-4">
                <Link
                  href="/"
                  className="text-accent-green hover:text-accent-cyan transition-colors text-xs"
                >
                  $ cd /home
                </Link>
                <Link
                  href="/projects"
                  className="text-accent-green hover:text-accent-cyan transition-colors text-xs"
                >
                  $ cd /projects
                </Link>
                <Link
                  href="/about"
                  className="text-accent-green hover:text-accent-cyan transition-colors text-xs"
                >
                  $ cd /about
                </Link>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/" className="btn-cyber text-xs py-2 px-4">
                [ RETURN TO HOME ]
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
