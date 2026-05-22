'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FolderKanban, Mail, Link2, Plus, ArrowRight } from 'lucide-react';
import StatsCard from '@/components/admin/StatsCard';

interface DashboardData {
  totalProjects: number;
  unreadMessages: number;
  onChainVerified: number;
  recentMessages: Array<{
    id: string;
    name: string;
    subject: string;
    createdAt: string;
    read: boolean;
  }>;
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData>({
    totalProjects: 0,
    unreadMessages: 0,
    onChainVerified: 0,
    recentMessages: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsRes, messagesRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/messages'),
        ]);

        const projects = await projectsRes.json();
        const messages = await messagesRes.json();

        const projectList = Array.isArray(projects) ? projects : [];
        const messageList = Array.isArray(messages) ? messages : [];

        setData({
          totalProjects: projectList.length,
          unreadMessages: messageList.filter((m: { read: boolean }) => !m.read).length,
          onChainVerified: projectList.filter((p: { onChain: boolean }) => p.onChain).length,
          recentMessages: messageList.slice(0, 5),
        });
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-accent-green font-mono text-sm animate-pulse">
          {'>'} LOADING DASHBOARD DATA...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-xl font-bold text-text-primary tracking-wider mb-1">
          SYSTEM OVERVIEW
        </h1>
        <p className="font-mono text-xs text-text-muted">
          {'>'} status: all systems operational
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <StatsCard
          icon={<FolderKanban className="w-5 h-5" />}
          value={data.totalProjects}
          label="Total Projects"
          color="cyan"
        />
        <StatsCard
          icon={<Mail className="w-5 h-5" />}
          value={data.unreadMessages}
          label="Unread Messages"
          color={data.unreadMessages > 0 ? 'orange' : 'green'}
        />
        <StatsCard
          icon={<Link2 className="w-5 h-5" />}
          value={data.onChainVerified}
          label="On-Chain Verified"
          color="purple"
        />
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-3"
      >
        <Link href="/admin/dashboard/projects" className="btn-cyber text-xs py-2 px-4">
          <Plus className="w-3.5 h-3.5" /> Add Project
        </Link>
        <Link href="/admin/dashboard/messages" className="btn-cyber btn-cyber-cyan text-xs py-2 px-4">
          <Mail className="w-3.5 h-3.5" /> View Messages
        </Link>
      </motion.div>

      {/* Recent Messages */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-mono text-sm text-accent-green tracking-wide">
            {'>'} RECENT MESSAGES
          </h2>
          <Link
            href="/admin/dashboard/messages"
            className="font-mono text-xs text-text-muted hover:text-accent-green transition-colors flex items-center gap-1"
          >
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="bg-bg-secondary border border-accent-green/10 rounded-lg overflow-hidden">
          {data.recentMessages.length === 0 ? (
            <div className="p-6 text-center font-mono text-sm text-text-muted">
              No messages yet. 📭
            </div>
          ) : (
            <div className="divide-y divide-accent-green/5">
              {data.recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="px-4 py-3 flex items-center justify-between hover:bg-accent-green/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {!msg.read && (
                      <span className="w-2 h-2 rounded-full bg-accent-orange shrink-0" />
                    )}
                    <div className="min-w-0">
                      <span className="font-mono text-sm text-text-primary block truncate">
                        {msg.name}
                      </span>
                      <span className="font-mono text-xs text-text-muted block truncate">
                        {msg.subject}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-text-muted shrink-0 ml-3">
                    {new Date(msg.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
