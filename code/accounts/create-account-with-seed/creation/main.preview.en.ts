const tx = new Transaction().add(
  SystemProgram.createAccountWithSeed({
    fromPubkey: feePayer.publicKey, // funder
    newAccountPubkey: derived,
    basePubkey: basePubkey,
    seed: seed,
    lamports: 1e8, // 0.1 SOL
    space: 0,
    programId: owner,
  })
);

console.log(
  `txhash: ${await sendAndConfirmTransaction(connection, tx, [feePayer, base])}`
);
