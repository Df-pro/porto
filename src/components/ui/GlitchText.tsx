'use client';

import { useEffect, useRef } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
  enableGlitch?: boolean;
}

export default function GlitchText({
  text,
  className = '',
  as: Tag = 'span',
  enableGlitch = true,
}: GlitchTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!enableGlitch || !ref.current) return;

    // The CSS glitch effect from globals.css uses .glitch-text class
    // which already has ::before and ::after pseudo-elements
    // We just need to make sure the element has the class and data-text attribute
    const el = ref.current;

    // Add a temporary intensified glitch via an extra class
    el.classList.add('glitch-active');

    const timeout = setTimeout(() => {
      el.classList.remove('glitch-active');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [enableGlitch]);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement & HTMLSpanElement & HTMLParagraphElement>}
      className={`glitch-text ${className}`}
      data-text={text}
    >
      {text}
    </Tag>
  );
}
