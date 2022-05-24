let tx = new Transaction().add(
  // create nonce account
  SystemProgram.createAccount({
    fromPubkey: feePayer.publicKey,
    newAccountPubkey: nonceAccount.publicKey,
    lamports: await connection.getMinimumBalanceForRentExemption(
      NONCE_ACCOUNT_LENGTH
    ),
    space: NONCE_ACCOUNT_LENGTH,
    programId: SystemProgram.programId,
  }),
  // init nonce account
  SystemProgram.nonceInitialize({
    noncePubkey: nonceAccount.publicKey, // nonce account pubkey
    authorizedPubkey: nonceAccountAuth.publicKey, // nonce account authority (for advance and close)
  })
);

console.log(
  `txhash: ${await connection.sendTransaction(tx, [feePayer, nonceAccount])}`
);
