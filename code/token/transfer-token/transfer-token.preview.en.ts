// 1) use build-in function
{
  let txhash = await transferChecked(
    connection, // connection
    feePayer, // payer
    tokenAccountXPubkey, // from (should be a token account)
    mintPubkey, // mint
    tokenAccountYPubkey, // to (should be a token account)
    alice, // from's owner
    1e8, // amount, if your deciamls is 8, send 10^8 for 1 token
    8 // decimals
  );
}

// or

// 2) compose by yourself
{
  let tx = new Transaction().add(
    createTransferCheckedInstruction(
      tokenAccountXPubkey, // from (should be a token account)
      mintPubkey, // mint
      tokenAccountYPubkey, // to (should be a token account)
      alice.publicKey, // from's owner
      1e8, // amount, if your deciamls is 8, send 10^8 for 1 token
      8 // decimals
    )
  );
}
