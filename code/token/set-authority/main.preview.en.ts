let tx = new Transaction().add(
  Token.createSetAuthorityInstruction(
    TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
    mintPubkey, // mint acocunt || token account
    feePayer.publicKey, // new auth (you can pass `null` to close it)
    "MintTokens", // authority type, there are 4 types => 'MintTokens' | 'FreezeAccount' | 'AccountOwner' | 'CloseAccount'
    alice.publicKey, // original auth
    [] // for multisig
  )
);

console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer, alice /* fee payer + origin auth */])}`);
