// 1) use build-in function
{
  let txhash = await closeAccount(
    connection, // connection
    feePayer, // payer
    tokenAccountPubkey, // token account which you want to close
    alice.publicKey, // destination
    alice // owner of token account
  );
}

// or

// 2) compose by yourself
{
  let tx = new Transaction().add(
    createCloseAccountInstruction(
      tokenAccountPubkey, // token account which you want to close
      alice.publicKey, // destination
      alice.publicKey // owner of token account
    )
  );
}
