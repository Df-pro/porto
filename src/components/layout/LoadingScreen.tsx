'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootSequence = [
  { text: '> INITIALIZING SYSTEM...', delay: 0 },
  { text: '> LOADING KERNEL MODULES...', delay: 400 },
  { text: '> CHECKING SECURITY PROTOCOLS...', delay: 800 },
  { text: '> ESTABLISHING NEURAL LINK...', delay: 1200 },
  { text: '> MOUNTING FILESYSTEM...', delay: 1500 },
  { text: '> LOADING PORTFOLIO...', delay: 1800 },
  { text: '> SYSTEM READY ✓', delay: 2200 },
];

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Show boot lines one by one
    bootSequence.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines(index + 1);
        setProgress(((index + 1) / bootSequence.length) * 100);
      }, line.delay);
    });

    // Dismiss loading screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-bg-primary"
        >
          <div className="max-w-lg w-full px-6">
            {/* ASCII Art Header */}
            <pre className="text-accent-green text-[10px] sm:text-xs font-mono mb-8 leading-tight opacity-60">
{`
 ██████╗ ██╗    ██╗██╗
 ██╔══██╗██║    ██║██║
 ██║  ██║██║ █╗ ██║██║
 ██║  ██║██║███╗██║██║
 ██████╔╝╚███╔███╔╝██║
 ╚═════╝  ╚══╝╚══╝ ╚═╝
`}
            </pre>

            {/* Boot Lines */}
            <div className="space-y-1 mb-6 font-mono text-sm">
              {bootSequence.slice(0, visibleLines).map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`${
                    index === bootSequence.length - 1
                      ? 'text-accent-green'
                      : 'text-text-secondary'
                  }`}
                >
                  {line.text}
                </motion.div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-bg-tertiary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent-green rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                  boxShadow: '0 0 10px rgba(0, 255, 136, 0.5)',
                }}
              />
            </div>

            {/* Progress Text */}
            <div className="flex justify-between mt-2 font-mono text-xs text-text-muted">
              <span>BOOT SEQUENCE</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
