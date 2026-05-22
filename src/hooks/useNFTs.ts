// ========================================
// Custom hook for fetching NFTs
// ========================================

'use client';

import { useState, useEffect, useCallback } from 'react';
import { NFTData } from '@/types';

export function useNFTs(walletAddress?: string) {
  const [nfts, setNfts] = useState<NFTData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNFTs = useCallback(async () => {
    if (!walletAddress) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/nft?address=${walletAddress}`);
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      // Transform response
      const nftData: NFTData[] = (data.ownedNfts || []).map(
        (nft: Record<string, unknown>) => {
          const contract = nft.contract as Record<string, string> | undefined;
          const image = nft.image as Record<string, string> | undefined;

          return {
            tokenId: (nft.tokenId as string) || '',
            name: (nft.name as string) || `#${nft.tokenId}`,
            description: (nft.description as string) || '',
            image: image?.cachedUrl || image?.originalUrl || '',
            collection: contract?.name || 'Unknown Collection',
            network: 'Polygon Mumbai',
          };
        }
      );

      setNfts(nftData);
    } catch (err) {
      setError('Failed to fetch NFTs');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [walletAddress]);

  useEffect(() => {
    fetchNFTs();
  }, [fetchNFTs]);

  return { nfts, isLoading, error, refetch: fetchNFTs };
}
