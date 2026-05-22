'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="relative py-24 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="section-header block">{'>'} ./open_channel.sh</span>
          <h2 className="section-title">Get In Touch</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-mono text-xs text-text-secondary mb-1 block">
                  {'>'} name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="input-cyber"
                />
              </div>

              <div>
                <label className="font-mono text-xs text-text-secondary mb-1 block">
                  {'>'} email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="input-cyber"
                />
              </div>

              <div>
                <label className="font-mono text-xs text-text-secondary mb-1 block">
                  {'>'} subject:
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="Project Collaboration"
                  className="input-cyber"
                />
              </div>

              <div>
                <label className="font-mono text-xs text-text-secondary mb-1 block">
                  {'>'} message:
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Your message here..."
                  className="input-cyber resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-cyber btn-cyber-filled w-full justify-center disabled:opacity-50"
              >
                {status === 'sending' ? '[ TRANSMITTING... ]' : '[ SEND MESSAGE ]'}
              </button>

              {/* Status Messages */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-accent-green/10 border border-accent-green/30 rounded p-3 text-center"
                >
                  <span className="font-mono text-sm text-accent-green">
                    [ MESSAGE SENT SUCCESSFULLY ✓ ]
                  </span>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-accent-red/10 border border-accent-red/30 rounded p-3 text-center"
                >
                  <span className="font-mono text-sm text-accent-red">
                    [ ERROR: TRANSMISSION FAILED ✗ ]
                  </span>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Direct Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-bg-secondary/50 border border-accent-green/10 rounded-lg p-6">
              <h3 className="font-display text-sm font-bold text-accent-green tracking-wider mb-6">
                {'>'} DIRECT CHANNELS
              </h3>

              <div className="space-y-5">
                {/* Email */}
                <a
                  href="mailto:Dwiferdianto69@gmail.com"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-lg group-hover:bg-accent-cyan/20 transition-colors shrink-0">
                    📧
                  </div>
                  <div>
                    <span className="font-mono text-xs text-text-muted block">Email</span>
                    <span className="font-mono text-sm text-text-primary group-hover:text-accent-cyan transition-colors">
                      Dwiferdianto69@gmail.com
                    </span>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/6281336988310"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent-green/10 border border-accent-green/20 flex items-center justify-center text-lg group-hover:bg-accent-green/20 transition-colors shrink-0">
                    📱
                  </div>
                  <div>
                    <span className="font-mono text-xs text-text-muted block">WhatsApp</span>
                    <span className="font-mono text-sm text-text-primary group-hover:text-accent-green transition-colors">
                      +62 813-3698-8310
                    </span>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/Df-pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent-green/10 border border-accent-green/20 flex items-center justify-center text-lg group-hover:bg-accent-green/20 transition-colors shrink-0">
                    🐙
                  </div>
                  <div>
                    <span className="font-mono text-xs text-text-muted block">GitHub</span>
                    <span className="font-mono text-sm text-text-primary group-hover:text-accent-green transition-colors">
                      github.com/Df-pro
                    </span>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/dwi-ferdianto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center text-lg group-hover:bg-accent-purple/20 transition-colors shrink-0">
                    💼
                  </div>
                  <div>
                    <span className="font-mono text-xs text-text-muted block">LinkedIn</span>
                    <span className="font-mono text-sm text-text-primary group-hover:text-accent-purple transition-colors">
                      Dwi Ferdianto
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="bg-bg-secondary/50 border border-accent-green/10 rounded-lg p-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📍</span>
                <div>
                  <span className="font-mono text-xs text-text-muted block">Location</span>
                  <span className="font-mono text-sm text-text-primary">Indonesia</span>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="bg-accent-green/5 border border-accent-green/20 rounded-lg p-4 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              <span className="font-mono text-xs text-accent-green tracking-wider">
                CURRENTLY AVAILABLE FOR COLLABORATION
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
