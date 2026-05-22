// ========================================
// Alchemy NFT API Helper
// ========================================

import { NFTData } from '@/types';

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const BASE_URL = `https://polygon-mumbai.g.alchemy.com/nft/v3/${ALCHEMY_API_KEY}`;

export async function getNFTsForOwner(ownerAddress: string): Promise<NFTData[]> {
  if (!ALCHEMY_API_KEY) {
    console.warn('Alchemy API key not configured');
    return [];
  }

  try {
    const response = await fetch(
      `${BASE_URL}/getNFTsForOwner?owner=${ownerAddress}&withMetadata=true&pageSize=20`
    );

    if (!response.ok) {
      throw new Error(`Alchemy API error: ${response.status}`);
    }

    const data = await response.json();

    // Transform Alchemy response to our NFTData type
    return (data.ownedNfts || []).map((nft: Record<string, unknown>) => {
      const contract = nft.contract as Record<string, string> | undefined;
      const raw = nft.raw as { metadata?: Record<string, string> } | undefined;
      const image = nft.image as Record<string, string> | undefined;

      return {
        tokenId: (nft.tokenId as string) || '',
        name: (nft.name as string) || `#${nft.tokenId}`,
        description: (nft.description as string) || '',
        image: image?.cachedUrl || image?.originalUrl || '',
        collection: contract?.name || 'Unknown Collection',
        network: 'Polygon Mumbai',
        openseaUrl: contract?.openSeaUrl ||
          `https://testnets.opensea.io/assets/mumbai/${contract?.address}/${nft.tokenId}`,
      } as NFTData;
    });
  } catch (error) {
    console.error('Failed to fetch NFTs:', error);
    return [];
  }
}
