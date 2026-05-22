// ========================================
// /api/projects — GET (public) + POST (admin)
// ========================================

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { projects as staticProjects } from '@/data/projects';

// GET — Public: list all projects (DB with static fallback)
export async function GET() {
  try {
    const dbProjects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });

    if (dbProjects.length > 0) {
      return NextResponse.json(dbProjects);
    }

    // Fallback to static data if DB is empty/not configured
    return NextResponse.json(staticProjects);
  } catch {
    // DB not available — use static data
    return NextResponse.json(staticProjects);
  }
}

// POST — Admin: create new project (protected by middleware)
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      slug,
      category,
      status,
      statusLabel,
      featured,
      description,
      shortDescription,
      responsibilities,
      techStack,
      icon,
      startDate,
      endDate,
      githubUrl,
      liveUrl,
    } = body;

    // Validate required fields
    if (!name || !slug || !description) {
      return NextResponse.json(
        { error: 'name, slug, and description are required' },
        { status: 400 }
      );
    }

    // Check slug uniqueness
    const existing = await prisma.project.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: 'A project with this slug already exists' },
        { status: 409 }
      );
    }

    const project = await prisma.project.create({
      data: {
        name,
        slug,
        category: category || [],
        status: status || 'Active',
        statusLabel: statusLabel || '',
        featured: featured || false,
        description,
        shortDescription: shortDescription || '',
        responsibilities: responsibilities || [],
        techStack: techStack || [],
        icon: icon || '🔧',
        startDate: startDate || new Date().getFullYear().toString(),
        endDate: endDate || null,
        githubUrl: githubUrl || null,
        liveUrl: liveUrl || null,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
