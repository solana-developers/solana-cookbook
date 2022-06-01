import {
  ConnectionProvider,
  WalletProvider,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  getLedgerWallet,
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletExtensionWallet,
  getSolletWallet,
  getTorusWallet,
} from "@solana/wallet-adapter-wallets";

const JupiterApp = ({ children }) => {
  const { connection } = useConnection();
  const wallet = useWallet();

  return (
    <JupiterProvider
      cluster="mainnet-beta"
      connection={connection}
      userPublicKey={wallet.publicKey || undefined}
    >
      {children}
    </JupiterProvider>
  );
};

const App = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;
  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSlopeWallet(),
      getSolflareWallet(),
      getTorusWallet(),
      getLedgerWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
    ],
    [network]
  );
  const endpoint = "https://solana-api.projectserum.com";

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <JupiterApp>{children}</JupiterApp>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
