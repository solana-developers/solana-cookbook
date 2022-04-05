// Price = 0.01 * sqrt(Supply)
const curve = await tokenBondingSdk.initializeCurve({
  config: new ExponentialCurveConfig({
    c: 0.01,
    b: 0,
    pow: 1,
    frac: 2,
  }),
});
const { tokenBonding } = await tokenBondingSdk.createTokenBonding({
  curve,
  baseMint: NATIVE_MINT,
  targetMintDecimals: 2,
  buyBaseRoyaltyPercentage: 5,
  buyTargetRoyaltyPercentage: 5,
});
