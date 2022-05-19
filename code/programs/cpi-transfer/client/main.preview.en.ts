(async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const programId = new PublicKey(
    "EfYK91eN3AqTwY1C34W6a33qGAtQ8HJYVhNv7cV4uMZj"
  );

  const transferTokensIx = new TransactionInstruction({
    programId: programId,
    data: TOKEN_TRANSFER_AMOUNT_BUFFER,
    keys: [
      {
        isSigner: false,
        isWritable: true,
        pubkey: SOURCE_TOKEN_ACCOUNT.publicKey,
      },
      {
        isSigner: false,
        isWritable: true,
        pubkey: DESTINATION_TOKEN_ACCOUNT.publicKey,
      },
      {
        isSigner: true,
        isWritable: true,
        pubkey: PAYER_KEYPAIR.publicKey,
      },
      {
        isSigner: false,
        isWritable: false,
        pubkey: TOKEN_PROGRAM_ID,
      },
    ],
  });

  const transaction = new Transaction();
  transaction.add(transferTokensIx);

  const txHash = await connection.sendTransaction(transaction, [
    PAYER_KEYPAIR,
    TOKEN_MINT_ACCOUNT,
    SOURCE_TOKEN_ACCOUNT,
    DESTINATION_TOKEN_ACCOUNT,
  ]);

  console.log(`Token transfer CPI success: ${txHash}`);
})();
