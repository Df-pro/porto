'use client';

// VerifyButton — On-chain project verification component
// Calls isVerified() on the PortfolioVerifier smart contract

import { useState } from 'react';
import { useProjectVerification } from '@/hooks/useContract';
import NeonBadge from '@/components/ui/NeonBadge';

interface VerifyButtonProps {
  projectId: number;
  projectName: string;
}

export default function VerifyButton({ projectId, projectName }: VerifyButtonProps) {
  const [showResult, setShowResult] = useState(false);
  const { isVerified, isLoading, projectData, contractAddress } =
    useProjectVerification(projectId);

  const handleVerify = () => {
    setShowResult(true);
  };

  // Contract not configured
  if (contractAddress === '0x0000000000000000000000000000000000000000') {
    return (
      <div className="bg-bg-secondary/50 border border-accent-cyan/10 rounded-lg p-4">
        <p className="font-mono text-xs text-text-muted">
          ⛓ On-chain verification available after contract deployment.
          Set NEXT_PUBLIC_CONTRACT_ADDRESS in .env.local
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleVerify}
        disabled={isLoading}
        className="btn-cyber btn-cyber-cyan disabled:opacity-50"
      >
        {isLoading ? '[ CHECKING... ]' : '[ VERIFY ON-CHAIN ]'}
      </button>

      {showResult && !isLoading && (
        <div className="bg-bg-secondary/50 border border-accent-cyan/20 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2">
            {isVerified ? (
              <>
                <span className="text-accent-green text-lg">✓</span>
                <span className="font-mono text-sm text-accent-green">VERIFIED</span>
                <NeonBadge text="On-Chain" color="green" size="sm" />
              </>
            ) : (
              <>
                <span className="text-accent-red text-lg">✗</span>
                <span className="font-mono text-sm text-accent-red">NOT VERIFIED</span>
              </>
            )}
          </div>

          <div className="font-mono text-xs text-text-muted space-y-1">
            <p>Project: {projectName}</p>
            <p>Contract: {contractAddress.slice(0, 10)}...{contractAddress.slice(-8)}</p>
            {projectData && (
              <>
                <p>Content Hash: {projectData.contentHash.slice(0, 18)}...</p>
                <p>
                  Timestamp:{' '}
                  {new Date(projectData.timestamp * 1000).toLocaleString()}
                </p>
              </>
            )}
            <a
              href={`https://mumbai.polygonscan.com/address/${contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-cyan hover:underline inline-block mt-1"
            >
              View on Polygonscan →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
