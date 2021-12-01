import { clusterApiUrl, Connection, PublicKey, Keypair, NonceAccount } from "@solana/web3.js";

(async () => {
  // connection
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const nonceAccountPubkey = new PublicKey("7H18z3v3rZEoKiwY3kh8DLn9eFT6nFCQ2m4kiC7RZ3a4");

  let accountInfo = await connection.getAccountInfo(nonceAccountPubkey);
  let nonceAccount = NonceAccount.fromAccountData(accountInfo.data);
  console.log(`nonce: ${nonceAccount.nonce}`);
  console.log(`authority: ${nonceAccount.authorizedPubkey.toBase58()}`);
  console.log(`fee calculator: ${JSON.stringify(nonceAccount.feeCalculator)}`);
})();
