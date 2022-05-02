// Execute the transactions
for (let serializedTransaction of [
  setupTransaction,
  swapTransaction,
  cleanupTransaction,
].filter(Boolean)) {
  // get transaction object from serialized transaction
  const transaction = Transaction.from(
    Buffer.from(serializedTransaction, "base64")
  );
  // perform the swap
  const txid = await connection.sendTransaction(transaction, [wallet.payer], {
    skipPreflight: true,
  });
  await connection.confirmTransaction(txid);
  console.log(`https://solscan.io/tx/${txid}`);
}
