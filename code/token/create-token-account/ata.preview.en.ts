// 1) use build-in function
{
  let ata = await createAssociatedTokenAccount(
    connection, // connection
    feePayer, // fee payer
    mintPubkey, // mint
    alice.publicKey // owner,
  );
}

// or

// 2) composed by yourself
{
  let tx = new Transaction().add(
    createAssociatedTokenAccountInstruction(
      feePayer.publicKey, // payer
      ata, // ata
      alice.publicKey, // owner
      mintPubkey // mint
    )
  );
}
