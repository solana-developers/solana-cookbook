const createAccountParams = {
    fromPubkey: fromPubkey.publicKey,
    newAccountPubkey: newAccountPubkey.publicKey,
    lamports: rentExemptionAmount,
    space,
    programId: SystemProgram.programId,
};

const createAccountTransaction = new Transaction().add(
    SystemProgram.createAccount(createAccountParams),
);

await sendAndConfirmTransaction(connection, createAccountTransaction, [fromPubkey, newAccountPubkey])
