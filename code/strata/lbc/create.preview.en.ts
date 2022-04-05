const { tokenBonding, targetMint } =
  await marketplaceSdk.createLiquidityBootstrapper({
    baseMint: NATIVE_MINT,
    startPrice: 0.05,
    minPrice: 0.01,
    interval: 5 * 60 * 60,
    maxSupply: 100,
    bondingArgs: {
      targetMintDecimals: 0,
    },
  });
