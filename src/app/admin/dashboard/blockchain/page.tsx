'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Link2, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

interface ProjectData {
  id: string;
  name: string;
  slug: string;
  icon: string;
  onChain: boolean;
  onChainTxHash?: string;
}

// Minimal ABI for PortfolioVerifier contract
const PORTFOLIO_VERIFIER_ABI = [
  {
    name: 'verifyProject',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'projectId', type: 'string' },
      { name: 'name', type: 'string' },
    ],
    outputs: [],
  },
] as const;

export default function AdminBlockchainPage() {
  const { address, isConnected } = useAccount();
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const hasUpdatedRef = useRef(false); // Guard against infinite PUT loop

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}` | undefined;

  const { writeContract, data: txHash, isPending, error: writeError } = useWriteContract();
  const { isLoading: isTxLoading, isSuccess: isTxSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch projects error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // When TX is confirmed, update the project in DB (guarded against re-execution)
  useEffect(() => {
    if (isTxSuccess && verifyingId && txHash && !hasUpdatedRef.current) {
      hasUpdatedRef.current = true; // Prevent infinite loop
      fetch(`/api/projects/${verifyingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          onChain: true,
          onChainTxHash: txHash,
        }),
      }).then(() => {
        setVerifyingId(null);
        fetchProjects();
      });
    }
  }, [isTxSuccess, verifyingId, txHash, fetchProjects]);

  const handleVerify = (project: ProjectData) => {
    if (!contractAddress) {
      alert('Contract address not configured in .env.local');
      return;
    }
    setVerifyingId(project.id);
    hasUpdatedRef.current = false; // Reset guard for new verification

    try {
      writeContract({
        address: contractAddress,
        abi: PORTFOLIO_VERIFIER_ABI,
        functionName: 'verifyProject',
        args: [project.slug, project.name],
      });
    } catch {
      // User rejected in wallet or other error — reset state
      setVerifyingId(null);
    }
  };

  const unverifiedProjects = projects.filter((p) => !p.onChain);
  const verifiedProjects = projects.filter((p) => p.onChain);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-accent-green font-mono text-sm animate-pulse">
          {'>'} LOADING BLOCKCHAIN DATA...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-xl font-bold text-text-primary tracking-wider">
          BLOCKCHAIN
        </h1>
        <p className="font-mono text-xs text-text-muted">
          {'>'} on-chain project verification via PortfolioVerifier smart contract
        </p>
      </div>

      {/* Connection Status */}
      <div className={`flex items-center gap-2 p-3 rounded-lg border font-mono text-xs ${
        isConnected
          ? 'bg-accent-green/5 border-accent-green/20 text-accent-green'
          : 'bg-accent-red/5 border-accent-red/20 text-accent-red'
      }`}>
        <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-accent-green animate-pulse' : 'bg-accent-red'}`} />
        {isConnected
          ? `Connected: ${address?.slice(0, 6)}...${address?.slice(-4)}`
          : 'Wallet not connected. Connect via navbar to use blockchain features.'}
      </div>

      {/* Write error */}
      {writeError && (
        <div className="flex items-center gap-2 p-3 rounded-lg border bg-accent-red/5 border-accent-red/20">
          <AlertCircle className="w-4 h-4 text-accent-red shrink-0" />
          <span className="font-mono text-xs text-accent-red">
            {writeError.message?.slice(0, 120)}
          </span>
        </div>
      )}

      {/* Unverified Projects */}
      <div>
        <h2 className="font-mono text-sm text-accent-orange tracking-wide mb-3">
          {'>'} PENDING VERIFICATION ({unverifiedProjects.length})
        </h2>
        <div className="space-y-2">
          {unverifiedProjects.length === 0 ? (
            <div className="p-6 text-center font-mono text-sm text-text-muted bg-bg-secondary border border-accent-green/10 rounded-lg">
              All projects are verified on-chain! 🎉
            </div>
          ) : (
            unverifiedProjects.map((project) => (
              <div
                key={project.id || project.slug}
                className="flex items-center justify-between px-4 py-3 bg-bg-secondary border border-accent-green/10 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{project.icon}</span>
                  <span className="font-mono text-sm text-text-primary">{project.name}</span>
                </div>
                <button
                  onClick={() => handleVerify(project)}
                  disabled={!isConnected || !contractAddress || isPending || isTxLoading}
                  className="btn-cyber btn-cyber-cyan text-xs py-1.5 px-3 disabled:opacity-50"
                >
                  {(isPending || isTxLoading) && verifyingId === project.id ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Link2 className="w-3.5 h-3.5" />
                  )}
                  {verifyingId === project.id
                    ? isPending
                      ? 'SIGNING...'
                      : 'CONFIRMING...'
                    : 'VERIFY'}
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Verified Projects */}
      <div>
        <h2 className="font-mono text-sm text-accent-purple tracking-wide mb-3">
          {'>'} VERIFIED ON-CHAIN ({verifiedProjects.length})
        </h2>
        <div className="space-y-2">
          {verifiedProjects.length === 0 ? (
            <div className="p-6 text-center font-mono text-sm text-text-muted bg-bg-secondary border border-accent-green/10 rounded-lg">
              No verified projects yet.
            </div>
          ) : (
            verifiedProjects.map((project) => (
              <div
                key={project.id || project.slug}
                className="flex items-center justify-between px-4 py-3 bg-bg-secondary border border-accent-purple/10 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{project.icon}</span>
                  <span className="font-mono text-sm text-text-primary">{project.name}</span>
                </div>
                <div className="flex items-center gap-1.5 text-accent-purple">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-mono text-xs">VERIFIED</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
