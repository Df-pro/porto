// ========================================
// iron-session Configuration
// Admin session management for SIWE auth
// ========================================

import { SessionOptions } from 'iron-session';

export interface SessionData {
  nonce?: string;
  address?: string;
  isAdmin?: boolean;
}

export const sessionOptions: SessionOptions = {
  password: process.env.IRON_SESSION_PASSWORD || 'complex_password_at_least_32_characters_long_fallback_dev',
  cookieName: 'porto_admin_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24, // 24 hours
  },
};
