// 1) use build-in function
{
  let txhash = await setAuthority(
    connection, // connection
    feePayer, // payer
    mintPubkey, // mint acocunt || token account
    alice, // current authority
    AuthorityType.MintTokens, // authority type
    randomGuy.publicKey // new authority (you can pass `null` to close it)
  );
}

// or

// 2) compose by yourself
{
  let tx = new Transaction().add(
    createSetAuthorityInstruction(
      mintPubkey, // mint acocunt || token account
      alice.publicKey, // current auth
      AuthorityType.MintTokens, // authority type
      randomGuy.publicKey // new auth (you can pass `null` to close it)
    )
  );
}
