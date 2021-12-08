let tx = new Transaction().add(
  Token.createCloseAccountInstruction(
    TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
    tokenAccountPubkey, // token account which you want to close
    alice.publicKey, // destination
    alice.publicKey, // owner of token account
    [] // for multisig
  )
);

console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer, alice /* fee payer + owner */])}`);