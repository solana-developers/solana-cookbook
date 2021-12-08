let tx = new Transaction().add(
  Token.createMintToInstruction(
    TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
    mintPubkey, // mint
    tokenAccountPubkey, // receiver (sholud be a token account)
    alice.publicKey, // mint authority
    [], // only multisig account will use. leave it empty now.
    1e8 // amount. if your decimals is 8, you mint 10^8 for 1 token.
  )
);

console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer, alice /* fee payer + mint authority */])}`);
