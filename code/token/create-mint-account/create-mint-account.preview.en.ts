// 1) use build-in function
let mintPubkey = await createMint(
  connection, // conneciton
  feePayer, // fee payer
  alice.publicKey, // mint authority
  alice.publicKey, // freeze authority (you can use `null` to disable it. when you disable it, you can't turn it on again)
  8 // decimals
);

// or

// 2) compose by yourself
let tx = new Transaction().add(
  // create mint account
  SystemProgram.createAccount({
    fromPubkey: feePayer.publicKey,
    newAccountPubkey: mint.publicKey,
    space: MINT_SIZE,
    lamports: await getMinimumBalanceForRentExemptMint(connection),
    programId: TOKEN_PROGRAM_ID,
  }),
  // init mint account
  createInitializeMintInstruction(
    mint.publicKey, // mint pubkey
    8, // decimals
    alice.publicKey, // mint authority
    alice.publicKey, // freeze authority (you can use `null` to disable it. when you disable it, you can't turn it on again)
  )
);
