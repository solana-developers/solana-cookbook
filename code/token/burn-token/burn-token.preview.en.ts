let tx = new Transaction().add(
  Token.createBurnInstruction(
    TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
    mintPubkey, // mint
    tokenAccountPubkey, // from (should be a token account)
    alice.publicKey, // owner of token account
    [], // for multisig account, leave empty.
    1e8 // amount, if your deciamls is 8, 10^8 for 1 token
  )
);

console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer, alice /* fee payer + token authority */])}`);
