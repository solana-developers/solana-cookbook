
(async() => {
  for (let serializedTransaction of [
    setupTransaction,
    swapTransaction,
    cleanupTransaction,
  ].filter(Boolean)) {
   
    const transaction = Transaction.from(
      Buffer.from(serializedTransaction, "base64")
    );
  
    const txid = await connection.sendTransaction(transaction, [wallet.payer], {
      skipPreflight: false,
    });
    await connection.confirmTransaction(txid);
  
  }  
})()