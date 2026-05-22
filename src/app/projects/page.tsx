'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { projects } from '@/data/projects';
import TerminalCard from '@/components/ui/TerminalCard';
import NeonBadge from '@/components/ui/NeonBadge';
import CustomCursor from '@/components/ui/CustomCursor';

const categories = ['All', 'Cybersecurity', 'Hardware', 'Infrastructure', 'AI/ML', 'Research'];

const categoryColorMap: Record<string, 'green' | 'cyan' | 'purple' | 'orange' | 'red'> = {
  Cybersecurity: 'green',
  Hardware: 'orange',
  Infrastructure: 'cyan',
  'AI/ML': 'purple',
  Research: 'purple',
};

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      activeFilter === 'All' || project.category.includes(activeFilter);
    const matchesSearch =
      searchQuery === '' ||
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen pt-24 pb-16 px-4" ref={ref}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <span className="section-header block">{'>'} ls -la ./projects</span>
            <h1 className="section-title">All Projects</h1>
          </motion.div>

          {/* Search & Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 space-y-4"
          >
            {/* Search */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-accent-green text-sm">
                $
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="grep project_name..."
                className="input-cyber pl-8"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 font-mono text-xs tracking-wide rounded-md border transition-all duration-200 ${
                    activeFilter === cat
                      ? 'bg-accent-green/10 border-accent-green/40 text-accent-green'
                      : 'bg-transparent border-text-muted/20 text-text-secondary hover:border-accent-green/20 hover:text-text-primary'
                  }`}
                >
                  [{cat}]
                </button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/projects/${project.slug}`}>
                  <TerminalCard
                    title={`${project.slug}.exe`}
                    glowColor={project.category[0] === 'Cybersecurity' ? 'green' : 'cyan'}
                    className="h-full cursor-pointer"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{project.icon}</span>
                        <div>
                          <h3 className="font-display text-sm font-bold text-text-primary tracking-wide">
                            {project.name}
                          </h3>
                          <p className="font-mono text-[10px] text-text-muted mt-0.5">
                            {project.statusLabel}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
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

                      <p className="text-text-secondary text-xs font-mono leading-relaxed">
                        {project.shortDescription}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-1.5 py-0.5 text-[9px] font-mono text-text-muted bg-bg-tertiary rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="px-1.5 py-0.5 text-[9px] font-mono text-text-muted">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>

                      <div className="pt-2 border-t border-accent-green/10">
                        <span className="font-mono text-xs text-accent-green">
                          [ VIEW DETAILS ] →
                        </span>
                      </div>
                    </div>
                  </TerminalCard>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="font-mono text-text-secondary text-sm">
                {'>'} grep: no matches found for &ldquo;{searchQuery}&rdquo;
              </p>
              <p className="font-mono text-text-muted text-xs mt-2">
                Try a different search term or filter
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
