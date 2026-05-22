// ========================================
// Custom hook wrapping wagmi wallet state
// ========================================

'use client';

import { useAccount, useBalance } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';

export function useWallet() {
  const { address, isConnected, isConnecting, connector } = useAccount();
  const { data: balance } = useBalance({
    address,
    chainId: polygonMumbai.id,
  });

  // Shortened address for display (0x1234...5678)
  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : '';

  return {
    address,
    shortAddress,
    isConnected,
    isConnecting,
    connector,
    balance: balance
      ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}`
      : '0.0000 MATIC',
  };
}
