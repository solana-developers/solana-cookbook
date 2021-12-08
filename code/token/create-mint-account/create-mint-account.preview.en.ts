let tx = new Transaction().add(
  // create mint account
  SystemProgram.createAccount({
    fromPubkey: feePayer.publicKey,
    newAccountPubkey: mint.publicKey,
    space: MintLayout.span,
    lamports: await Token.getMinBalanceRentForExemptMint(connection),
    programId: TOKEN_PROGRAM_ID,
  }),
  // init mint account
  Token.createInitMintInstruction(
    TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
    mint.publicKey, // mint pubkey
    8, // decimals
    alice.publicKey, // mint authority
    alice.publicKey // freeze authority (if you don't need it, you can set `null`)
  )
);
console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer, mint])}`);
