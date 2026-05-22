// ========================================
// /api/projects/[id] — GET/PUT/DELETE
// Security: Whitelist fields on PUT to prevent mass assignment
// ========================================

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Whitelist of fields that can be updated via PUT
const UPDATABLE_FIELDS = [
  'name',
  'category',
  'status',
  'statusLabel',
  'featured',
  'onChain',
  'description',
  'shortDescription',
  'responsibilities',
  'techStack',
  'icon',
  'startDate',
  'endDate',
  'githubUrl',
  'liveUrl',
  'onChainTxHash',
] as const;

// GET — Public: single project by ID
export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.id },
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PUT — Admin: update project (protected by middleware)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Only allow whitelisted fields — prevents mass assignment attacks
    const sanitizedData: Record<string, unknown> = {};
    for (const field of UPDATABLE_FIELDS) {
      if (field in body) {
        sanitizedData[field] = body[field];
      }
    }

    if (Object.keys(sanitizedData).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    const project = await prisma.project.update({
      where: { id: params.id },
      data: sanitizedData,
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Update project error:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE — Admin: delete project (protected by middleware)
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.project.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete project error:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
