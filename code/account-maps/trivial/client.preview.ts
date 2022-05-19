const insertABIx = new TransactionInstruction({
  programId: MY_PROGRAM_ID,
  keys: [
    {
      pubkey: userA.publicKey,
      isSigner: true,
      isWritable: true,
    },
    {
      pubkey: userB.publicKey,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: mapKey,
      isSigner: false,
      isWritable: true,
    },
  ],
  data: Buffer.from(Uint8Array.of(1)),
});

const insertBCIx = new TransactionInstruction({
  programId: MY_PROGRAM_ID,
  keys: [
    {
      pubkey: userB.publicKey,
      isSigner: true,
      isWritable: true,
    },
    {
      pubkey: userC.publicKey,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: mapKey,
      isSigner: false,
      isWritable: true,
    },
  ],
  data: Buffer.from(Uint8Array.of(1)),
});

const insertCAIx = new TransactionInstruction({
  programId: MY_PROGRAM_ID,
  keys: [
    {
      pubkey: userC.publicKey,
      isSigner: true,
      isWritable: true,
    },
    {
      pubkey: userA.publicKey,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: mapKey,
      isSigner: false,
      isWritable: true,
    },
  ],
  data: Buffer.from(Uint8Array.of(1)),
});

const tx = new Transaction();
tx.add(initMapIx);
tx.add(insertABIx);
tx.add(insertBCIx);
tx.add(insertCAIx);
