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
