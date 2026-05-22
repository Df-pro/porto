import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-accent-green/10 bg-bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Tagline */}
          <div>
            <Link href="/" className="flex items-center gap-1 mb-3">
              <span className="text-accent-green font-display text-lg font-bold tracking-wider">
                {'>'} DWI_
              </span>
            </Link>
            <p className="text-text-secondary text-sm font-mono leading-relaxed">
              Building Intelligent Systems.<br />
              Breaking Weak Ones.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-accent-green font-mono text-sm mb-4 tracking-wide">
              {'>'} NAVIGATION
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'Projects', href: '/projects' },
                { name: 'About', href: '/about' },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-text-secondary hover:text-accent-green text-sm font-mono transition-colors"
                >
                  $ cd /{link.name.toLowerCase()}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-accent-green font-mono text-sm mb-4 tracking-wide">
              {'>'} CONTACT
            </h3>
            <div className="flex flex-col gap-2 text-sm font-mono">
              <a
                href="mailto:Dwiferdianto69@gmail.com"
                className="text-text-secondary hover:text-accent-cyan transition-colors"
              >
                📧 Dwiferdianto69@gmail.com
              </a>
              <a
                href="https://wa.me/6281336988310"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent-green transition-colors"
              >
                📱 +62 813-3698-8310
              </a>
              <a
                href="https://github.com/Df-pro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent-green transition-colors"
              >
                🐙 GitHub
              </a>
              <a
                href="https://linkedin.com/in/dwi-ferdianto"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent-cyan transition-colors"
              >
                💼 LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-accent-green/10 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-xs font-mono">
            © {currentYear} Dwi Ferdianto. All rights reserved.
          </p>
          <p className="text-text-muted text-xs font-mono">
            Built with ☕ and determination | Next.js + Web3
          </p>
        </div>
      </div>
    </footer>
  );
}
