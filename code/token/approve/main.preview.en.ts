// 1) use build-in function
{
  let txhash = await approveChecked(
    connection, // connection
    feePayer, // fee payer
    mintPubkey, // mint
    tokenAccountPubkey, // token account
    randomGuy.publicKey, // delegate
    alice, // owner of token account
    1e8, // amount, if your deciamls is 8, 10^8 for 1 token
    8 // decimals
  );
}
// or

// 2) compose by yourself
{
  let tx = new Transaction().add(
    createApproveCheckedInstruction(
      tokenAccountPubkey, // token account
      mintPubkey, // mint
      randomGuy.publicKey, // delegate
      alice.publicKey, // owner of token account
      1e8, // amount, if your deciamls is 8, 10^8 for 1 token
      8 // decimals
    )
  );
}
