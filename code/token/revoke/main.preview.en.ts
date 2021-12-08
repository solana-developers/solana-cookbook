let tx = new Transaction().add(
  Token.createRevokeInstruction(
    TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
    tokenAccountPubkey, // token account
    alice.publicKey, // original auth
    [] // for multisig
  )
);

console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer, alice /* fee payer + origin auth */])}`);
