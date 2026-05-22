'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import NeonBadge from '@/components/ui/NeonBadge';
import TerminalCard from '@/components/ui/TerminalCard';
import CustomCursor from '@/components/ui/CustomCursor';

const categoryColorMap: Record<string, 'green' | 'cyan' | 'purple' | 'orange' | 'red'> = {
  Cybersecurity: 'green',
  Hardware: 'orange',
  Infrastructure: 'cyan',
  'AI/ML': 'purple',
  Research: 'purple',
};

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-accent-red text-lg mb-4">
            {'>'} ERROR: project_not_found
          </p>
          <Link href="/projects" className="btn-cyber">
            [ BACK TO PROJECTS ]
          </Link>
        </div>
      </div>
    );
  }

  const relatedProjects = projects.filter(
    (p) =>
      p.slug !== project.slug &&
      p.category.some((cat) => project.category.includes(cat))
  );

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <nav className="font-mono text-xs text-text-muted flex items-center gap-2">
              <Link href="/" className="hover:text-accent-green transition-colors">
                ~
              </Link>
              <span>/</span>
              <Link href="/projects" className="hover:text-accent-green transition-colors">
                projects
              </Link>
              <span>/</span>
              <span className="text-accent-green">{project.slug}</span>
            </nav>
          </motion.div>

          {/* Project Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex items-start gap-4 mb-4">
              <span className="text-4xl">{project.icon}</span>
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-black text-text-primary tracking-wide">
                  {project.name}
                </h1>
                <p className="font-mono text-sm text-text-muted mt-1">
                  {project.statusLabel}
                </p>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.category.map((cat) => (
                <NeonBadge
                  key={cat}
                  text={cat}
                  color={categoryColorMap[cat] || 'green'}
                  size="md"
                />
              ))}
              <NeonBadge
                text={project.status}
                color={project.status === 'Active' ? 'green' : 'cyan'}
                size="md"
                pulse={project.status === 'Active'}
              />
              {project.onChain && (
                <NeonBadge text="⛓ On-Chain Verified" color="cyan" size="md" />
              )}
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10"
          >
            <TerminalCard title={`cat ${project.slug}/README.md`}>
              <p className="text-text-secondary font-mono text-sm leading-relaxed">
                {project.description}
              </p>
            </TerminalCard>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10"
          >
            <h2 className="section-header mb-4">{'>'} tech_stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 font-mono text-xs text-accent-cyan bg-accent-cyan/5 border border-accent-cyan/20 rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Responsibilities / Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-10"
          >
            <h2 className="section-header mb-4">{'>'} responsibilities</h2>
            <TerminalCard title="cat activities.log">
              <ul className="space-y-2">
                {project.responsibilities.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 font-mono text-sm text-text-secondary"
                  >
                    <span className="text-accent-green mt-0.5 shrink-0">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </TerminalCard>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <a
              href={project.githubUrl || 'https://github.com/Df-pro'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cyber"
            >
              [ VIEW GITHUB ]
            </a>
            {project.onChain && (
              <button className="btn-cyber btn-cyber-cyan">[ VERIFY ON-CHAIN ]</button>
            )}
          </motion.div>

          {/* On-Chain Verification Info */}
          {project.onChain && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-16"
            >
              <div className="bg-accent-cyan/5 border border-accent-cyan/20 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-accent-cyan">⛓</span>
                  <span className="font-display text-sm font-bold text-accent-cyan tracking-wider">
                    ON-CHAIN VERIFICATION
                  </span>
                </div>
                <p className="font-mono text-xs text-text-secondary mb-2">
                  This project is verified on the Polygon Mumbai Testnet via PortfolioVerifier smart contract.
                </p>
                <p className="font-mono text-xs text-text-muted">
                  Connect your wallet and click &ldquo;VERIFY ON-CHAIN&rdquo; to check the on-chain status.
                </p>
              </div>
            </motion.div>
          )}

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h2 className="section-header mb-4">{'>'} related_projects</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedProjects.map((rp) => (
                  <Link key={rp.slug} href={`/projects/${rp.slug}`}>
                    <div className="bg-bg-secondary/50 border border-accent-green/10 rounded-lg p-4 hover:border-accent-green/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                      <div className="flex items-center gap-2 mb-2">
                        <span>{rp.icon}</span>
                        <h3 className="font-display text-sm font-bold text-text-primary">
                          {rp.name}
                        </h3>
                      </div>
                      <p className="font-mono text-xs text-text-secondary">
                        {rp.shortDescription}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
