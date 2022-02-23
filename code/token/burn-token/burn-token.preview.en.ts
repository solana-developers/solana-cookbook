// 1) use build-in function
{
  let txhash = await burnChecked(
    connection, // connection
    feePayer, // payer
    tokenAccountPubkey, // token account
    mintPubkey, // mint
    alice, // owner
    1e8, // amount, if your deciamls is 8, 10^8 for 1 token
    8
  );
}

// or

// 2) compose by yourself
{
  let tx = new Transaction().add(
    createBurnCheckedInstruction(
      tokenAccountPubkey, // token account
      mintPubkey, // mint
      alice.publicKey, // owner of token account
      1e8, // amount, if your deciamls is 8, 10^8 for 1 token
      8 // decimals
    )
  );
}
