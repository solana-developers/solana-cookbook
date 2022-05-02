const transaction = Transaction.from(
  Buffer.from(serializedTransaction, "base64")
);
// perform the swap
const txid = await connection.sendTransaction(transaction, [wallet.payer], {
  skipPreflight: true,
});
