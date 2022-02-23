// 1) use build-in function
{
  let txhash = await revoke(
    connection, // connection
    feePayer, // payer
    tokenAccountPubkey, // token account
    alice // owner of token account
  );
}

// or

// 2) compose by yourself
{
  let tx = new Transaction().add(
    createRevokeInstruction(
      tokenAccountPubkey, // token account
      alice.publicKey // owner of token account
    )
  );
}
