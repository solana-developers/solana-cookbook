const onClickSwapBestRoute = async () => {
  // Routes returned by Jupiter are always sorted by their outAmount
  // Therefore the best route is always the first route in the array
  const bestRoute = routes[0];

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

  console.log({ swapResult });

  if ("error" in swapResult) {
    console.log("Error:", swapResult.error);
  } else if ("txid" in swapResult) {
    console.log("Sucess:", swapResult.txid);
    console.log("Input:", swapResult.inputAmount);
    console.log("Output:", swapResult.outputAmount);
  }
};
