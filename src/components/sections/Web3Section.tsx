'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Web3Section() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Web3 wallet state — placeholder until wagmi is configured with API keys
  const isConnected = false;

  return (
    <section id="web3" className="relative py-24 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="section-header block">{'>'} ./blockchain_identity.exe</span>
          <h2 className="section-title">On-Chain Identity</h2>
          <p className="text-text-secondary font-mono text-sm">
            Connect your wallet to interact with on-chain features
          </p>
        </motion.div>

        {/* Wallet Not Connected State */}
        {!isConnected && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-bg-secondary/50 border border-accent-cyan/20 rounded-lg p-8 sm:p-12 text-center relative overflow-hidden">
              {/* Pulse ring background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-64 rounded-full border border-accent-cyan/10 animate-ping opacity-20" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-48 rounded-full border border-accent-cyan/10 animate-ping opacity-10" style={{ animationDelay: '0.5s' }} />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="text-5xl mb-6">⟐</div>
                <h3 className="font-display text-xl font-bold text-text-primary mb-3 tracking-wide">
                  Connect Your Wallet
                </h3>
                <p className="text-text-secondary font-mono text-sm mb-4 max-w-md mx-auto leading-relaxed">
                  Connect MetaMask, WalletConnect, or Coinbase Wallet to access on-chain features
                </p>

                {/* Feature List */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-lg mx-auto">
                  {[
                    { icon: '🖼️', text: 'View NFT Gallery' },
                    { icon: '✓', text: 'Verify Projects On-Chain' },
                    { icon: '💎', text: 'Check MATIC Balance' },
                  ].map((feature) => (
                    <div
                      key={feature.text}
                      className="flex items-center gap-2 text-text-muted font-mono text-xs"
                    >
                      <span>{feature.icon}</span>
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>

                <button
                  className="btn-cyber btn-cyber-cyan"
                  onClick={() => {
                    // Trigger RainbowKit modal when configured
                    const event = new CustomEvent('openWalletModal');
                    window.dispatchEvent(event);
                  }}
                >
                  [ CONNECT WALLET ]
                </button>

                <p className="mt-4 font-mono text-[10px] text-text-muted">
                  Network: Polygon Mumbai Testnet (chainId: 80001)
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Wallet Connected State — will show when wagmi detects connection */}
        {isConnected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Wallet Info */}
            <div className="bg-bg-secondary/50 border border-accent-green/20 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                <span className="font-mono text-sm text-accent-green">WALLET CONNECTED</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="font-mono text-xs text-text-muted block mb-1">Address</span>
                  <span className="font-mono text-sm text-text-primary">0x...xxxx</span>
                </div>
                <div>
                  <span className="font-mono text-xs text-text-muted block mb-1">Balance</span>
                  <span className="font-mono text-sm text-text-primary">0.00 MATIC</span>
                </div>
              </div>
            </div>

            {/* NFT Gallery Placeholder */}
            <div className="bg-bg-secondary/50 border border-accent-cyan/10 rounded-lg p-6 text-center">
              <p className="font-mono text-sm text-text-secondary">
                No NFTs found in this wallet
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
