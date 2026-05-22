'use client';

import Image from 'next/image';
import { NFTData } from '@/types';
import NeonBadge from '@/components/ui/NeonBadge';

interface NFTCardProps {
  nft: NFTData;
  onClick?: () => void;
}

export default function NFTCard({ nft, onClick }: NFTCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-bg-secondary border border-accent-cyan/15 rounded-lg overflow-hidden hover:border-accent-cyan/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
    >
      {/* NFT Image */}
      <div className="relative aspect-square bg-bg-tertiary">
        {nft.image ? (
          <Image
            src={nft.image}
            alt={nft.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl text-text-muted">
            🖼️
          </div>
        )}
      </div>

      {/* NFT Info */}
      <div className="p-3">
        <h4 className="font-mono text-sm text-text-primary truncate mb-1">
          {nft.name}
        </h4>
        <p className="font-mono text-xs text-text-muted truncate mb-2">
          {nft.collection}
        </p>
        <NeonBadge text={nft.network} color="cyan" size="sm" />
      </div>
    </div>
  );
}
