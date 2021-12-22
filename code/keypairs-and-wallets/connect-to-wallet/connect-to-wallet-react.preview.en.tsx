const wallet = useWallet();
const { setVisible } = useWalletModal();

const onPromptClick: MouseEventHandler = (e) => {
  e.preventDefault();
  setVisible(true);
};

// Prompt the user to connect their wallet
if (!wallet?.publicKey) {
  return <button onClick={onPromptClick}>Connect Wallet</button>;
}