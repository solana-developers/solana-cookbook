let tx = new Transaction().add(
  // trasnfer SOL
  SystemProgram.transfer({
    fromPubkey: alice.publicKey,
    toPubkey: ata,
    lamports: amount,
  }),
  // sync wrapped SOL balance
  createSyncNativeInstruction(ata)
);
