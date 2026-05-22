'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ProjectFormData {
  name: string;
  slug: string;
  category: string[];
  status: string;
  statusLabel: string;
  featured: boolean;
  description: string;
  shortDescription: string;
  responsibilities: string[];
  techStack: string[];
  icon: string;
  startDate: string;
  endDate: string;
  githubUrl: string;
  liveUrl: string;
}

interface ProjectFormProps {
  initialData?: Partial<ProjectFormData>;
  onSubmit: (data: ProjectFormData) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
}

const defaultData: ProjectFormData = {
  name: '',
  slug: '',
  category: [],
  status: 'Active',
  statusLabel: '',
  featured: false,
  description: '',
  shortDescription: '',
  responsibilities: [],
  techStack: [],
  icon: '🔧',
  startDate: '',
  endDate: '',
  githubUrl: '',
  liveUrl: '',
};

export default function ProjectForm({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
}: ProjectFormProps) {
  const [form, setForm] = useState<ProjectFormData>({
    ...defaultData,
    ...initialData,
  });
  const [submitting, setSubmitting] = useState(false);
  const [newTech, setNewTech] = useState('');
  const [newResp, setNewResp] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Auto-generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setForm((prev) => ({
      ...prev,
      name,
      slug: isEditing
        ? prev.slug
        : name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-'),
    }));
  };

  const addTechStack = () => {
    if (newTech.trim()) {
      setForm((prev) => ({
        ...prev,
        techStack: [...prev.techStack, newTech.trim()],
      }));
      setNewTech('');
    }
  };

  const removeTechStack = (index: number) => {
    setForm((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((_, i) => i !== index),
    }));
  };

  const addResponsibility = () => {
    if (newResp.trim()) {
      setForm((prev) => ({
        ...prev,
        responsibilities: [...prev.responsibilities, newResp.trim()],
      }));
      setNewResp('');
    }
  };

  const removeResponsibility = (index: number) => {
    setForm((prev) => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(form);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-5 bg-bg-secondary border border-accent-green/10 rounded-lg p-6"
    >
      <h3 className="font-display text-sm font-bold text-accent-green tracking-wider">
        {'>'} {isEditing ? 'EDIT PROJECT' : 'NEW PROJECT'}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="font-mono text-xs text-text-secondary mb-1 block">name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleNameChange}
            required
            className="input-cyber"
            placeholder="Project Name"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="font-mono text-xs text-text-secondary mb-1 block">slug *</label>
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            required
            disabled={isEditing}
            className="input-cyber disabled:opacity-50"
            placeholder="project-slug"
          />
        </div>

        {/* Icon */}
        <div>
          <label className="font-mono text-xs text-text-secondary mb-1 block">icon</label>
          <input
            name="icon"
            value={form.icon}
            onChange={handleChange}
            className="input-cyber"
            placeholder="🔧"
          />
        </div>

        {/* Status */}
        <div>
          <label className="font-mono text-xs text-text-secondary mb-1 block">status</label>
          <select name="status" value={form.status} onChange={handleChange} className="input-cyber">
            <option value="Active">Active</option>
            <option value="Research">Research</option>
            <option value="Completed">Completed</option>
            <option value="Ongoing">Ongoing</option>
          </select>
        </div>

        {/* Status Label */}
        <div>
          <label className="font-mono text-xs text-text-secondary mb-1 block">status label</label>
          <input
            name="statusLabel"
            value={form.statusLabel}
            onChange={handleChange}
            className="input-cyber"
            placeholder="Active — 2026"
          />
        </div>

        {/* Category (comma-separated) */}
        <div>
          <label className="font-mono text-xs text-text-secondary mb-1 block">category (comma-separated)</label>
          <input
            value={form.category.join(', ')}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                category: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
              }))
            }
            className="input-cyber"
            placeholder="Cybersecurity, Hardware"
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="font-mono text-xs text-text-secondary mb-1 block">start date</label>
          <input name="startDate" value={form.startDate} onChange={handleChange} className="input-cyber" placeholder="2026" />
        </div>

        {/* GitHub URL */}
        <div>
          <label className="font-mono text-xs text-text-secondary mb-1 block">github url</label>
          <input name="githubUrl" value={form.githubUrl} onChange={handleChange} className="input-cyber" placeholder="https://github.com/..." />
        </div>
      </div>

      {/* Short Description */}
      <div>
        <label className="font-mono text-xs text-text-secondary mb-1 block">short description</label>
        <input name="shortDescription" value={form.shortDescription} onChange={handleChange} className="input-cyber" placeholder="Brief one-liner..." />
      </div>

      {/* Description */}
      <div>
        <label className="font-mono text-xs text-text-secondary mb-1 block">description *</label>
        <textarea name="description" value={form.description} onChange={handleChange} required rows={4} className="input-cyber resize-none" placeholder="Full project description..." />
      </div>

      {/* Tech Stack */}
      <div>
        <label className="font-mono text-xs text-text-secondary mb-1 block">tech stack</label>
        <div className="flex gap-2 mb-2">
          <input
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTechStack())}
            className="input-cyber flex-1"
            placeholder="Add tech..."
          />
          <button type="button" onClick={addTechStack} className="btn-cyber text-xs py-2 px-3">+</button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {form.techStack.map((tech, i) => (
            <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent-cyan/10 border border-accent-cyan/20 rounded text-accent-cyan font-mono text-xs">
              {tech}
              <button type="button" onClick={() => removeTechStack(i)} className="text-accent-red/60 hover:text-accent-red ml-1">×</button>
            </span>
          ))}
        </div>
      </div>

      {/* Responsibilities */}
      <div>
        <label className="font-mono text-xs text-text-secondary mb-1 block">responsibilities</label>
        <div className="flex gap-2 mb-2">
          <input
            value={newResp}
            onChange={(e) => setNewResp(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addResponsibility())}
            className="input-cyber flex-1"
            placeholder="Add responsibility..."
          />
          <button type="button" onClick={addResponsibility} className="btn-cyber text-xs py-2 px-3">+</button>
        </div>
        <ul className="space-y-1">
          {form.responsibilities.map((resp, i) => (
            <li key={i} className="flex items-start gap-2 font-mono text-xs text-text-secondary">
              <span className="text-accent-green mt-0.5">▸</span>
              <span className="flex-1">{resp}</span>
              <button type="button" onClick={() => removeResponsibility(i)} className="text-accent-red/60 hover:text-accent-red shrink-0">×</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Featured checkbox */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="accent-accent-green" />
        <span className="font-mono text-xs text-text-secondary">Featured project</span>
      </label>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={submitting} className="btn-cyber btn-cyber-filled text-xs py-2 px-6 disabled:opacity-50">
          {submitting ? '[ SAVING... ]' : isEditing ? '[ UPDATE ]' : '[ CREATE ]'}
        </button>
        <button type="button" onClick={onCancel} className="btn-cyber text-xs py-2 px-6">
          [ CANCEL ]
        </button>
      </div>
    </motion.form>
  );
}
