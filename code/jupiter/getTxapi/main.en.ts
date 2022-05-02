const transactions = await(
  await fetch("https://quote-api.jup.ag/v1/swap", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // route from /quote api
      route: routes[0],
      // user public key to be used for the swap
      userPublicKey: wallet.publicKey.toString(),
      // auto wrap and unwrap SOL. default is true
      wrapUnwrapSOL: true,
      // feeAccount is optional. Use if you want to charge a fee.  feeBps must have been passed in /quote API.
      // This is the ATA account for the output token where the fee will be sent to. If you are swapping from SOL->USDC then this would be the USDC ATA you want to collect the fee.
      feeAccount: "xxxx",
    }),
  })
).json();

const { setupTransaction, swapTransaction, cleanupTransaction } = transactions;
