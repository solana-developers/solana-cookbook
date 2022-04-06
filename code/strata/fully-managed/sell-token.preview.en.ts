await tokenBondingSdk.sell({
  tokenBonding: new PublicKey("..."),
  targetAmount: 0.01, // Amount of the targetMint to sell off
  slippage: 0.05,
});
