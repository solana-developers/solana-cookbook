import React, { useMemo, FC, PropsWithChildren } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getLedgerWallet,
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

export const Web3Provider: FC<PropsWithChildren<{}>> = ({ children }) => {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const endpoint = useMemo(() => clusterApiUrl(WalletAdapterNetwork.Devnet), []);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
  // Only the wallets you configure here will be compiled into your application
  const wallets = useMemo(
    () => [getPhantomWallet(), getSolflareWallet(), getSlopeWallet(), getLedgerWallet()],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletModalProvider>
        <WalletProvider wallets={wallets}>{children}</WalletProvider>
      </WalletModalProvider>
    </ConnectionProvider>
  );
};

const Routes = () => <div />;
/**
 * In addition to your typical CRA setup, make sure to wrap
 * your App contents with the necessary providers from @solana/wallet-adapter-react &
 * @solana/wallet-adapter-react-ui.
 */
export const App = () => {
  return (
    <Web3Provider>
      <Routes />
    </Web3Provider>
  );
};

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { MouseEventHandler } from "react";

/**
 * Example of using the connected wallet, if any, or
 * prompting the user to connect their wallet.
 * Opens a built-in modal that handles the connection flow for you.
 */
const UseConnectedWalletOrPromptUser = () => {
  const { wallet } = useWallet();
  const { setVisible } = useWalletModal();

  const onPromptClick: MouseEventHandler = (e) => {
    e.preventDefault();
    setVisible(true);
  };

  // Prompt the user to connect their wallet
  if (!wallet) {
    return <button onClick={onPromptClick}>Connect Wallet</button>;
  }

  return (
    <main>
      <p>Wallet successfully connected!</p>
      <p>{wallet.publicKey.toBase58()}</p>
    </main>
  );
};
