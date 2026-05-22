'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const scrollToSection = (id: string) => {
    if (pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? 'bg-bg-primary/80 backdrop-blur-xl border-b border-accent-green/20 shadow-[0_2px_20px_rgba(0,255,136,0.05)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 group">
              <span className="text-accent-green font-display text-lg font-bold tracking-wider">
                {'>'} DWI_
              </span>
              <span className="w-[2px] h-5 bg-accent-green animate-typing-cursor" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 font-mono text-sm tracking-wide transition-all duration-200 rounded-md ${
                    pathname === link.href
                      ? 'text-accent-green bg-accent-green/10'
                      : 'text-text-secondary hover:text-accent-green hover:bg-accent-green/5'
                  }`}
                >
                  [{link.name}]
                </Link>
              ))}

              {/* Scroll links for homepage sections */}
              <button
                onClick={() => scrollToSection('skills')}
                className="px-4 py-2 font-mono text-sm tracking-wide text-text-secondary hover:text-accent-green hover:bg-accent-green/5 transition-all duration-200 rounded-md"
              >
                [Skills]
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-4 py-2 font-mono text-sm tracking-wide text-text-secondary hover:text-accent-green hover:bg-accent-green/5 transition-all duration-200 rounded-md"
              >
                [Contact]
              </button>
            </div>

            {/* Right section */}
            <div className="hidden md:flex items-center gap-3">
              {/* GitHub */}
              <a
                href="https://github.com/Df-pro"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 font-mono text-sm text-text-secondary hover:text-accent-green transition-colors"
                aria-label="GitHub Profile"
              >
                🐙
              </a>

              {/* Connect Wallet Button (placeholder — will be replaced by WalletButton) */}
              <button
                id="connect-wallet-nav"
                className="btn-cyber text-xs py-2 px-4"
                onClick={() => {
                  // RainbowKit akan handle ini
                  const event = new CustomEvent('openWalletModal');
                  window.dispatchEvent(event);
                }}
              >
                ⟐ Connect Wallet
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="w-6 h-[2px] bg-accent-green block transition-colors"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-[2px] bg-accent-green block"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="w-6 h-[2px] bg-accent-green block transition-colors"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-72 bg-bg-secondary/95 backdrop-blur-xl z-[99] border-l border-accent-green/20 pt-20 px-6"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-3 font-mono text-sm tracking-wide transition-all duration-200 rounded-md ${
                    pathname === link.href
                      ? 'text-accent-green bg-accent-green/10'
                      : 'text-text-secondary hover:text-accent-green'
                  }`}
                >
                  {'>'} {link.name}
                </Link>
              ))}
              <button
                onClick={() => scrollToSection('skills')}
                className="px-4 py-3 font-mono text-sm tracking-wide text-text-secondary hover:text-accent-green text-left rounded-md transition-all"
              >
                {'>'} Skills
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-4 py-3 font-mono text-sm tracking-wide text-text-secondary hover:text-accent-green text-left rounded-md transition-all"
              >
                {'>'} Contact
              </button>

              <div className="border-t border-accent-green/10 mt-4 pt-4">
                <button className="btn-cyber text-xs py-2 px-4 w-full">
                  ⟐ Connect Wallet
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[98] md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
