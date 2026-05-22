'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Only show on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorRef.current || !dotRef.current) return;

      requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
        }
        if (dotRef.current) {
          dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
        }
      });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    setIsVisible(true);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Prevent hydration mismatch — render nothing until mounted on client
  if (!mounted) return null;

  return (
    <>
      {/* Crosshair ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.15s ease',
        }}
      >
        <div className="w-8 h-8 rounded-full border border-accent-green/60" />
        {/* Crosshair lines */}
        <div className="absolute top-1/2 left-0 w-2 h-[1px] bg-accent-green/40 -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-2 h-[1px] bg-accent-green/40 -translate-y-1/2" />
        <div className="absolute top-0 left-1/2 w-[1px] h-2 bg-accent-green/40 -translate-x-1/2" />
        <div className="absolute bottom-0 left-1/2 w-[1px] h-2 bg-accent-green/40 -translate-x-1/2" />
      </div>

      {/* Center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.15s ease',
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-accent-green shadow-[0_0_6px_rgba(0,255,136,0.8)]" />
      </div>
    </>
  );
}
