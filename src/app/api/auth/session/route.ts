// ========================================
// GET /api/auth/session — Check current session
// ========================================

import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, SessionData } from '@/lib/session';

export async function GET() {
  try {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);

    return NextResponse.json({
      isAdmin: session.isAdmin || false,
      address: session.address || null,
    });
  } catch {
    return NextResponse.json({
      isAdmin: false,
      address: null,
    });
  }
}
