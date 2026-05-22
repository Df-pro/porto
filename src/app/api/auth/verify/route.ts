// ========================================
// POST /api/auth/verify — Verify SIWE signature
// ========================================

import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { SiweMessage } from 'siwe';
import { sessionOptions, SessionData } from '@/lib/session';

const OWNER_WALLET = process.env.NEXT_PUBLIC_OWNER_WALLET?.toLowerCase();

export async function POST(request: Request) {
  try {
    const { message, signature } = await request.json();

    if (!message || !signature) {
      return NextResponse.json(
        { error: 'Message and signature are required' },
        { status: 400 }
      );
    }

    // Parse and verify the SIWE message
    const siweMessage = new SiweMessage(message);
    const result = await siweMessage.verify({ signature });

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Get current session to validate nonce
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);

    // Verify nonce matches
    if (siweMessage.nonce !== session.nonce) {
      return NextResponse.json(
        { error: 'Invalid nonce — possible replay attack' },
        { status: 401 }
      );
    }

    // Check if the signer is the owner
    const signerAddress = result.data.address.toLowerCase();
    if (!OWNER_WALLET || signerAddress !== OWNER_WALLET) {
      return NextResponse.json(
        { error: 'Access denied — wallet not authorized' },
        { status: 403 }
      );
    }

    // All checks passed — establish admin session
    session.address = result.data.address;
    session.isAdmin = true;
    session.nonce = undefined; // Consume the nonce (one-time use)
    await session.save();

    return NextResponse.json({
      success: true,
      address: result.data.address,
    });
  } catch (error) {
    console.error('SIWE verification error:', error);
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    );
  }
}
