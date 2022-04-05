await tokenBondingSdk.buy({
  tokenBonding: new PublicKey("..."),
  baseAmount: 0.01, // Amount of the baseMint from create token to use for this purchase.
  slippage: 0.05,
});
await tokenBondingSdk.buy({
  tokenBonding: new PublicKey("..."),
  desiredTargetAmount: 0.01, // Purchase instead using the amount of targetMint you want to receive
  slippage: 0.05,
});
