'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { bioText } from '@/data/projects';
import TerminalCard from '@/components/ui/TerminalCard';
import NeonBadge from '@/components/ui/NeonBadge';
import CustomCursor from '@/components/ui/CustomCursor';

const timeline = [
  {
    period: '2024 — Sekarang',
    title: 'S1 Ilmu Komputer',
    institution: 'Universitas Ary Ginanjar (ESQ Business School)',
    description: 'Fokus pada AI, Machine Learning, dan Cybersecurity.',
    status: 'Active',
  },
  {
    period: 'Sebelumnya',
    title: 'Teknik Instalasi Tenaga Listrik',
    institution: 'SMK PGRI 1 Kediri',
    description: 'Latar belakang teknis di bidang kelistrikan dan hardware.',
    status: 'Completed',
  },
];

const interests = [
  'Artificial Intelligence',
  'Machine Learning Engineering',
  'Cybersecurity Research',
  'Embedded Systems & IoT',
  'Network Security',
  'AI Automation Infrastructure',
];

const valueProps = [
  {
    icon: '🔧',
    title: 'Hardware + Software',
    desc: 'Kombinasi kemampuan hardware (ESP32, electrical) dan software (Python, ML)',
  },
  {
    icon: '🔒',
    title: 'Security-First Mindset',
    desc: 'Riset cybersecurity aktif dengan hands-on penetration testing',
  },
  {
    icon: '🤖',
    title: 'AI + Embedded Systems',
    desc: 'Menggabungkan kecerdasan buatan dengan perangkat fisik',
  },
  {
    icon: '📚',
    title: 'Riset Mandiri',
    desc: 'Proaktif belajar dan membangun proyek secara independen',
  },
];

export default function AboutPage() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen pt-24 pb-16 px-4" ref={ref}>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <span className="section-header block">{'>'} cat ./about/bio.md</span>
            <h1 className="section-title">About Dwi Ferdianto</h1>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <TerminalCard title="bio.md">
              <div className="space-y-4 text-text-secondary font-mono text-sm leading-relaxed">
                {bioText.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </TerminalCard>
          </motion.div>

          {/* Education Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="section-header mb-6">{'>'} education_timeline</h2>
            <div className="relative pl-6 border-l-2 border-accent-green/20 space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="relative"
                >
                  {/* Dot */}
                  <div className="absolute -left-[calc(1.5rem+5px)] top-1 w-2.5 h-2.5 rounded-full bg-accent-green border-2 border-bg-primary shadow-[0_0_8px_rgba(0,255,136,0.5)]" />

                  <div className="bg-bg-secondary/50 border border-accent-green/10 rounded-lg p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-accent-green">
                        {item.period}
                      </span>
                      <NeonBadge
                        text={item.status}
                        color={item.status === 'Active' ? 'green' : 'cyan'}
                        size="sm"
                        pulse={item.status === 'Active'}
                      />
                    </div>
                    <h3 className="font-display text-base font-bold text-text-primary tracking-wide">
                      {item.title}
                    </h3>
                    <p className="font-mono text-xs text-text-muted mt-1">
                      {item.institution}
                    </p>
                    <p className="font-mono text-sm text-text-secondary mt-2">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Professional Interests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="section-header mb-6">{'>'} interests --professional</h2>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <NeonBadge key={interest} text={interest} color="cyan" size="md" />
              ))}
            </div>
          </motion.div>

          {/* Value Propositions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="section-header mb-6">{'>'} cat value_props.json</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {valueProps.map((prop, i) => (
                <motion.div
                  key={prop.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                  className="bg-bg-secondary/50 border border-accent-green/10 rounded-lg p-5 hover:border-accent-green/30 transition-all duration-300"
                >
                  <span className="text-2xl block mb-2">{prop.icon}</span>
                  <h3 className="font-display text-sm font-bold text-text-primary tracking-wide mb-1">
                    {prop.title}
                  </h3>
                  <p className="font-mono text-xs text-text-secondary leading-relaxed">
                    {prop.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Career Goals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mb-12"
          >
            <TerminalCard title="career_goals.txt" glowColor="purple">
              <div className="space-y-2">
                <p className="font-mono text-sm text-text-secondary">
                  <span className="text-accent-purple">target:</span> AI Engineer & ML Engineer
                </p>
                <p className="font-mono text-sm text-text-secondary">
                  <span className="text-accent-purple">specialization:</span> AI + Cybersecurity + Embedded Systems
                </p>
                <p className="font-mono text-sm text-text-secondary">
                  <span className="text-accent-purple">vision:</span> Mengembangkan teknologi cerdas yang menggabungkan AI, embedded systems, dan riset keamanan siber
                </p>
              </div>
            </TerminalCard>
          </motion.div>

          {/* Download CV */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center"
          >
            <button className="btn-cyber btn-cyber-filled">
              📄 [ DOWNLOAD CV ]
            </button>
            <p className="font-mono text-[10px] text-text-muted mt-2">
              PDF format — last updated 2026
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
