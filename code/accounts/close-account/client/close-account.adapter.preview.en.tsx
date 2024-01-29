async function closeAcc() {
  if (!publicKey) throw new WalletNotConnectedError();
  try {
    // Define the token address and associated token program id
    const tokenAddress = new PublicKey(
      "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263" // -> BONK
    );

    // Get the associated token address
    const ATA = findAssociatedTokenAddress(publicKey!, tokenAddress).toBase58();

    // Create a transaction to close the account
    const transaction = new Transaction(
      await connection.getLatestBlockhash()
    ).add(
      createCloseAccountInstruction(new PublicKey(ATA), publicKey!, publicKey!)
    );

    // Send and confirm the transaction
    const signature = await sendTransaction(transaction, connection);
    await connection.confirmTransaction({
      ...(await connection.getLatestBlockhash()),
      signature,
    });
  } catch (error) {
    console.error("Error closing account:", error);
    // Handle error appropriately, e.g., show a user-friendly error message
  }
}
