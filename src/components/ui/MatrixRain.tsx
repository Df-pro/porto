'use client';

import { useEffect, useMemo, useState } from 'react';

// Matrix rain characters generated client-side only to avoid hydration mismatch
function generateMatrixColumn(index: number) {
  const chars = Array.from({ length: 30 })
    .map(() => String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96)))
    .join('');
  return {
    chars,
    left: `${index * 5 + Math.random() * 3}%`,
    duration: `${15 + Math.random() * 15}s`,
    delay: `${Math.random() * 10}s`,
    fontSize: `${10 + Math.random() * 6}px`,
  };
}

export default function MatrixRain() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate columns only on client to avoid hydration mismatch
  const columns = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: 20 }, (_, i) => generateMatrixColumn(i));
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="matrix-rain" aria-hidden="true">
      {columns.map((col, i) => (
        <span
          key={i}
          style={{
            left: col.left,
            animationDuration: col.duration,
            animationDelay: col.delay,
            fontSize: col.fontSize,
          }}
        >
          {col.chars}
        </span>
      ))}
    </div>
  );
}
