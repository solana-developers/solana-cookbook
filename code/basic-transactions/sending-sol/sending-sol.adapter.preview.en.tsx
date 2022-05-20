const transaction = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: publicKey,
    toPubkey: Keypair.generate().publicKey,
    lamports: 1_000_000,
  })
);

const signature = await sendTransaction(transaction, connection);

await connection.confirmTransaction(signature, "processed");
