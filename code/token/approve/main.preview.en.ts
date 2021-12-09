let tx = new Transaction().add(
  Token.createApproveInstruction(
    TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
    tokenAccountPubkey, // token account
    feePayer.publicKey, // delegate
    alice.publicKey, // original auth
    [], // for multisig
    1 // allowed amount
  )
);

console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer, alice /* fee payer + origin auth */])}`);
