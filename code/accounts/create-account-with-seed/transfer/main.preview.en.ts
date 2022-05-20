const tx = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: derived,
    basePubkey: basePubkey,
    toPubkey: Keypair.generate().publicKey, // create a random receiver
    lamports: 0.01 * LAMPORTS_PER_SOL,
    seed: seed,
    programId: programId,
  })
);
console.log(
  `txhash: ${await sendAndConfirmTransaction(connection, tx, [feePayer, base])}`
);
