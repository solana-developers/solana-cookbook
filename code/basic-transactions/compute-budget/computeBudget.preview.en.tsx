const data = Buffer.from(
  Uint8Array.of(0, ...new BN(256000).toArray("le", 4))
);
const additionalComputeBudgetInstruction = new TransactionInstruction({
  keys: [],
  programId: new PublicKey("ComputeBudget111111111111111111111111111111"),
  data,
});
const transaction = new Transaction()
  .add(additionalComputeBudgetInstruction)
  .add(SystemProgram.transfer({
    fromPubkey: payer.publicKey,
    toPubkey: toAccount,
    lamports: 1,
}));