// ========================================
// /api/messages — GET all messages (admin)
// Returns empty array if DB not configured
// ========================================

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET — Admin: list all contact messages (protected by middleware for non-GET)
export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({
      where: { archived: false },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(messages);
  } catch (error) {
    // DB not configured or not migrated — return empty array instead of 500
    console.warn('Get messages — DB not available:', error instanceof Error ? error.message : error);
    return NextResponse.json([]);
  }
}
