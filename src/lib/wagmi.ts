// ========================================
// wagmi + RainbowKit Configuration
// Polygon Mumbai Testnet
// ========================================

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { polygonMumbai } from 'wagmi/chains';
import { http } from 'wagmi';

// RainbowKit + wagmi config
// Note: Requires NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID in .env.local
export const config = getDefaultConfig({
  appName: 'Dwi Ferdianto Portfolio',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo-project-id',
  chains: [polygonMumbai],
  transports: {
    [polygonMumbai.id]: http(),
  },
  ssr: true,
});
