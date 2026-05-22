// ========================================
// Custom hook for PortfolioVerifier contract interactions
// ========================================

'use client';

import { useReadContract } from 'wagmi';
import { PORTFOLIO_VERIFIER_ABI, CONTRACT_ADDRESS } from '@/lib/contract';

/**
 * Check if a project is verified on-chain
 * @param projectId - The on-chain project ID (e.g., 0 for Chrono Spectral Daemon)
 */
export function useProjectVerification(projectId: number) {
  const { data: isVerified, isLoading: isCheckingVerification } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: PORTFOLIO_VERIFIER_ABI,
    functionName: 'isVerified',
    args: [BigInt(projectId)],
    // Only query if contract address is set
    query: {
      enabled: CONTRACT_ADDRESS !== '0x0000000000000000000000000000000000000000',
    },
  });

  const { data: projectData, isLoading: isLoadingProject } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: PORTFOLIO_VERIFIER_ABI,
    functionName: 'getProject',
    args: [BigInt(projectId)],
    query: {
      enabled:
        CONTRACT_ADDRESS !== '0x0000000000000000000000000000000000000000' &&
        isVerified === true,
    },
  });

  return {
    isVerified: isVerified ?? false,
    isLoading: isCheckingVerification || isLoadingProject,
    projectData: projectData
      ? {
          contentHash: projectData[0],
          name: projectData[1],
          timestamp: Number(projectData[2]),
          verified: projectData[3],
        }
      : null,
    contractAddress: CONTRACT_ADDRESS,
  };
}
