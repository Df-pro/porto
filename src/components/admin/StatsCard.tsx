import { ReactNode } from 'react';

interface StatsCardProps {
  icon: ReactNode;
  value: string | number;
  label: string;
  color?: 'green' | 'cyan' | 'purple' | 'orange' | 'red';
}

const colorMap = {
  green: {
    bg: 'bg-accent-green/5',
    border: 'border-accent-green/20',
    text: 'text-accent-green',
    glow: 'shadow-[0_0_15px_rgba(0,255,136,0.08)]',
  },
  cyan: {
    bg: 'bg-accent-cyan/5',
    border: 'border-accent-cyan/20',
    text: 'text-accent-cyan',
    glow: 'shadow-[0_0_15px_rgba(0,212,255,0.08)]',
  },
  purple: {
    bg: 'bg-accent-purple/5',
    border: 'border-accent-purple/20',
    text: 'text-accent-purple',
    glow: 'shadow-[0_0_15px_rgba(189,147,249,0.08)]',
  },
  orange: {
    bg: 'bg-accent-orange/5',
    border: 'border-accent-orange/20',
    text: 'text-accent-orange',
    glow: 'shadow-[0_0_15px_rgba(255,140,0,0.08)]',
  },
  red: {
    bg: 'bg-accent-red/5',
    border: 'border-accent-red/20',
    text: 'text-accent-red',
    glow: 'shadow-[0_0_15px_rgba(255,71,87,0.08)]',
  },
};

export default function StatsCard({
  icon,
  value,
  label,
  color = 'green',
}: StatsCardProps) {
  const styles = colorMap[color];

  return (
    <div
      className={`
        ${styles.bg} ${styles.border} ${styles.glow}
        border rounded-lg p-4 transition-all duration-300
        hover:scale-[1.02]
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`${styles.text} opacity-60`}>{icon}</div>
      </div>
      <div className={`font-display text-2xl font-black ${styles.text} mb-1`}>
        {value}
      </div>
      <div className="font-mono text-xs text-text-muted tracking-wide">
        {label}
      </div>
    </div>
  );
}
