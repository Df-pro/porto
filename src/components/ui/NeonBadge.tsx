interface NeonBadgeProps {
  text: string;
  color?: 'green' | 'cyan' | 'purple' | 'orange' | 'red' | 'white';
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
  className?: string;
}

const colorMap = {
  green: {
    bg: 'bg-accent-green/10',
    text: 'text-accent-green',
    border: 'border-accent-green/30',
    shadow: 'shadow-[0_0_8px_rgba(0,255,136,0.2)]',
  },
  cyan: {
    bg: 'bg-accent-cyan/10',
    text: 'text-accent-cyan',
    border: 'border-accent-cyan/30',
    shadow: 'shadow-[0_0_8px_rgba(0,212,255,0.2)]',
  },
  purple: {
    bg: 'bg-accent-purple/10',
    text: 'text-accent-purple',
    border: 'border-accent-purple/30',
    shadow: 'shadow-[0_0_8px_rgba(189,147,249,0.2)]',
  },
  orange: {
    bg: 'bg-accent-orange/10',
    text: 'text-accent-orange',
    border: 'border-accent-orange/30',
    shadow: 'shadow-[0_0_8px_rgba(255,140,0,0.2)]',
  },
  red: {
    bg: 'bg-accent-red/10',
    text: 'text-accent-red',
    border: 'border-accent-red/30',
    shadow: 'shadow-[0_0_8px_rgba(255,71,87,0.2)]',
  },
  white: {
    bg: 'bg-text-primary/10',
    text: 'text-text-primary',
    border: 'border-text-primary/30',
    shadow: 'shadow-[0_0_8px_rgba(230,237,243,0.1)]',
  },
};

const sizeMap = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-3 py-1 text-xs',
  lg: 'px-4 py-1.5 text-sm',
};

export default function NeonBadge({
  text,
  color = 'green',
  size = 'md',
  pulse = false,
  className = '',
}: NeonBadgeProps) {
  const styles = colorMap[color];

  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-full border font-mono tracking-wide
        ${styles.bg} ${styles.text} ${styles.border} ${styles.shadow}
        ${sizeMap[size]}
        ${pulse ? 'animate-glow-pulse' : ''}
        ${className}
      `}
    >
      {text}
    </span>
  );
}
