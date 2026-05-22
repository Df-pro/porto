// ========================================
// PortfolioVerifier Smart Contract
// ABI + Contract Address
// ========================================

// Contract ABI — generated from PortfolioVerifier.sol
export const PORTFOLIO_VERIFIER_ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'id', type: 'uint256' },
      { indexed: false, name: 'contentHash', type: 'bytes32' },
      { indexed: false, name: 'name', type: 'string' },
      { indexed: false, name: 'timestamp', type: 'uint256' },
    ],
    name: 'ProjectVerified',
    type: 'event',
  },
  {
    inputs: [
      { name: 'id', type: 'uint256' },
    ],
    name: 'getProject',
    outputs: [
      { name: '', type: 'bytes32' },
      { name: '', type: 'string' },
      { name: '', type: 'uint256' },
      { name: '', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'id', type: 'uint256' },
    ],
    name: 'isVerified',
    outputs: [
      { name: '', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      { name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'projectCount',
    outputs: [
      { name: '', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: '', type: 'uint256' },
    ],
    name: 'projects',
    outputs: [
      { name: 'contentHash', type: 'bytes32' },
      { name: 'name', type: 'string' },
      { name: 'timestamp', type: 'uint256' },
      { name: 'verified', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'name', type: 'string' },
      { name: 'description', type: 'string' },
    ],
    name: 'verifyProject',
    outputs: [
      { name: '', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

// Contract address — set via environment variable after deployment
export const CONTRACT_ADDRESS =
  (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`) ||
  '0x0000000000000000000000000000000000000000';
