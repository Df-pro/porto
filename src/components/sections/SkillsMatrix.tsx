'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillCategories } from '@/data/projects';

const colorClassMap: Record<string, { bar: string; text: string; bg: string }> = {
  green: { bar: 'bg-accent-green', text: 'text-accent-green', bg: 'bg-accent-green/10' },
  cyan: { bar: 'bg-accent-cyan', text: 'text-accent-cyan', bg: 'bg-accent-cyan/10' },
  purple: { bar: 'bg-accent-purple', text: 'text-accent-purple', bg: 'bg-accent-purple/10' },
  orange: { bar: 'bg-accent-orange', text: 'text-accent-orange', bg: 'bg-accent-orange/10' },
  white: { bar: 'bg-text-primary', text: 'text-text-primary', bg: 'bg-text-primary/10' },
};

export default function SkillsMatrix() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="relative py-24 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="section-header block">{'>'} cat ./skills.config</span>
          <h2 className="section-title">Skills Matrix</h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {skillCategories.map((category, catIndex) => {
            const colors = colorClassMap[category.color] || colorClassMap.green;

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                className="bg-bg-secondary/50 border border-accent-green/10 rounded-lg p-6 hover:border-opacity-30 transition-all duration-300"
                style={{ borderColor: `${category.colorHex}20` }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-3 h-3 rounded-full ${colors.bar}`}
                    style={{ boxShadow: `0 0 8px ${category.colorHex}60` }}
                  />
                  <h3 className={`font-display text-sm font-bold tracking-wider ${colors.text}`}>
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: catIndex * 0.1 + skillIndex * 0.05 + 0.3,
                      }}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono text-xs text-text-secondary">
                          {'>'} {skill.name}
                        </span>
                        <span className={`font-mono text-xs ${colors.text}`}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${colors.bar}`}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{
                            duration: 1,
                            delay: catIndex * 0.1 + skillIndex * 0.05 + 0.5,
                            ease: 'easeOut',
                          }}
                          style={{
                            boxShadow: `0 0 6px ${category.colorHex}40`,
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
