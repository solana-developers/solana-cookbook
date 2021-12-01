import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Keypair,
  Transaction,
  SystemProgram,
  NonceAccount,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import * as bs58 from "bs58";

(async () => {
  // Setup our connection and wallet
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const feePayer = Keypair.generate();

  // Fund our wallet with 1 SOL
  const airdropSignature = await connection.requestAirdrop(feePayer.publicKey, LAMPORTS_PER_SOL);
  await connection.confirmTransaction(airdropSignature);

  // G2FAbFQPFa5qKXCetoFZQEvF9BVvCKbvUZvodpVidnoY
  const nonceAccountAuth = Keypair.fromSecretKey(
    bs58.decode("4NMwxzmYj2uvHuq8xoqhY8RXg63KSVJM1DXkpbmkUY7YQWuoyQgFnnzn6yo3CMnqZasnNPNuAT2TLwQsCaKkUddp")
  );

  const nonceAccountPubkey = new PublicKey("7H18z3v3rZEoKiwY3kh8DLn9eFT6nFCQ2m4kiC7RZ3a4");
  let nonceAccountInfo = await connection.getAccountInfo(nonceAccountPubkey);
  let nonceAccount = NonceAccount.fromAccountData(nonceAccountInfo.data);

  let tx = new Transaction().add(
    // nonce advance must be the first insturction
    SystemProgram.nonceAdvance({
      noncePubkey: nonceAccountPubkey,
      authorizedPubkey: nonceAccountAuth.publicKey,
    }),
    // after that, you do what you really want to do, here we append a transfer instruction as an example.
    SystemProgram.transfer({
      fromPubkey: feePayer.publicKey,
      toPubkey: nonceAccountAuth.publicKey,
      lamports: 1,
    })
  );
  // assign `nonce` as recentBlockhash
  tx.recentBlockhash = nonceAccount.nonce;
  tx.feePayer = feePayer.publicKey;
  tx.sign(feePayer, nonceAccountAuth); /* fee payer + nonce account authority + ... */

  console.log(`txhash: ${await connection.sendRawTransaction(tx.serialize())}`);
})();
