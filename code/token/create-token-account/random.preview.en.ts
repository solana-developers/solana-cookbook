// 1) use build-in function
{
  const tokenAccount = Keypair.generate();
  let tokenAccountPubkey = await createAccount(
    connection, // connection
    feePayer, // fee payer
    mintPubkey, // mint
    alice.publicKey, // owner
    tokenAccount // token account (if you don't pass it, it will use ATA for you)
  );
}

// or

// 2) compose by yourself
{
  let tx = new Transaction().add(
    // create token account
    SystemProgram.createAccount({
      fromPubkey: feePayer.publicKey,
      newAccountPubkey: tokenAccount.publicKey,
      space: ACCOUNT_SIZE,
      lamports: await getMinimumBalanceForRentExemptAccount(connection),
      programId: TOKEN_PROGRAM_ID,
    }),
    // init mint account
    createInitializeAccountInstruction(
      tokenAccount.publicKey, // token account
      mintPubkey, // mint
      alice.publicKey // owner of token account
    )
  );
}
