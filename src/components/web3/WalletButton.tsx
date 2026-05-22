'use client';

// WalletButton — Styled wrapper for RainbowKit ConnectButton
// Uses RainbowKit's custom rendering to match cyberpunk aesthetic

import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function WalletButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none' as const,
                userSelect: 'none' as const,
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="btn-cyber text-xs py-2 px-4"
                  >
                    ⟐ Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="btn-cyber text-xs py-2 px-4 !border-accent-red !text-accent-red"
                  >
                    ⚠ Wrong Network
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-2">
                  <button
                    onClick={openChainModal}
                    className="px-2 py-1 text-xs font-mono text-accent-cyan bg-accent-cyan/5 border border-accent-cyan/20 rounded hover:bg-accent-cyan/10 transition-colors"
                  >
                    {chain.name}
                  </button>
                  <button
                    onClick={openAccountModal}
                    className="btn-cyber text-xs py-2 px-4"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-green inline-block mr-1.5" />
                    {account.displayName}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
