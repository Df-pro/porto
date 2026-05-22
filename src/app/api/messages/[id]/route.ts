// ========================================
// /api/messages/[id] — PUT/DELETE (admin)
// Security: Whitelist fields on PUT to prevent mass assignment
// ========================================

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Only these fields can be updated on a message
const UPDATABLE_FIELDS = ['read', 'archived'] as const;

// PUT — Admin: update message (mark read, archive)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Whitelist only allowed fields
    const sanitizedData: Record<string, unknown> = {};
    for (const field of UPDATABLE_FIELDS) {
      if (field in body && typeof body[field] === 'boolean') {
        sanitizedData[field] = body[field];
      }
    }

    if (Object.keys(sanitizedData).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    const message = await prisma.contactMessage.update({
      where: { id: params.id },
      data: sanitizedData,
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error('Update message error:', error);
    return NextResponse.json(
      { error: 'Failed to update message' },
      { status: 500 }
    );
  }
}

// DELETE — Admin: delete message
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.contactMessage.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete message error:', error);
    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}
