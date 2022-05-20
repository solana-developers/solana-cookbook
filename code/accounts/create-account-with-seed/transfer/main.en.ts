import {
  PublicKey,
  SystemProgram,
  Connection,
  clusterApiUrl,
  Transaction,
  Keypair,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import * as bs58 from "bs58";

(async () => {
  // connection
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // 5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8
  const feePayer = Keypair.fromSecretKey(
    bs58.decode(
      "588FU4PktJWfGfxtzpAAXywSNt74AvtroVzGfKkVN1LwRuvHwKGr851uH8czM5qm4iqLbs1kKoMKtMJG4ATR7Ld2"
    )
  );

  // G2FAbFQPFa5qKXCetoFZQEvF9BVvCKbvUZvodpVidnoY
  const base = Keypair.fromSecretKey(
    bs58.decode(
      "4NMwxzmYj2uvHuq8xoqhY8RXg63KSVJM1DXkpbmkUY7YQWuoyQgFnnzn6yo3CMnqZasnNPNuAT2TLwQsCaKkUddp"
    )
  );

  let basePubkey = base.publicKey;
  let seed = "robot001";
  let programId = SystemProgram.programId;

  let derived = await PublicKey.createWithSeed(basePubkey, seed, programId);

  const tx = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: derived,
      basePubkey: basePubkey,
      toPubkey: Keypair.generate().publicKey, // create a random receiver
      lamports: 0.01 * LAMPORTS_PER_SOL,
      seed: seed,
      programId: programId,
    })
  );

  console.log(
    `txhash: ${await sendAndConfirmTransaction(connection, tx, [
      feePayer,
      base,
    ])}`
  );
})();
