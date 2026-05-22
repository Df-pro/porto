// ========================================
// GET /api/auth/nonce — Generate SIWE nonce
// ========================================

import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, SessionData } from '@/lib/session';

export async function GET() {
  try {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);

    // Generate a cryptographically random nonce
    const nonce = crypto.randomUUID();
    session.nonce = nonce;
    await session.save();

    return NextResponse.json({ nonce });
  } catch (error) {
    console.error('Nonce generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate nonce' },
      { status: 500 }
    );
  }
}
