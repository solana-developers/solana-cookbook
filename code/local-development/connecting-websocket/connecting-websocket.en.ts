import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";

(async () => {
  // Establish new connect to devnet - websocket client connected to devnet will also be registered here
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // Create a test wallet to listen to
  const wallet = Keypair.generate();

  // Register a callback to listen to the wallet (ws subscription)
  connection.onAccountChange(
    wallet.publicKey(),
    (updatedAccountInfo, context) =>
      console.log("Updated account info: ", updatedAccountInfo),
    "confirmed"
  );
})();
