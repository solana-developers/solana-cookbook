let tx = new Transaction().add(
  Token.createTransferCheckedInstruction(
    TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
    tokenAccountXPubkey, // from (should be a token account)
    mintPubkey, // mint
    tokenAccountYPubkey, // to (should be a token account)
    alice.publicKey, // owner of from
    [], // for multisig account, leave empty.
    1e8, // amount, if your deciamls is 8, send 10^8 for 1 token
    8 // decimals
  )
);

console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer, alice /* fee payer + owner */])}`);
