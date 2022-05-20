const { wallet } = useWallet();
const { setVisible } = useWalletModal();

const onRequestConnectWallet = () => {
  setVisible(true);
};

// Prompt the user to connect their wallet
if (!wallet) {
  return <button onClick={onRequestConnectWallet}>Connect Wallet</button>;
}

// Displays the connected wallet address
return (
  <main>
    <p>Wallet successfully connected!</p>
    <p>{wallet.publicKey.toBase58()}</p>
  </main>
);
