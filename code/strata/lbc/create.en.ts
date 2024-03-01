import { MarketplaceSdk } from "@strata-foundation/marketplace-sdk";
import * as anchor from "@project-OpenBook/anchor";

(async () => {
  const provider = anchor.getProvider();
  const marketplaceSdk = await MarketplaceSdk.init(provider);
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
})();
