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
