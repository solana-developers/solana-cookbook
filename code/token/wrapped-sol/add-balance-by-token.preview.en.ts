let tx = new Transaction().add(
  // create token account
  SystemProgram.createAccount({
    fromPubkey: alice.publicKey,
    newAccountPubkey: auxAccount.publicKey,
    space: AccountLayout.span,
    lamports: (await Token.getMinBalanceRentForExemptAccount(connection)) + amount, // rent + amount
    programId: TOKEN_PROGRAM_ID,
  }),
  // init token account
  Token.createInitAccountInstruction(TOKEN_PROGRAM_ID, NATIVE_MINT, auxAccount.publicKey, alice.publicKey),
  // transfer WSOL
  Token.createTransferInstruction(TOKEN_PROGRAM_ID, auxAccount.publicKey, ata, alice.publicKey, [], amount),
  // close aux account
  Token.createCloseAccountInstruction(TOKEN_PROGRAM_ID, auxAccount.publicKey, alice.publicKey, alice.publicKey, [])
);

console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer, auxAccount, alice])}`);
