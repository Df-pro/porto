'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { bioText, stats } from '@/data/projects';
import NeonBadge from '@/components/ui/NeonBadge';

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const isNumeric = /^\d+/.test(value);

  useEffect(() => {
    if (!isInView || !isNumeric) return;
    const target = parseInt(value);
    const duration = 1500;
    const steps = 30;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value, isNumeric]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-3xl sm:text-4xl font-black text-accent-green mb-1">
        {isNumeric ? `${count}+` : value}
      </div>
      <div className="font-mono text-xs text-text-secondary tracking-wide">{label}</div>
    </div>
  );
}

export default function AboutSnippet() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about-snippet" className="relative py-24 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="section-header block">{'>'} cat ./about.md</span>
          <h2 className="section-title">About Me</h2>
        </motion.div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Hexagon glow background */}
              <div className="absolute inset-0 scale-110 blur-xl opacity-30"
                style={{
                  background: 'linear-gradient(135deg, #00ff88, #00d4ff, #bd93f9)',
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }}
              />
              {/* Hexagon frame */}
              <div
                className="relative w-64 h-64 sm:w-72 sm:h-72 overflow-hidden"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/profile.jpg"
                  alt="Dwi Ferdianto"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Animated border */}
              <div
                className="absolute inset-[-3px] animate-pulse"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  background: 'linear-gradient(135deg, rgba(0,255,136,0.3), rgba(0,212,255,0.3), rgba(189,147,249,0.3))',
                  zIndex: -1,
                }}
              />
            </div>
          </motion.div>

          {/* Right: Bio Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="space-y-4 text-text-secondary text-sm leading-relaxed font-mono">
              {bioText.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* University Badge */}
            <div className="mt-6">
              <NeonBadge
                text="🎓 ESQ Business School — Ilmu Komputer"
                color="cyan"
                size="lg"
              />
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 rounded-lg bg-bg-secondary/50 border border-accent-green/10"
        >
          {stats.map((stat) => (
            <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
