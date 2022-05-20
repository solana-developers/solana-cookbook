// Add token transfer instructions to transaction
const transaction = new web3.Transaction().add(
  splToken.Token.createTransferInstruction(
    splToken.TOKEN_PROGRAM_ID,
    fromTokenAccount.address,
    toTokenAccount.address,
    fromWallet.publicKey,
    [],
    1
  )
);

// Sign transaction, broadcast, and confirm
await web3.sendAndConfirmTransaction(connection, transaction, [fromWallet]);
