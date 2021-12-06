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
