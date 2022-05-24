const transaction = new Transaction().add(
  Token.createTransferInstruction(
    TOKEN_PROGRAM_ID,
    fromTokenAccount.address,
    toTokenAccount.address,
    fromWallet.publicKey,
    [],
    1
  )
);

const signature = await sendTransaction(transaction, connection);

await connection.confirmTransaction(signature, "processed");
