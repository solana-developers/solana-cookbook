import {
  clusterApiUrl,
  Connection,
  Keypair,
  Transaction,
  SystemProgram,
  PublicKey,
  TransactionInstruction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import * as bs58 from "bs58";

(async () => {
  // program id
  const programId = new PublicKey("4wQC2yuVt4rbcPeYLK8WngqbYLg7UAahVjRFrK3NBjP6");

  // connection
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // setup fee payer
  const feePayer = Keypair.generate();
  const feePayerAirdropSignature = await connection.requestAirdrop(feePayer.publicKey, LAMPORTS_PER_SOL);
  await connection.confirmTransaction(feePayerAirdropSignature);

  // setup pda
  let [pda, bump] = await PublicKey.findProgramAddress([Buffer.from("escrow")], programId);
  console.log(`bump: ${bump}, pubkey: ${pda.toBase58()}`);

  // require 1 SOL for the transfering in the program
  const pdaAirdropSignature = await connection.requestAirdrop(pda, LAMPORTS_PER_SOL);
  await connection.confirmTransaction(pdaAirdropSignature);

  // create a random `to`
  const to = Keypair.generate();
  console.log(`receiver: ${to.publicKey.toBase58()}`);

  let tx = new Transaction().add(
    new TransactionInstruction({
      keys: [
        {
          pubkey: pda,
          // Leave `false` here although we need a pda as a signer.
          // It will be escalated on program if we use invoke_signed.
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: to.publicKey,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: SystemProgram.programId,
          isSigner: false,
          isWritable: false,
        },
      ],
      data: Buffer.from(new Uint8Array([bump])),
      programId: programId,
    })
  );

  console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer])}`);
})();
