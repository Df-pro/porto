'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { projects } from '@/data/projects';
import TerminalCard from '@/components/ui/TerminalCard';
import NeonBadge from '@/components/ui/NeonBadge';

const categoryColorMap: Record<string, 'green' | 'cyan' | 'purple' | 'orange' | 'red'> = {
  Cybersecurity: 'green',
  Hardware: 'orange',
  Infrastructure: 'cyan',
  'AI/ML': 'purple',
  Research: 'purple',
};

export default function FeaturedProjects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="relative py-24 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="section-header block">{'>'} ls -la ./featured_projects</span>
          <h2 className="section-title">Featured Projects</h2>
        </motion.div>

        {/* Featured Project Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Link href={`/projects/${project.slug}`}>
                <TerminalCard
                  title={`${project.slug}.exe`}
                  glowColor={project.category[0] === 'Cybersecurity' ? 'green' : 'cyan'}
                  className="h-full cursor-pointer"
                >
                  <div className="space-y-4">
                    {/* Icon + Title */}
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{project.icon}</span>
                      <div>
                        <h3 className="font-display text-lg font-bold text-text-primary tracking-wide">
                          {project.name}
                        </h3>
                        <p className="font-mono text-xs text-text-muted mt-1">
                          {project.statusLabel}
                        </p>
                      </div>
                    </div>

                    {/* Category Badges */}
                    <div className="flex flex-wrap gap-2">
                      {project.category.map((cat) => (
                        <NeonBadge
                          key={cat}
                          text={cat}
                          color={categoryColorMap[cat] || 'green'}
                          size="sm"
                        />
                      ))}
                      {project.onChain && (
                        <NeonBadge text="⛓ On-Chain" color="cyan" size="sm" />
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-text-secondary text-sm font-mono leading-relaxed">
                      {project.shortDescription}
                    </p>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[10px] font-mono text-text-muted bg-bg-tertiary rounded border border-text-muted/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* View Details */}
                    <div className="pt-2 border-t border-accent-green/10">
                      <span className="font-mono text-xs text-accent-green hover:text-accent-cyan transition-colors">
                        {'>'} VIEW DETAILS →
                      </span>
                    </div>
                  </div>
                </TerminalCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Link href="/projects" className="btn-cyber inline-flex">
            [ VIEW ALL PROJECTS ]
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
