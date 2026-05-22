'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount, useSignMessage, useChainId } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { SiweMessage } from 'siwe';
import { motion, AnimatePresence } from 'framer-motion';

const OWNER_WALLET = process.env.NEXT_PUBLIC_OWNER_WALLET?.toLowerCase();

type AuthStatus =
  | 'disconnected'
  | 'wrong_wallet'
  | 'ready'
  | 'fetching_nonce'
  | 'signing'
  | 'verifying'
  | 'success'
  | 'error';

const statusMessages: Record<AuthStatus, string> = {
  disconnected: '> WALLET NOT CONNECTED',
  wrong_wallet: '> ACCESS DENIED — UNAUTHORIZED WALLET',
  ready: '> WALLET VERIFIED — READY TO AUTHENTICATE',
  fetching_nonce: '> GENERATING SECURE NONCE...',
  signing: '> AWAITING CRYPTOGRAPHIC SIGNATURE...',
  verifying: '> VERIFYING SIGNATURE ON SERVER...',
  success: '> ACCESS GRANTED ✓',
  error: '> AUTHENTICATION FAILED ✗',
};

const statusColors: Record<AuthStatus, string> = {
  disconnected: 'text-text-muted',
  wrong_wallet: 'text-accent-red',
  ready: 'text-accent-green',
  fetching_nonce: 'text-accent-cyan',
  signing: 'text-accent-orange',
  verifying: 'text-accent-cyan',
  success: 'text-accent-green',
  error: 'text-accent-red',
};

export default function AdminLoginForm({ redirectPath }: { redirectPath?: string }) {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const chainId = useChainId();
  const [status, setStatus] = useState<AuthStatus>('disconnected');
  const [errorDetail, setErrorDetail] = useState('');

  // Determine current state
  const isOwner = isConnected && address && address.toLowerCase() === OWNER_WALLET;
  const currentStatus = !isConnected
    ? 'disconnected'
    : !isOwner
      ? 'wrong_wallet'
      : status === 'disconnected'
        ? 'ready'
        : status;

  const handleSignIn = async () => {
    if (!address) return;

    try {
      // Step 1: Get nonce
      setStatus('fetching_nonce');
      const nonceRes = await fetch('/api/auth/nonce');
      const { nonce } = await nonceRes.json();

      if (!nonce) throw new Error('Failed to get nonce');

      // Step 2: Construct SIWE message
      const siweMessage = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in to the Admin Dashboard of Dwi Ferdianto Portfolio.',
        uri: window.location.origin,
        version: '1',
        chainId: chainId || 80001, // Use dynamic chainId from wagmi
        nonce,
      });
      const messageToSign = siweMessage.prepareMessage();

      // Step 3: Request signature from wallet
      setStatus('signing');
      const signature = await signMessageAsync({ message: messageToSign });

      // Step 4: Verify on server
      setStatus('verifying');
      const verifyRes = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageToSign, signature }),
      });

      if (!verifyRes.ok) {
        const errData = await verifyRes.json();
        throw new Error(errData.error || 'Verification failed');
      }

      // Step 5: Success!
      setStatus('success');
      setTimeout(() => {
        router.push(redirectPath || '/admin/dashboard');
      }, 1500);
    } catch (err) {
      setStatus('error');
      setErrorDetail(err instanceof Error ? err.message : 'Unknown error');
      setTimeout(() => {
        setStatus('disconnected');
        setErrorDetail('');
      }, 4000);
    }
  };

  return (
    <div className="space-y-5">
      {/* Wallet Connection */}
      {!isConnected && (
        <div className="flex flex-col items-center gap-4">
          <p className="font-mono text-xs text-text-secondary text-center">
            Connect your wallet to begin authentication.
          </p>
          <ConnectButton />
        </div>
      )}

      {/* Status Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStatus}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className={`font-mono text-sm ${statusColors[currentStatus]} text-center py-3 px-4 rounded bg-bg-tertiary/50 border border-current/20`}
        >
          {statusMessages[currentStatus]}
          {currentStatus === 'error' && errorDetail && (
            <div className="text-[10px] text-text-muted mt-1">{errorDetail}</div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Connected wallet info */}
      {isConnected && address && (
        <div className="font-mono text-xs text-text-muted text-center">
          <span className="text-text-secondary">wallet:</span>{' '}
          <span className="text-accent-cyan">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
      )}

      {/* Sign In Button — only for owner wallet */}
      {isOwner && currentStatus === 'ready' && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleSignIn}
          className="btn-cyber btn-cyber-filled w-full justify-center text-sm py-3"
        >
          🔐 SIGN IN AS ADMIN
        </motion.button>
      )}

      {/* Loading indicator */}
      {['fetching_nonce', 'signing', 'verifying'].includes(currentStatus) && (
        <div className="flex justify-center">
          <div className="w-6 h-6 border-2 border-accent-green/30 border-t-accent-green rounded-full animate-spin" />
        </div>
      )}

      {/* Wrong wallet — show connect button to switch */}
      {currentStatus === 'wrong_wallet' && (
        <div className="flex flex-col items-center gap-3">
          <p className="font-mono text-[10px] text-text-muted text-center">
            This wallet is not authorized. Connect the owner wallet.
          </p>
          <ConnectButton />
        </div>
      )}
    </div>
  );
}
