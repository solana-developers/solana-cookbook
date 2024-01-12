// 1) use build-in function
{
  let txhash = await mintToChecked(
    connection, // connection
    feePayer, // fee payer
    mintPubkey, // mint
    tokenAccountPubkey, // receiver (should be a token account)
    alice, // mint authority
    1e8, // amount. if your decimals is 8, you mint 10^8 for 1 token.
    8 // decimals
  );
}

// or

// 2) compose by yourself
{
  let tx = new Transaction().add(
    createMintToCheckedInstruction(
      mintPubkey, // mint
      tokenAccountPubkey, // receiver (should be a token account)
      alice.publicKey, // mint authority
      1e8, // amount. if your decimals is 8, you mint 10^8 for 1 token.
      8 // decimals
      // [signer1, signer2 ...], // only multisig account will use
    )
  );
}
