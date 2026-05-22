'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MailOpen, Trash2, Archive, ChevronDown, ChevronUp } from 'lucide-react';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  archived: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch messages error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const toggleRead = async (msg: Message) => {
    try {
      await fetch(`/api/messages/${msg.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: !msg.read }),
      });
      fetchMessages();
    } catch (err) {
      console.error('Toggle read error:', err);
    }
  };

  const archiveMessage = async (id: string) => {
    try {
      await fetch(`/api/messages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ archived: true }),
      });
      fetchMessages();
    } catch (err) {
      console.error('Archive error:', err);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Permanently delete this message?')) return;
    try {
      await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      fetchMessages();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const filteredMessages = messages.filter((msg) => {
    if (filter === 'unread') return !msg.read;
    if (filter === 'read') return msg.read;
    return true;
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-accent-green font-mono text-sm animate-pulse">
          {'>'} LOADING MESSAGES...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-xl font-bold text-text-primary tracking-wider">
            MESSAGES
          </h1>
          <p className="font-mono text-xs text-text-muted">
            {'>'} {messages.length} total · {unreadCount} unread
          </p>
        </div>

        {/* Filter */}
        <div className="flex gap-1">
          {(['all', 'unread', 'read'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 font-mono text-xs rounded transition-colors ${
                filter === f
                  ? 'bg-accent-green/10 text-accent-green border border-accent-green/30'
                  : 'text-text-muted hover:text-text-secondary border border-transparent'
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-bg-secondary border border-accent-green/10 rounded-lg overflow-hidden">
        {filteredMessages.length === 0 ? (
          <div className="p-8 text-center font-mono text-sm text-text-muted">
            {filter === 'unread'
              ? 'No unread messages. 🎉'
              : filter === 'read'
                ? 'No read messages.'
                : 'No messages yet. 📭'}
          </div>
        ) : (
          <div className="divide-y divide-accent-green/5">
            {filteredMessages.map((msg) => (
              <motion.div key={msg.id} layout className="group">
                {/* Message header row */}
                <div
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-accent-green/[0.02] transition-colors"
                  onClick={() => {
                    setExpandedId(expandedId === msg.id ? null : msg.id);
                    if (!msg.read) toggleRead(msg);
                  }}
                >
                  {/* Read indicator */}
                  <span className="shrink-0">
                    {msg.read ? (
                      <MailOpen className="w-4 h-4 text-text-muted" />
                    ) : (
                      <Mail className="w-4 h-4 text-accent-orange" />
                    )}
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-sm truncate ${msg.read ? 'text-text-secondary' : 'text-text-primary font-bold'}`}>
                        {msg.name}
                      </span>
                      <span className="font-mono text-[10px] text-text-muted hidden sm:inline">
                        {'<'}{msg.email}{'>'}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-text-muted block truncate">
                      {msg.subject}
                    </span>
                  </div>

                  {/* Date */}
                  <span className="font-mono text-[10px] text-text-muted shrink-0 hidden sm:block">
                    {new Date(msg.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>

                  {/* Expand indicator */}
                  <span className="shrink-0 text-text-muted">
                    {expandedId === msg.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </span>
                </div>

                {/* Expanded detail */}
                <AnimatePresence>
                  {expandedId === msg.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-1 ml-7">
                        {/* Full email on mobile */}
                        <p className="font-mono text-xs text-accent-cyan mb-3 sm:hidden">
                          {msg.email}
                        </p>

                        {/* Message body */}
                        <div className="bg-bg-tertiary/50 border border-accent-green/5 rounded p-4 mb-3">
                          <p className="font-mono text-sm text-text-secondary whitespace-pre-wrap leading-relaxed">
                            {msg.message}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleRead(msg);
                            }}
                            className="font-mono text-xs text-text-muted hover:text-accent-cyan transition-colors flex items-center gap-1"
                          >
                            {msg.read ? <Mail className="w-3 h-3" /> : <MailOpen className="w-3 h-3" />}
                            {msg.read ? 'Mark Unread' : 'Mark Read'}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              archiveMessage(msg.id);
                            }}
                            className="font-mono text-xs text-text-muted hover:text-accent-orange transition-colors flex items-center gap-1"
                          >
                            <Archive className="w-3 h-3" /> Archive
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteMessage(msg.id);
                            }}
                            className="font-mono text-xs text-text-muted hover:text-accent-red transition-colors flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" /> Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
