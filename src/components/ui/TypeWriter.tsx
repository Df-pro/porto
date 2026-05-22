'use client';

import { useState, useEffect, useCallback } from 'react';

interface TypeWriterProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  className?: string;
  cursorColor?: string;
  loop?: boolean;
}

export default function TypeWriter({
  texts,
  speed = 80,
  deleteSpeed = 40,
  pauseDuration = 2000,
  className = '',
  cursorColor = '#00ff88',
  loop = true,
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const tick = useCallback(() => {
    const currentText = texts[currentIndex];

    if (isPaused) return;

    if (!isDeleting) {
      // Typing
      if (displayText.length < currentText.length) {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      } else {
        // Finished typing, pause then delete
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting
      if (displayText.length > 0) {
        setDisplayText(currentText.slice(0, displayText.length - 1));
      } else {
        setIsDeleting(false);
        const nextIndex = (currentIndex + 1) % texts.length;
        if (!loop && nextIndex === 0) return;
        setCurrentIndex(nextIndex);
      }
    }
  }, [displayText, currentIndex, isDeleting, isPaused, texts, pauseDuration, loop]);

  useEffect(() => {
    const timer = setTimeout(tick, isDeleting ? deleteSpeed : speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, deleteSpeed, speed]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{displayText}</span>
      <span
        className="ml-1 inline-block w-[3px] h-[1.1em] animate-typing-cursor"
        style={{ backgroundColor: cursorColor }}
      />
    </span>
  );
}
