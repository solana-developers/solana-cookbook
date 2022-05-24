const additionalComputeBudgetInstruction = ComputeBudgetProgram.requestUnits({
  units: 400000,
  additionalFee: 0,
});
const transaction = new Transaction()
  .add(additionalComputeBudgetInstruction)
  .add(
    SystemProgram.transfer({
      fromPubkey: payer.publicKey,
      toPubkey: toAccount,
      lamports: 10000000,
    })
  );
