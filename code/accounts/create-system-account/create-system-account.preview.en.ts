const createAccountParams = {
  fromPubkey: fromKeypair.publicKey,
  newAccountPubkey: newAccountKeypair.publicKey,
  lamports: rentExemptionAmount,
  space,
  programId: SystemProgram.programId,
};

const createAccountTransaction = new Transaction().add(
  SystemProgram.createAccount(createAccountParams)
);

await sendAndConfirmTransaction(connection, createAccountTransaction, [
  fromKeypair,
  newAccountKeypair,
]);
