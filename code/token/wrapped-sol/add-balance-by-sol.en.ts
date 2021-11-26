import {
  clusterApiUrl,
  Connection,
  Keypair,
  Transaction,
  SystemProgram,
  TransactionInstruction,
} from "@solana/web3.js";
import { Token, TOKEN_PROGRAM_ID, NATIVE_MINT, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";
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

  // remember to create ATA first
  let ata = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    NATIVE_MINT,
    alice.publicKey
  );

  let amount = 1 * 1e9; /* Wrapped SOL's decimals is 9 */

  let tx = new Transaction().add(
    // trasnfer SOL
    SystemProgram.transfer({
      fromPubkey: alice.publicKey,
      toPubkey: ata,
      lamports: amount,
    }),
    // Sync Native instruction. @solana/spl-token will release it soon. Here use the raw instruction temporally.
    new TransactionInstruction({
      keys: [
        {
          pubkey: ata,
          isSigner: false,
          isWritable: true,
        },
      ],
      data: Buffer.from(new Uint8Array([17])),
      programId: TOKEN_PROGRAM_ID,
    })
  );
  console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer, alice])}`);
})();
