import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Keypair,
  Transaction,
  SystemProgram,
  NonceAccount,
} from "@solana/web3.js";
import * as bs58 from "bs58";

(async () => {
  // connection
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // 5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8
  const feePayer = Keypair.fromSecretKey(
    bs58.decode("588FU4PktJWfGfxtzpAAXywSNt74AvtroVzGfKkVN1LwRuvHwKGr851uH8czM5qm4iqLbs1kKoMKtMJG4ATR7Ld2")
  );

  // G2FAbFQPFa5qKXCetoFZQEvF9BVvCKbvUZvodpVidnoY
  const alice = Keypair.fromSecretKey(
    bs58.decode("4NMwxzmYj2uvHuq8xoqhY8RXg63KSVJM1DXkpbmkUY7YQWuoyQgFnnzn6yo3CMnqZasnNPNuAT2TLwQsCaKkUddp")
  );

  const nonceAccountPubkey = new PublicKey("7H18z3v3rZEoKiwY3kh8DLn9eFT6nFCQ2m4kiC7RZ3a4");
  let nonceAccountInfo = await connection.getAccountInfo(nonceAccountPubkey);
  let nonceAccount = NonceAccount.fromAccountData(nonceAccountInfo.data);

  let tx = new Transaction().add(
    // nonce advance must be the first insturction
    SystemProgram.nonceAdvance({
      noncePubkey: nonceAccountPubkey,
      authorizedPubkey: alice.publicKey,
    }),
    // after that, you do what you really want to do, here we append a transfer instruction as an example.
    SystemProgram.transfer({
      fromPubkey: alice.publicKey,
      toPubkey: feePayer.publicKey,
      lamports: 1,
    })
  );
  // assign `nonce` as recentBlockhash
  tx.recentBlockhash = nonceAccount.nonce;
  tx.feePayer = feePayer.publicKey;
  tx.sign(feePayer, alice); /* fee payer + nonce account authority + ... */

  console.log(`txhash: ${await connection.sendRawTransaction(tx.serialize())}`);
})();
