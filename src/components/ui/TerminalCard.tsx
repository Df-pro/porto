import { ReactNode } from 'react';

interface TerminalCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  glowColor?: 'green' | 'cyan' | 'purple' | 'orange';
}

const glowStyles = {
  green: 'hover:border-accent-green/40 hover:shadow-[0_0_15px_rgba(0,255,136,0.15),0_8px_32px_rgba(0,0,0,0.4)]',
  cyan: 'hover:border-accent-cyan/40 hover:shadow-[0_0_15px_rgba(0,212,255,0.15),0_8px_32px_rgba(0,0,0,0.4)]',
  purple: 'hover:border-accent-purple/40 hover:shadow-[0_0_15px_rgba(189,147,249,0.15),0_8px_32px_rgba(0,0,0,0.4)]',
  orange: 'hover:border-accent-orange/40 hover:shadow-[0_0_15px_rgba(255,140,0,0.15),0_8px_32px_rgba(0,0,0,0.4)]',
};

export default function TerminalCard({
  title = 'terminal',
  children,
  className = '',
  glowColor = 'green',
}: TerminalCardProps) {
  return (
    <div
      className={`
        bg-bg-secondary border border-accent-green/15 rounded-lg overflow-hidden
        transition-all duration-300 ease-out hover:-translate-y-1
        ${glowStyles[glowColor]}
        ${className}
      `}
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-bg-tertiary border-b border-accent-green/10">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-2 font-mono text-xs text-text-secondary tracking-wide">
          {title}
        </span>
      </div>

      {/* Terminal Body */}
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}
