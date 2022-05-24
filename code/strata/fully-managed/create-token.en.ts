import {
  SplTokenBonding,
  ExponentialCurveConfig,
} from "@strata-foundation/spl-token-bonding";
import * as anchor from "@project-serum/anchor";
import { NATIVE_MINT } from "@solana/spl-token";

(async () => {
  const provider = anchor.getProvider();
  const tokenBondingSdk = await SplTokenBonding.init(provider);

  // Price = 0.01 * sqrt(Supply)
  const curve = await tokenBondingSdk.initializeCurve({
    config: new ExponentialCurveConfig({
      c: 0.01,
      b: 0,
      pow: 1,
      frac: 2,
    }),
  });
  const { tokenBonding, baseMint, targetMint } =
    await tokenBondingSdk.createTokenBonding({
      curve,
      baseMint: NATIVE_MINT,
      targetMintDecimals: 2,
      buyBaseRoyaltyPercentage: 5,
      buyTargetRoyaltyPercentage: 5,
    });

  console.log(
    `You can use ${baseMint.toBase58()} to buy ${targetMint.toBase58()} using the bonding curve at address ${tokenBonding.toBase58()}`
  );
})();
