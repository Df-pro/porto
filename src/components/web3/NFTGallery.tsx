'use client';

import { motion } from 'framer-motion';
import { NFTData } from '@/types';
import NFTCard from './NFTCard';

interface NFTGalleryProps {
  nfts: NFTData[];
  isLoading: boolean;
}

export default function NFTGallery({ nfts, isLoading }: NFTGalleryProps) {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <span className="font-mono text-sm text-accent-cyan animate-pulse">
          {'>'} Fetching NFTs...
        </span>
      </div>
    );
  }

  if (nfts.length === 0) {
    return (
      <div className="bg-bg-secondary/50 border border-accent-cyan/10 rounded-lg p-6 text-center">
        <p className="font-mono text-sm text-text-secondary">
          No NFTs found in this wallet
        </p>
        <p className="font-mono text-xs text-text-muted mt-1">
          NFTs on Polygon Mumbai will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {nfts.map((nft, index) => (
        <motion.div
          key={`${nft.collection}-${nft.tokenId}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <NFTCard
            nft={nft}
            onClick={() => {
              if (nft.openseaUrl) {
                window.open(nft.openseaUrl, '_blank');
              }
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
