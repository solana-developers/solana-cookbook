let tx = new Transaction().add(
  // create token account
  SystemProgram.createAccount({
    fromPubkey: alice.publicKey,
    newAccountPubkey: auxAccount.publicKey,
    space: ACCOUNT_SIZE,
    lamports: (await getMinimumBalanceForRentExemptAccount(connection)) + amount, // rent + amount
    programId: TOKEN_PROGRAM_ID,
  }),
  // init token account
  createInitializeAccountInstruction(auxAccount.publicKey, NATIVE_MINT, alice.publicKey),
  // transfer WSOL
  createTransferInstruction(auxAccount.publicKey, ata, alice.publicKey, amount),
  // close aux account
  createCloseAccountInstruction(auxAccount.publicKey, alice.publicKey, alice.publicKey)
);
