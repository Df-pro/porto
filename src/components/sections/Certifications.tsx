'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { certifications } from '@/data/projects';
import NeonBadge from '@/components/ui/NeonBadge';

export default function Certifications() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="certifications" className="relative py-24 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="section-header block">{'>'} ls ./certifications/</span>
          <h2 className="section-title">Certifications & Training</h2>
        </motion.div>

        {/* Certification Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-bg-secondary/50 border border-accent-green/10 rounded-lg p-5 hover:border-accent-green/30 hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="text-3xl mb-3">{cert.icon}</div>

              {/* Name */}
              <h3 className="font-display text-sm font-bold text-text-primary tracking-wide mb-1 group-hover:text-accent-green transition-colors">
                {cert.name}
              </h3>

              {/* Organization */}
              <p className="font-mono text-xs text-text-muted mb-3">
                {cert.organization}
              </p>

              {/* Description */}
              {cert.description && (
                <p className="font-mono text-xs text-text-secondary leading-relaxed mb-3">
                  {cert.description}
                </p>
              )}

              {/* Status Badge */}
              <NeonBadge
                text={cert.status}
                color={cert.status === 'ACTIVE' ? 'green' : 'cyan'}
                size="sm"
                pulse={cert.status === 'ACTIVE'}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
