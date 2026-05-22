'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Link2 } from 'lucide-react';
import ProjectForm from '@/components/admin/ProjectForm';

interface ProjectData {
  id: string;
  name: string;
  slug: string;
  category: string[];
  status: string;
  featured: boolean;
  onChain: boolean;
  icon: string;
  [key: string]: unknown;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectData | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch projects error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleCreate = async (formData: Record<string, unknown>) => {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setShowForm(false);
      fetchProjects();
    } else {
      const err = await res.json();
      alert(err.error || 'Failed to create project');
    }
  };

  const handleUpdate = async (formData: Record<string, unknown>) => {
    if (!editingProject) return;

    const res = await fetch(`/api/projects/${editingProject.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setEditingProject(null);
      fetchProjects();
    } else {
      const err = await res.json();
      alert(err.error || 'Failed to update project');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    setDeleting(id);

    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchProjects();
      }
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-accent-green font-mono text-sm animate-pulse">
          {'>'} LOADING PROJECTS...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-bold text-text-primary tracking-wider">
            PROJECTS
          </h1>
          <p className="font-mono text-xs text-text-muted">
            {'>'} {projects.length} project(s) in database
          </p>
        </div>
        {!showForm && !editingProject && (
          <button
            onClick={() => setShowForm(true)}
            className="btn-cyber text-xs py-2 px-4"
          >
            <Plus className="w-3.5 h-3.5" /> Add New
          </button>
        )}
      </div>

      {/* Create Form */}
      <AnimatePresence>
        {showForm && (
          <ProjectForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
          />
        )}
      </AnimatePresence>

      {/* Edit Form */}
      <AnimatePresence>
        {editingProject && (
          <ProjectForm
            initialData={editingProject as unknown as Record<string, unknown>}
            onSubmit={handleUpdate}
            onCancel={() => setEditingProject(null)}
            isEditing
          />
        )}
      </AnimatePresence>

      {/* Projects Table */}
      {!showForm && !editingProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-bg-secondary border border-accent-green/10 rounded-lg overflow-hidden"
        >
          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-4 py-3 bg-bg-tertiary border-b border-accent-green/10 font-mono text-xs text-text-muted tracking-wide">
            <span>PROJECT</span>
            <span>STATUS</span>
            <span>CHAIN</span>
            <span>FEATURED</span>
            <span>ACTIONS</span>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-accent-green/5">
            {projects.length === 0 ? (
              <div className="p-8 text-center font-mono text-sm text-text-muted">
                No projects in database. Add your first project above.
              </div>
            ) : (
              projects.map((project) => (
                <div
                  key={project.id || project.slug}
                  className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto_auto_auto] gap-2 sm:gap-4 items-center px-4 py-3 hover:bg-accent-green/[0.02] transition-colors"
                >
                  {/* Name */}
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-lg">{project.icon}</span>
                    <div className="min-w-0">
                      <span className="font-mono text-sm text-text-primary block truncate">
                        {project.name}
                      </span>
                      <span className="font-mono text-[10px] text-text-muted">
                        {project.category.join(' · ')}
                      </span>
                    </div>
                  </div>

                  {/* Status */}
                  <span
                    className={`font-mono text-xs px-2 py-0.5 rounded border text-center ${
                      project.status === 'Active'
                        ? 'text-accent-green border-accent-green/30 bg-accent-green/5'
                        : 'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/5'
                    }`}
                  >
                    {project.status}
                  </span>

                  {/* On-Chain */}
                  <span className="text-center">
                    {project.onChain ? (
                      <Link2 className="w-4 h-4 text-accent-purple inline" />
                    ) : (
                      <span className="text-text-muted text-xs">—</span>
                    )}
                  </span>

                  {/* Featured */}
                  <span className="text-center font-mono text-xs">
                    {project.featured ? '⭐' : '—'}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() => setEditingProject(project)}
                      className="p-1.5 rounded hover:bg-accent-cyan/10 text-text-muted hover:text-accent-cyan transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      disabled={deleting === project.id}
                      className="p-1.5 rounded hover:bg-accent-red/10 text-text-muted hover:text-accent-red transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
