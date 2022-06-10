
(async() => {
  await exchange({
    wallet: {
      sendTransaction: wallet.sendTransaction,
      publicKey: wallet.publicKey,
      signAllTransactions: wallet.signAllTransactions,
      signTransaction: wallet.signTransaction,
    },
    route: bestRoute,
    confirmationWaiterFactory: async (txid) => {
      console.log("sending transaction");
      await connection.confirmTransaction(txid);
      console.log("confirmed transaction");

      return await connection.getTransaction(txid, {
        commitment: "confirmed",
      });
    },
  });
})()


